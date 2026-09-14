import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaRupeeSign,
  FaShoppingBag,
  FaBox,
  FaUsers,
  FaArrowRight,
  FaPlusCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import adminService from '../../services/adminService';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/ui/Button';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner" />
        <p>Loading analytics and metrics...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome & Action Buttons */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Store Overview</h1>
          <p className="admin-page-desc">
            Live metrics across catalog inventory, sales volume, and customer fulfillments.
          </p>
        </div>
        <div className="admin-page-actions">
          <Button
            variant="primary"
            size="md"
            icon={FaPlusCircle}
            onClick={() => navigate('/admin/products/new')}
          >
            Add Instrument
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/admin/orders')}
          >
            Manage Orders
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="metrics-grid">
        {/* Total Revenue */}
        <div className="metric-card animate-fade-in metric-card-revenue">
          <div className="metric-icon-box metric-icon-revenue">
            <FaRupeeSign size={24} />
          </div>
          <div className="metric-data">
            <h3 className="metric-text-gradient-fire">
              ₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </h3>
            <p>Total Revenue</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="metric-card animate-fade-in metric-card-orders">
          <div className="metric-icon-box metric-icon-orders">
            <FaShoppingBag size={24} />
          </div>
          <div className="metric-data">
            <h3 className="metric-text-gradient-cyan">
              {stats?.totalOrders || 0}
            </h3>
            <p>Orders Processed</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="metric-card animate-fade-in metric-card-products">
          <div className="metric-icon-box metric-icon-products">
            <FaBox size={24} />
          </div>
          <div className="metric-data">
            <h3 className="metric-text-gradient-purple">
              {stats?.totalProducts || 0}
            </h3>
            <p>Catalog Instruments</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="metric-card animate-fade-in metric-card-users">
          <div className="metric-icon-box metric-icon-users">
            <FaUsers size={24} />
          </div>
          <div className="metric-data">
            <h3 className="metric-text-gradient-emerald">
              {stats?.totalUsers || 0}
            </h3>
            <p>Registered Members</p>
          </div>
        </div>
      </div>

      <div className="dashboard-two-col">
        {/* Recent Orders Section */}
        <div className="glass-panel dashboard-panel">
          <div className="dashboard-panel-header">
            <h3 className="dashboard-panel-title">Recent Orders</h3>
            <Link to="/admin/orders" className="dashboard-panel-link-pink">
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="dashboard-orders-list">
            {stats?.recentOrders?.map((order) => (
              <div key={order.id} className="dashboard-order-row">
                <div>
                  <div className="dashboard-order-id">{order.id}</div>
                  <div className="dashboard-order-cust">
                    {order.customerName} • {order.items?.length} items
                  </div>
                </div>
                <div className="dashboard-order-right">
                  <div>
                    <div className="dashboard-order-price">₹{order.total?.toFixed(2)}</div>
                    <StatusBadge status={order.status} type="order" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts Section */}
        <div className="glass-panel dashboard-panel">
          <div className="dashboard-panel-header">
            <h3 className="dashboard-panel-title">
              <FaExclamationTriangle size={16} className="icon-amber" /> Stock Warnings
            </h3>
            <Link to="/admin/products" className="dashboard-panel-link-cyan">
              Inventory
            </Link>
          </div>

          <div className="dashboard-stock-list">
            {stats?.lowStockProducts?.map((p) => (
              <div key={p.id} className="dashboard-stock-row">
                <div className="dashboard-stock-info">
                  <div className="dashboard-stock-name">
                    {p.title}
                  </div>
                  <div className="dashboard-stock-meta">
                    ₹{p.price.toFixed(2)} • {p.brand}
                  </div>
                </div>

                <div className="dashboard-stock-actions">
                  <StatusBadge status={p.stock} type="stock" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                  >
                    Restock
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
