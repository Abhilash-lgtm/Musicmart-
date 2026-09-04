import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import StoreLayout from './StoreLayout';
import AdminLayout from './AdminLayout';

// Guard
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

// Storefront Pages
import Home from './Home';
import CategoryListing from './CategoryListing';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Checkout from './Checkout';
import OrderTracking from './OrderTracking';
import Profile from './Profile';

// Admin Pages
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import OrderList from './OrderList';
import OrderStatusUpdate from './OrderStatusUpdate';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Storefront Layout */}
      <Route element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:id" element={<CategoryListing />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="track-order" element={<OrderTracking />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Standalone Auth Pages */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* Protected Admin Portal Layout */}
      <Route
        path="admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderStatusUpdate />} />
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
