import React from 'react';

const Loader = ({ label = 'Loading...' }) => (
  <div style={{ marginBottom: '1rem' }}>
    <div
      style={{
        width: 36,
        height: 36,
        border: '4px solid #e2e8f0',
        borderTopColor: '#35d07f',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '0.5rem',
      }}
    />
    <div className="muted">{label}</div>
    <style>
      {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
    </style>
  </div>
);

export default Loader;
