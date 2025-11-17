import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import WalletModal from './components/WalletModal.jsx';
import Home from './pages/Home.jsx';
import Nft from './pages/Nft.jsx';
import Profile from './pages/Profile.jsx';
import Alert from './components/Alert.jsx';
import Loader from './components/Loader.jsx';
import { useWallet } from './hooks/useWallet.js';

const App = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { isLoading, message } = useWallet();

  return (
    <div className="app-shell">
      <Navbar onConnectClick={() => setShowWalletModal(true)} />
      <div className="content-area">
        {isLoading && <Loader label="Preparing wallet..." />}
        {message && <Alert message={message} />}
        <Routes>
          <Route path="/" element={<Home onGetStarted={() => setShowWalletModal(true)} />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <WalletModal open={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </div>
  );
};

export default App;
