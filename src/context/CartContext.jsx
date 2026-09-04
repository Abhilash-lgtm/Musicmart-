import React, { createContext, useState, useEffect } from 'react';

// 1. Create Cart Context
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('musicmart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('musicmart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return prevItems.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          brand: product.brand,
          category: product.category,
          stock: product.stock || 10,
          quantity,
        },
      ];
    });
  };

  // Remove single item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => String(item.id) !== String(productId)));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          String(item.id) === String(productId) ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  // Apply promo code (e.g. MUSIC10 or PROAUDIO20)
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MUSIC10') {
      setCouponCode('MUSIC10');
      setDiscountPercent(10);
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'PROAUDIO20') {
      setCouponCode('PROAUDIO20');
      setDiscountPercent(20);
      return { success: true, message: '20% discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try MUSIC10 or PROAUDIO20' };
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + tax + shipping);

  const value = {
    cartItems,
    cartCount,
    subtotal,
    discountAmount,
    couponCode,
    discountPercent,
    shipping,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
