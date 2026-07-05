"use client";

import { signOut } from "next-auth/react";

/**
 * Client-side button to handle NextAuth sign out action.
 */
export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="btn btn-secondary" 
      style={{ 
        padding: "0.6rem 1.2rem", 
        fontWeight: "500", 
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        borderRadius: "var(--radius-md)",
        transition: "border-color 0.15s ease"
      }}
    >
      Sign Out
    </button>
  );
}
