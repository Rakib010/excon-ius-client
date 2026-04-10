import "@/styles/teacher.css";
import type { PublishedAllocationRow } from "@/types/teacher";
import type { TeacherLeaveRow } from "@/types/teacher";

export function TeacherOverviewStats({
  myDuties,
  leaves,
  isAvailable,
  isLoading,
}: {
  myDuties: PublishedAllocationRow[];
  leaves: TeacherLeaveRow[];
  isAvailable: boolean | null | undefined;
  isLoading: boolean;
}) {
  const pendingLeaves = leaves.filter((l) => l.status === "PENDING").length;

  return (
    <div className="teacher-grid">
      <div className="teacher-stat">
        <div className="teacher-stat__label">Published duties</div>
        <div className="teacher-stat__value">{isLoading ? "—" : myDuties.length}</div>
        <div className="teacher-stat__hint">Your currently published invigilation duties</div>
      </div>
      <div className="teacher-stat">
        <div className="teacher-stat__label">Pending leave requests</div>
        <div className="teacher-stat__value">{isLoading ? "—" : pendingLeaves}</div>
        <div className="teacher-stat__hint">Requests waiting for review</div>
      </div>
      <div className="teacher-stat">
        <div className="teacher-stat__label">Invigilation availability</div>
        <div className="teacher-stat__value" style={{ fontSize: "1.1rem" }}>
          {isLoading ? "—" : isAvailable === true ? "Yes" : isAvailable === false ? "No" : "—"}
        </div>
        <div className="teacher-stat__hint">Update from Availability</div>
      </div>
    </div>
  );
}
