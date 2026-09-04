import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaEnvelope, FaArrowLeft, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import authService from '../services/authService';
import Input from './Input';
import Button from './Button';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await authService.forgotPassword(email);
      setSuccessMessage(res.message);
    } catch (err) {
      setError(err.message || 'Unable to process reset request.');
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
        background: 'radial-gradient(circle at top, rgba(124, 58, 237, 0.08) 0%, var(--bg-primary) 70%)',
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
            Reset Your Password
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Enter your registered email address and we'll dispatch password recovery instructions.
          </p>
        </div>

        {successMessage ? (
          <div
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(5, 150, 105, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.25)',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <FaCheckCircle size={36} style={{ color: 'var(--accent-emerald)', margin: '0 auto 0.75rem' }} />
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>Instructions Dispatched</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{successMessage}</p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/login">
                <Button variant="primary" size="md" style={{ width: '100%' }}>
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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

            <Input
              label="Account Email Address"
              type="email"
              name="email"
              placeholder="name@example.com"
              icon={FaEnvelope}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              style={{ width: '100%', marginTop: '0.5rem' }}
              icon={FaPaperPlane}
            >
              Send Reset Link
            </Button>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                <FaArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
