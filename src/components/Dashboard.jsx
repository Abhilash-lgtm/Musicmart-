import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaDollarSign,
  FaShoppingBag,
  FaBox,
  FaUsers,
  FaArrowRight,
  FaPlusCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import adminService from '../services/adminService';
import StatusBadge from './StatusBadge';
import Button from './Button';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>Store Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Live metrics across catalog inventory, sales volume, and customer fulfillments.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
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
        <div className="metric-card animate-fade-in" style={{ borderLeft: '4px solid #e11d48' }}>
          <div className="metric-icon-box" style={{ background: 'linear-gradient(135deg, #e11d48 0%, #ea580c 100%)', color: '#fff' }}>
            <FaDollarSign size={24} />
          </div>
          <div className="metric-data">
            <h3 style={{ background: 'var(--accent-gradient-fire)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ${stats?.totalRevenue ? stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </h3>
            <p>Total Revenue</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="metric-card animate-fade-in" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="metric-icon-box" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', color: '#fff' }}>
            <FaShoppingBag size={24} />
          </div>
          <div className="metric-data">
            <h3 style={{ background: 'var(--accent-gradient-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats?.totalOrders || 0}
            </h3>
            <p>Orders Processed</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="metric-card animate-fade-in" style={{ borderLeft: '4px solid #7c3aed' }}>
          <div className="metric-icon-box" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', color: '#fff' }}>
            <FaBox size={24} />
          </div>
          <div className="metric-data">
            <h3 style={{ background: 'var(--accent-gradient-purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats?.totalProducts || 0}
            </h3>
            <p>Catalog Instruments</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="metric-card animate-fade-in" style={{ borderLeft: '4px solid #059669' }}>
          <div className="metric-icon-box" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>
            <FaUsers size={24} />
          </div>
          <div className="metric-data">
            <h3 style={{ background: 'var(--accent-gradient-emerald)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats?.totalUsers || 0}
            </h3>
            <p>Registered Members</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        {/* Recent Orders Section */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Recent Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: '0.85rem', color: 'var(--accent-pink)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats?.recentOrders?.map((order) => (
              <div
                key={order.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  background: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>{order.id}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {order.customerName} • {order.items?.length} items
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>${order.total?.toFixed(2)}</div>
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
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaExclamationTriangle size={16} style={{ color: 'var(--accent-amber)' }} /> Stock Warnings
            </h3>
            <Link to="/admin/products" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              Inventory
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats?.lowStockProducts?.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: '#f8fafc',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ minWidth: 0, flex: 1, paddingRight: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-main)' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    ${p.price.toFixed(2)} • {p.brand}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
