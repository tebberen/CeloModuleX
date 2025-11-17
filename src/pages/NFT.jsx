import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Loader from '../components/Loader';
import { useWallet } from '../context/WalletContext';
import { NFT_ABI, NFT_ADDRESS } from '../constants/contracts';
import { formatWei } from '../utils/format';

const NFT = () => {
  const { address, signer, defaultProvider, setAlert } = useWallet();
  const [price, setPrice] = useState('');
  const [hasNft, setHasNft] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  const provider = signer || defaultProvider;

  const loadPrice = async () => {
    try {
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const value = await contract.getNFTPrice();
      setPrice(value.toString());
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to fetch price' });
    }
  };

  const loadStatus = async () => {
    if (!address) return;
    try {
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const status = await contract.hasNFT(address);
      setHasNft(status);
      if (status) {
        try {
          const uri = await contract.tokenURI(1);
          setMetadata({ tokenId: 1, uri });
        } catch (err) {
          setMetadata(null);
        }
      }
    } catch (error) {
      setHasNft(false);
    }
  };

  const mint = async () => {
    if (!signer) {
      setAlert({ type: 'error', message: 'Connect a wallet to mint.' });
      return;
    }
    try {
      setLoading(true);
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      const value = await contract.getNFTPrice();
      const tx = await contract.mintNFT({ value });
      await tx.wait();
      setAlert({ type: 'success', message: 'NFT minted successfully' });
      await loadStatus();
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Mint failed' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!provider) return;
    loadPrice();
    loadStatus();
  }, [provider, address]);

  return (
    <div className="page">
      <div className="card highlight">
        <h2>ModuleX NFT</h2>
        <p>Mint the ModuleX NFT to unlock premium module execution and profile perks.</p>
      </div>
      <div className="grid">
        <div className="card">
          <h3>Pricing</h3>
          <p className="label">Current Price</p>
          <p className="value">{price ? `${formatWei(price)} CELO` : 'Loading...'}</p>
          <p className="label">Status</p>
          <p className="value">{hasNft ? 'You already own this NFT' : 'Not minted yet'}</p>
          <button className="primary full" disabled={loading || hasNft || !signer} onClick={mint}>
            {loading ? 'Minting...' : hasNft ? 'Already Minted' : 'Mint NFT'}
          </button>
          {!signer && <p className="note">Connect a wallet to mint.</p>}
        </div>
        <div className="card">
          <h3>Metadata</h3>
          {metadata ? (
            <div className="metadata">
              <p className="label">Token ID</p>
              <p className="value">{metadata.tokenId}</p>
              <p className="label">Token URI</p>
              <a className="value" href={metadata.uri} target="_blank" rel="noreferrer">
                {metadata.uri}
              </a>
            </div>
          ) : (
            <p>No metadata yet. Mint to reveal.</p>
          )}
        </div>
      </div>
      {loading && <Loader text="Processing transaction" />}
    </div>
  );
};

export default NFT;
