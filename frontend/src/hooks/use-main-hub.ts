'use client'

import { useCallback, useMemo, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { MAIN_HUB_ABI, MAIN_HUB_ADDRESS } from '@/lib/config/contracts'
import { Address, Hex, parseEther } from 'viem'

export function useMainHub() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)

  const isReady = useMemo(() => !!publicClient, [publicClient])

  const readContract = useCallback(async <T,>(functionName: string, args: any[] = []): Promise<T | null> => {
    if (!publicClient) return null
    try {
      return await publicClient.readContract({
        address: MAIN_HUB_ADDRESS,
        abi: MAIN_HUB_ABI,
        functionName: functionName as any,
        args,
      }) as T
    } catch (error) {
      console.error('MainHub read error', error)
      return null
    }
  }, [publicClient])

  const writeContract = useCallback(async (
    functionName: string,
    args: any[] = [],
    value?: bigint,
  ) => {
    if (!walletClient || !address || !publicClient) throw new Error('Wallet not connected')

    const hash = await walletClient.writeContract({
      address: MAIN_HUB_ADDRESS,
      abi: MAIN_HUB_ABI,
      functionName: functionName as any,
      args,
      value,
      chain: walletClient.chain,
    })

    return publicClient.waitForTransactionReceipt({ hash })
  }, [walletClient, address, publicClient])

  const executeModule = useCallback(async (moduleId: number, data: Hex = '0x', isPremium = false, extraValue?: bigint) => {
    setLoading(true)
    try {
      const fee = await readContract<bigint>(isPremium ? 'premiumFee' : 'basicFee') || 0n
      const value = fee + (extraValue || 0n)
      return await writeContract('executeModule', [BigInt(moduleId), data], value)
    } finally {
      setLoading(false)
    }
  }, [readContract, writeContract])

  const createProfile = useCallback(async (
    username: string,
    twitter: string,
    github: string,
    talent: string,
    selfID: string
  ) => {
    setLoading(true)
    try {
      return await writeContract('createProfile', [username, twitter, github, talent, selfID])
    } finally {
      setLoading(false)
    }
  }, [writeContract])

  const updateProfile = useCallback(async (
    twitter: string,
    github: string,
    talent: string,
    selfID: string,
  ) => {
    setLoading(true)
    try {
      return await writeContract('updateProfile', [twitter, github, talent, selfID])
    } finally {
      setLoading(false)
    }
  }, [writeContract])

  const getUserProfile = useCallback(async (user: Address) => {
    const profile = await readContract<any[]>('getUserProfile', [user])
    if (!profile) return null

    const [username, actionCount, twitter, github, talent, selfID, hasNFT] = profile as [string, bigint, string, string, string, string, boolean]
    return {
      username,
      actionCount: Number(actionCount),
      twitter,
      github,
      talent,
      selfID,
      hasNFT,
    }
  }, [readContract])

  const getModule = useCallback(async (moduleId: number) => {
    return await readContract<any>('getModule', [BigInt(moduleId)])
  }, [readContract])

  const getAllModuleIds = useCallback(async () => {
    return await readContract<bigint[]>('getAllModuleIds')
  }, [readContract])

  const totalGlobalActions = useCallback(async () => {
    const value = await readContract<bigint>('totalGlobalActions')
    return value ? Number(value) : 0
  }, [readContract])

  const totalUsers = useCallback(async () => {
    const value = await readContract<bigint>('totalUsers')
    return value ? Number(value) : 0
  }, [readContract])

  const basicFee = useCallback(async () => {
    return (await readContract<bigint>('basicFee')) || 0n
  }, [readContract])

  const premiumFee = useCallback(async () => {
    return (await readContract<bigint>('premiumFee')) || 0n
  }, [readContract])

  const executeDonate = useCallback(async () => {
    const donationValue = parseEther('0.01')
    return executeModule(2, '0x', false, donationValue)
  }, [executeModule])

  return {
    loading,
    isReady,
    executeModule,
    executeDonate,
    createProfile,
    updateProfile,
    getUserProfile,
    getModule,
    getAllModuleIds,
    totalGlobalActions,
    totalUsers,
    basicFee,
    premiumFee,
  }
}
