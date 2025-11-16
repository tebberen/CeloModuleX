import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { CELO_PARAMS } from "../utils/networks.js";

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [wcProvider, setWcProvider] = useState(null);

  const resetState = () => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  const ensureCeloNetwork = async (ethProvider) => {
    const currentChainId = await ethProvider.request({ method: "eth_chainId" });
    if (currentChainId !== CELO_PARAMS.chainId) {
      try {
        await ethProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CELO_PARAMS.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await ethProvider.request({
            method: "wallet_addEthereumChain",
            params: [CELO_PARAMS],
          });
        } else {
          throw switchError;
        }
      }
    }
  };

  const attachProvider = useCallback(async (ethProvider) => {
    const web3Provider = new ethers.providers.Web3Provider(ethProvider, "any");
    const network = await web3Provider.getNetwork();
    if (network.chainId !== parseInt(CELO_PARAMS.chainId, 16)) {
      throw new Error("Please switch to Celo Mainnet (42220)");
    }
    setProvider(web3Provider);
    const walletSigner = web3Provider.getSigner();
    setSigner(walletSigner);
    const userAddress = await walletSigner.getAddress();
    setAddress(userAddress);
    setChainId(network.chainId);
  }, []);

  const connectMetamask = useCallback(async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      const { ethereum } = window;
      if (!ethereum) throw new Error("MetaMask not found");
      await ensureCeloNetwork(ethereum);
      await ethereum.request({ method: "eth_requestAccounts" });
      await attachProvider(ethereum);
    } finally {
      setIsConnecting(false);
    }
  }, [attachProvider, isConnecting]);

  const connectWalletConnect = useCallback(async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo";
      const providerInstance = await EthereumProvider.init({
        projectId,
        chains: [parseInt(CELO_PARAMS.chainId, 16)],
        optionalChains: [parseInt(CELO_PARAMS.chainId, 16)],
        rpcMap: {
          [parseInt(CELO_PARAMS.chainId, 16)]: CELO_PARAMS.rpcUrls[0],
        },
        showQrModal: true,
      });
      await providerInstance.enable();
      setWcProvider(providerInstance);
      await attachProvider(providerInstance);
    } finally {
      setIsConnecting(false);
    }
  }, [attachProvider, isConnecting]);

  const disconnect = useCallback(async () => {
    if (wcProvider) {
      await wcProvider.disconnect();
      setWcProvider(null);
    }
    resetState();
  }, [wcProvider]);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (!accounts || accounts.length === 0) {
        resetState();
      } else {
        setAddress(accounts[0]);
        setSigner((prev) => (prev ? prev : new ethers.providers.Web3Provider(ethereum).getSigner()));
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const value = useMemo(
    () => ({
      address,
      provider,
      signer,
      chainId,
      isConnecting,
      connectMetamask,
      connectWalletConnect,
      disconnect,
    }),
    [address, provider, signer, chainId, isConnecting, connectMetamask, connectWalletConnect, disconnect]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
