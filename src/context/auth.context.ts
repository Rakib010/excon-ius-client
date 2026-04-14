import { createContext } from "react";
import type { AuthContextState } from "@/types/auth";

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

