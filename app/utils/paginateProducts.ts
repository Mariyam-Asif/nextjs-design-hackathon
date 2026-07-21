/**
 * Product Pagination Utilities
 * Pure functions for paginating products
 */

interface Product {
  _id: string;
}

export interface PaginationResult<T> {
  products: T[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
}

/**
 * Paginate products
 * @param products - Array of products to paginate
 * @param page - Current page number (1-indexed)
 * @param perPage - Number of products per page
 * @returns Paginated result with metadata
 */
export function paginateProducts<T extends Product>(
  products: T[],
  page: number,
  perPage: number = 12
): PaginationResult<T> {
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / perPage);

  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalProducts);

  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    totalPages,
    totalProducts,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    startIndex,
    endIndex,
  };
}

/**
 * Generate array of page numbers for pagination UI
 * Shows current page, neighbors, and first/last pages with ellipsis
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum number of page buttons to show (default: 7)
 * @returns Array of page numbers and 'ellipsis' markers
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | 'ellipsis')[] {
  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const sidePages = Math.floor((maxVisible - 3) / 2); // Pages on each side of current

  // Always show first page
  pages.push(1);

  // Calculate range around current page
  let startPage = Math.max(2, currentPage - sidePages);
  let endPage = Math.min(totalPages - 1, currentPage + sidePages);

  // Adjust range if near start or end
  if (currentPage <= sidePages + 2) {
    endPage = Math.min(maxVisible - 1, totalPages - 1);
  }
  if (currentPage >= totalPages - sidePages - 1) {
    startPage = Math.max(2, totalPages - maxVisible + 2);
  }

  // Add left ellipsis if needed
  if (startPage > 2) {
    pages.push('ellipsis');
  }

  // Add range of pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add right ellipsis if needed
  if (endPage < totalPages - 1) {
    pages.push('ellipsis');
  }

  // Always show last page (if not page 1)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Get pagination display text
 * Example: "Showing 13-24 of 48 products"
 */
export function getPaginationText<T extends Product>(result: PaginationResult<T>): string {
  const { startIndex, endIndex, totalProducts } = result;

  if (totalProducts === 0) {
    return 'No products found';
  }

  if (totalProducts === 1) {
    return '1 product';
  }

  return `Showing ${startIndex + 1}-${endIndex} of ${totalProducts} products`;
}
