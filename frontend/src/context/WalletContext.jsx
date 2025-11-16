import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { CELO_MAINNET } from '../utils/networks.js';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetState = () => {
    setProvider(null);
    setSigner(null);
    setAddress('');
    setChainId(null);
  };

  const handleChainValidation = useCallback(
    async (nextProvider) => {
      const network = await nextProvider.getNetwork();
      const id = Number(network.chainId);
      setChainId(id);
      if (id !== CELO_MAINNET.chainId) {
        throw new Error(`Please switch to ${CELO_MAINNET.name} (chain ${CELO_MAINNET.chainId}).`);
      }
    },
    [],
  );

  const connectMetamask = useCallback(async () => {
    if (!window.ethereum) {
      setError('MetaMask not detected. Please install it.');
      return;
    }
    setLoading(true);
    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      await browserProvider.send('eth_requestAccounts', []);
      await handleChainValidation(browserProvider);
      const signerInstance = await browserProvider.getSigner();
      const signerAddress = await signerInstance.getAddress();
      setProvider(browserProvider);
      setSigner(signerInstance);
      setAddress(signerAddress);
    } catch (err) {
      setError(err.message || 'Failed to connect MetaMask');
      resetState();
    } finally {
      setLoading(false);
    }
  }, [handleChainValidation]);

  const connectWalletConnect = useCallback(async () => {
    setLoading(true);
    try {
      const wcProvider = await EthereumProvider.init({
        projectId: 'YOUR_PROJECT_ID',
        chains: [CELO_MAINNET.chainId],
        optionalChains: [CELO_MAINNET.chainId],
        showQrModal: true,
      });
      await wcProvider.enable();
      const web3Provider = new ethers.BrowserProvider(wcProvider);
      await handleChainValidation(web3Provider);
      const signerInstance = await web3Provider.getSigner();
      const signerAddress = await signerInstance.getAddress();
      setProvider(web3Provider);
      setSigner(signerInstance);
      setAddress(signerAddress);
    } catch (err) {
      setError(err.message || 'Failed to connect WalletConnect');
      resetState();
    } finally {
      setLoading(false);
    }
  }, [handleChainValidation]);

  const disconnect = useCallback(() => {
    resetState();
  }, []);

  const clearError = () => setError('');

  useEffect(() => {
    if (!window.ethereum) return undefined;
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        resetState();
      } else {
        setAddress(accounts[0]);
      }
    };
    const handleChainChanged = () => {
      window.location.reload();
    };
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const value = useMemo(
    () => ({
      provider,
      signer,
      address,
      chainId,
      loading,
      error,
      connectMetamask,
      connectWalletConnect,
      disconnect,
      clearError,
    }),
    [provider, signer, address, chainId, loading, error, connectMetamask, connectWalletConnect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => useContext(WalletContext);
