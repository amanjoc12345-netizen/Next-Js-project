"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, LayoutDashboard, ArrowRight, ShieldCheck, Zap, Database } from "lucide-react";

/**
 * Client component for the Homepage featuring premium SaaS branding,
 * micro-features listings, Framer Motion transitions, and interactive CTAs.
 */
export default function HomePageClient() {
  return (
    <div className="page-container">
      <div className="welcome-section" style={{ position: "relative", overflow: "hidden" }}>
        {/* Entrance animations for title & subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="welcome-title">
            Digital Commerce <br />
            <span style={{ background: "linear-gradient(135deg, var(--accent) 0%, #a5b4fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              At Absolute Scale.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="welcome-subtitle"
        >
          Welcome to **Nexis OS**, a state-of-the-art catalog and storefront operations platform. 
          Audit inventory records, track conversion performance, and manage auth sessions with ease.
        </motion.p>

        {/* Feature Highlights Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
            gap: "1.25rem", 
            marginBottom: "3rem",
            textAlign: "left"
          }}
        >
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.015)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
            <Zap size={18} style={{ color: "var(--accent)", marginBottom: "0.5rem" }} />
            <div style={{ fontWeight: "700", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Turbo Speed</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.75rem", lineHeight: "1.4" }}>Prerendered dynamic page generation.</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.015)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
            <ShieldCheck size={18} style={{ color: "var(--primary)", marginBottom: "0.5rem" }} />
            <div style={{ fontWeight: "700", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Secure Session</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.75rem", lineHeight: "1.4" }}>NextAuth and HTTP-only cookie guards.</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.015)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
            <Database size={18} style={{ color: "var(--success)", marginBottom: "0.5rem" }} />
            <div style={{ fontWeight: "700", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Flexible Data</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.75rem", lineHeight: "1.4" }}>Decoupled catalog data fetched via API.</div>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="actions-wrapper"
        >
          <Link href="/products" className="btn btn-primary">
            <ShoppingBag size={15} />
            Explore Catalog <ArrowRight size={15} />
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
