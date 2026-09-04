import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaCreditCard,
  FaShieldAlt,
  FaCheckCircle,
  FaTruck,
  FaLock,
} from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

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
      <div className="container checkout-success-container">
        <div className="glass-panel animate-fade-in checkout-success-panel">
          <div className="checkout-success-icon">
            <FaCheckCircle size={36} />
          </div>

          <h1 className="checkout-success-title">
            Order Placed Successfully!
          </h1>
          <p className="checkout-success-desc">
            Thank you, {createdOrder.customerName}. Your music gear order is now being processed.
          </p>

          <div className="checkout-receipt-box">
            <div className="checkout-receipt-row">
              <span className="receipt-label">Order Reference:</span>
              <span className="receipt-val">{createdOrder.id}</span>
            </div>
            <div className="checkout-receipt-row">
              <span className="receipt-label">Tracking Code:</span>
              <span className="receipt-val-cyan">
                {createdOrder.trackingNumber}
              </span>
            </div>
            <div className="checkout-receipt-row">
              <span className="receipt-label">Total Amount:</span>
              <span className="receipt-val-pink">
                ${createdOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="checkout-actions-row">
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
      <div className="container checkout-empty-container">
        <h2>Your Cart is Empty</h2>
        <p className="checkout-empty-desc">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/category/all">
          <Button variant="primary">Browse Store</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container checkout-page-container">
      <h1 className="checkout-main-title">
        Secure <span className="text-gradient">Checkout</span>
      </h1>

      {error && (
        <div className="checkout-error-banner">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div className="checkout-form-grid">
          {/* Form */}
          <div className="checkout-steps-col">
            {/* Step 1: Shipping Address */}
            <div className="glass-panel checkout-step-card">
              <div className="checkout-step-header">
                <div className="checkout-step-number">
                  1
                </div>
                <h3 className="checkout-step-title">Shipping Address</h3>
              </div>

              <Input
                label="Recipient Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <div className="form-grid-2col">
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

              <div className="form-grid-3col">
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
            <div className="glass-panel checkout-step-card">
              <div className="checkout-step-header">
                <div className="checkout-step-number checkout-step-number-cyan">
                  2
                </div>
                <h3 className="checkout-step-title">Payment Method</h3>
              </div>

              <div className="payment-methods-grid">
                {['Credit Card', 'PayPal', 'UPI / NetBanking', 'Cash on Delivery'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`payment-method-btn ${formData.paymentMethod === method ? 'payment-method-btn-selected' : ''}`}
                  >
                    <FaCreditCard size={16} /> {method}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'Credit Card' && (
                <div className="credit-card-form">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    icon={FaLock}
                  />
                  <div className="form-grid-2col">
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
          <div className="glass-panel checkout-review-card">
            <h3 className="checkout-review-title">
              Review Items ({cartItems.length})
            </h3>

            <div className="checkout-review-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-review-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="checkout-review-thumb"
                  />
                  <div className="checkout-review-info">
                    <div className="checkout-review-name">
                      {item.title}
                    </div>
                    <div className="checkout-review-qty">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="checkout-review-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-line-discount">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-line">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-total-line">
                <span>Total</span>
                <span className="text-gradient">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isProcessing}
              className="checkout-submit-btn"
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
