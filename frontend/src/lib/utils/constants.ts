export const MODULE_CATEGORIES = {
  social: {
    name: 'Social',
    color: 'bg-blue-100 text-blue-800',
    description: 'Social interactions and community actions',
  },
  builder: {
    name: 'Builder',
    color: 'bg-green-100 text-green-800',
    description: 'Developer tools and deployment actions',
  },
  finance: {
    name: 'Finance',
    color: 'bg-purple-100 text-purple-800',
    description: 'Financial transactions and DeFi actions',
  },
  governance: {
    name: 'Governance',
    color: 'bg-orange-100 text-orange-800',
    description: 'Voting and governance participation',
  },
  achievement: {
    name: 'Achievement',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Badges, XP, and achievement tracking',
  },
} as const

export const FEE_STRUCTURE = {
  basic: 0.1, // 0.1 CELO
  premium: 0.01, // 0.01 CELO
} as const

export const NFT_PRICE_TIERS = [
  { modules: 50, price: 5 },    // 5 CELO for 50+ modules
  { modules: 100, price: 7 },   // 7 CELO for 100+ modules
  { modules: 150, price: 9 },   // 9 CELO for 150+ modules
  { modules: 200, price: 11 },  // 11 CELO for 200+ modules
] as const
