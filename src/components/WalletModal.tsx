import React from 'react';
import { useWallet } from '../contexts/WalletContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<Props> = ({ open, onClose }) => {
  const { connectMetaMask, connectWalletConnect, connecting } = useWallet();

  if (!open) return null;

  const handleConnect = async (method: 'metamask' | 'walletconnect') => {
    if (method === 'metamask') {
      await connectMetaMask();
    } else {
      await connectWalletConnect();
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0 }}>Connect Wallet</h3>
            <p style={{ margin: '6px 0 0', color: '#333' }}>Choose a wallet to connect to Celo Mainnet.</p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' }} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-actions">
          <button className="primary-btn" onClick={() => handleConnect('metamask')} disabled={connecting}>
            {connecting ? 'Connecting...' : 'MetaMask'}
          </button>
          <button className="primary-btn" onClick={() => handleConnect('walletconnect')} disabled={connecting}>
            {connecting ? 'Opening WalletConnect...' : 'WalletConnect v2'}
          </button>
        </div>
        <small style={{ color: '#5b5b5b' }}>
          Please ensure your wallet is set to Celo Mainnet (chainId 42220). No account keys are stored.
        </small>
      </div>
    </div>
  );
};

export default WalletModal;
