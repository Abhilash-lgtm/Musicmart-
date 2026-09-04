import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaMusic,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import Dropdown, { DropdownItem } from '../ui/Dropdown';
import Button from '../ui/Button';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Context State
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="store-navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <div className="brand-icon-wrapper">
              <FaMusic size={20} />
            </div>
            <span>
              Music<span className="brand-pink">Mart</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <FaSearch size={16} className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search guitars, keyboards, microphones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="navbar-search-input"
            />
          </form>

          {/* Nav Links */}
          <nav className="navbar-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/category/all"
              className={`nav-link ${location.pathname.startsWith('/category') ? 'active' : ''}`}
            >
              Shop Instruments
            </Link>
            <Link
              to="/track-order"
              className={`nav-link ${location.pathname === '/track-order' ? 'active' : ''}`}
            >
              Track Order
            </Link>
            <Link
              to="/profile"
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Profile
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Wishlist */}
            <Link to="/wishlist" className="nav-icon-btn" title="Saved Wishlist">
              <FaHeart size={18} />
              {wishlistCount > 0 && <span className="nav-counter">{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="nav-icon-btn" title="Shopping Bag">
              <FaShoppingCart size={18} />
              {cartCount > 0 && <span className="nav-counter">{cartCount}</span>}
            </Link>

            {/* Profile Button */}
            <Button
              variant={location.pathname === '/profile' ? 'primary' : 'outline'}
              size="sm"
              icon={FaUser}
              onClick={() => navigate('/profile')}
              title="My Profile"
            >
              Profile
            </Button>

            {/* Profile Dropdown / Login */}
            {isAuthenticated ? (
              <Dropdown
                align="right"
                trigger={
                  <div className="navbar-chip">
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                      alt={user?.name}
                      className="navbar-avatar"
                    />
                    <span className="navbar-user-name">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </div>
                }
              >
                <div className="navbar-profile-info">
                  <div className="navbar-user-name">{user?.name}</div>
                  <div className="navbar-user-email">{user?.email}</div>
                </div>

                {isAdmin && (
                  <DropdownItem
                    icon={FaTachometerAlt}
                    onClick={() => navigate('/admin')}
                  >
                    Admin Dashboard
                  </DropdownItem>
                )}

                <DropdownItem
                  icon={FaUser}
                  onClick={() => navigate('/profile')}
                >
                  My Profile & Orders
                </DropdownItem>

                <DropdownItem
                  icon={FaSignOutAlt}
                  danger
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Sign Out
                </DropdownItem>
              </Dropdown>
            ) : (
              <div className="navbar-auth-row">
                <Button
                  variant="primary"
                  size="sm"
                  icon={FaSignInAlt}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
