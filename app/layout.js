import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="app-header">
          <div className="header-container">
            <span className="header-title">Welcome to the Products Store</span>
            <nav className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/products" className="nav-link">
                Products
              </Link>
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
            </nav>
            <p className="footer-copyright">© {new Date().getFullYear()} Products Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
