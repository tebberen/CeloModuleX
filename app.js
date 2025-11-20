import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js'
import { MAIN_HUB_ADDRESS, MAIN_HUB_ABI, NFT_ADDRESS, NFT_ABI, OWNER_ADDRESS } from './contractData.js'

const CELO_CHAIN_ID = 42220
const CELO_CHAIN_HEX = '0xa4ec'
const READONLY_RPC = 'https://forno.celo.org'

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
  navLinks: Array.from(document.querySelectorAll('.nav-pill')),
  sections: Array.from(document.querySelectorAll('.content')),
  networkLabel: document.getElementById('network-label'),
  networkStat: document.getElementById('network-stat'),
  totalUsers: document.getElementById('total-users'),
  totalActions: document.getElementById('total-actions'),
  networkWarning: document.getElementById('network-warning'),
  nftPricePrimary: document.getElementById('nft-price'),
  nftPriceSecondary: document.getElementById('nft-price-secondary'),
  nftOwnershipPrimary: document.getElementById('nft-ownership'),
  nftOwnershipSecondary: document.getElementById('nft-ownership-secondary'),
  nftStatusText: document.getElementById('nft-status-text'),
  nftStatusPill: document.getElementById('nft-status-pill'),
  ownerAddress: document.getElementById('owner-address'),
  profileWallet: document.getElementById('profile-wallet'),
  profileChain: document.getElementById('profile-chain'),
  profileNetwork: document.getElementById('profile-network'),
  profileNft: document.getElementById('profile-nft'),
  browseModules: document.getElementById('browse-modules'),
  mintNftButtons: [document.getElementById('mint-nft'), document.getElementById('mint-nft-secondary')],
  refreshNft: document.getElementById('refresh-nft'),
  nftMessage: document.getElementById('nft-message'),
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
  elements.networkLabel.textContent = label
  elements.networkStat.textContent = label
  elements.profileNetwork.textContent = label
}

function setNetworkWarning(message) {
  elements.networkWarning.textContent = message || ''
}

function updateConnectionUI() {
  const connected = Boolean(state.account)
  const label = connected ? formatAddress(state.account) : 'Not connected'

  elements.address.textContent = label
  elements.address.parentElement?.classList.toggle('connected', connected)
  elements.profileWallet.textContent = label
  elements.profileChain.textContent = state.chainId ? state.chainId : '—'

  elements.connect.disabled = connected
  elements.disconnect.disabled = !connected
}

function getProvider() {
  return state.provider || fallbackProvider
}

function getMainHubContract(useSigner = false) {
  const provider = useSigner && state.signer ? state.signer : getProvider()
  return new ethers.Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, provider)
}

function getNftContract(providerOrSigner) {
  const provider = providerOrSigner || state.signer || getProvider()
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

    const label = `${network.name || 'Unknown'} (chain ${network.chainId})`
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
  state.hasNft = false
  state.nftPrice = null
  state.nftMessage = ''
  state.minting = false
  updateConnectionUI()
  setNetworkLabel('Not connected')
  setNetworkWarning('')
  updateNftUI()
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

    elements.totalUsers.textContent = users ? users.toString() : '0'
    elements.totalActions.textContent = actions ? actions.toString() : '0'
  } catch (err) {
    console.error('Unable to load main hub stats', err)
    elements.totalUsers.textContent = '0'
    elements.totalActions.textContent = '0'
  }
}

function updateNftUI() {
  const priceLabel = state.nftPrice ? `${ethers.utils.formatEther(state.nftPrice)} CELO` : '—'
  elements.nftPricePrimary.textContent = priceLabel
  elements.nftPriceSecondary.textContent = priceLabel

  let ownershipText = 'Connect wallet to check ownership'
  let message = state.nftMessage || ''

  if (state.chainId && state.chainId !== CELO_CHAIN_ID) {
    ownershipText = 'Wrong network'
    message = 'Please switch to Celo Mainnet to mint the Access Pass.'
  } else if (state.account) {
    ownershipText = state.hasNft ? 'You already own the pass' : 'No access pass found'
    if (!message && state.hasNft) message = 'You already own the Access Pass.'
  }
  elements.nftOwnershipPrimary.textContent = ownershipText
  elements.nftOwnershipSecondary.textContent = ownershipText

  elements.nftStatusText.textContent = state.hasNft ? 'You own this NFT' : "You don't own this NFT yet"
  elements.nftStatusPill.classList.toggle('owned', state.hasNft)
  elements.profileNft.textContent = state.hasNft ? 'Owned' : 'Not owned'

  const disableMint = state.chainId !== CELO_CHAIN_ID || !state.account || state.hasNft || state.minting
  elements.mintNftButtons.forEach((btn) => {
    if (!btn) return
    btn.disabled = disableMint
    btn.textContent = state.minting
      ? 'Minting…'
      : state.hasNft
        ? 'Access Pass minted'
        : 'Mint Access NFT'
  })

  if (elements.nftMessage) {
    elements.nftMessage.textContent = message
  }
}

async function loadNftData() {
  const contract = getNftContract()
  try {
    const price = await contract.getNFTPrice()
    state.nftPrice = price
  } catch (err) {
    console.warn('Price lookup failed', err)
    state.nftPrice = null
  }

  if (!state.account) {
    state.hasNft = false
    state.nftMessage = ''
    updateNftUI()
    return
  }

  if (state.chainId && state.chainId !== CELO_CHAIN_ID) {
    state.hasNft = false
    state.nftMessage = 'Please switch to Celo Mainnet to mint the Access Pass.'
    updateNftUI()
    return
  }

  try {
    const has = await contract.hasNFT(state.account)
    state.hasNft = has
    state.nftMessage = has ? 'You already own the Access Pass.' : ''
  } catch (err) {
    console.warn('Ownership lookup failed', err)
    state.hasNft = false
    state.nftMessage = 'Unable to check ownership right now.'
  }

  updateNftUI()
}

async function mintAccessNft() {
  if (!state.account || !state.signer) {
    state.nftMessage = 'Connect your wallet before minting.'
    updateNftUI()
    return
  }

  if (state.chainId !== CELO_CHAIN_ID) {
    state.nftMessage = 'Please switch to Celo Mainnet to mint the Access Pass.'
    updateNftUI()
    return
  }

  try {
    state.minting = true
    state.nftMessage = ''
    updateNftUI()

    const contract = getNftContract(state.signer)
    const price = state.nftPrice || (await contract.getNFTPrice())
    const tx = await contract.mintNFT({ value: price })
    state.nftMessage = 'Transaction submitted. Waiting for confirmation...'
    updateNftUI()
    await tx.wait()
    await loadNftData()
    state.nftMessage = 'Access Pass minted'
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

elements.mintNftButtons.forEach((btn) => btn?.addEventListener('click', mintAccessNft))

document.querySelectorAll('.quick-donate').forEach((btn) => {
  btn.addEventListener('click', () => donate(btn.dataset.amount))
})

elements.browseModules?.addEventListener('click', () => {
  showSection('modules')
  document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
})

updateConnectionUI()
setNetworkLabel('Not connected')
loadMainHubStats()
loadNftData()
ensureCeloNetwork()
