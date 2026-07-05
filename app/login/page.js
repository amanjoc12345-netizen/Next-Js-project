"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Login Page using NextAuth.js client-side functions.
 * Handles Credentials login flow dynamically and supports GitHub & Google OAuth actions.
 */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL redirect callback support
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      // Execute credentials provider sign-in
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: "48px", width: "48px", objectFit: "contain", borderRadius: "8px", marginBottom: "1rem" }} 
          />
          <h1 className="auth-title">Account Login</h1>
          <p className="auth-subtitle">Sign in via NextAuth.js to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="e.g. admin"
              autoComplete="username"
              disabled={isPending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isPending}
            />
          </div>

          {error && (
            <div className="form-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending} 
            className="btn btn-primary btn-auth"
          >
            {isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* OAuth Buttons Section to demonstrate external provider settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", textAlign: "center" }}>
            Or Sign In with OAuth:
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button 
              onClick={() => signIn("github", { callbackUrl })} 
              className="btn btn-secondary" 
              style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem", borderRadius: "var(--radius-md)" }}
            >
              GitHub 🐱
            </button>
            <button 
              onClick={() => signIn("google", { callbackUrl })} 
              className="btn btn-secondary" 
              style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem", borderRadius: "var(--radius-md)" }}
            >
              Google 🌐
            </button>
          </div>
        </div>

        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", marginTop: "1.25rem" }}>
          <p>Demo Credentials:</p>
          <p style={{ fontFamily: "var(--font-geist-mono)", marginTop: "0.25rem" }}>admin / password123</p>
        </div>
      </div>
    </div>
  );
}
