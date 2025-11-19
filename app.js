import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js'
import {
  MAIN_HUB_ADDRESS,
  MAIN_HUB_ABI,
  NFT_ADDRESS,
  NFT_ABI,
  OWNER_ADDRESS,
} from './contractData.js'

const CELO_CHAIN_ID = 42220
const CELO_CHAIN_HEX = '0xa4ec'
const READONLY_RPC = 'https://forno.celo.org'

const state = {
  provider: null,
  signer: null,
  account: null,
  chainId: null,
}

const elements = {
  connect: document.getElementById('connect-btn'),
  disconnect: document.getElementById('disconnect-btn'),
  address: document.getElementById('current-address'),
  navLinks: Array.from(document.querySelectorAll('.nav-link')),
  sections: Array.from(document.querySelectorAll('.panel')),
  networkLabel: document.getElementById('network-label'),
  totalUsers: document.getElementById('total-users'),
  totalActions: document.getElementById('total-actions'),
  networkWarning: document.getElementById('network-warning'),
  nftPrice: document.getElementById('nft-price'),
  nftOwnership: document.getElementById('nft-ownership'),
  refreshNft: document.getElementById('refresh-nft'),
  ownerAddress: document.getElementById('owner-address'),
  profileWallet: document.getElementById('profile-wallet'),
  profileChain: document.getElementById('profile-chain'),
}

elements.ownerAddress.textContent = OWNER_ADDRESS

const fallbackProvider = new ethers.providers.JsonRpcProvider(READONLY_RPC)

function showSection(target) {
  elements.sections.forEach((section) => {
    const active = section.id === target
    section.classList.toggle('active', active)
  })

  elements.navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === target)
  })
}

function formatAddress(address) {
  if (!address) return 'Not connected'
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function updateConnectionUI() {
  const connected = Boolean(state.account)
  const label = connected ? formatAddress(state.account) : 'Not connected'
  elements.address.textContent = label
  elements.address.classList.toggle('connected', connected)
  elements.address.classList.toggle('muted', !connected)
  elements.profileWallet.textContent = label
  elements.profileChain.textContent = state.chainId ? state.chainId : '—'
  elements.connect.disabled = connected
  elements.disconnect.disabled = !connected
}

function setNetworkWarning(message) {
  elements.networkWarning.textContent = message || ''
}

function setNetworkLabel(label) {
  elements.networkLabel.textContent = label
}

function getProvider() {
  return state.provider || fallbackProvider
}

function getMainHubContract(useSigner = false) {
  const provider = useSigner && state.signer ? state.signer : getProvider()
  return new ethers.Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, provider)
}

function getNftContract(useSigner = false) {
  const provider = useSigner && state.signer ? state.signer : getProvider()
  return new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider)
}

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    setNetworkWarning('MetaMask is required to connect to Celo.')
    return
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const account = await signer.getAddress()
    const network = await provider.getNetwork()

    state.provider = provider
    state.signer = signer
    state.account = account
    state.chainId = network.chainId

    if (network.chainId !== CELO_CHAIN_ID) {
      setNetworkWarning('You are connected to the wrong chain. Please switch to Celo mainnet (42220).')
    } else {
      setNetworkWarning('')
    }

    setNetworkLabel(`${network.name || 'Unknown'} (chain ${network.chainId})`)
    updateConnectionUI()
    await refreshData()
    subscribeToWalletEvents()
  } catch (err) {
    console.error(err)
    setNetworkWarning(err.message || 'Failed to connect wallet')
  }
}

function disconnect() {
  state.provider = null
  state.signer = null
  state.account = null
  state.chainId = null
  updateConnectionUI()
  setNetworkLabel('Not connected')
  setNetworkWarning('')
}

async function ensureCeloNetwork() {
  if (!window.ethereum || state.chainId === CELO_CHAIN_ID) return
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CELO_CHAIN_HEX }],
    })
  } catch (err) {
    console.warn('Network switch failed', err)
  }
}

async function loadMainHubStats() {
  try {
    const contract = getMainHubContract()
    const [users, actions] = await Promise.all([
      contract.totalUsers().catch(() => null),
      contract.totalGlobalActions().catch(() => null),
    ])

    elements.totalUsers.textContent = users ? users.toString() : 'Unavailable'
    elements.totalActions.textContent = actions ? actions.toString() : 'Unavailable'
  } catch (err) {
    console.error('Unable to load main hub stats', err)
    elements.totalUsers.textContent = 'Unavailable'
    elements.totalActions.textContent = 'Unavailable'
  }
}

async function loadNftData() {
  const contract = getNftContract()
  try {
    const price = await contract.getNFTPrice()
    elements.nftPrice.textContent = `${ethers.utils.formatEther(price)} CELO`
  } catch (err) {
    console.warn('Price lookup failed', err)
    elements.nftPrice.textContent = 'Unavailable'
  }

  if (!state.account) {
    elements.nftOwnership.textContent = 'Connect wallet to check ownership'
    return
  }

  try {
    const has = await contract.hasNFT(state.account)
    elements.nftOwnership.textContent = has ? 'You already own the pass' : 'No access pass found'
  } catch (err) {
    console.warn('Ownership lookup failed', err)
    elements.nftOwnership.textContent = 'Unable to verify ownership'
  }
}

async function refreshData() {
  await Promise.all([loadMainHubStats(), loadNftData()])
}

function subscribeToWalletEvents() {
  if (!window.ethereum || window.ethereum._celoModuleXHooked) return
  window.ethereum._celoModuleXHooked = true

  window.ethereum.on('accountsChanged', (accounts) => {
    state.account = accounts[0] || null
    updateConnectionUI()
    loadNftData()
  })

  window.ethereum.on('chainChanged', (chainIdHex) => {
    const chainId = parseInt(chainIdHex, 16)
    state.chainId = chainId
    setNetworkLabel(`Chain ${chainId}`)
    setNetworkWarning(chainId === CELO_CHAIN_ID ? '' : 'Please switch to Celo mainnet (42220).')
    ensureCeloNetwork()
    updateConnectionUI()
    refreshData()
  })
}

elements.navLinks.forEach((link) => {
  link.addEventListener('click', () => showSection(link.dataset.target))
})

elements.connect.addEventListener('click', connectWallet)

elements.disconnect.addEventListener('click', () => disconnect())

elements.refreshNft.addEventListener('click', () => loadNftData())

updateConnectionUI()
setNetworkLabel('Not connected')
loadMainHubStats()
loadNftData()
ensureCeloNetwork()
