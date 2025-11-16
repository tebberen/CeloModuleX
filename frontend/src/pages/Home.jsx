import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet.js';
import { getUserProfile, getUserStats } from '../services/blockchain.js';
import { formatAddress, formatNumber, formatEther } from '../utils/format.js';
import Loader from '../components/Loader.jsx';
import '../styles/home.css';

const Home = () => {
  const { address, provider } = useWallet();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!address || !provider) return;
      setLoading(true);
      try {
        const [userProfile, globalStats] = await Promise.all([
          getUserProfile(provider, address),
          getUserStats(provider),
        ]);
        setProfile(userProfile);
        setStats(globalStats);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [address, provider]);

  return (
    <section className="home">
      <div className="hero">
        <div>
          <p className="eyebrow">CeloModuleX</p>
          <h1>Launch and monitor your on-chain modules</h1>
          <p className="subtitle">
            Connect your wallet to start executing modules, mint your access NFT, and manage your Celo profile.
          </p>
          <button className="primary">Start Using Modules</button>
        </div>
      </div>

      {loading && <Loader />}

      {address && profile && !loading && (
        <div className="cards">
          <div className="card">
            <p className="label">Connected Wallet</p>
            <p className="value">{formatAddress(address)}</p>
          </div>
          <div className="card">
            <p className="label">Score</p>
            <p className="value">{formatNumber(profile.score)}</p>
          </div>
          <div className="card">
            <p className="label">Premium</p>
            <p className={`value ${profile.premium ? 'positive' : ''}`}>{profile.premium ? 'Yes' : 'No'}</p>
          </div>
          <div className="card">
            <p className="label">Total Actions</p>
            <p className="value">{formatNumber(stats?.totalGlobalActions)}</p>
          </div>
          <div className="card">
            <p className="label">Fees</p>
            <p className="value">Basic {formatEther(stats?.basicFee)} CELO · Premium {formatEther(stats?.premiumFee)} CELO</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
