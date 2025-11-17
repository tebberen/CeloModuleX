import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Navbar = ({ openWallet }) => {
  const { address, disconnect } = useWallet();
  const location = useLocation();

  const shorten = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <nav className="navbar">
      <div className="nav-brand">CeloModuleX</div>
      <div className="nav-links">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">
          Home
        </Link>
        <Link className={location.pathname === '/nft' ? 'active' : ''} to="/nft">
          NFT
        </Link>
        <Link className={location.pathname === '/profile' ? 'active' : ''} to="/profile">
          Profile
        </Link>
      </div>
      <div className="nav-actions">
        {address ? (
          <div className="connected-pill">
            <span>{shorten(address)}</span>
            <button className="secondary" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="primary" onClick={openWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
