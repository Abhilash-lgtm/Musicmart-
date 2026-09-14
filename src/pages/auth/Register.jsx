import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaLock, FaEnvelope, FaUser, FaPhone, FaArrowRight, FaArrowLeft, FaCamera, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow digits, +, spaces, and hyphens
      const filtered = value.replace(/[^\d+\s-]/g, '');
      setFormData({ ...formData, [name]: filtered });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Phone number validation
    const phoneDigits = (formData.phone || '').replace(/\D/g, '');
    if (!formData.phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (phoneDigits.length < 10) {
      setError('Phone number must be at least 10 digits.');
      return;
    }
    if (phoneDigits.length > 15) {
      setError('Phone number cannot exceed 15 digits.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const newUser = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
        password: formData.password,
        role: formData.role,
      });

      if (newUser?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper auth-page-register">
      <div className="glass-panel animate-fade-in auth-card auth-card-wide">

        {/* Back navigation */}
        <div className="auth-back-wrap">
          <button type="button"onClick={handleBack}className="back-btn"aria-label="Go back"><FaArrowLeft size={14} /> Back </button>
        </div>

        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-brand-link">
            <div className="brand-icon-wrapper">
              <FaMusic size={20} />
            </div>
            <span className="auth-brand-text">
              Music<span className="brand-pink">Mart</span>
            </span>
          </Link>
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-subtitle"> Join thousands of musicians and access premium gear today.</p>
        </div>

        {error && (
          <div className="auth-error-alert">
            {error}
          </div>
        )}

        {/* Reqister details */}

        <form onSubmit={handleSubmit}>
          <Input label="Full Name"name="name"placeholder="Full Name"icon={FaUser}value={formData.name}onChange={handleChange}required/>

          <div className="form-grid-2col">
            <Input label="Email Address"type="email"name="email"placeholder="user@example.com"icon={FaEnvelope}value={formData.email}onChange={handleChange}required/> 
            <Input label="Phone Number"type="tel"name="phone"placeholder="+91 (123-456-7890)"icon={FaPhone}value={formData.phone}onChange={handleChange}maxLength={16}required/>
          </div>

          <div className="form-grid-2col">
            <Input label="Password"type="password"name="password"placeholder="••••••••"icon={FaLock}value={formData.password}onChange={handleChange}required/>
            <Input label="Confirm Password"type="password"name="confirmPassword"placeholder="••••••••"icon={FaLock}value={formData.confirmPassword}onChange={handleChange}required/>
          </div>

          <div className="form-group">
            <label className="form-label">Profile Image (Optional)</label>
            <div className="register-avatar-row">
              <div className="register-avatar-preview">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Preview" className="register-avatar-thumb" />
                ) : (
                  <div className="register-avatar-thumb register-avatar-placeholder">
                    <FaUser size={16} />
                  </div>
                )}
              </div>
              <div className="register-avatar-actions">
                <label className="btn btn-outline btn-sm register-upload-btn">
                  <FaCamera size={13} /> Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {formData.avatar && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, avatar: '' }))}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTrash size={11} /> Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Account Role</label>
            <div className="role-selector-single">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                className={`role-btn ${formData.role === 'customer' ? 'role-btn-customer-active' : ''}`}
              >
                <FaUser size={14} /> Customer Account
              </button>
            </div>
          </div>
          <Button type="submit"variant="primary"size="lg"isLoading={loading}className="auth-submit-btn"icon={FaArrowRight}>Create Account</Button>
        </form>

        <div className="auth-footer-text">Already have an account?{' '}<Link to="/login" className="auth-switch-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
