import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '8';

    const query = `
      *[_type == "product"] | order(_createdAt desc)[0...${limit}]{
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
        "slug": slug.current,
        "isNew": _createdAt > now() - 60*60*24*30
      }`;

    const products = await client.fetch(query);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
