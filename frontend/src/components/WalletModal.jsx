import React from 'react';
import { useWallet } from '../hooks/useWallet.js';
import '../styles/global.css';

const WalletModal = ({ open, onClose }) => {
  const { connectMetaMask, connectWalletConnect, disconnect, isConnected, address } = useWallet();

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 200,
        padding: '1rem',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="card" style={{ maxWidth: 420, width: '100%' }}>
        <div className="meta-row" style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Wallet</h3>
          <button onClick={onClose} className="primary-btn" type="button">Close</button>
        </div>
        {isConnected && (
          <div className="badge success" style={{ marginBottom: '0.75rem' }}>
            Connected as {address}
          </div>
        )}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          <button className="primary-btn" onClick={connectMetaMask} type="button">
            MetaMask
          </button>
          <button className="primary-btn" onClick={connectWalletConnect} type="button">
            WalletConnect
          </button>
          {isConnected && (
            <button
              className="primary-btn"
              style={{ background: '#e11d48' }}
              onClick={disconnect}
              type="button"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
