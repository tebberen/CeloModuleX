'use client'

import { useMemo, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { X, Wallet, Power, CheckCircle2 } from 'lucide-react'

function formatAddress(address?: string) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { connectAsync, connectors, isLoading, pendingConnector, error } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const statusColor = useMemo(() => {
    if (!chain) return 'bg-gray-400'
    if (chain.id === 42220) return 'bg-emerald-400'
    return 'bg-amber-300'
  }, [chain])

  const preferredConnectors = useMemo(
    () =>
      connectors.filter((connector) => {
        const name = connector.name.toLowerCase()
        return name.includes('metamask') || name.includes('walletconnect')
      }),
    [connectors]
  )
  const visibleConnectors = preferredConnectors.length ? preferredConnectors : connectors

  const handleConnect = async (connectorId: string) => {
    setMessage('')
    const connector = visibleConnectors.find((c) => c.id === connectorId)
    if (!connector) return
    try {
      await connectAsync({ connector })
      setOpen(false)
    } catch (err: any) {
      setMessage(err?.message || 'Failed to connect')
    }
  }

  const handleDisconnect = async () => {
    setMessage('')
    try {
      await disconnectAsync()
      setOpen(false)
    } catch (err: any) {
      setMessage(err?.message || 'Failed to disconnect')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full bg-[#FBCC5C] px-4 py-2 font-semibold text-black shadow hover:brightness-110"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`}></span>
        {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0f1311] p-6 shadow-2xl border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-[#FBCC5C] font-semibold">Wallet</p>
                <h3 className="text-xl font-bold text-white">Connect to Celo</h3>
                <p className="text-sm text-white/60">Choose a provider to continue</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10"
                aria-label="Close wallet modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {visibleConnectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector.id)}
                  disabled={!connector.ready || isLoading}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white hover:border-[#FBCC5C]/60 hover:bg-white/10 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBCC5C]/10 text-[#FBCC5C]">
                      <Wallet />
                    </span>
                    <div>
                      <div className="font-semibold">{connector.name}</div>
                      <div className="text-xs text-white/60">{connector.ready ? 'Instant connect' : 'Unavailable'}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#FBCC5C]">
                    {isLoading && pendingConnector?.id === connector.id ? 'Connecting...' : 'Connect'}
                  </div>
                </button>
              ))}
            </div>

            {isConnected && address && (
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">Connected</div>
                    <div className="text-xs text-white/60">{formatAddress(address)} • {chain?.name || 'Celo'}</div>
                  </div>
                  <CheckCircle2 className="text-[#FBCC5C]" />
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className={`h-2 w-2 rounded-full ${statusColor}`}></span>
                  <span>{chain?.name || 'Unknown network'}</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#FBCC5C] px-3 py-2 text-sm font-semibold text-black hover:brightness-110"
                >
                  <Power size={16} /> Disconnect
                </button>
              </div>
            )}

            {(message || error) && (
              <div className="mt-4 text-xs text-red-400">{message || error?.message}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
