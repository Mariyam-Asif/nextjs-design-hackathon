'use client';

import { useState, useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Banner from '../components/Banner';
import Guarantees from '../components/Guarantees';

import blog_0 from "@/public/blog-0.jpg";
import blog_1 from "@/public/blog-1.jpg";
import blog_2 from "@/public/blog-2.jpg";
import admin from "@/public/admin.svg";
import dateIcon from "@/public/date_icon.svg";
import tagIcon from "@/public/tag_icon.svg";
import post0 from "@/public/post0.png";
import post1 from "@/public/post1.png";
import post2 from "@/public/post2.png";
import post3 from "@/public/post3.png";
import post4 from "@/public/post4.png";
import search_icon from "@/public/search-icon.png";

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
  localImage?: StaticImageData;
}

interface BlogClientProps {
  initialPosts: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  // Static Fallback posts in case Sanity database is empty
  const fallbackPosts: BlogPost[] = useMemo(() => [
    {
      _id: "fallback-0",
      title: "Going all-in with millennial design",
      slug: "going-all-in-with-millennial-design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.",
      author: "Admin",
      publishedAt: "2022-10-14T00:00:00Z",
      tags: ["Wood"],
      localImage: blog_0,
    },
    {
      _id: "fallback-1",
      title: "Exploring new ways of decorating",
      slug: "exploring-new-ways-of-decorating",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.",
      author: "Admin",
      publishedAt: "2022-10-14T00:00:00Z",
      tags: ["Handmade"],
      localImage: blog_1,
    },
    {
      _id: "fallback-2",
      title: "Handmade pieces that took time to make",
      slug: "handmade-pieces-that-took-time-to-make",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.",
      author: "Admin",
      publishedAt: "2022-10-14T00:00:00Z",
      tags: ["Wood"],
      localImage: blog_2,
    }
  ], []);

  const posts = initialPosts.length > 0 ? initialPosts : fallbackPosts;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Filter posts by search query & tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const titleMatches = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const excerptMatches = post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatches = selectedTag
        ? post.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase())
        : true;
      return (titleMatches || excerptMatches) && tagMatches;
    });
  }, [posts, searchQuery, selectedTag]);

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Crafts: 2,
      Design: 8,
      Handmade: 7,
      Interior: 1,
      Wood: 6,
    };
    // Update dynamically if we have posts
    if (initialPosts.length > 0) {
      const dynamicCounts: Record<string, number> = {};
      posts.forEach(post => {
        post.tags?.forEach(tag => {
          dynamicCounts[tag] = (dynamicCounts[tag] || 0) + 1;
        });
      });
      return { ...counts, ...dynamicCounts };
    }
    return counts;
  }, [initialPosts.length, posts]);

  // Format date helper
  const formatDateStr = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return '14 Oct 2022';
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const recentPostsList = useMemo(() => [
    { title: "Going all-in with millennial design", date: "03 Aug 2022", img: post0, slug: "going-all-in-with-millennial-design" },
    { title: "Exploring new ways of decorating", date: "03 Aug 2022", img: post1, slug: "exploring-new-ways-of-decorating" },
    { title: "Handmade pieces that took time to make", date: "03 Aug 2022", img: post2, slug: "handmade-pieces-that-took-time-to-make" },
    { title: "Modern home in Milan", date: "03 Aug 2022", img: post3, slug: "modern-home-in-milan" },
    { title: "Colorful office redesign", date: "03 Aug 2022", img: post4, slug: "colorful-office-redesign" }
  ], []);

  return (
    <>
      <Banner pageName="Blog" showLogo={false} />
      
      <div className="flex flex-col md:flex-row gap-8 justify-center px-6 md:px-0 max-w-[1440px] mx-auto py-12">
        {/* Blogs Column */}
        <div className="w-full md:w-[65%] flex flex-col gap-12">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map(post => (
              <div key={post._id} className="flex flex-col border-b border-gray-100 pb-12">
                <Link href={`/blog/${post.slug}`} className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-[10px] block mb-6">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transform transition-transform duration-500 hover:scale-102"
                    />
                  ) : post.localImage ? (
                    <Image
                      src={post.localImage}
                      alt={post.title}
                      fill
                      className="object-cover transform transition-transform duration-500 hover:scale-102"
                    />
                  ) : null}
                </Link>

                {/* Blog Info */}
                <div className="flex items-center gap-6 font-normal text-sm md:text-base text-[#9F9F9F] mb-4">
                  <div className="flex justify-center items-center gap-2">
                    <Image src={admin} alt="" className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Image src={dateIcon} alt="" className="w-4 h-4" />
                    <span>{formatDateStr(post.publishedAt)}</span>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Image src={tagIcon} alt="" className="w-4 h-4" />
                    <span>{post.tags?.[0] || 'Design'}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-semibold text-2xl md:text-3xl text-gray-900 pb-3 hover:text-[#B88E2F] transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm md:text-base text-[#9F9F9F] font-normal leading-relaxed pb-6">
                  {post.excerpt}
                </p>

                <div className="inline-block">
                  <Link href={`/blog/${post.slug}`} className="group inline-block focus:outline-none">
                    <span className="text-base font-medium text-gray-900 group-hover:text-[#B88E2F] transition-colors">
                      Read more
                    </span>
                    <span className="block mt-2 w-full h-[1px] bg-gray-900 group-hover:bg-[#B88E2F] transition-colors"></span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search query or filter tags.</p>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="w-full md:w-[30%] flex flex-col gap-10">
          {/* Search bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset page on filter
              }}
              className="w-full py-4 px-5 pr-12 border border-[#9F9F9F] rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-gray-800"
            />
            <Image src={search_icon} alt="search icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
          </div>

          {/* Categories list */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">Categories</h3>
            <div className="text-gray-600 font-medium text-base flex flex-col gap-4">
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const isActive = selectedTag?.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedTag(isActive ? null : cat);
                      setCurrentPage(1);
                    }}
                    className={`flex justify-between items-center w-full text-left transition-colors ${
                      isActive ? 'text-[#B88E2F] font-bold' : 'hover:text-[#B88E2F]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="bg-gray-200 text-xs font-bold rounded-full px-2.5 py-1 text-gray-700">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent posts */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">Recent Posts</h3>
            <div className="flex flex-col gap-6">
              {recentPostsList.map((post, idx) => (
                <Link key={idx} href={`/blog/${post.slug}`} className="flex items-center gap-4 group">
                  <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
                    <Image src={post.img} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#B88E2F] transition-colors truncate">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {post.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 my-14">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 ${
              currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[#B88E2F] text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 ${
              currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      <Guarantees />
    </>
  );
}
