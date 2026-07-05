import Link from "next/link";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  let product = null;
  let error = null;

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch product details (Status: ${res.status})`);
    }
    product = await res.json();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="details-container">
      {error ? (
        <div className="framed-details-box">
          <h1 className="details-title">Error Loading Product</h1>
          <p className="details-msg">{error}</p>
          <div className="details-actions">
            <Link href="/products" className="btn btn-secondary">
              ← Back to Products
            </Link>
          </div>
        </div>
      ) : product ? (
        <div className="framed-details-box" style={{ maxWidth: "650px", textAlign: "left" }}>
          
          {/* Static File from Public Directory & Dynamic API Thumbnail */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div className="detail-image-wrapper" style={{ height: "180px", overflow: "hidden", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "var(--bg-color)", padding: "0.5rem" }}>
              <img 
                src="/product-placeholder.png" 
                alt="Static Local Reference" 
                style={{ maxHeight: "140px", maxWidth: "100%", objectFit: "contain", borderRadius: "var(--radius-md)" }} 
              />
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.5rem", display: "block" }}>Static File (Public)</span>
            </div>
            
            {product.thumbnail && (
              <div className="detail-image-wrapper" style={{ height: "180px", overflow: "hidden", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "var(--bg-color)", padding: "0.5rem" }}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  style={{ maxHeight: "140px", maxWidth: "100%", objectFit: "contain" }} 
                />
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.5rem", display: "block" }}>Dynamic File (API)</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 600 }}>
              {product.category}
            </span>
            <span style={{ fontSize: "0.85rem", color: product.stock > 0 ? "var(--text-secondary)" : "#ef4444" }}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <h1 className="details-title" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{product.title}</h1>
          
          {product.brand && (
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              by <strong style={{ color: "var(--text-primary)" }}>{product.brand}</strong>
            </p>
          )}

          <div className="details-msg" style={{ margin: "1.5rem 0", textAlign: "left" }}>
            <p style={{ fontWeight: 500, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Description</p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>{product.description}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block" }}>Price</span>
              <span className="product-price" style={{ fontSize: "1.5rem", fontWeight: 700 }}>${product.price.toFixed(2)}</span>
            </div>
            {product.rating && (
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block" }}>Rating</span>
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "#f59e0b" }}>★ {product.rating}</span>
              </div>
            )}
          </div>

          <div className="details-actions" style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <Link href="/products" className="btn btn-secondary" style={{ flex: 1 }}>
              ← Back to Products
            </Link>
            <button className="btn btn-primary" style={{ flex: 1 }}>
              Add to Cart
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
