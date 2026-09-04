import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

// Layout wrapper for all admin portal pages
export const AdminLayout = () => {
  const location = useLocation();

  const getPageTitle = (path) => {
    if (path === '/admin') return 'Store Analytics & Overview';
    if (path === '/admin/products') return 'Catalog Inventory';
    if (path === '/admin/products/new') return 'Add New Instrument';
    if (path.startsWith('/admin/products/edit')) return 'Edit Instrument';
    if (path === '/admin/orders') return 'Order Fulfillment';
    if (path.startsWith('/admin/orders/')) return 'Update Order Status';
    if (path === '/admin/users') return 'User & Role Directory';
    return 'Admin Portal';
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader title={getPageTitle(location.pathname)} />
        <main className="admin-page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
