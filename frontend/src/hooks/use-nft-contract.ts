'use client'

import { useContract, useProvider, useSigner } from 'wagmi'
import { NFT_ACCESS_ABI, NFT_ACCESS_ADDRESS } from '@/lib/config/contracts'
import { useState } from 'react'
import { ethers } from 'ethers'

export function useNFTContract() {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const contract = useContract({
    address: NFT_ACCESS_ADDRESS,
    abi: NFT_ACCESS_ABI,
    signerOrProvider: signer || provider,
  })

  const [loading, setLoading] = useState(false)

  const mintNFT = async () => {
    if (!contract) throw new Error('Contract not initialized')
    
    setLoading(true)
    try {
      const price = await contract.getNFTPrice()
      const tx = await contract.mintNFT({ value: price })
      await tx.wait()
      return tx
    } finally {
      setLoading(false)
    }
  }

  const getNFTPrice = async () => {
    if (!contract) return ethers.BigNumber.from(0)
    
    try {
      const price = await contract.getNFTPrice()
      return price
    } catch {
      return ethers.BigNumber.from(0)
    }
  }

  const hasNFT = async (address: string) => {
    if (!contract) return false
    
    try {
      const hasNFT = await contract.hasNFT(address)
      return hasNFT
    } catch {
      return false
    }
  }

  const getCurrentPrice = async () => {
    if (!contract) return ethers.BigNumber.from(0)
    
    try {
      const price = await contract.currentPrice()
      return price
    } catch {
      return ethers.BigNumber.from(0)
    }
  }

  return {
    contract,
    loading,
    mintNFT,
    getNFTPrice,
    hasNFT,
    getCurrentPrice,
  }
}
