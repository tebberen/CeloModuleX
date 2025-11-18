import { Celo, Alfajores } from '@celo/rainbowkit-celo/chains'

export const SUPPORTED_CHAINS = [Celo, Alfajores] as const
export const DEFAULT_CHAIN = process.env.NODE_ENV === 'development' ? Alfajores : Celo

export const CHAIN_INFO = {
  [Celo.id]: {
    name: 'Celo Mainnet',
    symbol: 'CELO',
    explorer: 'https://celoscan.io',
    rpcUrl: 'https://forno.celo.org',
  },
  [Alfajores.id]: {
    name: 'Celo Alfajores',
    symbol: 'CELO',
    explorer: 'https://alfajores.celoscan.io',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
  },
} as const
