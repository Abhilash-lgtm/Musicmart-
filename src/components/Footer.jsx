import React from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="store-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <div className="navbar-brand footer-brand-title">
              <div className="brand-icon-wrapper">
                <FaMusic size={18} />
              </div>
              <span>
                Music<span className="brand-pink">Mart</span>
              </span>
            </div>
            <p className="footer-desc">
              Your premium destination for guitars, keyboards, studio audio, drums, and wind instruments. Certified quality and fast global shipping.
            </p>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <FaMapMarkerAlt size={14} className="contact-icon-pink" /> 100 Soundwave Blvd, Austin, TX 78701
              </div>
              <div className="footer-contact-item">
                <FaPhone size={14} className="contact-icon-cyan" /> +1 (800) 555-BEAT
              </div>
              <div className="footer-contact-item">
                <FaEnvelope size={14} className="contact-icon-purple" /> support@musicmart.com
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="footer-col">
            <h4>Instrument Categories</h4>
            <ul>
              <li><Link to="/category/guitars">Guitars & Basses</Link></li>
              <li><Link to="/category/keyboards">Keyboards & Pianos</Link></li>
              <li><Link to="/category/drums">Drums & Percussion</Link></li>
              <li><Link to="/category/audio">Studio & Microphones</Link></li>
              <li><Link to="/category/wind">Wind & Brass Instruments</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li><Link to="/track-order">Track Your Order</Link></li>
              <li><Link to="/cart">View Shopping Bag</Link></li>
              <li><Link to="/wishlist">Saved Wishlist</Link></li>
              <li><Link to="/profile">Account Settings</Link></li>
              <li><a href="#support">Warranty & Returns</a></li>
            </ul>
          </div>

          {/* Admin & Portal */}
          <div className="footer-col">
            <h4>Admin & Portal</h4>
            <ul>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><Link to="/admin/products">Inventory Management</Link></li>
              <li><Link to="/admin/orders">Order Fulfillment</Link></li>
              <li><Link to="/admin/users">User Directory</Link></li>
              <li><Link to="/login">Switch Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} MusicMart Inc. All rights reserved. Made with{' '}
            <FaHeart size={13} className="footer-heart" /> for musicians.
          </div>
          <div className="footer-badges">
            <span>SSL Secured</span>
            <span>2-Year Warranty</span>
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
