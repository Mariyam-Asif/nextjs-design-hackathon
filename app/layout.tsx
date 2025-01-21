import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from './CartContext';
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
        <Navbar/>
        <CartProvider>{children}</CartProvider>
        <Footer/>
      </body>
    </html>
  );
}
