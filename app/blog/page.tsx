import { client } from '@/sanity/lib/client';
import BlogClient from './BlogClient';
import { Suspense } from 'react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: any;
  imageUrl: string;
  author: string;
  publishedAt: string;
  tags?: string[];
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      body,
      "imageUrl": mainImage.asset->url,
      author,
      publishedAt,
      tags
    }
  `;
  return client.fetch(query);
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B88E2F]"></div>
      </div>
    }>
      <BlogClient initialPosts={posts} />
    </Suspense>
  );
}
