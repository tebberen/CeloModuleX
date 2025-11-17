import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Nft from './pages/Nft';
import Profile from './pages/Profile';
import { useWallet } from './contexts/WalletContext';

function App() {
  const { isCorrectNetwork, chainId } = useWallet();

  return (
    <div className="app-shell">
      <Navbar />
      {!isCorrectNetwork && (
        <div className="status-banner">
          Connected chain ID is {chainId ?? 'unknown'}. Please switch to Celo Mainnet (42220) for full functionality.
        </div>
      )}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
