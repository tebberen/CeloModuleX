import { useState, useEffect, useCallback } from 'react';
import { getProvider } from '../services/blockchain';
import { switchToCeloNetwork } from '../utils/networks';

export const useWallet = () => {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState('');

  const checkConnection = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        setChainId(chainId);
        
        if (chainId !== '0xa4ec') {
          await switchToCeloNetwork();
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  }, []);

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAddress('');
          setIsConnected(false);
        } else {
          setAddress(accounts[0]);
          setIsConnected(true);
          checkConnection();
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(chainId);
        window.location.reload();
      });
    }
  }, [checkConnection]);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return false;
    }

    setIsConnecting(true);
    try {
      await switchToCeloNetwork();
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setAddress(accounts[0]);
      setIsConnected(true);
      return true;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    alert('WalletConnect integration would go here');
    return false;
  };

  const disconnect = () => {
    setAddress('');
    setIsConnected(false);
    setChainId('');
  };

  return {
    address,
    isConnected,
    isConnecting,
    chainId,
    connectMetaMask,
    connectWalletConnect,
    disconnect,
    checkConnection
  };
};
