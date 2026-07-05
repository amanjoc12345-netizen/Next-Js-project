import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { auth } from "@/auth";
import { Providers } from "@/components/Providers";
import HeaderSignOut from "@/components/HeaderSignOut";
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
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
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
                    <HeaderSignOut />
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
        </Providers>
      </body>
    </html>
  );
}


