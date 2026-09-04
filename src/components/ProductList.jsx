import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import productService from '../services/productService';
import Button from './Button';
import StatusBadge from './StatusBadge';
import Modal from './Modal';

export const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Delete target modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        category: categoryFilter,
        search,
      });
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, search]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await productService.deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>Inventory Catalog</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Manage instruments, stock quantities, pricing, and technical specifications.
          </p>
        </div>
        <Button
          variant="primary"
          icon={FaPlus}
          onClick={() => navigate('/admin/products/new')}
        >
          Add New Instrument
        </Button>
      </div>

      {/* Filters Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <FaSearch size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search catalog by title, brand, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto' }}
        >
          <option value="all">All Categories</option>
          <option value="guitars">Guitars & Basses</option>
          <option value="keyboards">Keyboards & Synths</option>
          <option value="drums">Drums & Percussion</option>
          <option value="audio">Studio & Microphones</option>
          <option value="wind">Wind Instruments</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th>Rating</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                  Loading inventory...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No instruments found matching your search.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                          {p.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ textTransform: 'capitalize', color: 'var(--text-muted)' }}>{p.category}</span>
                  </td>
                  <td style={{ fontWeight: 800 }}>${p.price?.toFixed(2)}</td>
                  <td>
                    <StatusBadge status={p.stock} type="stock" />
                  </td>
                  <td>⭐ {p.rating}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-icon-only"
                        title="View Live Page"
                        onClick={() => navigate(`/product/${p.id}`)}
                      >
                        <FaEye size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-icon-only"
                        title="Edit Instrument"
                        onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                      >
                        <FaEdit size={14} />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="btn-icon-only"
                        title="Delete Instrument"
                        onClick={() => setDeleteTarget(p)}
                      >
                        <FaTrash size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Instrument Deletion"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" isLoading={deleting} onClick={confirmDelete}>
              Delete From Catalog
            </Button>
          </>
        }
      >
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          Are you sure you want to permanently delete{' '}
          <strong style={{ color: 'var(--text-main)' }}>"{deleteTarget?.title}"</strong>? This will remove the instrument from the storefront and customer searches.
        </p>
      </Modal>
    </div>
  );
};

export default ProductList;
