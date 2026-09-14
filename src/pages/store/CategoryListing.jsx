import React, { useState, useEffect, useContext } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaSlidersH,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaCheck,
  FaUndo,
} from 'react-icons/fa';
import productService from '../../services/productService';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import Button from '../../components/ui/Button';

export const CategoryListing = () => {
  const { id: categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const activeCategory = categoryParam || 'all';
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(5000);

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await productService.getCategories();
      setCategories(cats);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchParams.get('search') || searchQuery;
        const result = await productService.getProducts({
          category: activeCategory,
          search: query,
          maxPrice,
          sortBy,
        });
        setProducts(result);
      } catch (e) {
        console.error('Failed to fetch filtered products', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, searchParams, maxPrice, sortBy]);

  const handleCategoryChange = (catId) => {
    navigate(`/category/${catId}${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSearchParams({});
    setMaxPrice(5000);
    setSortBy('featured');
    navigate('/category/all');
  };

  return (
    <div className="container category-page-container">
      {/* Category Pills Header */}
      <div className="category-header-wrap">
        <h1 className="category-main-title">
          Music Store <span className="text-gradient">Catalog</span>
        </h1>
        <div className="category-pills-row">
          <button
            type="button"
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Instruments
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="glass-panel category-control-bar">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="category-search-form">
          <div className="category-search-box">
            <FaSearch size={16} className="category-search-icon" />
            <input
              type="text"
              placeholder="Search by title, brand, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input category-search-input"
            />
          </div>
          <Button type="submit" variant="secondary" size="md">
            Search
          </Button>
        </form>

        {/* Sort & Price Range */}
        <div className="category-filters-wrap">
          <div className="price-slider-group">
            <span className="price-slider-label">Max Price:</span>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider-input"
            />
            <span className="price-slider-value">₹{maxPrice}</span>
          </div>

          <div className="sort-select-group">
            <FaSlidersH size={14} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select sort-select"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {(searchQuery || maxPrice < 5000 || activeCategory !== 'all') && (
            <Button variant="outline" size="sm" icon={FaUndo} onClick={resetFilters}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count-bar">
        <p className="results-count-text">
          Showing <span className="results-count-number">{products.length}</span> instruments
        </p>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="loading-spinner-container">
          <div className="spinner" />
          <p>Filtering catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-instruments-found">
          <div className="empty-icon">🎸</div>
          <h3 className="empty-title">No Instruments Found</h3>
          <p className="empty-desc">
            We couldn't find any instruments matching your active search and filter criteria.
          </p>
          <button type="button" className="btn-reset-filters" onClick={resetFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const isJustAdded = addedItem === product.id;

            return (
              <div
                key={product.id}
                className="product-card product-card-clickable"
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
                      <span className="product-price">₹{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="product-old-price">₹{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <Button
                      variant={isJustAdded ? 'secondary' : 'primary'}
                      size="sm"
                      icon={isJustAdded ? FaCheck : FaShoppingCart}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      {isJustAdded ? 'Added' : 'Add'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryListing;
