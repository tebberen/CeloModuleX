import { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useAccessPass } from '../hooks/useAccessPass';
import { formatPrice } from '../utils/format';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import '../styles/nft.css';
import '../styles/global.css';

const NftPage = () => {
  const { address, isConnected } = useWallet();
  const { nftPrice, userHasNFT, isLoading, mintAccessPass } = useAccessPass();
  const [isMinting, setIsMinting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleMint = async () => {
    if (!isConnected) {
      setAlert({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    setIsMinting(true);
    try {
      const success = await mintAccessPass();
      if (success) {
        setAlert({ type: 'success', message: 'Successfully minted Access Pass NFT!' });
      } else {
        setAlert({ type: 'error', message: 'Failed to mint NFT' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error minting NFT' });
    } finally {
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="nft-page">
        <div className="container">
          <div className="nft-content">
            <div className="nft-card">
              <h2>Access Pass NFT</h2>
              <p>Connect your wallet to mint an Access Pass and unlock all modules</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nft-page">
      <div className="container">
        <div className="nft-content">
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert({ type: '', message: '' })} 
          />

          <div className="nft-card">
            <div className="nft-image">
              🎓
            </div>
            
            <h2>CeloModuleX Access Pass</h2>
            <p>Unlock all learning modules and premium features</p>
            
            <div className="nft-price">
              {formatPrice(nftPrice)} CELO
            </div>

            <div className={`nft-status ${userHasNFT ? 'status-owned' : 'status-not-owned'}`}>
              {userHasNFT ? '✓ Access Pass Active' : '✗ No Access Pass'}
            </div>

            {!userHasNFT && (
              <div className="nft-actions">
                <button 
                  onClick={handleMint}
                  disabled={isMinting || isLoading}
                  className="btn btn-primary"
                >
                  {isMinting ? 'Minting...' : 'Mint Access Pass'}
                </button>
              </div>
            )}

            {(isLoading || isMinting) && <Loader />}

            <div style={{ marginTop: '24px', fontSize: '14px', color: '#666' }}>
              <p><strong>Benefits:</strong></p>
              <ul style={{ textAlign: 'left', marginTop: '8px' }}>
                <li>Access to all learning modules</li>
                <li>Premium features unlocked</li>
                <li>On-chain certification</li>
                <li>Community recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftPage;
