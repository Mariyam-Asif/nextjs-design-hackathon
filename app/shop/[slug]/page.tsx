"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/app/CartContext";
import Banner from "@/app/components/Banner";
import Guarantees from "@/app/components/Guarantees";

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
  const { addToCart } = useCart();

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
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        currency: product.currency,
        imageUrl: product.imageUrl,
        stockQuantity: product.stockQuantity,
        stockStatus: product.stockStatus,
      });
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
            <a
              href="/shop"
              className="bg-[#B88E2F] text-white px-8 py-3 hover:bg-[#9d7728] transition-colors"
            >
              Back to Shop
            </a>
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
          {/* Product Image */}
          <div className="relative w-full h-[400px] lg:h-[600px]">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
            {product.discountPercentage && (
              <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-medium">
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

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`
                px-12 py-4 text-lg font-semibold transition-all
                ${
                  isOutOfStock
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#B88E2F] text-white hover:bg-[#9d7728] hover:scale-105"
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
