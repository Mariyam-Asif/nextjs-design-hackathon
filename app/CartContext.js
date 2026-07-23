"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import { announce } from "./utils/announcer";
import CartSidebar from "./sidebar";

const CartContext = createContext();

const CART_EXPIRY_DAYS = 30;
const CART_STORAGE_KEY = "cartData";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const setSidebarVisible = (visible) => setIsSidebarOpen(Boolean(visible));

  // Helper to parse price strings
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    const priceString = String(price);
    return parseFloat(priceString.replace(/[^\d.-]/g, "").replace(",", ""));
  };

  // Refresh prices from Sanity - wrapped in useCallback
  const refreshPrices = useCallback(async (items) => {
    if (!items || items.length === 0) return;

    try {
      setIsRefreshingPrices(true);
      const productIds = items.map((item) => item.id);
      const query = `*[_type == "product" && _id in $ids]{
        _id,
        price,
        currency,
        title,
        stockStatus,
        stockQuantity
      }`;

      const products = await client.fetch(query, { ids: productIds });

      // Create a map for quick lookup
      const productMap = {};
      products.forEach((product) => {
        productMap[product._id] = product;
      });

      const changes = [];

      // Update cart items with current prices and detect changes
      const updatedItems = items.map((item) => {
        const currentProduct = productMap[item.id];
        if (currentProduct) {
          const newPrice = parsePrice(currentProduct.price);
          const itemOldPrice = parsePrice(item.price);
          const itemCurrency = currentProduct.currency || item.currency || 'Rs.';

          const status = currentProduct.stockStatus || (currentProduct.stockQuantity === 0 ? 'outOfStock' : 'inStock');
          const rawQty = typeof currentProduct.stockQuantity === 'number' ? currentProduct.stockQuantity : Number(currentProduct.stockQuantity);
          const qty = (!isNaN(rawQty) && rawQty >= 0) ? rawQty : (status === 'outOfStock' ? 0 : 99);

          // Check if price changed
          if (itemOldPrice !== newPrice) {
            changes.push({
              id: item.id,
              title: item.title,
              oldPrice: item.price,
              newPrice: `${newPrice}`,
              currency: itemCurrency,
            });

            return {
              ...item,
              price: `${newPrice}`,
              currency: itemCurrency,
              stockStatus: status,
              stockQuantity: qty,
              title: currentProduct.title,
            };
          }

          // Update stock status and quantity even if price didn't change
          return {
            ...item,
            currency: itemCurrency,
            stockStatus: status,
            stockQuantity: qty,
            title: currentProduct.title,
          };
        }

        return item;
      });

      setCartItems(updatedItems);

      // Announce price changes if any
      if (changes.length > 0) {
        setPriceChanges(changes);
        announce(
          `Prices have been updated for ${changes.length} item${changes.length !== 1 ? "s" : ""} in your cart.`,
          "polite"
        );
      }
    } catch (error) {
      console.error("Error refreshing prices:", error);
    } finally {
      setIsRefreshingPrices(false);
    }
  }, []);

  // Load cart from localStorage on mount and refresh prices
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCartData = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCartData) {
          const { items, timestamp } = JSON.parse(savedCartData);

          // Check if cart has expired (30 days)
          const now = Date.now();
          const expiryTime = CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

          if (now - timestamp < expiryTime) {
            // Cart is still valid, load it
            setCartItems(items || []);
            // Refresh prices from Sanity
            await refreshPrices(items || []);
          } else {
            // Cart expired, clear it
            localStorage.removeItem(CART_STORAGE_KEY);
            announce("Your saved cart has expired and has been cleared.", "polite");
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        // Check if it's a localStorage error
        if (error.name === 'QuotaExceededError') {
          announce("Your cart couldn't be saved on this device. It will remain available until you close your browser.", "polite");
        } else {
          announce("Your saved cart could not be restored and has been reset.", "polite");
        }
        // Clear corrupted data
        try {
          localStorage.removeItem(CART_STORAGE_KEY);
        } catch {
          // localStorage not available, continue with session-only cart
        }
      }
    };

    loadCart();
  }, [refreshPrices]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length === 0) {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {
        // localStorage not available, ignore
      }
      return;
    }

    try {
      const cartData = {
        items: cartItems,
        timestamp: Date.now()
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error("Error saving cart:", error);
      if (error.name === 'QuotaExceededError') {
        announce("Your cart couldn't be saved on this device. It will remain available until you close your browser.", "polite");
      }
    }
  }, [cartItems]);

  // Clear price change notifications
  const clearPriceChanges = () => {
    setPriceChanges([]);
    // Remove oldPrice from cart items
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { oldPrice, ...rest } = item;
        return rest;
      })
    );
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Item already in cart, increase quantity if stock allows
        const newQuantity = existingItem.quantity + 1;
        const stockLimit = item.stockQuantity || existingItem.stockQuantity || Infinity;

        // Don't exceed available stock
        if (newQuantity <= stockLimit) {
          // Announce quantity update
          const newTotal = prevItems.reduce((sum, i) =>
            i.id === item.id ? sum + newQuantity : sum + i.quantity, 0
          );
          announce(`${item.title} quantity updated to ${newQuantity}. Cart now contains ${newTotal} ${newTotal === 1 ? 'item' : 'items'}.`, "polite");

          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
          );
        }
        // Already at stock limit, announce
        announce(`Cannot add more. Only ${stockLimit} available.`, "polite");
        return prevItems;
      }

      // New item, add to cart with quantity 1 and include currency
      const newCart = [...prevItems, { ...item, quantity: 1, currency: item.currency || '$' }];
      const totalItems = newCart.reduce((sum, i) => sum + i.quantity, 0);
      announce(`${item.title} added to cart. Cart now contains ${totalItems} ${totalItems === 1 ? 'item' : 'items'}.`, "polite");

      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id);
      const newCart = prevItems.filter((item) => item.id !== id);
      const totalItems = newCart.reduce((sum, i) => sum + i.quantity, 0);

      if (removedItem) {
        announce(
          `${removedItem.title} removed from cart. Cart now contains ${totalItems} ${totalItems === 1 ? 'item' : 'items'}.`,
          "polite"
        );
      }

      return newCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item) {
        announce(`${item.title} quantity updated to ${quantity}.`, "polite");
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setPriceChanges([]);
    announce("Cart cleared.", "polite");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        priceChanges,
        isRefreshingPrices,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshPrices: () => refreshPrices(cartItems),
        clearPriceChanges,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        setSidebarVisible,
      }}
    >
      {children}
      <CartSidebar isVisible={isSidebarOpen} onClose={closeSidebar} />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
