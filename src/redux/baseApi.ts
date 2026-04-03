import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "PROFILE",
    "USERS",
    "FOUNDATIONS",
    "EXAMS",
    "ROOMS",
    "LEAVES",
    "ALLOCATIONS",
    "RULES",
    "LOGS",
  ],
  endpoints: () => ({}),
});

