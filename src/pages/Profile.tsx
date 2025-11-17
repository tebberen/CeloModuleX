import React, { useEffect, useMemo, useState } from 'react';
import { getMainHubContract } from '../lib/contracts';
import { useWallet } from '../contexts/WalletContext';

interface UserProfileForm {
  username: string;
  twitter: string;
  github: string;
  talent: string;
  selfID: string;
  exists: boolean;
}

const Profile: React.FC = () => {
  const { address, signer, isConnected, isCorrectNetwork } = useWallet();
  const [form, setForm] = useState<UserProfileForm>({ username: '', twitter: '', github: '', talent: '', selfID: '', exists: false });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const contract = useMemo(() => getMainHubContract(signer ?? undefined), [signer]);

  const loadProfile = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const profile = await contract.getUserProfile(address);
      setForm({
        username: profile.username,
        twitter: profile.twitter,
        github: profile.github,
        talent: profile.talent,
        selfID: profile.selfID,
        exists: Boolean(profile.exists)
      });
    } catch (error) {
      console.error('Failed to load profile', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, signer]);

  const handleChange = (key: keyof UserProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async () => {
    if (!signer) return;
    setLoading(true);
    setStatus('Creating profile...');
    try {
      const tx = await contract.connect(signer).createProfile(form.username.trim(), form.twitter.trim(), form.github.trim(), form.talent.trim(), form.selfID.trim());
      await tx.wait();
      setStatus('Profile created successfully.');
      await loadProfile();
    } catch (error) {
      console.error(error);
      setStatus('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!signer) return;
    setLoading(true);
    setStatus('Updating profile...');
    try {
      const tx = await contract.connect(signer).updateProfile(form.twitter.trim(), form.github.trim(), form.talent.trim(), form.selfID.trim());
      await tx.wait();
      setStatus('Profile updated.');
      await loadProfile();
    } catch (error) {
      console.error(error);
      setStatus('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card">
        <h2 className="section-title">Profile</h2>
        <p>Please connect your wallet to manage your profile.</p>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="card">
        <h2 className="section-title">Profile</h2>
        <p>Please switch to Celo Mainnet (42220) to continue.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: 'grid', gap: 16 }}>
      <div>
        <h2 className="section-title" style={{ marginBottom: 6 }}>
          Profile
        </h2>
        <p style={{ margin: 0 }}>View and edit your on-chain profile. Username becomes read-only after creation.</p>
      </div>

      <div className="form-grid">
        <div className="input-field">
          <label>Username</label>
          <input value={form.username} onChange={(e) => handleChange('username', e.target.value)} readOnly={form.exists} placeholder="yourname" />
        </div>
        <div className="input-field">
          <label>Twitter</label>
          <input value={form.twitter} onChange={(e) => handleChange('twitter', e.target.value)} placeholder="@handle" />
        </div>
        <div className="input-field">
          <label>GitHub</label>
          <input value={form.github} onChange={(e) => handleChange('github', e.target.value)} placeholder="github username" />
        </div>
        <div className="input-field">
          <label>Talent</label>
          <input value={form.talent} onChange={(e) => handleChange('talent', e.target.value)} placeholder="e.g. Solidity" />
        </div>
        <div className="input-field">
          <label>selfID</label>
          <input value={form.selfID} onChange={(e) => handleChange('selfID', e.target.value)} placeholder="self.id" />
        </div>
      </div>

      <div className="form-footer">
        {!form.exists ? (
          <button className="primary-btn" onClick={handleCreate} disabled={!form.username || loading}>
            {loading ? 'Submitting...' : 'Create Profile'}
          </button>
        ) : (
          <button className="primary-btn" onClick={handleUpdate} disabled={loading}>
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        )}
        {loading && <div className="loader" />}
        {status && <span>{status}</span>}
      </div>
    </div>
  );
};

export default Profile;
