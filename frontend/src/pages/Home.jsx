import React from 'react';
import '../styles/home.css';
import { useWallet } from '../hooks/useWallet.js';

const Home = ({ onGetStarted }) => {
  const { address, isConnected } = useWallet();

  const username = isConnected ? `Builder ${address?.slice(2, 6)}` : 'Guest Explorer';
  const totalActions = 12;
  const hasPremium = isConnected;

  return (
    <div className="grid hero">
      <div className="card">
        <h1>Modular access to Celo primitives</h1>
        <p className="muted">
          Connect your wallet to orchestrate NFT access, manage profiles, and experiment with on-chain modules in a single
          lightweight dashboard that ships directly to GitHub Pages.
        </p>
        <button className="primary-btn" onClick={onGetStarted} type="button">
          Start Using Modules
        </button>
      </div>
      <div className="grid" style={{ gap: '0.75rem' }}>
        <div className="metric">
          <span>Username</span>
          <strong>{username}</strong>
        </div>
        <div className="metric">
          <span>Total Actions</span>
          <strong>{totalActions}</strong>
        </div>
        <div className="metric">
          <span>NFT Premium Status</span>
          <strong>{hasPremium ? 'Premium Holder' : 'Not minted yet'}</strong>
        </div>
      </div>
    </div>
  );
};

export default Home;
