'use client';

import { useState } from 'react';
import Image from 'next/image';
import Banner from '../components/Banner';
import Guarantees from '../components/Guarantees';
import { useComparison } from '../contexts/ComparisonContext';
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
  stockStatus?: string;
  stockQuantity?: number;
  slug: string;
  category?: string;
  displayOrder?: number;
  _createdAt: string;
}

interface ComparisonClientProps {
  products: Product[];
}

export default function ComparisonClient({ products }: ComparisonClientProps) {
  const { comparison, addToComparison, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart() as unknown as {
    addToCart: (item: {
      id: string;
      slug?: string;
      title: string;
      price: string;
      currency: string;
      imageUrl: string;
      stockQuantity?: number;
      stockStatus?: string;
    }) => void;
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Filter products that are selected for comparison
  const comparedProducts = products.filter(product => comparison.includes(product._id));

  // Products available to add (not currently in comparison)
  const availableToAdd = products.filter(product => !comparison.includes(product._id));

  const handleAddProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const selectedProduct = products.find(p => p._id === selectedId);
      if (selectedProduct) {
        addToComparison(selectedId, selectedProduct.title);
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    const status = product.stockStatus || (product.stockQuantity === 0 ? 'outOfStock' : 'inStock');
    if (status === 'outOfStock') {
      return;
    }

    const rawQty = typeof product.stockQuantity === 'number' ? product.stockQuantity : Number(product.stockQuantity);
    const effectiveQty = (!isNaN(rawQty) && rawQty > 0) ? rawQty : 99;

    addToCart({
      id: product._id,
      slug: product.slug || product._id,
      title: product.title,
      price: product.price.toString(),
      currency: product.currency || 'Rs.',
      imageUrl: product.imageUrl,
      stockQuantity: effectiveQty,
      stockStatus: status,
    });
    setSidebarVisible(true);
  };

  // Helper to generate specification values dynamically
  const getSpecs = (product: Product) => {
    const idShort = product._id.substring(0, 5).toUpperCase();
    const lowerTitle = product.title.toLowerCase();

    let salesPackage = "1 Sofa";
    if (lowerTitle.includes("table") || lowerTitle.includes("desk")) salesPackage = "1 Table";
    else if (lowerTitle.includes("chair") || lowerTitle.includes("stool")) salesPackage = "1 Chair";
    else if (lowerTitle.includes("bed")) salesPackage = "1 Bed";
    else if (lowerTitle.includes("set")) salesPackage = "1 Sofa Set (1 Three Seater, 2 Single Seater)";

    let material = "Solid Wood";
    if (lowerTitle.includes("metal") || lowerTitle.includes("steel")) material = "Metal & Steel";
    else if (lowerTitle.includes("fabric")) material = "Fabric & Cushion";

    let upholstery = "Fabric + Cotton";
    if (lowerTitle.includes("leather")) upholstery = "Premium Leather";

    return {
      salesPackage,
      modelNumber: `TFC-${idShort}`,
      secondaryMaterial: material,
      configuration: lowerTitle.includes("sectional") || lowerTitle.includes("l-shape") ? "L-shaped" : "Straight",
      upholsteryMaterial: upholstery,
      upholsteryColor: lowerTitle.includes("grey") ? "Bright Grey" : "Warm Gold / Brown",
      fillingMaterial: "High-density Foam",
      finishType: "Matte Finish",
      adjustableHeadrest: lowerTitle.includes("adjustable") || lowerTitle.includes("premium") ? "Yes" : "No",
      maxLoad: lowerTitle.includes("set") || lowerTitle.includes("sectional") ? "320 KG" : "150 KG",
      origin: "Pakistan",
      width: lowerTitle.includes("set") || lowerTitle.includes("sectional") ? "265 cm" : "180 cm",
      height: "76 cm",
      depth: "90 cm",
      weight: lowerTitle.includes("set") || lowerTitle.includes("sectional") ? "45 KG" : "25 KG",
      seatHeight: "41.5 cm",
      legHeight: "5.5 cm",
      warrantySummary: "1 Year Manufacturing Warranty",
      warrantyServiceType: "Email claims at support@trevifurniture.com",
      covered: "Warranty against manufacturing defects",
      notCovered: "Damages due to improper usage, wear & tear, and water damage",
      domesticWarranty: "1 Year"
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="Product Comparison" breadcrumbdName="Comparison" showLogo={false} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {comparedProducts.length > 0 ? (
          <>
            {/* Products Header Section */}
            <div className="flex flex-col lg:flex-row justify-between lg:justify-start items-start md:items-center gap-8 mb-12">
              <div className="flex flex-col items-start gap-4 w-full sm:w-auto min-w-[220px]">
                <h3 className="font-semibold text-2xl text-gray-900 leading-tight">
                  Go to Product <br />
                  page for more Products
                </h3>
                <Link href="/shop" className="group">
                  <span className="text-lg text-gray-500 group-hover:text-[#B88E2F] font-semibold transition-colors duration-200">
                    View More
                  </span>
                  <span className="block w-12 h-[2px] bg-gray-500 group-hover:bg-[#B88E2F] mt-1 transition-colors duration-200"></span>
                </Link>
                <button
                  onClick={clearComparison}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 font-bold focus:outline-none underline"
                >
                  Clear All ({comparedProducts.length})
                </button>
              </div>

              {/* Grid of compared product headers */}
              <div className="flex flex-col sm:flex-row flex-grow gap-8 w-full overflow-x-auto">
                {comparedProducts.map(product => (
                  <div key={product._id} className="flex flex-col w-72 shrink-0 bg-gray-50 p-4 rounded-xl relative group border border-gray-100">
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromComparison(product._id, product.title)}
                      className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full p-1.5 focus:outline-none transition-colors border border-red-100"
                      aria-label={`Remove ${product.title} from comparison`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <Link href={`/shop/${product.slug || product._id}`} className="block group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] rounded">
                      <div className="relative w-full h-44 overflow-hidden rounded bg-white group-hover/link:opacity-90 transition-opacity">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-xl pt-4 truncate text-gray-900 group-hover/link:text-[#B88E2F] transition-colors">{product.title}</h3>
                    </Link>
                    <p className="font-medium text-base text-[#B88E2F] pt-1">
                      {product.currency || 'Rs.'} {product.price.toLocaleString()}
                    </p>
                    <div className="flex justify-start items-center pt-2">
                      <p className="font-semibold text-sm text-yellow-600 pr-1">4.5</p>
                      <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="bg-gray-300 w-[1px] h-4 mx-3 inline-block"></span>
                      <p className="text-gray-500 text-xs font-medium">150 Reviews</p>
                    </div>
                  </div>
                ))}

                {/* Dropdown to add more if space permits */}
                {comparedProducts.length < 4 && (
                  <div className="flex flex-col gap-4 justify-center lg:justify-normal items-center lg:items-start w-72 shrink-0 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-300 min-h-[250px]">
                    <h3 className="font-semibold text-xl text-gray-700">Add A Product</h3>
                    <select
                      name="product"
                      onChange={handleAddProductChange}
                      value=""
                      className="w-full bg-[#B88E2F] hover:bg-[#9E7A28] transition-colors text-white text-sm font-semibold px-4 py-3 rounded-lg focus:outline-none text-center cursor-pointer"
                    >
                      <option value="">Choose a Product</option>
                      {availableToAdd.map(p => (
                        <option key={p._id} value={p._id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Comparative Table */}
            <div className="border-t border-gray-200 pt-12 overflow-x-auto">
              <div className="flex flex-row justify-start pb-20 min-w-[800px]">
                {/* Labels Column */}
                <div className="w-[240px] shrink-0 pr-8">
                  {/* General */}
                  <div className="mb-12">
                    <h4 className="font-bold text-2xl text-gray-900 mb-6">General</h4>
                    <div className="text-lg flex flex-col gap-6 text-gray-500 font-medium">
                      <p className="h-7">Sales Package</p>
                      <p className="h-7">Model Number</p>
                      <p className="h-7">Secondary Material</p>
                      <p className="h-7">Configuration</p>
                      <p className="h-7">Upholstery Material</p>
                      <p className="h-7">Upholstery Color</p>
                    </div>
                  </div>

                  {/* Product */}
                  <div className="mb-12">
                    <h4 className="font-bold text-2xl text-gray-900 mb-6">Product</h4>
                    <div className="text-lg flex flex-col gap-6 text-gray-500 font-medium">
                      <p className="h-7">Filling Material</p>
                      <p className="h-7">Finish Type</p>
                      <p className="h-7">Adjustable Headrest</p>
                      <p className="h-7">Maximum Load</p>
                      <p className="h-7">Origin</p>
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="mb-12">
                    <h4 className="font-bold text-2xl text-gray-900 mb-6">Dimensions</h4>
                    <div className="text-lg flex flex-col gap-6 text-gray-500 font-medium">
                      <p className="h-7">Width</p>
                      <p className="h-7">Height</p>
                      <p className="h-7">Depth</p>
                      <p className="h-7">Weight</p>
                      <p className="h-7">Seat Height</p>
                      <p className="h-7">Leg Height</p>
                    </div>
                  </div>

                  {/* Warranty */}
                  <div>
                    <h4 className="font-bold text-2xl text-gray-900 mb-6">Warranty</h4>
                    <div className="text-lg flex flex-col gap-6 text-gray-500 font-medium">
                      <p className="min-h-16">Warranty Summary</p>
                      <p className="min-h-20">Service Type</p>
                      <p className="h-7">Covered</p>
                      <p className="min-h-16">Not Covered</p>
                      <p className="h-7">Domestic Warranty</p>
                    </div>
                  </div>
                </div>

                {/* Values columns separated by dividers */}
                {comparedProducts.map(product => {
                  const specs = getSpecs(product);
                  return (
                    <div key={product._id} className="flex flex-row flex-1 min-w-[280px]">
                      {/* Vertical separator */}
                      <div className="bg-gray-200 w-[1px] shrink-0 mx-6"></div>

                      {/* Values */}
                      <div className="flex-grow pl-2">
                        {/* General specs */}
                        <div className="mb-12 pt-[36px]">
                          <div className="text-lg flex flex-col gap-6 text-gray-900 font-medium">
                            <p className="h-7 truncate">{specs.salesPackage}</p>
                            <p className="h-7 truncate">{specs.modelNumber}</p>
                            <p className="h-7 truncate">{specs.secondaryMaterial}</p>
                            <p className="h-7 truncate">{specs.configuration}</p>
                            <p className="h-7 truncate">{specs.upholsteryMaterial}</p>
                            <p className="h-7 truncate">{specs.upholsteryColor}</p>
                          </div>
                        </div>

                        {/* Product specs */}
                        <div className="mb-12 pt-[36px]">
                          <div className="text-lg flex flex-col gap-6 text-gray-900 font-medium">
                            <p className="h-7 truncate">{specs.fillingMaterial}</p>
                            <p className="h-7 truncate">{specs.finishType}</p>
                            <p className="h-7 truncate">{specs.adjustableHeadrest}</p>
                            <p className="h-7 truncate">{specs.maxLoad}</p>
                            <p className="h-7 truncate">{specs.origin}</p>
                          </div>
                        </div>

                        {/* Dimensions specs */}
                        <div className="mb-12 pt-[36px]">
                          <div className="text-lg flex flex-col gap-6 text-gray-900 font-medium">
                            <p className="h-7 truncate">{specs.width}</p>
                            <p className="h-7 truncate">{specs.height}</p>
                            <p className="h-7 truncate">{specs.depth}</p>
                            <p className="h-7 truncate">{specs.weight}</p>
                            <p className="h-7 truncate">{specs.seatHeight}</p>
                            <p className="h-7 truncate">{specs.legHeight}</p>
                          </div>
                        </div>

                        {/* Warranty specs & add to cart */}
                        <div className="pt-[36px]">
                          <div className="text-lg flex flex-col gap-6 text-gray-900 font-medium">
                            <p className="min-h-16 text-sm">{specs.warrantySummary}</p>
                            <p className="min-h-20 text-sm">{specs.warrantyServiceType}</p>
                            <p className="h-7 truncate text-sm">{specs.covered}</p>
                            <p className="min-h-16 text-sm">{specs.notCovered}</p>
                            <p className="h-7 truncate text-sm">{specs.domesticWarranty}</p>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stockStatus === 'outOfStock'}
                            className={`w-full mt-10 font-semibold py-4 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#B88E2F] shadow-sm text-center ${
                              product.stockStatus === 'outOfStock'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#B88E2F] hover:bg-[#9E7A28] text-white'
                            }`}
                          >
                            {product.stockStatus === 'outOfStock' ? 'Out of Stock' : 'Add To Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="bg-gray-200 w-[1px] shrink-0 ml-6 mr-0 lg:mr-[100px]"></div>
              </div>
            </div>
          </>
        ) : (
          /* Empty state matching specs */
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300 max-w-2xl mx-auto px-4">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products selected for comparison</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Select up to 4 products from the shop to compare them side-by-side.
            </p>
            <Link href="/shop">
              <button className="bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]">
                Browse Products
              </button>
            </Link>
          </div>
        )}
      </div>

      <Guarantees />

      {/* Cart Sidebar */}
      <CartSidebar
        isVisible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </div>
  );
}
