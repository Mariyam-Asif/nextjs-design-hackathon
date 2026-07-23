
/**
 * Server-side validation utilities for price and stock integrity
 */

import type { createClient } from 'next-sanity';

type SanityClient = ReturnType<typeof createClient>;
import type { CartItem, SanityProduct } from '../types';

interface ProductValidation {
  id: string;
  title: string;
  currentPrice: number;
  cartPrice: number;
  priceChanged: boolean;
  currentStock: number;
  requestedQuantity: number;
  stockSufficient: boolean;
  stockStatus: string;
  currency: string;
}

interface ValidationResult {
  valid: boolean;
  priceChanges: ProductValidation[];
  stockIssues: ProductValidation[];
  errors: string[];
}

/**
 * Parse price string to numeric value
 */
function parsePrice(price: string | number): number {
  const priceString = price.toString();
  return parseInt(priceString.replace(/[^0-9]/g, ""), 10) || 0;
}

/**
 * Validate cart items against current Sanity data
 * Checks both prices and stock availability
 */
export async function validateCartAgainstSanity(
  cartItems: CartItem[],
  sanityClient: SanityClient
): Promise<ValidationResult> {
  const productIds = cartItems.map((item) => item.id);

  // Fetch current product data from Sanity
  const query = `*[_type == "product" && _id in $ids]{
    _id,
    title,
    price,
    currency,
    stockStatus,
    stockQuantity
  }`;

const currentProducts = await sanityClient.fetch<SanityProduct[]>(
  query,
  { ids: productIds }
);

  // Create lookup map

  const productMap: Record<string, SanityProduct> = {};
  currentProducts.forEach((product: SanityProduct) => {
    productMap[product._id] = product;
  });

  const priceChanges: ProductValidation[] = [];
  const stockIssues: ProductValidation[] = [];
  const errors: string[] = [];

  // Validate each cart item
  for (const cartItem of cartItems) {
    const currentProduct = productMap[cartItem.id];

    if (!currentProduct) {
      errors.push(`Product "${cartItem.title}" no longer exists`);
      continue;
    }

    const cartPrice = parsePrice(cartItem.price);
    const currentPrice = currentProduct.price;
    const priceChanged = cartPrice !== currentPrice;

    const currentStatus = currentProduct.stockStatus || (currentProduct.stockQuantity === 0 ? "outOfStock" : "inStock");
    const rawStockQty = typeof currentProduct.stockQuantity === 'number' ? currentProduct.stockQuantity : Number(currentProduct.stockQuantity);
    const effectiveStock = (!isNaN(rawStockQty) && rawStockQty > 0) ? rawStockQty : (currentStatus === "outOfStock" ? 0 : 99);

    const stockSufficient =
      currentStatus !== "outOfStock" &&
      cartItem.quantity <= effectiveStock;

    const validation: ProductValidation = {
      id: cartItem.id,
      title: currentProduct.title,
      currentPrice,
      cartPrice,
      priceChanged,
      currentStock: effectiveStock,
      requestedQuantity: cartItem.quantity,
      stockSufficient,
      stockStatus: currentStatus,
      currency: currentProduct.currency || 'Rs',
    };

    if (priceChanged) {
      priceChanges.push(validation);
      errors.push(
        `Price changed for "${validation.title}": ${validation.currency} ${cartPrice} → ${validation.currency} ${currentPrice}`
      );
    }

    if (!stockSufficient) {
      stockIssues.push(validation);
      if (currentStatus === "outOfStock") {
        errors.push(`"${validation.title}" is out of stock`);
      } else {
        errors.push(
          `Insufficient stock for "${validation.title}": ${cartItem.quantity} requested, only ${effectiveStock} available`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    priceChanges,
    stockIssues,
    errors,
  };
}

/**
 * Calculate total from validated products
 */
export function calculateValidatedTotal(
  cartItems: CartItem[],
  productMap: Record<string, SanityProduct>
): number {
  return cartItems.reduce((total, item) => {
    const product = productMap[item.id];
    if (product && product.stockStatus !== "outOfStock") {
      return total + product.price * item.quantity;
    }
    return total;
  }, 0);
}
