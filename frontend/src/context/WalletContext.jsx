import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserProvider } from 'ethers'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { CELO_CHAIN_ID_DECIMAL, CELO_CHAIN_ID_HEX, CELO_PARAMS } from '../utils/networks'

export const WalletContext = createContext(null)

const WALLETCONNECT_PROJECT_ID = '94fdbe0207d7430aaf0e9a5699a23a89'

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [address, setAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [chainError, setChainError] = useState('')
  const [wcProvider, setWcProvider] = useState(null)

  const resetState = useCallback(() => {
    setProvider(null)
    setSigner(null)
    setAddress('')
    setIsConnected(false)
  }, [])

  const ensureCeloNetwork = useCallback(async (ethProvider) => {
    const currentChain = await ethProvider.request({ method: 'eth_chainId' })
    if (parseInt(currentChain, 16) !== CELO_CHAIN_ID_DECIMAL) {
      try {
        await ethProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CELO_CHAIN_ID_HEX }],
        })
      } catch (switchErr) {
        await ethProvider.request({
          method: 'wallet_addEthereumChain',
          params: [CELO_PARAMS],
        })
      }
    }
  }, [])

  const connectMetaMask = useCallback(async () => {
    setChainError('')
    if (!window.ethereum) {
      setChainError('MetaMask not detected in this browser.')
      return
    }
    try {
      await ensureCeloNetwork(window.ethereum)
      const browserProvider = new BrowserProvider(window.ethereum)
      await browserProvider.send('eth_requestAccounts', [])
      const signerInstance = await browserProvider.getSigner()
      const userAddress = await signerInstance.getAddress()

      setProvider(browserProvider)
      setSigner(signerInstance)
      setAddress(userAddress)
      setIsConnected(true)
    } catch (err) {
      setChainError(err.message)
    }
  }, [ensureCeloNetwork])

  const connectWalletConnect = useCallback(async () => {
    setChainError('')
    try {
      const ethProvider = await EthereumProvider.init({
        projectId: WALLETCONNECT_PROJECT_ID,
        chains: [CELO_CHAIN_ID_DECIMAL],
        optionalChains: [CELO_CHAIN_ID_DECIMAL],
        showQrModal: true,
      })
      await ethProvider.enable()
      await ensureCeloNetwork(ethProvider)

      const browserProvider = new BrowserProvider(ethProvider)
      const signerInstance = await browserProvider.getSigner()
      const userAddress = await signerInstance.getAddress()

      setProvider(browserProvider)
      setSigner(signerInstance)
      setAddress(userAddress)
      setIsConnected(true)
      setWcProvider(ethProvider)
    } catch (err) {
      setChainError(err.message)
    }
  }, [ensureCeloNetwork])

  const disconnect = useCallback(async () => {
    try {
      if (wcProvider) {
        await wcProvider.disconnect()
      }
    } catch (err) {
      console.error('wallet disconnect error', err)
    } finally {
      resetState()
    }
  }, [wcProvider, resetState])

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts) => {
      if (!accounts || accounts.length === 0) {
        resetState()
        return
      }
      setAddress(accounts[0])
      setIsConnected(true)
    }

    window.ethereum.on?.('accountsChanged', handleAccountsChanged)
    return () => {
      window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged)
    }
  }, [resetState])

  const value = useMemo(
    () => ({ provider, signer, address, isConnected, chainError, connectMetaMask, connectWalletConnect, disconnect }),
    [provider, signer, address, isConnected, chainError, connectMetaMask, connectWalletConnect, disconnect]
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
