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
import orderService from '../services/orderService';
import Button from './Button';
import StatusBadge from './StatusBadge';

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
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          Live Order <span className="text-gradient">Tracking</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Monitor the real-time shipping status and estimated dispatch of your instruments.
        </p>
      </div>

      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="glass-panel"
        style={{
          padding: '0.75rem',
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <FaSearch size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ORD-9824) or Tracking Code (MM-TRK-7849102)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.6rem' }}
          />
        </div>
        <Button type="submit" variant="primary" size="md" isLoading={loading}>
          Track Shipment
        </Button>
      </form>

      {error && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#dc2626',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          {error}
        </div>
      )}

      {order && (
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
          {/* Top Banner */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Order {order.id}</h2>
                <StatusBadge status={order.status} type="order" />
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Tracking: <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>{order.trackingNumber}</span> ({order.carrier || 'Express Carrier'})
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ordered on</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div style={{ margin: '2.5rem 0', position: 'relative' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                position: 'relative',
              }}
            >
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div
                    key={step.title}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: isPassed
                          ? 'var(--accent-gradient)'
                          : '#ffffff',
                        border: `2px solid ${isPassed ? 'var(--accent-pink)' : 'var(--border-color)'}`,
                        color: isPassed ? '#fff' : 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.75rem',
                        boxShadow: isCurrent ? '0 4px 15px rgba(225, 29, 72, 0.35)' : 'var(--shadow-sm)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <step.icon size={18} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isPassed ? 'var(--text-main)' : 'var(--text-dim)' }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                      {step.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination & Order Items */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <FaMapMarkerAlt size={16} style={{ color: 'var(--accent-cyan)' }} /> Destination Address
              </h4>
              <p style={{ color: 'var(--text-main)', fontWeight: 700 }}>{order.shippingAddress?.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{order.shippingAddress?.street}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{order.shippingAddress?.country}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <FaBox size={16} style={{ color: 'var(--accent-pink)' }} /> Package Contents
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {order.items?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>
                      {item.quantity}x {item.title}
                    </span>
                    <span style={{ fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 900 }}>
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
