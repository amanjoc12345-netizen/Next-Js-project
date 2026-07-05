"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signToken } from "@/lib/auth";

/**
 * Server action to log in a user.
 * Validates credentials against environment variables and sets a secure, HTTP-only cookie.
 * 
 * @param {object} prevState - Previous state from useActionState (if used).
 * @param {FormData} formData - Form submission data.
 * @returns {Promise<{success: boolean, error?: string}>} Status object or redirects on success.
 */
export async function loginAction(prevState, formData) {
  const username = formData.get("username")?.trim();
  const password = formData.get("password");

  if (!username || !password) {
    return { success: false, error: "Both username and password are required." };
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password123";

  if (username !== adminUsername || password !== adminPassword) {
    return { success: false, error: "Invalid username or password." };
  }

  // Create JWT payload and sign it
  const payload = { username };
  const token = await signToken(payload);

  // Store token securely in an HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });

  // Redirect to dashboard page
  redirect("/dashboard");
}

/**
 * Server action to log out a user.
 * Deletes the authentication cookie and redirects to the login page.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}
