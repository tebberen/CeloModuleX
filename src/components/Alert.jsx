import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => (
  <div className={`alert ${type}`}>
    <span>{message}</span>
    <button className="icon-button" onClick={onClose}>
      ✕
    </button>
  </div>
);

export default Alert;
