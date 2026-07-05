import ProductDetailsClient from "@/components/ProductDetailsClient";

/**
 * Dynamic metadata generator for individual product routes.
 * Awaits route params and fetches details to set the tab title dynamically.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const product = await res.json();
      return {
        title: `${product.title} - Products Store`,
        description: product.description || `View details for ${product.title} on Products Store.`,
      };
    }
  } catch (err) {
    console.error("Failed to generate metadata for product:", err);
  }
  return {
    title: "Product Details - Products Store",
  };
}

/**
 * Product Details Page (Server Component).
 * Fetches the specific product details on the server and feeds them
 * to the premium client details panel.
 */
export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  let product = null;
  let error = null;

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch product (Status: ${res.status})`);
    }
    product = await res.json();
  } catch (err) {
    error = err.message;
  }

  return <ProductDetailsClient product={product} error={error} />;
}
