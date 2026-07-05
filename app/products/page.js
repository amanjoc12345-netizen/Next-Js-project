import Link from "next/link";

export default function ProductsPage() {
  const products = [
    { id: 1, name: "Premium Wireless Headphones", desc: "High-fidelity audio with active noise cancellation and 40-hour battery life.", price: "$299.00" },
    { id: 2, name: "Ergonomic Mechanical Keyboard", desc: "Compact layout with hot-swappable tactile switches and aluminum frame.", price: "$159.00" },
    { id: 3, name: "Ultra-Wide Gaming Monitor", desc: "34-inch curved display with 144Hz refresh rate and HDR support.", price: "$649.00" },
    { id: 4, name: "Smart Fitness Watch", desc: "Heart rate monitoring, GPS tracking, and water resistance up to 50 meters.", price: "$199.00" },
    { id: 5, name: "Portable SSD 2TB", desc: "High-speed external solid-state drive with USB 3.2 Gen 2 connectivity.", price: "$179.00" },
    { id: 6, name: "Noise-Isolating Earbuds", desc: "Truly wireless earbuds with touch controls and a compact charging case.", price: "$129.00" },
    { id: 7, name: "Minimalist Leather Wallet", desc: "RFID-blocking slim cardholder crafted from full-grain premium leather.", price: "$49.00" },
    { id: 8, name: "Wireless Charging Pad", desc: "15W fast charging dock compatible with multiple Qi-enabled devices.", price: "$39.00" },
    { id: 9, name: "HD Stream Webcam", desc: "1080p video calling camera with auto-focus and dual stereo microphones.", price: "$79.00" },
    { id: 10, name: "Ergonomic Office Chair", desc: "Adjustable lumbar support with breathable mesh back and padded armrests.", price: "$349.00" }
  ];

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1 className="catalog-title">Products Catalog</h1>
        <p className="catalog-description">
          This is the products catalog page. Select a product below to view detailed specifications.
        </p>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className="product-card"
          >
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-desc">{product.desc}</p>
              <div className="product-meta">
                <span className="product-price">{product.price}</span>
                <span className="product-link-text">View details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
