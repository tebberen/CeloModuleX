import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NFT from './pages/NFT';
import Profile from './pages/Profile';
import WalletModal from './components/WalletModal';
import { useWallet } from './context/WalletContext';
import Alert from './components/Alert';

const App = () => {
  const { showModal, setShowModal, alert, setAlert } = useWallet();

  return (
    <div className="app-shell">
      <Navbar openWallet={() => setShowModal(true)} />
      <main className="main-content">
        {alert.message && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {showModal && <WalletModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
