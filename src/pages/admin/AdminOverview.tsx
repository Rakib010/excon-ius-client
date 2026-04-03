import { useProfileQuery } from "@/redux/features/auth/auth.api";

export function AdminOverview() {
  const { data, isLoading } = useProfileQuery();
  return (
    <div className="card">
      <h1>Admin Overview</h1>
      <p>This is the admin dashboard home.</p>
      <p>
        {isLoading ? "Loading profile…" : `Hello, ${data?.name ?? "Admin"} (${data?.role ?? "ADMIN"})`}
      </p>
    </div>
  );
}

