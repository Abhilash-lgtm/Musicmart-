import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaEye } from 'react-icons/fa';
import adminService from '../../services/adminService';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/ui/Button';

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
      <div className="admin-page-header-simple">
        <h1 className="admin-page-title">Order Fulfillment</h1>
        <p className="admin-page-desc">
          Track, dispatch, update delivery stages, and generate tracking manifests.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel admin-filter-bar">
        <div className="admin-search-wrap">
          <FaSearch size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Tracking Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input admin-search-input"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select select-auto-width"
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
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="table-empty-cell">
                  <div className="spinner spinner-center" />
                  Loading customer orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-empty-cell">
                  No orders found matching filters.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td className="order-id-cell">{o.id}</td>
                  <td>
                    <div>
                      <div className="order-customer-name">{o.customerName}</div>
                      <div className="order-customer-email">{o.customerEmail}</div>
                    </div>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="table-price-val">${o.total?.toFixed(2)}</td>
                  <td>
                    <StatusBadge status={o.status} type="order" />
                  </td>
                  <td>
                    <span className="order-tracking-cell">
                      {o.trackingNumber}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="table-actions-group">
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
