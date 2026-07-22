'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '../components/Banner';
import Guarantees from '../components/Guarantees';
import { useWishlist } from '../contexts/WishlistContext';
import { useComparison } from '../contexts/ComparisonContext';
import { useCart } from '../CartContext';

interface UserAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function ProfilePage() {
  const { wishlist } = useWishlist();
  const { comparison } = useComparison();
  const { cartItems } = useCart();

  const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'address'>('details');
  const [orders, setOrders] = useState<string[]>([]);
  const [address, setAddress] = useState<UserAddress>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 234-5678',
    address: '400 University Drive Suite 200',
    city: 'Coral Gables',
    postalCode: '33134',
    country: 'United States',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Load saved orders from localStorage
    try {
      const savedOrders = localStorage.getItem('myOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      const savedAddr = localStorage.getItem('user_profile_address');
      if (savedAddr) {
        setAddress(JSON.parse(savedAddr));
      }
    } catch (err) {
      console.warn('Unable to access localStorage:', err);
    }
  }, []);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('user_profile_address', JSON.stringify(address));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save address:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="User Profile" showLogo={false} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-[#FFF3E3] to-[#F4F5F7] p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 rounded-full bg-[#B88E2F] text-white flex items-center justify-center text-3xl font-bold shadow-md shrink-0">
              {address.fullName ? address.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{address.fullName || 'Valued Customer'}</h1>
              <p className="text-sm text-gray-600 font-medium">{address.email || 'customer@example.com'}</p>
              <span className="inline-block mt-2 bg-[#B88E2F]/10 text-[#B88E2F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Gold Member
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-end text-center">
            <Link href="/orders" className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-2xs hover:border-[#B88E2F] transition-all">
              <span className="block text-2xl font-bold text-[#B88E2F]">{orders.length}</span>
              <span className="text-xs text-gray-500 font-medium uppercase">Orders</span>
            </Link>

            <Link href="/wishlist" className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-2xs hover:border-[#B88E2F] transition-all">
              <span className="block text-2xl font-bold text-[#B88E2F]">{wishlist.length}</span>
              <span className="text-xs text-gray-500 font-medium uppercase">Wishlist</span>
            </Link>

            <Link href="/cart" className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-2xs hover:border-[#B88E2F] transition-all">
              <span className="block text-2xl font-bold text-[#B88E2F]">{cartItems.length}</span>
              <span className="text-xs text-gray-500 font-medium uppercase">In Cart</span>
            </Link>

            <Link href="/comparison" className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-2xs hover:border-[#B88E2F] transition-all">
              <span className="block text-2xl font-bold text-[#B88E2F]">{comparison.length}</span>
              <span className="text-xs text-gray-500 font-medium uppercase">Comparing</span>
            </Link>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-gray-200 mb-8 gap-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-4 text-base font-semibold transition-all relative ${
              activeTab === 'details'
                ? 'text-[#B88E2F] border-b-2 border-[#B88E2F]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('address')}
            className={`pb-4 text-base font-semibold transition-all relative ${
              activeTab === 'address'
                ? 'text-[#B88E2F] border-b-2 border-[#B88E2F]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Saved Address
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-base font-semibold transition-all relative ${
              activeTab === 'orders'
                ? 'text-[#B88E2F] border-b-2 border-[#B88E2F]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Order History ({orders.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Full Name</span>
                <span className="text-sm font-medium text-gray-900">{address.fullName}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Email Address</span>
                <span className="text-sm font-medium text-gray-900">{address.email}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Phone Number</span>
                <span className="text-sm font-medium text-gray-900">{address.phone}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Default Shipping Address</span>
                <span className="text-sm font-medium text-gray-900 text-right">{address.address}, {address.city}, {address.country}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setActiveTab('address')}
                className="bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors"
              >
                Edit Information
              </button>
            </div>
          </div>
        )}

        {activeTab === 'address' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>

            {savedSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-semibold">
                ✓ Address saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveAddress} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={e => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={e => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={address.address}
                  onChange={e => setAddress({ ...address, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={e => setAddress({ ...address, country: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:outline-none text-sm text-gray-800"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-semibold py-3 px-8 rounded-lg text-sm transition-colors mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link href="/orders" className="text-sm font-semibold text-[#B88E2F] hover:underline">
                View All Orders
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((ordNum, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div>
                      <span className="font-bold text-gray-900 text-base">Order #{ordNum}</span>
                      <p className="text-xs text-gray-500 mt-1">Placed recently • Standard Delivery</p>
                    </div>
                    <Link
                      href={`/orders?search=${ordNum}`}
                      className="mt-3 sm:mt-0 text-sm font-semibold bg-[#B88E2F] text-white py-2 px-4 rounded-lg hover:bg-[#9E7A28] transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-600 mb-4">You have not placed any orders yet.</p>
                <Link href="/shop" className="bg-[#B88E2F] text-white font-semibold py-2.5 px-6 rounded-lg text-sm hover:bg-[#9E7A28] transition-colors inline-block">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <Guarantees />
    </div>
  );
}
