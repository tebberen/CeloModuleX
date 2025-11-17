import React, { useEffect, useMemo, useState } from 'react';
import { formatEther } from 'ethers';
import { getNFTContract } from '../lib/contracts';
import { useWallet } from '../contexts/WalletContext';

interface NftMetadata {
  tokenId: string;
  uri: string;
  name?: string;
  description?: string;
  image?: string;
}

const Nft: React.FC = () => {
  const { address, signer, isConnected, isCorrectNetwork } = useWallet();
  const [price, setPrice] = useState<string>('0');
  const [hasNft, setHasNft] = useState(false);
  const [minting, setMinting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<NftMetadata | null>(null);

  const contract = useMemo(() => getNFTContract(signer ?? undefined), [signer]);

  const loadPriceAndStatus = async () => {
    try {
      const [rawPrice, premium] = await Promise.all([
        contract.getNFTPrice(),
        address ? contract.hasNFT(address) : false
      ]);
      setPrice(formatEther(rawPrice));
      setHasNft(Boolean(premium));
    } catch (error) {
      console.error('Failed to load NFT info', error);
    }
  };

  const loadMetadata = async () => {
    if (!address) return;
    try {
      const balance = await contract.balanceOf(address);
      if (balance === 0n) {
        setMetadata(null);
        return;
      }
      const tokenId = await contract.tokenOfOwnerByIndex(address, 0);
      const uri = await contract.tokenURI(tokenId);
      let data: any = {};
      try {
        const res = await fetch(uri);
        data = await res.json();
      } catch (err) {
        console.warn('Unable to fetch token metadata', err);
      }
      setMetadata({
        tokenId: tokenId.toString(),
        uri,
        name: data.name,
        description: data.description,
        image: data.image
      });
    } catch (error) {
      console.error('Failed to load metadata', error);
    }
  };

  useEffect(() => {
    loadPriceAndStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, signer]);

  useEffect(() => {
    if (hasNft) {
      loadMetadata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNft, address]);

  const handleMint = async () => {
    if (!signer) return;
    setMinting(true);
    setStatus('Processing transaction...');
    try {
      const tx = await contract.connect(signer).mintNFT({ value: await contract.getNFTPrice() });
      setStatus('Transaction submitted. Waiting for confirmation...');
      const receipt = await tx.wait();
      setStatus(`Mint confirmed in tx ${receipt.hash}`);
      await loadPriceAndStatus();
      await loadMetadata();
    } catch (error) {
      console.error(error);
      setStatus('Failed to mint NFT. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card">
        <h2 className="section-title">Premium NFT</h2>
        <p>Please connect your wallet to mint or view your NFT.</p>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="card">
        <h2 className="section-title">Premium NFT</h2>
        <p>Please switch to Celo Mainnet (42220) to continue.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: 'grid', gap: 14 }}>
      <h2 className="section-title">Premium Access NFT</h2>
      <p style={{ margin: 0 }}>Mint the premium NFT to unlock advanced modules. Metadata is fetched automatically after minting.</p>

      <div className="table-row">
        <div>
          <strong>Price</strong>
          <div style={{ color: '#444' }}>{price} CELO</div>
        </div>
        {!hasNft && (
          <button className="primary-btn" onClick={handleMint} disabled={minting}>
            {minting ? 'Minting...' : 'Mint NFT'}
          </button>
        )}
      </div>

      <div className="table-row">
        <div>
          <strong>Status</strong>
          <div style={{ color: '#444' }}>{hasNft ? 'Premium active' : 'No NFT yet'}</div>
        </div>
        {hasNft && <div className="badge">Premium unlocked</div>}
      </div>

      {minting && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="loader" />
          <span>Waiting for confirmation...</span>
        </div>
      )}

      {status && <div className="badge">{status}</div>}

      {metadata && (
        <div className="card" style={{ background: '#fff9e6', borderColor: '#ffd067' }}>
          <h3 style={{ marginTop: 0 }}>Your NFT</h3>
          <p style={{ margin: '4px 0' }}>Token ID: {metadata.tokenId}</p>
          <p style={{ margin: '4px 0' }}>URI: {metadata.uri}</p>
          {metadata.name && <p style={{ margin: '4px 0' }}><strong>{metadata.name}</strong></p>}
          {metadata.description && <p style={{ margin: '4px 0' }}>{metadata.description}</p>}
          {metadata.image && <img src={metadata.image} alt={metadata.name} style={{ maxWidth: '240px', borderRadius: 12 }} />}
        </div>
      )}
    </div>
  );
};

export default Nft;
