import { createContext } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
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

const initialState: AuthContextState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  role: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_payload) => {
    throw new Error("AuthContext not initialized");
  },
  logout: async () => {
    throw new Error("AuthContext not initialized");
  },
  refetchUser: async () => {
    throw new Error("AuthContext not initialized");
  },
};

export const AuthContext = createContext<AuthContextState>(initialState);

