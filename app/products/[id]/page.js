import ProductDetailsClient from "@/components/ProductDetailsClient";

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
