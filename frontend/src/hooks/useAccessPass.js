import { useEffect, useState } from 'react';
import { getNFTPrice, hasNFT, mintNFT } from '../services/blockchain.js';
import { useWallet } from './useWallet.js';

export const useAccessPass = () => {
  const { provider, signer, address } = useWallet();
  const [price, setPrice] = useState(null);
  const [ownsPass, setOwnsPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!provider || !address) return;
    const [nextPrice, owns] = await Promise.all([getNFTPrice(provider), hasNFT(provider, address)]);
    setPrice(nextPrice);
    setOwnsPass(owns);
  };

  const mint = async () => {
    if (!signer) throw new Error('Connect your wallet first.');
    setLoading(true);
    try {
      await mintNFT(signer);
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, provider]);

  return { price, ownsPass, mint, loading, refresh };
};

export default useAccessPass;
