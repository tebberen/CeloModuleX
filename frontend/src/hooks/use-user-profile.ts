'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { UserProfile } from '@/types/user'
import { useMainHub } from './use-main-hub'
import { useNFTContract } from './use-nft-contract'

export function useUserProfile() {
  const { address } = useAccount()
  const { getUserProfile } = useMainHub()
  const { hasNFT } = useNFTContract()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      if (!address) {
        setProfile(null)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const [profileData, userHasNFT] = await Promise.all([
          getUserProfile(address),
          hasNFT(address),
        ])

        if (profileData) {
          setProfile({
            username: profileData.username,
            twitter: profileData.twitter,
            github: profileData.github,
            talentProtocol: profileData.talent,
            selfID: profileData.selfID,
            actionCount: profileData.actionCount,
            hasNFT: userHasNFT,
            exists: true,
          })
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [address, getUserProfile, hasNFT])

  return {
    profile,
    loading,
  }
}
