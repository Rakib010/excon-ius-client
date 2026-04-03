import "@/styles/teacher.css";
import { useTeacherProfile } from "@/hooks/useTeacherProfile";
import { TeacherDutiesPanel } from "@/components/teacher/TeacherDutiesPanel";

export function MyAllocation() {
  const { teacherId } = useTeacherProfile();

  return (
    <div className="teacher-page">
      <TeacherDutiesPanel teacherId={teacherId} />
    </div>
  );
}
