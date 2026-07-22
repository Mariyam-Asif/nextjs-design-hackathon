/**
 * Generates a random order number in format: ORD-XXXXXXXX
 * Uses base-32 character set (A-Z uppercase + 2-9) for 8 characters
 * Total combinations: 23^8 = ~8 trillion
 */
import type { createClient } from 'next-sanity';

type SanityClient = ReturnType<typeof createClient>;

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
}

export function generateOrderNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 23 chars (no I, O, 0, 1 for clarity)
  let orderNumber = 'ORD-';

  // Use crypto.getRandomValues for secure random generation
  const randomValues = new Uint8Array(8);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < 8; i++) {
    orderNumber += chars[randomValues[i] % chars.length];
  }

  return orderNumber;
}

interface SanityOrder {
  _id: string;
  orderNumber: string;
}

/**
 * Checks if an order number already exists in Sanity
 */
export async function checkOrderNumberExists(
  orderNumber: string,
  sanityClient: SanityClient
): Promise<boolean> {
  const query = `*[_type == "order" && orderNumber == $orderNumber][0]`;
  const result = await sanityClient.fetch<SanityOrder | null>(query, { orderNumber });
  return !!result;
}

/**
 * Generates a unique order number with collision check
 * Retries up to 5 times if collision detected
 */
export async function generateUniqueOrderNumber(
  sanityClient: SanityClient
): Promise<string> {
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const orderNumber = generateOrderNumber();
    const exists = await checkOrderNumberExists(orderNumber, sanityClient);

    if (!exists) {
      return orderNumber;
    }

    console.warn(`Order number collision detected: ${orderNumber}. Retrying...`);
  }

  throw new Error('Failed to generate unique order number after 5 attempts');
}

/**
 * Validates form data before order creation
 */
export function validateCheckoutForm(formData: CheckoutFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!formData.firstName?.trim()) errors.push('First name is required');
  if (!formData.lastName?.trim()) errors.push('Last name is required');
  if (!formData.country?.trim()) errors.push('Country is required');
  if (!formData.streetAddress?.trim()) errors.push('Street address is required');
  if (!formData.city?.trim()) errors.push('City is required');
  if (!formData.zipCode?.trim()) errors.push('ZIP code is required');
  if (!formData.phone?.trim()) errors.push('Phone number is required');
  if (!formData.email?.trim()) errors.push('Email is required');

  // Email format validation
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Invalid email format');
  }

  // Phone format validation (basic - at least 10 digits)
  if (formData.phone && !/\d{10,}/.test(formData.phone.replace(/\D/g, ''))) {
    errors.push('Phone number must contain at least 10 digits');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
