import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaTruck, FaBox, FaCheckCircle } from 'react-icons/fa';
import adminService from '../services/adminService';
import StatusBadge from './StatusBadge';
import Input from './Input';
import Button from './Button';

export const OrderStatusUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('processing');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('FedEx Priority');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const found = await adminService.getOrderById(id);
        setOrder(found);
        setStatus(found.status || 'processing');
        setTrackingNumber(found.trackingNumber || '');
        setCarrier(found.carrier || 'FedEx Priority');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccess(false);

    try {
      const updated = await adminService.updateOrderStatus(id, {
        status,
        trackingNumber,
        carrier,
      });
      setOrder(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/admin/orders')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <FaArrowLeft size={14} /> Back to Orders
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
              Order Fulfillment #{order.id}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Placed by {order.customerName} ({order.customerEmail}) on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={order.status} type="order" />
        </div>

        {success && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(5, 150, 105, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.25)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            <FaCheckCircle size={16} /> Order stage & tracking code successfully updated!
          </div>
        )}

        <form onSubmit={handleUpdate} style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Fulfillment Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <Input
              label="Assigned Carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              icon={FaTruck}
              required
            />

            <Input
              label="Waybill / Tracking #"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" size="md" isLoading={updating} icon={FaSave}>
            Save Status & Notify Customer
          </Button>
        </form>

        {/* Order Items Manifest */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <FaBox size={16} style={{ color: 'var(--accent-pink)' }} /> Order Package Manifest
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'right', fontSize: '1.1rem', fontWeight: 900 }}>
            Total Invoiced: <span className="text-gradient">${order.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusUpdate;
