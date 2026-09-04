import React, { createContext, useState, useEffect } from 'react';

// 1. Create Wishlist Context
export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  // Initialize wishlist from localStorage
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('musicmart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('musicmart_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Toggle item in wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      }
      return [...prev, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  // Check if item is saved
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  // Clear all wishlist items
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistProvider;
