import { NETWORKS } from './constants.js'
import {
  connectMetaMask,
  connectWalletConnect,
  getConnectionMeta,
  getCurrentNetwork,
} from './walletService.js'
import {
  donateCelo,
  fetchCeloBalance,
  fetchCusdBalance,
  sendGmPing,
} from './contractService.js'

const ui = {
  connectMetaMask: document.getElementById('connect-metamask'),
  connectWalletConnect: document.getElementById('connect-walletconnect'),
  status: document.getElementById('connection-status'),
  networkBadge: document.getElementById('network-badge'),
  walletAddress: document.getElementById('wallet-address'),
  networkName: document.getElementById('network-name'),
  celoBalance: document.getElementById('celo-balance'),
  cusdBalance: document.getElementById('cusd-balance'),
  gmButton: document.getElementById('gm-button'),
  donateButton: document.getElementById('donate-button'),
  loadContract: document.getElementById('load-contract'),
  actionResult: document.getElementById('action-result'),
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

async function connect(handler) {
  try {
    const account = await handler()
    ui.walletAddress.textContent = shorten(account)
    setStatus('Wallet connected')
    await refreshNetwork()
  } catch (err) {
    console.error(err)
    setStatus(err.message || 'Failed to connect', 'error')
  }
}

function shorten(address) {
  if (!address) return '—'
  return `${address.slice(0, 6)}…${address.slice(-4)}`
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
  ui.networkBadge.textContent = name
  ui.networkName.textContent = `${name} (chain ${network.chainId})`
  await refreshBalances(meta.account, network.chainId)
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
    const hash = await sendGmPing(account)
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
    const hash = await donateCelo('0.01')
    ui.actionResult.textContent = `Donation sent! Tx: ${hash}`
  } catch (err) {
    ui.actionResult.textContent = err.message || 'Donation failed'
  }
}

async function loadContractData() {
  const meta = getConnectionMeta()
  const network = await getCurrentNetwork()
  if (!meta.account || !network) return setStatus('Connect your wallet first', 'error')
  ui.actionResult.textContent = 'Loading cUSD balance from contract…'
  try {
    const cusd = await fetchCusdBalance(meta.account, network.chainId)
    ui.cusdBalance.textContent = `${Number(cusd.balance).toFixed(2)} ${cusd.symbol}`
    ui.actionResult.textContent = 'Contract loaded successfully'
  } catch (err) {
    ui.actionResult.textContent = err.message || 'Unable to load contract'
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
ui.gmButton.addEventListener('click', performGm)
ui.donateButton.addEventListener('click', performDonation)
ui.loadContract.addEventListener('click', loadContractData)
