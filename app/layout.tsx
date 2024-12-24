import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from './CartContext';

export const metadata: Metadata = {
  title: "eCommerce Website | Web Page Design",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <CartProvider>{children}</CartProvider>
        <Footer/>
      </body>
    </html>
  );
}
