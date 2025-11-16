import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useWallet } from '../hooks/useWallet.js';
import '../styles/navbar.css';

const Navbar = ({ onConnectClick }) => {
  const { address, disconnect } = useWallet();

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="CeloModuleX" className="navbar__logo" />
        <span className="navbar__title">CeloModuleX</span>
      </div>
      <div className="navbar__links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/nft" className={({ isActive }) => (isActive ? 'active' : '')}>
          NFT
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          Profile
        </NavLink>
      </div>
      <div className="navbar__actions">
        {address ? (
          <button className="secondary" onClick={disconnect}>
            Disconnect
          </button>
        ) : (
          <button className="primary" onClick={onConnectClick}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
