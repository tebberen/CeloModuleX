import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';
import { useWallet } from '../hooks/useWallet.js';
import { getUserProfile, createProfile, updateProfile } from '../services/blockchain.js';

const Profile = () => {
  const { isConnected, signer } = useWallet();
  const [profile, setProfile] = useState({ username: '', bio: '', modules: 0 });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!isConnected || !signer) return;
      setIsLoading(true);
      try {
        const data = await getUserProfile(signer);
        setProfile(data);
        setStatus('Profile loaded');
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    loadProfile();
  }, [isConnected, signer]);

  const handleCreate = async () => {
    if (!signer) return;
    setIsLoading(true);
    try {
      const created = await createProfile(signer, profile);
      setStatus(created);
      setError('');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    if (!signer) return;
    setIsLoading(true);
    try {
      const updated = await updateProfile(signer, profile);
      setStatus(updated);
      setError('');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="profile-grid">
      <div className="card profile-card">
        <h3>User Profile</h3>
        <p className="muted">Save your on-chain presence with username, bio, and module count.</p>
        <div className="input-row">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              placeholder="Celo builder"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="3"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Short description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modules">Modules Completed</label>
            <input
              id="modules"
              type="number"
              value={profile.modules}
              onChange={(e) => setProfile({ ...profile, modules: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="meta-row" style={{ marginTop: '0.75rem' }}>
          <button className="primary-btn" onClick={handleCreate} type="button">
            createProfile()
          </button>
          <button className="primary-btn" onClick={handleUpdate} type="button">
            updateProfile()
          </button>
        </div>
        {isLoading && <Loader label="Syncing profile..." />}
        {status && <Alert message={status} />}
        {error && <Alert message={error} />}
      </div>
      <div className="card profile-card">
        <h3>Profile Snapshot</h3>
        <div className="profile-meta">
          <span className="badge info">Username: {profile.username || 'Not set'}</span>
          <span className="badge info">Bio: {profile.bio || 'Add something about you'}</span>
          <span className="badge info">Modules: {profile.modules}</span>
          <span className="badge info">Network: Celo Mainnet</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
