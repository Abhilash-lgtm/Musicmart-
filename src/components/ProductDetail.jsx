import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaCheck,
  FaShieldAlt,
  FaTruck,
  FaVolumeUp,
  FaArrowLeft,
  FaMinus,
  FaPlus,
} from 'react-icons/fa';
import productService from '../services/productService';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import Button from './Button';
import StatusBadge from './StatusBadge';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [added, setAdded] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const found = await productService.getProductById(id);
        setProduct(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner" />
        <p>Loading instrument specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2>Instrument Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          The instrument you are looking for may have been retired from the catalog.
        </p>
        <Link to="/category/all">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images?.length ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <FaArrowLeft size={14} /> Back to Search
        </button>
      </div>

      <div className="product-detail-layout">
        {/* Gallery Column */}
        <div className="product-detail-gallery">
          <img
            src={images[activeImage] || product.image}
            alt={product.title}
            className="main-product-image"
          />

          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {images.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: `2px solid ${activeImage === idx ? 'var(--accent-pink)' : '#e2e8f0'}`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Audio Tone Preview */}
          <div
            className="glass-panel"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: '50%',
                  background: isPlayingAudio ? 'var(--accent-pink)' : 'var(--bg-elevated)',
                  color: isPlayingAudio ? '#fff' : 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              >
                <FaVolumeUp size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Audio Tone Sample Preview</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  {isPlayingAudio ? 'Playing Studio Recording...' : 'Click to hear raw instrument tone'}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            >
              {isPlayingAudio ? 'Stop' : 'Play Sound'}
            </Button>
          </div>
        </div>

        {/* Details & Purchase Actions */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
              {product.brand}
            </span>
            <StatusBadge status={product.stock} type="stock" />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '1rem', color: 'var(--text-main)' }}>
            {product.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontWeight: 800 }}>
              <FaStar size={16} /> {product.rating}
            </div>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              {product.reviewsCount} Customer Reviews
            </span>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              SKU: MM-{product.id}-CERT
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.25rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: 'var(--accent-pink)',
                  background: 'rgba(225, 29, 72, 0.1)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                }}
              >
                Save {product.discount}%
              </span>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Add to Cart Stepper & Button */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <button
                type="button"
                style={{ padding: '0.75rem 1rem', color: 'var(--text-main)', fontSize: '1.1rem' }}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <FaMinus size={12} />
              </button>
              <span style={{ padding: '0 0.75rem', fontWeight: 800 }}>{quantity}</span>
              <button
                type="button"
                style={{ padding: '0.75rem 1rem', color: 'var(--text-main)', fontSize: '1.1rem' }}
                onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
              >
                <FaPlus size={12} />
              </button>
            </div>

            <Button
              variant={added ? 'secondary' : 'primary'}
              size="lg"
              icon={added ? FaCheck : FaShoppingCart}
              onClick={handleAddToCart}
              style={{ flex: 1 }}
            >
              {added ? 'Added to Cart!' : 'Add to Shopping Bag'}
            </Button>

            <button
              type="button"
              className={`nav-icon-btn ${inWishlist ? 'active' : ''}`}
              style={{ width: '52px', height: '52px' }}
              onClick={() => toggleWishlist(product)}
              title="Save to Wishlist"
            >
              <FaHeart size={20} />
            </button>
          </div>

          {/* Assurance Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: '#f8fafc',
              border: '1px solid var(--border-color)',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaTruck size={18} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Insured Shipping</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Dispatched in 24h</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaShieldAlt size={18} style={{ color: 'var(--accent-emerald)' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>2-Year Warranty</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>100% Authorized</div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                Technical Specifications
              </h3>
              <table className="product-specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td style={{ color: 'var(--text-main)', fontWeight: 600 }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
