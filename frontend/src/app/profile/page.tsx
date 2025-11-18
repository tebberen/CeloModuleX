'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useMainHub } from '@/hooks/use-main-hub'
import { useUserProfile } from '@/hooks/use-user-profile'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfilePage() {
  const { isConnected } = useAccount()
  const { createProfile, updateProfile, loading } = useMainHub()
  const { profile } = useUserProfile()
  const [form, setForm] = useState({ username: '', twitter: '', github: '', talent: '', selfID: '' })
  const [message, setMessage] = useState('')

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleCreate = async () => {
    setMessage('')
    try {
      await createProfile(form.username, form.twitter, form.github, form.talent, form.selfID)
      setMessage('Profile created on-chain')
    } catch (error: any) {
      setMessage(error?.message || 'Failed to create profile')
    }
  }

  const handleUpdate = async () => {
    setMessage('')
    try {
      await updateProfile(form.twitter, form.github, form.talent, form.selfID)
      setMessage('Profile updated')
    } catch (error: any) {
      setMessage(error?.message || 'Failed to update profile')
    }
  }

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout py-12 space-y-6">
        <div>
          <p className="text-[#FBCC5C] text-sm uppercase font-semibold">Profile</p>
          <h1 className="text-3xl font-bold text-white">Your on-chain identity</h1>
          <p className="text-white/70">Create or update your MainHub profile and showcase social links.</p>
        </div>

        {!isConnected && <div className="glass-card p-4 text-white/80">Connect a wallet to manage your profile.</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Profile Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['username', 'twitter', 'github', 'talent', 'selfID'].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm capitalize text-white/80">{field}</label>
                  <input
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:border-[#FBCC5C] focus:outline-none"
                    value={(form as any)[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-3">
                <Button onClick={handleCreate} disabled={loading} className="bg-[#FBCC5C] text-black font-semibold hover:brightness-110">
                  {loading ? 'Submitting...' : 'Create Profile'}
                </Button>
                <Button onClick={handleUpdate} variant="outline" disabled={loading} className="border-[#FBCC5C] text-[#FBCC5C]">
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
              {message && <div className="text-sm text-white/80">{message}</div>}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Current Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-white/80">
              {profile ? (
                <>
                  <div><span className="text-white">Username:</span> {profile.username}</div>
                  <div><span className="text-white">Twitter:</span> {profile.twitter}</div>
                  <div><span className="text-white">GitHub:</span> {profile.github}</div>
                  <div><span className="text-white">Talent:</span> {profile.talentProtocol}</div>
                  <div><span className="text-white">SelfID:</span> {profile.selfID}</div>
                  <div><span className="text-white">Actions:</span> {profile.actionCount}</div>
                  <div><span className="text-white">Premium:</span> {profile.hasNFT ? 'Yes' : 'No'}</div>
                </>
              ) : (
                <div>No profile found yet.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
