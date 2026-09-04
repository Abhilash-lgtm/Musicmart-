import React, { useState, useEffect } from 'react';
import { FaSearch, FaShieldAlt, FaUser } from 'react-icons/fa';
import adminService from '../../services/adminService';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/ui/Button';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      let filtered = data;

      if (roleFilter !== 'all') {
        filtered = filtered.filter((u) => u.role === roleFilter);
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        );
      }

      setUsers(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, search]);

  const handleRoleToggle = async (user) => {
    const nextRole = user.role === 'admin' ? 'customer' : 'admin';
    try {
      await adminService.updateUserRole(user.id, nextRole);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Failed to update user role');
    }
  };

  return (
    <div>
      <div className="admin-page-header-simple">
        <h1 className="admin-page-title">User Directory</h1>
        <p className="admin-page-desc">
          Manage customer accounts, verify permissions, and toggle administrator roles.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel admin-filter-bar">
        <div className="admin-search-wrap">
          <FaSearch size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input admin-search-input"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="form-select select-auto-width"
        >
          <option value="all">All Roles</option>
          <option value="customer">Customers Only</option>
          <option value="admin">Administrators Only</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Member Since</th>
              <th className="text-right">Role Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="table-empty-cell">
                  <div className="spinner spinner-center" />
                  Loading member directory...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty-cell">
                  No members found matching filter.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="table-user-cell">
                      <img
                        src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={u.name}
                        className="table-user-avatar"
                      />
                      <span className="table-user-name">{u.name}</span>
                    </div>
                  </td>
                  <td className="table-cell-muted">{u.email}</td>
                  <td className="table-cell-muted">{u.phone || 'N/A'}</td>
                  <td>
                    <StatusBadge status={u.role} type="role" />
                  </td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active Member'}</td>
                  <td className="text-right">
                    <Button
                      variant={u.role === 'admin' ? 'secondary' : 'outline'}
                      size="sm"
                      icon={u.role === 'admin' ? FaUser : FaShieldAlt}
                      onClick={() => handleRoleToggle(u)}
                    >
                      {u.role === 'admin' ? 'Demote to Customer' : 'Grant Admin'}
                    </Button>
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

export default UserManagement;
