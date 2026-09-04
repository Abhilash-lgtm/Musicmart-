import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser,
  FaBox,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTruck,
  FaSignOutAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import orderService from '../services/orderService';
import Input from './Input';
import Button from './Button';
import StatusBadge from './StatusBadge';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Edit Profile Form
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) return;
      try {
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchUserOrders();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      await updateProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Profile Header */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-pink)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{user?.name}</h2>
              <StatusBadge status={user?.role} type="role" />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{user?.email}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {user?.role === 'admin' && (
            <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
              Admin Portal
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            icon={FaSignOutAlt}
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '0.75rem 1.5rem',
            fontWeight: 800,
            fontSize: '1rem',
            color: activeTab === 'orders' ? 'var(--accent-pink)' : 'var(--text-muted)',
            borderBottom: activeTab === 'orders' ? '3px solid var(--accent-pink)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FaBox size={16} /> My Orders ({orders.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          style={{
            padding: '0.75rem 1.5rem',
            fontWeight: 800,
            fontSize: '1rem',
            color: activeTab === 'settings' ? 'var(--accent-pink)' : 'var(--text-muted)',
            borderBottom: activeTab === 'settings' ? '3px solid var(--accent-pink)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FaUser size={16} /> Account Settings
        </button>
      </div>

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div>
          {loadingOrders ? (
            <div className="loading-spinner-container">
              <div className="spinner" />
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-orders-view">
              <div className="empty-icon">📦</div>
              <h3 style={{ fontWeight: 800 }}>No Past Orders Yet</h3>
              <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>
                Your completed purchases and deliveries will appear here.
              </p>
              <Link to="/category/all">
                <Button variant="primary">Shop Instruments</Button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {orders.map((order) => (
                <div key={order.id} className="glass-panel" style={{ padding: '1.75rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '1rem',
                      marginBottom: '1.25rem',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>Order #{order.id}</span>
                        <StatusBadge status={order.status} type="order" />
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-pink)' }}>
                        ${order.total?.toFixed(2)}
                      </span>
                      <Link to={`/track-order?tracking=${order.trackingNumber}`}>
                        <Button variant="outline" size="sm" icon={FaTruck}>
                          Track Shipment
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h5 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{item.title}</h5>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings Tab Content */}
      {activeTab === 'settings' && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '640px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Update Profile Information
          </h3>

          {saveSuccess && (
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
              <FaCheckCircle size={16} /> Profile details saved successfully!
            </div>
          )}

          <form onSubmit={handleUpdateProfile}>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              icon={FaUser}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={user?.email || ''}
              disabled
              icon={FaEnvelope}
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={FaPhone}
            />

            <Input
              label="Default Delivery Address"
              name="address"
              as="textarea"
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              icon={FaMapMarkerAlt}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={saving}
              style={{ marginTop: '0.5rem' }}
            >
              Save Profile
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
