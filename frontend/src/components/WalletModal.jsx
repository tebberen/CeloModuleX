import React from 'react';
import { useWallet } from '../hooks/useWallet.js';

const WalletModal = ({ isOpen, onClose }) => {
  const { connectMetamask, connectWalletConnect, loading } = useWallet();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal__header">
          <h3>Connect Wallet</h3>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="modal__body">
          <p>Select a wallet to continue.</p>
          <div className="modal__actions">
            <button className="primary" onClick={connectMetamask} disabled={loading}>
              {loading ? 'Connecting...' : 'MetaMask'}
            </button>
            <button className="secondary" onClick={connectWalletConnect} disabled={loading}>
              {loading ? 'Connecting...' : 'WalletConnect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
