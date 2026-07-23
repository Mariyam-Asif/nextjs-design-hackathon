/**
 * Product Filtering Utilities
 * Pure functions for filtering products based on various criteria
 */

export interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  stockStatus?: string;
  stockQuantity: number;
  category?: string;
  tags?: string[];
}

export interface FilterCriteria {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string[];
}

/**
 * Get stock status based on quantity and stockStatus
 */
export function getStockStatus(stockQuantity: number, stockStatus?: string): 'in-stock' | 'low-stock' | 'out-of-stock' {
  if (stockStatus === 'outOfStock' || stockStatus === 'out-of-stock' || stockQuantity === 0) return 'out-of-stock';
  if (stockStatus === 'lowStock' || stockStatus === 'low-stock' || (stockQuantity > 0 && stockQuantity <= 5)) return 'low-stock';
  return 'in-stock';
}

/**
 * Filter products based on search query
 * Searches in title, description, category, and tags (case-insensitive)
 */
function filterBySearch<T extends Product>(products: T[], query: string): T[] {
  if (!query || query.length < 2) return products;

  const searchTerm = query.toLowerCase();

  return products.filter(product => {
    const title = product.title?.toLowerCase() || '';
    const description = product.description?.toLowerCase() || '';
    const category = product.category?.toLowerCase() || '';
    const tags = product.tags?.map(t => t.toLowerCase()).join(' ') || '';

    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      category.includes(searchTerm) ||
      tags.includes(searchTerm)
    );
  });
}

/**
 * Filter products by category
 */
function filterByCategory<T extends Product>(products: T[], category: string): T[] {
  if (!category) return products;
  const target = category.toLowerCase().trim();
  return products.filter(product => {
    const pCat = (typeof product.category === 'string' ? product.category : '').toLowerCase().trim();
    const title = (product.title || '').toLowerCase().trim();
    const tags = Array.isArray(product.tags) ? product.tags.map(t => t.toLowerCase()).join(' ') : '';
    const desc = (product.description || '').toLowerCase();

    if (pCat && (pCat === target || pCat.includes(target) || target.includes(pCat))) {
      return true;
    }

    if (title.includes(target) || tags.includes(target) || desc.includes(target)) {
      return true;
    }

    return false;
  });
}

/**
 * Filter products by price range
 */
function filterByPrice<T extends Product>(products: T[], minPrice: string, maxPrice: string): T[] {
  let filtered = products;

  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
      filtered = filtered.filter(product => product.price >= min);
    }
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      filtered = filtered.filter(product => product.price <= max);
    }
  }

  return filtered;
}

/**
 * Filter products by availability (stock status)
 * Uses OR logic: products matching ANY selected status are included
 */
function filterByAvailability<T extends Product>(products: T[], availability: string[]): T[] {
  if (!availability || availability.length === 0) return products;

  return products.filter(product => {
    const status = getStockStatus(product.stockQuantity, product.stockStatus);
    return availability.includes(status);
  });
}

/**
 * Main filter function - applies all filters with AND logic
 * Multiple filters must ALL match for a product to be included
 */
export function filterProducts<T extends Product>(products: T[], filters: FilterCriteria): T[] {
  let filtered = products;

  // Apply search filter
  if (filters.q) {
    filtered = filterBySearch(filtered, filters.q);
  }

  // Apply category filter
  if (filters.category) {
    filtered = filterByCategory(filtered, filters.category);
  }

  // Apply price range filter
  if (filters.minPrice || filters.maxPrice) {
    filtered = filterByPrice(filtered, filters.minPrice || '', filters.maxPrice || '');
  }

  // Apply availability filter
  if (filters.availability && filters.availability.length > 0) {
    filtered = filterByAvailability(filtered, filters.availability);
  }

  return filtered;
}

/**
 * Get the min and max prices from a list of products
 * Useful for setting price filter boundaries
 */
export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
