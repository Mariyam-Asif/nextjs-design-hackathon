import { client } from '@/sanity/lib/client';
import ShopClient from './ShopClient';
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

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  displayOrder?: number;
  isActive: boolean;
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

async function fetchCategories(): Promise<Category[]> {
  const query = `
    *[_type == "category" && isActive == true] | order(displayOrder asc, name asc) {
      _id,
      name,
      slug,
      displayOrder,
      isActive
    }
  `;
  return client.fetch(query);
}

export default async function ShopPage() {
  // Fetch data server-side
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  // Pass to client component for interactivity wrapped in Suspense for Next.js 15 searchParams handling
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B88E2F]"></div>
      </div>
    }>
      <ShopClient products={products} categories={categories} />
    </Suspense>
  );
}
