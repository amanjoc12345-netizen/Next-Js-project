"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowLeft, Layers, ShieldCheck, Tag } from "lucide-react";

/**
 * Premium Client-Side Product Details renderer featuring dual-column layouts,
 * scale triggers, back button icons, and detail callouts.
 * 
 * @param {object} props
 * @param {object} props.product - The product details object from API.
 * @param {string|null} props.error - API fetch error message if any.
 */
export default function ProductDetailsClient({ product, error }) {
  if (error || !product) {
    return (
      <div className="details-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="framed-details-box"
          style={{ maxWidth: "550px", textAlign: "center" }}
        >
          <h1 className="details-title" style={{ color: "var(--danger)" }}>Error Loading Product</h1>
          <p className="details-msg" style={{ border: "1px solid var(--danger-border)", backgroundColor: "var(--danger-bg)", color: "#fca5a5" }}>
            {error || "Product not found"}
          </p>
          <div className="details-actions" style={{ justifyContent: "center" }}>
            <Link href="/products" className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Products
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const stockText = product.stock > 10 
    ? "In Stock" 
    : product.stock > 0 
      ? `Only ${product.stock} left`
      : "Out of Stock";

  const stockColor = product.stock > 10 
    ? "var(--success)" 
    : product.stock > 0 
      ? "#eab308"
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

  return (
    <div className="details-container">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="framed-details-box"
      >
        {/* Back Link */}
        <Link href="/products" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontWeight: "600", color: "var(--text-secondary)" }}>
          <ArrowLeft size={14} /> Back to Catalog
        </Link>

        <div className="detail-grid-cols">
          {/* Left Column: Product Gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "1rem"
            }}>
              {/* Local reference placeholder */}
              <div className="detail-image-wrapper" style={{ 
                height: "220px", 
                borderRadius: "var(--radius-xl)", 
                border: "1px solid var(--border-color)", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                backgroundColor: "rgba(255, 255, 255, 0.01)", 
                padding: "1rem" 
              }}>
                <img 
                  src="/product-placeholder.png" 
                  alt="Static Reference" 
                  style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "contain", opacity: 0.7 }} 
                />
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <Layers size={10} /> Local Asset (Static)
                </span>
              </div>
              
              {/* Dynamic API thumbnail */}
              {product.thumbnail && (
                <div className="detail-image-wrapper" style={{ 
                  height: "220px", 
                  borderRadius: "var(--radius-xl)", 
                  border: "1px solid var(--border-color)", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  backgroundColor: "rgba(255, 255, 255, 0.01)", 
                  padding: "1rem" 
                }}>
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "contain" }} 
                  />
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    <Tag size={10} /> Remote Image (API)
                  </span>
                </div>
              )}
            </div>

            {/* Spec Highlights */}
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.01)", 
              border: "1px solid var(--border-color)", 
              borderRadius: "var(--radius-lg)", 
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <span style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                Product Info
              </span>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Availability</span>
                <span style={{ color: stockColor, fontWeight: "600" }}>{stockText}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>SKU Reference</span>
                <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-geist-mono)" }}>PRD-#{product.id * 1024}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Description & Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ 
                fontSize: "0.75rem", 
                fontWeight: "700", 
                textTransform: "uppercase", 
                color: "var(--text-muted)", 
                letterSpacing: "0.05em" 
              }}>
                {product.category}
              </span>
              
              <span style={{ 
                fontSize: "0.725rem", 
                fontWeight: "600",
                color: stockColor,
                backgroundColor: stockBg,
                border: `1px solid ${stockBorder}`,
                padding: "0.15rem 0.5rem",
                borderRadius: "0.25rem"
              }}>
                {stockText}
              </span>
            </div>

            <h1 className="details-title" style={{ fontSize: "2rem", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "0.25rem", lineHeight: "1.2" }}>
              {product.title}
            </h1>
            
            {product.brand && (
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "-0.5rem" }}>
                Brand: <strong style={{ color: "var(--text-primary)" }}>{product.brand}</strong>
              </p>
            )}

            <div className="details-msg" style={{ margin: "1rem 0 1.5rem 0", backgroundColor: "rgba(255, 255, 255, 0.015)" }}>
              <p style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Description</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>{product.description}</p>
            </div>

            {/* Ratings & Price */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              borderTop: "1px solid var(--border-color)", 
              paddingTop: "1.25rem", 
              marginTop: "0.5rem" 
            }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Price</span>
                <span style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--text-primary)" }}>${product.price.toFixed(2)}</span>
              </div>
              {product.rating && (
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Rating</span>
                  <span className="product-rating" style={{ fontSize: "1.15rem" }}>
                    <Star size={16} fill="currentColor" stroke="none" />
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="details-actions" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <Link href="/products" className="btn btn-secondary" style={{ flex: 0.8, height: "46px" }}>
                Catalog
              </Link>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1.2, height: "46px" }}
                onClick={() => alert(`Added "${product.title}" to cart!`)}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
