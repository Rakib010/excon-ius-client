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
    <div className="card">
      <h2>My published invigilation duties</h2>
      <p className="teacher-page__lead">Published duties assigned to you.</p>

      {!teacherId ? (
        <p className="teacher-muted">{skipApi ? "Sign in to see your duties." : "Loading your profile…"}
        </p>
      ) : isLoading ? (
        <p className="teacher-muted">Loading…</p>
      ) : error ? (
        <p className="teacher-error">Could not load allocations.</p>
      ) : rows.length === 0 ? (
        <div className="teacher-empty">No published duties assigned to you yet.</div>
      ) : (
        <div className="teacher-table-wrap">
          <table className="teacher-table">
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
                    <span className="teacher-status teacher-status--approved">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
