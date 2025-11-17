import React from 'react';
import { useWallet } from '../context/WalletContext';

const WalletModal = ({ onClose }) => {
  const { connectMetaMask, connectWalletConnect } = useWallet();

  const handleMetaMask = () => {
    connectMetaMask();
  };

  const handleWalletConnect = () => {
    connectWalletConnect();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Connect Wallet</h3>
          <button className="icon-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <button className="wallet-option" onClick={handleMetaMask}>
            <span role="img" aria-label="fox">
              🦊
            </span>
            <div>
              <div className="option-title">MetaMask</div>
              <div className="option-sub">Connect using browser wallet</div>
            </div>
          </button>
          <button className="wallet-option" onClick={handleWalletConnect}>
            <span role="img" aria-label="link">
              🔗
            </span>
            <div>
              <div className="option-title">WalletConnect</div>
              <div className="option-sub">Scan QR with your mobile wallet</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
