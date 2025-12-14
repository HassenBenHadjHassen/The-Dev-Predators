import React, { useState } from "react";
// @ts-ignore
import { AuthApi } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import FluidBackground from "../FluidBackground/FluidBackground";
import { Button } from "../ui/button";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    console.log("SignUp attempt:", { fullName, email, password });

    try {
      await AuthApi.register({ fullName, email, password });
      navigate("/login");
    } catch (err: any) {
      console.error("SignUp failed:", err);
      setError(err.message || "Registration failed. Please try again.");
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
            Create Account
          </h1>
          <p className="text-muted-foreground text-lg">
            Join our community. <br />
            Begin your journey to clarity today.
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
              htmlFor="username"
              className="block text-sm font-medium text-foreground ml-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 bg-white/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="Choose a username"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground ml-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-white/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-8 text-center text-muted-foreground">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline decoration-2 underline-offset-4"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
