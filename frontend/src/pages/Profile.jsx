import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet.js';
import { createProfile, updateProfile, getUserProfile } from '../services/blockchain.js';
import { formatNumber } from '../utils/format.js';
import Loader from '../components/Loader.jsx';
import '../styles/profile.css';

const Profile = () => {
  const { address, provider, signer } = useWallet();
  const [form, setForm] = useState({ username: '', twitter: '', github: '', talent: '', selfID: '' });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const fetchProfile = async () => {
    if (!provider || !address) return;
    const data = await getUserProfile(provider, address);
    setProfile(data);
    setForm({
      username: data.username,
      twitter: data.twitter,
      github: data.github,
      talent: data.talent,
      selfID: data.selfID,
    });
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, provider]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    if (!signer) return setStatus('Connect your wallet to create a profile.');
    setLoading(true);
    try {
      await createProfile(signer, form);
      setStatus('Profile created successfully.');
      await fetchProfile();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!signer) return setStatus('Connect your wallet to update your profile.');
    setLoading(true);
    try {
      await updateProfile(signer, form);
      setStatus('Profile updated.');
      await fetchProfile();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="profile-page">
      <header className="profile-header">
        <div>
          <p className="eyebrow">Identity</p>
          <h2>Manage your on-chain profile</h2>
          <p className="subtitle">Set your social handles and talents for module attribution.</p>
        </div>
        <div className="profile-card">
          <p className="label">Wallet</p>
          <p className="value">{address || 'Connect to view profile'}</p>
          {profile && (
            <>
              <p className="label">Score</p>
              <p className="value">{formatNumber(profile.score)}</p>
            </>
          )}
        </div>
      </header>

      <div className="profile-grid">
        <div className="panel">
          <h3>Profile Details</h3>
          <div className="form-grid">
            <label>
              <span>Username</span>
              <input name="username" value={form.username} onChange={handleChange} placeholder="ModuleX builder" />
            </label>
            <label>
              <span>Twitter</span>
              <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="@celo" />
            </label>
            <label>
              <span>GitHub</span>
              <input name="github" value={form.github} onChange={handleChange} placeholder="celo-org" />
            </label>
            <label>
              <span>Talent</span>
              <input name="talent" value={form.talent} onChange={handleChange} placeholder="Smart contract dev" />
            </label>
            <label>
              <span>Self ID</span>
              <input name="selfID" value={form.selfID} onChange={handleChange} placeholder="Did:celo:..." />
            </label>
          </div>
          <div className="actions">
            <button className="primary" onClick={handleCreate} disabled={loading}>
              {loading ? 'Submitting...' : 'Create Profile'}
            </button>
            <button className="secondary" onClick={handleUpdate} disabled={loading}>
              {loading ? 'Submitting...' : 'Update Profile'}
            </button>
          </div>
          {status && <p className="status">{status}</p>}
        </div>

        <div className="panel">
          <h3>Current On-chain Data</h3>
          {loading && <Loader />}
          {profile ? (
            <ul className="profile-summary">
              <li>
                <span>Username</span>
                <strong>{profile.username || '—'}</strong>
              </li>
              <li>
                <span>Twitter</span>
                <strong>{profile.twitter || '—'}</strong>
              </li>
              <li>
                <span>GitHub</span>
                <strong>{profile.github || '—'}</strong>
              </li>
              <li>
                <span>Talent</span>
                <strong>{profile.talent || '—'}</strong>
              </li>
              <li>
                <span>Self ID</span>
                <strong>{profile.selfID || '—'}</strong>
              </li>
              <li>
                <span>Premium</span>
                <strong className={profile.premium ? 'positive' : ''}>{profile.premium ? 'Yes' : 'No'}</strong>
              </li>
            </ul>
          ) : (
            <p className="muted">Connect your wallet to load profile.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
