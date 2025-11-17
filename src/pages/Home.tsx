import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { getMainHubContract, getNFTContract } from '../lib/contracts';
import WalletModal from '../components/WalletModal';

interface UserProfile {
  username: string;
  twitter: string;
  github: string;
  talent: string;
  selfID: string;
  exists: boolean;
}

const Home: React.FC = () => {
  const { address, signer, isConnected } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hasPremium, setHasPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!address) {
        setProfile(null);
        setHasPremium(false);
        return;
      }
      setLoading(true);
      try {
        const provider = signer?.provider ?? undefined;
        const mainHub = getMainHubContract(provider);
        const nft = getNFTContract(provider);

        const [userProfile, premium] = await Promise.all([
          mainHub.getUserProfile(address),
          nft.hasNFT(address)
        ]);

        setProfile({
          username: userProfile.username,
          twitter: userProfile.twitter,
          github: userProfile.github,
          talent: userProfile.talent,
          selfID: userProfile.selfID,
          exists: Boolean(userProfile.exists)
        });
        setHasPremium(Boolean(premium));
      } catch (error) {
        console.error('Failed to load home data', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [address, signer]);

  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <h2 className="section-title">Welcome to CeloModuleX</h2>
        <p style={{ marginTop: 0 }}>Modular on-chain hub for the Celo ecosystem. Connect your wallet to manage your profile and premium NFT access.</p>
        {!isConnected ? (
          <button className="primary-btn" onClick={() => setModalOpen(true)}>Connect Wallet</button>
        ) : (
          <div className="badge">Wallet Connected</div>
        )}
      </div>

      <div className="card" style={{ display: 'grid', gap: 14 }}>
        <div className="table-row">
          <div>
            <strong>Username</strong>
            <div style={{ color: '#444' }}>{profile?.username || 'Not set'}</div>
          </div>
          <Link className="primary-btn" to="/profile">
            Manage Profile
          </Link>
        </div>

        <div className="table-row">
          <div>
            <strong>Premium NFT Status</strong>
            <div style={{ color: '#444' }}>{hasPremium ? 'Active' : 'Not minted'}</div>
          </div>
          <Link className="primary-btn" to="/nft">
            {hasPremium ? 'View NFT' : 'Mint NFT'}
          </Link>
        </div>

        <div className="table-row">
          <div>
            <strong>Total actions</strong>
            <div style={{ color: '#444' }}>Placeholder value</div>
          </div>
          <button className="primary-btn" disabled>
            Coming soon
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link className="primary-btn" to="/nft">
            Start Using Modules
          </Link>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="loader" />
          <span>Syncing your dashboard...</span>
        </div>
      )}

      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Home;
