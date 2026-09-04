import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaLock, FaEnvelope, FaUser, FaPhone, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Input from './Input';
import Button from './Button';

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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'radial-gradient(circle at top, rgba(2, 132, 199, 0.08) 0%, var(--bg-primary) 70%)',
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div className="brand-icon-wrapper">
              <FaMusic size={20} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Music<span style={{ color: 'var(--accent-pink)' }}>Mart</span>
            </span>
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Create an Account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Join thousands of musicians and access premium gear today.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#dc2626',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
            }}
          >
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${formData.role === 'customer' ? 'var(--accent-pink)' : 'var(--border-color)'}`,
                  background: formData.role === 'customer' ? 'rgba(225, 29, 72, 0.08)' : '#ffffff',
                  color: formData.role === 'customer' ? 'var(--accent-pink)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <FaUser size={14} /> Customer
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'admin' })}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${formData.role === 'admin' ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                  background: formData.role === 'admin' ? 'rgba(2, 132, 199, 0.08)' : '#ffffff',
                  color: formData.role === 'admin' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
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
            style={{ width: '100%', marginTop: '0.5rem' }}
            icon={FaArrowRight}
          >
            Create Account
          </Button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-pink)', fontWeight: 700 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
