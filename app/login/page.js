"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

/**
 * Login Page Component.
 * Implements a secure client-side form using React 19's useActionState hook.
 */
export default function LoginPage() {
  // useActionState handles server action execution state (pending state and error messages)
  const [state, formAction, isPending] = useActionState(loginAction, null);

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
          <p className="auth-subtitle">Sign in with credentials to access your dashboard</p>
        </div>

        <form action={formAction} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
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
              name="password"
              required
              className="form-input"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isPending}
            />
          </div>

          {state?.error && (
            <div className="form-error">
              <span>⚠️</span>
              <span>{state.error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending} 
            className="btn btn-primary btn-auth"
          >
            {isPending ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", marginTop: "1rem" }}>
          <p>Demo Credentials:</p>
          <p style={{ fontFamily: "var(--font-geist-mono)", marginTop: "0.25rem" }}>admin / password123</p>
        </div>
      </div>
    </div>
  );
}
