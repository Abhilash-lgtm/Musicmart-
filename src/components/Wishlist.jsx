import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowRight, FaStar } from 'react-icons/fa';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import Button from './Button';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-wishlist-view animate-fade-in">
          <div className="empty-icon">💜</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Save your favorite guitars, keyboards, and gear to keep an eye on stock and promotions.
          </p>
          <Link to="/category/all">
            <Button variant="primary" size="lg" icon={FaArrowRight}>
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>
            Saved <span className="text-gradient">Wishlist</span> ({wishlistItems.length})
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Items you have bookmarked for future performances and studio sessions.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clearWishlist}>
          Clear Wishlist
        </Button>
      </div>

      <div className="products-grid">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="product-card animate-fade-in"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-card-image-wrap">
              <img
                src={product.image}
                alt={product.title}
                className="product-card-image"
              />
              <div className="product-card-actions">
                <button
                  type="button"
                  className="card-action-btn active"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  title="Remove from Wishlist"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>

            <div className="product-card-body">
              <div className="product-brand">{product.brand}</div>
              <h4 className="product-title" title={product.title}>
                {product.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', gap: '0.2rem', fontSize: '0.85rem', fontWeight: 800 }}>
                  <FaStar size={14} /> {product.rating || 5.0}
                </div>
              </div>

              <div className="product-card-footer">
                <div className="product-price-box">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={FaShoppingCart}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMoveToCart(product);
                  }}
                >
                  Move to Bag
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
