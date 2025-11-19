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
import { useNFTContract } from '@/hooks/use-nft-contract'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })
  const { profile } = useUserProfile()
  const { executeModule, executeDonate, loading } = useMainHub()
  const { mintNFT, loading: minting } = useNFTContract()
  const [status, setStatus] = useState('')
  const [liveActions, setLiveActions] = useState(420)
  const [userRank, setUserRank] = useState('On-Chain Pioneer')
  const [mintMessage, setMintMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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

  const handleMint = async () => {
    setMintMessage(null)
    try {
      await mintNFT()
      setMintMessage({ type: 'success', text: 'NFT minted successfully. Premium access unlocked!' })
    } catch (error: any) {
      setMintMessage({ type: 'error', text: error?.message || 'Mint failed. Please try again.' })
    }
  }

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
      <section className="container-layout space-y-8 py-10">
        <div className="rounded-3xl border border-[#F2D8AE] bg-white p-8 shadow-xl">
          <div className="flex items-center gap-2 rounded-full bg-[#FFF3CF] px-4 py-2 text-xs font-semibold uppercase text-[#A46100] w-fit">
            <span className="h-2 w-2 rounded-full bg-[#35D07F]"></span>
            Celo-native experience
          </div>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-[#2F210F] leading-tight">Welcome to CeloModuleX</h1>
          <p className="mt-4 text-lg text-[#5F4B32] max-w-3xl">
            The modular action launcher for Celo. Execute on-chain actions, collect stats, and access premium features powered by the Celo blockchain.
          </p>
          <div className="mt-6 grid gap-2 text-[#3B2B17]">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FBCC5C]"></span>
              <p className="font-medium">On-chain profile and social identity</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FBCC5C]"></span>
              <p className="font-medium">Modular actions like GM, Donate, Deploy</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#FBCC5C]"></span>
              <p className="font-medium">Premium NFT pass for exclusive modules</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr] items-start">
          <div className="space-y-5">
            <div className="rounded-3xl border border-[#F2D8AE] bg-gradient-to-b from-[#FFFDF5] to-[#FFEBCB] p-6 shadow-xl">
              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div>
                  <p className="text-sm uppercase text-[#C78B16] font-semibold">Network</p>
                  <h2 className="text-2xl font-bold text-[#2F210F]">Wallet status</h2>
                </div>
                <Link href="#actions">
                  <Button className="bg-[#F6D371] text-[#3C2500] font-semibold px-5 py-2 rounded-full shadow-[0_12px_40px_rgba(246,211,113,0.35)] hover:translate-y-0.5">
                    Start Using Modules
                  </Button>
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#F4D8AF] bg-[#FFF4D8] p-4 text-[#3B2B17] shadow-sm">
                  <div className="text-xs uppercase text-[#B0822A]">Network</div>
                  <div className="text-lg font-semibold">{chain?.name || 'Celo'}</div>
                </div>
                <div className="rounded-xl border border-[#F4D8AF] bg-[#FFF4D8] p-4 text-[#3B2B17] shadow-sm">
                  <div className="text-xs uppercase text-[#B0822A]">CELO Balance</div>
                  <div className="text-lg font-semibold">{balance ? `${Number(balance.formatted).toFixed(3)} ${balance.symbol}` : '—'}</div>
                </div>
                <div className="rounded-xl border border-[#F4D8AF] bg-[#FFF4D8] p-4 text-[#3B2B17] shadow-sm">
                  <div className="text-xs uppercase text-[#B0822A]">Status</div>
                  <div className="text-lg font-semibold">{isConnected ? 'Ready' : 'Connect to start'}</div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr,1fr]">
                <div className="glass-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Quick Stats</h3>
                    <span className="rounded-full bg-[#FFE4AE] px-3 py-1 text-xs font-semibold text-[#8A5C05]">Live</span>
                  </div>
                  <StatsCards />
                </div>
                <div className="rounded-2xl border border-[#F2DAB2] bg-[#FFF4DC] p-4">
                  <h4 className="text-sm font-semibold text-[#2F210F] mb-2">Wallet Overview</h4>
                  <WalletInfo />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-[#E5BE55] bg-[#FBCC5C] p-6 shadow-xl text-[#1F1606]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase font-semibold tracking-wide">Unlock Premium Access</p>
                  <h3 className="mt-1 text-2xl font-bold">NFT Pass</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2F210F]">
                    Get the CeloModuleX NFT Pass to enable premium modules, boost your stats, and unlock exclusive features.
                  </p>
                </div>
                <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">Premium</span>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={handleMint}
                  disabled={minting}
                  className="w-full sm:w-auto bg-black text-[#FBCC5C] hover:bg-[#1F1606] px-6"
                >
                  {minting ? 'Minting...' : 'Mint NFT Pass'}
                </Button>
                {mintMessage && (
                  <div
                    className={`w-full rounded-xl px-4 py-2 text-sm font-medium ${
                      mintMessage.type === 'success'
                        ? 'bg-[#1F915B] text-white'
                        : 'bg-[#FFE4AE] text-[#8A5C05]'
                    }`}
                  >
                    {mintMessage.text}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[#F2D8AE] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase text-[#C78B16] font-semibold">Quick Modules</p>
                  <h4 className="text-lg font-bold text-[#2F210F]">Launch actions fast</h4>
                </div>
                {status && <span className="text-xs text-[#9A6A0A]">{status}</span>}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[{ label: 'Say GM', action: () => handleExecute(1, 'gm', false) }, { label: 'Donate', action: () => handleExecute(2, 'donate', false) }, { label: 'Deploy', action: () => handleExecute(3, 'deploy', true) }].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    disabled={loading}
                    className="rounded-xl border border-[#FBCC5C] bg-white px-4 py-3 text-sm font-semibold text-[#2F210F] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="actions" className="container-layout space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,1.2fr,1fr]">
          <div className="space-y-4 rounded-2xl border border-[#F2D8AE] bg-gradient-to-b from-[#FFFDF5] to-[#FFEBCB] p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDE4A8] text-lg font-bold text-[#2F1D06]">
                {profile?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm uppercase text-[#B98A34]">Profile</p>
                <p className="text-lg font-semibold text-[#2F210F]">{profile?.username || 'Anonymous Celo User'}</p>
                <p className="text-xs text-[#7D6B4F]">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect to load profile'}</p>
                <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-[#F0D092] bg-[#FFF3D2] px-3 py-1 text-[11px] font-semibold text-[#A26A00]">
                  Reputation: {profile?.hasNFT ? 'High (Premium Holder)' : 'Growing'}
                </p>
              </div>
            </div>
            <div className="grid gap-3 text-sm text-[#5F4B32]">
              <Link href="/profile" className="flex items-center justify-between rounded-lg border border-[#F0DABA] bg-[#FFF6E3] px-3 py-2 hover:border-[#EFC46E]">
                <span>Profile</span>
                <span className="text-xs text-[#A18863]">Manage identity</span>
              </Link>
              <Link href="/modules" className="flex items-center justify-between rounded-lg border border-[#F0DABA] bg-[#FFF6E3] px-3 py-2 hover:border-[#EFC46E]">
                <span>Modules</span>
                <span className="text-xs text-[#A18863]">Launch actions</span>
              </Link>
              <Link href="/nft" className="flex items-center justify-between rounded-lg border border-[#F0DABA] bg-[#FFF6E3] px-3 py-2 hover:border-[#EFC46E]">
                <span>NFT</span>
                <span className="text-xs text-[#A18863]">Access pass</span>
              </Link>
              <Link href="/stats" className="flex items-center justify-between rounded-lg border border-[#F0DABA] bg-[#FFF6E3] px-3 py-2 hover:border-[#EFC46E]">
                <span>Stats</span>
                <span className="text-xs text-[#A18863]">Live counters</span>
              </Link>
            </div>
            <div className="rounded-xl border border-[#F0D6A5] bg-[#FFF4D8] p-4 text-xs text-[#5F4B32]">
              <div className="flex items-center justify-between">
                <span>Premium status</span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold border ${
                    profile?.hasNFT
                      ? 'bg-[#E6F9EF] text-[#1A8A57] border-[#35D07F]'
                      : 'bg-[#FFF2D4] text-[#9A742C] border-[#F0D092]'
                  }`}
                >
                  {profile?.hasNFT ? 'Active' : 'Locked'}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Actions executed</span>
                <span className="font-semibold text-[#2F210F]">{profile?.actionCount ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase text-[#C78B16] font-semibold">Actions</p>
                <h2 className="text-2xl font-bold text-[#2F210F]">Launch modules</h2>
              </div>
              {status && <span className="text-xs text-[#9A6A0A]">{status}</span>}
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

          <div className="space-y-4 rounded-2xl border border-[#F2D8AE] bg-gradient-to-b from-[#FFFDF5] to-[#FFEBCB] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase text-[#B98A34]">Live Stats</p>
                <h3 className="text-lg font-semibold text-[#2F210F]">Your session</h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE3A8] text-[#D28A00]">📡</div>
            </div>
            <div className="space-y-3 text-sm text-[#5F4B32]">
              <div className="flex items-center justify-between rounded-lg border border-[#F0D6A5] bg-[#FFF4D8] px-3 py-2">
                <span>Network</span>
                <span className="font-semibold text-[#2F210F]">{chain?.name || 'Celo'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#F0D6A5] bg-[#FFF4D8] px-3 py-2">
                <span>Address</span>
                <span className="font-mono text-xs text-[#8A7554]">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#F0D6A5] bg-[#FFF4D8] px-3 py-2">
                <span>Balance</span>
                <span className="font-semibold text-[#2F210F]">{balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '—'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#F0D6A5] bg-[#FFF4D8] px-3 py-2">
                <span>Total Actions</span>
                <span className="font-semibold text-[#B77400]">{liveActions}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#F0D6A5] bg-[#FFF4D8] px-3 py-2">
                <span>User Score</span>
                <span className="font-semibold text-[#2F210F]">{userRank}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#F0D6A5] bg-[#FFF4D8] px-3 py-2">
                <span>Connection</span>
                <span className={`flex items-center gap-2 ${isConnected ? 'text-[#2B8A57]' : 'text-[#9B8B74]'}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-[#35D07F]' : 'bg-[#C8B89A]'}`}></span>
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
            <p className="text-sm uppercase tracking-wide text-[#C78B16]">Modules</p>
            <h2 className="text-2xl font-semibold text-[#2F210F]">Explore featured actions</h2>
          </div>
          <Link href="/modules" className="text-sm text-[#D28A00] hover:underline font-medium">
            View all
          </Link>
        </div>
        <ModuleGrid />
      </section>
    </main>
  )
}
