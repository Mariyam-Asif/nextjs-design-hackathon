'use client';

import { useState } from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../CartContext';
import CartSidebar from '../sidebar';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  discountPercentage?: string;
  imageUrl: string;
  tags?: string[];
  stockQuantity: number;
  slug: string;
  category?: string;
  displayOrder?: number;
  _createdAt: string;
}

interface WishlistClientProps {
  products: Product[];
}

export default function WishlistClient({ products }: WishlistClientProps) {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart() as unknown as {
    addToCart: (item: {
      id: string;
      title: string;
      price: string;
      currency: string;
      imageUrl: string;
      stockQuantity?: number;
      stockStatus?: string;
    }) => void;
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Filter products that are in the wishlist
  const wishlistedProducts = products.filter(product => wishlist.includes(product._id));

  const handleAddToCart = (item: {
    id: string;
    title: string;
    price: string;
    currency: string;
    imageUrl: string;
    stockQuantity?: number;
    stockStatus?: string;
  }) => {
    addToCart(item);
    setSidebarVisible(true);
  };

  const truncateDescription = (description: string) => {
    return description && description.length > 50
      ? description.substring(0, 50) + "..."
      : description || "";
  };

  const getStockStatusCamel = (quantity: number) => {
    if (quantity === 0) return 'outOfStock';
    if (quantity <= 5) return 'lowStock';
    return 'inStock';
  };

  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="Wishlist" showLogo={false} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            My Wishlist ({wishlistedProducts.length})
          </h2>
          {wishlistedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-3 py-2 border border-red-200 hover:bg-red-50"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6">
            {wishlistedProducts.map(product => {
              const discountStr = product.discountPercentage ? String(product.discountPercentage) : '';
              const formattedDiscount = discountStr
                ? (discountStr.endsWith('%') || discountStr.startsWith('-') ? discountStr : `-${discountStr}%`)
                : undefined;

              // Compute old price if discount exists
              let oldPrice: string | undefined = undefined;
              if (product.discountPercentage) {
                const discountVal = parseFloat(discountStr);
                if (!isNaN(discountVal) && discountVal > 0 && discountVal < 100) {
                  const originalPrice = product.price / (1 - discountVal / 100);
                  oldPrice = Math.round(originalPrice).toString();
                }
              }

              return (
                <div key={product._id} className="flex justify-center">
                  <ProductCard
                    id={product._id}
                    slug={product.slug || product._id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    description={truncateDescription(product.description)}
                    price={product.price.toString()}
                    currency={product.currency || 'Rs.'}
                    oldPrice={oldPrice}
                    discountPercentage={formattedDiscount}
                    stockStatus={getStockStatusCamel(product.stockQuantity)}
                    stockQuantity={product.stockQuantity}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state matching specs */
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300 max-w-2xl mx-auto px-4 mt-8">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't added any products to your wishlist yet.
            </p>
            <Link href="/shop">
              <button className="bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </div>
  );
}
