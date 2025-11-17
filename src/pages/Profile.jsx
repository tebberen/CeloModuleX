import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Loader from '../components/Loader';
import { useWallet } from '../context/WalletContext';
import { HUB_ABI, HUB_ADDRESS } from '../constants/contracts';

const Profile = () => {
  const { address, signer, defaultProvider, setAlert } = useWallet();
  const [form, setForm] = useState({ username: '', twitter: '', github: '', talent: '', selfId: '' });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const provider = signer || defaultProvider;

  const loadProfile = async () => {
    try {
      const contract = new ethers.Contract(HUB_ADDRESS, HUB_ABI, provider);
      const data = await contract.getProfile(address || ethers.ZeroAddress);
      setProfile(data);
      setForm({
        username: data.username || '',
        twitter: data.twitter || '',
        github: data.github || '',
        talent: data.talent || '',
        selfId: data.selfId || '',
      });
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to fetch profile' });
    }
  };

  useEffect(() => {
    if (!provider) return;
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, address]);

  const submit = async (action) => {
    if (!signer) {
      setAlert({ type: 'error', message: 'Connect wallet to manage profile.' });
      return;
    }
    setLoading(true);
    try {
      const contract = new ethers.Contract(HUB_ADDRESS, HUB_ABI, signer);
      const args = [form.username, form.twitter, form.github, form.talent, form.selfId];
      const tx = action === 'create' ? await contract.createProfile(...args) : await contract.updateProfile(...args);
      await tx.wait();
      setAlert({ type: 'success', message: 'Profile saved on-chain' });
      loadProfile();
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Transaction failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card highlight">
        <h2>Your On-chain Profile</h2>
        <p>Share your social links and talents with other builders in the ModuleX ecosystem.</p>
      </div>
      <div className="grid two">
        <div className="card">
          <h3>Profile</h3>
          <div className="form-group">
            <label>Username</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Twitter</label>
            <input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
          </div>
          <div className="form-group">
            <label>GitHub</label>
            <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Talent</label>
            <input value={form.talent} onChange={(e) => setForm({ ...form, talent: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Self ID</label>
            <input value={form.selfId} onChange={(e) => setForm({ ...form, selfId: e.target.value })} />
          </div>
          <div className="button-row">
            <button className="secondary" disabled={loading} onClick={() => submit('create')}>
              {loading ? 'Submitting...' : 'Create Profile'}
            </button>
            <button className="primary" disabled={loading} onClick={() => submit('update')}>
              {loading ? 'Submitting...' : 'Update Profile'}
            </button>
          </div>
          {!signer && <p className="note">Connect a wallet to save changes.</p>}
        </div>
        <div className="card">
          <h3>On-chain Data</h3>
          {profile ? (
            <div className="metadata">
              <p className="label">Username</p>
              <p className="value">{profile.username || 'Not set'}</p>
              <p className="label">Twitter</p>
              <p className="value">{profile.twitter || 'Not set'}</p>
              <p className="label">GitHub</p>
              <p className="value">{profile.github || 'Not set'}</p>
              <p className="label">Talent</p>
              <p className="value">{profile.talent || 'Not set'}</p>
              <p className="label">Self ID</p>
              <p className="value">{profile.selfId || 'Not set'}</p>
              <p className="label">Actions</p>
              <p className="value">{Number(profile.actions || 0)}</p>
            </div>
          ) : (
            <p>No profile found. Create one to get started.</p>
          )}
        </div>
      </div>
      {loading && <Loader text="Saving profile" />}
    </div>
  );
};

export default Profile;
