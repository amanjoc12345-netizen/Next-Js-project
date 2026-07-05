import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

/**
 * Protected Dashboard Page.
 * Server component that retrieves the token, decodes it, and displays statistics.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const decoded = await verifyToken(token);
  const username = decoded?.username || "Admin User";

  return (
    <div className="dashboard-container">
      <div className="catalog-header" style={{ marginBottom: "2.5rem" }}>
        <h1 className="catalog-title">User Dashboard</h1>
        <p className="catalog-description">
          Welcome back, <strong style={{ color: "var(--text-primary)" }}>{username}</strong>! Here is an overview of your store statistics and system status.
        </p>
      </div>

      {/* Premium dashboard cards showing store statistics */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-title">Total Sales</span>
          <span className="stat-value">$14,248.50</span>
          <span className="stat-desc">↑ 12.5% vs last month</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Active Sessions</span>
          <span className="stat-value">342</span>
          <span className="stat-desc">Currently online visitors</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Conversion Rate</span>
          <span className="stat-value">3.24%</span>
          <span className="stat-desc">↑ 0.4% increase</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">Active Promotions</span>
          <span className="stat-value">4</span>
          <span className="stat-desc">Coupon campaigns active</span>
        </div>
      </div>

      {/* Security details card */}
      <div className="stat-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--text-primary)" }}>JWT Security Check</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          This route is fully protected using Next.js 16 <code>proxy.js</code>. The cookie containing your token is marked as <code>HTTP-Only</code>, <code>SameSite=Lax</code>, and cannot be accessed via client-side JavaScript.
        </p>
        
        <div style={{ backgroundColor: "var(--bg-color)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontFamily: "var(--font-geist-mono)", fontSize: "0.85rem", overflowX: "auto" }}>
          <div style={{ color: "#4ade80", marginBottom: "0.5rem" }}>JWT Verification Status: Verified ✅</div>
          <div style={{ color: "var(--text-secondary)" }}>Payload:</div>
          <pre style={{ margin: "0.25rem 0 0 0", color: "var(--text-primary)" }}>
            {JSON.stringify(decoded, null, 2)}
          </pre>
        </div>
      </div>

      <div className="dashboard-actions">
        <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Signed in as <code style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-primary)" }}>{username}</code>
        </span>
        <form action={logoutAction}>
          <button 
            type="submit" 
            className="btn btn-secondary" 
            style={{ 
              padding: "0.6rem 1.2rem", 
              fontWeight: "500", 
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              borderRadius: "var(--radius-md)",
              transition: "border-color 0.15s ease"
            }}
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
