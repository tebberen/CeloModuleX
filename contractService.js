import { CUSD_CONTRACTS, DONATION_ADDRESS, ERC20_ABI } from './constants.js'
import { getProvider, getSigner } from './walletService.js'

const { ethers } = window

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
  const signer = getSigner()
  const data = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('gm'))
  const tx = await signer.sendTransaction({ to: account, value: 0, data })
  await tx.wait()
  return tx.hash
}

export async function donateCelo(amountInEther) {
  const signer = getSigner()
  const tx = await signer.sendTransaction({
    to: DONATION_ADDRESS,
    value: ethers.utils.parseEther(amountInEther),
  })
  await tx.wait()
  return tx.hash
}

export async function fetchCeloBalance(account) {
  const provider = getProvider()
  const raw = await provider.getBalance(account)
  return ethers.utils.formatEther(raw)
}
