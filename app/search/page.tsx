"use client";

import { client } from "@/sanity/lib/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../CartContext";
import CartSidebar from "../sidebar";
import Link from "next/link";
import { announce } from "../utils/announcer";

interface Product {
  _id: string;
  imageUrl: string;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  description: string;
  price: string;
  currency: string;
  stockStatus: string;
  stockQuantity: number;
  slug: string;
}

const fetchProducts = async (query: string) => {
  const groqQuery = `*[_type == "product" && title match "${query}*"]{
    _id,
    "imageUrl": productImage.asset->url,
    title,
    description,
    price,
    currency,
    stockStatus,
    stockQuantity,
    "slug": slug.current
    }`;
  const res = await client.fetch(groqQuery);
  return res;
};
const truncateDescription = (description:string)=>{
    return description.length > 100 ? description.substring(0,100) + "..." : description;
}
function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError("");
      fetchProducts(query)
        .then((data) => {
          setProducts(data);
          setLoading(false);

          // Announce search results
          if (data.length === 0) {
            announce(`No products found for "${query}". Try different keywords.`, "polite");
          } else {
            announce(`Found ${data.length} ${data.length === 1 ? 'product' : 'products'} for "${query}".`, "polite");
          }
        })
        .catch((err) => {
          console.error("Search error:", err);
          const errorMsg = "Unable to search products. Please try again.";
          setError(errorMsg);
          setLoading(false);
          announce(errorMsg, "assertive");
        });
    } else {
      setLoading(false);
    }
  }, [query]);

const handleAddToCart = (item:{
  id:string;
  title:string;
  price:string;
  currency: string;
  imageUrl: string;
  stockQuantity?: number;
  stockStatus?: string;
})=>{
    addToCart(item);
    setSidebarVisible(true);
}

  const retrySearch = () => {
    if (query) {
      setLoading(true);
      setError("");
      fetchProducts(query)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setError("Unable to search products. Please try again.");
          setLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="font-bold text-2xl text-[#333333] mb-6">
        Search Results for &quot;{query}&quot;
      </h1>

      {/* Error State */}
      {error && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-red-800 mb-2">{error}</h2>
            <button
              onClick={retrySearch}
              className="mt-4 bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9a7526] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div className="flex justify-center items-center py-20" aria-busy="true" aria-live="polite">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B88E2F] mx-auto mb-4" aria-hidden="true"></div>
            <p className="text-lg text-gray-600">Searching products...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && query && (
        <div className="text-center py-12">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
          <p className="text-gray-600 mb-6">
            No products found for &quot;{query}&quot;. Try different keywords.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9a7526] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Browse All Products
          </Link>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              slug={product.slug || product._id}
              imageUrl={product.imageUrl}
              title={product.title}
              description={truncateDescription(product.description)}
              price={product.price}
              currency={product.currency}
              stockStatus={product.stockStatus}
              stockQuantity={product.stockQuantity}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <CartSidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </div>
  );
}

export default function SearchPage(){
  return(
    <Suspense fallback={<p>Loading page...</p>}>
    <SearchPageContent/>
    </Suspense>
  )
}