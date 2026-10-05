import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required.";
    if (!user.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    const email = user.email.trim().toLowerCase();

    try {
      const existing = await api.get("/users", { params: { email } });
      if (existing.data.length > 0) {
        setSubmitError("An account with this email already exists.");
        setSubmitting(false);
        return;
      }

      await api.post("/users", {
        name: user.name.trim(),
        email,
        password: user.password,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Could not create your account. Please make sure the JSON Server is running."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Signup</h1>

        {submitError && <div className="form-error">{submitError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              value={user.name}
              onChange={handleChange}
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              value={user.email}
              onChange={handleChange}
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              value={user.password}
              onChange={handleChange}
              className={errors.password ? "invalid" : ""}
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button className="submit-btn" disabled={submitting}>
            {submitting ? "Please wait..." : "Signup"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
