import Image from "next/image";
import mainImage from "@/public/main-image.jpg";

import React from "react";
import Link from "next/link";

const ShopPage = () => {
  return (
    <div className="relative">
      <div className="w-full md:h-[50vh] h-[30vh] relative">
        <div className="absolute backdrop-blur-md bg-black opacity-30"></div>
        <Image src={mainImage} alt="main image" className="object-cover w-full h-full opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="font-medium text-[48px]">Shop</h2>
          <h3 className="font-medium text-base">
            <Link href="/">
              <span
                className="hover:text-
            gray-500 cursor-pointer transition-all duration-300 mr-[6px]"
              >
                Home
              </span>
            </Link>
            <span className="hover:text-white cursor-default transition-all duration-300">
              &gt; <span className="font-light">Shop</span>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
