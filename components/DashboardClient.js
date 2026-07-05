"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { 
  DollarSign, 
  Users, 
  Percent, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Mail, 
  Calendar, 
  Clock, 
  Activity as StatusIcon
} from "lucide-react";

/**
 * Premium Client-Side Dashboard renderer featuring staggered container animations,
 * high-fidelity Lucide icons, status trend indicators, and a clean Profile details grid.
 * 
 * @param {object} props
 * @param {object} props.session - Auth.js user session payload.
 */
export default function DashboardClient({ session }) {
  const username = session?.user?.name || "Admin User";
  const userEmail = session?.user?.email || "admin@example.com";
  const initials = username.substring(0, 2).toUpperCase();

  // Stats Card configurations
  const stats = [
    {
      title: "Total Sales",
      value: "$14,248.50",
      change: "+12.5% vs last month",
      trend: "positive",
      icon: DollarSign
    },
    {
      title: "Active Sessions",
      value: "342",
      change: "Currently online",
      trend: "neutral",
      icon: Users
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.4% increase",
      trend: "positive",
      icon: Percent
    },
    {
      title: "Active Promotions",
      value: "4",
      change: "Active campaigns",
      trend: "neutral",
      icon: Activity
    }
  ];

  // Animation variants for staggered card entries
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="dashboard-container">
      {/* Dynamic welcome header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="catalog-header" 
        style={{ marginBottom: "2.5rem" }}
      >
        <h1 className="catalog-title">Dashboard Overview</h1>
        <p className="catalog-description">
          Welcome back, <strong style={{ color: "var(--text-primary)" }}>{username}</strong>! Manage your storefront status and analytics.
        </p>
      </motion.div>

      {/* Staggered stats grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="dashboard-grid"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="stat-card"
            >
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <span className="stat-icon-wrapper">
                  <Icon size={18} />
                </span>
              </div>
              <span className="stat-value">{stat.value}</span>
              <div className={`stat-indicator ${
                stat.trend === "positive" ? "stat-indicator-positive" : "stat-indicator-neutral"
              }`}>
                {stat.trend === "positive" && <ArrowUpRight size={12} />}
                <span>{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main dashboard splits */}
      <div className="dashboard-sections-layout">
        {/* Left: Security Check Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="dashboard-panel"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={20} style={{ color: "var(--primary)" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>System Security Check</h2>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
            Your connection to Nexis OS is protected under enterprise-grade web configurations. 
            Authentication sessions are managed securely by <strong>NextAuth.js</strong> via cryptographically signed JWT cookies, and page routing is guarded by Next.js <strong>proxy.js</strong> routing gates.
          </p>

          <div style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.01)", 
            padding: "1.25rem", 
            borderRadius: "var(--radius-lg)", 
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            fontSize: "0.85rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--success)", fontWeight: "600" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--success)", display: "inline-block" }}></span>
              Secure Session Verified
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: "1.4" }}>
              Session Token: NextAuth Session Cookie
              <br />
              Encryption standard: HS256 JWT
              <br />
              SameSite directive: Lax
            </div>
          </div>
        </motion.div>

        {/* Right: Redesigned Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="dashboard-panel"
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>User Profile</h2>
          
          <div className="profile-card">
            {/* Identity Row */}
            <div className="profile-avatar-row">
              <div className="profile-avatar-large">
                {initials}
              </div>
              <div className="profile-identity">
                <span className="profile-name">{username}</span>
                <span className="profile-role-badge">Administrator</span>
              </div>
            </div>

            {/* Profile Grid details */}
            <div className="profile-details-list">
              <div className="profile-detail-item">
                <span className="profile-detail-label">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><Mail size={12} /> Email</span>
                </span>
                <span className="profile-detail-value">{userEmail}</span>
              </div>
              <div className="profile-detail-item">
                <span className="profile-detail-label">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><ShieldCheck size={12} /> Role Scope</span>
                </span>
                <span className="profile-detail-value">Root Admin</span>
              </div>
              <div className="profile-detail-item">
                <span className="profile-detail-label">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={12} /> Last Access</span>
                </span>
                <span className="profile-detail-value">Just now</span>
              </div>
              <div className="profile-detail-item">
                <span className="profile-detail-label">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><StatusIcon size={12} /> Status</span>
                </span>
                <span className="profile-detail-value" style={{ color: "var(--success)", fontWeight: "600" }}>Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="dashboard-actions"
      >
        <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Clock size={14} style={{ color: "var(--text-muted)" }} />
          Signed in via <code style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-primary)" }}>{session?.provider || "credentials"}</code>
        </span>
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="btn btn-secondary"
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", cursor: "pointer", borderRadius: "var(--radius-md)" }}
        >
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}
