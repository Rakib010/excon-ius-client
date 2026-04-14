export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "TEACHER" | "ADMIN" | "SUPER_ADMIN" | string;
};

export type AuthContextState = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: string | null;
  login: (payload: { email: string; password: string }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

