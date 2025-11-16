import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { shortenAddress } from '../utils/format';

const Navbar = () => {
  const { account, openModal, disconnect, connectionType, connecting } = useWallet();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">CeloModuleX</Link>
      </div>
      <nav className="navbar-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/nft" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          NFT
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Profile
        </NavLink>
      </nav>
      <div className="navbar-right">
        {account ? (
          <div className="wallet-chip">
            <span className="wallet-status">{connectionType === 'walletconnect' ? 'WC' : 'MM'}</span>
            <span className="wallet-address">{shortenAddress(account)}</span>
            <button className="disconnect" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="primary" onClick={openModal} disabled={connecting}>
            {connecting ? 'Connecting…' : 'Connect'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
