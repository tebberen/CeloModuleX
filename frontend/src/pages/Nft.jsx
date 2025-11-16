import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import { useWallet } from "../hooks/useWallet.js";
import { getNFTPrice, hasNFT, mintNFT } from "../services/blockchain.js";
import { formatEth } from "../utils/format.js";
import "../styles/nft.css";

function Nft({ onAlert }) {
  const { provider, signer, address } = useWallet();
  const [price, setPrice] = useState("0");
  const [owns, setOwns] = useState(false);
  const [image, setImage] = useState("https://ipfs.io/ipfs/bafkreiah7zsjf7vayv3jogesplqvpz2gl9l9q40sp5m5sz5kdgx3bu6l5u");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!provider || !address) return;
      setLoading(true);
      try {
        const [currentPrice, hasPass] = await Promise.all([
          getNFTPrice(provider),
          hasNFT(provider, address),
        ]);
        setPrice(currentPrice);
        setOwns(hasPass);
      } catch (error) {
        onAlert({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [provider, address, onAlert]);

  const handleMint = async () => {
    if (!signer) {
      onAlert({ type: "error", message: "Connect your wallet first" });
      return;
    }
    setLoading(true);
    try {
      const tx = await mintNFT(signer);
      await tx.wait();
      onAlert({ type: "success", message: "NFT minted successfully" });
      const hasPass = await hasNFT(provider, address);
      setOwns(hasPass);
    } catch (error) {
      onAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page nft">
      <section className="nft-header">
        <div>
          <p className="tag">Access Pass</p>
          <h1>Unlock premium modules</h1>
          <p className="subtitle">Mint your ModuleX Access Pass to enable premium automation.</p>
          <div className="nft-details">
            <div>
              <p className="stat-label">Current Price</p>
              <p className="stat-value">{formatEth(price)} CELO</p>
            </div>
            <div>
              <p className="stat-label">Ownership</p>
              <p className="stat-value">{owns ? "You own the pass" : "Not minted yet"}</p>
            </div>
          </div>
          <button className="btn primary" onClick={handleMint} disabled={loading}>
            {loading ? "Processing..." : owns ? "Mint Again" : "Mint NFT"}
          </button>
        </div>
        <div className="nft-card">
          {loading ? (
            <Loader />
          ) : (
            <img src={image} alt="ModuleX Access NFT" />
          )}
        </div>
      </section>
    </div>
  );
}

export default Nft;
