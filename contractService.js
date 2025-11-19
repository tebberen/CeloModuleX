import {
  ACCESS_PASS_ABI,
  ACCESS_PASS_ADDRESS,
  BASIC_TRANSACTION_FEE,
  CUSD_CONTRACTS,
  DEFAULT_NETWORK,
  DONATION_ADDRESS,
  ERC20_ABI,
  MODULES,
  MAIN_HUB_ABI,
  MAIN_HUB_ADDRESS,
  NETWORKS,
  PREMIUM_TRANSACTION_FEE,
  PROJECT_OWNER_ADDRESS,
} from './constants.js'
import { getProvider, getSigner } from './walletService.js'

const { ethers } = window

const PREMIUM_FEE = ethers.utils.parseEther(PREMIUM_TRANSACTION_FEE)
const STANDARD_FEE = ethers.utils.parseEther(BASIC_TRANSACTION_FEE)

const MODULE_MAP = MODULES.reduce((map, module) => {
  map[module.id] = module
  return map
}, {})

const MAIN_HUB_CONTRACTS = {
  [NETWORKS.mainnet.chainId]: MAIN_HUB_ADDRESS,
  [NETWORKS.alfajores.chainId]: MAIN_HUB_ADDRESS,
}

const NFT_ACCESS_CONTRACTS = {
  [NETWORKS.mainnet.chainId]: ACCESS_PASS_ADDRESS,
  [NETWORKS.alfajores.chainId]: ACCESS_PASS_ADDRESS,
}

const defaultProvider = new ethers.providers.JsonRpcProvider(DEFAULT_NETWORK.rpcUrl)

const HELLO_WORLD_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const HELLO_WORLD_BYTECODE =
  '0x608060405234801561000f575f80fd5b506040518060400160405280600c81526020017f48656c6c6f2c2043656c6f2100000000000000000000000000000000000000008152505f90816100539190610293565b50610362565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806100d457607f821691505b6020821081036100e7576100e6610090565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026101497fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261010e565b610153868361010e565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61019761019261018d8461016b565b610174565b61016b565b9050919050565b5f819050919050565b6101b08361017d565b6101c46101bc8261019e565b84845461011a565b825550505050565b5f90565b6101d86101cc565b6101e38184846101a7565b505050565b5b81811015610206576101fb5f826101d0565b6001810190506101e9565b5050565b601f82111561024b5761021c816100ed565b610225846100ff565b81016020851015610234578190505b610248610240856100ff565b8301826101e8565b50505b505050565b5f82821c905092915050565b5f61026b5f1984600802610250565b1980831691505092915050565b5f610283838361025c565b9150826002028217905092915050565b61029c82610059565b67ffffffffffffffff8111156102b5576102b4610063565b5b6102bf82546100bd565b6102ca82828561020a565b5f60209050601f8311600181146102fb575f84156102e9578287015190505b6102f38582610278565b86555061035a565b601f198416610309866100ed565b5f5b828110156103305784890151825560018201915060208501945060208101905061030b565b8683101561034d5784890151610349601f89168261025c565b8355505b6001600288020188555050505b505050505050565b6101f98061036f5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063e21f37ce1461002d575b5f80fd5b61003561004b565b6040516100429190610146565b60405180910390f35b5f805461005790610193565b80601f016020809104026020016040519081016040528092919081815260200182805461008390610193565b80156100ce5780601f106100a5576101008083540402835291602001916100ce565b820191905f5260205f20905b8154815290600101906020018083116100b157829003601f168201915b5050505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610118826100d6565b61012281856100e0565b93506101328185602086016100f0565b61013b816100fe565b840191505092915050565b5f6020820190508181035f83015261015e818461010e565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806101aa57607f821691505b6020821081036101bd576101bc610166565b5b5091905056fea2646970667358221220644de3a1773b98b97d7251d789cc37898168580013b2b21f968a334bbf66285564736f6c634300081a0033'

export function getCusdContract(chainId) {
  const address = CUSD_CONTRACTS[chainId]
  if (!address) throw new Error('cUSD is not configured for this network')
  const provider = getProvider()
  return new ethers.Contract(address, ERC20_ABI, provider)
}

export async function fetchCusdBalance(account, chainId) {
  const contract = getCusdContract(chainId)
  const [symbol, decimals, raw] = await Promise.all([
    contract.symbol(),
    contract.decimals(),
    contract.balanceOf(account),
  ])
  const formatted = ethers.utils.formatUnits(raw, decimals)
  return { symbol, balance: formatted }
}

export async function sendGmPing(account) {
  return executeModule(1)
}

export async function donateCelo(amountInEther) {
  const extraValue = ethers.utils.parseEther(amountInEther)
  return executeModule(2, { extraValue, fallbackTarget: DONATION_ADDRESS })
}

