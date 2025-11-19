'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { formatEther } from 'viem'

import { Button } from '@/components/ui/button'
import { ConnectWalletModal } from '@/components/wallet/connect-wallet-modal'
import { useNFTContract } from '@/hooks/use-nft-contract'

export default function Home() {
  const { address } = useAccount()
  const { getNFTPrice, hasNFT, mintNFT, getMetadata, loading: minting, isReady } = useNFTContract()

  const [price, setPrice] = useState<bigint | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [metadata, setMetadata] = useState<{ name: string; symbol: string }>({ name: 'CeloModuleX NFT', symbol: 'CMX' })
  const [mintMessage, setMintMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const formattedPrice = useMemo(() => {
    if (price === null) return 'Yükleniyor…'
    const celoValue = Number(formatEther(price))
    return `${celoValue.toLocaleString(undefined, { maximumFractionDigits: 4 })} CELO`
  }, [price])

  useEffect(() => {
    if (!isReady) return
    ;(async () => {
      const [fetchedPrice, fetchedMetadata] = await Promise.all([getNFTPrice(), getMetadata()])
      setPrice(fetchedPrice)
      setMetadata(fetchedMetadata)
    })()
  }, [getMetadata, getNFTPrice, isReady])

  useEffect(() => {
    if (!address || !isReady) {
      setHasAccess(false)
      return
    }
    ;(async () => {
      const owns = await hasNFT(address)
      setHasAccess(owns)
    })()
  }, [address, hasNFT, isReady])

  const handleMint = async () => {
    setMintMessage(null)
    try {
      await mintNFT()
      setMintMessage({ type: 'success', text: 'NFT başarıyla basıldı. Premium özellikler açıldı!' })
      setHasAccess(true)
    } catch (error: any) {
      setMintMessage({ type: 'error', text: error?.message || 'Mint başarısız oldu. Lütfen tekrar deneyin.' })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FFF9EA] to-white pb-20">
      <section className="container-layout py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#FBCC5C]/40 bg-white/80 p-10 text-center shadow-[0_30px_90px_rgba(251,204,92,0.25)] backdrop-blur">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FBCC5C]/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2C2108] ring-1 ring-[#FBCC5C]">
              Chain Diversity. Real Signals.
            </div>
            <h1 className="text-4xl font-bold leading-tight text-[#1A1405] sm:text-5xl">
              Aren&apos;t you tired of doing the same GM, the same Swap, the same Bridge every single day?
            </h1>
            <p className="text-lg leading-relaxed text-[#2F2611] sm:text-xl">
              Blockchain is so much more than that.
              <br />
              CeloModuleX lets you execute different types of on-chain actions across multiple smart contracts, creating true
              chain diversity and a stronger on-chain identity.
              <br />
              Every feature runs on its own unique smart contract — meaning every click you make generates a real, meaningful
              on-chain signal.
            </p>
          </div>
        </div>
      </section>

      <section className="container-layout">
        <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-[0_30px_100px_rgba(0,0,0,0.08)] lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-6 rounded-2xl border border-[#FBCC5C]/60 bg-white px-6 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FBCC5C]/20 px-4 py-2 text-xs font-semibold uppercase text-[#6B520B] ring-1 ring-[#FBCC5C]">
                Premium Access
              </span>
              <div className="rounded-full bg-[#FBCC5C] px-4 py-2 text-xs font-semibold uppercase text-[#1A1405] shadow-[0_10px_30px_rgba(251,204,92,0.35)]">
                Live
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-2xl bg-gradient-to-br from-white via-[#FFF7DD] to-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
              <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-[#FBCC5C]/40 bg-white shadow-[0_18px_70px_rgba(0,0,0,0.08)]">
                <div className="absolute left-4 top-4 rounded-full bg-[#FBCC5C] px-3 py-1 text-xs font-semibold text-[#1A1405]">{metadata.symbol}</div>
                <Image
                  src="/images/nft-preview.png"
                  alt="CeloModuleX premium NFT"
                  width={420}
                  height={420}
                  className="h-auto w-full"
                  priority
                />
              </div>

              <div className="grid gap-4 rounded-2xl bg-white p-4 shadow-[0_12px_38px_rgba(0,0,0,0.05)] sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7A5B0F]">Collection</p>
                  <p className="text-lg font-bold text-[#201607]">{metadata.name}</p>
                  <p className="text-sm text-[#51442B]">Unique on-chain membership signaling activity across the Celo ecosystem.</p>
                </div>
                <div className="space-y-2 rounded-xl bg-[#FBCC5C]/10 p-4 text-[#1A1405] ring-1 ring-[#FBCC5C]/50">
                  <p className="text-xs font-semibold uppercase tracking-wide">Metadata Preview</p>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold">Access: <span className="text-[#2D240F]">Premium</span></span>
                    <span className="font-semibold">Status: <span className="text-[#2D240F]">{hasAccess ? 'Owned' : 'Available'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#FBCC5C]/60 bg-gradient-to-b from-white via-[#FFF7E3] to-white px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-[#1A1405] sm:text-4xl">Mint your premium access</h2>
              <p className="text-base leading-relaxed text-[#40331B]">
                Secure your spot with an on-chain NFT backed by its own smart contract. Every mint sends a clear signal that you&apos;re exploring more than the usual swaps and bridges.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-[#FBCC5C]/40">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#6B520B]">Current Price</p>
                <p className="text-xl font-bold text-[#1A1405]">{formattedPrice}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#3F3319]">
                <span className="h-2 w-2 rounded-full bg-[#35D07F]"></span>
                Secured via contract at 0xa2a5d8c63bD03cfbf01843f2dBdDcc3D9B6158fD
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <ConnectWalletModal />
              <Button
                onClick={handleMint}
                disabled={minting}
                className="w-full rounded-full bg-[#FBCC5C] text-[#1A1405] shadow-[0_18px_50px_rgba(251,204,92,0.45)] transition hover:-translate-y-0.5 hover:bg-[#f7c141]"
              >
                {minting ? 'Minting…' : hasAccess ? 'Mint Another NFT' : 'Mint NFT'}
              </Button>
              {mintMessage && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-sm ${
                    mintMessage.type === 'success'
                      ? 'bg-[#E7F7ED] text-[#1B8A57]'
                      : 'bg-[#FFE4AE] text-[#8A5C05]'
                  }`}
                >
                  {mintMessage.text}
                </div>
              )}
            </div>

            <div className="grid gap-3 rounded-xl bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-[#FBCC5C]/35">
              <div className="flex items-center justify-between text-sm text-[#3F3319]">
                <span className="font-semibold">Access Status</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hasAccess ? 'bg-[#E7F7ED] text-[#1B8A57]' : 'bg-[#FFF4D1] text-[#6B520B]'}`}>
                  {hasAccess ? 'NFT Detected' : 'Mint Required'}
                </span>
              </div>
              <p className="text-sm text-[#3F3319]">Your NFT unlocks premium modules and creates a clear on-chain footprint for your account.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
