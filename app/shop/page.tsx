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
import sanityClient from "@sanity/client";

const sanity = sanityClient({
  projectId: "xmtoqufw",
  dataset: "production",
  apiVersion: "2023-10-01",
  useCdn: true,
});

interface Product {
  _id: string;
  title: string;
  price: string;
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
}

const ShopPage = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const fetchProducts = async () => {
    try {
      const query = `
      *[_type == "product"]{
      _id,
      title,
      price,
      description,
      discountPercentage,
      "imageUrl": productImage.asset->url,
      tags,
      stockStatus
      }`;
      const data = await sanity.fetch(query);
      setProducts(data);
      setSortedProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
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

  const handleAddToCart = (product: { title: string; price: string }) => {
    addToCart(product);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20 px-[8%] my-12">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            imageUrl={product.imageUrl}
            title={product.title}
            description={truncateDescription(product.description)}
            price={`Rs ${parsePrice(product.price)}`}
            stockStatus={product.stockStatus}
            discountPercentage={product.discountPercentage}
            onAddToCart={() => handleAddToCart(product)}
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

      <Guarantees />
    </div>
  );
};

export default ShopPage;
