export interface UserProfile {
  username: string
  twitter: string
  github: string
  talentProtocol: string
  selfID: string
  actionCount: number
  hasNFT: boolean
  exists: boolean
  joinedAt?: number
}

export interface UserStats {
  totalActions: number
  modulesUsed: number
  favoriteCategory: string
  rank: number
  streak: number
}

export interface LeaderboardUser {
  address: string
  username: string
  totalActions: number
  rank: number
  hasNFT: boolean
}
