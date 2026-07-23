import { client } from '@/sanity/lib/client';
import ComparisonClient from './ComparisonClient';
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
  stockStatus?: string;
  stockQuantity?: number;
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
      stockStatus,
      stockQuantity,
      "slug": select(
        defined(slug.current) => slug.current,
        string(slug) => slug,
        _id
      ),
      "category": select(
        defined(category->name) => category->name,
        defined(category->slug.current) => category->slug.current,
        string(category) => category,
        ""
      ),
      displayOrder,
      _createdAt
    }
  `;
  return client.fetch(query);
}

export default async function ComparisonPage() {
  const products = await fetchProducts();

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B88E2F]"></div>
      </div>
    }>
      <ComparisonClient products={products} />
    </Suspense>
  );
}
