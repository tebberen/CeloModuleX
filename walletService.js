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
  await window.ethereum.request({
    method: 'wallet_requestPermissions',
    params: [{ eth_accounts: {} }],
  })
  await window.ethereum.request({ method: 'eth_requestAccounts' })
  await ensureSupportedNetwork(web3Provider)
  signer = web3Provider.getSigner()
  connectedAccount = await signer.getAddress()
  attachEip1193Listeners(window.ethereum)
  return connectedAccount
}

export async function connectWalletConnect() {
  const UniversalProvider =
    window?.WalletConnectUniversalProvider?.default ||
    window?.WalletConnectUniversalProvider ||
    window?.UniversalProvider?.default ||
    window?.UniversalProvider

  if (!UniversalProvider) {
    throw new Error('WalletConnect Universal Provider failed to load.')
  }

  try {
    walletConnectProvider = await UniversalProvider.init({
      projectId: WALLET_CONNECT_PROJECT_ID,
      rpcMap: rpcMap(),
    })

    walletConnectProvider.on?.('modal_closed', error => {
      console.error('WalletConnect modal closed before connecting', error)
    })

    await walletConnectProvider.connect({
      namespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: [
            `eip155:${NETWORKS.mainnet.chainId}`,
            `eip155:${NETWORKS.alfajores.chainId}`,
          ],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: rpcMap(),
        },
      },
    })
  } catch (error) {
    console.error('WalletConnect connection failed', error)
    throw error
  }

  connectionType = 'walletconnect'
  web3Provider = new ethers.providers.Web3Provider(walletConnectProvider, 'any')
  await ensureSupportedNetwork(web3Provider)
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
  const desiredChain = DEFAULT_NETWORK
  const network = await provider.getNetwork()
  if (network.chainId === desiredChain.chainId) {
    return
  }

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

  const updatedNetwork = await provider.getNetwork()
  if (updatedNetwork.chainId !== desiredChain.chainId) {
    throw new Error(`Please switch your wallet to ${desiredChain.name} (${desiredChain.chainId}) to continue.`)
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
