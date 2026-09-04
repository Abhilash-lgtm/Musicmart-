import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import productService from '../../services/productService';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/ui/Modal';

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
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory Catalog</h1>
          <p className="admin-page-desc">
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
      <div className="glass-panel admin-filter-bar">
        <div className="admin-search-wrap">
          <FaSearch size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search catalog by title, brand, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input admin-search-input"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="form-select select-auto-width"
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
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="table-empty-cell">
                  <div className="spinner spinner-center" />
                  Loading inventory...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty-cell">
                  No instruments found matching your search.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-product-cell">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="table-product-thumb"
                      />
                      <div>
                        <div className="table-product-title">{p.title}</div>
                        <div className="table-product-brand">
                          {p.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-category-tag">{p.category}</span>
                  </td>
                  <td className="table-price-val">${p.price?.toFixed(2)}</td>
                  <td>
                    <StatusBadge status={p.stock} type="stock" />
                  </td>
                  <td>⭐ {p.rating}</td>
                  <td className="text-right">
                    <div className="table-actions-group">
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
        <p className="modal-delete-desc">
          Are you sure you want to permanently delete{' '}
          <strong className="modal-delete-target">"{deleteTarget?.title}"</strong>? This will remove the instrument from the storefront and customer searches.
        </p>
      </Modal>
    </div>
  );
};

export default ProductList;
