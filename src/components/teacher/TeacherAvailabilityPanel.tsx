import "@/styles/teacher.css";
import { useUpdateMyAvailabilityMutation } from "@/redux/features/leaves/leaves.api";
import { useTeacherProfile, useSkipTeacherApi } from "@/hooks/useTeacherProfile";

export function TeacherAvailabilityPanel() {
  const skipApi = useSkipTeacherApi();
  const { profile, isLoading, refetch } = useTeacherProfile();
  const [update, { isLoading: isSaving, error }] = useUpdateMyAvailabilityMutation();

  const available = profile?.is_available === true;

  const onSet = async (is_available: boolean) => {
    await update({ is_available }).unwrap();
    await refetch();
  };

  if (skipApi) {
    return (
      <div className="card">
        <h2>Availability for invigilation</h2>
        <p className="teacher-muted">
          Sign in with a teacher account (or turn off dev mock auth) to load and update availability via the API.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Availability for invigilation</h2>
      <p className="teacher-page__lead">
        Server: <code>POST /leaves/availability/update</code> with <code>{"{ is_available: boolean }"}</code> — updates{" "}
        <code>users.is_available</code>.
      </p>

      {isLoading ? (
        <p className="teacher-muted">Loading…</p>
      ) : (
        <>
          <p className="teacher-muted" style={{ marginBottom: 12 }}>
            Current status:{" "}
            <strong>{available ? "Available" : profile?.is_available === false ? "Not available" : "Unknown"}</strong>
          </p>

          <div className="teacher-toggle">
            <button
              type="button"
              className="teacher-toggle__btn teacher-toggle__btn--yes"
              disabled={isSaving || available === true}
              onClick={() => void onSet(true)}
            >
              Set available
            </button>
            <button
              type="button"
              className="teacher-toggle__btn teacher-toggle__btn--no"
              disabled={isSaving || profile?.is_available === false}
              onClick={() => void onSet(false)}
            >
              Set unavailable
            </button>
          </div>

          {error != null && (
            <p className="teacher-error" style={{ marginTop: 12 }}>
              Could not update availability.
            </p>
          )}
        </>
      )}
    </div>
  );
}
