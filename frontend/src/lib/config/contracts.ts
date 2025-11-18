import MAIN_HUB_ABI from './abis/MainHub.json'
import NFT_ACCESS_ABI from './abis/NFTAccess.json'

// These will be set after deployment
export const MAIN_HUB_ADDRESS = process.env.NEXT_PUBLIC_MAIN_HUB_ADDRESS || '0x...'
export const NFT_ACCESS_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS || '0x...'

export { MAIN_HUB_ABI, NFT_ACCESS_ABI }

export const CONTRACT_CONFIG = {
  mainHub: {
    address: MAIN_HUB_ADDRESS,
    abi: MAIN_HUB_ABI,
  },
  nftAccess: {
    address: NFT_ACCESS_ADDRESS,
    abi: NFT_ACCESS_ABI,
  },
} as const
