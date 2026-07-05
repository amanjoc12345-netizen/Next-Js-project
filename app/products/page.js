import Link from "next/link";

export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    const res = await fetch("https://dummyjson.com/products", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    products = data.products || [];
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1 className="catalog-title">Products Catalog</h1>
        <p className="catalog-description">
          This is the products catalog page. Select a product below to view detailed specifications.
        </p>
      </div>

      {error ? (
        <div style={{ color: "var(--text-secondary)", padding: "2rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", backgroundColor: "var(--bg-card)", textAlign: "center" }}>
          Failed to load products: {error}
        </div>
      ) : (
        <div className="catalog-grid">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="product-card"
            >
              <div className="product-info">
                <h2 className="product-name">{product.title}</h2>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <span className="product-link-text">View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
