import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FluidBackground from "../FluidBackground/FluidBackground";
// @ts-ignore
import { AuthApi } from "../../api/authApi";
import { Button } from "../ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await AuthApi.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem(
          "token",
          JSON.stringify({ token: response.data.token })
        );
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <FluidBackground />
      <div className="relative z-10 w-full max-w-md p-8 bg-card/65 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_24px_64px_rgba(130,168,155,0.08)]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold mb-3 text-foreground">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-lg">
            Take a deep breath.
            <br />
            Log in to continue your journey.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 text-sm text-destructive bg-destructive/10 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground ml-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 bg-white/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground ml-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-white/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center text-muted-foreground">
          <span>Don't have an account? </span>
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline decoration-2 underline-offset-4"
          >
            Sign up gently
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
