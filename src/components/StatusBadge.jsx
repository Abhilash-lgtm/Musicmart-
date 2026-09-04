import React from 'react';
import Badge from './Badge';
import {
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaBox,
  FaTimesCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUser,
} from 'react-icons/fa';

// Helper component to render colored status badges
export const StatusBadge = ({ status, type = 'order' }) => {
  const normalized = String(status || '').toLowerCase();

  // Order Fulfillment Badges
  if (type === 'order') {
    switch (normalized) {
      case 'delivered':
        return <Badge variant="success" icon={FaCheckCircle}>Delivered</Badge>;
      case 'shipped':
        return <Badge variant="info" icon={FaTruck}>Shipped</Badge>;
      case 'processing':
        return <Badge variant="primary" icon={FaBox}>Processing</Badge>;
      case 'pending':
        return <Badge variant="warning" icon={FaClock}>Pending</Badge>;
      case 'cancelled':
        return <Badge variant="danger" icon={FaTimesCircle}>Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  }

  // Stock Availability Badges
  if (type === 'stock') {
    const qty = Number(status);
    if (qty <= 0 || normalized === 'out of stock') {
      return <Badge variant="danger" icon={FaTimesCircle}>Out of Stock</Badge>;
    }
    if (qty <= 5 || normalized === 'low stock') {
      return <Badge variant="warning" icon={FaExclamationTriangle}>Low Stock ({qty})</Badge>;
    }
    return <Badge variant="success" icon={FaCheckCircle}>In Stock ({qty})</Badge>;
  }

  // Role Badges
  if (type === 'role') {
    switch (normalized) {
      case 'admin':
        return <Badge variant="primary" icon={FaShieldAlt}>Admin</Badge>;
      case 'customer':
      default:
        return <Badge variant="default" icon={FaUser}>Customer</Badge>;
    }
  }

  return <Badge variant="default">{status}</Badge>;
};

export default StatusBadge;
