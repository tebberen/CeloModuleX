import { useContext } from 'react'
import { WalletContext } from '../context/WalletContext'

export const useWallet = () => {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
