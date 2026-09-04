import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaGuitar,
  FaMusic,
  FaDrum,
  FaMicrophone,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaHeadphones,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaCheck,
  FaBolt,
} from 'react-icons/fa';
import { GiPianoKeys } from 'react-icons/gi';
import productService from '../services/productService';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import Button from './Button';

export const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          productService.getCategories(),
          productService.getProducts({}),
        ]);
        setCategories(cats);
        setFeaturedProducts(prods.slice(0, 4));
      } catch (e) {
        console.error('Failed to load homepage data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryTheme = (catId) => {
    switch (catId) {
      case 'guitars':
        return {
          gradient: 'linear-gradient(135deg, #e11d48 0%, #ea580c 100%)',
          color: '#e11d48',
          shadow: '0 8px 25px rgba(225, 29, 72, 0.25)',
          icon: FaGuitar,
        };
      case 'keyboards':
        return {
          gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
          color: '#7c3aed',
          shadow: '0 8px 25px rgba(124, 58, 237, 0.25)',
          icon: GiPianoKeys,
        };
      case 'drums':
        return {
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#d97706',
          shadow: '0 8px 25px rgba(217, 119, 6, 0.25)',
          icon: FaDrum,
        };
      case 'audio':
        return {
          gradient: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
          color: '#0284c7',
          shadow: '0 8px 25px rgba(2, 132, 199, 0.25)',
          icon: FaMicrophone,
        };
      case 'wind':
        return {
          gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#059669',
          shadow: '0 8px 25px rgba(5, 150, 105, 0.25)',
          icon: FaMusic,
        };
      default:
        return {
          gradient: 'var(--accent-gradient)',
          color: '#e11d48',
          shadow: '0 8px 25px rgba(225, 29, 72, 0.25)',
          icon: FaMusic,
        };
    }
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.45rem 1.1rem',
                  borderRadius: '999px',
                  background: 'rgba(225, 29, 72, 0.08)',
                  border: '1px solid rgba(225, 29, 72, 0.25)',
                  color: 'var(--accent-pink)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  marginBottom: '1.35rem',
                }}
              >
                <FaBolt size={14} /> NEW SEASON PRO-AUDIO COLLECTION
              </div>
              <h1 className="hero-title">
                Experience Pure Sound In <span className="text-gradient-rainbow">Full Spectrum</span>
              </h1>
              <p className="hero-subtitle">
                Explore handcrafted electric guitars, flagship stage synthesizers, studio-grade microphones, and precision acoustic percussion.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="lg"
                  icon={FaArrowRight}
                  onClick={() => navigate('/category/all')}
                >
                  Explore All Instruments
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/category/guitars')}
                >
                  Shop Guitars & Bass
                </Button>
              </div>
            </div>

            <div className="hero-image-wrapper animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80"
                alt="Music instruments showroom"
                className="hero-image"
              />
              <div
                className="animate-float"
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '1rem',
                  padding: '1.25rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--accent-gradient-rainbow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)',
                  }}
                >
                  ★
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>Certified Pro-Grade Audio</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>100% Genuine Authorized Dealer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ padding: '2.5rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(225, 29, 72, 0.1)', color: 'var(--accent-pink)' }}>
                <FaTruck size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>Free Global Express</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Complimentary on orders $500+</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent-cyan)' }}>
                <FaShieldAlt size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>2-Year Comprehensive</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Full factory certified warranty</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-emerald)' }}>
                <FaUndo size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>30-Day Money Back</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Hassle-free return policy</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(217, 119, 6, 0.1)', color: 'var(--accent-amber)' }}>
                <FaHeadphones size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>24/7 Gear Specialists</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Assistance from live musicians</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section style={{ padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)' }}>
                Explore by <span className="text-gradient-rainbow">Category</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                Handcrafted collections tuned for stage musicians, sound producers, and performers.
              </p>
            </div>
            <Link to="/category/all" style={{ color: 'var(--accent-cyan)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
              View All Instruments <FaArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {categories.map((cat) => {
              const theme = getCategoryTheme(cat.id);
              const IconComp = theme.icon;

              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="glass-panel"
                  style={{
                    padding: '2.25rem 1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.25rem',
                    borderRadius: 'var(--radius-xl)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = theme.color;
                    e.currentTarget.style.boxShadow = theme.shadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-lg)',
                      background: theme.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: theme.shadow,
                    }}
                  >
                    <IconComp size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      {cat.name}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: theme.color, fontWeight: 700 }}>
                      {cat.itemCount}+ Instruments
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)' }}>
                Trending & <span className="text-gradient-cyan">Featured Gear</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                The most revered gear across world stages, home studios, and music academies.
              </p>
            </div>
            <Link to="/category/all" style={{ color: 'var(--accent-pink)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
              Full Catalog <FaArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="loading-spinner-container">
              <div className="spinner" />
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => {
                const inWishlist = isInWishlist(product.id);
                const isJustAdded = addedItem === product.id;

                return (
                  <div
                    key={product.id}
                    className="product-card"
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
                          className={`card-action-btn ${inWishlist ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <FaHeart size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="product-card-body">
                      <div className="product-brand">{product.brand}</div>
                      <h4 className="product-title" title={product.title}>
                        {product.title}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', gap: '0.25rem', fontSize: '0.9rem', fontWeight: 800 }}>
                          <FaStar size={14} /> {product.rating}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                          ({product.reviewsCount} reviews)
                        </span>
                      </div>

                      <div className="product-card-footer">
                        <div className="product-price-box">
                          <span className="product-price">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="product-old-price">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <Button
                          variant={isJustAdded ? 'secondary' : 'primary'}
                          size="sm"
                          icon={isJustAdded ? FaCheck : FaShoppingCart}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          {isJustAdded ? 'Added!' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
