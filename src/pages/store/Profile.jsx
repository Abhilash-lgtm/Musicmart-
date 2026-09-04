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
import { AuthContext } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/common/StatusBadge';

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
    <div className="container profile-container">
      {/* Profile Header */}
      <div className="glass-panel profile-header-card">
        <div className="profile-user-left">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <div>
            <div className="profile-user-heading">
              <h2 className="profile-name">{user?.name}</h2>
              <StatusBadge status={user?.role} type="role" />
            </div>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-header-actions">
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
      <div className="profile-tabs-nav">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`profile-tab-btn ${activeTab === 'orders' ? 'profile-tab-btn-active' : ''}`}
        >
          <FaBox size={16} /> My Orders ({orders.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`profile-tab-btn ${activeTab === 'settings' ? 'profile-tab-btn-active' : ''}`}
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
              <h3 className="empty-title">No Past Orders Yet</h3>
              <p className="empty-desc">
                Your completed purchases and deliveries will appear here.
              </p>
              <Link to="/category/all">
                <Button variant="primary">Shop Instruments</Button>
              </Link>
            </div>
          ) : (
            <div className="profile-orders-list">
              {orders.map((order) => (
                <div key={order.id} className="glass-panel profile-order-card">
                  <div className="profile-order-header">
                    <div>
                      <div className="profile-order-id-wrap">
                        <span className="profile-order-id">Order #{order.id}</span>
                        <StatusBadge status={order.status} type="order" />
                      </div>
                      <div className="profile-order-date">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="profile-order-meta-right">
                      <span className="profile-order-total">
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
                  <div className="profile-order-items">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="profile-order-item">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="profile-item-img"
                        />
                        <div className="profile-item-info">
                          <h5 className="profile-item-title">{item.title}</h5>
                          <span className="profile-item-qty">
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
        <div className="glass-panel profile-settings-card">
          <h3 className="settings-card-title">
            Update Profile Information
          </h3>

          {saveSuccess && (
            <div className="settings-success-alert">
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
              className="settings-save-btn"
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
