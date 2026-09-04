import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaMusic, FaLock, FaEnvelope, FaArrowRight, FaShieldAlt, FaUserCheck } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Input from './Input';
import Button from './Button';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setError('');
    setLoading(true);
    try {
      if (role === 'admin') {
        await login('admin@musicmart.com', 'adminpassword123');
        navigate('/admin');
      } else {
        await login('alex@example.com', 'password123');
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Demo login failed.');
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
        background: 'radial-gradient(circle at top, rgba(225, 29, 72, 0.08) 0%, var(--bg-primary) 70%)',
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
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
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Log in to manage your orders, wishlist, and instruments.
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textAlign: 'center', textTransform: 'uppercase' }}>
            Quick Demo 1-Click Login
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Button
              variant="outline"
              size="sm"
              icon={FaShieldAlt}
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
            >
              Demo Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={FaUserCheck}
              onClick={() => handleDemoLogin('customer')}
              disabled={loading}
            >
              Demo Customer
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>OR WITH EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
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
            label="Email Address"
            type="email"
            name="email"
            placeholder="name@example.com"
            icon={FaEnvelope}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            icon={FaLock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <Link
              to="/forgot-password"
              style={{ fontSize: '0.825rem', color: 'var(--accent-pink)', fontWeight: 600 }}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            style={{ width: '100%' }}
            icon={FaArrowRight}
          >
            Sign In
          </Button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-pink)', fontWeight: 700 }}>
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
