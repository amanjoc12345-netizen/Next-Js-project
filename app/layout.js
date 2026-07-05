import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Premium Products Store",
  description: "A state-of-the-art ecommerce catalog built with Next.js",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const decoded = await verifyToken(token);
  const isAuthenticated = !!decoded;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="app-header">
          <div className="header-container">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "inherit" }}>
              <img 
                src="/logo.png" 
                alt="Logo" 
                style={{ height: "28px", width: "28px", objectFit: "contain", borderRadius: "4px" }} 
              />
              <span className="header-title">Welcome to the Products Store</span>
            </Link>
            <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/products" className="nav-link">
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <form action={logoutAction} style={{ display: "inline" }}>
                    <button 
                      type="submit" 
                      className="nav-link" 
                      style={{ 
                        background: "none", 
                        border: "none", 
                        cursor: "pointer", 
                        padding: 0, 
                        font: "inherit",
                        color: "var(--text-secondary)"
                      }}
                    >
                      Sign Out
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="nav-link" style={{ color: "var(--text-primary)", fontWeight: "600" }}>
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="app-footer">
          <div className="footer-container">
            <nav className="footer-nav">
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/products" className="footer-link">
                Products
              </Link>
              {isAuthenticated ? (
                <Link href="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" className="footer-link">
                  Sign In
                </Link>
              )}
            </nav>
            <p className="footer-copyright">© {new Date().getFullYear()} Products Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

