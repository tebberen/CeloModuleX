import { NETWORKS } from './constants.js'
import {
  connectMetaMask,
  connectWalletConnect,
  getConnectionMeta,
  getCurrentNetwork,
} from './walletService.js'
import {
  deployContract,
  donate,
  fetchCeloBalance,
  fetchCusdBalance,
  fetchNftPrice,
  hasAccessNft,
  mintAccessPass,
  sendGM,
} from './contractService.js'

const ui = {
  connectMetaMask: document.getElementById('connect-metamask'),
  connectWalletConnect: document.getElementById('connect-walletconnect'),
  status: document.getElementById('connection-status'),
  networkBadge: document.getElementById('network-badge'),
  walletAddress: document.getElementById('wallet-address'),
  networkName: document.getElementById('network-name'),
  networkNameClone: document.getElementById('networkNameClone'),
  celoBalance: document.getElementById('celo-balance'),
  cusdBalance: document.getElementById('cusd-balance'),
  gmButton: document.getElementById('gmBtn'),
  donateButton: document.getElementById('donateBtn'),
  deployButton: document.getElementById('deployBtn'),
  actionResult: document.getElementById('action-result'),
  premiumBadge: document.getElementById('premium-badge'),
  premiumStatus: document.getElementById('premium-status'),
  walletAddressDisplay: document.getElementById('walletAddressDisplay'),
  walletAddressClone: document.getElementById('walletAddressDisplayClone'),
  statsWallet: document.getElementById('stats-wallet'),
  statsNetwork: document.getElementById('stats-network'),
  mintNftBtn: document.getElementById('mintNftBtn'),
  premiumBanner: document.getElementById('premium-banner'),
  nftPrice: document.getElementById('nft-price'),
  premiumStatusClone: document.getElementById('premiumStatusClone'),
}

const sections = {
  home: document.getElementById('home'),
  modules: document.getElementById('modules'),
  nft: document.getElementById('nft'),
  profile: document.getElementById('profile'),
  stats: document.getElementById('stats'),
}

const navLinks = Array.from(document.querySelectorAll('.nav-link'))
const sideLinks = Array.from(document.querySelectorAll('.side-link'))
const heroModulesButton = document.getElementById('start-modules')

function setStatus(message, tone = 'muted') {
  ui.status.textContent = message
  ui.status.className = `status ${tone === 'error' ? 'danger' : 'muted'}`
}

async function runWithFeedback(button, action) {
  const targetButton = button
  if (!targetButton) return action()

  const originalText = targetButton.textContent
  targetButton.textContent = 'Processing...'
  targetButton.disabled = true

  try {
    await action()
  } finally {
    targetButton.textContent = originalText
    targetButton.disabled = false
  }
}

async function connect(handler) {
  try {
    const account = await handler()
    updateWalletDisplays(account)
    setStatus('Wallet connected')
    await refreshNetwork()
    await refreshPremiumStatus(account)
  } catch (err) {
    console.error(err)
    setStatus(err.message || 'Failed to connect', 'error')
  }
}

