'use client'

import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { useNFTContract } from '@/hooks/use-nft-contract'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function NFTPage() {
  const { address } = useAccount()
  const { getNFTPrice, getCurrentPrice, hasNFT, mintNFT, getMetadata, loading } = useNFTContract()
  const [price, setPrice] = useState<bigint>(0n)
  const [currentPrice, setCurrentPrice] = useState<bigint>(0n)
  const [owned, setOwned] = useState(false)
  const [meta, setMeta] = useState<{ name?: string; symbol?: string }>({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const [p, cp, metadata] = await Promise.all([
        getNFTPrice(),
        getCurrentPrice(),
        getMetadata(),
      ])
      setPrice(p || 0n)
      setCurrentPrice(cp || 0n)
      setMeta(metadata)
      if (address) {
        setOwned(await hasNFT(address))
      }
    }
    load()
  }, [address, getNFTPrice, getCurrentPrice, hasNFT, getMetadata])

  const handleMint = async () => {
    setMessage('')
    try {
      await mintNFT()
      setOwned(true)
      setMessage('NFT minted successfully')
    } catch (error: any) {
      setMessage(error?.message || 'Mint failed')
    }
  }

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout py-12 space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase font-semibold text-[#FBCC5C]">Access NFT</p>
          <h1 className="text-3xl font-bold text-white">CeloModuleX Access NFT</h1>
          <p className="text-white/70 max-w-2xl">Mint to activate premium modules, highlight your profile, and unlock fee perks.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr] items-start">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#161a18] to-[#0d0f0e] p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <Badge className="bg-[#FBCC5C] text-black">Premium Access</Badge>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${owned ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/10 text-white'}`}>
                {owned ? 'Premium Active' : 'Mint required'}
              </div>
            </div>
            <div className="aspect-square w-full rounded-2xl border border-white/10 bg-[#0b0e0d] flex items-center justify-center text-5xl">
              🛡️
            </div>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase text-white/60">Mint Price</div>
                <div className="text-2xl font-semibold">{formatEther(price || 0n)} CELO</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase text-white/60">Current Price</div>
                <div className="text-2xl font-semibold">{formatEther(currentPrice || 0n)} CELO</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className={`px-3 py-1 rounded-full text-sm ${owned ? 'bg-[#FBCC5C] text-black' : 'bg-white/10 text-white'}`}>
                {owned ? 'Premium Access Active' : 'No NFT yet'}
              </div>
              {meta.name && <span>{meta.name} ({meta.symbol})</span>}
            </div>
            <Button
              onClick={handleMint}
              disabled={loading || owned}
              className="bg-[#FBCC5C] text-black font-semibold hover:brightness-110 w-full"
            >
              {owned ? 'Already minted' : loading ? 'Minting...' : 'Mint NFT'}
            </Button>
            {message && <div className="text-sm text-[#FBCC5C]">{message}</div>}
          </div>

          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>NFT Utilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-white/80">
              <div>• Premium fee discount across modules</div>
              <div>• Leaderboard highlighting and profile badge</div>
              <div>• Future MainHub module allowlist</div>
              <div>• Proof of participation on Celo</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
