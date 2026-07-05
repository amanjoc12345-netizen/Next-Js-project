import ProductsClient from "@/components/ProductsClient";

/**
 * Products Catalog Page (Server Component).
 * Fetches products list on the server and feeds it to ProductsClient.
 */
export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    const res = await fetch("https://dummyjson.com/products", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch catalog (Status: ${res.status})`);
    }
    const data = await res.json();
    products = data.products || [];
  } catch (err) {
    error = err.message;
  }

  return <ProductsClient products={products} error={error} />;
}
