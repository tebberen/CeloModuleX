import React from 'react';

const Alert = ({ type = 'info', message }) => {
  if (!message) return null;
  return <div className={`alert ${type}`}>{message}</div>;
};

export default Alert;
