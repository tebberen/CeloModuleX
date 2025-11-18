export interface NFT {
  tokenId: number
  owner: string
  mintedAt: number
  pricePaid: string
  metadataURI: string
}

export interface NFTStats {
  totalMinted: number
  currentPrice: string
  totalRevenue: string
  holders: number
}

export interface NFTTier {
  modules: number
  price: number
  description: string
}
