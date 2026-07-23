"use client";
import favicon from "@/public/brand-favicon.png";
import Image from "next/image";
import Link from "next/link";
import cartIcon from "@/public/cart-icon.png";
import heart from "@/public/heart-icon.png";
import profile from "@/public/profile-icon.svg";
import search from "@/public/search-icon.png";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import hamburger from "@/public/hamburger-icon.png";
import Form from "next/form";
import { useCart } from "../CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparison } from "../contexts/ComparisonContext";
import compareIcon from "@/public/compare-icon-black.svg";
import orderIcon from "@/public/order-icon.svg"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { cartItems } = useCart() as { cartItems: Array<{ quantity?: number }> };
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

  // Close profile dropdown on route change or outside click
  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const modal = document.getElementById('mobile-menu-drawer');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([-1])'
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
  const cartItemCount: number = (Array.isArray(cartItems) ? cartItems : []).reduce((total: number, item: { quantity?: number }) => total + Number(item?.quantity || 0), 0);

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
    <header className="sticky top-0 bg-white z-40 border-b border-gray-100 shadow-2xs">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-[100px] h-[80px]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded p-1">
          <Image
            src={favicon}
            alt="Furniro Logo Icon"
            className="w-8 h-8 sm:w-10 sm:h-8 object-contain"
            priority
          />
          <span className="font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Furniro
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main navigation" className="hidden md:flex justify-between items-center space-x-8 lg:space-x-12 font-medium text-base">
          <Link
            href="/"
            className={`transition-colors duration-200 hover:text-[#B88E2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded py-1 px-2 ${
              isActive('/') ? 'text-[#B88E2F] font-bold' : 'text-gray-800'
            }`}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`transition-colors duration-200 hover:text-[#B88E2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded py-1 px-2 ${
              isActive('/shop') ? 'text-[#B88E2F] font-bold' : 'text-gray-800'
            }`}
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className={`transition-colors duration-200 hover:text-[#B88E2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded py-1 px-2 ${
              isActive('/blog') ? 'text-[#B88E2F] font-bold' : 'text-gray-800'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`transition-colors duration-200 hover:text-[#B88E2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded py-1 px-2 ${
              isActive('/about') ? 'text-[#B88E2F] font-bold' : 'text-gray-800'
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`transition-colors duration-200 hover:text-[#B88E2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded py-1 px-2 ${
              isActive('/contact') ? 'text-[#B88E2F] font-bold' : 'text-gray-800'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Navigation Drawer Overlay */}
        {isMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end md:hidden transition-all duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-left">
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Image src={favicon} alt="" className="w-8 h-7" />
                    <span className="font-bold text-xl text-gray-900">Furniro</span>
                  </div>
                  <button
                    onClick={toggleMenu}
                    aria-label="Close menu"
                    className="p-2 text-gray-500 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav aria-label="Mobile navigation" className="mt-8 flex flex-col space-y-4">
                  <Link
                    href="/"
                    onClick={toggleMenu}
                    className={`text-lg font-semibold px-4 py-3 rounded-lg transition-colors ${
                      isActive('/') ? 'bg-[#FFF3E3] text-[#B88E2F]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/shop"
                    onClick={toggleMenu}
                    className={`text-lg font-semibold px-4 py-3 rounded-lg transition-colors ${
                      isActive('/shop') ? 'bg-[#FFF3E3] text-[#B88E2F]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/blog"
                    onClick={toggleMenu}
                    className={`text-lg font-semibold px-4 py-3 rounded-lg transition-colors ${
                      isActive('/blog') ? 'bg-[#FFF3E3] text-[#B88E2F]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    onClick={toggleMenu}
                    className={`text-lg font-semibold px-4 py-3 rounded-lg transition-colors ${
                      isActive('/about') ? 'bg-[#FFF3E3] text-[#B88E2F]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={toggleMenu}
                    className={`text-lg font-semibold px-4 py-3 rounded-lg transition-colors ${
                      isActive('/contact') ? 'bg-[#FFF3E3] text-[#B88E2F]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/profile"
                    onClick={toggleMenu}
                    className="text-lg font-semibold px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 border-t border-gray-100 mt-4 pt-4"
                  >
                    My Account
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-gray-100 text-xs text-gray-500 text-center">
                © 2026 Funiro. All rights reserved.
              </div>
            </div>
          </div>
        )}

        {/* Clean Action Icons Bar */}
        <div className="flex items-center gap-5 sm:gap-7">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded p-1.5 hover:bg-gray-100 transition-colors"
            >
              <Image
                src={hamburger}
                alt=""
                className="w-5 h-5 cursor-pointer"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={toggleSearch}
            aria-label="Search products"
            aria-expanded={isSearchVisible}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F]"
          >
            <Image
              src={search}
              alt=""
              className="w-5 h-5 transition-transform hover:scale-110"
              aria-hidden="true"
            />
          </button>

          {/* Collapsible Profile & Account Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="User account menu"
              aria-expanded={isProfileMenuOpen}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F]"
            >
              <Image
                src={profile}
                alt=""
                className="w-5 h-5 transition-transform hover:scale-110"
                aria-hidden="true"
              />
              {(wishlist.length > 0 || comparison.length > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#B88E2F] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsProfileMenuOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-40 animate-fade-in text-sm font-medium">
                  <div className="px-4 py-3 border-b border-gray-100 mb-1">
                    <p className="font-bold text-gray-900 text-sm">Account Overview</p>
                    <p className="text-xs text-gray-500 truncate">Manage saved preferences</p>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                       <Image
                        src={profile}
                        alt=""
                        className="w-5 h-5 transition-transform hover:scale-110"
                        aria-hidden="true"
              />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Image
                      src={orderIcon}
                      alt=""
                      className="w-5 h-5 transition-transform hover:scale-110"
                      aria-hidden="true"
              />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={heart}
                        alt=""
                        className="w-5 h-5 transition-transform hover:scale-110"
                        aria-hidden="true"
              />
                      <span>Wishlist</span>
                    </div>
                    {wishlist.length > 0 && (
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/comparison"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                         <Image
                          src={compareIcon}
                          alt=""
                          className="w-5 h-5 transition-transform hover:scale-110"
                          aria-hidden="true"
              />
                      <span>Comparison</span>
                    </div>
                    {comparison.length > 0 && (
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {comparison.length}
                      </span>
                    )}
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Cart Page Link */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'}`}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F]"
          >
            <Image
              src={cartIcon}
              alt=""
              className="w-5 h-5 transition-transform hover:scale-110"
              aria-hidden="true"
            />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-[#B88E2F] text-white text-[10px] font-extrabold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-xs"
                aria-hidden="true"
              >
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Search Modal Bar */}
        {isSearchVisible && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
              onClick={closeSearch}
              aria-hidden="true"
            />
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 w-11/12 sm:w-1/2 max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 animate-slide-down">
              <Form
                action={`/search`}
                className="w-full flex items-center gap-3"
              >
                <label htmlFor="search-input" className="sr-only">
                  Search for products
                </label>
                <input
                  id="search-input"
                  type="text"
                  name="query"
                  placeholder="Search products by title, category, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 text-gray-800 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B88E2F] w-full text-sm font-medium border border-gray-200"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#B88E2F] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#a87726] transition-colors shrink-0"
                >
                  Search
                </button>
              </Form>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
