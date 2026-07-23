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
        "slug": select(
          defined(slug.current) => slug.current,
          string(slug) => slug,
          _id
        ),
        "isNew": _createdAt > now() - 60*60*24*30
      }`;

    const rawProducts = await client.fetch(query);
    const products = rawProducts.map((p: Record<string, unknown>) => {
      const status = (p.stockStatus as string) || (p.stockQuantity === 0 ? 'outOfStock' : 'inStock');
      const rawQty = typeof p.stockQuantity === 'number' ? p.stockQuantity : Number(p.stockQuantity);
      const qty = (!isNaN(rawQty) && rawQty >= 0) ? rawQty : (status === 'outOfStock' ? 0 : 10);
      return {
        ...p,
        stockStatus: status,
        stockQuantity: qty,
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
