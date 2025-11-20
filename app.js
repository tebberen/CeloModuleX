import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js'
import { MAIN_HUB_ABI, NFT_ABI, OWNER_ADDRESS } from './contractData.js'

// Core contract constants
const MAIN_HUB_ADDRESS = '0xece90BaADe9340826f1D4c77f5A42E6aA95F9B9f'
const NFT_CONTRACT_ADDRESS = '0xA246446F7E1C5b68C10673dfdf06e3961B1CE325'
const NFT_CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'hasNFT',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  // Keep the extended NFT ABI for price lookups and minting
  ...NFT_ABI.filter((item) => item?.name !== 'hasNFT'),
]

const CELO_CHAIN_ID = 42220
const CELO_CHAIN_HEX = '0xa4ec'
const CELO_CHAIN_DATA = {
  chainId: CELO_CHAIN_HEX,
  chainName: 'Celo Mainnet',
  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
  rpcUrls: ['https://forno.celo.org'],
  blockExplorerUrls: ['https://explorer.celo.org/mainnet'],
}
const READONLY_RPC = 'https://forno.celo.org'

// Simple in-memory session flags
let userAddress = null
let hasPremiumPass = false

const state = {
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  hasNft: false,
  nftPrice: null,
  nftMessage: '',
  minting: false,
}

