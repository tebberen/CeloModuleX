import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserProvider, JsonRpcProvider, Provider, Signer } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

interface WalletContextShape {
  address: string | null;
  chainId: number | null;
  provider: BrowserProvider | null;
  signer: Signer | null;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  connecting: boolean;
  connectMetaMask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextShape | undefined>(undefined);

const CELO_CHAIN_ID = 42220;
const CELO_RPC = 'https://forno.celo.org';

export const rpcProvider = new JsonRpcProvider({ url: CELO_RPC, timeout: 20_000 }, CELO_CHAIN_ID);

let walletConnectProvider: EthereumProvider | null = null;

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [providerType, setProviderType] = useState<'metamask' | 'walletconnect' | null>(null);

  const resetState = () => {
    setAddress(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
    setProviderType(null);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      resetState();
      return;
    }
    setAddress(accounts[0]);
  };

  const handleChainChanged = (newChainId: number | string) => {
    const parsed = typeof newChainId === 'string' ? parseInt(newChainId, 16) : Number(newChainId);
    setChainId(parsed);
  };

  const connectMetaMask = async () => {
    if (connecting) return;
    setConnecting(true);
    try {
      const { ethereum } = window as typeof window & { ethereum?: Provider };
      if (!ethereum) {
        throw new Error('MetaMask not detected. Please install it to continue.');
      }
      const mmProvider = new BrowserProvider(ethereum, 'any');
      const signerInstance = await mmProvider.getSigner();
      const account = await signerInstance.getAddress();
      const network = await mmProvider.getNetwork();

      setProvider(mmProvider);
      setSigner(signerInstance);
      setAddress(account);
      setChainId(Number(network.chainId));
      setProviderType('metamask');

      ethereum.on?.('accountsChanged', handleAccountsChanged);
      ethereum.on?.('chainChanged', handleChainChanged);
    } finally {
      setConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    if (connecting) return;
    setConnecting(true);
    try {
      if (!walletConnectProvider) {
        walletConnectProvider = await EthereumProvider.init({
          projectId: '4f3cfc1c9c7147b2afacb2ca2f54f0b0',
          chains: [CELO_CHAIN_ID],
          showQrModal: true,
          rpcMap: { [CELO_CHAIN_ID]: CELO_RPC },
          metadata: {
            name: 'CeloModuleX',
            description: 'Modular on-chain hub for Celo.',
            url: 'https://tebberen.github.io/CeloModuleX/',
            icons: ['https://tebberen.github.io/CeloModuleX/favicon.svg']
          }
        });
      }

      await walletConnectProvider.connect();

      const wcProvider = new BrowserProvider(walletConnectProvider as unknown as Provider, 'any');
      const signerInstance = await wcProvider.getSigner();
      const account = await signerInstance.getAddress();
      const network = await wcProvider.getNetwork();

      setProvider(wcProvider);
      setSigner(signerInstance);
      setAddress(account);
      setChainId(Number(network.chainId));
      setProviderType('walletconnect');

      walletConnectProvider.on('accountsChanged', handleAccountsChanged);
      walletConnectProvider.on('chainChanged', handleChainChanged);
      walletConnectProvider.on('disconnect', () => resetState());
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    if (providerType === 'walletconnect' && walletConnectProvider) {
      await walletConnectProvider.disconnect();
    }
    resetState();
  };

  useEffect(() => {
    const { ethereum } = window as typeof window & { ethereum?: Provider & { on?: (...args: any[]) => void } };
    if (!ethereum) return;

    const checkConnection = async () => {
      try {
        const accounts = (await ethereum.request?.({ method: 'eth_accounts' })) as string[] | undefined;
        if (accounts && accounts.length > 0) {
          const mmProvider = new BrowserProvider(ethereum, 'any');
          const signerInstance = await mmProvider.getSigner();
          const network = await mmProvider.getNetwork();
          setProvider(mmProvider);
          setSigner(signerInstance);
          setAddress(accounts[0]);
          setChainId(Number(network.chainId));
          setProviderType('metamask');
        }
      } catch (error) {
        console.error('Failed to restore MetaMask session', error);
      }
    };

    checkConnection();

    ethereum.on?.('accountsChanged', handleAccountsChanged);
    ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged as any);
      ethereum.removeListener?.('chainChanged', handleChainChanged as any);
    };
  }, []);

  const value = useMemo(
    () => ({
      address,
      chainId,
      provider,
      signer,
      isConnected: Boolean(address),
      isCorrectNetwork: chainId === CELO_CHAIN_ID,
      connecting,
      connectMetaMask,
      connectWalletConnect,
      disconnect
    }),
    [address, chainId, provider, signer, connecting]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return ctx;
};
