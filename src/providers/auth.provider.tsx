import { useEffect } from "react";
import { AuthContext } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authActions } from "@/redux/features/auth/auth.slice";
import { useLoginMutation, useLogoutMutation, useProfileQuery } from "@/redux/features/auth/auth.api";
import { DEV_MOCK_AUTH_ENABLED, DEV_MOCK_USER } from "@/constants/devAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user: reduxUser, accessToken } = useAppSelector((s) => s.auth);

  // Production: সবসময় প্রোফাইল চেষ্টা (অথবা skip শুধু টোকেন না থাকলে)।
  // Dev mock: প্রোফাইল API কল বন্ধ — ৪০১/রিফ্রেশ নয়েজ এড়াতে।
  const { data, isLoading, refetch } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: DEV_MOCK_AUTH_ENABLED || !accessToken,
  });

  useEffect(() => {
    if (!DEV_MOCK_AUTH_ENABLED) return;
    dispatch(
      authActions.setUser({
        id: DEV_MOCK_USER.id,
        name: DEV_MOCK_USER.name,
        email: DEV_MOCK_USER.email,
        role: DEV_MOCK_USER.role,
      }),
    );
  }, [dispatch]);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const userFromProfile = data ?? null;
  // Dev mock: হার্ডকোড ইউজার; production: প্রোফাইল → Redux
  const user = DEV_MOCK_AUTH_ENABLED ? DEV_MOCK_USER : userFromProfile ?? reduxUser;

  const login = async (payload: { email: string; password: string }) => {
    const res = await loginMutation(payload).unwrap();
    dispatch(authActions.setAccessToken(res.accessToken));
    dispatch(authActions.setUser(res.user as any));
    await refetch();
    return res.user as any;
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(authActions.clearAuth());
      await refetch();
    }
  };

  const value = {
    user,
    isLoading: DEV_MOCK_AUTH_ENABLED ? false : isLoading,
    isAuthenticated: Boolean(user?.email),
    role: (user?.role as string | null) ?? null,
    login,
    logout,
    refetchUser: async () => {
      await refetch();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

