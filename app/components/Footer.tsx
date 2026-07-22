'use client';

import { useState } from "react";
import Image from "next/image";
import line from "@/public/Line.png";
import Link from "next/link";
import line2 from "@/public/Line-2.png";
import { announce } from "../utils/announcer";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    const msg = "Signed up successfully! Thank you for subscribing.";
    setNotification(msg);
    announce(msg, "polite");
    setEmail("");

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-3 md:px-12 lg:px-[100px] py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center md:items-start gap-12">
          {/* Company Information */}
          <div className="flex flex-col justify-center text-center md:text-start">
            <h2 className="font-bold text-2xl mb-6 lg:mb-12 text-[#333333]">Funiro.</h2>
            <address className="font-normal text-sm lg:text-base text-[#9F9F9F] not-italic leading-relaxed">
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
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
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
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payment"
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
                  >
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return"
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
                  >
                    Return
                  </Link>
                </li>
                <li className="col-span-2">
                  <Link
                    href="/privacy"
                    className="hover:text-[#B88E2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded"
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

            {notification && (
              <div role="status" className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-2 rounded border border-emerald-200 animate-fade-in">
                ✓ {notification}
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="flex flex-row justify-center items-center gap-[38px]">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="w-full text-sm leading-5 text-[#3A3A3A] font-normal placeholder-gray-400 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded bg-transparent"
                  required
                />
                <span className="absolute bottom-0 mt-[3px] left-0 w-[115%] h-[1px] bg-black" aria-hidden="true"></span>
              </div>
              <button
                type="submit"
                className="hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded cursor-pointer"
              >
                <span className="text-sm text-black font-medium tracking-wider">SUBSCRIBE</span>
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
          <p className="text-[#9F9F9F] text-sm">2023 furino. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
