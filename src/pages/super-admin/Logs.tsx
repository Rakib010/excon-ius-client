import { useMemo, useState } from "react";
import {
  useGetActivityLogsQuery,
  useGetAdminActionLogsQuery,
  useGetAllocationHistoryLogsQuery,
  useGetLeaveApprovalLogsQuery,
  type LogRow,
} from "@/redux/features/logs/logs.api";

function safeStr(v: unknown) {
  if (v == null) return "";
  return String(v);
}

function fmtDateTime(v: unknown) {
  const s = safeStr(v);
  if (!s) return "—";
  if (s.length >= 19) return s.replace("T", " ").slice(0, 19);
  if (s.length >= 10) return s.slice(0, 10);
  return s;
}

export function SuperAdminLogs() {
  const [tab, setTab] = useState<"activity" | "allocation" | "leave" | "admin">("activity");

  const activity = useGetActivityLogsQuery(undefined, { skip: tab !== "activity" });
  const allocation = useGetAllocationHistoryLogsQuery(undefined, { skip: tab !== "allocation" });
  const leave = useGetLeaveApprovalLogsQuery(undefined, { skip: tab !== "leave" });
  const admin = useGetAdminActionLogsQuery(undefined, { skip: tab !== "admin" });

  const q = tab === "activity" ? activity : tab === "allocation" ? allocation : tab === "leave" ? leave : admin;
  const rows = useMemo(() => (Array.isArray(q.data) ? (q.data as LogRow[]) : []), [q.data]);

  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h1 style={{ margin: 0 }}>Logs</h1>
            <p className="foundations__lead">System-wide activity and audit logs.</p>
          </div>
        </div>

        <div className="foundations__tabs">
          <button type="button" className={`foundations__tab ${tab === "activity" ? "foundations__tab--active" : ""}`} onClick={() => setTab("activity")}>
            Activity
          </button>
          <button type="button" className={`foundations__tab ${tab === "allocation" ? "foundations__tab--active" : ""}`} onClick={() => setTab("allocation")}>
            Allocation history
          </button>
          <button type="button" className={`foundations__tab ${tab === "leave" ? "foundations__tab--active" : ""}`} onClick={() => setTab("leave")}>
            Leave approvals
          </button>
          <button type="button" className={`foundations__tab ${tab === "admin" ? "foundations__tab--active" : ""}`} onClick={() => setTab("admin")}>
            Admin actions
          </button>
        </div>

        {q.isLoading ? <p className="foundations__muted">Loading…</p> : null}
        {q.error ? <p className="foundations__error">Could not load logs.</p> : null}

        <div className="foundations__table-wrap">
          <table className="foundations__table">
            <thead>
              <tr>
                <th style={{ width: 180 }}>Time</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={2} className="foundations__empty">
                    No log rows.
                  </td>
                </tr>
              ) : (
                rows.map((r, idx) => (
                  <tr key={String((r as any).id ?? `${tab}-${idx}`)}>
                    <td>{fmtDateTime((r as any).created_at ?? (r as any).time ?? (r as any).timestamp)}</td>
                    <td style={{ whiteSpace: "pre-wrap" }}>
                      {safeStr((r as any).message) ||
                        safeStr((r as any).action) ||
                        safeStr((r as any).details) ||
                        safeStr((r as any).event) ||
                        JSON.stringify(r)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

