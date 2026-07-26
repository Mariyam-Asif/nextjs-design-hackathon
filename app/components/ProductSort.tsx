'use client';

import { getAllSortOptions, SortOption } from '../utils/sortProducts';
import { ShopFilters } from '../hooks/useShopState';

interface ProductSortProps {
  value: string;
  onChange: (updates: Partial<ShopFilters>) => void;
}

export default function ProductSort({ value, onChange }: ProductSortProps) {
  const sortOptions = getAllSortOptions();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ sort: e.target.value as SortOption });
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
      <label htmlFor="product-sort" className="text-xs sm:text-sm font-medium text-gray-700 shrink-0">
        Sort by:
      </label>
      <select
        id="product-sort"
        value={value}
        onChange={handleSortChange}
        className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] bg-white min-h-[40px] grow sm:grow-0"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
