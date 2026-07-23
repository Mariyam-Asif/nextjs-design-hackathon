/**
 * Utility functions for normalizing Sanity stock status, quantity, and categories
 */

export type StockStatus = 'inStock' | 'outOfStock' | 'lowStock';

export interface NormalizedStock {
  stockStatus: StockStatus;
  stockQuantity: number;
}

/**
 * Normalizes stock status and stock quantity regardless of format in Sanity CMS
 * Handles variations: 'inStock', 'in-stock', 'In Stock', 'instock', 'outOfStock', 'out-of-stock', etc.
 */
export function normalizeStock(status?: string, quantity?: number | string): NormalizedStock {
  const rawStatus = (status || '').toString().trim().toLowerCase().replace(/[^a-z]/g, '');
  const rawQty = typeof quantity === 'number' ? quantity : parseInt(String(quantity), 10);
  const numQty = !isNaN(rawQty) ? rawQty : undefined;

  let computedStatus: StockStatus = 'inStock';

  if (rawStatus === 'outofstock' || rawStatus === 'out' || numQty === 0) {
    computedStatus = 'outOfStock';
  } else if (rawStatus === 'lowstock' || rawStatus === 'low' || (numQty !== undefined && numQty > 0 && numQty <= 5)) {
    computedStatus = 'lowStock';
  } else if (rawStatus === 'instock' || rawStatus === 'in') {
    computedStatus = 'inStock';
  } else {
    computedStatus = (numQty === 0) ? 'outOfStock' : 'inStock';
  }

  const effectiveQuantity = numQty !== undefined ? numQty : (computedStatus === 'outOfStock' ? 0 : 10);

  return {
    stockStatus: computedStatus,
    stockQuantity: effectiveQuantity,
  };
}
