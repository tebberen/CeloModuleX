import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Loader from '../components/Loader';
import { useWallet } from '../context/WalletContext';
import { HUB_ABI, HUB_ADDRESS, NFT_ABI, NFT_ADDRESS, CELO_RPC } from '../constants/contracts';
import { formatWei } from '../utils/format';
import { Link } from 'react-router-dom';

const Home = () => {
  const { address, signer, defaultProvider, setAlert } = useWallet();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [hasNft, setHasNft] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadProfile = async (prov) => {
    try {
      const contract = new ethers.Contract(HUB_ADDRESS, HUB_ABI, prov);
      const data = await contract.getProfile(address || ethers.ZeroAddress);
      setProfile({
        username: data.username || 'Guest',
        twitter: data.twitter,
        github: data.github,
        talent: data.talent,
        selfId: data.selfId,
        actions: Number(data.actions || 0),
      });
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to load profile' });
    }
  };

  const loadStats = async (prov) => {
    try {
      const contract = new ethers.Contract(HUB_ADDRESS, HUB_ABI, prov);
      const data = await contract.getGlobalStats();
      setStats({ totalProfiles: Number(data.totalProfiles || 0), totalActions: Number(data.totalActions || 0) });
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to load stats' });
    }
  };

  const loadNftStatus = async (prov) => {
    try {
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, prov);
      const status = address ? await contract.hasNFT(address) : false;
      setHasNft(status);
    } catch (error) {
      setHasNft(false);
    }
  };

  useEffect(() => {
    const prov = signer || defaultProvider;
    if (!prov) return;
    setLoading(true);
    Promise.all([loadProfile(prov), loadStats(prov), loadNftStatus(prov)])
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [address, signer, defaultProvider]);

  return (
    <div className="page">
      <div className="card highlight">
        <h1>Welcome to CeloModuleX</h1>
        <p>Interact with on-chain modules, manage your profile, and unlock premium features with the ModuleX NFT.</p>
        <div className="cta-group">
          <Link className="primary" to="/nft">
            Check NFT Status
          </Link>
          <Link className="secondary" to="/profile">
            Manage Profile
          </Link>
        </div>
      </div>
      {loading && <Loader text="Fetching on-chain data" />}
      {!loading && (
        <div className="grid">
          <div className="card">
            <h3>Your Profile</h3>
            <p className="label">Username</p>
            <p className="value">{profile?.username || 'Guest'}</p>
            <p className="label">Actions</p>
            <p className="value">{profile?.actions ?? 0}</p>
            <p className="label">Premium</p>
            <p className="value">{hasNft ? 'ModuleX NFT Holder' : 'Free user'}</p>
          </div>
          <div className="card">
            <h3>Network Stats</h3>
            <p className="label">Total Profiles</p>
            <p className="value">{stats?.totalProfiles ?? '0'}</p>
            <p className="label">Total Actions</p>
            <p className="value">{stats?.totalActions ?? '0'}</p>
            <p className="label">Latest RPC</p>
            <p className="value">{CELO_RPC}</p>
          </div>
          <div className="card">
            <h3>Module Execution</h3>
            <p>Trigger a simple on-chain module call to keep your profile active.</p>
            <button
              className="primary full"
              disabled={!signer}
              onClick={async () => {
                if (!signer) {
                  setAlert({ type: 'error', message: 'Connect a wallet to execute modules.' });
                  return;
                }
                try {
                  setLoading(true);
                  const contract = new ethers.Contract(HUB_ADDRESS, HUB_ABI, signer);
                  const tx = await contract.executeModule(0, '0x');
                  await tx.wait();
                  setAlert({ type: 'success', message: 'Module executed successfully' });
                  loadStats(signer);
                } catch (error) {
                  setAlert({ type: 'error', message: error.message || 'Module execution failed' });
                } finally {
                  setLoading(false);
                }
              }}
            >
              Start Using Modules
            </button>
            <p className="note">Requires wallet connection and Celo Mainnet.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
