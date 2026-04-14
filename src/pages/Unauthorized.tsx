import { Link, useNavigate } from "react-router-dom";
import "@/styles/auth.css";
import "@/styles/foundations.css";
import { PageCard } from "@/components/ui/PageCard";
import { useAuth } from "@/hooks/useAuth";
import { normalizeRoleForRoute } from "@/constants/role";

export function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const r = normalizeRoleForRoute(user?.role);

  return (
    <PageCard
      title="Access denied"
      lead="You don’t have permission to access this page."
      actions={
        <button className="foundations__btn foundations__btn--ghost" type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      }
    >
      <div className="foundations__card" style={{ padding: 0, border: "none", background: "transparent" }}>
        <div className="foundations__error" style={{ marginTop: 0 }}>
          If you believe this is a mistake, ask your administrator to grant the required role.
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="foundations__btn" to="/">
            Go to dashboard
          </Link>
          <Link className="foundations__btn foundations__btn--ghost" to="/login">
            Go to login
          </Link>
        </div>

        <p className="foundations__muted" style={{ marginTop: 12 }}>
          Signed in as: <strong>{user?.email ?? "Not signed in"}</strong>
          {user?.role ? (
            <>
              {" "}
              • Role: <strong>{String(user.role)}</strong>
              {r ? (
                <>
                  {" "}
                  • Route role: <strong>{r}</strong>
                </>
              ) : null}
            </>
          ) : null}
        </p>
      </div>
    </PageCard>
  );
}

