'use client'

import { Module } from '@/types/module'
import { ModuleCard } from './module-card'
import { MOCK_MODULES } from '@/data/mock-modules'

interface ModuleGridProps {
  category?: string
}

export function ModuleGrid({ category }: ModuleGridProps) {
  const filteredModules = category
    ? MOCK_MODULES.filter(module => module.category === category)
    : MOCK_MODULES

  if (filteredModules.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600">No modules found</h3>
        <p className="text-gray-500">Try selecting a different category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredModules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  )
}
