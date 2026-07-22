"use client";

import Image from "next/image";
import Link from "next/link";
import close_icon from "@/public/close-sidebar.svg";
import line from "@/public/line-4.svg";
import remove_icon from "@/public/remove_icon.svg";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
interface CartItem {
  id: string;
  title:string;
  price:string;
  quantity:number;
  imageUrl:string;
  currency?: string;
  stockQuantity?: number;
  stockStatus?: string;
}
interface CartSidebarProps {
  isVisible:boolean;
  onClose: ()=>void;
}
export default function CartSidebar({isVisible, onClose}:CartSidebarProps) {
  const {cartItems, removeFromCart, updateQuantity} = useCart();
  const router = useRouter();

  if(!isVisible) return null;

  const getNumericPrice = (price:string):number =>{
    const priceString = price.toString();
    return parseInt(priceString.replace(/[^0-9]/g, ""),10) || 0;
  }
  const subtotal = cartItems.reduce((total:number, item:CartItem)=> total + getNumericPrice(item.price) * (item.quantity || 0),0);
 
  const navigateTo = (path:string)=>{
    router.push(path);
    onClose();
  }
  const handleIncrement = (id: string, currentQuantity: number, stockQuantity?: number) => {
    // Check if we can increment based on available stock
    if (stockQuantity && currentQuantity >= stockQuantity) {
      // Already at maximum stock, don't increment
      return;
    }
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={onClose}></div>
    <div className="cart-sidebar h-full w-96 flex flex-col p-4 bg-white z-50">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-2xl">Shopping Cart</h3>
          <button onClick={onClose}>
            <Image src={close_icon} alt="close sidebar" className="w-4 h-5" />
          </button>
        </div>

        <Image src={line} alt="line" className="w-auto" />
      </div>

      {/* Cart Items - Scrollable */}
      <div className="flex-1 overflow-y-auto mt-6 space-y-6 pr-2">
        {cartItems.map((item:CartItem)=> {
          const atStockLimit = item.stockQuantity && item.quantity >= item.stockQuantity;
          const isLowStock = item.stockStatus === 'lowStock';
          const isOutOfStock = item.stockStatus === 'outOfStock';

          return (
          <div key={item.id} className="flex items-start space-x-4 cart-item-hover-effect">
            <Link
              href={`/shop/${item.id}`}
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
            >
              <Image src={item.imageUrl} alt={item.title} width={80} height={80} className="rounded-md object-cover"/>
            </Link>
            <div className="flex-grow min-w-0">
              <Link
                href={`/shop/${item.id}`}
                onClick={onClose}
                className="font-semibold text-base text-gray-900 hover:text-[#B88E2F] transition-colors block truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
              >
                {item.title}
              </Link>

              {/* Stock Status Indicators */}
              {isOutOfStock && (
                <span className="text-xs text-red-600 font-medium block mt-1">
                  Out of Stock
                </span>
              )}
              {isLowStock && !isOutOfStock && (
                <span className="text-xs text-yellow-600 font-medium block mt-1">
                  Low Stock
                </span>
              )}
              {atStockLimit && !isOutOfStock && (
                <span className="text-xs text-orange-600 font-medium block mt-1">
                  Only {item.stockQuantity} available
                </span>
              )}

              <div className="flex items-center gap-2 mt-2">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleDecrement(item.id, item.quantity)}
                    className="px-2 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.quantity <= 1 || isOutOfStock}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id, item.quantity, item.stockQuantity)}
                    className="px-2 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={atStockLimit || isOutOfStock}
                    title={atStockLimit ? `Maximum ${item.stockQuantity} available` : ''}
                  >
                    +
                  </button>
                </div>
                <span className="font-light text-xs">X</span>
                <span className="text-[#B88E2F] font-medium text-xs">
                  {item.currency || '$'} {item.price.toLocaleString()}
                </span>
              </div>
            </div>
            <button onClick={()=> removeFromCart(item.id)} className="flex-shrink-0">
              <Image src={remove_icon} alt="remove item" />
            </button>
          </div>
        );
        })}
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="flex-shrink-0 mt-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-normal text-base">Subtotal</p>
          <span className="font-semibold text-base text-[#B88E2F]">
            {cartItems.length > 0 ? `${cartItems[0]?.currency || '$'} ${subtotal.toLocaleString()}` : '$0'}
          </span>
        </div>

        <Image src={line} alt="line" className="w-full mb-4" />

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button className="flex-1 border border-black rounded-full py-2 px-4 text-xs button-hover-effect"
          onClick={()=>navigateTo("/cart")}
          >
            Cart
          </button>
          <button className="flex-1 border border-black rounded-full py-2 px-4 text-xs button-hover-effect"
          onClick={()=>{navigateTo("/checkout")}}>
            Checkout
          </button>
          <button className="flex-1 border border-black rounded-full py-2 px-4 text-xs button-hover-effect"
          onClick={()=>navigateTo("/comparison")}>
            Comparison
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
