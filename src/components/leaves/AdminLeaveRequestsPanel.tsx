import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  useApproveLeaveMutation,
  useGetLeaveHistoryQuery,
  useGetLeaveRequestsQuery,
  useRejectLeaveMutation,
} from "@/redux/features/leaves/leaves.api";

type LeaveRow = {
  id: number | string;
  teacher_name?: string;
  start_date?: string;
  end_date?: string;
  reason?: string;
  status?: string;
  created_at?: string;
};

function fmtDate(v: unknown): string {
  const s = String(v || "");
  if (!s) return "—";
  // Handles "2026-06-10T00:00:00.000Z" and "2026-06-10"
  if (s.length >= 10) return s.slice(0, 10);
  return s;
}

function statusPill(statusRaw: unknown) {
  const s = String(statusRaw || "").toUpperCase();
  if (s === "APPROVED") return <span className="foundations__badge">Approved</span>;
  if (s === "REJECTED") return <span className="foundations__badge foundations__badge--danger">Rejected</span>;
  return <span className="foundations__badge">Pending</span>;
}

function byCreatedDesc(a: LeaveRow, b: LeaveRow) {
  const ad = Date.parse(String(a.created_at || "")) || 0;
  const bd = Date.parse(String(b.created_at || "")) || 0;
  return bd - ad;
}

export function AdminLeaveRequestsPanel() {
  const [tab, setTab] = useState<"pending" | "all">("pending");

  const pendingQuery = useGetLeaveRequestsQuery(undefined, { skip: tab !== "pending" });
  const allQuery = useGetLeaveHistoryQuery(undefined, { skip: tab !== "all" });

  const dataRaw = tab === "pending" ? pendingQuery.data : allQuery.data;
  const isLoading = tab === "pending" ? pendingQuery.isLoading : allQuery.isLoading;
  const error = tab === "pending" ? pendingQuery.error : allQuery.error;

  const rows = useMemo(() => {
    const list = (dataRaw ?? []) as unknown[];
    return (Array.isArray(list) ? list : []).map((r) => r as LeaveRow).slice().sort(byCreatedDesc);
  }, [dataRaw]);

  const [approve, { isLoading: approving }] = useApproveLeaveMutation();
  const [reject, { isLoading: rejecting }] = useRejectLeaveMutation();

  const onApprove = async (row: LeaveRow) => {
    if (!window.confirm(`Approve leave for ${row.teacher_name ?? "teacher"}?`)) return;
    try {
      await approve(row.id).unwrap();
      toast.success("Leave approved.");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not approve leave."));
    }
  };

  const onReject = async (row: LeaveRow) => {
    if (!window.confirm(`Reject leave for ${row.teacher_name ?? "teacher"}?`)) return;
    try {
      await reject(row.id).unwrap();
      toast.success("Leave rejected.");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not reject leave."));
    }
  };

  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h1 style={{ margin: 0 }}>Leave Requests</h1>
            <p className="foundations__lead">Approve or reject teacher leave requests.</p>
          </div>
        </div>

        <div className="foundations__tabs">
          <button
            type="button"
            className={`foundations__tab ${tab === "pending" ? "foundations__tab--active" : ""}`}
            onClick={() => setTab("pending")}
          >
            Pending
          </button>
          <button
            type="button"
            className={`foundations__tab ${tab === "all" ? "foundations__tab--active" : ""}`}
            onClick={() => setTab("all")}
          >
            All history
          </button>
        </div>

        {isLoading ? <p className="foundations__muted">Loading…</p> : null}
        {error ? <p className="foundations__error">Could not load leave requests.</p> : null}

        <div className="foundations__table-wrap">
          <table className="foundations__table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Dates</th>
                <th>Status</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                <td colSpan={4} className="foundations__empty">
                    {tab === "pending" ? "No pending leave requests." : "No leave history yet."}
                  </td>
                </tr>
              ) : (
                rows.map((r) => {
                  const status = String(r.status || "").toUpperCase();
                  const canAct = status === "PENDING";
                  return (
                    <tr key={String(r.id)}>
                      <td>
                        <strong>{r.teacher_name || "—"}</strong>
                      </td>
                      <td>
                        {fmtDate(r.start_date)} → {fmtDate(r.end_date)}
                      </td>
                      <td>{statusPill(r.status)}</td>
                      <td>
                        {canAct ? (
                          <div className="foundations__actions">
                            <button
                              type="button"
                              className="foundations__btn foundations__btn--ghost"
                              disabled={approving || rejecting}
                              onClick={() => void onApprove(r)}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="foundations__danger"
                              disabled={approving || rejecting}
                              onClick={() => void onReject(r)}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="foundations__muted">—</span>
                        )}
                      </td>
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

