'use client'

import { useState, useEffect } from 'react'
import { useProvider } from 'wagmi'
import { MAIN_HUB_ADDRESS, MAIN_HUB_ABI } from '@/lib/config/contracts'
import { ethers } from 'ethers'

export interface Transaction {
  hash: string
  from: string
  moduleId: number
  timestamp: number
  fee: string
}

export function useTransactions(userAddress?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const provider = useProvider()

  useEffect(() => {
    const loadTransactions = async () => {
      if (!userAddress) {
        setTransactions([])
        return
      }

      setLoading(true)
      try {
        // This would typically query The Graph or similar for user transactions
        // For now, we'll use mock data or event queries
        const contract = new ethers.Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, provider)
        
        // Query ModuleExecuted events for the user
        const filter = contract.filters.ModuleExecuted(userAddress)
        const events = await contract.queryFilter(filter, -10000) // Last 10000 blocks
        
        const userTransactions: Transaction[] = await Promise.all(
          events.map(async (event) => {
            const tx = await event.getTransaction()
            return {
              hash: event.transactionHash,
              from: event.args?.user,
              moduleId: event.args?.moduleId.toNumber(),
              timestamp: (await event.getBlock()).timestamp,
              fee: ethers.utils.formatEther(tx.value || '0'),
            }
          })
        )

        setTransactions(userTransactions.reverse()) // Most recent first
      } catch (error) {
        console.error('Error loading transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [userAddress, provider])

  return {
    transactions,
    loading,
  }
}
