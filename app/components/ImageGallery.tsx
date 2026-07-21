'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus helper
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (images.length <= 1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % images.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + images.length) % images.length);
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-2 rounded-xl p-2"
      aria-label={`${title} image gallery. Use left and right arrow keys to navigate.`}
    >
      {/* Main Image Container */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-xs">
        <Image
          src={activeImage}
          alt={`${title} - view ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-300"
          priority
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product thumbnails"
          className="flex flex-row gap-3 overflow-x-auto py-2"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                role="tab"
                aria-selected={isActive}
                aria-controls={`gallery-panel-${index}`}
                id={`gallery-tab-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] ${
                  isActive
                    ? 'border-[#B88E2F] scale-102 ring-1 ring-[#B88E2F]'
                    : 'border-gray-200 hover:border-gray-400 hover:scale-102'
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
