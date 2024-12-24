"use client";

import Image from "next/image";
import Banner from "../components/Banner";
import delete_icon from "@/public/delete-icon.svg";
import Guarantees from "../components/Guarantees";
import Link from "next/link";
import { useCart } from "../CartContext";

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string; 
  quantity: number;
}
export default function Cart() {

const { cartItems, removeFromCart, updateQuantity } = useCart();

const getNumericPrice = (price:string):number =>{
  return parseInt(price.replace(/[^0-9]/g, ""))
}
  const handleQuantityChange = (title:string, quantity: number) => {
    if(!isNaN(quantity) && quantity >= 1) {
      updateQuantity(title,quantity);
    }
  };
  const handleRemoveItem = (title:string) => {
    removeFromCart(title);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total:number, item: CartItem) => 
        total + getNumericPrice(item.price) * (item.quantity || 0),
      0
    );
  };
  return (
    <div>
      <Banner pageName="Cart" showLogo={true} />
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
            cartItems.map((item:CartItem, index:number) => (
              <div
                key={`${item.id}-${index}`}
                className="flex flex-wrap lg:justify-center lg:items-center gap-4 md:gap-8 mt-8 lg:mt-14"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24"
                />
                <div className="flex flex-col md:flex-row justify-between md:justify-center items-start md:items-center gap-4 md:gap-14 text-[#9F9F9F] font-normal ">
                  <p className="text-xl md:text-base">{item.title}</p>
                  <p className="text-base">{item.price.toLocaleString()}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="md:w-8 md:h-8 w-14 h-8 border border-[#9F9F9F] text-center rounded-md text-black"
                    onChange={(e) =>
                      handleQuantityChange(item.title, parseInt(e.target.value))
                    }
                  />
                  <div className="hidden md:flex gap-12">
                    <p className="text-black">
                     Rp {(getNumericPrice(item.price) * item.quantity).toLocaleString()}
                    </p>
                    <Image
                      src={delete_icon}
                      alt="delete item"
                      className="w-5 h-5"
                      onClick={() => handleRemoveItem(item.title)}
                    />
                  </div>
                </div>
                {/* Mobile-specific subtotal and delete button */}

                <div className="flex justify-between items-center mt-8 md:hidden">
                  <p className="text-black flex gap-10">
                    Subtotal<span className="font-medium">Rp {(getNumericPrice(item.price) * item.quantity).toLocaleString()}</span>
                  </p>
                  <Image
                    src={delete_icon}
                    alt="delete item"
                    className="w-5 h-5"
                    onClick={()=>handleRemoveItem(item.title)}
                  />
                </div>
              </div>
            ))
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
              Rs. {getCartTotal().toLocaleString()}
            </p>
          </div>
          <div className="flex gap-14 mb-8 lg:mb-12">
            <p className="text-black font-medium text-sm md:text-base">Total</p>
            <p className="text-[#B88E2F] font-medium text-lg md:text-xl">
              Rs. {getCartTotal().toLocaleString()}
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
