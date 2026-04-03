import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { normalizeRoleForRoute, role } from "@/constants/role";
import { DEV_MOCK_AUTH_ENABLED } from "@/constants/devAuth";

export function RootRedirect() {
  const { isLoading, user } = useAuth();

  if (isLoading) return null;

  // Production: লগইন ছাড়া → /login (dev mock এ DEV_MOCK_USER থাকায় বাইপাস)
  // if (!user?.email) return <Navigate to="/login" replace />;
  if (!DEV_MOCK_AUTH_ENABLED && !user?.email) return <Navigate to="/login" replace />;

  if (normalizeRoleForRoute(user?.role) === role.teacher) return <Navigate to="/teacher" replace />;

  return <Navigate to="/admin" replace />;
}

