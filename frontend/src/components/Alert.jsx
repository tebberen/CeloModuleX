import React from 'react';

const Alert = ({ message }) => (
  <div className="card" style={{ borderColor: '#fbbf24', background: '#fffbeb', marginBottom: '1rem' }}>
    <div className="meta-row">
      <strong>Notification</strong>
      <span className="muted small">{new Date().toLocaleTimeString()}</span>
    </div>
    <div>{message}</div>
  </div>
);

export default Alert;
