"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Client-side provider component to wrap the application in NextAuth SessionProvider.
 */
export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
