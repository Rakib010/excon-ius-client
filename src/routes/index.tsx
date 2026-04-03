/**
 * Dev: লগইন ছাড়া role-based — `.env` এ `VITE_DEV_MOCK_AUTH=true` ও `VITE_DEV_MOCK_ROLE=ADMIN|SUPER_ADMIN|TEACHER`
 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Unauthorized } from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import { RootRedirect } from "@/pages/RootRedirect";
import { AdminShell } from "@/pages/admin/AdminShell";
import { TeacherShell } from "@/pages/teacher/TeacherShell";
import { AdminOverview } from "@/pages/admin/AdminOverview";
import { Foundations } from "@/pages/admin/Foundations";
import { ExamsRooms } from "@/pages/admin/ExamsRooms";
import { Allocations } from "@/pages/admin/Allocations";
import { LeaveRequests } from "@/pages/admin/LeaveRequests";
import { Logs } from "@/pages/admin/Logs";
import { TeacherOverview } from "@/pages/teacher/TeacherOverview";
import { Availability } from "@/pages/teacher/Availability";
import { Leaves } from "@/pages/teacher/Leaves";
import { MyAllocation } from "@/pages/teacher/MyAllocation";

export const router = createBrowserRouter([
  { path: "/", Component: RootRedirect },

  // Auth
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/unauthorized", Component: Unauthorized },

  // Admin dashboard
  {
    path: "/admin",
    Component: withAuth(AdminShell, [role.admin, role.superAdmin]),
    children: [
      { index: true, Component: AdminOverview },
      { path: "foundations", Component: Foundations },
      { path: "exams-rooms", Component: ExamsRooms },
      { path: "allocations", Component: Allocations },
      { path: "leaves", Component: LeaveRequests },
      { path: "logs", Component: Logs },
      { path: "*", element: <Navigate to="/admin" replace /> },
    ],
  },

  // SUPER_ADMIN ও ADMIN একই ড্যাশবোর্ড — পুরনো/বুকমার্ক URL
  { path: "/super-admin", element: <Navigate to="/admin" replace /> },

  // Teacher dashboard
  {
    path: "/teacher",
    Component: withAuth(TeacherShell, role.teacher),
    children: [
      { index: true, Component: TeacherOverview },
      { path: "availability", Component: Availability },
      { path: "leaves", Component: Leaves },
      { path: "allocation", Component: MyAllocation },
      { path: "*", element: <Navigate to="/teacher" replace /> },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);

