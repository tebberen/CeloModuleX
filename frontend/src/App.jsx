import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Nft from './pages/Nft';
import Profile from './pages/Profile';
import WalletModal from './components/WalletModal';
import { useWallet } from './hooks/useWallet';

const App = () => {
  const { isModalOpen, closeModal } = useWallet();

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {isModalOpen && <WalletModal onClose={closeModal} />}
    </div>
  );
};

export default App;
