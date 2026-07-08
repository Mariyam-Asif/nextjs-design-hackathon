"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useCart } from "./CartContext";
import CartSidebar from "./sidebar";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: string;
  currency: string;
  description: string;
  discountPercentage: string;
  imageUrl: string;
  tags: string[];
  stockStatus: string;
  stockQuantity: number;
  slug: string;
  isNew: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch from API route instead of direct Sanity import
      const response = await fetch('/api/products?limit=8');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: {
    id: string;
    title: string;
    price: string;
    currency: string;
    imageUrl: string;
    stockQuantity?: number;
    stockStatus?: string;
  }) => {
    addToCart(item);
    setSidebarVisible(true);
  };

  const truncateDescription = (description: string) => {
    return description.length > 50
      ? description.substring(0, 50) + "..."
      : description;
  };

  const parsePrice = (price: string | number) => {
    const priceString = typeof price === "string" ? price : String(price);
    return parseFloat(priceString.replace(/[^\d.-]/g, "").replace(",", ""));
  };

  return (
    <div>
      <section className="px-[8%] mb-8">
        <h2 className="font-bold text-4xl text-center text-[#3A3A3A] mb-8">
          Our Products
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B88E2F] mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <svg
                className="w-16 h-16 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                {error}
              </h3>
              <button
                onClick={fetchProducts}
                className="mt-4 bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9a7526] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                slug={product.slug || product._id}
                imageUrl={product.imageUrl}
                title={product.title}
                description={truncateDescription(product.description)}
                price={parsePrice(product.price).toString()}
                currency={product.currency}
                stockStatus={product.stockStatus}
                stockQuantity={product.stockQuantity}
                discountPercentage={product.discountPercentage}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-2xl font-semibold mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              No products are available at this time.
            </p>
          </div>
        )}

        {/* Show More Button */}
        {!loading && !error && products.length > 0 && (
          <div className="flex justify-center items-center mt-8">
            <Link href="/shop">
              <button className="bg-white text-[#B88E2F] text-base font-semibold border-[#B88E2F] border py-3 pr-[74px] pl-[82px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-[#B88E2F] hover:text-white">
                Show More
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </div>
  );
}
