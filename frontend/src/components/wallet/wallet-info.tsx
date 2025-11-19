'use client'

import { useAccount, useBalance } from 'wagmi'
import { formatAddress } from '@/lib/utils/format'

export function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  if (!isConnected || !address) {
    return <div className="text-[#7D6B4F] text-sm">Connect a wallet to view balances.</div>
  }

  return (
    <div className="p-4 rounded-xl bg-white/90 border border-[#F2DAB2] text-[#3D2A14]">
      <h3 className="font-semibold text-lg mb-2">Wallet Info</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#8A7554]">Address:</span>
          <span className="font-mono">{formatAddress(address)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8A7554]">Balance:</span>
          <span className="font-mono">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  )
}
