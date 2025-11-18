import { DEFAULT_NETWORK, NETWORKS, WALLET_CONNECT_PROJECT_ID } from './constants.js'

const { ethers } = window

let web3Provider
let signer
let connectedAccount
let connectionType = 'unknown'
let walletConnectProvider

function rpcMap() {
  return {
    [NETWORKS.mainnet.chainId]: NETWORKS.mainnet.rpcUrl,
    [NETWORKS.alfajores.chainId]: NETWORKS.alfajores.rpcUrl,
  }
}

export async function connectMetaMask() {
  if (!window.ethereum) {
    throw new Error('MetaMask not detected. Please install it to continue.')
  }

  connectionType = 'metamask'
  web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  await window.ethereum.request({ method: 'eth_requestAccounts' })
  await ensureSupportedNetwork(web3Provider)
  signer = web3Provider.getSigner()
  connectedAccount = await signer.getAddress()
  attachEip1193Listeners(window.ethereum)
  return connectedAccount
}

export async function connectWalletConnect() {
  if (!window.EthereumProvider) {
    throw new Error('WalletConnect provider failed to load.')
  }

  walletConnectProvider = await window.EthereumProvider.init({
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: [DEFAULT_NETWORK.chainId],
    optionalChains: [NETWORKS.mainnet.chainId, NETWORKS.alfajores.chainId],
    rpcMap: rpcMap(),
    showQrModal: true,
  })

  await walletConnectProvider.connect()
  connectionType = 'walletconnect'
  web3Provider = new ethers.providers.Web3Provider(walletConnectProvider, 'any')
  signer = web3Provider.getSigner()
  connectedAccount = await signer.getAddress()
  attachEip1193Listeners(walletConnectProvider)
  return connectedAccount
}

function attachEip1193Listeners(provider) {
  provider.removeAllListeners?.()
  provider.on?.('accountsChanged', accounts => {
    connectedAccount = accounts?.[0]
  })
  provider.on?.('chainChanged', async () => {
    await ensureSupportedNetwork(web3Provider)
  })
  provider.on?.('disconnect', () => {
    resetConnection()
  })
}

async function ensureSupportedNetwork(provider) {
  const network = await provider.getNetwork()
  const supported = [NETWORKS.mainnet.chainId, NETWORKS.alfajores.chainId]

  if (!supported.includes(network.chainId)) {
    const desiredChain = DEFAULT_NETWORK
    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: desiredChain.chainIdHex }])
    } catch (switchError) {
      if (switchError.code === 4902 || switchError.message?.includes('Unrecognized chain ID')) {
        await provider.send('wallet_addEthereumChain', [
          {
            chainId: desiredChain.chainIdHex,
            chainName: desiredChain.name,
            rpcUrls: [desiredChain.rpcUrl],
            nativeCurrency: desiredChain.nativeCurrency,
            blockExplorerUrls: [desiredChain.explorer],
          },
        ])
      } else {
        throw switchError
      }
    }
  }
}

export function getProvider() {
  if (!web3Provider) {
    throw new Error('Wallet is not connected yet.')
  }
  return web3Provider
}

export function getSigner() {
  if (!signer) {
    throw new Error('Wallet is not connected yet.')
  }
  return signer
}

export async function getCurrentNetwork() {
  if (!web3Provider) return null
  const { chainId, name } = await web3Provider.getNetwork()
  return { chainId, name }
}

export function getConnectionMeta() {
  return { account: connectedAccount, type: connectionType }
}

export function resetConnection() {
  web3Provider = undefined
  signer = undefined
  connectedAccount = undefined
  connectionType = 'unknown'
  walletConnectProvider?.disconnect?.()
}
