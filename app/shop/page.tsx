"use client";

import Image from "next/image";
import filter from "@/public/filter.svg";
import display from "@/public/display.svg";
import view from "@/public/view-list.svg";
import line from "@/public/line-3.png";
import ProductCard from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import Guarantees from "../components/Guarantees";
import Banner from "../components/Banner";
import { useCart } from "../CartContext";
import CartSidebar from "../sidebar";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  price: string;
  currency: string;
  description: string;
  discountPercentage: string;
  imageUrl: string;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  tags: string[];
  stockStatus: string;
  stockQuantity: number;
  slug: string;
}

const ShopPage = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const query = `
      *[_type == "product"]{
      _id,
      title,
      price,
      currency,
      description,
      discountPercentage,
      "imageUrl": productImage.asset->url,
      tags,
      stockStatus,
      stockQuantity,
      "slug": slug.current
      }`;
      const data = await client.fetch(query);
      setProducts(data);
      setSortedProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const truncateDescription = (description: string) => {
    return description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(()=>{
    let filteredProducts = [...products];
    if (showAvailableOnly){
      filteredProducts = filteredProducts.filter(
        (product) => product.stockStatus === 'inStock'
      );
    }
    setSortedProducts(filteredProducts);
    setCurrentPage(1);
  }, [showAvailableOnly, products])

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

  const parsePrice = (price: string | number) => {
    const priceString = typeof price === "string" ? price : String(price);
    return parseFloat(priceString.replace(/[^\d.-]/g, "").replace(",", ""));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [productPage, setProductPage] = useState(16);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [errorMessage, setErrorMessage] = useState("");
  const totalPages = Math.ceil(sortedProducts.length / productPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleProductsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    // Validation of valid number and greater than 0
    if (isNaN(value) || value <= 0) {
      setProductPage(16);
      setErrorMessage("Incorrect number");
    } else {
      setErrorMessage("");
      setProductPage(value);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    let sorted = [...products];
    const parsePrice = (price: string | number) => {
      const priceString = typeof price === "string" ? price : String(price);
      return parseFloat(priceString.replace(/[^\d.-]/g, "").replace(",", ""));
    };
    if (sortValue === "low-to-high") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortValue === "high-to-low") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortValue === "newest") {
      sorted = [...products]; //Default sort order
    }
    setSortedProducts(sorted);
    setCurrentPage(1);
  };
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productPage,
    currentPage * productPage
  );

  return (
    <div className="relative">
      <Banner pageName="Shop" showLogo={false} />

      {/* Error State */}
      {error && (
        <div className="max-w-4xl mx-auto px-6 py-12">
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
            <h3 className="text-xl font-semibold text-red-800 mb-2">{error}</h3>
            <button
              onClick={fetchProducts}
              className="mt-4 bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9a7526] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B88E2F] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Content - Only show if not loading and no error */}
      {!loading && !error && (
        <>
          {/* Filter Section */}
          <div className="bg-[#F9F1E7] flex flex-col sm:flex-row justify-between sm:px-[50px] md:px-[70px] lg:px-[100px] py-6 sm:py-8 lg:py-[33px]">
        {/*Left Side */}
        <div className="flex justify-center items-center w-full sm:w-auto">
         
          <div className="flex flex-wrap items-center justify-between gap-3 text-xl font-normal hover:scale-105 transition-all duration-300 ease-in-out">
            <Image
              src={filter}
              alt="Filter"
              className="group hover:opacity-80 transition-all duration-300"
            />
            <span className="text-lg sm:text-xl">Filter</span>
          </div>
          <Image
            src={display}
            alt="display"
            className="mx-[24px] group hover:scale-110 transition-all duration-300 ease-in-out"
          />
          <Image
            src={view}
            alt="view"
            className="mr-[10px] group hover:scale-110 transition-all duration-300 ease-in-out"
          />
          <div className="flex justify-center items-center font-normal text-base">
            <Image
              src={line}
              alt="line"
              className="w-[37px] h-[1px] -rotate-90 hidden sm:block"
            />
            <span className="hidden lg:block">
              Showing 1–{productPage} of {products.length} results
            </span>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center justify-center gap-4 mt-2">
           {/* Toggle Availability */}
           <label className="flex items-center gap-3">
            <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e)=>setShowAvailableOnly(e.target.checked)}
            className="w-5 h-5 accent-[#B88E2F]"
            />
            <span className="text-lg sm:text-xl font-normal">In Stock</span>
          </label>
          {/* Show Field */}
          <div className="flex items-center gap-4">
            <span className="font-normal text-lg sm:text-xl">Show</span>
            <input
              type="number"
              className="w-12 h-12 text-center flex justify-center items-center border-none focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition-all duration-200 text-[#9F9F9F] font-normal text-xl"
              defaultValue={16}
              onChange={handleProductsPerPageChange}
            />
          </div>

          {/* Display Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {/* Sort By Field */}
          
          <div className="flex items-center gap-4">
            
            <span className="font-normal text-lg sm:text-xl">Sort by</span>
            <select
              className="w-32 h-12 px-4 bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition-all duration-200 text-[#9F9F9F] font-normal text-xl"
              onChange={handleSortChange}
            >
              <option value="default" className="focus:bg-[#B88E2F]">
                Default
              </option>
              <option value="low-to-high" className="focus:bg-[#B88E2F]">
                Price: Low to High
              </option>
              <option value="high-to-low" className="focus:bg-[#B88E2F]">
                Price: High to Low
              </option>
              <option value="newest" className="focus:bg-[#B88E2F]">
                Newest
              </option>
            </select>
          </div>
        </div>
      </div>
      {/*Product Section */}
      {sortedProducts.length === 0 ? (
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
          <h3 className="text-2xl font-semibold mb-2">No Products Available</h3>
          <p className="text-gray-600 mb-6">
            {showAvailableOnly
              ? "No products are currently in stock. Try removing the filter."
              : "No products are available at this time."}
          </p>
          {showAvailableOnly && (
            <button
              onClick={() => setShowAvailableOnly(false)}
              className="bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9a7526] transition-colors"
            >
              Show All Products
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20 px-[8%] my-12">
        {currentProducts.map((product) => (
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
      {/* Cart Sidebar */}
      <CartSidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <div className="flex justify-center items-center gap-[38px] mt-[40px] mb-[85px]">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {/* Next Button */}
        {currentPage < totalPages && (
          <div className="flex justify-center">
            <button className="pagination px-7 py-4" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
      </div>
      </>
      )}
      </>
      )}

      <Guarantees />
    </div>
  );
};

export default ShopPage;