import { useState } from "react";
import "@/styles/teacher.css";
import {
  useApplyLeaveMutation,
  useCancelLeaveMutation,
  useGetLeaveHistoryQuery,
} from "@/redux/features/leaves/leaves.api";
import type { TeacherLeaveRow } from "@/types/teacher";
import { useSkipTeacherApi } from "@/hooks/useTeacherProfile";

function statusClass(s: string) {
  const u = s?.toUpperCase();
  if (u === "PENDING") return "teacher-status teacher-status--pending";
  if (u === "APPROVED") return "teacher-status teacher-status--approved";
  if (u === "REJECTED") return "teacher-status teacher-status--rejected";
  return "teacher-status";
}

export function TeacherLeavesPanel() {
  const skipApi = useSkipTeacherApi();
  const { data: rows = [], isLoading, error, refetch } = useGetLeaveHistoryQuery(undefined, { skip: skipApi });
  const [apply, { isLoading: applying }] = useApplyLeaveMutation();
  const [cancel, { isLoading: cancelling }] = useCancelLeaveMutation();

  const [showAddPanel, setShowAddPanel] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (skipApi) return;
    setFormError(null);
    if (!start || !end) {
      setFormError("Start and end dates are required.");
      return;
    }
    try {
      await apply({ start_date: start, end_date: end, reason: reason || undefined }).unwrap();
      setStart("");
      setEnd("");
      setReason("");
      setShowAddPanel(false);
      await refetch();
    } catch {
      setFormError("Could not submit leave request.");
    }
  };

  const onCancel = async (id: string) => {
    try {
      await cancel(id).unwrap();
      await refetch();
    } catch {
      setFormError("Could not cancel (only PENDING can be cancelled).");
    }
  };

  const list = rows as TeacherLeaveRow[];

  return (
    <div className="teacher-page">
      <div className="teacher-leaves-split">
        <div className="teacher-leaves-split__list card">
          <h2 style={{ marginTop: 0 }}>My leave requests</h2>
          <p className="teacher-page__lead">
            <code>GET /leaves/history</code> — dates, reason, status. Cancel pending: <code>DELETE /leaves/cancel/:id</code>.
          </p>

          {skipApi ? (
            <p className="teacher-muted">Sign in to load your leave history.</p>
          ) : isLoading ? (
            <p className="teacher-muted">Loading…</p>
          ) : error ? (
            <p className="teacher-error">Could not load leave history.</p>
          ) : list.length === 0 ? (
            <div className="teacher-empty">No leave requests yet.</div>
          ) : (
            <div className="teacher-table-wrap">
              <table className="teacher-table">
                <thead>
                  <tr>
                    <th>Dates</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row) => (
                    <tr key={row.id}>
                      <td>
                        {row.start_date} → {row.end_date}
                      </td>
                      <td>{row.reason ?? "—"}</td>
                      <td>
                        <span className={statusClass(row.status)}>{row.status}</span>
                      </td>
                      <td>
                        {String(row.status).toUpperCase() === "PENDING" ? (
                          <button
                            type="button"
                            className="teacher-btn-danger"
                            disabled={cancelling}
                            onClick={() => void onCancel(row.id)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="teacher-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="teacher-leaves-split__aside" aria-label="Add leave">
          <div className="teacher-leaves-split__actions">
            <button
              type="button"
              className="teacher-btn-add"
              disabled={skipApi}
              onClick={() => {
                setFormError(null);
                setShowAddPanel((v) => !v);
              }}
            >
              {showAddPanel ? "Close" : "Add leave"}
            </button>
          </div>

          {showAddPanel && !skipApi && (
            <div className="teacher-leaves-form-panel">
              <h3>New leave request</h3>
              <p className="teacher-muted" style={{ marginBottom: 12 }}>
                <code>POST /leaves/apply</code> — <code>start_date</code>, <code>end_date</code>, optional <code>reason</code>.
              </p>
              <form className="teacher-form" style={{ maxWidth: "100%" }} onSubmit={onSubmit}>
                <div className="teacher-form__row">
                  <label htmlFor="lv-start">Start date</label>
                  <input id="lv-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
                </div>
                <div className="teacher-form__row">
                  <label htmlFor="lv-end">End date</label>
                  <input id="lv-end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} required />
                </div>
                <div className="teacher-form__row">
                  <label htmlFor="lv-reason">Reason</label>
                  <textarea id="lv-reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Optional" />
                </div>
                {formError && <p className="teacher-error">{formError}</p>}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button className="btn" type="submit" disabled={applying}>
                    {applying ? "Submitting…" : "Submit request"}
                  </button>
                  <button
                    type="button"
                    className="teacher-btn-add teacher-btn-add--ghost"
                    onClick={() => {
                      setShowAddPanel(false);
                      setFormError(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {skipApi && (
            <p className="teacher-muted" style={{ textAlign: "right" }}>
              Sign in to add leave.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
