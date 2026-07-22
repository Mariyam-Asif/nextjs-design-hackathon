/**
 * Shared TypeScript types for the eCommerce platform
 */

// Cart Item
export interface CartItem {
  id: string;
  title: string;
  price: string | number;
  currency: string;
  imageUrl: string;
  quantity: number;
  stockQuantity?: number;
  stockStatus?: string;
  slug?: string;
}

// Checkout Form Data
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  city: string;
  province?: string;
  zipCode: string;
  phone: string;
  email: string;
  companyName?: string;
  orderNotes?: string;
  additionalInfo?: string;
}

// Product from Sanity
export interface SanityProduct {
  _id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  discountPercentage?: string;
  imageUrl: string;
  productImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  tags?: string[];
  stockStatus: 'inStock' | 'outOfStock' | 'lowStock';
  stockQuantity: number;
  slug: string | { current: string };
  category?: string;
  displayOrder?: number;
  isFeatured?: boolean;
  specifications?: Array<{ key: string; value: string }>;
  _createdAt: string;
  isNew?: boolean;
  dicountPercentage?: number;
}

// Order Data for Creation
export interface OrderData {
  formData: CheckoutFormData;
  cartItems: CartItem[];
  paymentMethod: string;
  subtotal: number;
}

// Sanity Order Document
export interface SanityOrder {
  _type: 'order';
  _id?: string;
  orderNumber: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    province?: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    productTitle: string;
    productSlug: string;
    productImage: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  total: number;
  currency: string;
  notes?: string;
}

// Blog Post
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string } | string;
  excerpt?: string;
  content: unknown; // Portable text or rich content
  publishedAt: string;
  author?: {
    name: string;
    image?: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  displayOrder?: number;
  isActive: boolean;
}

// Hero
export interface Hero {
  _id: string;
  headline: string;
  subheadline?: string;
  backgroundImage: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  primaryCta?: {
    text: string;
    url: string;
  };
  secondaryCta?: {
    text: string;
    url: string;
  };
  isActive: boolean;
}

// Banner
export interface Banner {
  _id: string;
  title: string;
  message: string;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  cta?: {
    text: string;
    url: string;
  };
  placement: string[];
  priority: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Contact Submission
export interface ContactSubmission {
  _type: 'contactSubmission';
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'responded';
}
