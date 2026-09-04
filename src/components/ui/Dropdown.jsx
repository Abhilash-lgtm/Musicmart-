import React, { useState, useRef, useEffect } from 'react';

// Simple Dropdown with Click-Outside Closing
export const Dropdown = ({
  trigger,
  children,
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const alignClass = align === 'left' ? 'dropdown-menu-left' : 'dropdown-menu-right';

  return (
    <div ref={dropdownRef} className={`dropdown-container ${className}`}>
      <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`dropdown-menu animate-fade-in ${alignClass}`}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, onClick, icon: Icon, danger = false, className = '' }) => {
  const dangerClass = danger ? 'dropdown-item-danger' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`dropdown-item ${dangerClass} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Dropdown;
