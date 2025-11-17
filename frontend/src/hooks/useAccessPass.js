import { useCallback, useState } from 'react';
import { formatEtherDisplay } from '../utils/format.js';
import { getAccessNFTContract } from '../services/blockchain.js';
import { useWallet } from './useWallet.js';

export const useAccessPass = () => {
  const { provider, signer, isConnected } = useWallet();
  const [metadata] = useState({
    name: 'Module Access Pass',
    symbol: 'MODULE',
    totalSupply: 'Unlimited',
  });
  const [error, setError] = useState('');

  const getNFTPrice = useCallback(async () => {
    try {
      const contract = getAccessNFTContract(provider || signer);
      if (!contract) return '0.00 CELO';
      const price = await contract.price();
      return formatEtherDisplay(price);
    } catch (err) {
      setError(err.message);
      return '0.00 CELO';
    }
  }, [provider, signer]);

  const hasNFT = useCallback(async () => {
    if (!isConnected || !signer) return false;
    try {
      const contract = getAccessNFTContract(signer);
      const user = await signer.getAddress();
      const balance = await contract.balanceOf(user);
      return balance.gt(0);
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [isConnected, signer]);

  const mintNFT = useCallback(async () => {
    if (!signer) {
      setError('Connect your wallet to mint');
      return false;
    }
    try {
      const contract = getAccessNFTContract(signer);
      const price = await contract.price();
      const tx = await contract.mint({ value: price });
      await tx.wait();
      setError('');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [signer]);

  return { getNFTPrice, hasNFT, mintNFT, metadata, error };
};

export default useAccessPass;
