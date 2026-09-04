import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaTruck, FaBox, FaCheckCircle } from 'react-icons/fa';
import adminService from '../../services/adminService';
import StatusBadge from '../../components/common/StatusBadge';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

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
    <div className="admin-form-container">
      <div className="detail-back-wrap">
        <button onClick={() => navigate('/admin/orders')} className="back-btn">
          <FaArrowLeft size={14} /> Back to Orders
        </button>
      </div>

      <div className="glass-panel admin-form-panel">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">
              Order Fulfillment #{order.id}
            </h1>
            <p className="admin-page-desc">
              Placed by {order.customerName} ({order.customerEmail}) on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={order.status} type="order" />
        </div>

        {success && (
          <div className="settings-success-alert">
            <FaCheckCircle size={16} /> Order stage & tracking code successfully updated!
          </div>
        )}

        <form onSubmit={handleUpdate} className="status-update-form">
          <div className="form-grid-3col">
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
        <div className="manifest-section">
          <h3 className="manifest-title">
            <FaBox size={16} className="icon-pink" /> Order Package Manifest
          </h3>

          <div className="manifest-items-list">
            {order.items?.map((item, idx) => (
              <div key={idx} className="manifest-item-box">
                <div className="manifest-item-left">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="manifest-item-thumb"
                  />
                  <div>
                    <div className="manifest-item-name">{item.title}</div>
                    <div className="manifest-item-qty-text">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="manifest-item-price-val">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="manifest-total-summary">
            Total Invoiced: <span className="text-gradient">${order.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusUpdate;
