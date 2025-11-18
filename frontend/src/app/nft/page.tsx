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
      <section className="container-layout py-12 grid gap-8 lg:grid-cols-2">
        <div className="glass-card p-8 space-y-4">
          <Badge className="bg-[#FBCC5C] text-black w-fit">Premium Access</Badge>
          <h1 className="text-3xl font-bold text-white">Unlock the CeloModuleX NFT</h1>
          <p className="text-white/70">Mint to activate premium fees and unlock deeper access across modules.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white">
              <div className="text-xs text-white/60">Mint Price</div>
              <div className="text-xl font-semibold">{formatEther(price || 0n)} CELO</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white">
              <div className="text-xs text-white/60">Current Price</div>
              <div className="text-xl font-semibold">{formatEther(currentPrice || 0n)} CELO</div>
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
            className="bg-[#FBCC5C] text-black font-semibold hover:brightness-110"
          >
            {owned ? 'Already minted' : loading ? 'Minting...' : 'Mint NFT'}
          </Button>
          {message && <div className="text-sm text-white/80">{message}</div>}
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
      </section>
    </main>
  )
}
