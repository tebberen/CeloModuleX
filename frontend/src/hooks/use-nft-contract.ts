'use client'

import { useCallback, useMemo, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { NFT_ACCESS_ABI, NFT_ACCESS_ADDRESS } from '@/lib/config/contracts'
import { Address, parseEther } from 'viem'

export function useNFTContract() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)

  const isReady = useMemo(() => !!publicClient, [publicClient])

  const readContract = useCallback(async <T,>(functionName: string, args: any[] = []) => {
    if (!publicClient) return null
    try {
      return await publicClient.readContract({
        address: NFT_ACCESS_ADDRESS,
        abi: NFT_ACCESS_ABI,
        functionName: functionName as any,
        args,
      }) as T
    } catch (error) {
      console.error('NFT read error', error)
      return null
    }
  }, [publicClient])

  const writeContract = useCallback(async (functionName: string, args: any[] = [], value?: bigint) => {
    if (!walletClient || !address || !publicClient) throw new Error('Wallet not connected')

    const hash = await walletClient.writeContract({
      address: NFT_ACCESS_ADDRESS,
      abi: NFT_ACCESS_ABI,
      functionName: functionName as any,
      args,
      value,
      chain: walletClient.chain,
    })

    return publicClient.waitForTransactionReceipt({ hash })
  }, [walletClient, address, publicClient])

  const getNFTPrice = useCallback(async () => {
    return (await readContract<bigint>('getNFTPrice')) || 0n
  }, [readContract])

  const getCurrentPrice = useCallback(async () => {
    return (await readContract<bigint>('currentPrice')) || 0n
  }, [readContract])

  const hasNFT = useCallback(async (user: Address) => {
    return (await readContract<boolean>('hasNFT', [user])) || false
  }, [readContract])

  const mintNFT = useCallback(async () => {
    setLoading(true)
    try {
      const price = (await getNFTPrice()) || parseEther('0')
      return await writeContract('mintNFT', [], price)
    } finally {
      setLoading(false)
    }
  }, [getNFTPrice, writeContract])

  const getMetadata = useCallback(async () => {
    const [name, symbol] = await Promise.all([
      readContract<string>('name'),
      readContract<string>('symbol'),
    ])
    return { name: name || 'CeloModuleX NFT', symbol: symbol || 'CMX' }
  }, [readContract])

  return {
    loading,
    isReady,
    getNFTPrice,
    getCurrentPrice,
    hasNFT,
    mintNFT,
    getMetadata,
  }
}