const elements = {
  connect: document.getElementById('connect-btn'),
  disconnect: document.getElementById('disconnect-btn'),
  address: document.getElementById('current-address'),
  walletDisplay: document.getElementById('wallet-display'),
  walletAddressButton: document.getElementById('wallet-address'),
  walletDropdown: document.getElementById('wallet-dropdown'),
  navLinks: Array.from(document.querySelectorAll('.nav-pill')),
  sections: Array.from(document.querySelectorAll('.content')),
  networkLabel: document.getElementById('network-label'),
  networkStat: document.getElementById('network-stat'),
  totalUsers: document.getElementById('total-users'),
  totalActions: document.getElementById('total-actions'),
  networkWarning: document.getElementById('network-warning'),
  premiumPill: document.getElementById('premium-pill'),
  premiumStatus: document.getElementById('premium-status'),
  premiumStatusPill: document.getElementById('cmxPremiumStatus'),
  nftPricePrimary: document.getElementById('nft-price'),
  nftPriceSecondary: document.getElementById('nft-price-secondary'),
  nftOwnershipPrimary: document.getElementById('nft-ownership'),
  nftOwnershipSecondary: document.getElementById('nft-ownership-secondary'),
  nftStatusText: document.getElementById('nft-status-text'),
  nftStatusPill: document.getElementById('nft-status-pill'),
  nftPremiumHighlight: document.getElementById('nft-premium-highlight'),
  nftPremiumCard: document.getElementById('nft-premium-card'),
  premiumCardState: document.getElementById('cmxPremiumCardState'),
  ownerAddress: document.getElementById('owner-address'),
  profileWallet: document.getElementById('profile-wallet'),
  profileChain: document.getElementById('profile-chain'),
  profileNetwork: document.getElementById('profile-network'),
  profileNft: document.getElementById('profile-nft'),
  profilePremiumPill: document.getElementById('profile-premium-pill'),
  browseModules: document.getElementById('browse-modules'),
  mintNftButtons: [document.getElementById('cmxMintButton')],
  refreshNft: document.getElementById('refresh-nft'),
  nftMessage: document.getElementById('nft-message'),
  premiumBadges: Array.from(document.querySelectorAll('[data-premium-badge]')),
  premiumSections: Array.from(document.querySelectorAll('[data-premium="true"]')),
  highlightMintCta: document.getElementById('nft-highlight-cta'),
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

function setNetworkLabel(label) {
  if (elements.networkLabel) {
    elements.networkLabel.textContent = label
  }
  elements.networkStat.textContent = label
  elements.profileNetwork.textContent = label
}

function setNetworkWarning(message) {
  elements.networkWarning.textContent = message || ''
}

function syncPremiumFlag(hasPass) {
  hasPremiumPass = Boolean(hasPass)
  state.hasNft = hasPremiumPass
  updatePremiumUI()
}

function updatePremiumUI() {
  const statusLabel = hasPremiumPass ? 'Active' : 'Locked'
  if (elements.premiumStatus) {
    elements.premiumStatus.textContent = statusLabel
  }
  elements.premiumPill?.classList.toggle('active', hasPremiumPass)

  const premiumText = hasPremiumPass ? '✅ Premium Access Active' : '🔒 Premium Access Locked'
  ;[elements.nftPremiumHighlight, elements.nftPremiumCard].forEach((pill) => {
    if (!pill) return
    pill.textContent = premiumText
    pill.classList.toggle('active', hasPremiumPass)
  })

  if (elements.profilePremiumPill) {
    elements.profilePremiumPill.textContent = `Premium: ${statusLabel}`
    elements.profilePremiumPill.classList.toggle('active', hasPremiumPass)
  }

  elements.premiumBadges.forEach((badge) => {
    if (!badge) return
    badge.style.display = hasPremiumPass ? 'inline-flex' : 'none'
    badge.classList.toggle('active', hasPremiumPass)
  })

  elements.nftStatusPill?.classList.toggle('owned', hasPremiumPass)

  updatePremiumStatusUI()
  updateNftCardState()
  updatePremiumGates()
}

// UI helpers for premium state indicators
function updatePremiumStatusUI() {
  const pill = elements.premiumStatusPill
  if (!pill) return

  if (hasPremiumPass) {
    pill.textContent = 'Premium: Active'
    pill.classList.add('premium-active')
    pill.classList.remove('premium-locked')
  } else {
    pill.textContent = 'Premium: Locked'
    pill.classList.add('premium-locked')
    pill.classList.remove('premium-active')
  }
}

function updateNftCardState() {
  const stateEl = elements.premiumCardState
  const mintButton = elements.mintNftButtons?.[1]

  if (!stateEl || !mintButton) return

  if (hasPremiumPass) {
    stateEl.textContent = '✅ Premium Access Active'
    stateEl.classList.add('premium-active')
    mintButton.disabled = true
    mintButton.textContent = 'Already Minted'
    mintButton.classList.add('btn-disabled')
  } else {
    stateEl.textContent = '🔒 Premium Access Locked'
    stateEl.classList.remove('premium-active')
    const disableMint = state.minting || !state.account || state.chainId !== CELO_CHAIN_ID
    mintButton.disabled = disableMint
    mintButton.textContent = state.minting ? 'Minting…' : 'Mint Access Pass'
    mintButton.classList.toggle('btn-disabled', false)
  }
}

function updatePremiumGates() {
  elements.premiumSections.forEach((section) => {
    if (!section) return
    if (hasPremiumPass) {
      section.classList.remove('premium-locked-section')
    } else {
      section.classList.add('premium-locked-section')
    }
  })
}

function updateConnectionUI() {
  const connected = Boolean(state.account)
  const label = connected ? formatAddress(state.account) : 'Not connected'

  elements.address.textContent = label
  elements.address.parentElement?.classList.toggle('connected', connected)
  elements.profileWallet.textContent = label
  elements.profileChain.textContent = state.chainId ? state.chainId : '—'

  elements.connect?.classList.toggle('hidden', connected)
  elements.walletDisplay?.classList.toggle('visible', connected)
  elements.walletAddressButton?.setAttribute('aria-expanded', 'false')
  elements.walletDropdown?.classList.remove('open')
}

function toggleWalletDropdown(open) {
  if (!elements.walletDropdown || !elements.walletAddressButton) return
  const shouldOpen = open ?? !elements.walletDropdown.classList.contains('open')
  elements.walletDropdown.classList.toggle('open', shouldOpen)
  elements.walletAddressButton.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false')
}

function closeWalletDropdown() {
  toggleWalletDropdown(false)
}

function getProvider() {
  return state.provider || fallbackProvider
}

// Contract instantiation helpers
function getMainHubContract(useSigner = false) {
  const provider = useSigner && state.signer ? state.signer : getProvider()
  return new ethers.Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, provider)
}

