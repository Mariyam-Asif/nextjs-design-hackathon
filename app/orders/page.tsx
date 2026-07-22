"use client";

import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  paymentStatus: string;
  total: number;
  currency: string;
  items: Array<{
    title: string;
    quantity: number;
  }>;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Get order numbers from localStorage
      const savedOrders = localStorage.getItem("myOrders");

      if (!savedOrders) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const orderNumbers = JSON.parse(savedOrders);

      if (orderNumbers.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch orders from Sanity
      const query = `*[_type == "order" && orderNumber in $orderNumbers] | order(createdAt desc) {
        _id,
        orderNumber,
        createdAt,
        status,
        paymentStatus,
        total,
        currency,
        items[] {
          title,
          quantity
        }
      }`;

      const result = await client.fetch(query, { orderNumbers });
      setOrders(result);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders");
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
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "shipped":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div>
        <Banner pageName="My Orders" showLogo={true} />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B88E2F] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading your orders...</p>
          </div>
        </div>
        <Guarantees />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Banner pageName="My Orders" showLogo={true} />
        <div className="flex justify-center items-center py-20">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-semibold mb-4">Error Loading Orders</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchOrders}
              className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#9a7526] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Guarantees />
      </div>
    );
  }

  return (
    <div>
      <Banner pageName="My Orders" showLogo={true} />
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-16">
        <h2 className="text-3xl font-semibold mb-8">Order History</h2>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-2xl font-semibold mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven&#39;t placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#9a7526] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}{" "}
                      · Total: {order.currency || '$'} {order.total.toLocaleString()}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/checkout/confirmation?order=${order.orderNumber}`}
                      className="text-center border border-[#B88E2F] text-[#B88E2F] px-6 py-2 rounded-lg hover:bg-[#B88E2F] hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <Link
                        key={index}
                        href="/shop"
                        className="text-sm bg-gray-50 hover:bg-[#B88E2F]/10 hover:text-[#B88E2F] px-3 py-1 rounded transition-colors"
                      >
                        {item.title} (x{item.quantity})
                      </Link>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-sm text-gray-500 px-3 py-1">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Guarantees />
    </div>
  );
}
