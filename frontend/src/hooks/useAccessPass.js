import { useCallback, useEffect, useState } from 'react';
import { fetchHasNft, fetchNftPrice, getAccessPassContract, getReadProvider } from '../services/blockchain';

export const useAccessPass = (account, provider) => {
  const [price, setPrice] = useState(null);
  const [hasPass, setHasPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const activeProvider = provider || getReadProvider();
      const [priceValue, hasNftValue] = await Promise.all([
        fetchNftPrice(activeProvider),
        account ? fetchHasNft(account, activeProvider) : Promise.resolve(false),
      ]);
      setPrice(priceValue);
      setHasPass(hasNftValue);
    } catch (err) {
      console.error(err);
      setError('Failed to load NFT data');
    } finally {
      setLoading(false);
    }
  }, [account, provider]);

  useEffect(() => {
    load();
  }, [load]);

  const mint = useCallback(async () => {
    if (!provider) throw new Error('Connect a wallet to mint');
    const signer = provider.getSigner();
    const contract = getAccessPassContract(signer);
    const value = await contract.getNFTPrice();
    const tx = await contract.mintNFT({ value });
    await tx.wait();
    await load();
    return tx;
  }, [provider, load]);

  return { price, hasPass, loading, error, refresh: load, mint };
};
