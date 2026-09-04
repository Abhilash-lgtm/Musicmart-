import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaLock, FaEnvelope, FaUser, FaPhone, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
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
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
          <h2 className="auth-title">
            Create an Account
          </h2>
          <p className="auth-subtitle">
            Join thousands of musicians and access premium gear today.
          </p>
        </div>

        {error && (
          <div className="auth-error-alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Alex Johnson"
            icon={FaUser}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="form-grid-2col">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="alex@example.com"
              icon={FaEnvelope}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              icon={FaPhone}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid-2col">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              icon={FaLock}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              icon={FaLock}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Role</label>
            <div className="role-selector-grid">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                className={`role-btn ${formData.role === 'customer' ? 'role-btn-customer-active' : ''}`}
              >
                <FaUser size={14} /> Customer
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'admin' })}
                className={`role-btn ${formData.role === 'admin' ? 'role-btn-admin-active' : ''}`}
              >
                <FaShieldAlt size={14} /> Store Admin
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="auth-submit-btn"
            icon={FaArrowRight}
          >
            Create Account
          </Button>
        </form>

        <div className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
