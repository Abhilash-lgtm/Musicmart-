import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import Button from './Button';

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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Your Shopping Bag is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
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
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>
          Shopping <span className="text-gradient">Bag</span> ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Clear All
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Cart Item List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  background: '#f1f5f9',
                }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                  {item.brand}
                </span>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Link to={`/product/${item.id}`} style={{ color: 'var(--text-main)' }}>{item.title}</Link>
                </h4>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Stepper */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <button
                  type="button"
                  style={{ padding: '0.4rem 0.6rem', color: 'var(--text-main)' }}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <FaMinus size={11} />
                </button>
                <span style={{ padding: '0 0.5rem', fontSize: '0.9rem', fontWeight: 800 }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  style={{ padding: '0.4rem 0.6rem', color: 'var(--text-main)' }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FaPlus size={11} />
                </button>
              </div>

              {/* Subtotal */}
              <div style={{ textAlign: 'right', minWidth: '90px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '0.5rem',
                  color: 'var(--text-dim)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
                title="Remove item"
              >
                <FaTrash size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            position: 'sticky',
            top: '90px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-pink)', fontWeight: 600 }}>
                <span>Promo Discount ({couponCode} - {discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Insured Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Estimated Sales Tax</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>${tax.toFixed(2)}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900 }}>
              <span>Order Total</span>
              <span className="text-gradient">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyCoupon} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Promo Code (MUSIC10)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="form-input"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              />
              <Button type="submit" variant="secondary" size="sm">
                Apply
              </Button>
            </div>
            {couponMsg.text && (
              <p style={{ fontSize: '0.75rem', marginTop: '0.4rem', color: couponMsg.isError ? '#ef4444' : 'var(--accent-emerald)', fontWeight: 600 }}>
                {couponMsg.text}
              </p>
            )}
          </form>

          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%', marginBottom: '1rem' }}
            icon={FaArrowRight}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>

          <div style={{ textAlign: 'center' }}>
            <Link to="/category/all" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
