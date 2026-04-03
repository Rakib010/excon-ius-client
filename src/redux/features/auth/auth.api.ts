import { baseApi } from "@/redux/baseApi";

type LoginPayload = { email: string; password: string };
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: string;
  employee_id?: string;
  designation?: string;
};

type LoginResponse = {
  accessToken: string;
  user: { id: string; name: string; email: string; role: string };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["PROFILE"],
    }),
    register: builder.mutation<LoginResponse, RegisterPayload>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["PROFILE"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["PROFILE"],
    }),
    profile: builder.query<any, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["PROFILE"],
    }),
    changePassword: builder.mutation<{ message: string }, { currentPassword: string; newPassword: string }>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        data: payload,
      }),
    }),
    refresh: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileQuery,
  useChangePasswordMutation,
  useRefreshMutation,
} = authApi;

