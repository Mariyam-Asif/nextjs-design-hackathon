import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import Banner from '../../components/Banner';
import Guarantees from '../../components/Guarantees';
import admin from "@/public/admin_icon.svg";
import dateIcon from "@/public/date_icon.svg";
import tagIcon from "@/public/tag_icon.svg";
import post0 from "@/public/post0.png";
import post1 from "@/public/post1.png";
import post2 from "@/public/post2.png";
import post3 from "@/public/post3.png";
import post4 from "@/public/post4.png";

// Import local blog images for fallback posts
import blog_0 from "@/public/blog-0.jpg";
import blog_1 from "@/public/blog-1.jpg";
import blog_2 from "@/public/blog-2.jpg";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: unknown;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  tags?: string[];
  localImage?: unknown;
}

const FALLBACK_POSTS: Record<string, BlogPost> = {
  "going-all-in-with-millennial-design": {
    _id: "fallback-0",
    title: "Going all-in with millennial design",
    slug: "going-all-in-with-millennial-design",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Admin",
    publishedAt: "2022-10-14T00:00:00Z",
    tags: ["Wood"],
    localImage: blog_0,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }]
      }
    ]
  },
  "exploring-new-ways-of-decorating": {
    _id: "fallback-1",
    title: "Exploring new ways of decorating",
    slug: "exploring-new-ways-of-decorating",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Admin",
    publishedAt: "2022-10-14T00:00:00Z",
    tags: ["Handmade"],
    localImage: blog_1,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }]
      }
    ]
  },
  "handmade-pieces-that-took-time-to-make": {
    _id: "fallback-2",
    title: "Handmade pieces that took time to make",
    slug: "handmade-pieces-that-took-time-to-make",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Admin",
    publishedAt: "2022-10-14T00:00:00Z",
    tags: ["Wood"],
    localImage: blog_2,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }]
      }
    ]
  }
};

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const query = `
      *[_type == "blogPost" && slug.current == $slug][0] {
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
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching blog post from Sanity:", error);
    return null;
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const sanityPost = await fetchBlogPost(slug);
  const post = sanityPost || FALLBACK_POSTS[slug];

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
        <p className="text-gray-600 mb-6">The blog article you are looking for does not exist.</p>
        <Link href="/blog">
          <button className="bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none">
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  // Helper to render portable text body block
  const renderBody = (body: unknown) => {
    if (!body || !Array.isArray(body)) return null;

    return body.map((block: Record<string, unknown>, i: number) => {
      if (block._type === 'block') {
        const text = block.children?.map((c: Record<string, unknown>) => c.text).join('') || '';

        if (block.style === 'h1') return <h1 key={i} className="text-3xl sm:text-4xl font-bold text-gray-900 my-6 leading-tight">{text}</h1>;
        if (block.style === 'h2') return <h2 key={i} className="text-2xl sm:text-3xl font-bold text-gray-900 my-5 leading-tight">{text}</h2>;
        if (block.style === 'h3') return <h3 key={i} className="text-xl sm:text-2xl font-bold text-gray-900 my-4 leading-tight">{text}</h3>;
        if (block.style === 'blockquote') return <blockquote key={i} className="border-l-4 border-[#B88E2F] pl-4 italic my-6 text-gray-700 bg-gray-50 py-3 pr-4 rounded-r-lg">{text}</blockquote>;

        return <p key={i} className="text-base text-gray-700 leading-relaxed mb-6">{text}</p>;
      }
      return null;
    });
  };

  const formatDateStr = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return '14 Oct 2022';
    }
  };

  const recentPostsList = [
    { title: "Going all-in with millennial design", date: "03 Aug 2022", img: post0, slug: "going-all-in-with-millennial-design" },
    { title: "Exploring new ways of decorating", date: "03 Aug 2022", img: post1, slug: "exploring-new-ways-of-decorating" },
    { title: "Handmade pieces that took time to make", date: "03 Aug 2022", img: post2, slug: "handmade-pieces-that-took-time-to-make" },
    { title: "Modern home in Milan", date: "03 Aug 2022", img: post3, slug: "modern-home-in-milan" },
    { title: "Colorful office redesign", date: "03 Aug 2022", img: post4, slug: "colorful-office-redesign" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Banner pageName={post.title} breadcrumbdName="Article" showLogo={false} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Column */}
          <article className="w-full lg:w-[68%]">
            <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl mb-8">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : post.localImage ? (
                <Image
                  src={post.localImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : null}
            </div>

            {/* Post Info */}
            <div className="flex flex-wrap items-center gap-6 font-normal text-sm md:text-base text-[#9F9F9F] mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Image src={admin} alt="" className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src={dateIcon} alt="" className="w-4 h-4" />
                <span>{formatDateStr(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src={tagIcon} alt="" className="w-4 h-4" />
                <span>{post.tags?.[0] || 'Design'}</span>
              </div>
            </div>

            {/* Post Body content */}
            <div className="prose prose-lg max-w-none mb-12">
              {renderBody(post.body)}
            </div>

            {/* Back button */}
            <div className="border-t border-gray-100 pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-[#B88E2F] hover:text-[#9E7A28] font-bold group">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar Column */}
          <aside className="w-full lg:w-[28%] flex flex-col gap-10">
            {/* Recent posts */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">Recent Posts</h3>
              <div className="flex flex-col gap-6">
                {recentPostsList.map((p, idx) => (
                  <Link key={idx} href={`/blog/${p.slug}`} className="flex items-center gap-4 group">
                    <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
                      <Image src={p.img} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#B88E2F] transition-colors truncate">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {p.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