function shorten(address) {
  if (!address) return '—'
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function updateWalletDisplays(account) {
  const value = shorten(account)
  if (ui.walletAddress) ui.walletAddress.textContent = value
  if (ui.walletAddressDisplay) ui.walletAddressDisplay.textContent = value
  if (ui.walletAddressClone) ui.walletAddressClone.textContent = value
  if (ui.statsWallet) ui.statsWallet.textContent = value
}

function updateNetworkDisplays(text) {
  if (ui.networkBadge) ui.networkBadge.textContent = text
  if (ui.networkName) ui.networkName.textContent = text
  if (ui.networkNameClone) ui.networkNameClone.textContent = text
  if (ui.statsNetwork) ui.statsNetwork.textContent = text
}

function setActiveLink(target) {
  ;[...navLinks, ...sideLinks].forEach((link) => {
    const linkTarget = link.dataset.target
    link.classList.toggle('active', linkTarget === target)
  })
}

function showSection(target) {
  const activeSection = sections[target]
  if (!activeSection) return

  Object.entries(sections).forEach(([key, section]) => {
    if (!section) return
    section.classList.toggle('hidden-section', key !== target)
  })

  setActiveLink(target)
}

async function refreshNetwork() {
  const meta = getConnectionMeta()
  const network = await getCurrentNetwork()
  if (!network) return
  const name = NETWORKS.mainnet.chainId === network.chainId ? NETWORKS.mainnet.name : NETWORKS.alfajores.name
  const networkLabel = `${name} (chain ${network.chainId})`
  updateNetworkDisplays(networkLabel)
  if (ui.networkBadge) ui.networkBadge.textContent = name
  await refreshBalances(meta.account, network.chainId)
}

async function refreshPremiumStatus(account) {
  if (!account) return updatePremiumUI(false)
  try {
    const hasNft = await hasAccessNft(account)
    updatePremiumUI(hasNft)
  } catch (err) {
    console.error('Unable to load premium status', err)
    updatePremiumUI(false)
  }
}

async function refreshBalances(account, chainId) {
  if (!account || !chainId) return
  ui.celoBalance.textContent = 'Loading…'
  ui.cusdBalance.textContent = 'Loading…'
  try {
    const [celo, cusd] = await Promise.all([
      fetchCeloBalance(account),
      fetchCusdBalance(account, chainId),
    ])
    ui.celoBalance.textContent = `${Number(celo).toFixed(4)} CELO`
    ui.cusdBalance.textContent = `${Number(cusd.balance).toFixed(2)} ${cusd.symbol}`
  } catch (err) {
    ui.celoBalance.textContent = '—'
    ui.cusdBalance.textContent = '—'
    ui.actionResult.textContent = err.message || 'Unable to load balances'
  }
}

async function performGm() {
  const { account } = getConnectionMeta()
  if (!account) return setStatus('Connect your wallet first', 'error')
  ui.actionResult.textContent = 'Sending GM ping…'
  try {
    const hash = await sendGM(account)
    ui.actionResult.textContent = `GM broadcasted! Tx: ${hash}`
  } catch (err) {
    ui.actionResult.textContent = err.message || 'GM failed'
  }
}

async function performDonation() {
  const { account } = getConnectionMeta()
  if (!account) return setStatus('Connect your wallet first', 'error')
  ui.actionResult.textContent = 'Submitting donation…'
  try {
    const hash = await donate('0.01')
    ui.actionResult.textContent = `Donation sent! Tx: ${hash}`
  } catch (err) {
    ui.actionResult.textContent = err.message || 'Donation failed'
  }
}

async function performDeploy() {
  const meta = getConnectionMeta()
  if (!meta.account) return setStatus('Connect your wallet first', 'error')
  ui.actionResult.textContent = 'Deploying Hello World contract…'
  try {
    const address = await deployContract()
    ui.actionResult.textContent = `Contract deployed at ${address}`
  } catch (err) {
    ui.actionResult.textContent = err.message || 'Unable to deploy contract'
  }
}

async function performMintAccessPass() {
  const { account } = getConnectionMeta()
  if (!account) return setStatus('Connect your wallet first', 'error')
  ui.actionResult.textContent = 'Minting access NFT…'
  try {
    const hash = await mintAccessPass()
    ui.actionResult.textContent = `Access NFT minted! Tx: ${hash}`
    updatePremiumUI(true)
  } catch (err) {
    ui.actionResult.textContent = err.message || 'Minting failed'
  }
}

function updatePremiumUI(hasNft) {
  if (ui.premiumBadge) {
    ui.premiumBadge.classList.toggle('hidden', !hasNft)
  }

  if (ui.premiumStatus) {
    ui.premiumStatus.textContent = hasNft ? 'Active' : 'Inactive'
    ui.premiumStatus.classList.toggle('active', hasNft)
    ui.premiumStatus.classList.toggle('inactive', !hasNft)
  }

  if (ui.premiumStatusClone) {
    ui.premiumStatusClone.textContent = hasNft ? 'Active' : 'Inactive'
  }

  if (ui.mintNftBtn) {
    ui.mintNftBtn.textContent = hasNft ? 'Owned' : 'Mint Access NFT'
    ui.mintNftBtn.disabled = hasNft
  }

  if (ui.premiumBanner) {
    ui.premiumBanner.classList.toggle('hidden', !hasNft)
  }
}

async function loadNftPrice() {
  if (!ui.nftPrice) return
  ui.nftPrice.textContent = 'Loading…'
  try {
    const price = await fetchNftPrice()
    ui.nftPrice.textContent = `${Number(price).toFixed(2)} CELO`
  } catch (err) {
    console.error('Unable to fetch NFT price', err)
    ui.nftPrice.textContent = '—'
  }
}

function handleNavigation(event) {
  event.preventDefault()
  const target = event.currentTarget.dataset.target
  if (!target) return
  showSection(target)
}

navLinks.forEach((link) => link.addEventListener('click', handleNavigation))
sideLinks.forEach((link) => link.addEventListener('click', handleNavigation))

if (heroModulesButton) {
  heroModulesButton.addEventListener('click', () => showSection('modules'))
}

showSection('home')

ui.connectMetaMask.addEventListener('click', () => connect(connectMetaMask))
ui.connectWalletConnect.addEventListener('click', () => connect(connectWalletConnect))
ui.gmButton.addEventListener('click', () => {
  console.log('Action triggered: GM')
  return runWithFeedback(ui.gmButton, performGm)
})

ui.donateButton.addEventListener('click', () => {
  console.log('Action triggered: Donate')
  return runWithFeedback(ui.donateButton, performDonation)
})

ui.deployButton.addEventListener('click', () => {
  console.log('Action triggered: Deploy')
  return runWithFeedback(ui.deployButton, performDeploy)
})

if (ui.mintNftBtn) {
  ui.mintNftBtn.addEventListener('click', () => {
    console.log('Action triggered: Mint NFT')
    return runWithFeedback(ui.mintNftBtn, performMintAccessPass)
  })
}

updatePremiumUI(false)
loadNftPrice()
