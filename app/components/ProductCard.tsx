import Image, { StaticImageData } from "next/image";
import share from "@/public/share-icon.svg";
import compare from "@/public/compare-icon.svg";
import like from "@/public/like-icon.svg";

interface ProductCardProps {
image: StaticImageData | string;
title:string; 
description:string;
price:string;
oldPrice?: string;
discount?: string;
onAddToCart: (item: { id: string; title: string; price: string }) => void; 
}
const ProductCard = ({
    image,
    title,
    description,
    price,
    oldPrice,
    discount,
    onAddToCart,
}:ProductCardProps) => {
  const handleAddToCart = () =>{
    onAddToCart({
      id:title,
      title,
      price,
    });
  };
    return (
        <div className="relative flex flex-col items-start group">
        <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
          <Image src={image} alt={title} className="img" />
          {discount && (
            <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
              {discount}
            </div>
          )}
        </div>
        <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
          <p className="font-semibold text-xl text-[#3A3A3A]">{title}</p>
          <p className="font-medium text-sm text-[#898989]">{description}</p>
          <div className="flex flex-row gap-4 mt-2">
            <p className="font-semibold text-lg text-[#3A3A3A]">{price}</p>
            {oldPrice && (
              <p className="text-[#B0B0B0] text-sm font-normal line-through">
                {oldPrice}
              </p>
            )}
          </div>
        </div>
  
        {/* Hover section with add to cart button */}
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
          <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105"
          onClick={handleAddToCart}
          >
            Add To Cart
          </button>
          <div className="flex flex-row gap-5 text-white">
            <div className="flex items-center space-x-1">
              <Image src={share} alt="share" className="w-4 h-4" />
              <span className="text-base font-semibold cursor-pointer">Share</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image src={compare} alt="compare" className="w-4 h-4" />
              <span className="text-base font-semibold cursor-pointer">Compare</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image src={like} alt="like" className="w-4 h-4" />
              <span className="text-base font-semibold cursor-pointer">Like</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;
