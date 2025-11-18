import MAIN_HUB_ABI from './abis/MainHub.json'
import NFT_ACCESS_ABI from './abis/NFTAccess.json'

export const MAIN_HUB_ADDRESS = (process.env.NEXT_PUBLIC_MAIN_HUB_ADDRESS || '0xad9801c23f3a7ebfea6c33e8575d479169881ff2') as `0x${string}`
export const NFT_ACCESS_ADDRESS = (process.env.NEXT_PUBLIC_NFT_ADDRESS || '0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd') as `0x${string}`

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
