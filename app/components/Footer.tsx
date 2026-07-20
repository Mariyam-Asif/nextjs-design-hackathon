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
            <address className="font-normal text-sm lg:text-base text-[#9F9F9F] not-italic">
              400 University Drive Suite 200 Coral
              <br />
              Gables,
              <br />
              FL 33134 USA
            </address>
          </div>
          {/* Links and Help Section */}
          <div className="flex flex-col md:flex-row gap-10 lg:gap-[144px]">
            <nav aria-label="Footer navigation">
              <h3 className="font-medium text-center md:text-start text-xl md:text-base text-[#9F9F9F] mb-7 lg:mb-14">
                Links
              </h3>
              <ul className="grid grid-cols-2 md:flex md:flex-col text-center md:text-start gap-2 md:gap-[46px] text-base font-medium">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Help and support">
              <h3 className="font-medium text-center md:text-start text-xl md:text-base text-[#9F9F9F] mb-7 lg:mb-14">
                Help
              </h3>
              <ul className="grid grid-cols-1 md:flex md:flex-col text-center md:text-start gap-5 md:gap-[46px] text-base font-medium">
                <li>
                  <Link
                    href="/orders"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payment"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    Return
                  </Link>
                </li>
                <li className="col-span-2">
                  <Link
                    href="/privacy"
                    className="hover:text-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  >
                    Privacy Policies
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col justify-center text-center md:text-start gap-7">
            <h3 className="text-xl md:text-base text-[#9F9F9F] font-medium">
              Newsletter
            </h3>

            <form className="flex flex-row justify-center items-center gap-[38px]">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full text-sm leading-5 text-[#9F9F9F] font-normal placeholder-gray-500 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
                  required
                />
                <span className="absolute bottom-0 mt-[3px] left-0 w-[115%] h-[1px] bg-black" aria-hidden="true"></span>
              </div>
              <button
                type="submit"
                className="hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
              >
                <span className="text-sm text-black font-medium">SUBSCRIBE</span>
                <Image
                  src={line2}
                  alt=""
                  className="w-[75px] h-[1px] mt-[3px]"
                  aria-hidden="true"
                />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-[35px] text-center md:text-start">
          <Image src={line} alt="" aria-hidden="true" />
          <p>2023 furino. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
