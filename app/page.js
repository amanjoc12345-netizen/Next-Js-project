import Link from "next/link";

export default function Home() {
  return (
    <div className="page-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to the Products Store</h1>
        <p className="welcome-subtitle">
          Browse our curated catalog of high-quality products. Click below to view the collections.
        </p>
        <div className="actions-wrapper">
          <Link href="/products" className="btn btn-primary">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
