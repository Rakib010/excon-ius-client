import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { authActions } from "@/redux/features/auth/auth.slice";
import { normalizeRoleForRoute, role as roles } from "@/constants/role";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { AuthSplitLayout } from "@/layouts/AuthSplitLayout";
import { IconLock, IconMail, IconUser, IconEye, IconEyeOff } from "@/components/auth/AuthIcons";
import "@/styles/auth.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{
    name: string;
    email: string;
    password: string;
    role: string;
    employeeId?: string;
    designation?: string;
  }>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: roles.teacher,
      employeeId: "",
      designation: "",
    },
  });

  const onSubmit = handleSubmit(
    async (values: {
      name: string;
      email: string;
      password: string;
      role: string;
      employeeId?: string;
      designation?: string;
    }) => {
    try {
      const res = await registerMutation({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        employee_id: values.employeeId?.trim() ? values.employeeId.trim() : undefined,
        designation: values.designation?.trim() ? values.designation.trim() : undefined,
      }).unwrap();
      
      dispatch(authActions.setAccessToken(res.accessToken));
      dispatch(authActions.setUser(res.user));
      toast.success("Account created successfully.");
      if (normalizeRoleForRoute(res.user.role) === roles.teacher) navigate("/teacher", { replace: true });
      else if (normalizeRoleForRoute(res.user.role) === roles.superAdmin) navigate("/super-admin", { replace: true });
      else navigate("/admin", { replace: true });
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "Registration failed");
      setError("root", { message: msg });
      toast.error(msg);
    }
    },
  );

  return (
    <AuthSplitLayout wideForm panelTitle="">
      <form onSubmit={onSubmit} noValidate>
        <h1 className="auth-split__heading">Create your account</h1>
        <p className="auth-split__sub">Default role is TEACHER unless specified by your administrator.</p>

        <div className="grid2">
          <label className="field">
            <span>Name</span>
            <div className="field-input">
              <span className="field-input__icon">
                <IconUser />
              </span>
              <input
                required
                autoComplete="name"
                placeholder="Your full name"
                {...register("name", { required: "Name is required." })}
              />
            </div>
          </label>
          <label className="field">
            <span>Email</span>
            <div className="field-input">
              <span className="field-input__icon">
                <IconMail />
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="name@university.edu.bd"
                {...register("email", { required: "Email is required." })}
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
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Choose a strong password"
              {...register("password", { required: "Password is required." })}
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

        <label className="field">
          <span>Role</span>
          <div className="field-input">
            <select required {...register("role", { required: true })}>
              <option value={roles.teacher}>TEACHER</option>
              <option value={roles.admin}>ADMIN</option>
              <option value={roles.superAdmin}>SUPER_ADMIN</option>
            </select>
          </div>
        </label>

        <div className="grid2">
          <label className="field">
            <span>Employee ID (optional)</span>
            <div className="field-input">
              <input placeholder="Staff ID" {...register("employeeId")} />
            </div>
          </label>
          <label className="field">
            <span>Designation (optional)</span>
            <div className="field-input">
              <input placeholder="e.g. Lecturer" {...register("designation")} />
            </div>
          </label>
        </div>

        {errors.root?.message ? <div className="auth__error">{errors.root.message}</div> : null}

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
