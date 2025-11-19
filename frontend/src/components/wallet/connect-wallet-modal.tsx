'use client'

import { useMemo, useState } from 'react'
import { Wallet, X, Power, CheckCircle2 } from 'lucide-react'
import { useWallet } from '@/hooks/use-wallet'
import { formatAddress } from '@/lib/utils/format'

export function ConnectWalletModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localMessage, setLocalMessage] = useState<string | null>(null)
  const { address, isConnected, handleConnect, disconnectWallet, connectors, isConnecting, error } = useWallet()

  const metaMaskConnector = useMemo(
    () => connectors.find((connector) => connector.name.toLowerCase().includes('metamask') || connector.id.toLowerCase().includes('injected')),
    [connectors]
  )

  const walletConnectConnector = useMemo(
    () => connectors.find((connector) => connector.name.toLowerCase().includes('walletconnect') || connector.id.toLowerCase().includes('walletconnect')),
    [connectors]
  )

  const handleMetaMaskClick = async () => {
    setLocalMessage(null)
    try {
      await handleConnect('metamask')
      setIsModalOpen(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'MetaMask connection failed.'
      setLocalMessage(message)
    }
  }

  const handleWalletConnectClick = async () => {
    setLocalMessage(null)
    try {
      await handleConnect('walletconnect')
      setIsModalOpen(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'WalletConnect connection failed.'
      setLocalMessage(message)
    }
  }

  const handleDisconnectClick = async () => {
    setLocalMessage(null)
    await disconnectWallet()
  }

  const statusColor = isConnected ? 'bg-emerald-400' : 'bg-gray-400'

  return (
    <div className="relative">
      <button
        onClick={() => {
          setLocalMessage(null)
          setIsModalOpen(true)
        }}
        className="flex items-center gap-2 rounded-full bg-[#FBCC5C] px-4 py-2 font-semibold text-black shadow hover:brightness-110"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`}></span>
        {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0f1311] p-6 shadow-2xl border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-[#FBCC5C] font-semibold">Wallet</p>
                <h3 className="text-xl dark:text-white font-bold">Connect to Celo</h3>
                <p className="text-sm text-white/60">Choose a provider to continue</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10"
                aria-label="Close wallet modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleMetaMaskClick}
                disabled={!metaMaskConnector?.ready || isConnecting}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white hover:border-[#FBCC5C]/60 hover:bg-white/10 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBCC5C]/10 text-[#FBCC5C]">
                    <Wallet />
                  </span>
                  <div>
                    <div className="font-semibold">MetaMask</div>
                    <div className="text-xs text-white/60">{metaMaskConnector?.ready ? 'Instant connect' : 'Extension required'}</div>
                  </div>
                </div>
                <div className="text-xs text-[#FBCC5C]">{isConnecting ? 'Connecting…' : 'Connect'}</div>
              </button>

              <button
                onClick={handleWalletConnectClick}
                disabled={!walletConnectConnector?.ready || isConnecting}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white hover:border-[#FBCC5C]/60 hover:bg-white/10 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBCC5C]/10 text-[#FBCC5C]">
                    <Wallet />
                  </span>
                  <div>
                    <div className="font-semibold">WalletConnect</div>
                    <div className="text-xs text-white/60">{walletConnectConnector?.ready ? 'QR or mobile' : 'Unavailable'}</div>
                  </div>
                </div>
                <div className="text-xs text-[#FBCC5C]">{isConnecting ? 'Connecting…' : 'Connect'}</div>
              </button>
            </div>

            {isConnected && address && (
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">Connected</div>
                    <div className="text-xs text-white/60">{formatAddress(address)}</div>
                  </div>
                  <CheckCircle2 className="text-[#FBCC5C]" />
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className={`h-2 w-2 rounded-full ${statusColor}`}></span>
                  <span>Active session</span>
                </div>
                <button
                  onClick={handleDisconnectClick}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#FBCC5C] px-3 py-2 text-sm font-semibold text-black hover:brightness-110"
                >
                  <Power size={16} /> Disconnect
                </button>
              </div>
            )}

            {(localMessage || error) && (
              <div className="mt-4 text-xs text-red-400">{localMessage || error}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
