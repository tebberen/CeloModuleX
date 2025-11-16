import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import { useWallet } from "../hooks/useWallet.js";
import { createProfile, getUserProfile, updateProfile, getUserStats } from "../services/blockchain.js";
import "../styles/profile.css";

const initialProfile = {
  username: "",
  twitter: "",
  github: "",
  talent: "",
  selfID: "",
  createdAt: 0,
  hasNFT: false,
};

function Profile({ onAlert }) {
  const { provider, signer, address } = useWallet();
  const [profile, setProfile] = useState(initialProfile);
  const [stats, setStats] = useState({ score: 0, totalActions: 0, uniqueModules: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!provider || !address) return;
      setLoading(true);
      try {
        const [userProfile, userStats] = await Promise.all([
          getUserProfile(provider, address),
          getUserStats(provider),
        ]);
        setProfile(userProfile);
        setStats(userStats);
      } catch (error) {
        onAlert({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [provider, address, onAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (action) => {
    if (!signer) {
      onAlert({ type: "error", message: "Connect your wallet" });
      return;
    }
    setLoading(true);
    try {
      const fn = action === "create" ? createProfile : updateProfile;
      const tx = await fn(signer, profile);
      await tx.wait();
      onAlert({ type: "success", message: "Profile saved" });
      const refreshed = await getUserProfile(provider, address);
      setProfile(refreshed);
    } catch (error) {
      onAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page profile">
      <div className="profile-header">
        <div>
          <p className="tag">Identity</p>
          <h1>Your Profile</h1>
          <p className="subtitle">Manage your ModuleX identity and automation footprint.</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card">
          <h3>Profile Details</h3>
          <div className="form-grid">
            <label>
              <span>Username</span>
              <input name="username" value={profile.username} onChange={handleChange} />
            </label>
            <label>
              <span>Twitter</span>
              <input name="twitter" value={profile.twitter} onChange={handleChange} />
            </label>
            <label>
              <span>GitHub</span>
              <input name="github" value={profile.github} onChange={handleChange} />
            </label>
            <label>
              <span>Talent</span>
              <input name="talent" value={profile.talent} onChange={handleChange} />
            </label>
            <label>
              <span>Self ID</span>
              <input name="selfID" value={profile.selfID} onChange={handleChange} />
            </label>
          </div>
          <div className="actions">
            <button className="btn outline" onClick={() => handleSubmit("create")} disabled={loading}>
              Create Profile
            </button>
            <button className="btn primary" onClick={() => handleSubmit("update")} disabled={loading}>
              Update Profile
            </button>
          </div>
        </div>

        <div className="card stats">
          <h3>Usage</h3>
          {loading ? (
            <Loader />
          ) : (
            <div className="stat-grid">
              <div>
                <p className="stat-label">Total Actions</p>
                <p className="stat-value">{stats.totalActions}</p>
              </div>
              <div>
                <p className="stat-label">Premium Modules</p>
                <p className="stat-value">{stats.uniqueModules}</p>
              </div>
              <div>
                <p className="stat-label">Score</p>
                <p className="stat-value">{stats.score}</p>
              </div>
            </div>
          )}
          <div className="meta">
            <p>Address: {address || "Not connected"}</p>
            <p>
              NFT Access: <strong>{profile.hasNFT ? "Granted" : "Missing"}</strong>
            </p>
            {profile.createdAt ? (
              <p>Created: {new Date(profile.createdAt * 1000).toLocaleString()}</p>
            ) : (
              <p>Created: Not set</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
