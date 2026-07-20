'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export interface ShopFilters {
  q: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  availability: string[];
  sort: string;
  page: number;
}

export interface ShopStateReturn {
  filters: ShopFilters;
  updateState: (updates: Partial<ShopFilters>) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: ShopFilters = {
  q: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  availability: [],
  sort: 'featured',
  page: 1,
};

/**
 * Custom hook for managing shop state via URL query parameters
 * Enables shareable, bookmarkable shop views with filters, sorting, and pagination
 */
export function useShopState(): ShopStateReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current filters from URL
  const filters: ShopFilters = {
    q: searchParams.get('q') || DEFAULT_FILTERS.q,
    category: searchParams.get('category') || DEFAULT_FILTERS.category,
    minPrice: searchParams.get('minPrice') || DEFAULT_FILTERS.minPrice,
    maxPrice: searchParams.get('maxPrice') || DEFAULT_FILTERS.maxPrice,
    availability: searchParams.get('availability')?.split(',').filter(Boolean) || DEFAULT_FILTERS.availability,
    sort: searchParams.get('sort') || DEFAULT_FILTERS.sort,
    page: parseInt(searchParams.get('page') || String(DEFAULT_FILTERS.page), 10),
  };

  /**
   * Update URL with new filter values
   * Omits default values to keep URLs clean
   * Resets pagination to page 1 when filters/sort change (unless page is explicitly set)
   */
  const updateState = useCallback(
    (updates: Partial<ShopFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Determine if we're updating filters/sort (should reset page) or just page
      const isPageUpdate = Object.keys(updates).length === 1 && 'page' in updates;

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'availability' && Array.isArray(value)) {
          // Handle availability array
          if (value.length > 0) {
            params.set(key, value.join(','));
          } else {
            params.delete(key);
          }
        } else if (key === 'page') {
          // Handle page number
          const pageNum = typeof value === 'number' ? value : parseInt(String(value), 10);
          if (pageNum > 1) {
            params.set(key, String(pageNum));
          } else {
            params.delete(key); // Omit page 1
          }
        } else {
          // Handle string values
          const strValue = String(value || '');
          const defaultValue = DEFAULT_FILTERS[key as keyof ShopFilters];

          if (strValue && strValue !== defaultValue) {
            params.set(key, strValue);
          } else {
            params.delete(key); // Omit default values
          }
        }
      });

      // Reset to page 1 if filters/sort changed (unless page was explicitly updated)
      if (!isPageUpdate && !('page' in updates)) {
        params.delete('page');
      }

      // Navigate with new params (shallow routing, no scroll)
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  /**
   * Reset all filters to defaults (clears URL params)
   */
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters,
    updateState,
    resetFilters,
  };
}
