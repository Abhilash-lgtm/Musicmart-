import React from 'react';

// Simple Reusable Table Wrapper
export const Table = ({ headers = [], children, className = '' }) => {
  return (
    <div className={`table-responsive ${className}`}>
      <table className="data-table">
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((h, idx) => (
                <th key={idx}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
