import React from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletModal = ({ onClose }) => {
  const { connect, connecting, error } = useWallet();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Choose a wallet provider</h3>
          <button className="icon-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <p className="muted">Connect with your preferred wallet to access premium modules.</p>
        <div className="wallet-options">
          <button className="wallet-card" onClick={() => connect('metamask')} disabled={connecting}>
            <div>
              <div className="wallet-title">MetaMask</div>
              <div className="wallet-subtitle">Browser wallet</div>
            </div>
            <span className="wallet-badge">Direct</span>
          </button>
          <button className="wallet-card" onClick={() => connect('walletconnect')} disabled={connecting}>
            <div>
              <div className="wallet-title">WalletConnect</div>
              <div className="wallet-subtitle">Scan QR with mobile wallet</div>
            </div>
            <span className="wallet-badge">v2</span>
          </button>
        </div>
        {connecting && <div className="loading">Connecting...</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default WalletModal;
