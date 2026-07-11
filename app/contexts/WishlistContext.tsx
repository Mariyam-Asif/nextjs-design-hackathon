'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { announce } from '../utils/announcer';

interface WishlistData {
  items: string[]; // product IDs
  updatedAt: number;
}

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string, productName?: string) => void;
  removeFromWishlist: (productId: string, productName?: string) => void;
  toggleWishlist: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_KEY = 'wishlist';
const EXPIRATION_DAYS = 30;
const EXPIRATION_MS = EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistData, setWishlistData] = useLocalStorage<WishlistData>(WISHLIST_KEY, {
    items: [],
    updatedAt: Date.now(),
  });

  // Check if wishlist has expired (30 days)
  const isExpired = Date.now() - wishlistData.updatedAt > EXPIRATION_MS;
  const wishlist = isExpired ? [] : wishlistData.items;

  // If expired, clear it
  React.useEffect(() => {
    if (isExpired && wishlistData.items.length > 0) {
      setWishlistData({ items: [], updatedAt: Date.now() });
    }
  }, [isExpired, wishlistData.items.length, setWishlistData]);

  const addToWishlist = (productId: string, productName?: string) => {
    if (!productId) return;

    // Prevent duplicates
    if (wishlist.includes(productId)) {
      return;
    }

    const updatedItems = [...wishlist, productId];
    setWishlistData({ items: updatedItems, updatedAt: Date.now() });

    // Announce to screen readers
    const message = productName
      ? `${productName} added to your wishlist.`
      : 'Product added to your wishlist.';
    announce(message, 'polite');
  };

  const removeFromWishlist = (productId: string, productName?: string) => {
    if (!productId) return;

    const updatedItems = wishlist.filter(id => id !== productId);
    setWishlistData({ items: updatedItems, updatedAt: Date.now() });

    // Announce to screen readers
    const message = productName
      ? `${productName} removed from your wishlist.`
      : 'Product removed from your wishlist.';
    announce(message, 'polite');
  };

  const toggleWishlist = (productId: string, productName?: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId, productName);
    } else {
      addToWishlist(productId, productName);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const clearWishlist = () => {
    setWishlistData({ items: [], updatedAt: Date.now() });
    announce('Wishlist cleared.', 'polite');
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
