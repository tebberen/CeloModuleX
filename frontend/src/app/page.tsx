'use client'

import Link from 'next/link'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { StatsCards } from '@/components/analytics/stats-cards'
import { Button } from '@/components/ui/button'
import { WalletInfo } from '@/components/wallet/wallet-info'
import { ModuleGrid } from '@/components/modules/module-grid'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout grid gap-10 py-12 lg:grid-cols-[2fr,1fr]">
        <div className="glass-card p-8">
          <p className="text-[#FBCC5C] text-sm mb-3 font-semibold uppercase tracking-wide">CeloModuleX</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            The modular on-chain action launcher for Celo
          </h1>
          <p className="text-white/70 text-lg mb-6 max-w-2xl">
            Execute GM, Donate, Deploy and premium actions in one streamlined dashboard. Secure wallet connections,
            live stats, and NFT-gated perks built for the Celo community.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/modules">
              <Button className="bg-[#FBCC5C] text-black font-semibold px-6 py-3 rounded-lg hover:brightness-110">
                Start Using Modules
              </Button>
            </Link>
            <div className="flex items-center gap-3 text-white/70">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FBCC5C] text-lg font-bold">⚡</div>
              <div>
                <div className="font-semibold text-white">Connected</div>
                <div className="text-sm text-white/60">{isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Wallet not connected'}</div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs uppercase text-white/60">Network</div>
              <div className="text-lg font-semibold text-white">{chain?.name || 'Celo'}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs uppercase text-white/60">CELO Balance</div>
              <div className="text-lg font-semibold text-white">{balance ? `${Number(balance.formatted).toFixed(3)} ${balance.symbol}` : '—'}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs uppercase text-white/60">Status</div>
              <div className="text-lg font-semibold text-white">{isConnected ? 'Ready' : 'Connect to start'}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
              <span className="text-xs text-white/60">Live</span>
            </div>
            <StatsCards />
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Wallet Overview</h3>
            <WalletInfo />
          </div>
        </div>
      </section>

      <section className="container-layout space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#FBCC5C] text-sm uppercase">Modules</p>
            <h2 className="text-2xl font-semibold text-white">Popular actions</h2>
          </div>
          <Link href="/modules" className="text-sm text-[#FBCC5C] hover:underline">View all</Link>
        </div>
        <ModuleGrid />
      </section>
    </main>
  )
}
