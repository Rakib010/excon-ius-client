import "@/styles/teacher.css";
import type { TeacherProfile } from "@/types/teacher";

function fmt(v: string | null | undefined) {
  if (v == null || v === "") return "—";
  return String(v);
}

export function TeacherProfileCard({
  profile,
  isLoading,
}: {
  profile: TeacherProfile | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="card">
        <h2>Profile</h2>
        <p className="teacher-muted">Loading profile…</p>
      </div>
    );
  }

  if (!profile?.id) {
    return (
      <div className="card">
        <h2>Profile</h2>
        <p className="teacher-muted">Sign in to load your profile from the server.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Your profile</h2>
      <p className="teacher-page__lead">Your staff and contact details.</p>
      <div className="teacher-profile">
        <div className="teacher-profile__field">
          <span className="teacher-profile__label">Name</span>
          <span className="teacher-profile__value">{fmt(profile.name)}</span>
        </div>
        <div className="teacher-profile__field">
          <span className="teacher-profile__label">Email</span>
          <span className="teacher-profile__value">{fmt(profile.email)}</span>
        </div>
        <div className="teacher-profile__field">
          <span className="teacher-profile__label">Employee ID</span>
          <span className="teacher-profile__value">{fmt(profile.employee_id)}</span>
        </div>
        <div className="teacher-profile__field">
          <span className="teacher-profile__label">Designation</span>
          <span className="teacher-profile__value">{fmt(profile.designation)}</span>
        </div>
        <div className="teacher-profile__field">
          <span className="teacher-profile__label">Phone</span>
          <span className="teacher-profile__value">{fmt(profile.phone)}</span>
        </div>
        <div className="teacher-profile__field">
          <span className="teacher-profile__label">Availability (scheduling)</span>
          {profile.is_available === true ? (
            <span className="teacher-profile__badge teacher-profile__badge--on">Available for invigilation</span>
          ) : profile.is_available === false ? (
            <span className="teacher-profile__badge teacher-profile__badge--off">Not available</span>
          ) : (
            <span className="teacher-profile__value">—</span>
          )}
        </div>
        <div className="teacher-profile__field" style={{ gridColumn: "1 / -1" }}>
          <span className="teacher-profile__label">Present address</span>
          <span className="teacher-profile__value">{fmt(profile.present_address)}</span>
        </div>
        <div className="teacher-profile__field" style={{ gridColumn: "1 / -1" }}>
          <span className="teacher-profile__label">Permanent address</span>
          <span className="teacher-profile__value">{fmt(profile.permanent_address)}</span>
        </div>
      </div>
    </div>
  );
}
