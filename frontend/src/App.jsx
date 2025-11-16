import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import WalletModal from './components/WalletModal.jsx';
import Alert from './components/Alert.jsx';
import Home from './pages/Home.jsx';
import Nft from './pages/Nft.jsx';
import Profile from './pages/Profile.jsx';
import { useWallet } from './hooks/useWallet.js';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { error, clearError } = useWallet();

  return (
    <div className="app-shell">
      <Navbar onConnectClick={() => setModalOpen(true)} />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <WalletModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {error && <Alert message={error} onDismiss={clearError} />}
    </div>
  );
}

export default App;
