"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { Layers, LayoutDashboard, ShoppingBag, LogOut, User } from "lucide-react";

/**
 * Modern Client-Side Navigation Header featuring active state highlighting,
 * smooth transitions, and an interactive profile avatar dropdown.
 */
export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = status === "authenticated" && !!session;
  const username = session?.user?.name || "Admin";
  const userEmail = session?.user?.email || "admin@example.com";
  const initials = username.charAt(0).toUpperCase();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(99, 102, 241, 0.2)"
          }}>
            <Layers size={18} color="#ffffff" strokeWidth={2.5} />
          </div>
          <span className="header-title">Nexis OS</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link 
            href="/" 
            className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className={`nav-link ${pathname.startsWith("/products") ? "nav-link-active" : ""}`}
          >
            <ShoppingBag size={15} />
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link 
                href="/dashboard" 
                className={`nav-link ${pathname.startsWith("/dashboard") ? "nav-link-active" : ""}`}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>

              {/* Avatar Dropdown */}
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="user-avatar-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="user-avatar-circle">
                    {initials}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="avatar-dropdown">
                    <div className="dropdown-header">
                      <span className="dropdown-name">{username}</span>
                      <span className="dropdown-email">{userEmail}</span>
                      <span style={{ 
                        fontSize: "0.7rem", 
                        color: "#a5b4fc", 
                        backgroundColor: "var(--primary-glow)", 
                        width: "fit-content",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "0.25rem",
                        fontWeight: "600",
                        marginTop: "0.25rem",
                        border: "1px solid rgba(99, 102, 241, 0.1)"
                      }}>
                        Administrator
                      </span>
                    </div>

                    <Link 
                      href="/dashboard" 
                      onClick={() => setDropdownOpen(false)}
                      className="dropdown-item"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard Panel
                    </Link>

                    <Link 
                      href="/products" 
                      onClick={() => setDropdownOpen(false)}
                      className="dropdown-item"
                    >
                      <ShoppingBag size={14} />
                      Products Catalog
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="dropdown-item"
                      style={{ color: "var(--danger)" }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Logout Button in Header */}
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="btn btn-secondary"
                style={{ 
                  padding: "0.5rem 1rem", 
                  fontSize: "0.85rem", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "0.4rem",
                  cursor: "pointer",
                  height: "36px"
                }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="btn btn-primary" 
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.85rem", 
                display: "inline-flex", 
                alignItems: "center", 
                height: "36px",
                justifyContent: "center" 
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
