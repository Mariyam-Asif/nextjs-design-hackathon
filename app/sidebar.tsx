"use client";

import Image from "next/image";
import close_icon from "@/public/close-sidebar.svg";
import line from "@/public/line-4.svg";
import remove_icon from "@/public/remove_icon.svg";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
interface CartItem {
  title:string;
  price:string;
  quantity:number;
  imageUrl:string;
}
interface CartSidebarProps {
  isVisible:boolean;
  onClose: ()=>void;
}
export default function CartSidebar({isVisible, onClose}:CartSidebarProps) {
  const {cartItems, removeFromCart} = useCart();
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
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={onClose}></div>
    <div className="cart-sidebar h-full w-96 flex-col p-4 bg-white flex justify-between z-50">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-2xl">Shopping Cart</h3>
          <button onClick={onClose}>
            <Image src={close_icon} alt="close sidebar" className="w-4 h-5" />
          </button>
        </div>

        <Image src={line} alt="line" className="w-auto" />

        {/* Cart Items */}
        <div className="mt-6 space-y-6">
          {cartItems.map((item:CartItem)=> (
          <div key={item.title} className="flex items-center space-x-4 cart-item-hover-effect">
            <Image src={item.imageUrl} alt={item.title} width={80} height={80}/>
            <div className="flex-grow">
              <h3 className="font-normal text-base">{item.title}</h3>
              <div className="flex items-center gap-4">
                <span className="text-base font-light">{item.quantity}</span>
                <span className="font-light text-xs">X</span>
                <span className="text-[#B88E2F] font-medium text-xs">
                  Rs. {item.price.toLocaleString()}
                </span>
              </div>
            </div>
            <button onClick={()=> removeFromCart(item.title)}>
              <Image src={remove_icon} alt="remove item" />
            </button>
          </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="mt-40 flex items-center gap-[101px]">
          <p className="font-normal text-base">Subtotal</p>
          <span className="font-semibold text-base text-[#B88E2F]">
            Rs. {subtotal.toLocaleString()}
          </span>
        </div>

        <Image src={line} alt="line" className="w-full my-4" />

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 ">
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
