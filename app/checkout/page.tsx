"use client";

import { useState } from "react";
import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";
import { Country, State, IState } from "country-state-city";
import line from "@/public/Line.png";
import Image from "next/image";

export default function Checkout() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryStates, setCountryStates] = useState<IState[]>([]);
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setCountryStates(State.getStatesOfCountry(countryCode));
  };

  return (
    <div>
      <Banner pageName="Checkout" showLogo={true} />
      {/* Main Div */}
      <div className="py-16 flex flex-col lg:flex-row justify-center px-24 gap-6">
        {/* Billing Details */}
        <div className="w-full lg:w-[45%] pt-9 flex flex-col justify-center items-start px-0 lg:px-20 gap-9">
          <h3 className="font-semibold text-4xl">Billing details</h3>
          <form className="w-full flex flex-col gap-9">
            <div className="flex gap-8">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block font-medium text-base"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="companyName"
                className="block font-medium text-base"
              >
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            <div>
              <label htmlFor="country" className="block font-medium text-base">
                Country / Region
              </label>
              <select
                onChange={handleCountryChange}
                id="country"
                name="country"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              >
                <option value="">Select a Country</option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="streetAddress"
                className="block font-medium text-base"
              >
                Street address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            <div>
              <label htmlFor="city" className="block font-medium text-base">
                Town / City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7  py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            {/* Provinces */}
            {selectedCountry && countryStates.length > 0 && (
              <div>
                <label
                  htmlFor="province"
                  className="block font-medium text-base"
                >
                  Province
                </label>
                <select
                  id="province"
                  name="province"
                  className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
                >
                  <option value="">Select a Province/State</option>
                  {countryStates.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label htmlFor="zipCode" className="block text-base font-medium">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7  py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium text-base">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-base">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            <div>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                className="w-full border border-[#9F9F9F] rounded-[10px] px-7  py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
                rows={1}
                placeholder="Additional information"
              ></textarea>
            </div>
          </form>
        </div>
        {/* Place Order */}
        <div className="w-full lg:w-[55%] py-10 lg:py-20 px-0 lg:px-9">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-center items-start">
                <h3 className="font-medium text-2xl">Product</h3>
                <h4 className="text-[#9F9F9F] font-normal text-base pt-4">
                  Asgaard Sofa{" "}
                  <span className="text-black font-medium text-xs">X 1</span>
                </h4>
                <h4 className="text-base font-normal pt-5">Subtotal</h4>
                <h4 className="text-base font-normal pt-5">Total</h4>
              </div>
              <div className="flex flex-col justify-center items-end">
                <h3 className="font-medium text-2xl">Subtotal</h3>
                <span className="text-base font-light pt-4">
                  Rs. 250,000.00
                </span>
                <span className="text-base font-light pt-5">
                  Rs. 250,000.00
                </span>
                <h4 className="text-[#B88E2F] font-bold text-2xl pt-5">
                  Rs. 250,000.00
                </h4>
              </div>
            </div>
            <Image
              src={line}
              alt="line"
              className="w-[500px] h-auto mt-10 mb-5"
            />
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-full w-3 h-3"></div>
                <h3 className="font-normal text-base">Direct Bank Transfer</h3> {/* TITLE OF THE OPTION SELECTED */}
              </div>
              <p className="font-light text-base text-[#9F9F9F]"> {/* DESCRIPTION OF THE OPTION SELECTED */}
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-none border border-[#9F9F9F] rounded-full w-3 h-3"></div>
                <h3 className="font-medium text-base text-[#9F9F9F]">
                  Direct Bank Transfer
                </h3>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <div className="bg-none border border-[#9F9F9F] rounded-full w-3 h-3"></div>
                <h3 className="font-medium text-base text-[#9F9F9F]">
                  Cash On Delivery
                </h3>
              </div>
            </div>
            <p className="text-left font-light text-base leading-6 mb-10 mt-5">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="font-semibold">privacy policy.</span>
            </p>
            <div className="flex items-center justify-center">
              <button className="w-full lg:w-auto rounded-2xl border border-black px-24 py-4 transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Guarantees />
    </div>
  );
}
