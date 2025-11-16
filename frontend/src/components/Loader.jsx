import React from 'react';

const Loader = ({ size = 32 }) => (
  <div className="loader" style={{ width: size, height: size }} aria-label="loading" />
);

export default Loader;
