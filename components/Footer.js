import Link from "next/link";
import { Layers, Mail, MapPin } from "lucide-react";

/**
 * Modern, multi-column Footer component for branding, navigation, contact, and legal links.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              padding: "0.35rem",
              borderRadius: "0.35rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Layers size={14} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span className="footer-title" style={{ fontSize: "1.1rem", textTransform: "none", letterSpacing: "-0.02em" }}>
              Nexis OS
            </span>
          </div>
          <p className="footer-desc">
            A premium full-stack catalog manager and digital storefront platform built on the latest Next.js architectures.
          </p>
          <div className="footer-social-row">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <span className="footer-title">Platform</span>
          <nav className="footer-nav">
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/products" className="footer-link">Products</Link>
            <Link href="/dashboard" className="footer-link">Dashboard</Link>
          </nav>
        </div>

        {/* Contact Column */}
        <div className="footer-links-col">
          <span className="footer-title">Contact</span>
          <nav className="footer-nav">
            <span className="footer-link" style={{ cursor: "default" }}>
              <Mail size={14} />
              support@nexis.os
            </span>
            <span className="footer-link" style={{ cursor: "default" }}>
              <MapPin size={14} />
              San Francisco, CA
            </span>
          </nav>
        </div>

        {/* Resources Column */}
        <div className="footer-links-col">
          <span className="footer-title">Enterprise</span>
          <nav className="footer-nav">
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">System Status</a>
            <a href="#" className="footer-link">Help Center</a>
          </nav>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Nexis OS. All rights reserved.
        </p>
        <div className="footer-legal-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
