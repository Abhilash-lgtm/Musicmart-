import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaEye } from 'react-icons/fa';
import adminService from '../services/adminService';
import StatusBadge from './StatusBadge';
import Button from './Button';

export const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllOrders();
      let filtered = data;

      if (statusFilter !== 'all') {
        filtered = filtered.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.id.toLowerCase().includes(q) ||
            o.customerName?.toLowerCase().includes(q) ||
            o.trackingNumber?.toLowerCase().includes(q)
        );
      }

      setOrders(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, search]);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>Order Fulfillment</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Track, dispatch, update delivery stages, and generate tracking manifests.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <FaSearch size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Tracking Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto' }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Tracking Code</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                  Loading customer orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No orders found matching filters.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 800, color: 'var(--text-main)' }}>{o.id}</td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{o.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.customerEmail}</div>
                    </div>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 800 }}>${o.total?.toFixed(2)}</td>
                  <td>
                    <StatusBadge status={o.status} type="order" />
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {o.trackingNumber}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-icon-only"
                        title="View Public Tracking"
                        onClick={() => navigate(`/track-order?tracking=${o.trackingNumber}`)}
                      >
                        <FaEye size={14} />
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="btn-icon-only"
                        title="Update Order Status"
                        onClick={() => navigate(`/admin/orders/${o.id}`)}
                      >
                        <FaEdit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
