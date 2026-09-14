import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Layouts
import StoreLayout from '../components/layout/StoreLayout';
import AdminLayout from '../components/layout/AdminLayout';
// Guard
import ProtectedRoute from '../components/common/ProtectedRoute';
// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
// Storefront Pages
import Home from '../pages/store/Home';
import CategoryListing from '../pages/store/CategoryListing';
import ProductDetail from '../pages/store/ProductDetail';
import Cart from '../pages/store/Cart';
import Wishlist from '../pages/store/Wishlist';
import Checkout from '../pages/store/Checkout';
import OrderTracking from '../pages/store/OrderTracking';
import Profile from '../pages/store/Profile';
// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import ProductList from '../pages/admin/ProductList';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';
import OrderList from '../pages/admin/OrderList';
import OrderStatusUpdate from '../pages/admin/OrderStatusUpdate';

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
        <Route path="profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>} /> </Route>
        {/* Standalone Auth Pages */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        {/* Protected Admin Portal Layout */}
        <Route path="admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderStatusUpdate />} /></Route>
        {/* 404 Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} /></Routes>
  );
};

export default AppRoutes;