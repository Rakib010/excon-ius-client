export function getErrorMessage(err: unknown, fallback = "Something went wrong") {
  const e = err as any;

  // RTK Query baseQuery error: { status, data }
  const rtkMsg = e?.data?.message ?? e?.data?.error?.message ?? e?.data?.error?.detail;
  if (typeof rtkMsg === "string" && rtkMsg.trim()) return rtkMsg;

  // Axios error (in case it bubbles up)
  const axiosMsg = e?.response?.data?.message ?? e?.response?.data?.error?.message;
  if (typeof axiosMsg === "string" && axiosMsg.trim()) return axiosMsg;

  if (typeof e?.message === "string" && e.message.trim()) return e.message;
  return fallback;
}

