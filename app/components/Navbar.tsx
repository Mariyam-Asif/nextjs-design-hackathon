"use client";
import logo from "@/public/logo.png";
import favicon from "@/public/brand-favicon.png";
import Image from "next/image";
import Link from "next/link";
import cart from "@/public/cart-icon.png";
import heart from "@/public/heart-icon.png";
import profile from "@/public/profile-icon.png";
import search from "@/public/search-icon.png";
import { useState } from "react";
import hamburger from "@/public/hamburger-icon.png";
import Form from "next/form";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const closeSearch = () => {
    setIsSearchVisible(false);
  };
  return (
    <div className="container-padding flex justify-between items-center">
      {/* Logo for larger screens */}
      <Image src={logo} alt="logo" className="hidden logo sm:inline" />
      {/* Favicon for smaller screens */}

      <Image src={favicon} alt="brand favicon" className="favicon sm:hidden" />

      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex absolute sm:static top-16 left-0 w-full ${isMenuOpen ? "bg-white shadow-lg" : "bg-transparent"} rounded-lg lg:flex-row lg:bg-transparent lg:shadow-none lg:w-auto`}
      >
        <ul className="flex flex-col sm:flex-row items-center lg:flex-row lg:gap-8 lg:static">
          <li>
            <Link
              href="/"
              className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center items-center gap-7 sm:gap-9">
        <div className="lg:hidden">
          <button onClick={toggleMenu} aria-label="Toggle navigation menu">
            <Image
              src={hamburger}
              alt="hamburger menu icon for navigation"
              className="w-4 h-4 cursor-pointer"
            />
          </button>
        </div>
        <Image
          src={profile}
          alt="profile icon"
          className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          width={24}
          height={24}
        />
        <button onClick={toggleSearch} className="relative">
          <Image
            src={search}
            alt="search icon"
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          />
        </button>
        {/* Conditionally rendering the search bar */}
        {isSearchVisible && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={closeSearch}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 p-4 w-11/12 sm:w-1/3 bg-white rounded-xl shadow-lg transition-all duration-300">
              <Form
                action={`/search`}
                className="w-full sm:flex-1 mt-2 sm:mt-0 flex-grow"
              >
                <input
                  type="text"
                  name="query"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white text-gray-800 px-4 py-2 rounded-full focus-within:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                />
                <button type="submit" className="sr-only">
                  Search
                </button>
              </Form>
            </div>
          </>
        )}
        <Image
          src={heart}
          alt="heart icon"
          className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
        />
        <Link href="/orders" title="My Orders">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
        </Link>
        <Link href="/cart">
          <Image
            src={cart}
            alt="add to cart icon"
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          />
        </Link>
      </div>
    </div>
  );
}
