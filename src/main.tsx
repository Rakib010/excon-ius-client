import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { AuthProvider } from "@/providers/auth.provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" newestOnTop closeOnClick />
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>,
);
