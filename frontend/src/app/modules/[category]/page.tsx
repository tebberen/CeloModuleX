'use client'

import { ConnectWalletModal } from '@/components/wallet/connect-wallet-modal'
import { ModuleGrid } from '@/components/modules/module-grid'
import { CategoryFilter } from '@/components/modules/category-filter'
import { MODULE_CATEGORIES } from '@/lib/utils/constants'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category as keyof typeof MODULE_CATEGORIES
  const categoryInfo = MODULE_CATEGORIES[category]

  if (!categoryInfo) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-celo-green hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    )
  }

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
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 ${categoryInfo.color} rounded-lg flex items-center justify-center`}>
              <span className="text-lg">🧩</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{categoryInfo.name} Modules</h2>
              <p className="text-gray-600">{categoryInfo.description}</p>
            </div>
          </div>
          
          <CategoryFilter currentCategory={category} />
        </div>

        {/* Modules Grid */}
        <ModuleGrid category={category} />
      </div>
    </main>
  )
}
