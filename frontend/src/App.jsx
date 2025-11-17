import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Nft from './pages/Nft';
import Profile from './pages/Profile';
import './styles/global.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div style={{ minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft" element={<Nft />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
