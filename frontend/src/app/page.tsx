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
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FFFBF1] to-white pb-20">
      <section className="container-layout relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(251,204,92,0.35),transparent_35%),_radial-gradient(circle_at_80%_10%,rgba(251,204,92,0.25),transparent_30%),_radial-gradient(circle_at_50%_90%,rgba(251,204,92,0.22),transparent_32%)]" />
        <div className="mx-auto max-w-5xl rounded-[28px] border border-[#FBCC5C]/40 bg-white/80 px-8 py-14 text-center shadow-[0_28px_90px_rgba(251,204,92,0.35)] backdrop-blur">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7">
            <div className="inline-flex items-center gap-3 rounded-full bg-[#FBCC5C]/20 px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2C2108] ring-1 ring-[#FBCC5C]">
              Chain Diversity. Real Signals.
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-[#171208] sm:text-5xl">
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
        <div className="grid items-center gap-10 rounded-[30px] bg-white p-8 shadow-[0_28px_100px_rgba(0,0,0,0.08)] lg:grid-cols-[1.25fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-[#FBCC5C]/50 bg-gradient-to-br from-white via-[#FFF6D9] to-white p-7 shadow-[0_22px_70px_rgba(0,0,0,0.06)]">
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-[#FBCC5C] px-4 py-2 text-xs font-semibold uppercase text-[#1A1405] shadow-[0_12px_32px_rgba(251,204,92,0.45)]">
              Premium Access
            </div>
            <div className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase text-[#6B520B] ring-1 ring-[#FBCC5C]/60">
              {metadata.symbol}
            </div>

            <div className="mt-14 flex flex-col items-center gap-6 lg:mt-16">
              <div className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-[#FBCC5C]/40 bg-white shadow-[0_18px_80px_rgba(0,0,0,0.09)]">
                <Image
                  src="/images/nft-preview.png"
                  alt="CeloModuleX premium NFT"
                  width={520}
                  height={520}
                  className="h-auto w-full"
                  priority
                />
              </div>

              <div className="grid w-full gap-4 rounded-2xl bg-white/90 p-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-[#FBCC5C]/35 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7A5B0F]">Collection</p>
                  <p className="text-xl font-bold text-[#201607]">{metadata.name}</p>
                  <p className="text-sm leading-relaxed text-[#51442B]">Unique on-chain membership signaling activity across the Celo ecosystem.</p>
                </div>
                <div className="space-y-3 rounded-xl bg-[#FBCC5C]/10 p-4 text-[#1A1405] ring-1 ring-[#FBCC5C]/50">
                  <p className="text-xs font-semibold uppercase tracking-wide">Metadata Preview</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <span className="font-semibold">Access: <span className="text-[#2D240F]">Premium</span></span>
                    <span className="font-semibold">Status: <span className="text-[#2D240F]">{hasAccess ? 'Owned' : 'Available'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-[#FBCC5C]/60 bg-gradient-to-b from-white via-[#FFF8E4] to-white px-7 py-9 shadow-[0_22px_70px_rgba(0,0,0,0.06)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FBCC5C]/20 px-4 py-2 text-xs font-semibold uppercase text-[#6B520B] ring-1 ring-[#FBCC5C]/60">
                Mint Pass
              </div>
              <h2 className="text-3xl font-bold leading-tight text-[#1A1405] sm:text-4xl">Mint your premium access</h2>
              <p className="text-base leading-relaxed text-[#40331B]">
                Secure your spot with an on-chain NFT backed by its own smart contract. Every mint sends a clear signal that you&apos;re exploring more than the usual swaps and bridges.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-[0_12px_38px_rgba(0,0,0,0.05)] ring-1 ring-[#FBCC5C]/35">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#6B520B]">Current Price</p>
                <p className="text-2xl font-extrabold text-[#1A1405]">{formattedPrice}</p>
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

            <div className="grid gap-3 rounded-2xl bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-[#FBCC5C]/35">
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
