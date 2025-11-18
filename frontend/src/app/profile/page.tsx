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
        <div className="flex flex-col gap-2">
          <p className="text-[#FBCC5C] text-sm uppercase font-semibold">Profile</p>
          <h1 className="text-3xl font-bold text-white">Your on-chain identity</h1>
          <p className="text-white/70">Create or update your MainHub profile and showcase social links.</p>
        </div>

        {!isConnected && <div className="glass-card p-4 text-white/80">Connect a wallet to manage your profile.</div>}

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-6">
          <Card className="bg-gradient-to-br from-[#151917] to-[#0d0f0e] border-white/10 text-white shadow-xl">
            <CardHeader>
              <CardTitle>Profile Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['username', 'twitter', 'github', 'talent', 'selfID'].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm capitalize text-white/80">{field}</label>
                  <input
                    className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white focus:border-[#FBCC5C] focus:outline-none"
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
              {message && <div className="text-sm text-[#FBCC5C]">{message}</div>}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#121513] to-[#0d0f0e] border-white/10 text-white shadow-xl">
            <CardHeader>
              <CardTitle>Current Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-white/80">
              {profile ? (
                <>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">Username:</span>
                    <span className="font-semibold">{profile.username}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">Twitter:</span> <span>{profile.twitter}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">GitHub:</span> <span>{profile.github}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">Talent:</span> <span>{profile.talentProtocol}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">SelfID:</span> <span>{profile.selfID}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">Actions:</span> <span>{profile.actionCount}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-white">Premium:</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${profile.hasNFT ? 'bg-[#FBCC5C] text-black' : 'bg-white/10 text-white'}`}>
                      {profile.hasNFT ? 'Yes' : 'No'}
                    </span>
                  </div>
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
