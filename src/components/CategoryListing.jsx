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
import productService from '../services/productService';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import Button from './Button';

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
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Category Pills Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Music Store <span className="text-gradient">Catalog</span>
        </h1>
        <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
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
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <FaSearch size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search by title, brand, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
          <Button type="submit" variant="secondary" size="md">
            Search
          </Button>
        </form>

        {/* Sort & Price Range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Max Price:</span>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--accent-pink)', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>${maxPrice}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaSlidersH size={14} style={{ color: 'var(--text-dim)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ padding: '0.45rem 1rem', width: 'auto', fontSize: '0.85rem' }}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>{products.length}</span> instruments
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
          <h3 style={{ fontWeight: 800 }}>No Instruments Found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 800 }}>
                      <FaStar size={14} /> {product.rating}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
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
