'use client'

import { ConnectButton } from '@/components/wallet/connect-button'
import { ModuleGrid } from '@/components/modules/module-grid'
import { CategoryFilter } from '@/components/modules/category-filter'
import { StatsCards } from '@/components/analytics/stats-cards'
import { NFTAccess } from '@/components/nft/nft-access'
import { UserStats } from '@/components/profile/user-stats'
import { ActivityFeed } from '@/components/analytics/activity-feed'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-celo-green rounded-lg flex items-center justify-center text-white font-bold">
                🧩
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CeloModuleX</h1>
                <p className="text-sm text-gray-600">Modular On-Chain Action Platform</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Execute Any On-Chain Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Interact with hundreds of smart-contract functions through a single interface. 
            Pay <span className="font-semibold">0.1 CELO</span> per action, or just{' '}
            <span className="font-semibold">0.01 CELO</span> with Premium NFT Access.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className="font-semibold">🧩 Modular</span>
              <span className="text-gray-600 ml-2">Expandable ecosystem</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className="font-semibold">💎 Premium</span>
              <span className="text-gray-600 ml-2">90% fee discount</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className="font-semibold">🔗 Multi-chain</span>
              <span className="text-gray-600 ml-2">Celo & more</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <StatsCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Available Modules</h3>
              <CategoryFilter />
            </div>
            <ModuleGrid />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NFTAccess />
            <UserStats />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </main>
  )
}
