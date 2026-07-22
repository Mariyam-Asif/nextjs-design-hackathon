"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/app/CartContext";
import Banner from "@/app/components/Banner";
import Guarantees from "@/app/components/Guarantees";
import ImageGallery from "@/app/components/ImageGallery";
import QuantitySelector from "@/app/components/QuantitySelector";
import { announce } from "@/app/utils/announcer";

interface Product {
  _id: string;
  title: string;
  price: string;
  currency: string;
  description: string;
  discountPercentage?: string;
  imageUrl: string;
  stockStatus: string;
  stockQuantity: number;
  slug: {
    current: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, updateQuantity, setSidebarVisible } = useCart() as {
    cartItems: Array<{ id: string; quantity: number }>;
    addToCart: (item: unknown) => void;
    updateQuantity: (id: string, quantity: number) => void;
    setSidebarVisible: (visible: boolean) => void;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const query = `
          *[_type == "product" && (slug.current == $slug || _id == $slug)][0]{
            _id,
            title,
            price,
            currency,
            description,
            discountPercentage,
            "imageUrl": productImage.asset->url,
            "images": images[].asset->url,
            stockStatus,
            stockQuantity,
            "slug": slug.current
          }
        `;
        const data = await client.fetch(query, { slug });

        if (!data) {
          setError("Product not found");
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Unable to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product && product.stockStatus !== "outOfStock") {
      const existing = cartItems.find((i: { id: string; quantity: number }) => i.id === product._id);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantity;

      if (targetQty <= product.stockQuantity) {
        if (existing) {
          updateQuantity(product._id, targetQty);
        } else {
          addToCart({
            id: product._id,
            slug: typeof product.slug === 'string' ? product.slug : (product.slug as any)?.current || product._id,
            title: product.title,
            price: product.price,
            currency: product.currency,
            imageUrl: product.imageUrl,
            stockQuantity: product.stockQuantity,
            stockStatus: product.stockStatus,
          });
          if (quantity > 1) {
            updateQuantity(product._id, quantity);
          }
        }
        // Open the cart sidebar pop up
        if (typeof setSidebarVisible === 'function') {
          setSidebarVisible(true);
        }
      } else {
        announce(`Cannot add more. Only ${product.stockQuantity} items are available in stock.`, "polite");
      }
    }
  };

  const isOutOfStock = product?.stockStatus === "outOfStock";
  const isLowStock = product?.stockStatus === "lowStock";

  const galleryImages = product
    ? [
        product.imageUrl,
        ...(Array.isArray((product as any).images)
          ? (product as any).images.filter((img: string) => Boolean(img) && img !== product.imageUrl)
          : [])
      ].filter(Boolean)
    : [];

  if (loading) {
    return (
      <div>
        <Banner pageName="Product" showLogo={true} />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Banner pageName="Product Not Found" showLogo={true} />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <Link
              href="/shop"
              className="bg-[#B88E2F] text-white px-8 py-3 hover:bg-[#9d7728] transition-colors inline-block"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Banner pageName={product.title} breadcrumbdName="Product Details" showLogo={false} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image Gallery */}
          <div className="w-full relative">
            <ImageGallery 
              images={galleryImages} 
              title={product.title} 
            />
            {product.discountPercentage && (
              <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-16 h-16 flex items-center justify-center text-base font-semibold z-10 pointer-events-none shadow-md">
                {product.discountPercentage}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3A3A3A] leading-tight mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 text-base font-medium">
                <span className="text-3xl font-bold text-[#B88E2F]">
                  {product.currency || 'Rs.'} {product.price}
                </span>

                <div className="flex items-center gap-1.5 pl-4 border-l border-gray-200">
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">(5 Customer Reviews)</span>
                </div>
              </div>
            </div>

            {/* Stock Status Badge */}
            <div className="inline-flex items-center">
              {product.stockStatus === "inStock" && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> In Stock ({product.stockQuantity} available)
                </span>
              )}
              {isLowStock && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock (Only {product.stockQuantity} left)
                </span>
              )}
              {isOutOfStock && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-b border-gray-100 py-6 space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Overview</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {product.description || "Elevate your interior living experience with this master-crafted furniture item. Designed for comfort, durability, and timeless aesthetic appeal."}
              </p>
            </div>

            {/* Quantity Selector & Actions */}
            <div className="space-y-6 pt-2">
              <QuantitySelector
                quantity={quantity}
                stockQuantity={product.stockQuantity}
                disabled={isOutOfStock}
                onChange={setQuantity}
              />

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`
                    flex-1 min-w-[200px] py-4 px-8 text-base font-bold rounded-xl shadow-md transition-all duration-300
                    ${
                      isOutOfStock
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#B88E2F] hover:bg-[#9d7728] text-white hover:shadow-lg active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-2"
                    }
                  `}
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
