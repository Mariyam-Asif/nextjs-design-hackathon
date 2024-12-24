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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        } sm:flex absolute sm:static top-16 left-0 w-full ${isMenuOpen ? "bg-white shadow-lg": "bg-transparent"} rounded-lg lg:flex-row lg:bg-transparent lg:shadow-none lg:w-auto`}
      >
        <ul className="flex flex-col sm:flex-row items-center lg:flex-row lg:gap-8 lg:static">
          <li>
            <Link href="/" className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/blog" className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link text-black hover:text-gray-700 hover:border-b-2 hover:border-black transition-all duration-300">
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
        <Image src={profile} alt="profile icon" className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg" />
        <Image src={search} alt="search icon" className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg" />
        <Image src={heart} alt="heart icon" className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg" />
        <Link href="/cart"><Image src={cart} alt="add to cart icon" className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg" /></Link>
      </div>
    </div>
  );
}
