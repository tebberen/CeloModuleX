'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMainHub } from '@/hooks/use-main-hub'
import { useAccount } from 'wagmi'

export function CreateProfile() {
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    twitter: '',
    github: '',
    talentProtocol: '',
    selfID: '',
  })
  const { createProfile, loading } = useMainHub()
  const { address, isConnected } = useAccount()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !address) return

    setIsCreating(true)
    try {
      await createProfile(
        formData.username,
        formData.twitter,
        formData.github,
        formData.talentProtocol,
        formData.selfID
      )
      // Reset form after successful creation
      setFormData({
        username: '',
        twitter: '',
        github: '',
        talentProtocol: '',
        selfID: '',
      })
    } catch (error) {
      console.error('Error creating profile:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
          <CardDescription>
            Connect your wallet to create your CeloModuleX profile
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
        <CardDescription>
          Build your on-chain identity and track your activity across the ecosystem
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username *
            </label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="celobuilder"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium mb-1">
                Twitter
              </label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="username"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium mb-1">
                GitHub
              </label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="talentProtocol" className="block text-sm font-medium mb-1">
                Talent Protocol
              </label>
              <Input
                id="talentProtocol"
                name="talentProtocol"
                value={formData.talentProtocol}
                onChange={handleInputChange}
                placeholder="username"
              />
            </div>

            <div>
              <label htmlFor="selfID" className="block text-sm font-medium mb-1">
                Self.ID
              </label>
              <Input
                id="selfID"
                name="selfID"
                value={formData.selfID}
                onChange={handleInputChange}
                placeholder="username.self.id"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Why create a profile?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Track your on-chain activity and reputation</li>
              <li>• Appear in leaderboards and community rankings</li>
              <li>• Build verifiable credentials for grants and opportunities</li>
              <li>• Connect with other builders in the ecosystem</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit"
            disabled={!formData.username || isCreating || loading}
            className="w-full"
          >
            {isCreating ? 'Creating Profile...' : 'Create On-Chain Profile'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
