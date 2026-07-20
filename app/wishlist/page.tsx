import { client } from '@/sanity/lib/client';
import WishlistClient from './WishlistClient';
import { Suspense } from 'react';

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

async function fetchProducts(): Promise<Product[]> {
  const query = `
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      price,
      currency,
      description,
      discountPercentage,
      "imageUrl": productImage.asset->url,
      tags,
      stockQuantity,
      "slug": slug.current,
      category,
      displayOrder,
      _createdAt
    }
  `;
  return client.fetch(query);
}

export default async function WishlistPage() {
  const products = await fetchProducts();

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B88E2F]"></div>
      </div>
    }>
      <WishlistClient products={products} />
    </Suspense>
  );
}
