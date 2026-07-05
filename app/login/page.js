"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { User, Lock, Loader2, ArrowRight } from "lucide-react";

/**
 * Inner login form component using useSearchParams.
 */
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Retrieve target redirect path from params safely
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected authentication error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="auth-card"
    >
      <div style={{ textAlign: "center" }}>
        {/* Logo icon */}
        <div style={{
          display: "inline-flex",
          background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
          padding: "0.75rem",
          borderRadius: "1rem",
          marginBottom: "1.25rem",
          boxShadow: "0 8px 16px rgba(99, 102, 241, 0.25)"
        }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ffffff" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle" style={{ marginTop: "0.5rem" }}>
          Sign in to your Nexis account to continue
        </p>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <div className="input-icon-wrapper">
            <User size={16} className="input-icon" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="Enter admin username"
              autoComplete="username"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-icon-wrapper">
            <Lock size={16} className="input-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isPending}
            />
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="form-error"
          >
            <span style={{ fontWeight: "700" }}>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        <button 
          type="submit" 
          disabled={isPending} 
          className="btn btn-primary btn-auth"
          style={{ position: "relative" }}
        >
          {isPending ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Loader2 className="spinner" size={16} />
              Signing in...
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Sign In <ArrowRight size={16} />
            </span>
          )}
        </button>
      </form>

      {/* OAuth Providers */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginBottom: "0.25rem" }}>
          Or continue with
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button 
            type="button"
            onClick={() => signIn("github", { callbackUrl })} 
            disabled={isPending}
            className="btn btn-secondary" 
            style={{ flex: 1, gap: "0.5rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem", height: "42px" }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: "#ffffff" }}>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </button>
          <button 
            type="button"
            onClick={() => signIn("google", { callbackUrl })} 
            disabled={isPending}
            className="btn btn-secondary" 
            style={{ flex: 1, gap: "0.5rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem", height: "42px" }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>
      </div>

      {/* Demo Credentials Footer */}
      <div style={{ 
        fontSize: "0.8rem", 
        color: "var(--text-muted)", 
        textAlign: "center", 
        marginTop: "0.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        padding: "0.75rem",
        borderRadius: "var(--radius-md)",
        border: "1px dashed var(--border-color)"
      }}>
        <span>Demo Credentials: </span>
        <code style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-secondary)", fontWeight: "600" }}>
          admin / password123
        </code>
      </div>
    </motion.div>
  );
}

/**
 * Redesigned Login Page utilizing Framer Motion for high-fidelity animations,
 * wrapped in a Suspense boundary to prevent Next.js static prerender bails.
 */
export default function LoginPage() {
  return (
    <div className="auth-wrapper">
      {/* Decorative Glow Elements */}
      <div className="auth-glow-1" />
      <div className="auth-glow-2" />

      <Suspense fallback={
        <div className="auth-card" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "350px" }}>
          <Loader2 className="spinner" size={24} style={{ color: "var(--primary)" }} />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
