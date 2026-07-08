"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";
import { Country, State, IState } from "country-state-city";
import line from "@/public/Line.png";
import Image from "next/image";
import { useCart } from "../CartContext";
import { createOrder } from "../actions/orderActions";
import { validateCheckoutForm } from "../utils/orderUtils";
import { client } from "@/sanity/lib/client";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

export default function Checkout() {
  const router = useRouter();
  const { cartItems, clearCart, refreshPrices } = useCart();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryStates, setCountryStates] = useState<IState[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [priceUpdateNotice, setPriceUpdateNotice] = useState<any>(null);
  const [needsReconfirm, setNeedsReconfirm] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  // Refresh prices when checkout page loads
  useEffect(() => {
    if (cartItems.length > 0) {
      refreshPrices();
    }
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setCountryStates(State.getStatesOfCountry(countryCode));
    setFormData({ ...formData, country: countryCode });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const getNumericPrice = (price: string): number => {
    const priceString = price.toString();
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10) || 0;
  };

  const subtotal = cartItems.reduce(
    (total: number, item: any) => total + getNumericPrice(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Validate cart not empty
    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checkout.");
      return;
    }

    // Validate no out of stock items in cart
    const outOfStockItems = cartItems.filter(
      (item: any) => item.stockStatus === 'outOfStock'
    );
    if (outOfStockItems.length > 0) {
      setError(
        "Please remove unavailable items from your cart before placing order."
      );
      return;
    }

    // Validate form
    const validation = validateCheckoutForm(formData);
    if (!validation.valid) {
      setError(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      // Call server action to create order
      const result = await createOrder({
        formData,
        cartItems,
        paymentMethod,
        subtotal,
      });

      if (result.success) {
        // Save order number to localStorage for orders page
        try {
          const savedOrders = localStorage.getItem("myOrders");
          const orderNumbers = savedOrders ? JSON.parse(savedOrders) : [];
          orderNumbers.unshift(result.orderNumber); // Add to beginning
          localStorage.setItem("myOrders", JSON.stringify(orderNumbers));
        } catch (storageError) {
          console.warn("Failed to save order to localStorage:", storageError);
        }

        // Clear cart
        clearCart();

        // Redirect to confirmation page
        router.push(`/checkout/confirmation?order=${result.orderNumber}`);
      } else {
        // Handle validation errors
        if (result.priceChanges && result.priceChanges.length > 0) {
          // Prices changed - show notice and require reconfirmation
          setPriceUpdateNotice(result.priceChanges);
          setNeedsReconfirm(true);
          setError(result.error || "Prices have changed. Please review and place order again.");

          // Refresh cart to get updated prices
          await refreshPrices();
        } else if (result.stockIssues && result.stockIssues.length > 0) {
          // Stock issues - must go back to cart
          setError(result.error || "Stock availability has changed. Please review your cart.");

          // Refresh cart to get updated stock info
          await refreshPrices();
        } else {
          setError(result.error || "Failed to create order");
        }

        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      setError(
        "Failed to create order. Please try again or contact support if the issue persists."
      );
      setIsSubmitting(false);
    }
  };

  const getCountryName = (countryCode: string): string => {
    if (!countryCode) return "";
    const country = Country.getAllCountries().find(c => c.isoCode === countryCode);
    return country?.name || countryCode;
  };

  return (
    <div>
      <Banner pageName="Checkout" showLogo={true} />

      {/* Price Update Notice */}
      {priceUpdateNotice && priceUpdateNotice.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-yellow-600 mr-3 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Prices Have Changed
                </h3>
                <p className="text-yellow-700 mb-3">
                  Some prices have been updated since you loaded this page. Please review the changes below and place your order again to confirm.
                </p>
                <div className="space-y-2">
                  {priceUpdateNotice.map((change: any, index: number) => (
                    <div key={index} className="text-sm text-yellow-800">
                      <span className="font-medium">{change.title}:</span>{' '}
                      <span className="line-through text-gray-500">{change.currency || '$'} {change.cartPrice}</span>
                      {' → '}
                      <span className="font-semibold text-[#B88E2F]">{change.currency || '$'} {change.currentPrice}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setPriceUpdateNotice(null);
                  setNeedsReconfirm(false);
                }}
                className="ml-4 text-yellow-600 hover:text-yellow-800 transition-colors"
                aria-label="Dismiss notification"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Div */}
      <div className="py-16 flex flex-col lg:flex-row justify-center px-6 lg:px-24 gap-6">
        {/* Billing Details */}
        <div className="w-full lg:w-[45%] pt-9 flex flex-col justify-center items-start px-0 lg:px-20 gap-9">
          <h3 className="font-semibold text-4xl">Billing details</h3>
          <form onSubmit={handlePlaceOrder} className="w-full flex flex-col gap-9">
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
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
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
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
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
                value={formData.companyName}
                onChange={handleInputChange}
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
                value={selectedCountry}
                required
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
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
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
                value={formData.city}
                onChange={handleInputChange}
                required
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
                  value={formData.province}
                  onChange={handleInputChange}
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
                value={formData.zipCode}
                onChange={handleInputChange}
                required
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
                value={formData.phone}
                onChange={handleInputChange}
                required
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
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-5 w-full border border-[#9F9F9F] rounded-[10px] px-7 py-6 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B88E2F] hover:border-[#B88E2F]"
              />
            </div>
            <div>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
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
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-medium text-2xl">Product</h3>
              <h3 className="font-medium text-2xl">Subtotal</h3>
            </div>

            {/* Product Items with Images */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item: any) => {
                const stockExceeded = item.stockQuantity && item.quantity > item.stockQuantity;
                const atStockLimit = item.stockQuantity && item.quantity >= item.stockQuantity;
                const isLowStock = item.stockStatus === 'lowStock';

                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div>
                        <h4 className="text-[#9F9F9F] font-normal text-base">
                          {item.title}
                        </h4>
                        <span className="text-black font-medium text-xs">
                          X {item.quantity}
                        </span>
                        {isLowStock && !stockExceeded && (
                          <span className="block text-xs text-yellow-600 font-medium mt-1">
                            Low Stock ({item.stockQuantity} available)
                          </span>
                        )}
                        {stockExceeded && item.stockStatus !== 'outOfStock' && (
                          <span className="block text-xs text-red-600 font-semibold mt-1">
                            ⚠ Only {item.stockQuantity} available (you have {item.quantity} in cart)
                          </span>
                        )}
                        {atStockLimit && !stockExceeded && item.quantity > 1 && (
                          <span className="block text-xs text-orange-600 font-medium mt-1">
                            Maximum available: {item.stockQuantity}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-base font-light">
                      {item.currency || '$'} {(getNumericPrice(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subtotal and Total */}
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-base font-normal">Subtotal</h4>
              <span className="text-base font-light">
                {cartItems[0]?.currency || '$'} {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-base font-normal">Total</h4>
              <h4 className="text-[#B88E2F] font-bold text-2xl">
                {cartItems[0]?.currency || '$'} {subtotal.toLocaleString()}
              </h4>
            </div>
            <Image
              src={line}
              alt="line"
              className="w-full max-w-[500px] h-auto mt-10 mb-5"
            />
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`${
                    paymentMethod === "bank_transfer"
                      ? "bg-black"
                      : "bg-none border border-[#9F9F9F]"
                  } rounded-full w-3 h-3`}
                />
                <h3
                  className={`font-normal text-base ${
                    paymentMethod === "bank_transfer"
                      ? "text-black"
                      : "text-[#9F9F9F]"
                  }`}
                >
                  Direct Bank Transfer
                </h3>
              </div>
              {paymentMethod === "bank_transfer" && (
                <p className="font-light text-base text-[#9F9F9F]">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`${
                    paymentMethod === "cod"
                      ? "bg-black"
                      : "bg-none border border-[#9F9F9F]"
                  } rounded-full w-3 h-3`}
                />
                <h3
                  className={`font-medium text-base ${
                    paymentMethod === "cod" ? "text-black" : "text-[#9F9F9F]"
                  }`}
                >
                  Cash On Delivery
                </h3>
              </div>
              {paymentMethod === "cod" && (
                <p className="font-light text-base text-[#9F9F9F] mb-3">
                  Pay with cash upon delivery.
                </p>
              )}
            </div>
            <p className="text-left font-light text-base leading-6 mb-4 mt-5">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="font-semibold">privacy policy.</span>
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="flex items-center justify-center">
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full lg:w-auto rounded-2xl border border-black px-24 py-4 transition-all duration-300 ease-in-out hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Placing Order..." : "Place order"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Guarantees />
    </div>
  );
}
