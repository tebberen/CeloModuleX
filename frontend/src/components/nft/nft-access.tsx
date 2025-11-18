'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNFTContract } from '@/hooks/use-nft-contract'
import { useAccount } from 'wagmi'
import { formatEther } from 'ethers/lib/utils'
import { Badge } from '@/components/ui/badge'

export function NFTAccess() {
  const [isMinting, setIsMinting] = useState(false)
  const { mintNFT, getCurrentPrice, hasNFT, loading } = useNFTContract()
  const { address, isConnected } = useAccount()
  const [userHasNFT, setUserHasNFT] = useState(false)
  const [currentPrice, setCurrentPrice] = useState('0')

  const loadNFTData = async () => {
    if (!address) return
    
    try {
      const [price, hasNFTStatus] = await Promise.all([
        getCurrentPrice(),
        hasNFT(address),
      ])
      setCurrentPrice(formatEther(price))
      setUserHasNFT(hasNFTStatus)
    } catch (error) {
      console.error('Error loading NFT data:', error)
    }
  }

  useState(() => {
    loadNFTData()
  })

  const handleMint = async () => {
    if (!isConnected || !address) return
    
    setIsMinting(true)
    try {
      await mintNFT()
      // Refresh NFT status after minting
      await loadNFTData()
    } catch (error) {
      console.error('Error minting NFT:', error)
    } finally {
      setIsMinting(false)
    }
  }

  const benefits = [
    '90% discount on all module fees (0.01 CELO instead of 0.1 CELO)',
    'Access to premium modules',
    'Early access to new features',
    'VIP status in the community',
    'Revenue sharing opportunities (future)',
  ]

  if (userHasNFT) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎉 Premium Member
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </CardTitle>
          <CardDescription>
            You have full access to all CeloModuleX features with premium benefits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Your Benefits</h4>
              <ul className="space-y-1 text-sm">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💎 Premium Access Pass
          <Badge className="bg-yellow-100 text-yellow-800">NFT</Badge>
        </CardTitle>
        <CardDescription>
          Unlock premium features and save 90% on transaction fees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Current Price:</span>
              <span className="text-2xl font-bold text-celo-green">{currentPrice} CELO</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Price increases every +50 modules added to the platform
            </p>
            
            <h4 className="font-semibold mb-2">Benefits Include:</h4>
            <ul className="space-y-1 text-sm mb-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-celo-green rounded-full"></div>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Fee Comparison:</strong><br />
                Without NFT: 0.1 CELO per action<br />
                With NFT: 0.01 CELO per action
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-celo-green hover:bg-celo-green/90"
          onClick={handleMint}
          disabled={!isConnected || isMinting || loading}
          size="lg"
        >
          {!isConnected ? 'Connect Wallet' : 
           isMinting ? 'Minting...' : 
           `Mint NFT for ${currentPrice} CELO`}
        </Button>
      </CardFooter>
    </Card>
  )
}
