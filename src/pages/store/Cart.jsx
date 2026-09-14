import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import Button from '../../components/ui/Button';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    subtotal,
    discountAmount,
    couponCode,
    discountPercent,
    shipping,
    tax,
    total,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    clearCart,
  } = useContext(CartContext);

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ text: res.message, isError: !res.success });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart-view animate-fade-in">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-cart-title">
            Your Shopping Bag is Empty
          </h2>
          <p className="empty-cart-desc">
            Looks like you haven't added any guitars, synths, or studio equipment to your cart yet.
          </p>
          <Link to="/category/all">
            <Button variant="primary" size="lg" icon={FaArrowRight}>
              Explore Instruments
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          Shopping <span className="text-gradient">Bag</span> ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Clear All
        </Button>
      </div>

      <div className="cart-grid">
        {/* Cart Item List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="glass-panel cart-item-card">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <span className="cart-item-brand">
                  {item.brand}
                </span>
                <h4 className="cart-item-name">
                  <Link to={`/product/${item.id}`} className="cart-item-link">{item.title}</Link>
                </h4>
                <div className="cart-item-unitprice">
                  ₹{item.price.toFixed(2)}
                </div>
              </div>

              {/* Stepper */}
              <div className="cart-stepper">
                <button
                  type="button"
                  className="cart-stepper-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <FaMinus size={11} />
                </button>
                <span className="cart-stepper-val">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  className="cart-stepper-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FaPlus size={11} />
                </button>
              </div>

              {/* Subtotal */}
              <div className="cart-item-subtotal-box">
                <div className="cart-item-subtotal-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="cart-remove-btn"
                title="Remove item"
              >
                <FaTrash size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="glass-panel cart-summary-card">
          <h3 className="cart-summary-title">
            Order Summary
          </h3>

          <div className="cart-summary-lines">
            <div className="summary-line">
              <span>Subtotal</span>
              <span className="summary-val-main">₹{subtotal.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="summary-line-discount">
                <span>Promo Discount ({couponCode} - {discountPercent}%)</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-line">
              <span>Insured Shipping</span>
              <span>{shipping === 0 ? <span className="summary-val-free">FREE</span> : `₹${shipping.toFixed(2)}`}</span>
            </div>

            <div className="summary-line">
              <span>Estimated Sales Tax</span>
              <span className="summary-val-main">₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-total-line">
              <span>Order Total</span>
              <span className="text-gradient">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyCoupon} className="coupon-form">
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Promo Code (MUSIC10)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="form-input coupon-input"
              />
              <Button type="submit" variant="secondary" size="sm">
                Apply
              </Button>
            </div>
            {couponMsg.text && (
              <p className={`coupon-msg ${couponMsg.isError ? 'coupon-msg-err' : 'coupon-msg-ok'}`}>
                {couponMsg.text}
              </p>
            )}
          </form>

          <Button
            variant="primary"
            size="lg"
            className="checkout-btn-full"
            icon={FaArrowRight}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>

          <div className="continue-shopping-wrap">
            <Link to="/category/all" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
