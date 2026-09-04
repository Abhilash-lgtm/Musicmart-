import React from 'react';

// Simple Reusable Input & Textarea
export const Input = ({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  error,
  icon: Icon,
  disabled = false,
  required = false,
  className = '',
  as = 'input',
  rows = 3,
  ...props
}) => {
  const iconClass = Icon ? 'input-with-icon' : '';
  const iconBoxClass = as === 'textarea' ? 'input-icon-box-textarea' : 'input-icon-box';

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label} {required && <span className="form-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && (
          <div className={iconBoxClass}>
            <Icon size={16} />
          </div>
        )}

        {as === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`form-textarea ${iconClass}`}
            {...props}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`form-input ${iconClass}`}
            {...props}
          />
        )}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default Input;
