import Image from "next/image";
import syltherine from "@/public/syltherine.png";
import leviosa from "@/public/leviosa.png";
import lolita from "@/public/lolita.png";
import respira from "@/public/respira.png";
import share from "@/public/share-icon.svg";
import compare from "@/public/compare-icon.svg";
import like from "@/public/like-icon.svg";
import lamp from "@/public/night-lamp.png";
import muggo from "@/public/muggo.png";
import pingky from "@/public/pingky.png";
import sofa from "@/public/sofa.png";
import Link from "next/link";

export default function Products() {
  return (
    <div>
      <section className="px-[8%] mb-8">
        <h2 className="font-bold text-4xl text-center text-[#3A3A3A] mb-8">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20">
          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={syltherine}
                alt="Syltherine stylish cafe chair"
                className="img"
              />
              {/* Discount badge */}
              <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                -30%
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Syltherine</p>
              <p className="font-medium text-sm text-[#898989]">
                Stylish cafe chair
              </p>
              <div className="flex flex-row gap-4 mt-2">
                <p className="font-semibold text-lg text-[#3A3A3A]">
                  Rp 2.500.000
                </p>
                <p className="text-[#B0B0B0] text-sm font-normal line-through">
                  Rp 3.500.000
                </p>
              </div>
            </div>

            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={leviosa}
                alt="Leviosa stylish cafe chair"
                className="img"
              />
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Leviosa</p>
              <p className="font-medium text-sm text-[#898989]">
                Stylish cafe chair
              </p>
              <p className="font-semibold text-lg text-[#3A3A3A]">
                Rp 2.500.000
              </p>
            </div>
            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[267px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={lolita}
                alt="Lolito luxury big sofa"
                className="img"
              />

              {/* Discount badge */}
              <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                -50%
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[267px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Lolito</p>
              <p className="font-medium text-sm text-[#898989]">
                Luxury big sofa
              </p>
              <div className="flex flex-row gap-6">
                <p className="font-semibold text-lg text-[#3A3A3A]">
                  Rp 7.000.000
                </p>
                <p className="text-[#B0B0B0] text-sm font-normal line-through">
                  Rp 14.000.000
                </p>
              </div>
            </div>
            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[267px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={respira}
                alt="Respira outdoor bar table and stool"
                className="img"
              />
              <div className="absolute top-6 right-6 bg-[#2EC1AC] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                New
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Respira</p>
              <p className="font-medium text-sm text-[#898989]">
                Outdoor bar table and stool
              </p>
              <p className="font-semibold text-lg text-[#3A3A3A]">Rp 500.000</p>
            </div>
            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[8%] mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20">
          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={lamp}
                alt="Syltherine stylish cafe chair"
                className="img"
              />
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Syltherine</p>
              <p className="font-medium text-sm text-[#898989]">
                Stylish cafe chair
              </p>
              <div className="flex flex-row gap-4 mt-2">
                <p className="font-semibold text-lg text-[#3A3A3A]">
                  Rp 2.500.000
                </p>
                <p className="text-[#B0B0B0] text-sm font-normal line-through">
                  Rp 3.500.000
                </p>
              </div>
            </div>

            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={muggo}
                alt="Leviosa stylish cafe chair"
                className="img"
              />
              <div className="absolute top-6 right-6 bg-[#2EC1AC] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                New
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Leviosa</p>
              <p className="font-medium text-sm text-[#898989]">
                Stylish cafe chair
              </p>
              <p className="font-semibold text-lg text-[#3A3A3A]">
                Rp 2.500.000
              </p>
            </div>
            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[267px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={pingky}
                alt="Lolito luxury big sofa"
                className="img"
              />

              {/* Discount badge */}
              <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                -50%
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[267px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Lolito</p>
              <p className="font-medium text-sm text-[#898989]">
                Luxury big sofa
              </p>
              <div className="flex flex-row gap-6">
                <p className="font-semibold text-lg text-[#3A3A3A]">
                  Rp 7.000.000
                </p>
                <p className="text-[#B0B0B0] text-sm font-normal line-through">
                  Rp 14.000.000
                </p>
              </div>
            </div>
            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[267px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start group">
            <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={sofa}
                alt="Respira outdoor bar table and stool"
                className="img"
              />
              <div className="absolute top-6 right-6 bg-[#2EC1AC] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
                New
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
              <p className="font-semibold text-xl text-[#3A3A3A]">Respira</p>
              <p className="font-medium text-sm text-[#898989]">
                Outdoor bar table and stool
              </p>
              <p className="font-semibold text-lg text-[#3A3A3A]">Rp 500.000</p>
            </div>
            {/* Hover section with add to cart button */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
              <button className="bg-white text-[#B88E2F] font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105 ">
              <Link href="/cart">Add To Cart</Link>
              </button>
              <div className="flex flex-row gap-5 text-white">
                <div className="flex items-center space-x-1">
                  <Image src={share} alt="share" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Share
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={compare} alt="compare" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Compare
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src={like} alt="like" className="w-4 h-4" />
                  <span className="text-base font-semibold cursor-pointer">
                    Like
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button className="bg-white text-[#B88E2F] text-base font-semibold  border-[#B88E2F] border py-3 pr-[74px] pl-[82px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-[#B88E2F] hover:text-white">
            Show More
          </button>
        </div>
      </section>
    </div>
  );
}
