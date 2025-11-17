import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useAccessPass } from '../hooks/useAccessPass';
import { getUserProfile } from '../services/blockchain';
import { formatAddress } from '../utils/format';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import '../styles/home.css';
import '../styles/global.css';

const Home = () => {
  const { address, isConnected } = useWallet();
  const { userHasNFT } = useAccessPass();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (isConnected && address) {
      loadUserProfile();
    }
  }, [isConnected, address]);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const profile = await getUserProfile(address);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
      setAlert({ type: 'error', message: 'Failed to load profile' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>CeloModuleX</h1>
          <p>Learn Web3 development through interactive modules on Celo</p>
          
          {!isConnected ? (
            <div>
              <p style={{ marginBottom: '20px', opacity: '0.8' }}>
                Connect your wallet to get started
              </p>
              <Link to="/nft" className="btn btn-primary">
                Get Access Pass
              </Link>
            </div>
          ) : (
            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
              <Alert 
                type={alert.type} 
                message={alert.message} 
                onClose={() => setAlert({ type: '', message: '' })} 
              />
              
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <h2 style={{ marginBottom: '20px' }}>Welcome!</h2>
                  
                  <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                    <p><strong>Wallet:</strong> {formatAddress(address)}</p>
                    {userProfile && (
                      <>
                        <p><strong>Username:</strong> {userProfile.username || 'Not set'}</p>
                        <p><strong>Total Actions:</strong> {userProfile.totalActions || '0'}</p>
                      </>
                    )}
                    <p>
                      <strong>NFT Premium:</strong> 
                      <span style={{ 
                        color: userHasNFT ? '#35d07f' : '#dc3545',
                        fontWeight: 'bold',
                        marginLeft: '8px'
                      }}>
                        {userHasNFT ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    {!userHasNFT && (
                      <Link to="/nft" className="btn btn-primary">
                        Get Access Pass
                      </Link>
                    )}
                    <Link to="/profile" className="btn btn-secondary">
                      {userProfile ? 'Update Profile' : 'Create Profile'}
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">10+</div>
              <div className="stat-label">Learning Modules</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">100%</div>
              <div className="stat-label">On-Chain</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">🌱</div>
              <div className="stat-label">Celo Powered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
