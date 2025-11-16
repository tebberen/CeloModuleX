import React from 'react';

const Alert = ({ message, onDismiss }) => (
  <div className="alert">
    <span>{message}</span>
    {onDismiss && (
      <button className="icon-btn" aria-label="Dismiss" onClick={onDismiss}>
        ×
      </button>
    )}
  </div>
);

export default Alert;
