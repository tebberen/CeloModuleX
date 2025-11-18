'use client'

import { ReactNode } from 'react'
import { Badge } from './badge'
import { Button } from './button'

interface ActionCardProps {
  title: string
  description: string
  badge?: string
  accent?: 'primary' | 'secondary'
  meta?: string
  onAction: () => void
  actionLabel: string
  loading?: boolean
  disabled?: boolean
  footer?: ReactNode
}

export function ActionCard({
  title,
  description,
  badge,
  accent = 'primary',
  meta,
  onAction,
  actionLabel,
  loading,
  disabled,
  footer,
}: ActionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#121513] to-[#0d0f0e] p-5 shadow-lg">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#FBCC5C]/10 blur-2xl"></div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">Module</p>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/70 mt-1">{description}</p>
        </div>
        {badge && (
          <Badge className={accent === 'primary' ? 'bg-[#FBCC5C] text-black' : 'bg-white/10 text-white'}>{badge}</Badge>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-white/60">
        <span>{meta}</span>
        {footer}
      </div>

      <Button
        className="mt-4 w-full bg-[#FBCC5C] text-black font-semibold hover:brightness-110"
        onClick={onAction}
        disabled={disabled}
      >
        {loading ? 'Processing...' : actionLabel}
      </Button>
    </div>
  )
}
