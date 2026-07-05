import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

/**
 * Auth.js central configuration.
 * Configures Credentials provider for local testing and placeholders for GitHub and Google.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "password123";

        if (
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword
        ) {
          // Return user details on successful match
          return { id: "1", name: adminUsername, email: "admin@example.com" };
        }
        return null;
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "mock_github_id",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "mock_github_secret",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "mock_google_id",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "mock_google_secret",
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in route
  },
  session: {
    strategy: "jwt", // Use JWT sessions for Credentials provider
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.username;
      }
      return session;
    }
  }
});
