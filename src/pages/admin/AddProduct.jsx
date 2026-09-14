import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaYoutube } from 'react-icons/fa';
import productService from '../../services/productService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

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
    youtubeUrl: '',
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
    <div className="admin-form-container">
      <div className="detail-back-wrap">
        <button onClick={() => navigate('/admin/products')} className="back-btn">
          <FaArrowLeft size={14} /> Back to Products
        </button>
      </div>

      <div className="glass-panel admin-form-panel">
        <h1 className="admin-form-title">
          Add New Instrument
        </h1>
        <p className="admin-form-desc">
          Create a new catalog item with brand, pricing, media, and technical specs.
        </p>

        {error && (
          <div className="auth-error-alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2fr-1fr">
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

          <div className="form-grid-3col">
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
              label="Retail Price (₹)"
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
            label="YouTube Video Demo URL / Video ID (Optional)"
            type="text"
            name="youtubeUrl"
            placeholder="e.g. https://www.youtube.com/watch?v=... or 11-character Video ID"
            value={formData.youtubeUrl}
            onChange={handleChange}
            icon={FaYoutube}
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
          <div className="specs-manager-wrap">
            <div className="specs-manager-header">
              <h3 className="specs-manager-title">
                Technical Specifications
              </h3>
              <Button type="button" variant="outline" size="sm" icon={FaPlus} onClick={handleAddSpec}>
                Add Spec Field
              </Button>
            </div>

            <div className="specs-manager-list">
              {specList.map((spec, idx) => (
                <div key={idx} className="spec-input-row">
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Fretboard)"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    className="form-input spec-key-input"
                  />
                  <input
                    type="text"
                    placeholder="Spec Value (e.g. Indian Rosewood)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    className="form-input spec-val-input"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="spec-remove-btn"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-form-actions">
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
