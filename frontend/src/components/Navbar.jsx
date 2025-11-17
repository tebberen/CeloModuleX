import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../../assets/logo.svg';
import { useWallet } from '../hooks/useWallet.js';
import { shortenAddress } from '../utils/format.js';

const Navbar = ({ onConnectClick }) => {
  const { isConnected, address } = useWallet();

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logo} alt="CeloModuleX" />
        <span>CeloModuleX</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          Home
        </NavLink>
        <NavLink to="/nft" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          NFT
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Profile
        </NavLink>
        {isConnected ? (
          <button className="wallet-btn" onClick={onConnectClick} type="button">
            <span className="wallet-indicator" />
            {shortenAddress(address)}
          </button>
        ) : (
          <button className="connect-btn" onClick={onConnectClick} type="button">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
