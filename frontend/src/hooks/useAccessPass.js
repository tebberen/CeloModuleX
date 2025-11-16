import { useCallback, useEffect, useState } from 'react'
import { getAccessNftContract, getRpcProvider } from '../services/blockchain'
import { useWallet } from './useWallet'

export const useAccessPass = () => {
  const { signer, address, isConnected } = useWallet()
  const [price, setPrice] = useState(null)
  const [hasPass, setHasPass] = useState(false)
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadPrice = useCallback(async () => {
    const provider = signer || getRpcProvider()
    const contract = getAccessNftContract(provider)
    const value = await contract.getNFTPrice()
    setPrice(value)
  }, [signer])

  const loadOwnership = useCallback(async () => {
    if (!address) return
    const provider = signer || getRpcProvider()
    const contract = getAccessNftContract(provider)
    const owns = await contract.hasNFT(address)
    setHasPass(owns)
  }, [address, signer])

  const fetchMetadata = useCallback(async () => {
    try {
      const provider = signer || getRpcProvider()
      const contract = getAccessNftContract(provider)
      const uri = await contract.tokenURI(1)
      const res = await fetch(uri)
      const data = await res.json()
      setMetadata(data)
    } catch (err) {
      console.error('metadata fetch failed', err)
    }
  }, [signer])

  const mint = useCallback(async () => {
    if (!signer) throw new Error('Connect wallet to mint')
    const contract = getAccessNftContract(signer)
    const currentPrice = price || (await contract.getNFTPrice())
    const tx = await contract.mintNFT({ value: currentPrice })
    await tx.wait()
    await loadOwnership()
  }, [signer, price, loadOwnership])

  useEffect(() => {
    loadPrice()
  }, [loadPrice])

  useEffect(() => {
    if (isConnected) {
      loadOwnership()
    }
  }, [isConnected, loadOwnership])

  useEffect(() => {
    fetchMetadata()
  }, [fetchMetadata])

  return { price, hasPass, metadata, loading, setLoading, mint }
}
