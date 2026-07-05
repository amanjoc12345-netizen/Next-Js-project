"use client";

import { signOut } from "next-auth/react";

/**
 * Client-side button to handle NextAuth sign out action in the application header.
 */
export default function HeaderSignOut() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="nav-link" 
      style={{ 
        background: "none", 
        border: "none", 
        cursor: "pointer", 
        padding: 0, 
        font: "inherit",
        color: "var(--text-secondary)",
        transition: "color 0.15s ease"
      }}
    >
      Sign Out
    </button>
  );
}
