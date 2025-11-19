'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Address } from 'viem'
import { useAccount, useConnect, useDisconnect, Connector } from 'wagmi'
import { useMainHub } from '@/hooks/use-main-hub'

type ConnectorType = 'metamask' | 'walletconnect'

function matchesConnector(connector: Connector, keywords: string[]) {
  const name = connector.name.toLowerCase()
  const id = connector.id.toLowerCase()
  return keywords.some((keyword) => name.includes(keyword) || id.includes(keyword))
}

export function useWallet() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { getUserProfile } = useMainHub()

  const [walletAddress, setWalletAddress] = useState<Address | null>(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address)
      setConnected(true)
    } else if (!isConnected) {
      setWalletAddress(null)
      setConnected(false)
    }
  }, [address, isConnected])

  const connectorMap = useMemo(() => ({
    metamask: connectors.find((connector) => matchesConnector(connector, ['metamask', 'injected'])),
    walletconnect: connectors.find((connector) => matchesConnector(connector, ['walletconnect'])),
  }), [connectors])

  const handleConnect = useCallback(async (connectorType: ConnectorType) => {
    setError(null)
    setIsConnecting(true)
    try {
      const connector = connectorMap[connectorType]
      if (!connector) {
        throw new Error(`The ${connectorType} connector is unavailable.`)
      }

      const result = await connectAsync({ connector })
      const connectedAddress = result?.account as Address | undefined
      if (!connectedAddress) {
        throw new Error('Wallet connected but no address was provided.')
      }

      setWalletAddress(connectedAddress)
      setConnected(true)

      const profile = getUserProfile ? await getUserProfile(connectedAddress) : null
      if (profile && profile.username) {
        router.push('/modules')
      } else {
        router.push('/create-profile')
      }

      return connectedAddress
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect wallet.'
      setError(message)
      throw err
    } finally {
      setIsConnecting(false)
    }
  }, [connectAsync, connectorMap, getUserProfile, router])

  const disconnectWallet = useCallback(async () => {
    setError(null)
    try {
      await disconnectAsync()
    } finally {
      setConnected(false)
      setWalletAddress(null)
    }
  }, [disconnectAsync])

  return {
    address: walletAddress,
    isConnected: connected,
    isConnecting,
    error,
    handleConnect,
    disconnectWallet,
    connectors,
  }
}
