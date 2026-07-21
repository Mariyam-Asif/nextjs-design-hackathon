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
  const { cartItems, addToCart, updateQuantity } = useCart() as any;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const query = `
          *[_type == "product" && slug.current == $slug][0]{
            _id,
            title,
            price,
            currency,
            description,
            discountPercentage,
            "imageUrl": productImage.asset->url,
            stockStatus,
            stockQuantity,
            slug
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
      const existing = cartItems.find((i: any) => i.id === product._id);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantity;

      if (targetQty <= product.stockQuantity) {
        if (existing) {
          updateQuantity(product._id, targetQty);
        } else {
          addToCart({
            id: product._id,
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
      } else {
        announce(`Cannot add more. Only ${product.stockQuantity} items are available in stock.`, "polite");
      }
    }
  };

  const isOutOfStock = product?.stockStatus === "outOfStock";
  const isLowStock = product?.stockStatus === "lowStock";

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
    <div>
      <Banner pageName={product.title} showLogo={true} />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="w-full relative">
            <ImageGallery 
              images={product.imageUrl ? [product.imageUrl, product.imageUrl, product.imageUrl] : []} 
              title={product.title} 
            />
            {product.discountPercentage && (
              <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-medium z-10 pointer-events-none">
                {product.discountPercentage}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold text-[#3A3A3A] mb-4">
              {product.title}
            </h1>

            <p className="text-3xl font-semibold text-[#3A3A3A] mb-4">
              {product.currency} {product.price}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stockStatus === "inStock" && (
                <span className="text-green-500 font-medium">
                  In Stock ({product.stockQuantity} available)
                </span>
              )}
              {isLowStock && (
                <span className="text-yellow-500 font-medium">
                  Low Stock ({product.stockQuantity} left)
                </span>
              )}
              {isOutOfStock && (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-[#898989] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <QuantitySelector
                quantity={quantity}
                stockQuantity={product.stockQuantity}
                disabled={isOutOfStock}
                onChange={setQuantity}
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`
                px-12 py-4 text-lg font-semibold transition-all rounded-lg shadow-sm
                ${
                  isOutOfStock
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#B88E2F] text-white hover:bg-[#9d7728] hover:scale-102 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2"
                }
              `}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
