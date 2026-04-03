import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "TEACHER" | "ADMIN" | "SUPER_ADMIN" | string;
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

