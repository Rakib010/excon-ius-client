import { useMemo, useState } from "react";
import { useGetAllUsersQuery } from "@/redux/features/users/users.api";

function safeStr(v: unknown) {
  if (v == null) return "";
  return String(v);
}

function asBool(v: unknown) {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") return v === "true" || v === "1";
  return Boolean(v);
}

export function Users() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("");
  const [active, setActive] = useState<string>("");

  const queryArgs = useMemo(() => {
    const args: any = { limit: 200 };
    if (search.trim()) args.search = search.trim();
    if (role) args.role = role;
    if (active) args.is_active = active === "true";
    return args;
  }, [active, role, search]);

  const { data: users = [], isLoading, error } = useGetAllUsersQuery(queryArgs);

  const rows = useMemo(() => (Array.isArray(users) ? users : []), [users]);

  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h1 style={{ margin: 0 }}>All Users</h1>
            <p className="foundations__lead">Monitor system-wide users (SUPER_ADMIN only).</p>
          </div>
        </div>

        <div className="foundations__toolbar">
          <div className="foundations__toolbar-left" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name / email…"
              style={{ border: "1px solid #d1d5db", borderRadius: 10, padding: "10px 12px", minWidth: 220 }}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ border: "1px solid #d1d5db", borderRadius: 10, padding: "10px 12px" }}
            >
              <option value="">All roles</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="TEACHER">TEACHER</option>
            </select>
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              style={{ border: "1px solid #d1d5db", borderRadius: 10, padding: "10px 12px" }}
            >
              <option value="">All status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        {isLoading ? <p className="foundations__muted">Loading…</p> : null}
        {error ? <p className="foundations__error">Could not load users.</p> : null}

        <div className="foundations__table-wrap">
          <table className="foundations__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="foundations__empty">
                    No users found.
                  </td>
                </tr>
              ) : (
                rows.map((u) => {
                  const isActive = asBool((u as any).is_active ?? true);
                  return (
                    <tr key={u.id}>
                      <td>
                        <strong>{safeStr(u.name) || "—"}</strong>
                      </td>
                      <td>{safeStr(u.email) || "—"}</td>
                      <td>{safeStr(u.role) || "—"}</td>
                      <td>{isActive ? <span className="foundations__badge">Active</span> : <span className="foundations__badge foundations__badge--danger">Inactive</span>}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

