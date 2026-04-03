import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { authActions } from "@/redux/features/auth/auth.slice";
import { role as roles } from "@/constants/role";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { AuthSplitLayout } from "@/layouts/AuthSplitLayout";
import { IconLock, IconMail, IconUser, IconEye, IconEyeOff } from "@/components/auth/AuthIcons";
import "@/styles/auth.css";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await registerMutation({
        name,
        email,
        password,
        employee_id: employeeId || undefined,
        designation: designation || undefined,
      }).unwrap();
      dispatch(authActions.setAccessToken(res.accessToken));
      dispatch(authActions.setUser(res.user));
      if (res.user.role === roles.teacher) navigate("/teacher", { replace: true });
      else navigate("/admin", { replace: true });
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Registration failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout
      wideForm
      panelTitle="Join your colleagues on EXCON-IUS."
      panelLead="Create an account to manage availability, leaves, and invigilation assignments."
      quote="Clear allocation workflows help us respect faculty time and exam integrity—on campus and online."
      quoteAuthor="Exam coordination"
      quoteRole="University of Scholars"
    >
      <form onSubmit={onSubmit} noValidate>
        <div className="auth-split__brand">
          <span className="auth-split__brand-mark">EXCON-IUS</span>
          <span className="auth-split__brand-tag">Invigilation Management</span>
        </div>

        <h1 className="auth-split__heading">Create your account</h1>
        <p className="auth-split__sub">Default role is TEACHER unless specified by your administrator.</p>

        <div className="grid2">
          <label className="field">
            <span>Name</span>
            <div className="field-input">
              <span className="field-input__icon">
                <IconUser />
              </span>
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" placeholder="Your full name" />
            </div>
          </label>
          <label className="field">
            <span>Email</span>
            <div className="field-input">
              <span className="field-input__icon">
                <IconMail />
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                placeholder="name@university.edu.bd"
              />
            </div>
          </label>
        </div>

        <label className="field">
          <span>Password</span>
          <div className="field-input field-input--password">
            <span className="field-input__icon">
              <IconLock />
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Choose a strong password"
            />
            <button
              type="button"
              className="field-input__toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </label>

        <div className="grid2">
          <label className="field">
            <span>Employee ID (optional)</span>
            <div className="field-input">
              <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Staff ID" />
            </div>
          </label>
          <label className="field">
            <span>Designation (optional)</span>
            <div className="field-input">
              <input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Lecturer" />
            </div>
          </label>
        </div>

        {error && <div className="auth__error">{error}</div>}

        <button className="btn auth__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "Create account"}
        </button>

        <div className="auth__footer">
          <span>Already have an account?</span> <Link to="/login">Sign in</Link>
        </div>
      </form>
    </AuthSplitLayout>
  );
}
