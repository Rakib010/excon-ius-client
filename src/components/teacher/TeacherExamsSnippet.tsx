import "@/styles/teacher.css";
import { useGetExamsQuery } from "@/redux/features/exam-room/examRoom.api";
import { useSkipTeacherApi } from "@/hooks/useTeacherProfile";

/** GET /exam-room/exams — all authenticated users; sorted by server (exam_date ASC). */
export function TeacherExamsSnippet() {
  const skipApi = useSkipTeacherApi();
  const { data: exams = [], isLoading, error } = useGetExamsQuery(undefined, { skip: skipApi });

  const list = Array.isArray(exams) ? exams : [];
  const upcoming = list
    .filter((e: Record<string, unknown>) => e.exam_date)
    .slice(0, 5);

  return (
    <div className="card">
      <h2>Upcoming exams (schedule)</h2>
      <p className="teacher-page__lead">
        <code>GET /exam-room/exams</code> — reference for dates/times; duty assignment appears under My allocation.
      </p>
      {skipApi ? (
        <p className="teacher-muted">Sign in to load the exam schedule.</p>
      ) : isLoading ? (
        <p className="teacher-muted">Loading…</p>
      ) : error ? (
        <p className="teacher-error">Could not load exams.</p>
      ) : upcoming.length === 0 ? (
        <div className="teacher-empty">No exams in the list.</div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18, color: "#4b5563" }}>
          {upcoming.map((e: Record<string, unknown>) => (
            <li key={String(e.id)} style={{ marginBottom: 8 }}>
              <strong>{String(e.course_name ?? e.course_code ?? "Exam")}</strong>
              {e.exam_date ? (
                <>
                  {" "}
                  — {String(e.exam_date)}
                  {e.start_time != null && e.end_time != null ? (
                    <span className="teacher-muted">
                      {" "}
                      ({String(e.start_time)}–{String(e.end_time)})
                    </span>
                  ) : null}
                </>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