export async function fetchCeloBalance(account) {
  const provider = getProvider()
  const raw = await provider.getBalance(account)
  return ethers.utils.formatEther(raw)
}

export async function sendGM(account) {
  return sendGmPing(account)
}

export async function donate(amountInEther = '0.01') {
  return donateCelo(amountInEther)
}

export async function deployContract() {
  return executeModule(3)
}

function getActiveProvider() {
  try {
    return getProvider()
  } catch (err) {
    return defaultProvider
  }
}

async function getNftContract(withSigner = false) {
  const signerOrProvider = withSigner ? getSigner() : getActiveProvider()
  const network = await (signerOrProvider.provider || signerOrProvider).getNetwork()
  const contractAddress =
    NFT_ACCESS_CONTRACTS[network.chainId] || NFT_ACCESS_CONTRACTS[DEFAULT_NETWORK.chainId]
  return new ethers.Contract(contractAddress, ACCESS_PASS_ABI, signerOrProvider)
}

async function getMainHubContract(withSigner = false) {
  const signerOrProvider = withSigner ? getSigner() : getActiveProvider()
  const network = await (signerOrProvider.provider || signerOrProvider).getNetwork()
  const contractAddress = MAIN_HUB_CONTRACTS[network.chainId] || MAIN_HUB_CONTRACTS[DEFAULT_NETWORK.chainId]
  return new ethers.Contract(contractAddress, MAIN_HUB_ABI, signerOrProvider)
}

export async function getUserProfile(account) {
  const contract = await getMainHubContract(false)
  const [username, actionCount, twitter, github, talent, selfID, hasNFT] = await contract.getUserProfile(account)

  const profile = {
    username,
    twitter,
    github,
    talentProtocol: talent,
    selfID,
    totalActions: Number(actionCount || 0),
    uniqueModulesUsed: Number(0),
    premiumModuleCount: Number(0),
    hasNFT,
  }

  if (!profile.username || profile.username.trim() === '') {
    return null
  }

  return { ...profile, score: calculateUserScore(profile) }
}

export async function createProfile({ username, twitter, github, talent, selfID }) {
  const contract = await getMainHubContract(true)
  const tx = await contract.createProfile(username, twitter, github, talent, selfID)
  await tx.wait()
  return tx.hash
}

export async function executeModule(
  moduleId,
  { extraValue = ethers.BigNumber.from(0), data = '0x' } = {}
) {
  const moduleMeta = MODULE_MAP[moduleId]
  if (!moduleMeta) {
    throw new Error('Module configuration missing for execution')
  }

  const signer = getSigner()
  const account = await signer.getAddress()
  const ownsAccessNft = await checkNFTAccess(account)

  if (moduleMeta.premium && !ownsAccessNft) {
    throw new Error('Premium module requires the NFT Access Pass')
  }

  const baseFee = ownsAccessNft ? PREMIUM_FEE : STANDARD_FEE
  const normalizedExtra = ethers.BigNumber.isBigNumber(extraValue)
    ? extraValue
    : ethers.BigNumber.from(extraValue || 0)
  const overrides = { value: baseFee.add(normalizedExtra) }

  const contract = await getMainHubContract(true)
  const tx = await contract.executeModule(moduleId, data, overrides)
  await tx.wait()
  return tx.hash
}

export async function checkNFTAccess(account) {
  const contract = await getNftContract(false)
  return contract.hasNFT(account)
}

export async function hasAccessNft(account) {
  return checkNFTAccess(account)
}

export async function getNFTPrice() {
  const contract = await getMainHubContract(false)
  const nextModuleId = await contract.nextModuleId()
  const moduleCount = Math.max(Number(nextModuleId) - 1, 0)
  const increments = Math.floor(moduleCount / 50)
  const celoPrice = 5 + increments * 2
  const priceInWei = ethers.utils.parseEther(celoPrice.toString())

  return { moduleCount, celoPrice: celoPrice.toString(), priceInWei }
}

export async function fetchNftPrice() {
  const { celoPrice } = await getNFTPrice()
  return celoPrice
}

export async function mintAccessPass() {
  const contract = await getNftContract(true)
  const { priceInWei } = await getNFTPrice()
  const tx = await contract.mintNFT({ value: priceInWei })
  await tx.wait()
  return tx.hash
}

export function calculateUserScore(userProfile = {}) {
  const uniqueModulesUsed = Number(userProfile.uniqueModulesUsed ?? 0)
  const totalActions = Number(userProfile.totalActions ?? 0)
  const premiumModuleCount = Number(userProfile.premiumModuleCount ?? 0)

  return uniqueModulesUsed * 5 + totalActions * 1 + premiumModuleCount * 10
}
