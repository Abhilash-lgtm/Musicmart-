import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBox,
  FaPlusCircle,
  FaShoppingBag,
  FaUsers,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaMusic,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export const AdminSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: FaTachometerAlt, end: true },
    { label: 'Products', path: '/admin/products', icon: FaBox, end: true },
    { label: 'Add Product', path: '/admin/products/new', icon: FaPlusCircle },
    { label: 'Orders', path: '/admin/orders', icon: FaShoppingBag },
    { label: 'User Directory', path: '/admin/users', icon: FaUsers },
  ];

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <div className="brand-icon-wrapper admin-brand-icon">
          <FaMusic size={16} />
        </div>
        <div>
          <div className="admin-brand-title">
            Music<span className="brand-pink">Mart</span>
          </div>
          <div className="admin-brand-portal">
            ADMIN PORTAL
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="admin-nav">
        <div className="admin-nav-category">
          Management
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="admin-nav-divider">
          Storefront
        </div>

        <Link to="/" className="admin-nav-item">
          <FaExternalLinkAlt size={15} />
          <span>View Live Store</span>
        </Link>
      </nav>

      {/* Footer Profile */}
      <div className="admin-profile-footer">
        <div className="admin-profile-user">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt="Admin"
            className="admin-profile-avatar"
          />
          <div className="admin-profile-meta">
            <div className="admin-profile-name">
              {user?.name || 'Administrator'}
            </div>
            <div className="admin-profile-role">Super Admin</div>
          </div>
        </div>
        <button
          className="admin-logout-btn"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <FaSignOutAlt size={13} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
