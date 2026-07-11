'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { announce } from '../utils/announcer';

interface ComparisonContextType {
  comparison: string[]; // product IDs
  addToComparison: (productId: string, productName?: string) => boolean;
  removeFromComparison: (productId: string, productName?: string) => void;
  toggleComparison: (productId: string, productName?: string) => boolean;
  isInComparison: (productId: string) => boolean;
  clearComparison: () => void;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const COMPARISON_KEY = 'comparison';
const MAX_COMPARISON_ITEMS = 4;

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparison, setComparison] = useSessionStorage<string[]>(COMPARISON_KEY, []);

  const canAddMore = comparison.length < MAX_COMPARISON_ITEMS;

  const addToComparison = (productId: string, productName?: string): boolean => {
    if (!productId) return false;

    // Prevent duplicates
    if (comparison.includes(productId)) {
      return true;
    }

    // Check maximum limit
    if (comparison.length >= MAX_COMPARISON_ITEMS) {
      const message = `Maximum ${MAX_COMPARISON_ITEMS} products can be compared. Remove one to add another.`;
      announce(message, 'polite');
      return false;
    }

    const updatedItems = [...comparison, productId];
    setComparison(updatedItems);

    // Announce to screen readers
    const message = productName
      ? `${productName} added to comparison. ${updatedItems.length} of ${MAX_COMPARISON_ITEMS} products selected.`
      : `Product added to comparison. ${updatedItems.length} of ${MAX_COMPARISON_ITEMS} selected.`;
    announce(message, 'polite');

    return true;
  };

  const removeFromComparison = (productId: string, productName?: string) => {
    if (!productId) return;

    const updatedItems = comparison.filter(id => id !== productId);
    setComparison(updatedItems);

    // Announce to screen readers
    const message = productName
      ? `${productName} removed from comparison. ${updatedItems.length} of ${MAX_COMPARISON_ITEMS} products selected.`
      : `Product removed from comparison. ${updatedItems.length} of ${MAX_COMPARISON_ITEMS} selected.`;
    announce(message, 'polite');
  };

  const toggleComparison = (productId: string, productName?: string): boolean => {
    if (isInComparison(productId)) {
      removeFromComparison(productId, productName);
      return true;
    } else {
      return addToComparison(productId, productName);
    }
  };

  const isInComparison = (productId: string): boolean => {
    return comparison.includes(productId);
  };

  const clearComparison = () => {
    setComparison([]);
    announce('Comparison cleared.', 'polite');
  };

  const value: ComparisonContextType = {
    comparison,
    addToComparison,
    removeFromComparison,
    toggleComparison,
    isInComparison,
    clearComparison,
    canAddMore,
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
