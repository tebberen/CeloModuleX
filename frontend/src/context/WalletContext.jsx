import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { formatChainAsHex } from '../utils/networks';

export const WalletContext = createContext();

const CELO_CHAIN_ID = 42220;
const LOCAL_STORAGE_KEY = 'cmx-wallet-provider';

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connectionType, setConnectionType] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoTried, setAutoTried] = useState(false);
  const wcProviderRef = useRef(null);

  const resetState = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setConnectionType(null);
  }, []);

  const handleChain = useCallback(
    async (nextProvider) => {
      const chainId = await nextProvider.request({ method: 'eth_chainId' });
      const numericChainId = Number(chainId);
      if (numericChainId !== CELO_CHAIN_ID) {
        try {
          await nextProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: formatChainAsHex(CELO_CHAIN_ID) }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await nextProvider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: formatChainAsHex(CELO_CHAIN_ID),
                  chainName: 'Celo Mainnet',
                  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
                  rpcUrls: ['https://forno.celo.org'],
                  blockExplorerUrls: ['https://celoscan.io'],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }
    },
    []
  );

  const attachEvents = useCallback(
    (injectedProvider) => {
      injectedProvider.on('accountsChanged', (accounts) => {
        setAccount(accounts?.[0] ?? null);
        if (!accounts || accounts.length === 0) {
          resetState();
        }
      });

      injectedProvider.on('chainChanged', async (chainId) => {
        const numericChainId = Number(chainId);
        if (numericChainId !== CELO_CHAIN_ID) {
          setError('Please switch to Celo Mainnet (42220).');
        } else {
          setError('');
        }
      });

      injectedProvider.on('disconnect', () => {
        disconnect();
      });
    },
    [resetState]
  );

  const connectMetaMask = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not detected');
    }
    const injectedProvider = window.ethereum;
    await handleChain(injectedProvider);
    const accounts = await injectedProvider.request({ method: 'eth_requestAccounts' });
    const ethersProvider = new ethers.providers.Web3Provider(injectedProvider, 'any');
    attachEvents(injectedProvider);
    setAccount(accounts[0]);
    setProvider(ethersProvider);
    setConnectionType('metamask');
    localStorage.setItem(LOCAL_STORAGE_KEY, 'metamask');
  }, [attachEvents, handleChain]);

  const connectWalletConnect = useCallback(async () => {
    const wcProvider = await EthereumProvider.init({
      projectId: '8b020ffbb31e5aba14160c27ca26540b',
      chains: [CELO_CHAIN_ID],
      optionalChains: [CELO_CHAIN_ID],
      showQrModal: true,
      rpcMap: { [CELO_CHAIN_ID]: 'https://forno.celo.org' },
      metadata: {
        name: 'CeloModuleX',
        description: 'CeloModuleX Access Pass',
        url: 'https://celomodulex.io',
        icons: [],
      },
    });

    wcProviderRef.current = wcProvider;
    await wcProvider.connect();
    await handleChain(wcProvider);
    const accounts = await wcProvider.request({ method: 'eth_accounts' });
    const ethersProvider = new ethers.providers.Web3Provider(wcProvider, 'any');
    attachEvents(wcProvider);
    setAccount(accounts[0]);
    setProvider(ethersProvider);
    setConnectionType('walletconnect');
    localStorage.setItem(LOCAL_STORAGE_KEY, 'walletconnect');
  }, [attachEvents, handleChain]);

  const connect = useCallback(
    async (type) => {
      setConnecting(true);
      setError('');
      try {
        if (type === 'metamask') {
          await connectMetaMask();
        } else {
          await connectWalletConnect();
        }
        setIsModalOpen(false);
      } catch (err) {
        setError(err.message || 'Connection failed');
        console.error(err);
        resetState();
      } finally {
        setConnecting(false);
      }
    },
    [connectMetaMask, connectWalletConnect, resetState]
  );

  const disconnect = useCallback(async () => {
    if (wcProviderRef.current) {
      try {
        await wcProviderRef.current.disconnect();
      } catch (err) {
        console.warn('WalletConnect disconnect error', err);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    resetState();
  }, [resetState]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved && !autoTried) {
      connect(saved).finally(() => setAutoTried(true));
    } else {
      setAutoTried(true);
    }
  }, [autoTried, connect]);

  const value = useMemo(
    () => ({
      account,
      provider,
      connectionType,
      connect,
      disconnect,
      connecting,
      error,
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    }),
    [account, provider, connectionType, connect, disconnect, connecting, error, isModalOpen]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
