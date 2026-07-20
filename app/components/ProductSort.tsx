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
    <div className="flex items-center gap-3">
      <label htmlFor="product-sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="product-sort"
        value={value}
        onChange={handleSortChange}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-white"
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
