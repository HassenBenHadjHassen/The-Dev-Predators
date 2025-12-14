import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FluidBackground from "../FluidBackground/FluidBackground";
// @ts-ignore
import { AuthApi } from "../../api/authApi";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await AuthApi.login({ email, password });
      // Redirect to dashboard or home on success
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      // Assuming the API returns an error message in err.message or similar
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="login-container">
      <FluidBackground />
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Take a deep breath. <br />
          Log in to continue your journey.
        </p>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <Link to="/signup" className="footer-link">
            Sign up gently
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
