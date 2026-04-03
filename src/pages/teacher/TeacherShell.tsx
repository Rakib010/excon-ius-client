import { DashboardLayout } from "@/layouts/DashboardLayout";

const items = [
  { to: "/teacher", label: "Overview" },
  { to: "/teacher/availability", label: "Availability" },
  { to: "/teacher/leaves", label: "Leaves" },
  { to: "/teacher/allocation", label: "My Allocation" },
];

export function TeacherShell() {
  return <DashboardLayout title="Teacher" items={items} />;
}

