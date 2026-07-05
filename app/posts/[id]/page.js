/**
 * Dynamic metadata generator for individual post routes.
 * Awaits the async params (required in newer Next.js versions) and sets the tab title dynamically.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Post ${id} - My Blog`,
    description: `Dynamic post page displaying details for post ID ${id} under Nexis OS.`,
  };
}

/**
 * Dynamic Post Page Component (Server Component).
 * Renders the layout for the selected post.
 */
export default async function PostPage({ params }) {
  const { id } = await params;

  return (
    <div className="page-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", padding: "2rem" }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "2.5rem",
        boxShadow: "var(--shadow-lg)",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--primary-glow)",
          color: "var(--primary)",
          fontSize: "0.8rem",
          fontWeight: "700",
          marginBottom: "1rem",
          letterSpacing: "0.05em"
        }}>
          DYNAMIC ROUTE
        </div>
        
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "1rem",
          background: "linear-gradient(135deg, #ffffff 0%, var(--text-secondary) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Post {id} - My Blog
        </h1>

        <p style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          lineHeight: "1.6",
          marginBottom: "2rem"
        }}>
          This page demonstrates <strong>dynamic metadata generation</strong> in Next.js. 
          The page's HTML was pre-rendered on the server side with the specific parameters injected 
          as a promise. The head title matches: <code>Post {id} - My Blog</code>.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a href="/" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            Go to Homepage
          </a>
          <a href="/products" className="btn btn-primary" style={{ textDecoration: "none" }}>
            Browse Catalog
          </a>
        </div>
      </div>
    </div>
  );
}
