"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

/**
 * Premium Client-Side Products catalog viewer featuring staggered entry animations,
 * stock badges, gold rating stars, and smooth transitions on hover/click.
 * 
 * @param {object} props
 * @param {Array} props.products - Array of product objects from API.
 * @param {string|null} props.error - API fetch error message if any.
 */
export default function ProductsClient({ products = [], error = null }) {
  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="catalog-container">
      {/* Header section with entrance animation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="catalog-header"
      >
        <h1 className="catalog-title">Products Catalog</h1>
        <p className="catalog-description">
          Browse our curated list of high-quality products. Select a product below to view full specifications, ratings, and images.
        </p>
      </motion.div>

      {error ? (
        <div style={{ 
          color: "var(--text-secondary)", 
          padding: "3rem 2rem", 
          border: "1px solid var(--border-color)", 
          borderRadius: "var(--radius-xl)", 
          backgroundColor: "var(--bg-surface)", 
          textAlign: "center" 
        }}>
          Failed to load products catalog: {error}
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="catalog-grid"
        >
          {products.map((product) => {
            const stockColor = product.stock > 10 
              ? "var(--success)" 
              : product.stock > 0 
                ? "#eab308" /* yellow */
                : "var(--danger)";

            const stockBg = product.stock > 10 
              ? "var(--success-bg)" 
              : product.stock > 0 
                ? "rgba(234, 179, 8, 0.08)"
                : "var(--danger-bg)";

            const stockBorder = product.stock > 10 
              ? "var(--success-border)" 
              : product.stock > 0 
                ? "rgba(234, 179, 8, 0.2)"
                : "var(--danger-border)";

            const stockText = product.stock > 10 
              ? "In Stock" 
              : product.stock > 0 
                ? "Low Stock"
                : "Out of Stock";

            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="product-card"
              >
                {/* Image Container with Hover zoom */}
                <div className="product-image-container">
                  <img 
                    src={product.thumbnail || "/product-placeholder.png"} 
                    alt={product.title} 
                    className="product-image"
                    loading="lazy"
                  />
                </div>

                {/* Details Section */}
                <div className="product-info">
                  <div className="product-category-row">
                    <span className="product-badge product-badge-category">
                      {product.category}
                    </span>
                    <span style={{ 
                      fontSize: "0.725rem", 
                      fontWeight: "600",
                      color: stockColor,
                      backgroundColor: stockBg,
                      border: `1px solid ${stockBorder}`,
                      padding: "0.15rem 0.4rem",
                      borderRadius: "0.25rem"
                    }}>
                      {stockText}
                    </span>
                  </div>

                  <h2 className="product-name">{product.title}</h2>
                  <p className="product-desc">{product.description}</p>

                  <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                    <span className="product-rating">
                      <Star size={13} fill="currentColor" stroke="none" />
                      {product.rating ? product.rating.toFixed(1) : "4.0"}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      ({Math.floor((product.rating || 4) * 8)} reviews)
                    </span>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="product-meta">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <Link href={`/products/${product.id}`} className="footer-link" style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)" }}>
                        Details
                      </Link>
                      <button 
                        className="btn btn-primary btn-add-cart"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Added "${product.title}" to cart!`);
                        }}
                      >
                        <ShoppingCart size={13} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
