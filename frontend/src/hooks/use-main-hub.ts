'use client'

import { useContract, useProvider, useSigner } from 'wagmi'
import { MAIN_HUB_ABI, MAIN_HUB_ADDRESS } from '@/lib/config/contracts'
import { useState } from 'react'

export function useMainHub() {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const contract = useContract({
    address: MAIN_HUB_ADDRESS,
    abi: MAIN_HUB_ABI,
    signerOrProvider: signer || provider,
  })

  const [loading, setLoading] = useState(false)

  const executeModule = async (moduleId: number, data: string, isPremium: boolean) => {
    if (!contract) throw new Error('Contract not initialized')
    
    setLoading(true)
    try {
      const fee = isPremium ? await contract.premiumFee() : await contract.basicFee()
      const tx = await contract.executeModule(moduleId, data, { value: fee })
      await tx.wait()
      return tx
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (
    username: string,
    twitter: string,
    github: string,
    talent: string,
    selfID: string
  ) => {
    if (!contract) throw new Error('Contract not initialized')
    
    setLoading(true)
    try {
      const tx = await contract.createProfile(username, twitter, github, talent, selfID)
      await tx.wait()
      return tx
    } finally {
      setLoading(false)
    }
  }

  const getUserProfile = async (address: string) => {
    if (!contract) return null
    
    try {
      const profile = await contract.getUserProfile(address)
      return profile
    } catch {
      return null
    }
  }

  const getModule = async (moduleId: number) => {
    if (!contract) return null
    
    try {
      const module = await contract.getModule(moduleId)
      return module
    } catch {
      return null
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

  return {
    contract,
    loading,
    executeModule,
    createProfile,
    getUserProfile,
    getModule,
    hasNFT,
  }
}
