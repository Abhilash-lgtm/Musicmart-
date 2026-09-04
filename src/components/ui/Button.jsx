import React from 'react';

// Simple Reusable Button
export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  type = 'button',
  icon: Icon,
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
    >
      {isLoading ? (
        <span className="spinner btn-spinner" />
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
