import { Link } from "react-router-dom";
import "@/styles/auth.css";

export function Unauthorized() {
  return (
    <div className="auth-page">
      <div className="auth__card auth__card--center">
        <h1>Unauthorized</h1>
        <p>You don’t have permission to access this page.</p>
        <p>
          Go back to <Link to="/">Home</Link>.
        </p>
      </div>
    </div>
  );
}