function getNftContract(providerOrSigner) {
  const provider = providerOrSigner || state.signer || getProvider()
  return new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider)
}

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    setNetworkWarning('MetaMask is required to connect to Celo.')
    return
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const signer = provider.getSigner()
    const account = await signer.getAddress()
    let network = await provider.getNetwork()

    if (network.chainId !== CELO_CHAIN_ID) {
      await ensureCeloNetwork(true)
      network = await provider.getNetwork()
      state.chainId = network.chainId
    }

    state.provider = provider
    state.signer = signer
    state.account = account
    state.chainId = state.chainId ?? network.chainId
    userAddress = account
    syncPremiumFlag(false)

    const chainLabel = state.chainId === CELO_CHAIN_ID ? 'Celo Mainnet (chain 42220)' : `${network.name || 'Unknown'} (chain ${state.chainId})`
    const label = chainLabel
    setNetworkLabel(label)
    setNetworkWarning(network.chainId === CELO_CHAIN_ID ? '' : 'Please switch to Celo mainnet (42220).')

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
  userAddress = null
  state.hasNft = false
  state.nftPrice = null
  state.nftMessage = ''
  state.minting = false
  syncPremiumFlag(false)
  updateConnectionUI()
  setNetworkLabel('Not connected')
  setNetworkWarning('')
  updateNftUI()
}

async function ensureCeloNetwork(promptAdd = false) {
  if (!window.ethereum || state.chainId === CELO_CHAIN_ID) return
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CELO_CHAIN_HEX }],
    })
    state.chainId = CELO_CHAIN_ID
  } catch (err) {
    console.warn('Network switch failed', err)
    if (promptAdd && err?.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CELO_CHAIN_DATA],
        })
        state.chainId = CELO_CHAIN_ID
      } catch (addErr) {
        console.warn('Failed to add Celo network', addErr)
        throw addErr
      }
    }
  }
}

async function loadMainHubStats() {
  try {
    const contract = getMainHubContract()
    const [users, actions] = await Promise.all([
      contract.totalUsers().catch(() => null),
      contract.totalGlobalActions().catch(() => null),
    ])

    elements.totalUsers.textContent = users ? users.toString() : '0'
    elements.totalActions.textContent = actions ? actions.toString() : '0'
  } catch (err) {
    console.error('Unable to load main hub stats', err)
    elements.totalUsers.textContent = '0'
    elements.totalActions.textContent = '0'
  }
}

// UI updates for NFT data and premium affordances
function updateNftUI() {
  const priceLabel = '1 CELO'
  elements.nftPricePrimary?.textContent = priceLabel
  elements.nftPriceSecondary.textContent = priceLabel

  let ownershipText = 'Connect wallet to check ownership'
  let message = state.nftMessage || ''
  const ownsPass = hasPremiumPass

  if (state.chainId && state.chainId !== CELO_CHAIN_ID) {
    ownershipText = 'Wrong network'
    message = 'Please switch to Celo Mainnet to mint the Access Pass.'
  } else if (state.account) {
    ownershipText = ownsPass ? 'You already own the pass' : 'No access pass found'
    if (!message && ownsPass) message = 'You already own the Access Pass.'
  }
  elements.nftOwnershipPrimary?.textContent = ownershipText
  elements.nftOwnershipSecondary.textContent = ownershipText

  elements.nftStatusText?.textContent = ownsPass ? '✅ Premium Access Active' : "You don't own this NFT yet"
  elements.nftStatusPill?.classList.toggle('owned', ownsPass)
  elements.profileNft.textContent = ownsPass ? 'Owned' : 'Not owned'

  const disableMint = state.chainId !== CELO_CHAIN_ID || !state.account || ownsPass || state.minting
  elements.mintNftButtons.forEach((btn) => {
    if (!btn) return
    btn.disabled = disableMint
    btn.textContent = state.minting
      ? 'Minting…'
      : ownsPass
        ? 'Already minted'
        : 'Mint Access NFT'
  })

  if (elements.nftMessage) {
    elements.nftMessage.textContent = message
  }

  updatePremiumUI()
}

// Helper to read NFT mint price with fallback
async function fetchNftPrice() {
  const contract = getNftContract(state.signer || getProvider())

  try {
    return await contract.getNFTPrice()
  } catch (err) {
    console.warn('getNFTPrice() lookup failed, trying fallback', err)
  }

  if (typeof contract.currentPrice === 'function') {
    try {
      return await contract.currentPrice()
    } catch (err) {
      console.error('Fallback price lookup failed', err)
    }
  }

  throw new Error('Unable to fetch NFT price')
}

