import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useAccessPass } from '../hooks/useAccessPass';
import Loader from '../components/Loader';
import { shortenAddress } from '../utils/format';

const Profile = () => {
  const { account, provider, openModal } = useWallet();
  const { hasPass, loading } = useAccessPass(account, provider);

  return (
    <section className="page">
      <div className="profile-card">
        <h2>Profile</h2>
        {!account ? (
          <div className="empty">
            <p>Please connect wallet</p>
            <button className="primary" onClick={openModal}>
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="profile-grid">
            <div>
              <p className="label">Address</p>
              <p className="mono">{shortenAddress(account)}</p>
            </div>
            <div>
              <p className="label">Premium Access</p>
              {loading ? (
                <Loader label="Checking" />
              ) : (
                <span className={hasPass ? 'badge success' : 'badge error'}>
                  {hasPass ? 'Active' : 'Not minted'}
                </span>
              )}
            </div>
            <div className="profile-actions">
              <button className="secondary">Open Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
