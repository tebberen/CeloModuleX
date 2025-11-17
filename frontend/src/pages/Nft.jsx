import React, { useEffect, useState } from 'react';
import '../styles/nft.css';
import { useAccessPass } from '../hooks/useAccessPass.js';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';

const Nft = () => {
  const { getNFTPrice, hasNFT, mintNFT, metadata, error } = useAccessPass();
  const [price, setPrice] = useState('');
  const [owned, setOwned] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsWorking(true);
      const [fetchedPrice, ownership] = await Promise.all([getNFTPrice(), hasNFT()]);
      setPrice(fetchedPrice);
      setOwned(ownership);
      setIsWorking(false);
    };
    load();
  }, [getNFTPrice, hasNFT]);

  const handleMint = async () => {
    setIsWorking(true);
    const success = await mintNFT();
    if (success) {
      const ownership = await hasNFT();
      setOwned(ownership);
    }
    setIsWorking(false);
  };

  return (
    <div className="nft-grid">
      <div className="nft-card">
        <div className="nft-thumb">Module Access NFT</div>
        <ul className="meta-list">
          <li>
            <span>Current price</span>
            <strong>{price || '0.00 CELO'}</strong>
          </li>
          <li>
            <span>Ownership</span>
            <strong>{owned ? 'You own this NFT' : 'Not owned'}</strong>
          </li>
          <li>
            <span>Minting</span>
            <strong>Instant mint on Celo Mainnet</strong>
          </li>
        </ul>
        <button className="primary-btn" onClick={handleMint} type="button" disabled={isWorking}>
          {owned ? 'Mint Again' : 'Mint NFT'}
        </button>
        {isWorking && <Loader label="Working on chain..." />}
        {error && <Alert message={error} />}
      </div>
      <div className="nft-card">
        <h3>Metadata preview</h3>
        <div className="profile-meta">
          <div className="badge info">Name: {metadata.name}</div>
          <div className="badge info">Symbol: {metadata.symbol}</div>
          <div className="badge info">Network: Celo (42220)</div>
          <div className="badge info">Supply: {metadata.totalSupply}</div>
        </div>
        <p className="muted" style={{ marginTop: '0.75rem' }}>
          Use the mint function to receive your access NFT. The UI checks pricing and ownership before letting you mint.
        </p>
      </div>
    </div>
  );
};

export default Nft;
