export const NETWORKS = {
  mainnet: {
    chainId: 42220,
    chainIdHex: '0xa4ec',
    name: 'Celo Mainnet',
    rpcUrl: 'https://forno.celo.org',
    explorer: 'https://celoscan.io',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
  },
  alfajores: {
    chainId: 44787,
    chainIdHex: '0xaef3',
    name: 'Celo Alfajores',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    explorer: 'https://alfajores.celoscan.io',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
  },
}

export const DEFAULT_NETWORK = NETWORKS.alfajores
// Replace with your own WalletConnect Project ID from Cloud.WalletConnect when deploying.
export const WALLET_CONNECT_PROJECT_ID = '4530041258341627800'

export const DONATION_ADDRESS = '0x000000000000000000000000000000000000dEaD'

export const CUSD_CONTRACTS = {
  [NETWORKS.mainnet.chainId]: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
  [NETWORKS.alfajores.chainId]: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
}

export const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
]
