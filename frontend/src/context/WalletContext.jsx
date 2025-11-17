import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';

export const WalletContext = createContext(null);

const CELO_CHAIN_ID = 42220;
const CELO_CHAIN_HEX = ethers.utils.hexValue(CELO_CHAIN_ID);

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [wcProvider, setWcProvider] = useState(null);

  const resetState = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAddress('');
    setIsConnected(false);
  }, []);

  const ensureCeloChain = useCallback(async (ethProvider) => {
    const chainId = await ethProvider.request({ method: 'eth_chainId' });
    if (chainId !== CELO_CHAIN_HEX) {
      await ethProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CELO_CHAIN_HEX }],
      });
    }
  }, []);

  const connectMetaMask = useCallback(async () => {
    setIsLoading(true);
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask is not available.');
      }
      await ensureCeloChain(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const walletSigner = web3Provider.getSigner();
      setProvider(web3Provider);
      setSigner(walletSigner);
      setAddress(accounts[0]);
      setIsConnected(true);
      setMessage('Connected with MetaMask');
    } catch (err) {
      setMessage(err.message);
    }
    setIsLoading(false);
  }, [ensureCeloChain]);

  const connectWalletConnect = useCallback(async () => {
    setIsLoading(true);
    try {
      const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '00000000000000000000000000000000';
      const providerInstance = await EthereumProvider.init({
        projectId,
        showQrModal: true,
        chains: [CELO_CHAIN_ID],
        optionalChains: [CELO_CHAIN_ID],
      });
      setWcProvider(providerInstance);
      await providerInstance.enable();
      await ensureCeloChain(providerInstance);
      const web3Provider = new ethers.providers.Web3Provider(providerInstance, 'any');
      const walletSigner = web3Provider.getSigner();
      const userAddress = await walletSigner.getAddress();
      setProvider(web3Provider);
      setSigner(walletSigner);
      setAddress(userAddress);
      setIsConnected(true);
      setMessage('Connected with WalletConnect');
    } catch (err) {
      setMessage(err.message);
    }
    setIsLoading(false);
  }, [ensureCeloChain]);

  const disconnect = useCallback(async () => {
    if (wcProvider) {
      try {
        await wcProvider.disconnect();
      } catch (err) {
        setMessage(err.message);
      }
      setWcProvider(null);
    }
    resetState();
    setMessage('Disconnected');
  }, [resetState, wcProvider]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return undefined;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        resetState();
      } else {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    };

    const handleChainChanged = (chainId) => {
      if (chainId !== CELO_CHAIN_HEX) {
        setMessage('Please switch to Celo Mainnet (42220)');
        resetState();
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [resetState]);

  const value = useMemo(
    () => ({
      provider,
      signer,
      address,
      isConnected,
      isLoading,
      message,
      connectMetaMask,
      connectWalletConnect,
      disconnect,
    }),
    [provider, signer, address, isConnected, isLoading, message, connectMetaMask, connectWalletConnect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
