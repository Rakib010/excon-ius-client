import "@/styles/teacher.css";
import { useGetPublishedAllocationsQuery } from "@/redux/features/allocations/allocations.api";
import type { PublishedAllocationRow } from "@/types/teacher";
import { useSkipTeacherApi } from "@/hooks/useTeacherProfile";

function fmtDate(d: string) {
  try {
    return new Date(d).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  } catch {
    return d;
  }
}

export function TeacherDutiesPanel({ teacherId }: { teacherId: string | null }) {
  const skipApi = useSkipTeacherApi();
  const { data: all = [], isLoading, error } = useGetPublishedAllocationsQuery(undefined, { skip: skipApi });

  const rows: PublishedAllocationRow[] = (all as PublishedAllocationRow[]).filter(
    (a) => teacherId && a.teacher_id === teacherId,
  );

  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h2>My allocation</h2>
            <p className="foundations__lead">Published invigilation duties assigned to you.</p>
          </div>
        </div>

      {!teacherId ? (
        <p className="foundations__muted">{skipApi ? "Sign in to see your duties." : "Loading your profile…"}</p>
      ) : isLoading ? (
        <p className="foundations__muted">Loading…</p>
      ) : error ? (
        <p className="foundations__error">Could not load allocations.</p>
      ) : rows.length === 0 ? (
        <div className="foundations__empty">No published duties assigned to you yet.</div>
      ) : (
        <div className="foundations__table-wrap">
          <table className="foundations__table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Exam date</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.course_name}</strong>
                  </td>
                  <td>{fmtDate(row.exam_date)}</td>
                  <td>{row.room_name}</td>
                  <td>
                    <span className="foundations__badge">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
}
