'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNFTContract } from '@/hooks/use-nft-contract'
import { useAccount } from 'wagmi'

interface MintButtonProps {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function MintButton({ variant = 'default', size = 'default' }: MintButtonProps) {
  const [isMinting, setIsMinting] = useState(false)
  const { mintNFT, loading } = useNFTContract()
  const { isConnected } = useAccount()

  const handleMint = async () => {
    if (!isConnected) return
    
    setIsMinting(true)
    try {
      await mintNFT()
    } catch (error) {
      console.error('Error minting NFT:', error)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleMint}
      disabled={!isConnected || isMinting || loading}
      className="bg-celo-green hover:bg-celo-green/90"
    >
      {isMinting ? 'Minting...' : '💎 Mint NFT Pass'}
    </Button>
  )
}
