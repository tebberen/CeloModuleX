'use client'

import { ConnectWalletModal } from '@/components/wallet/connect-wallet-modal'
import { UserStats } from '@/components/profile/user-stats'
import { ActivityFeed } from '@/components/analytics/activity-feed'
import { Leaderboard } from '@/components/profile/leaderboard'
import { CreateProfile } from '@/components/profile/create-profile'
import { useUserProfile } from '@/hooks/use-user-profile'
import Link from 'next/link'

export default function Dashboard() {
  const { profile } = useUserProfile()

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-celo-green rounded-lg flex items-center justify-center text-white font-bold">
                  🧩
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CeloModuleX</h1>
                  <p className="text-sm text-gray-600">Modular On-Chain Action Platform</p>
                </div>
              </Link>
            </div>
            <ConnectWalletModal />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Dashboard</h2>
          <p className="text-gray-600">Track your activity and progress in the CeloModuleX ecosystem</p>
        </div>

        {!profile ? (
          <div className="max-w-2xl mx-auto">
            <CreateProfile />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <UserStats />
              <ActivityFeed />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    href="/"
                    className="block w-full bg-celo-green text-white text-center py-3 rounded-lg font-medium hover:bg-celo-green/90 transition-colors"
                  >
                    Browse Modules
                  </Link>
                  {!profile.hasNFT && (
                    <Link 
                      href="/#nft"
                      className="block w-full bg-yellow-500 text-white text-center py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                    >
                      Get Premium NFT
                    </Link>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Modules Used</span>
                      <span>{Math.min(profile.actionCount, 10)}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-celo-green h-2 rounded-full" 
                        style={{ width: `${(Math.min(profile.actionCount, 10) / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Rank</span>
                      <span>#{profile.actionCount > 100 ? 'Top 10' : profile.actionCount > 50 ? 'Top 50' : 'Rising'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((profile.actionCount / 150) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Leaderboard />
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold">First Action</div>
                      <div className="text-sm text-gray-600">Execute your first module</div>
                    </div>
                  </div>
                  
                  {profile.actionCount >= 5 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        5
                      </div>
                      <div>
                        <div className="font-semibold">Module Explorer</div>
                        <div className="text-sm text-gray-600">Execute 5 different modules</div>
                      </div>
                    </div>
                  )}
                  
                  {profile.hasNFT && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                        💎
                      </div>
                      <div>
                        <div className="font-semibold">Premium Member</div>
                        <div className="text-sm text-gray-600">Hold CeloModuleX NFT</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
