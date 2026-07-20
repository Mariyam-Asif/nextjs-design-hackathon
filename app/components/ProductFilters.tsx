'use client';

import { ShopFilters } from '../hooks/useShopState';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

interface ProductFiltersProps {
  categories: Category[];
  filters: ShopFilters;
  priceRange: { min: number; max: number };
  onChange: (updates: Partial<ShopFilters>) => void;
  resultCount: number;
}

export default function ProductFilters({
  categories,
  filters,
  priceRange,
  onChange,
  resultCount,
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    (filters.availability && filters.availability.length > 0);

  const handleCategoryChange = (category: string) => {
    onChange({ category: category === filters.category ? '' : category });
  };

  const handlePriceChange = (minPrice: string, maxPrice: string) => {
    // Validate and clamp to available range
    let min = minPrice ? parseFloat(minPrice) : '';
    let max = maxPrice ? parseFloat(maxPrice) : '';

    if (min !== '' && !isNaN(Number(min))) {
      min = Math.max(priceRange.min, Number(min));
    }
    if (max !== '' && !isNaN(Number(max))) {
      max = Math.min(priceRange.max, Number(max));
    }

    // Validate min <= max
    if (min !== '' && max !== '' && Number(min) > Number(max)) {
      return; // Invalid range, don't update
    }

    onChange({
      minPrice: min !== '' ? String(min) : '',
      maxPrice: max !== '' ? String(max) : '',
    });
  };

  const handleAvailabilityToggle = (status: string) => {
    const current = filters.availability || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onChange({ availability: updated });
  };

  const handleClearAll = () => {
    onChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      availability: [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter header with result count */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="text-sm text-gray-600">
        {resultCount === 0 ? 'No products match your filters' : `Showing ${resultCount} products`}
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Category</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                !filters.category
                  ? 'bg-gray-900 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category.slug.current)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  filters.category === category.slug.current
                    ? 'bg-gray-900 text-white'
                    : 'hover:bg-gray-100'
                }`}
                aria-pressed={filters.category === category.slug.current}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Price Range</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label htmlFor="min-price" className="sr-only">Minimum price</label>
            <input
              id="min-price"
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={e => handlePriceChange(e.target.value, filters.maxPrice)}
              placeholder={`Min (${priceRange.min})`}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
          <span className="text-gray-500">-</span>
          <div className="flex-1">
            <label htmlFor="max-price" className="sr-only">Maximum price</label>
            <input
              id="max-price"
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={e => handlePriceChange(filters.minPrice, e.target.value)}
              placeholder={`Max (${priceRange.max})`}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Availability filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Availability</h3>
        <div className="space-y-2">
          {[
            { value: 'in-stock', label: 'In Stock' },
            { value: 'low-stock', label: 'Low Stock' },
            { value: 'out-of-stock', label: 'Out of Stock' },
          ].map(option => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded"
            >
              <input
                type="checkbox"
                checked={(filters.availability || []).includes(option.value)}
                onChange={() => handleAvailabilityToggle(option.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
