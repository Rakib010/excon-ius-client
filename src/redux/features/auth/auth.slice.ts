import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAccessToken } from "@/lib/authToken";
import type { AuthUser } from "@/types/auth";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  accessToken: getAccessToken(),
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

