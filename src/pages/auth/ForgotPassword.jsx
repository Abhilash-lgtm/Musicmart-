import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaEnvelope, FaArrowLeft, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import authService from '../../services/authService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

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
    <div className="auth-page-wrapper auth-page-forgot">
      <div className="glass-panel animate-fade-in auth-card">
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
            Reset Your Password
          </h2>
          <p className="auth-subtitle">
            Enter your registered email address and we'll dispatch password recovery instructions.
          </p>
        </div>

        {successMessage ? (
          <div className="forgot-success-card">
            <FaCheckCircle size={36} className="forgot-success-icon" />
            <h4 className="forgot-success-title">Instructions Dispatched</h4>
            <p className="forgot-success-desc">{successMessage}</p>
            <div className="auth-forgot-row">
              <Link to="/login" className="btn-full-width">
                <Button variant="primary" size="md" className="btn-full-width">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error-alert">
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
              className="auth-submit-btn"
              icon={FaPaperPlane}
            >
              Send Reset Link
            </Button>

            <div className="auth-back-link-wrap">
              <Link to="/login" className="auth-back-link">
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
