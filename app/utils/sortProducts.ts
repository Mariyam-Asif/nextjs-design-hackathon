/**
 * Product Sorting Utilities
 * Pure functions for sorting products by various criteria
 */

interface Product {
  _id: string;
  title: string;
  price: number;
  displayOrder?: number;
  _createdAt?: string;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest';

/**
 * Sort products by various criteria
 * Returns a new sorted array (does not mutate original)
 */
export function sortProducts<T extends Product>(products: T[], sortKey: SortOption): T[] {
  // Create a copy to avoid mutating the original array
  const sorted = [...products];

  switch (sortKey) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);

    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a._createdAt ? new Date(a._createdAt).getTime() : 0;
        const dateB = b._createdAt ? new Date(b._createdAt).getTime() : 0;
        return dateB - dateA; // Newest first
      });

    case 'featured':
    default:
      // Sort by displayOrder (higher = more featured), then by newest
      return sorted.sort((a, b) => {
        const orderA = a.displayOrder || 0;
        const orderB = b.displayOrder || 0;

        if (orderA !== orderB) {
          return orderB - orderA; // Higher displayOrder first
        }

        // Fallback to newest if displayOrder is equal
        const dateA = a._createdAt ? new Date(a._createdAt).getTime() : 0;
        const dateB = b._createdAt ? new Date(b._createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }
}

/**
 * Get display label for sort option
 */
export function getSortLabel(sortKey: SortOption): string {
  switch (sortKey) {
    case 'featured':
      return 'Featured';
    case 'price-asc':
      return 'Price: Low to High';
    case 'price-desc':
      return 'Price: High to Low';
    case 'name-asc':
      return 'Name: A to Z';
    case 'name-desc':
      return 'Name: Z to A';
    case 'newest':
      return 'Newest First';
    default:
      return 'Featured';
  }
}

/**
 * Get all available sort options
 */
export function getAllSortOptions(): { value: SortOption; label: string }[] {
  const options: SortOption[] = [
    'featured',
    'price-asc',
    'price-desc',
    'name-asc',
    'name-desc',
    'newest',
  ];

  return options.map(value => ({
    value,
    label: getSortLabel(value),
  }));
}
