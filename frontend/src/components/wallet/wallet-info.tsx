'use client'

import { useAccount, useBalance } from 'wagmi'
import { formatAddress } from '@/lib/utils/format'

export function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  if (!isConnected || !address) {
    return null
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-2">Wallet Info</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Address:</span>
          <span className="font-mono">{formatAddress(address)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Balance:</span>
          <span className="font-mono">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  )
}
