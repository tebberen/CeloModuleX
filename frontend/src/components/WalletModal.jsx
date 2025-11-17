import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { formatAddress } from '../utils/format';
import Loader from './Loader';
import Alert from './Alert';
import '../styles/global.css';

const WalletModal = ({ isOpen, onClose }) => {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    connectMetaMask, 
    connectWalletConnect, 
    disconnect 
  } = useWallet();
  
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleMetaMaskConnect = async () => {
    const success = await connectMetaMask();
    if (success) {
      onClose();
    } else {
      setAlert({ type: 'error', message: 'Failed to connect to MetaMask' });
    }
  };

  const handleWalletConnect = async () => {
    const success = await connectWalletConnect();
    if (success) {
      onClose();
    } else {
      setAlert({ type: 'error', message: 'Failed to connect with WalletConnect' });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>
          {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </h2>

        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ type: '', message: '' })} 
        />

        {isConnected ? (
          <div>
            <p style={{ 
              background: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '8px',
              marginBottom: '20px',
              fontFamily: 'monospace'
            }}>
              {formatAddress(address)}
            </p>
            <button 
              onClick={handleDisconnect}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={handleMetaMaskConnect}
              disabled={isConnecting}
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {isConnecting ? <Loader /> : 'MetaMask'}
              <span>🦊</span>
            </button>
            
            <button 
              onClick={handleWalletConnect}
              className="btn btn-secondary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              WalletConnect
              <span>🔗</span>
            </button>
          </div>
        )}

        <button 
          onClick={onClose}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
