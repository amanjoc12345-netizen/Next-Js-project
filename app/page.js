import HomePageClient from "./HomePageClient";

export const metadata = {
  title: "This is Homepage",
  description: "Welcome to Nexis OS, a premium digital commerce and catalog management platform.",
};

/**
 * Server component homepage.
 * Defines static SEO metadata and renders the client-side UI with animations.
 */
export default function Home() {
  return <HomePageClient />;
}
