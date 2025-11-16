import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../hooks/useWallet';
import { useAccessPass } from '../hooks/useAccessPass';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { shortenAddress } from '../utils/format';

const NFT_IMAGE = 'ipfs://bafkreifshmlllxkm6qc3akstidbbbo6teqlgv3yntvi4tiyr64knr4byau';

const Nft = () => {
  const { account, provider, openModal } = useWallet();
  const { price, hasPass, loading, error, mint, refresh } = useAccessPass(account, provider);
  const [txStatus, setTxStatus] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleMint = async () => {
    setTxStatus('');
    setTxHash('');
    try {
      setTxStatus('Submitting transaction...');
      const tx = await mint();
      setTxHash(tx.hash);
      setTxStatus('Mint successful! UI refreshed.');
      await refresh();
    } catch (err) {
      console.error(err);
      setTxStatus(err.message || 'Mint failed');
    }
  };

  return (
    <section className="page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Premium Access Pass</p>
          <h2>Mint your CeloModuleX Access Pass</h2>
          <p className="muted">Secure entry to the MainHub dashboard and premium modules with your NFT.</p>
        </div>
        <div className="price-tag">
          <span>Price</span>
          {loading ? <Loader label="Loading price" /> : <strong>{price ? `${ethers.utils.formatEther(price)} CELO` : '--'}</strong>}
        </div>
      </div>

      <div className="nft-grid">
        <div className="nft-card">
          <div className="nft-image">
            <img src={NFT_IMAGE} alt="CeloModuleX Access Pass" />
          </div>
          <div className="nft-details">
            <h3>CeloModuleX Premium Pass</h3>
            <p className="muted">Grants exclusive access to the MainHub experience on Celo.</p>
            <ul className="nft-meta">
              <li>
                <span className="label">Network</span>
                <span>Celo Mainnet</span>
              </li>
              <li>
                <span className="label">Contract</span>
                <span className="mono">CMXAccessPass.sol</span>
              </li>
              <li>
                <span className="label">Holder</span>
                <span>{account ? shortenAddress(account) : 'Connect wallet'}</span>
              </li>
            </ul>
            {loading ? (
              <Loader label="Checking access" />
            ) : hasPass ? (
              <div className="alert success">You already own the Premium Access Pass.</div>
            ) : (
              <button className="primary" onClick={account ? handleMint : openModal} disabled={!account}>
                {account ? 'Mint NFT' : 'Connect to Mint'}
              </button>
            )}
            {txStatus && <div className="notice">{txStatus}</div>}
            {txHash && (
              <a
                href={`https://celoscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                View on Celoscan
              </a>
            )}
            <Alert type="error" message={error} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nft;
