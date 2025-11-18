'use client'

import { useNetwork, useSwitchNetwork } from 'wagmi'
import { SUPPORTED_CHAINS } from '@/lib/config/chains'

export function ChainSelector() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  return (
    <div className="flex flex-wrap gap-2">
      {SUPPORTED_CHAINS.map((network) => (
        <button
          key={network.id}
          onClick={() => switchNetwork?.(network.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            chain?.id === network.id
              ? 'bg-celo-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {network.name}
        </button>
      ))}
    </div>
  )
}
