import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaSearch,
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import orderService from '../../services/orderService';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/common/StatusBadge';

export const OrderTracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackingQuery = searchParams.get('tracking') || '';

  const [searchInput, setSearchInput] = useState(trackingQuery || 'MM-TRK-7849102');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrder = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const found = await orderService.getOrderById(query);
      setOrder(found);
    } catch {
      setError(`No order found matching "${query}". Please check the tracking number or order ID.`);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackingQuery) {
      fetchOrder(trackingQuery);
    } else {
      fetchOrder('MM-TRK-7849102');
    }
  }, [trackingQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchParams({ tracking: searchInput.trim() });
    fetchOrder(searchInput.trim());
  };

  const steps = [
    { title: 'Ordered', icon: FaClock, desc: 'Order received & verified' },
    { title: 'Processing', icon: FaBox, desc: 'Quality checked & packed' },
    { title: 'Shipped', icon: FaTruck, desc: 'In transit with carrier' },
    { title: 'Delivered', icon: FaCheckCircle, desc: 'Delivered to doorstep' },
  ];

  const getStepIndex = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'delivered') return 3;
    if (s === 'shipped') return 2;
    if (s === 'processing') return 1;
    return 0;
  };

  const currentStep = getStepIndex(order?.status);

  return (
    <div className="container tracking-container">
      <div className="tracking-header-wrap">
        <h1 className="tracking-title">
          Live Order <span className="text-gradient">Tracking</span>
        </h1>
        <p className="tracking-desc">
          Monitor the real-time shipping status and estimated dispatch of your instruments.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="glass-panel tracking-form">
        <div className="tracking-input-box">
          <FaSearch size={16} className="tracking-input-icon" />
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ORD-9824) or Tracking Code (MM-TRK-7849102)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-input tracking-input"
          />
        </div>
        <Button type="submit" variant="primary" size="md" isLoading={loading}>
          Track Shipment
        </Button>
      </form>

      {error && (
        <div className="tracking-error-box">
          {error}
        </div>
      )}

      {order && (
        <div className="glass-panel animate-fade-in tracking-result-panel">
          {/* Top Banner */}
          <div className="tracking-meta-header">
            <div>
              <div className="tracking-order-heading-wrap">
                <h2 className="tracking-order-id">Order {order.id}</h2>
                <StatusBadge status={order.status} type="order" />
              </div>
              <div className="tracking-number-text">
                Tracking: <span className="tracking-code-val">{order.trackingNumber}</span> ({order.carrier || 'Express Carrier'})
              </div>
            </div>

            <div className="tracking-date-box">
              <div className="tracking-date-label">Ordered on</div>
              <div className="tracking-date-val">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="tracking-stepper-wrap">
            <div className="tracking-stepper-grid">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={step.title} className="stepper-step">
                    <div
                      className={`stepper-node ${isPassed ? 'stepper-node-passed' : ''} ${isCurrent ? 'stepper-node-current' : ''}`}
                    >
                      <step.icon size={18} />
                    </div>
                    <div className={`stepper-step-title ${isPassed ? 'stepper-step-title-passed' : ''}`}>
                      {step.title}
                    </div>
                    <div className="stepper-step-desc">
                      {step.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination & Order Items */}
          <div className="tracking-details-grid">
            <div>
              <h4 className="tracking-col-heading">
                <FaMapMarkerAlt size={16} className="icon-cyan" /> Destination Address
              </h4>
              <p className="address-recipient">{order.shippingAddress?.name}</p>
              <p className="address-line">{order.shippingAddress?.street}</p>
              <p className="address-line">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
              <p className="address-line">{order.shippingAddress?.country}</p>
            </div>

            <div>
              <h4 className="tracking-col-heading">
                <FaBox size={16} className="icon-pink" /> Package Contents
              </h4>
              <div className="manifest-items-list">
                {order.items?.map((item, i) => (
                  <div key={i} className="manifest-item-row">
                    <span className="manifest-item-title">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="manifest-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="manifest-total-row">
                  <span>Total Paid</span>
                  <span className="text-gradient">${order.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
