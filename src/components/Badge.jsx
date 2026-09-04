import React from 'react';

// Simple Status Badge Pill
export const Badge = ({
  children,
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
  icon: Icon,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};

export default Badge;
