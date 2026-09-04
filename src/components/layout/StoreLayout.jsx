import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Layout wrapper for all public storefront pages
export const StoreLayout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="store-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
