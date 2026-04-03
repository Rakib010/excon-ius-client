import axios, { type AxiosRequestConfig } from "axios";
import config from "@/config";
import { getAccessToken, setAccessToken } from "@/lib/authToken";
import { isDevMockAuthEnabled } from "@/constants/devAuth";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true, // needed for refreshToken cookie
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = getAccessToken();
    if (token) {
      req.headers = req.headers ?? {};
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let pendingQueue: { resolve: () => void; reject: (e: unknown) => void }[] = [];

function processQueue(error?: unknown) {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  pendingQueue = [];
}

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Dev mock (লগইন ছাড়া): রিফ্রেশ লুপ/অপ্রয়োজনীয় POST এড়াতে সরাসরি reject
    if (status === 401 && isDevMockAuthEnabled()) {
      return Promise.reject(error);
    }

    // If access token expired/invalid -> refresh using refreshToken cookie and retry
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;
      try {
        const refreshRes = await axiosInstance.post("/auth/refresh");
        const newToken = refreshRes?.data?.accessToken as string | undefined;
        if (!newToken) throw new Error("No accessToken returned from /auth/refresh");

        setAccessToken(newToken);
        processQueue();
        return axiosInstance(originalRequest);
      } catch (e) {
        processQueue(e);
        setAccessToken(null);
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

