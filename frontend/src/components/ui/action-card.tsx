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
    <div className="relative overflow-hidden rounded-2xl border border-[#F2D8AE] bg-gradient-to-br from-[#FFFDF4] to-[#FFE7BF] p-5 shadow-md">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#FBE3A6]/60 blur-2xl"></div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#B98A34]">Module</p>
          <h3 className="text-xl font-semibold text-[#2F210F]">{title}</h3>
          <p className="text-sm text-[#6A563A] mt-1">{description}</p>
        </div>
        {badge && (
          <Badge className={accent === 'primary' ? 'bg-[#FBE0A8] text-[#6F4A00]' : 'bg-[#E6F9EF] text-[#1A8A57]'}>{badge}</Badge>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[#6A563A]">
        <span>{meta}</span>
        {footer}
      </div>

      <Button
        className="mt-4 w-full bg-[#F6D371] text-[#3C2500] font-semibold hover:brightness-110 shadow-[0_10px_30px_rgba(246,211,113,0.45)]"
        onClick={onAction}
        disabled={disabled}
      >
        {loading ? 'Processing...' : actionLabel}
      </Button>
    </div>
  )
}
