import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import productService from '../services/productService';
import Input from './Input';
import Button from './Button';

export const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: 'guitars',
    price: '',
    originalPrice: '',
    stock: '15',
    image: '',
    description: '',
  });

  const [specList, setSpecList] = useState([
    { key: 'Finish', value: 'Gloss Nitrocellulose' },
    { key: 'Body Material', value: 'Selected Alder' },
    { key: 'Electronics', value: 'Custom Shop Pickups' },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSpec = () => {
    setSpecList([...specList, { key: '', value: '' }]);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specList];
    updated[index][field] = value;
    setSpecList(updated);
  };

  const handleRemoveSpec = (index) => {
    setSpecList(specList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const specsMap = {};
      specList.forEach((s) => {
        if (s.key.trim()) {
          specsMap[s.key.trim()] = s.value.trim();
        }
      });

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock, 10),
        rating: 5.0,
        reviewsCount: 0,
        specs: specsMap,
        images: [formData.image],
      };

      await productService.createProduct(payload);
      navigate('/admin/products');
    } catch (err) {
      setError(err.message || 'Failed to create instrument');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/admin/products')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <FaArrowLeft size={14} /> Back to Products
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          Add New Instrument
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Create a new catalog item with brand, pricing, media, and technical specs.
        </p>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#dc2626',
              marginBottom: '1.5rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
            <Input
              label="Instrument Title"
              name="title"
              placeholder="e.g. Fender Custom Stratocaster '62"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              label="Brand / Manufacturer"
              name="brand"
              placeholder="e.g. Fender, Yamaha, Roland"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="guitars">Guitars & Basses</option>
                <option value="keyboards">Keyboards & Synths</option>
                <option value="drums">Drums & Percussion</option>
                <option value="audio">Studio & Microphones</option>
                <option value="wind">Wind Instruments</option>
              </select>
            </div>

            <Input
              label="Retail Price ($)"
              type="number"
              step="0.01"
              name="price"
              placeholder="1299.99"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <Input
              label="Stock Units"
              type="number"
              name="stock"
              placeholder="15"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Product Image URL"
            type="url"
            name="image"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={handleChange}
            required
          />

          <Input
            label="Full Description"
            name="description"
            as="textarea"
            rows={4}
            placeholder="Provide musician-focused features, tone characteristics, and inclusions..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Dynamic Technical Specifications */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Technical Specifications
              </h3>
              <Button type="button" variant="outline" size="sm" icon={FaPlus} onClick={handleAddSpec}>
                Add Spec Field
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {specList.map((spec, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Fretboard)"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                  <input
                    type="text"
                    placeholder="Spec Value (e.g. Indian Rosewood)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    className="form-input"
                    style={{ flex: 1.5 }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    style={{ color: '#ef4444', padding: '0.5rem' }}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              icon={FaSave}
            >
              Save Instrument to Catalog
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
