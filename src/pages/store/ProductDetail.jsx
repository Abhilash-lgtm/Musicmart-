import { useState, useEffect, useContext } from 'react';
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
  FaYoutube,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import productService from '../../services/productService';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { getYoutubeEmbedUrl, getYoutubeWatchUrl } from '../../utils/youtube';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/common/StatusBadge';

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
      <div className="container detail-notfound">
        <h2>Instrument Not Found</h2>
        <p className="detail-notfound-desc">
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
  const embedUrl = getYoutubeEmbedUrl(product.youtubeUrl, product.category);
  const watchUrl = getYoutubeWatchUrl(product.youtubeUrl, product.category);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container detail-container">
      {/* Back button */}
      <div className="detail-back-wrap">
        <button onClick={() => navigate(-1)} className="back-btn">
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
            <div className="detail-thumbs-row">
              {images.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setActiveImage(idx)}
                  className={`detail-thumb ${activeImage === idx ? 'detail-thumb-active' : ''}`}
                />
              ))}
            </div>
          )}

          {/* Audio Tone & Video Preview */}
          <div className="glass-panel audio-preview-panel">
            <div className="audio-preview-info">
              <div
                className={`audio-preview-icon ${isPlayingAudio ? 'audio-preview-icon-playing' : ''}`}
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              >
                <FaVolumeUp size={18} />
              </div>
              <div>
                <h4 className="audio-preview-title">Audio & Video Tone Preview</h4>
                <p className="audio-preview-desc">
                  {isPlayingAudio ? 'Playing Studio Tone...' : 'Hear sound sample & watch video demo'}
                </p>
              </div>
            </div>

            <div className="audio-preview-actions-group">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              >
                {isPlayingAudio ? 'Stop' : 'Play Sound'}
              </Button>
              <a href="#instrument-video" className="btn-video-quick-link">
                <Button variant="secondary" size="sm" icon={FaYoutube}>
                  Watch Demo
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Details & Purchase Actions */}
        <div>
          <div className="detail-header-meta">
            <span className="detail-brand">
              {product.brand}
            </span>
            <StatusBadge status={product.stock} type="stock" />
          </div>

          <h1 className="detail-title">
            {product.title}
          </h1>

          <div className="detail-meta-row">
            <div className="detail-rating">
              <FaStar size={16} /> {product.rating}
            </div>
            <span className="detail-reviews-count">
              {product.reviewsCount} Customer Reviews
            </span>
            <span className="detail-meta-sep">|</span>
            <span className="detail-sku">
              SKU: MM-{product.id}-CERT
            </span>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="detail-old-price">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="detail-discount-badge">
                Save {product.discount}%
              </span>
            )}
          </div>

          <p className="detail-description">
            {product.description}
          </p>

          {/* Add to Cart Stepper & Button */}
          <div className="detail-actions-row">
            <div className="stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <FaMinus size={12} />
              </button>
              <span className="stepper-val">{quantity}</span>
              <button
                type="button"
                className="stepper-btn"
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
              className="btn-flex"
            >
              {added ? 'Added to Cart!' : 'Add to Shopping Bag'}
            </Button>

            <button
              type="button"
              className={`nav-icon-btn wishlist-btn-large ${inWishlist ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              title="Save to Wishlist"
            >
              <FaHeart size={20} />
            </button>
          </div>

          {/* Assurance Badges */}
          <div className="assurance-grid">
            <div className="assurance-item">
              <FaTruck size={18} className="assurance-icon-cyan" />
              <div>
                <div className="assurance-title">Insured Shipping</div>
                <div className="assurance-desc">Dispatched in 24h</div>
              </div>
            </div>

            <div className="assurance-item">
              <FaShieldAlt size={18} className="assurance-icon-emerald" />
              <div>
                <div className="assurance-title">2-Year Warranty</div>
                <div className="assurance-desc">100% Authorized</div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h3 className="specs-heading">
                Technical Specifications
              </h3>
              <table className="product-specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td className="specs-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Instrument YouTube Video Showcase Section */}
      <div id="instrument-video" className="glass-panel video-showcase-panel">
        <div className="video-showcase-header">
          <div className="video-header-left">
            <div className="video-header-icon-wrap">
              <FaYoutube size={26} className="video-youtube-icon" />
            </div>
            <div>
              <div className="video-header-badge-row">
                <span className="video-badge">4K / HD Sound Demo</span>
                <span className="video-category-tag">{product.category?.toUpperCase()} SHOWCASE</span>
              </div>
              <h2 className="video-showcase-title">
                {product.title} - Performance & Sound Showcase
              </h2>
            </div>
          </div>

          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-external-link"
          >
            <Button variant="outline" size="sm" icon={FaExternalLinkAlt}>
              Open in YouTube
            </Button>
          </a>
        </div>

        <div className="video-player-container">
          <iframe
            src={embedUrl}
            title={`${product.title} Sound Demo & Review`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-iframe"
          />
        </div>

        <div className="video-showcase-footer">
          <p className="video-footer-desc">
            🎸 <strong>Official Sound Demonstration:</strong> Watch and listen to professional musicians demonstrate the authentic tone, dynamic responsiveness, build specifications, and performance qualities of the <strong>{product.title}</strong> by {product.brand}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
