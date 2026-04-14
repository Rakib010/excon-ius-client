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
      <div className="foundations">
        <div className="card foundations__card">
          <div className="foundations__page-head">
            <div>
              <h2>Availability</h2>
              <p className="foundations__muted">Sign in to view and update your availability.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h2>Availability</h2>
            <p className="foundations__lead">Set whether you are available for invigilation scheduling.</p>
          </div>
        </div>

      {isLoading ? (
        <p className="foundations__muted">Loading…</p>
      ) : (
        <>
          <p className="foundations__muted" style={{ marginBottom: 12 }}>
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
            <p className="foundations__error" style={{ marginTop: 12 }}>
              Could not update availability. Please try again.
            </p>
          )}
        </>
      )}
      </div>
    </div>
  );
}
