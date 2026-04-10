import { useEffect } from "react";
import { AuthContext } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authActions } from "@/redux/features/auth/auth.slice";
import { useLoginMutation, useLogoutMutation, useProfileQuery } from "@/redux/features/auth/auth.api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user: reduxUser, accessToken } = useAppSelector((s) => s.auth);

 // Production: সবসময় প্রোফাইল চেষ্টা (অথবা skip শুধু টোকেন না থাকলে)।
  const {
    data,
    isLoading,
    isFetching,
    isUninitialized,
    refetch,
  } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !accessToken,
  });

  useEffect(() => {
    if (!data) return;
    // Keep redux user in sync with server profile.
    dispatch(authActions.setUser(data as any));
  }, [data, dispatch]);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const userFromProfile = data ?? null;
  const user = userFromProfile ?? reduxUser;

  const login = async (payload: { email: string; password: string }) => {
    const res = await loginMutation(payload).unwrap();
    dispatch(authActions.setAccessToken(res.accessToken));
    dispatch(authActions.setUser(res.user as any));
    // Don't call refetch here: profile query may still be skipped/uninitialized at this moment.
    // It will auto-run after accessToken is in state (skip becomes false).
    return res.user as any;
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(authActions.clearAuth());
    }
  };

  const value = {
    user,
    isLoading: isLoading || isFetching || (Boolean(accessToken) && isUninitialized),
    isAuthenticated: Boolean(user?.email),
    role: (user?.role as string | null) ?? null,
    login,
    logout,
    refetchUser: async () => {
      // Only refetch when a profile query has started (i.e. token exists).
      if (!accessToken) return;
      await refetch();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

