import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If the user was sent here by a protected page, go back there after login.
  const redirectTo = location.state?.from?.pathname || "/";

  // As soon as a user is logged in, leave the login page.
  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

    async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await api.get("/users");
      const foundUser = response.data.find(
        (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (!foundUser) {
        setError("No account found with this email. Please sign up first.");
        setSubmitting(false);
        return;
      }

      if (String(foundUser.password) !== password) {
        setError("Wrong password. Please try again.");
        setSubmitting(false);
        return;
      }

      login({ id: foundUser.id, name: foundUser.name, email: foundUser.email });
      // the useEffect in this file redirects once the user is saved
    } catch (err) {
      console.error(err);
      setError("Could not log in. Please make sure the JSON Server is running.");
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="submit-btn" disabled={submitting}>
            {submitting ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
