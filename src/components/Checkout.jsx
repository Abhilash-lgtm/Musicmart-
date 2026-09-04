import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaCreditCard,
  FaShieldAlt,
  FaCheckCircle,
  FaTruck,
  FaLock,
} from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import orderService from '../services/orderService';
import Input from './Input';
import Button from './Button';

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems, subtotal, discountAmount, discountPercent, shipping, tax, total, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address || '',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'United States',
    paymentMethod: 'Credit Card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setError('');
    setIsProcessing(true);

    try {
      const orderPayload = {
        userId: user?.id || 'guest',
        customerName: formData.name,
        customerEmail: formData.email,
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        discount: discountAmount,
        shipping,
        tax,
        total,
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      };

      const order = await orderService.createOrder(orderPayload);
      setCreatedOrder(order);
      clearCart();
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Confirmed Success Screen
  if (createdOrder) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: '640px' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(5, 150, 105, 0.1)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <FaCheckCircle size={36} />
          </div>

          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Order Placed Successfully!
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Thank you, {createdOrder.customerName}. Your music gear order is now being processed.
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '2rem',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Order Reference:</span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{createdOrder.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tracking Code:</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {createdOrder.trackingNumber}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
              <span style={{ fontWeight: 900, color: 'var(--accent-pink)' }}>
                ${createdOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to={`/track-order?tracking=${createdOrder.trackingNumber}`}>
              <Button variant="primary" size="md" icon={FaTruck}>
                Track Live Order
              </Button>
            </Link>
            <Link to="/category/all">
              <Button variant="secondary" size="md">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/category/all">
          <Button variant="primary">Browse Store</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', color: 'var(--text-main)' }}>
        Secure <span className="text-gradient">Checkout</span>
      </h1>

      {error && (
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#dc2626',
            marginBottom: '2rem',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Step 1: Shipping Address */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent-pink)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                  }}
                >
                  1
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Shipping Address</h3>
              </div>

              <Input
                label="Recipient Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Email for Updates"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Street Address"
                name="street"
                placeholder="123 Music Row"
                value={formData.street}
                onChange={handleChange}
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="State / Province"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Postal Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent-cyan)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                  }}
                >
                  2
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>Payment Method</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {['Credit Card', 'PayPal', 'UPI / NetBanking', 'Cash on Delivery'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${formData.paymentMethod === method ? 'var(--accent-pink)' : 'var(--border-color)'}`,
                      background: formData.paymentMethod === method ? 'rgba(225, 29, 72, 0.08)' : '#ffffff',
                      color: formData.paymentMethod === method ? 'var(--accent-pink)' : 'var(--text-main)',
                      fontWeight: 700,
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                    }}
                  >
                    <FaCreditCard size={16} /> {method}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'Credit Card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    icon={FaLock}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                      label="Expiry Date"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                    />
                    <Input
                      label="CVC / CVV"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="glass-panel" style={{ padding: '1.75rem', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Review Items ({cartItems.length})
            </h3>

            <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-main)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-pink)', fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900 }}>
                <span>Total</span>
                <span className="text-gradient">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isProcessing}
              style={{ width: '100%', marginTop: '1.5rem' }}
              icon={FaShieldAlt}
            >
              Place Order & Pay
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
