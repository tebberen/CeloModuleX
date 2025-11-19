'use client'

import Link from 'next/link'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { useEffect, useState } from 'react'
import { parseEther } from 'viem'
import { StatsCards } from '@/components/analytics/stats-cards'
import { Button } from '@/components/ui/button'
import { WalletInfo } from '@/components/wallet/wallet-info'
import { ModuleGrid } from '@/components/modules/module-grid'
import { useMainHub } from '@/hooks/use-main-hub'
import { useUserProfile } from '@/hooks/use-user-profile'
import { ActionCard } from '@/components/ui/action-card'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })
  const { profile } = useUserProfile()
  const { executeModule, executeDonate, loading } = useMainHub()
  const [status, setStatus] = useState('')
  const [liveActions, setLiveActions] = useState(420)
  const [userRank, setUserRank] = useState('On-Chain Pioneer')

  const handleExecute = async (actionId: number, action: string, premium: boolean) => {
    setStatus('')
    try {
      if (action === 'donate') {
        await executeDonate()
      } else {
        await executeModule(actionId, '0x', premium, action === 'deploy' ? parseEther('0') : undefined)
      }
      setStatus('Action executed on-chain')
    } catch (error: any) {
      setStatus(error?.message || 'Execution failed')
    }
  }

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(''), 4000)
      return () => clearTimeout(timer)
    }
  }, [status])

  useEffect(() => {
    if (profile?.actionCount) {
      setLiveActions(profile.actionCount)
      setUserRank(profile.actionCount > 25 ? 'Protocol Champion' : 'On-Chain Pioneer')
    }
  }, [profile?.actionCount])

  const actions = [
    {
      id: 1,
      title: 'Say GM',
      description: 'Broadcast a friendly GM through MainHub and ping your network.',
      badge: 'Free',
      meta: 'No fee • Instant',
      action: () => handleExecute(1, 'gm', false),
    },
    {
      id: 2,
      title: 'Donate 0.01 CELO',
      description: 'Tip the community vault directly from your wallet.',
      badge: 'Community',
      meta: 'Fixed 0.01 CELO',
      action: () => handleExecute(2, 'donate', false),
    },
    {
      id: 3,
      title: 'Deploy Demo',
      description: 'Trigger a demo deploy action to showcase modular execution.',
      badge: 'Premium',
      meta: 'Premium module',
      action: () => handleExecute(3, 'deploy', true),
    },
  ]

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout py-12">
        <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FBCC5C]/10 px-4 py-2 text-sm font-semibold text-[#FBCC5C]">
              <span className="h-2 w-2 rounded-full bg-[#FBCC5C]"></span>
              Celo-native modular actions
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                The Universal Engagement Layer for Celo
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                Access hundreds of modular on-chain functions, quickly and cost-effectively. Upgrade to Premium for 10x cheaper fees.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#actions">
                <Button className="bg-[#FBCC5C] text-black font-semibold px-6 py-3 rounded-full hover:brightness-110">
                  Start Using Modules
                </Button>
              </Link>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                <div className="h-10 w-10 rounded-lg bg-[#FBCC5C]/10 flex items-center justify-center text-[#FBCC5C] font-bold">⚡</div>
                <div>
                  <div className="text-sm">{isConnected ? 'Wallet Connected' : 'Ready for Celo'}</div>
                  <div className="text-xs text-white/50">{isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect to begin'}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
                <div className="text-xs uppercase text-white/60">Network</div>
                <div className="text-lg font-semibold">{chain?.name || 'Celo'}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
                <div className="text-xs uppercase text-white/60">CELO Balance</div>
                <div className="text-lg font-semibold">{balance ? `${Number(balance.formatted).toFixed(3)} ${balance.symbol}` : '—'}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
                <div className="text-xs uppercase text-white/60">Status</div>
                <div className="text-lg font-semibold">{isConnected ? 'Ready' : 'Connect to start'}</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
              <span className="rounded-full bg-[#FBCC5C]/20 px-3 py-1 text-xs font-semibold text-[#FBCC5C]">Live</span>
            </div>
            <StatsCards />
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Wallet Overview</h4>
              <WalletInfo />
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-white/60">
          CeloModuleX is the engine that drives on-chain diversity and wallet activity across Celo and other EVM chains.
        </p>
      </section>

      <section id="actions" className="container-layout space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,1.2fr,1fr]">
          <div className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-b from-[#121513] to-[#0d0f0e] p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBCC5C] text-lg font-bold text-[#0c0f0d]">{profile?.username?.[0]?.toUpperCase() || 'U'}</div>
              <div>
                <p className="text-sm uppercase text-white/60">Profile</p>
                <p className="text-lg font-semibold text-white">{profile?.username || 'Anonymous Celo User'}</p>
                <p className="text-xs text-white/60">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect to load profile'}</p>
                <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-[#FBCC5C]/30 bg-[#FBCC5C]/10 px-3 py-1 text-[11px] font-semibold text-[#FBCC5C]">
                  Reputation: {profile?.hasNFT ? 'High (Premium Holder)' : 'Growing'}
                </p>
              </div>
            </div>
            <div className="grid gap-3 text-sm text-white/70">
              <Link href="/profile" className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 hover:border-[#FBCC5C]">
                <span>Profile</span>
                <span className="text-xs text-white/50">Manage identity</span>
              </Link>
              <Link href="/modules" className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 hover:border-[#FBCC5C]">
                <span>Modules</span>
                <span className="text-xs text-white/50">Launch actions</span>
              </Link>
              <Link href="/nft" className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 hover:border-[#FBCC5C]">
                <span>NFT</span>
                <span className="text-xs text-white/50">Access pass</span>
              </Link>
              <Link href="/stats" className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 hover:border-[#FBCC5C]">
                <span>Stats</span>
                <span className="text-xs text-white/50">Live counters</span>
              </Link>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>Premium status</span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${profile?.hasNFT ? 'bg-[#FBCC5C] text-black' : 'bg-white/10 text-white'}`}>
                  {profile?.hasNFT ? 'Active' : 'Locked'}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Actions executed</span>
                <span className="font-semibold text-white">{profile?.actionCount ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase text-[#FBCC5C] font-semibold">Actions</p>
                <h2 className="text-2xl font-bold text-white">Launch modules</h2>
              </div>
              {status && <span className="text-xs text-[#FBCC5C]">{status}</span>}
            </div>
            <div className="grid gap-4">
              {actions.map((item) => (
                <ActionCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  badge={item.badge}
                  accent={item.badge === 'Premium' ? 'secondary' : 'primary'}
                  meta={item.meta}
                  onAction={item.action}
                  actionLabel="Execute"
                  loading={loading}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-b from-[#121513] to-[#0d0f0e] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase text-white/60">Live Stats</p>
                <h3 className="text-lg font-semibold text-white">Your session</h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBCC5C]/15 text-[#FBCC5C]">📡</div>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span>Network</span>
                <span className="font-semibold text-white">{chain?.name || 'Celo'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span>Address</span>
                <span className="font-mono text-xs">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span>Balance</span>
                <span className="font-semibold text-white">{balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '—'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span>Total Actions</span>
                <span className="font-semibold text-[#FBCC5C]">{liveActions}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span>User Score</span>
                <span className="font-semibold text-white/80">{userRank}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span>Connection</span>
                <span className={`flex items-center gap-2 ${isConnected ? 'text-emerald-400' : 'text-white/60'}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-gray-500'}`}></span>
                  {isConnected ? 'Online' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-layout space-y-4 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-sm uppercase text-[#FBCC5C]">Modules</p>
            <h2 className="text-2xl font-semibold text-white">Explore featured actions</h2>
          </div>
          <Link href="/modules" className="text-sm text-[#FBCC5C] hover:underline">View all</Link>
        </div>
        <ModuleGrid />
      </section>
    </main>
  )
}
