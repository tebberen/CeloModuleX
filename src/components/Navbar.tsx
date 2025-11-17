import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import WalletModal from './WalletModal';

const Navbar: React.FC = () => {
  const { address, isConnected, disconnect } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <img src="https://tebberen.github.io/CeloModuleX/favicon.svg" alt="CeloModuleX" width={28} height={28} />
          <span>CeloModuleX</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/nft">NFT</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          {isConnected ? (
            <button className="wallet-chip" onClick={disconnect} title="Disconnect">
              {shortAddress}
            </button>
          ) : (
            <button className="wallet-chip" onClick={() => setModalOpen(true)}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
