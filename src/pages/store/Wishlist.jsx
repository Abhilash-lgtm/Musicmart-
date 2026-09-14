import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowRight, FaStar } from 'react-icons/fa';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import Button from '../../components/ui/Button';

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
          <h2 className="empty-wishlist-title">
            Your Wishlist is Empty
          </h2>
          <p className="empty-wishlist-desc">
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
    <div className="container wishlist-container">
      <div className="wishlist-header">
        <div>
          <h1 className="wishlist-title">
            Saved <span className="text-gradient">Wishlist</span> ({wishlistItems.length})
          </h1>
          <p className="wishlist-subtitle">
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
            className="product-card animate-fade-in product-card-clickable"
            onClick={() => navigate(`/product/${product.id}`)}
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

              <div className="product-card-rating">
                <div className="product-card-star">
                  <FaStar size={14} /> {product.rating || 5.0}
                </div>
              </div>

              <div className="product-card-footer">
                <div className="product-price-box">
                  <span className="product-price">₹{product.price.toFixed(2)}</span>
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
