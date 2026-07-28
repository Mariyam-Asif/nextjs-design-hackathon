"use client";

import Image from "next/image";
import Banner from "../components/Banner";
import delete_icon from "@/public/delete-icon.svg";
import Guarantees from "../components/Guarantees";
import Link from "next/link";
import { useCart } from "../CartContext";

interface CartItem {
  id: string;
  slug?: string;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
  currency?: string;
  stockStatus?: string;
  stockQuantity?: number;
  oldPrice?: string;
}
export default function Cart() {

const { cartItems, removeFromCart, updateQuantity, priceChanges, clearPriceChanges } = useCart();

const getNumericPrice = (price:string):number =>{
  const priceString = price.toString();
  return parseInt(priceString.replace(/[^0-9]/g, ""),10);
}
  const handleQuantityChange = (id:string, quantity: number, maxStock?: number) => {
    if(!isNaN(quantity) && quantity >= 1) {
      // Enforce stock limit if available
      const finalQuantity = maxStock ? Math.min(quantity, maxStock) : quantity;
      updateQuantity(id, finalQuantity);
    }
  };
  const handleRemoveItem = (id:string) => {
    removeFromCart(id);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total:number, item: CartItem) => {
        // Exclude out of stock items from total
        if (item.stockStatus === 'outOfStock') {
          return total;
        }
        return total + getNumericPrice(item.price) * (item.quantity || 0);
      },
      0
    );
  };

  const getStockBadge = (stockStatus: string) => {
    switch (stockStatus) {
      case 'inStock':
        return (
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
            In Stock
          </span>
        );
      case 'lowStock':
        return (
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
            Low Stock
          </span>
        );
      case 'outOfStock':
        return (
          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  const hasOutOfStockItems = cartItems.some(
    (item: CartItem) => item.stockStatus === 'outOfStock'
  );
  return (
    <div>
      <Banner pageName="Cart" showLogo={true} />

      {/* Price Change Banner */}
      {priceChanges && priceChanges.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <svg
                    className="w-6 h-6 text-yellow-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-yellow-800">
                    Prices Have Been Updated
                  </h3>
                </div>
                <p className="text-yellow-700 mb-3">
                  Prices have been updated for {priceChanges.length} item{priceChanges.length !== 1 ? 's' : ''} in your cart:
                </p>
                <div className="space-y-2">
                  {priceChanges.map((change: { id: string; title: string; oldPrice: string; newPrice: string }, index: number) => (
                    <div key={index} className="text-sm text-yellow-800">
                      <span className="font-medium">{change.title}:</span>{' '}
                      <span className="line-through text-gray-500">{change.oldPrice}</span>
                      {' → '}
                      <span className="font-semibold text-[#B88E2F]">{change.newPrice}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={clearPriceChanges}
                className="ml-4 text-yellow-600 hover:text-yellow-800 transition-colors"
                aria-label="Dismiss notification"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left side - Cart Items */}
          <div className="flex-1 w-full">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 bg-[#F9F1E7] text-sm md:text-base font-semibold text-gray-800 py-4 px-6 rounded-xl mb-6">
              <span className="col-span-5">Product</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-center">Subtotal</span>
              <span className="col-span-1 text-right">Action</span>
            </div>

            {/* Cart items */}
            {cartItems.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 id="empty-cart-heading" className="text-2xl font-bold text-gray-900 mb-2" tabIndex={-1}>
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  Looks like you haven&#39;t added any items to your cart yet.
                </p>
                <Link
                  href="/shop"
                  className="bg-[#B88E2F] hover:bg-[#9a7828] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm min-h-[44px] inline-flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Out of Stock Warning */}
                {hasOutOfStockItems && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-bold text-red-800">
                          Some items are out of stock
                        </p>
                        <p className="text-xs sm:text-sm text-red-700 mt-0.5">
                          Please remove unavailable items before proceeding to checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item: CartItem, index: number) => {
                    const stockExceeded = item.stockQuantity && item.quantity > item.stockQuantity;
                    const maxStock = item.stockQuantity || 999;

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className={`bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all ${
                          item.stockStatus === 'outOfStock' ? 'opacity-60 bg-gray-50' : ''
                        }`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                          {/* Product Image & Title */}
                          <div className="md:col-span-5 flex items-center gap-4">
                            <Link href={`/shop/${item.slug || item.id}`} className="shrink-0 hover:opacity-80 transition-opacity">
                              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </Link>
                            <div className="flex flex-col gap-1 min-w-0 flex-1">
                              <Link href={`/shop/${item.slug || item.id}`} className="hover:text-[#B88E2F] transition-colors">
                                <p className="font-semibold text-base text-gray-900 truncate">{item.title}</p>
                              </Link>
                              {item.stockStatus && getStockBadge(item.stockStatus)}
                              {stockExceeded && item.stockStatus !== 'outOfStock' && (
                                <span className="text-xs text-red-600 font-semibold">
                                  Only {item.stockQuantity} available
                                </span>
                              )}
                              <p className="text-sm font-medium text-gray-500 md:hidden mt-1">
                                {item.currency || 'Rs.'} {item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Desktop Price */}
                          <div className="hidden md:block md:col-span-2 text-center text-sm font-medium text-gray-700">
                            {item.currency || 'Rs.'} {item.price.toLocaleString()}
                          </div>

                          {/* Quantity Selector */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                            <span className="text-xs font-semibold text-gray-500 uppercase md:hidden">Qty:</span>
                            <input
                              id={`quantity-${item.id}`}
                              type="number"
                              value={item.quantity}
                              min="1"
                              max={item.stockStatus === 'outOfStock' ? item.quantity : maxStock}
                              disabled={item.stockStatus === 'outOfStock'}
                              className={`w-16 h-10 border border-gray-300 text-center rounded-lg text-sm font-semibold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] ${
                                item.stockStatus === 'outOfStock' ? 'bg-gray-100 cursor-not-allowed' : ''
                              }`}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value), maxStock)
                              }
                              aria-label={`Quantity of ${item.title}`}
                            />
                          </div>

                          {/* Subtotal */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                            <span className="text-xs font-semibold text-gray-500 uppercase md:hidden">Subtotal:</span>
                            <span className={`font-bold text-sm sm:text-base ${item.stockStatus === 'outOfStock' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                              {item.currency || 'Rs.'} {(getNumericPrice(item.price) * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          {/* Delete Action */}
                          <div className="md:col-span-1 flex justify-end">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label={`Remove ${item.title} from cart`}
                              className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 min-w-[40px] min-h-[40px] flex items-center justify-center"
                            >
                              <Image
                                src={delete_icon}
                                alt=""
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Right Side - Summary Card */}
          <div className="w-full lg:w-[380px] shrink-0 bg-[#F9F1E7] rounded-2xl p-6 sm:p-8 flex flex-col items-center border border-[#F2E3D0]">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Cart Totals
            </h2>
            <div className="w-full space-y-4 mb-8">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                <span className="text-sm font-semibold text-gray-700">Subtotal</span>
                <span className="text-sm font-medium text-gray-600">
                  {cartItems[0]?.currency || 'Rs.'} {getCartTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[#B88E2F]">
                  {cartItems[0]?.currency || 'Rs.'} {getCartTotal().toLocaleString()}
                </span>
              </div>
            </div>

            {hasOutOfStockItems || cartItems.length === 0 ? (
              <button
                disabled
                className="w-full py-3.5 sm:py-4 px-6 border border-gray-300 rounded-xl font-bold text-base text-center text-gray-400 cursor-not-allowed bg-gray-100 min-h-[48px]"
                aria-label="Checkout disabled. Remove out of stock items or add products to continue."
              >
                Check Out
              </button>
            ) : (
              <Link
                href="/checkout"
                className="w-full py-3.5 sm:py-4 px-6 bg-[#B88E2F] hover:bg-[#9a7828] text-white font-bold text-base rounded-xl text-center transition-all duration-300 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-2 min-h-[48px] inline-flex items-center justify-center"
              >
                Check Out
              </Link>
            )}
          </div>
        </div>
      </div>
      <Guarantees />
    </div>
  );
}
