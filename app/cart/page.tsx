"use client";

import Image from "next/image";
import Banner from "../components/Banner";
import delete_icon from "@/public/delete-icon.svg";
import Guarantees from "../components/Guarantees";
import Link from "next/link";
import { useCart } from "../CartContext";

interface CartItem {
  id: string;
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
                  {priceChanges.map((change: any, index: number) => (
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

      <div className="flex flex-col lg:flex-row justify-center gap-8 mt-12 lg:mt-[72px] mb-5 px-10">
        {/* Left side */}
        <div>
          <div className="bg-[#F9F1E7] text-sm md:text-base font-medium flex justify-center items-center gap-[114px] py-4">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {/* Cart items are dynamically rendered */}
          {cartItems.length == 0 ? (
            <div className="flex justify-center items-center mt-8">
              <p>
                No products in cart.{" "}
                <Link href="/shop" className="text-blue-600 relative group">
                  Shop Now
                  <span className="absolute inset-x-0 bottom-0 block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                </Link>
              </p>
            </div>
          ) : (
            <>
              {/* Out of Stock Warning */}
              {hasOutOfStockItems && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 mr-3"
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
                      <p className="text-sm font-medium text-red-800">
                        Some items are out of stock
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        Please remove unavailable items before proceeding to checkout.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {cartItems.map((item:CartItem, index:number) => {
                // Check if quantity exceeds available stock
                const stockExceeded = item.stockQuantity && item.quantity > item.stockQuantity;
                const maxStock = item.stockQuantity || 999;

                return (
                <div
                  key={`${item.id}-${index}`}
                  className={`flex flex-wrap lg:justify-center lg:items-center gap-4 md:gap-8 mt-8 lg:mt-14 ${
                    item.stockStatus === 'outOfStock' ? 'opacity-60' : ''
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={96}
                    height={96}
                  />
                  <div className="flex flex-col md:flex-row justify-between md:justify-center items-start md:items-center gap-4 md:gap-14 text-[#9F9F9F] font-normal ">
                    <div className="flex flex-col gap-2">
                      <p className="text-xl md:text-base">{item.title}</p>
                      {item.stockStatus && getStockBadge(item.stockStatus)}
                      {stockExceeded && item.stockStatus !== 'outOfStock' && (
                        <span className="text-xs text-red-600 font-medium">
                          Only {item.stockQuantity} available
                        </span>
                      )}
                    </div>
                    <p className="text-base">{item.currency || '$'} {item.price.toLocaleString()}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.stockStatus === 'outOfStock' ? item.quantity : maxStock}
                      disabled={item.stockStatus === 'outOfStock'}
                      className={`md:w-8 md:h-8 w-14 h-8 border border-[#9F9F9F] text-center rounded-md text-black ${
                        item.stockStatus === 'outOfStock'
                          ? 'bg-gray-100 cursor-not-allowed'
                          : ''
                      }`}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value), maxStock)
                      }
                    />
                    <div className="hidden md:flex gap-12">
                      <p className={`${item.stockStatus === 'outOfStock' ? 'line-through text-gray-400' : 'text-black'}`}>
                       {item.currency || '$'} {(getNumericPrice(item.price) * item.quantity).toLocaleString()}
                      </p>
                      <Image
                        src={delete_icon}
                        alt="delete item"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </div>
                  </div>
                  {/* Mobile-specific subtotal and delete button */}

                  <div className="flex justify-between items-center mt-8 md:hidden">
                    <p className={`flex gap-10 ${item.stockStatus === 'outOfStock' ? 'line-through text-gray-400' : 'text-black'}`}>
                      Subtotal<span className="font-medium">{item.currency || '$'} {(getNumericPrice(item.price) * item.quantity).toLocaleString()}</span>
                    </p>
                    <Image
                      src={delete_icon}
                      alt="delete item"
                      className="w-5 h-5"
                      onClick={()=>handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              );
              })}
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="bg-[#F9F1E7] mb-8 lg:mb-16 px-12 py-4 flex flex-col justify-center items-center">
          <h3 className="mb-8 lg:mb-[61px] text-center font-semibold text-xl lg:text-2xl">
            Cart Totals
          </h3>
          <div className="flex gap-14 mb-8">
            <p className="text-black font-medium text-sm md:text-base">
              Subtotal
            </p>
            <p className="text-[#9F9F9F] font-normal text-sm md:text-base">
              {cartItems[0]?.currency || '$'} {getCartTotal().toLocaleString()}
            </p>
          </div>
          <div className="flex gap-14 mb-8 lg:mb-12">
            <p className="text-black font-medium text-sm md:text-base">Total</p>
            <p className="text-[#B88E2F] font-medium text-lg md:text-xl">
              {cartItems[0]?.currency || '$'} {getCartTotal().toLocaleString()}
            </p>
          </div>
          <button className="border border-black rounded-2xl font-normal text-base lg:text-xl text-center py-3 lg:py-[14px] px-14 lg:px-[58px] lg:mb-16 transition-all duration-300 hover:bg-black hover:text-white">
            <Link href="/checkout">Check Out</Link>
          </button>
        </div>
      </div>
      <Guarantees />
    </div>
  );
}
