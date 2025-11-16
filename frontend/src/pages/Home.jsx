import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { useWallet } from "../hooks/useWallet.js";
import { getUserStats } from "../services/blockchain.js";
import "../styles/home.css";

function Home({ onAlert }) {
  const { provider, address } = useWallet();
  const [stats, setStats] = useState({ score: 0, totalActions: 0, uniqueModules: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!provider) return;
      setLoading(true);
      try {
        const data = await getUserStats(provider);
        setStats(data);
      } catch (error) {
        onAlert({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [provider, onAlert]);

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-content">
          <p className="tag">CeloModuleX</p>
          <h1>Start Using Modules</h1>
          <p className="subtitle">
            Compose powerful on-chain automations and join a thriving builder community on
            Celo.
          </p>
          <div className="cta">
            <Link to="/profile" className="btn primary">
              Create Profile
            </Link>
            <Link to="/nft" className="btn outline">
              Access Pass
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>Network</h3>
          <p className="stat-value">Celo Mainnet</p>
          <p className="stat-label">Chain ID 42220</p>
        </div>
      </section>

      {address && (
        <section className="stats">
          <div className="section-header">
            <h2>Your Activity</h2>
            <p>Realtime metrics from MainHub</p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="stat-grid">
              <div className="stat-card">
                <p className="stat-label">Score</p>
                <p className="stat-value">{stats.score}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Total Actions</p>
                <p className="stat-value">{stats.totalActions}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Unique Modules</p>
                <p className="stat-value">{stats.uniqueModules}</p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Home;
