import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { formatAddress } from '../utils/format';
import WalletModal from './WalletModal';
import '../styles/navbar.css';

const Navbar = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { address, isConnected } = useWallet();
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="logo">
            <span>CeloModuleX</span>
          </Link>
          
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/nft" 
              className={`nav-link ${location.pathname === '/nft' ? 'active' : ''}`}
            >
              Access Pass
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Profile
            </Link>
            
            <button 
              onClick={() => setIsWalletModalOpen(true)}
              className={`wallet-btn ${isConnected ? 'wallet-connected' : ''}`}
            >
              {isConnected ? (
                <>
                  <span>●</span>
                  {formatAddress(address)}
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        </div>
      </nav>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
