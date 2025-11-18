'use client'

import { Badge } from '@/components/ui/badge'

interface PremiumBadgeProps {
  isPremium?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function PremiumBadge({ isPremium = true, size = 'md' }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  if (!isPremium) return null

  return (
    <Badge className={`bg-yellow-100 text-yellow-800 ${sizeClasses[size]}`}>
      💎 Premium
    </Badge>
  )
}
