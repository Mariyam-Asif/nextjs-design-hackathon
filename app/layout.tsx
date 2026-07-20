import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SkipToContent from "./components/SkipToContent";
import { CartProvider } from './CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import PromotionalBanner from "./components/PromotionalBanner";
import Head from "next/head";

export const metadata: Metadata = {
  title: "eCommerce Website | Web Page Design",
  description: "One stop shop for all your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        {/* Preconnect to Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <ComparisonProvider>
              <PromotionalBanner placement="header" />
              {/* Skip to main content link for keyboard users */}
              <SkipToContent />

              {/* Global ARIA live regions for screen reader announcements */}
              <div id="aria-live-polite" aria-live="polite" aria-atomic="true" className="sr-only"></div>
              <div id="aria-live-assertive" aria-live="assertive" aria-atomic="true" className="sr-only"></div>

              {/* Site header and navigation */}
              <Navbar/>

              {/* Main content area */}
              <main id="main-content">
                {children}
              </main>

              {/* Site footer */}
              <Footer/>
            </ComparisonProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
