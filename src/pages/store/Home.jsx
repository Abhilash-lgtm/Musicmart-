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
import productService from '../../services/productService';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import Button from '../../components/ui/Button';

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

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'guitars': return FaGuitar;
      case 'keyboards': return GiPianoKeys;
      case 'drums': return FaDrum;
      case 'audio': return FaMicrophone;
      default: return FaMusic;
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
              <div className="hero-badge">
                <FaBolt size={14} /> NEW SEASON PRO-AUDIO COLLECTION
              </div>
              <h1 className="hero-title">
                Experience Pure Sound In <span className="text-gradient-rainbow">Full Spectrum</span>
              </h1>
              <p className="hero-subtitle">
                Explore handcrafted electric guitars, flagship stage synthesizers, studio-grade microphones, and precision acoustic percussion.
              </p>
              <div className="hero-cta-group">
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
              <div className="hero-cert-float animate-float">
                <div className="hero-cert-star">★</div>
                <div>
                  <div className="hero-cert-title">Certified Pro-Grade Audio</div>
                  <div className="hero-cert-subtitle">100% Genuine Authorized Dealer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box feature-icon-pink">
                <FaTruck size={24} />
              </div>
              <div>
                <h4 className="feature-title">Free Global Express</h4>
                <p className="feature-desc">Complimentary on orders $500+</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box feature-icon-cyan">
                <FaShieldAlt size={24} />
              </div>
              <div>
                <h4 className="feature-title">2-Year Comprehensive</h4>
                <p className="feature-desc">Full factory certified warranty</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box feature-icon-emerald">
                <FaUndo size={24} />
              </div>
              <div>
                <h4 className="feature-title">30-Day Money Back</h4>
                <p className="feature-desc">Hassle-free return policy</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box feature-icon-amber">
                <FaHeadphones size={24} />
              </div>
              <div>
                <h4 className="feature-title">24/7 Gear Specialists</h4>
                <p className="feature-desc">Assistance from live musicians</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Explore by <span className="text-gradient-rainbow">Category</span>
              </h2>
              <p className="section-subtitle">
                Handcrafted collections tuned for stage musicians, sound producers, and performers.
              </p>
            </div>
            <Link to="/category/all" className="section-view-all">
              View All Instruments <FaArrowRight size={14} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => {
              const IconComp = getCategoryIcon(cat.id);

              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className={`category-card glass-panel category-${cat.id}`}
                >
                  <div className={`category-icon-box category-icon-${cat.id}`}>
                    <IconComp size={28} />
                  </div>
                  <div>
                    <h3 className="category-card-name">
                      {cat.name}
                    </h3>
                    <span className={`category-card-count category-count-${cat.id}`}>
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
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Trending & <span className="text-gradient-cyan">Featured Gear</span>
              </h2>
              <p className="section-subtitle">
                The most revered gear across world stages, home studios, and music academies.
              </p>
            </div>
            <Link to="/category/all" className="section-view-all section-view-all-pink">
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

                      <div className="product-card-rating">
                        <div className="product-card-star">
                          <FaStar size={14} /> {product.rating}
                        </div>
                        <span className="product-card-reviews">
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
