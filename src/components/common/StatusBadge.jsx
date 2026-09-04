import React from 'react';
import Badge from '../ui/Badge';

/**
 * StatusBadge converts product/order states into colored status pills
 */
export const StatusBadge = ({ status, type = 'product' }) => {
  const s = String(status || '').toLowerCase();

  // Stock status
  if (type === 'stock') {
    const qty = parseInt(status, 10);
    if (isNaN(qty)) {
      if (s === 'in stock') return <Badge variant="success">In Stock</Badge>;
      if (s === 'low stock') return <Badge variant="warning">Low Stock</Badge>;
      return <Badge variant="danger">Out of Stock</Badge>;
    }
    if (qty > 10) return <Badge variant="success">{qty} in Stock</Badge>;
    if (qty > 0) return <Badge variant="warning">Only {qty} Left</Badge>;
    return <Badge variant="danger">Out of Stock</Badge>;
  }

  // Order fulfillment status
  if (type === 'order') {
    switch (s) {
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="info">Shipped</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'pending':
        return <Badge variant="default">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  }

  // User roles
  if (type === 'role') {
    if (s === 'admin') return <Badge variant="primary">Administrator</Badge>;
    return <Badge variant="default">Customer</Badge>;
  }

  return <Badge variant="default">{status}</Badge>;
};

export default StatusBadge;
