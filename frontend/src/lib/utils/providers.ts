import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SUPPORTED_CHAINS } from '@/lib/config/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  SUPPORTED_CHAINS,
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'CeloModuleX',
  projectId: '8b020ffbb31e5aba14160c27ca26540b',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
