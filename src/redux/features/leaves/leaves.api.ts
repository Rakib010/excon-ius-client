import { baseApi } from "@/redux/baseApi";

export type LeaveEntity = Record<string, unknown> & { id?: number | string };

function normalizeListResponse(res: unknown): LeaveEntity[] {
  if (Array.isArray(res)) return res as LeaveEntity[];
  const data = (res as any)?.data;
  if (Array.isArray(data)) return data as LeaveEntity[];
  return [];
}

export const leavesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateMyAvailability: builder.mutation<{ message: string }, { is_available: boolean }>({
      query: (data) => ({ url: "/leaves/availability/update", method: "POST", data }),
      invalidatesTags: ["USERS", "LEAVES", "PROFILE"],
    }),
    overrideAvailability: builder.mutation<{ message: string }, { teacher_id: string; is_available: boolean }>({
      query: (data) => ({ url: "/leaves/availability/override", method: "POST", data }),
      invalidatesTags: ["USERS", "LEAVES"],
    }),
    fetchAvailability: builder.query<unknown[], { date?: string } | void>({
      query: (arg) => ({
        url: "/leaves/availability",
        method: "GET",
        params: arg && "date" in arg ? { date: arg.date } : undefined,
      }),
      providesTags: ["LEAVES"],
    }),
    applyLeave: builder.mutation<LeaveEntity, { start_date: string; end_date: string; reason?: string }>({
      query: (data) => ({ url: "/leaves/apply", method: "POST", data }),
      invalidatesTags: ["LEAVES"],
    }),
    cancelLeave: builder.mutation<{ message: string }, string | number>({
      query: (id) => ({ url: `/leaves/cancel/${id}`, method: "DELETE" }),
      invalidatesTags: ["LEAVES"],
    }),
    approveLeave: builder.mutation<LeaveEntity, string | number>({
      query: (id) => ({ url: `/leaves/approve/${id}`, method: "PUT" }),
      invalidatesTags: ["LEAVES", "ALLOCATIONS"],
    }),
    rejectLeave: builder.mutation<LeaveEntity, string | number>({
      query: (id) => ({ url: `/leaves/reject/${id}`, method: "PUT" }),
      invalidatesTags: ["LEAVES"],
    }),
    getLeaveRequests: builder.query<LeaveEntity[], void>({
      query: () => ({ url: "/leaves/requests", method: "GET" }),
      transformResponse: normalizeListResponse,
      providesTags: ["LEAVES"],
    }),
    getLeaveHistory: builder.query<LeaveEntity[], void>({
      query: () => ({ url: "/leaves/history", method: "GET" }),
      transformResponse: normalizeListResponse,
      providesTags: ["LEAVES"],
    }),
  }),
});

export const {
  useUpdateMyAvailabilityMutation,
  useOverrideAvailabilityMutation,
  useFetchAvailabilityQuery,
  useApplyLeaveMutation,
  useCancelLeaveMutation,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useGetLeaveRequestsQuery,
  useGetLeaveHistoryQuery,
} = leavesApi;
