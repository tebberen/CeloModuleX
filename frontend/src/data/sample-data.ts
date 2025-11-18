import { UserProfile, UserStats, LeaderboardUser } from '@/types/user'

export const SAMPLE_USER_PROFILE: UserProfile = {
  username: 'celobuilder',
  twitter: 'celobuilder',
  github: 'celobuilder',
  talentProtocol: 'celobuilder',
  selfID: 'celobuilder.celo',
  actionCount: 42,
  hasNFT: true,
  exists: true,
  joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
}

export const SAMPLE_USER_STATS: UserStats = {
  totalActions: 42,
  modulesUsed: 5,
  favoriteCategory: 'social',
  rank: 15,
  streak: 7,
}

export const SAMPLE_LEADERBOARD: LeaderboardUser[] = [
  { address: '0x1234...5678', username: 'celomaster', totalActions: 156, rank: 1, hasNFT: true },
  { address: '0x2345...6789', username: 'web3builder', totalActions: 142, rank: 2, hasNFT: true },
  { address: '0x3456...7890', username: 'defi_king', totalActions: 128, rank: 3, hasNFT: false },
  { address: '0x4567...8901', username: 'nft_lover', totalActions: 115, rank: 4, hasNFT: true },
  { address: '0x5678...9012', username: 'celo_fan', totalActions: 98, rank: 5, hasNFT: false },
  { address: '0x6789...0123', username: 'crypto_native', totalActions: 87, rank: 6, hasNFT: true },
  { address: '0x7890...1234', username: 'blockchain_dev', totalActions: 76, rank: 7, hasNFT: true },
  { address: '0x8901...2345', username: 'web3_explorer', totalActions: 65, rank: 8, hasNFT: false },
  { address: '0x9012...3456', username: 'celo_enthusiast', totalActions: 54, rank: 9, hasNFT: true },
  { address: '0x0123...4567', username: 'crypto_trader', totalActions: 43, rank: 10, hasNFT: false },
]
