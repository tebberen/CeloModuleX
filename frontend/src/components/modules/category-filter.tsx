'use client'

import Link from 'next/link'
import { MODULE_CATEGORIES } from '@/lib/utils/constants'

interface CategoryFilterProps {
  currentCategory?: string
}

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const categories = Object.entries(MODULE_CATEGORIES)

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/"
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          !currentCategory
            ? 'bg-celo-green text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Modules
      </Link>
      
      {categories.map(([key, category]) => (
        <Link
          key={key}
          href={`/modules/${key}`}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentCategory === key
              ? 'bg-celo-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
