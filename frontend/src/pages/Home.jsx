import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useAccessPass } from '../hooks/useAccessPass';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

const Home = () => {
  const { account, openModal, provider, error } = useWallet();
  const { hasPass, loading } = useAccessPass(account, provider);

  return (
    <section className="page">
      <div className="hero">
        <div>
          <p className="eyebrow">Premium Celo Experience</p>
          <h1>Welcome to CeloModuleX</h1>
          <p className="muted">
            Access curated modules, on-chain insights, and exclusive dashboards powered by the Celo Mainnet.
          </p>
          <div className="actions">
            <button className="primary" onClick={openModal}>
              {account ? 'Switch Wallet' : 'Connect Wallet'}
            </button>
          </div>
          {loading ? (
            <Loader label="Checking premium status" />
          ) : (
            account && (
              <div className="status-card">
                <span className="label">Premium status</span>
                <span className={hasPass ? 'badge success' : 'badge error'}>
                  {hasPass ? 'Active Access Pass' : 'Not minted yet'}
                </span>
              </div>
            )
          )}
          <Alert type="error" message={error} />
        </div>
        <div className="hero-visual">
          <div className="glow" />
          <div className="card">
            <h3>Celo Mainnet</h3>
            <p>Chain ID: 42220</p>
            <p>Network check enforced</p>
            <div className="divider" />
            <p className="muted">Mint your premium Access Pass to unlock the MainHub dashboard.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
