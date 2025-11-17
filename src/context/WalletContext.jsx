import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';

const celoChain = {
  chainId: 42220,
  chainHex: '0xa4ec',
  rpcUrls: ['https://forno.celo.org'],
  name: 'Celo Mainnet',
  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
};

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [networkOk, setNetworkOk] = useState(true);
  const [walletType, setWalletType] = useState('');
  const [wcProvider, setWcProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const defaultProvider = useMemo(() => new ethers.JsonRpcProvider(celoChain.rpcUrls[0]), []);

  const reset = () => {
    setAddress('');
    setProvider(null);
    setSigner(null);
    setNetworkOk(true);
    setWalletType('');
  };

  const ensureCeloChain = async (ethProvider) => {
    const currentChain = await ethProvider.request({ method: 'eth_chainId' });
    if (currentChain !== celoChain.chainHex) {
      try {
        await ethProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: celoChain.chainHex }],
        });
        return true;
      } catch (error) {
        if (error.code === 4902) {
          await ethProvider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: celoChain.chainHex,
                chainName: celoChain.name,
                rpcUrls: celoChain.rpcUrls,
                nativeCurrency: celoChain.nativeCurrency,
              },
            ],
          });
          return true;
        }
        setNetworkOk(false);
        throw error;
      }
    }
    return true;
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setAlert({ type: 'error', message: 'MetaMask not detected.' });
      return;
    }
    try {
      await ensureCeloChain(window.ethereum);
      const browserProvider = new ethers.BrowserProvider(window.ethereum, 'any');
      const signerInstance = await browserProvider.getSigner();
      const userAddress = await signerInstance.getAddress();
      setAddress(userAddress);
      setProvider(browserProvider);
      setSigner(signerInstance);
      setWalletType('metamask');
      setNetworkOk(true);
      setShowModal(false);
      setAlert({ type: 'success', message: 'Connected with MetaMask' });
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'MetaMask connection failed' });
    }
  };

  const connectWalletConnect = async () => {
    try {
      const providerInstance = await EthereumProvider.init({
        projectId: 'bd686fd7d1f34f2baf6d4f9e0e1d729e',
        chains: [celoChain.chainId],
        optionalChains: [celoChain.chainId],
        showQrModal: true,
        rpcMap: { [celoChain.chainId]: celoChain.rpcUrls[0] },
      });
      await providerInstance.enable();
      const currentChain = await providerInstance.request({ method: 'eth_chainId' });
      if (currentChain !== celoChain.chainHex) {
        await providerInstance.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: celoChain.chainHex }],
        });
      }
      const browserProvider = new ethers.BrowserProvider(providerInstance, 'any');
      const signerInstance = await browserProvider.getSigner();
      const userAddress = await signerInstance.getAddress();
      setAddress(userAddress);
      setProvider(browserProvider);
      setSigner(signerInstance);
      setWalletType('walletconnect');
      setWcProvider(providerInstance);
      setNetworkOk(true);
      setShowModal(false);
      setAlert({ type: 'success', message: 'Connected with WalletConnect' });
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'WalletConnect failed' });
    }
  };

  const disconnect = async () => {
    if (wcProvider) {
      try {
        await wcProvider.disconnect();
      } catch (e) {
        // ignore
      }
      setWcProvider(null);
    }
    reset();
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (!accounts.length) {
        reset();
      } else {
        setAddress(accounts[0]);
      }
    };
    const handleChainChanged = (chainId) => {
      setNetworkOk(chainId === celoChain.chainHex);
    };
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener?.('chainChanged', handleChainChanged);
      window.ethereum.on?.('accountsChanged', handleAccountsChanged);
      window.ethereum.on?.('chainChanged', handleChainChanged);
    }
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener?.('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const value = {
    address,
    provider,
    signer,
    networkOk,
    walletType,
    showModal,
    setShowModal,
    connectMetaMask,
    connectWalletConnect,
    disconnect,
    defaultProvider,
    alert,
    setAlert,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => useContext(WalletContext);
