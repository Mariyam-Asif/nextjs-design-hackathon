"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Banner from "@/app/components/Banner";
import Guarantees from "@/app/components/Guarantees";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  province?: string;
  zipCode: string;
  phone: string;
  email: string;
}

interface Order {
  orderNumber: string;
  createdAt: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  total: number;
  currency: string;
  additionalInfo?: string;
}

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("order");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) {
      setError("No order number provided");
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      const query = `*[_type == "order" && orderNumber == $orderNumber][0]{
        orderNumber,
        createdAt,
        status,
        paymentStatus,
        paymentMethod,
        customerInfo,
        items,
        subtotal,
        total,
        currency,
        additionalInfo
      }`;

      const result = await client.fetch(query, { orderNumber });

      if (!result) {
        setError("Order not found");
      } else {
        setOrder(result);
      }
    } catch (err) {
      console.error("Failed to fetch order:", err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getNumericPrice = (price: string): number => {
    const priceString = price.toString();
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10) || 0;
  };

  if (loading) {
    return (
      <div>
        <div className="no-print">
          <Banner pageName="Order Confirmation" showLogo={true} />
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B88E2F] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading order details...</p>
          </div>
        </div>
        <div className="no-print">
          <Guarantees />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div>
        <div className="no-print">
          <Banner pageName="Order Not Found" showLogo={true} />
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-semibold mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error || "The order you're looking for doesn't exist or has been removed."}
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#9a7526] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="no-print">
          <Guarantees />
        </div>
      </div>
    );
  }

  return (
    <div>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 20px;
          }
          .print-container {
            max-width: 100%;
            padding: 0;
          }
        }
      `}</style>

      <div className="no-print">
        <Banner pageName="Order Confirmation" showLogo={true} />
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-24 py-16 print-container">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 no-print">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-green-700">
                Thank you for your order. We&apos;ve received your order and will begin processing it shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="font-semibold text-lg">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-semibold">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className="font-semibold capitalize">{order.paymentStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {order.customerInfo.firstName} {order.customerInfo.lastName}
            </p>
            {order.customerInfo.companyName && (
              <p>
                <span className="font-semibold">Company:</span>{" "}
                {order.customerInfo.companyName}
              </p>
            )}
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {order.customerInfo.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {order.customerInfo.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {order.customerInfo.streetAddress}, {order.customerInfo.city}
              {order.customerInfo.province && `, ${order.customerInfo.province}`},{" "}
              {order.customerInfo.zipCode}, {order.customerInfo.country}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {order.currency || '$'} {(getNumericPrice(item.price) * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.currency || '$'} {getNumericPrice(item.price).toLocaleString()} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">{order.currency || 'Rs'} {order.subtotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center text-xl font-semibold">
              <p>Total</p>
              <p className="text-[#B88E2F]">{order.currency || 'Rs'} {order.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {order.additionalInfo && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
            <p className="text-gray-700">{order.additionalInfo}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 no-print">
          <Link
            href="/orders"
            className="text-center bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#9a7526] transition-colors"
          >
            View All Orders
          </Link>
          <Link
            href="/shop"
            className="text-center border border-[#B88E2F] text-[#B88E2F] px-8 py-3 rounded-lg hover:bg-[#B88E2F] hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="text-center border border-gray-400 text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Print Order
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-600 no-print">
          <p className="mb-2">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{order.customerInfo.email}</span>
          </p>
          <p>
            If you have any questions about your order, please contact our support team.
          </p>
        </div>
      </div>
      <div className="no-print">
        <Guarantees />
      </div>
    </div>
  );
}
