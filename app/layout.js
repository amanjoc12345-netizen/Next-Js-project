import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexis OS - Premium SaaS Storefront & Catalog Management",
  description: "A state-of-the-art digital storefront catalog and dashboard system.",
};

/**
 * Root Layout Component.
 * Integrates client Providers, central Navbar, and structural Footer.
 * Configures modern dynamic SVG Favicon and imports typography fonts.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Dynamic High-Quality SVG Favicon rendering the Nexis OS logo */}
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2225%22 fill=%22%236366f1%22/><path d=%22M50 25 L20 40 L50 55 L80 40 Z M20 60 L50 75 L80 60 M20 50 L50 65 L80 50%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%228%22 stroke-linejoin=%22round%22 stroke-linecap=%22round%22/></svg>" 
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
