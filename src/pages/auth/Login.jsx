import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaMusic, FaLock, FaEnvelope, FaArrowRight, FaArrowLeft, FaShieldAlt, FaUserCheck } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

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
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper auth-page-login">
      <div className="glass-panel animate-fade-in auth-card">
        {/* Back navigation */}
        <div className="auth-back-wrap">
          <button
            type="button"
            onClick={handleBack}
            className="back-btn"
            aria-label="Go back"
          >
            <FaArrowLeft size={14} /> Back
          </button>
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
          <h2 className="auth-title">
            Welcome Back
          </h2>
          <p className="auth-subtitle">
            Log in to manage your orders, wishlist, and instruments.
          </p>
        </div>

        {error && (
          <div className="auth-error-alert">
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

          <div className="auth-forgot-row">
            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="auth-submit-btn"
            icon={FaArrowRight}
          >
            Sign In
          </Button>
        </form>

        <div className="auth-footer-text">
          Don't have an account?{' '}
          <Link to="/register" className="auth-switch-link">
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
