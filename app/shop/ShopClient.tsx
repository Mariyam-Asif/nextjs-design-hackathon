'use client';

import { useState } from 'react';
import Banner from '../components/Banner';
import PromotionalBanner from '../components/PromotionalBanner';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import ProductSort from '../components/ProductSort';
import Pagination from '../components/Pagination';
import { useShopState } from '../hooks/useShopState';
import { filterProducts, getPriceRange } from '../utils/filterProducts';
import { sortProducts, SortOption } from '../utils/sortProducts';
import { paginateProducts } from '../utils/paginateProducts';
import { useCart } from '../CartContext';
import CartSidebar from '../sidebar';

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

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  displayOrder?: number;
  isActive: boolean;
}

interface ShopClientProps {
  products: Product[];
  categories: Category[];
}

export default function ShopClient({ products, categories }: ShopClientProps) {
  // Ensure robust number parsing for filter/sort operations
  const sanitizedProducts = products.map(p => ({
    ...p,
    price: typeof p.price === 'string' ? parseFloat(p.price) || 0 : Number(p.price) || 0,
    stockQuantity: typeof p.stockQuantity === 'string' ? parseInt(p.stockQuantity, 10) || 0 : Number(p.stockQuantity) || 0,
  }));

  const { filters, updateState, resetFilters } = useShopState();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
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

  // 1. Calculate price range from all products
  const priceRange = getPriceRange(sanitizedProducts);

  // 2. Filter products
  const filtered = filterProducts(sanitizedProducts, filters);

  // 3. Sort products
  const sorted = sortProducts(filtered, filters.sort as SortOption);

  // 4. Paginate products (12 per page)
  const paginationResult = paginateProducts(sorted, filters.page, 12);

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
      {/* Page Banner */}
      <Banner pageName="Shop" breadcrumbdName="Shop" showLogo={false} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-1/4 shrink-0 border-r border-gray-200 pr-8">
            <ProductFilters
              categories={categories}
              filters={filters}
              priceRange={priceRange}
              onChange={updateState}
              resultCount={filtered.length}
            />
          </aside>

          {/* Main Shop Section */}
          <main className="flex-grow w-full lg:w-3/4">
            <PromotionalBanner placement="shop" />
            {/* Controls Bar */}
            <div className="flex flex-row justify-between items-center mb-8 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-medium py-2.5 px-5 rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-2"
                aria-label="Open filter panel"
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span>Filter</span>
              </button>

              {/* Showing stats / breadcrumbs style text */}
              <div className="text-sm font-medium text-gray-500 hidden sm:block">
                Showing {filtered.length === 0 ? '0' : `${paginationResult.startIndex + 1}–${paginationResult.endIndex}`} of {filtered.length} products
              </div>

              {/* Sort Component */}
              <div className="ml-auto">
                <ProductSort value={filters.sort} onChange={updateState} />
              </div>
            </div>

            {/* Active Filters Summary */}
            {(filters.category || filters.minPrice || filters.maxPrice || (filters.availability && filters.availability.length > 0) || filters.q) && (
              <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">Active filters:</span>
                {filters.q && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                    Search: &quot;{filters.q}&quot;
                    <button onClick={() => updateState({ q: '' })} className="hover:text-red-500 font-bold focus:outline-none">&times;</button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                    Category: {categories.find(c => c.slug.current === filters.category)?.name || filters.category}
                    <button onClick={() => updateState({ category: '' })} className="hover:text-red-500 font-bold focus:outline-none">&times;</button>
                  </span>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                    Price: {filters.minPrice || priceRange.min} - {filters.maxPrice || priceRange.max}
                    <button onClick={() => updateState({ minPrice: '', maxPrice: '' })} className="hover:text-red-500 font-bold focus:outline-none">&times;</button>
                  </span>
                )}
                {filters.availability && filters.availability.map(status => (
                  <span key={status} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                    Status: {status === 'in-stock' ? 'In Stock' : status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                    <button onClick={() => {
                      const updated = filters.availability.filter(s => s !== status);
                      updateState({ availability: updated });
                    }} className="hover:text-red-500 font-bold focus:outline-none">&times;</button>
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#B88E2F] hover:text-[#9E7A28] font-semibold underline ml-2 cursor-pointer focus:outline-none"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {paginationResult.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-6 sm:gap-x-8">
                {paginationResult.products.map(product => {
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
              /* Empty state */
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No products match your filters. Try adjusting your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination controls */}
            <div className="mt-12 flex justify-center">
              <Pagination result={paginationResult} onChange={updateState} />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Overlay */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="relative bg-white w-full max-w-[320px] h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close filters"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filters content */}
              <ProductFilters
                categories={categories}
                filters={filters}
                priceRange={priceRange}
                onChange={updateState}
                resultCount={filtered.length}
              />
            </div>

            {/* Bottom action button for mobile view */}
            <div className="pt-6 border-t border-gray-100 mt-8">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-medium py-3 rounded-lg text-center transition-colors focus:outline-none"
              >
                Apply Filters ({filtered.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </div>
  );
}
