import React from 'react';

const Loader = ({ text = 'Loading...' }) => (
  <div className="loader">
    <div className="spinner" />
    <span>{text}</span>
  </div>
);

export default Loader;
