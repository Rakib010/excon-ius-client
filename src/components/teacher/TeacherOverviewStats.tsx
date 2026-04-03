import "@/styles/teacher.css";
import type { PublishedAllocationRow } from "@/types/teacher";
import type { TeacherLeaveRow } from "@/types/teacher";

export function TeacherOverviewStats({
  myDuties,
  leaves,
  isAvailable,
}: {
  myDuties: PublishedAllocationRow[];
  leaves: TeacherLeaveRow[];
  isAvailable: boolean | null | undefined;
}) {
  const pendingLeaves = leaves.filter((l) => l.status === "PENDING").length;

  return (
    <div className="teacher-grid">
      <div className="teacher-stat">
        <div className="teacher-stat__label">Published duties</div>
        <div className="teacher-stat__value">{myDuties.length}</div>
        <div className="teacher-stat__hint">GET /allocations/published (your rows only)</div>
      </div>
      <div className="teacher-stat">
        <div className="teacher-stat__label">Pending leave requests</div>
        <div className="teacher-stat__value">{pendingLeaves}</div>
        <div className="teacher-stat__hint">GET /leaves/history</div>
      </div>
      <div className="teacher-stat">
        <div className="teacher-stat__label">Invigilation availability</div>
        <div className="teacher-stat__value" style={{ fontSize: "1.1rem" }}>
          {isAvailable === true ? "Yes" : isAvailable === false ? "No" : "—"}
        </div>
        <div className="teacher-stat__hint">users.is_available · update via Availability</div>
      </div>
    </div>
  );
}
