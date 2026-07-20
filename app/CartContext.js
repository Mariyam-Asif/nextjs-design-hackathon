"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { announce } from "./utils/announcer";

const CartContext = createContext();

const CART_EXPIRY_DAYS = 30;
const CART_STORAGE_KEY = "cartData";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);

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
        } catch (e) {
          // localStorage not available, continue with session-only cart
        }
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length === 0) {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
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

  // Refresh prices from Sanity
  const refreshPrices = async (items) => {
    if (!items || items.length === 0) return;

    setIsRefreshingPrices(true);
    const changes = [];

    try {
      // Fetch current prices for all cart items
      const productIds = items.map((item) => item.id);
      const query = `*[_type == "product" && _id in $ids]{
        _id,
        price,
        currency,
        stockStatus,
        stockQuantity,
        title
      }`;
      const currentProducts = await client.fetch(query, { ids: productIds });

      // Create a map for quick lookup
      const productMap = {};
      currentProducts.forEach((product) => {
        productMap[product._id] = product;
      });

      // Update cart items with current prices and detect changes
      const updatedItems = items.map((item) => {
        const currentProduct = productMap[item.id];
        if (currentProduct) {
          const oldPrice = parsePrice(item.price);
          const newPrice = parsePrice(currentProduct.price);

          // Check if price changed
          if (oldPrice !== newPrice) {
            changes.push({
              id: item.id,
              title: item.title,
              oldPrice: item.price,
              newPrice: ` ${newPrice}`,
            });

            return {
              ...item,
              price: `$ ${newPrice}`,
              oldPrice: item.price,
              stockStatus: currentProduct.stockStatus,
              stockQuantity: currentProduct.stockQuantity,
              title: currentProduct.title,
            };
          }

          // Update stock status and quantity even if price didn't change
          return {
            ...item,
            stockStatus: currentProduct.stockStatus,
            stockQuantity: currentProduct.stockQuantity,
            title: currentProduct.title,
          };
        }
        return item;
      });

      setCartItems(updatedItems);
      setPriceChanges(changes);

      // Announce price changes
      if (changes.length > 0) {
        announce("Prices have been updated for some items in your cart.", "polite");
      }
    } catch (error) {
      console.error("Error refreshing prices:", error);
    } finally {
      setIsRefreshingPrices(false);
    }
  };

  // Parse price to number
  const parsePrice = (price) => {
    const priceString = price.toString();
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10) || 0;
  };

  // Clear price change notifications
  const clearPriceChanges = () => {
    setPriceChanges([]);
    // Remove oldPrice from cart items
    setCartItems((prevItems) =>
      prevItems.map((item) => {
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
