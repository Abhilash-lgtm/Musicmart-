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
  FaUser,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

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
      {/* Brand */}
      <div className="admin-sidebar-brand">
        <Link to="/admin" className="admin-brand-link">
          <div className="brand-icon-wrapper">
            <FaMusic size={18} />
          </div>
          <span className="admin-brand-text">
            Music<span className="brand-pink">Mart</span>
          </span>
          <span className="admin-portal-badge">ADMIN</span>
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="admin-nav-menu">
        <div className="admin-nav-label">Management</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? 'admin-nav-item-active' : ''}`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="admin-nav-label admin-nav-label-mt">Storefront</div>
        <Link to="/" className="admin-nav-item">
          <FaExternalLinkAlt size={15} />
          <span>View Live Store</span>
        </Link>
      </nav>

      {/* Footer Profile */}
      <div className="admin-profile-footer">
        <div className="admin-profile-user">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Admin"
              className="admin-profile-avatar"
            />
          ) : (
            <div className="admin-profile-avatar admin-avatar-placeholder">
              <FaUser size={14} />
            </div>
          )}
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
