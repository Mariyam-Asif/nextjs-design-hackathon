import Image from "next/image";
import line from "@/public/Line.png";
import Link from "next/link";
import line2 from "@/public/Line-2.png";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-screen-2xl mx-auto px-3 md:px-12 lg:px-[100px] py-12 ">
        <div className="flex flex-col lg:flex-row justify-between items-center md:items-start gap-12">
          {/* Company Information */}
          <div className="flex flex-col justify-center text-center md:text-start">
            <h2 className="font-bold text-2xl mb-6 lg:mb-12">Funiro.</h2>
            <p className="font-normal text-sm lg:text-base text-[#9F9F9F]">
              400 University Drive Suite 200 Coral
              <br />
              Gables,
              <br />
              FL 33134 USA
            </p>
          </div>
          {/* Links and Help Section */}
          <div className="flex flex-col md:flex-row gap-10 lg:gap-[144px]">
            <div>
              <h3 className="font-medium text-center md:text-start text-xl md:text-base text-[#9F9F9F] mb-7 lg:mb-14">
                Links
              </h3>
              <ul className="grid grid-cols-2 md:flex md:flex-col text-center md:text-start gap-2 md:gap-[46px] text-base font-medium">
                <li className="hover:text-gray-700 transition">
                  <Link href="/">Home </Link>
                </li>
                <li className="hover:text-gray-700 transition">
                  <Link href="/shop">Shop</Link>
                </li>
                <li className="hover:text-gray-700 transition">
                  <Link href="/about">About</Link>
                </li>
                <li className="hover:text-gray-700 transition">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-center md:text-start text-xl md:text-base text-[#9F9F9F] mb-7 lg:mb-14">
                Help
              </h3>
              <ul className="grid grid-cols-1 md:flex md:flex-col text-center md:text-start gap-5 md:gap-[46px] text-base font-medium">
                <li className="hover:text-gray-700 transition">
                  <Link href="/payment">Payment Options</Link>
                </li>
                <li className="hover:text-gray-700 transition">
                  <Link href="/return">Return</Link>
                </li>
                <li className="col-span-2 hover:text-gray-700 transition">
                  <Link href="/privacy">Privacy Policies</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col justify-center text-center md:text-start gap-7">
            <h3 className="text-xl md:text-base text-[#9F9F9F] font-medium">
              Newsletter
            </h3>

            <div className="flex flex-row justify-center items-center gap-[38px]">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full text-sm leading-5  text-[#9F9F9F] font-normal placeholder-gray-500 outline-none"
                />
                <span className="absolute bottom-0 mt-[3px] left-0 w-[115%] h-[1px] bg-black "></span>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-sm text-black font-medium">SUBSCRIBE</p>
                <Image
                  src={line2}
                  alt="line"
                  className="w-[75px] h-[1px] mt-[3px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-[35px] text-center md:text-start">
          <Image src={line} alt="line" />
          <p >2023 furino. All rights reverved</p>
        </div>
      </div>
    </footer>
  );
}
