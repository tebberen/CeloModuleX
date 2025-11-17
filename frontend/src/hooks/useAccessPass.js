import { useState, useEffect } from 'react';
import { hasNFT, getNFTPrice, mintNFT } from '../services/blockchain';
import { useWallet } from './useWallet';

export const useAccessPass = () => {
  const { address, isConnected } = useWallet();
  const [nftPrice, setNftPrice] = useState('0');
  const [userHasNFT, setUserHasNFT] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadNFTData();
    }
  }, [isConnected, address]);

  const loadNFTData = async () => {
    try {
      const [price, hasNFTStatus] = await Promise.all([
        getNFTPrice(),
        hasNFT(address)
      ]);
      setNftPrice(price);
      setUserHasNFT(hasNFTStatus);
    } catch (error) {
      console.error('Error loading NFT data:', error);
    }
  };

  const mintAccessPass = async () => {
    if (!isConnected) return false;
    
    setIsLoading(true);
    try {
      const success = await mintNFT(nftPrice);
      if (success) {
        setUserHasNFT(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error minting NFT:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nftPrice,
    userHasNFT,
    isLoading,
    mintAccessPass,
    refreshNFTData: loadNFTData
  };
};
