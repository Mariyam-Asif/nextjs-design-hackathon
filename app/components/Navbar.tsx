"use client";
import logo from "@/public/logo.png";
import favicon from "@/public/brand-favicon.png";
import Image from "next/image";
import Link from "next/link";
import cartIcon from "@/public/cart-icon.png";
import heart from "@/public/heart-icon.png";
import profile from "@/public/profile-icon.png";
import search from "@/public/search-icon.png";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import hamburger from "@/public/hamburger-icon.png";
import Form from "next/form";
import { useCart } from "../CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparison } from "../contexts/ComparisonContext";
import compareIcon from "@/public/compare-icon-black.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { cartItems } = useCart() as { cartItems: unknown[] };
  const { wishlist } = useWishlist();
  const { comparison } = useComparison();

  // Helper to determine if path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const modal = document.getElementById('mobile-menu-drawer');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isMenuOpen]);

  // Calculate total cart items
  const cartItemCount: number = (Array.isArray(cartItems) ? cartItems : []).reduce((total: number, item: any) => total + (item?.quantity || 0), 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  // Escape key handler for search modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchVisible) {
        closeSearch();
      }
    };

    if (isSearchVisible) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchVisible]);

  return (
    <header className="container-padding flex justify-between items-center relative z-35">
      {/* Logo for larger screens */}
      <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded">
        <Image src={logo} alt="SHOP.CO home" className="hidden logo sm:inline" />
      </Link>
      {/* Favicon for smaller screens */}
      <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded sm:hidden">
        <Image src={favicon} alt="SHOP.CO home" className="favicon" />
      </Link>

      {/* Desktop navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex lg:flex-row lg:w-auto"
      >
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/"
              className={`nav-link hover:text-[#B88E2F] hover:border-b-2 hover:border-[#B88E2F] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded ${
                isActive('/') ? 'text-[#B88E2F] font-bold border-b-2 border-[#B88E2F]' : 'text-black'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className={`nav-link hover:text-[#B88E2F] hover:border-b-2 hover:border-[#B88E2F] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded ${
                isActive('/shop') ? 'text-[#B88E2F] font-bold border-b-2 border-[#B88E2F]' : 'text-black'
              }`}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`nav-link hover:text-[#B88E2F] hover:border-b-2 hover:border-[#B88E2F] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded ${
                isActive('/blog') ? 'text-[#B88E2F] font-bold border-b-2 border-[#B88E2F]' : 'text-black'
              }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`nav-link hover:text-[#B88E2F] hover:border-b-2 hover:border-[#B88E2F] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded ${
                isActive('/contact') ? 'text-[#B88E2F] font-bold border-b-2 border-[#B88E2F]' : 'text-black'
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Drawer (accessible slide-in) */}
      {isMenuOpen && (
        <div id="mobile-menu-drawer" className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative bg-white w-full max-w-[280px] h-full p-6 shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 ease-in-out transform">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <span className="font-bold text-xl text-[#B88E2F]">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile main navigation">
                <ul className="flex flex-col gap-4 text-base font-semibold">
                  <li>
                    <Link
                      href="/"
                      onClick={toggleMenu}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        isActive('/') ? 'bg-[#FFF3E3] text-[#B88E2F] font-bold' : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      onClick={toggleMenu}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        isActive('/shop') ? 'bg-[#FFF3E3] text-[#B88E2F] font-bold' : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      onClick={toggleMenu}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        isActive('/blog') ? 'bg-[#FFF3E3] text-[#B88E2F] font-bold' : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={toggleMenu}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        isActive('/contact') ? 'bg-[#FFF3E3] text-[#B88E2F] font-bold' : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-7 sm:gap-9">
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded p-1"
          >
            <Image
              src={hamburger}
              alt=""
              className="w-5 h-5 cursor-pointer"
              aria-hidden="true"
            />
          </button>
        </div>
        <button
          onClick={() => {/* Profile action placeholder */}}
          aria-label="Account profile"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
        >
          <Image
            src={profile}
            alt=""
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
        <button
          onClick={toggleSearch}
          aria-label="Search products"
          aria-expanded={isSearchVisible}
          className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
        >
          <Image
            src={search}
            alt=""
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            aria-hidden="true"
          />
        </button>
        {/* Conditionally rendering the search bar */}
        {isSearchVisible && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={closeSearch}
              aria-hidden="true"
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 p-4 w-11/12 sm:w-1/3 bg-white rounded-xl shadow-lg transition-all duration-300">
              <Form
                action={`/search`}
                className="w-full sm:flex-1 mt-2 sm:mt-0 flex-grow"
              >
                <label htmlFor="search-input" className="sr-only">
                  Search for products
                </label>
                <input
                  id="search-input"
                  type="text"
                  name="query"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white text-gray-800 px-4 py-2 rounded-full focus-within:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 w-full"
                  autoFocus
                />
                <button
                  type="submit"
                  className="sr-only"
                >
                  Search
                </button>
              </Form>
            </div>
          </>
        )}
        <Link
          href="/wishlist"
          aria-label={`Wishlist, ${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'}`}
          className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded inline-block"
        >
          <Image
            src={heart}
            alt=""
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            aria-hidden="true"
          />
          {wishlist.length > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              aria-hidden="true"
            >
              {wishlist.length}
            </span>
          )}
        </Link>
        <Link
          href="/comparison"
          aria-label={`Product comparison, ${comparison.length} ${comparison.length === 1 ? 'item' : 'items'}`}
          className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded inline-block"
        >
          <Image
            src={compareIcon}
            alt=""
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg w-[24px] h-[24px]"
            aria-hidden="true"
            width={24}
            height={24}
          />
          {comparison.length > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              aria-hidden="true"
            >
              {comparison.length}
            </span>
          )}
        </Link>
        <Link
          href="/orders"
          aria-label="My orders"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
        </Link>
        <Link
          href="/cart"
          aria-label={`Shopping cart, ${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'}`}
          className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
        >
          <Image
            src={cartIcon}
            alt=""
            className="icon transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            aria-hidden="true"
          />
          {cartItemCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              aria-hidden="true"
            >
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
