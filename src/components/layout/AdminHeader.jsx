import React, { useContext } from 'react';
import { FaBell, FaCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export const AdminHeader = ({ title = 'Administration' }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className="admin-header">
      <div>
        <h2 className="admin-header-title">
          {title}
        </h2>
      </div>

      <div className="admin-header-actions">
        {/* Live Status Pill */}
        <div className="admin-status-pill">
          <FaCircle size={8} className="status-circle-emerald" />
          <span>API READY</span>
        </div>

        {/* Bell Icon */}
        <div className="admin-bell-btn">
          <FaBell size={16} />
          <span className="admin-bell-dot" />
        </div>

        {/* User Info */}
        <div className="admin-header-user">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="admin-header-avatar"
          />
          <div className="admin-header-userinfo">
            <span className="admin-header-username">{user?.name}</span>
            <span className="admin-header-userrole">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