async function loadNftData() {
  const contract = getNftContract(state.signer || getProvider())
  try {
    const price = await fetchNftPrice()
    state.nftPrice = price
  } catch (err) {
    console.warn('Price lookup failed', err)
    state.nftPrice = null
  }

  if (!state.account) {
    userAddress = null
    syncPremiumFlag(false)
    state.nftMessage = ''
    updateNftUI()
    return
  }

  userAddress = state.account

  if (state.chainId && state.chainId !== CELO_CHAIN_ID) {
    syncPremiumFlag(false)
    state.nftMessage = 'Please switch to Celo Mainnet to mint the Access Pass.'
    updateNftUI()
    return
  }

  // Premium state fetch (hasNFT)
  try {
    const has = await contract.hasNFT(state.account)
    syncPremiumFlag(has)
    state.nftMessage = has ? 'You already own the Access Pass.' : ''
  } catch (err) {
    console.warn('Ownership lookup failed', err)
    syncPremiumFlag(false)
    state.nftMessage = 'Unable to check ownership right now.'
  }

  updateNftUI()
}

// NFT mint flow (CMXAccessPass.mintNFT)
async function handleMintClick() {
  if (!state.account || !state.signer) {
    state.nftMessage = 'Connect your wallet before minting.'
    updateNftUI()
    return
  }

  if (state.chainId !== CELO_CHAIN_ID) {
    state.nftMessage = 'Switch to Celo Mainnet to mint the Access Pass.'
    updateNftUI()
    return
  }

  try {
    state.minting = true
    state.nftMessage = ''
    updateNftUI()

    const price = state.nftPrice || (await fetchNftPrice())
    const contract = getNftContract(state.signer) // signer-backed instance for minting
    const tx = await contract.mintNFT({ value: price })
    state.nftMessage = 'Transaction submitted. Waiting for confirmation...'
    updateNftUI()

    await tx.wait()
    await loadNftData()
    state.nftMessage = 'Access Pass minted successfully!'
  } catch (err) {
    console.error('Mint failed', err)
    state.nftMessage = err?.message || 'Mint failed. Please try again.'
  }

  state.minting = false
  updateNftUI()
}

async function refreshData() {
  await Promise.all([loadMainHubStats(), loadNftData()])
}

function donate(amount) {
  alert(`Placeholder: would donate ${amount} CELO`)
}

function subscribeToWalletEvents() {
  if (!window.ethereum || window.ethereum._celoModuleXHooked) return
  window.ethereum._celoModuleXHooked = true

  window.ethereum.on('accountsChanged', (accounts) => {
    state.account = accounts[0] || null
    userAddress = state.account
    syncPremiumFlag(false)
    updateConnectionUI()
    loadNftData()
  })

  window.ethereum.on('chainChanged', (chainIdHex) => {
    const chainId = parseInt(chainIdHex, 16)
    state.chainId = chainId
    syncPremiumFlag(false)
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

elements.walletAddressButton?.addEventListener('click', (event) => {
  event.stopPropagation()
  toggleWalletDropdown()
})

elements.disconnect.addEventListener('click', () => {
  disconnect()
  closeWalletDropdown()
})

document.addEventListener('click', (event) => {
  if (!elements.walletDropdown?.classList.contains('open')) return
  if (!elements.walletDisplay?.contains(event.target)) {
    closeWalletDropdown()
  }
})

elements.refreshNft.addEventListener('click', () => loadNftData())

elements.mintNftButtons.forEach((btn) => btn?.addEventListener('click', handleMintClick))

document.querySelectorAll('.quick-donate').forEach((btn) => {
  btn.addEventListener('click', () => donate(btn.dataset.amount))
})

elements.browseModules?.addEventListener('click', () => {
  showSection('modules')
  document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
})

elements.highlightMintCta?.addEventListener('click', () => {
  showSection('nft')
  document.getElementById('nft')?.scrollIntoView({ behavior: 'smooth' })
})

updateConnectionUI()
setNetworkLabel('Not connected')
loadMainHubStats()
loadNftData()
ensureCeloNetwork()
