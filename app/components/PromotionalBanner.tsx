'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';

interface BannerData {
  _id: string;
  title: string;
  message: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  placement: string[];
  priority: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface PromotionalBannerProps {
  placement: 'header' | 'home' | 'shop' | 'product';
}

export default function PromotionalBanner({ placement }: PromotionalBannerProps) {
  const [activeBanner, setActiveBanner] = useState<BannerData | null>(null);
  const [isDismissed, setIsDismissed] = useState(true); // Default to true (hidden) during SSR to avoid layout shift

  useEffect(() => {
    async function fetchBanners() {
      try {
        const query = `
          *[_type == "banner" && isActive == true] {
            _id,
            title,
            message,
            "imageUrl": image.asset->url,
            ctaText,
            ctaUrl,
            placement,
            priority,
            startDate,
            endDate,
            isActive
          }
        `;
        const banners: BannerData[] = await client.fetch(query);
        const now = new Date();

        // Filter eligible banners client-side for accuracy
        const eligible = banners.filter(b => {
          const start = new Date(b.startDate);
          const end = new Date(b.endDate);
          return (
            b.placement.includes(placement) &&
            start <= now &&
            end >= now
          );
        });

        if (eligible.length > 0) {
          // Sort by priority desc, then get the highest priority one
          const sorted = eligible.sort((a, b) => b.priority - a.priority);
          const banner = sorted[0];

          // Check if banner is dismissed in sessionStorage
          const dismissedMap = JSON.parse(sessionStorage.getItem('banners_dismissed') || '{}');
          if (!dismissedMap[banner._id]) {
            setActiveBanner(banner);
            setIsDismissed(false);
          }
        }
      } catch (error) {
        console.error("Error fetching promotional banner:", error);
      }
    }

    fetchBanners();
  }, [placement]);

  const handleDismiss = () => {
    if (activeBanner) {
      const dismissedMap = JSON.parse(sessionStorage.getItem('banners_dismissed') || '{}');
      dismissedMap[activeBanner._id] = true;
      sessionStorage.setItem('banners_dismissed', JSON.stringify(dismissedMap));
      setIsDismissed(true);
    }
  };

  if (isDismissed || !activeBanner) {
    return null;
  }

  // Visual layout for different placements
  if (placement === 'header') {
    // Elegant top strip banner
    return (
      <div className="bg-[#B88E2F] text-white py-2.5 px-4 text-center relative z-40 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md">
        <span>{activeBanner.message}</span>
        {activeBanner.ctaText && activeBanner.ctaUrl && (
          <Link
            href={activeBanner.ctaUrl}
            className="underline hover:text-gray-100 transition-colors ml-1 focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
          >
            {activeBanner.ctaText}
          </Link>
        )}
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white hover:text-gray-200 transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded-md"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  // Premium callout banner with optional image for home/shop pages
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-gradient-to-r from-[#FFF3E3] to-[#F4F5F7] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md group">
        {/* Background decorative patterns */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#B88E2F]/5 rounded-full blur-xl pointer-events-none"></div>

        {/* Content Section */}
        <div className="flex-grow space-y-3 z-10 text-center md:text-left">
          <span className="inline-block bg-[#B88E2F]/10 text-[#B88E2F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {activeBanner.title}
          </span>
          <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            {activeBanner.message}
          </p>
          {activeBanner.ctaText && activeBanner.ctaUrl && (
            <Link
              href={activeBanner.ctaUrl}
              className="inline-flex items-center justify-center bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2 shadow-sm"
            >
              {activeBanner.ctaText}
            </Link>
          )}
        </div>

        {/* Image Section (optional) */}
        {activeBanner.imageUrl && (
          <div className="relative w-44 h-28 md:w-56 md:h-36 shrink-0 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Image
              src={activeBanner.imageUrl}
              alt={activeBanner.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 rounded-full focus:outline-none transition-colors border border-gray-200/50 shadow-xs"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
