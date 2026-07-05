import Link from "next/link";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const products = {
    "1": "Premium Wireless Headphones",
    "2": "Ergonomic Mechanical Keyboard",
    "3": "Ultra-Wide Gaming Monitor",
    "4": "Smart Fitness Watch",
    "5": "Portable SSD 2TB",
    "6": "Noise-Isolating Earbuds",
    "7": "Minimalist Leather Wallet",
    "8": "Wireless Charging Pad",
    "9": "HD Stream Webcam",
    "10": "Ergonomic Office Chair"
  };

  const name = products[id] || `Product #${id}`;

  return (
    <div className="details-container">
      <div className="framed-details-box">
        <h1 className="details-title">{name}</h1>
        <p className="details-msg">
          Product {id} details page — content coming soon!
        </p>
        <div className="details-actions">
          <Link href="/products" className="btn btn-secondary">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
