import React from 'react';
import { useAccessPass } from '../hooks/useAccessPass.js';
import Loader from '../components/Loader.jsx';
import { formatEther } from '../utils/format.js';
import '../styles/nft.css';

const Nft = () => {
  const { price, ownsPass, mint, loading } = useAccessPass();

  return (
    <section className="nft-page">
      <div className="nft-card">
        <div>
          <p className="eyebrow">Access NFT</p>
          <h2>Mint your ModuleX Access Pass</h2>
          <p className="subtitle">Required to execute premium modules and unlock advanced analytics.</p>
          <ul className="nft-meta">
            <li>
              <span>Price</span>
              <strong>{price ? `${formatEther(price)} CELO` : '—'}</strong>
            </li>
            <li>
              <span>Status</span>
              <strong className={ownsPass ? 'positive' : ''}>{ownsPass ? 'Owned' : 'Not owned'}</strong>
            </li>
            <li>
              <span>Metadata</span>
              <strong>IPFS-hosted JSON with on-chain proof</strong>
            </li>
          </ul>
          <button className="primary" onClick={mint} disabled={loading || ownsPass}>
            {loading ? 'Minting...' : ownsPass ? 'Already minted' : 'Mint NFT'}
          </button>
        </div>
        <div className="nft-preview">
          <div className="badge">CeloModuleX</div>
          <p className="title">Access NFT</p>
          <p className="meta">Chain: Celo Mainnet</p>
        </div>
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default Nft;
