import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DEV_MOCK_AUTH_ENABLED } from "@/constants/devAuth";
import { normalizeRoleForRoute } from "@/constants/role";

export const withAuth = (Component: ComponentType, requiredRole?: string | string[]) => {
  return function AuthWrapper() {
    const { user, isLoading } = useAuth();

    // --- Production: সবসময় লগইন লাগে (মূল লজিক, dev mock চালু থাকলে নিচের শর্ত দিয়ে বাইপাস) ---
    // if (!isLoading && !user?.email) {
    //   return <Navigate to="/login" replace />;
    // }
    if (!DEV_MOCK_AUTH_ENABLED && !isLoading && !user?.email) {
      return <Navigate to="/login" replace />;
    }

    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : requiredRole ? [requiredRole] : null;
    const userRole = normalizeRoleForRoute(user?.role);
    if (allowedRoles && !isLoading && !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};

