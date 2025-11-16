import React from 'react';

const Loader = ({ label = 'Loading...' }) => (
  <div className="loader">
    <div className="spinner" />
    <span>{label}</span>
  </div>
);

export default Loader;
