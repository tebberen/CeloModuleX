'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useMainHub } from '@/hooks/use-main-hub'
import { ActionCard } from '@/components/ui/action-card'

const MODULE_ACTIONS = [
  {
    id: 1,
    title: 'GM Module',
    description: 'Send an on-chain GM ping through MainHub',
    data: '0x',
    premium: false,
    action: 'gm',
    meta: 'No fee • Instant',
  },
  {
    id: 2,
    title: 'Donate',
    description: 'Send a 0.01 CELO gratitude donation',
    data: '0x',
    premium: false,
    action: 'donate',
    meta: 'Fixed 0.01 CELO',
  },
  {
    id: 3,
    title: 'Deploy',
    description: 'Trigger a demo deploy action via MainHub',
    data: '0x',
    premium: true,
    action: 'deploy',
    meta: 'Premium module',
  },
]

export default function ModulesPage() {
  const { executeModule, executeDonate, loading } = useMainHub()
  const [status, setStatus] = useState('')

  const handleExecute = async (actionId: number, action: string, premium: boolean) => {
    setStatus('')
    try {
      if (action === 'donate') {
        await executeDonate()
      } else {
        await executeModule(actionId, '0x', premium, action === 'deploy' ? parseEther('0') : undefined)
      }
      setStatus('Action executed on-chain')
    } catch (error: any) {
      setStatus(error?.message || 'Execution failed')
    }
  }

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout py-12 space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-[#FBCC5C] text-sm uppercase font-semibold">Modules</p>
          <h1 className="text-3xl font-bold text-white">Launch modular actions</h1>
          <p className="text-white/70 max-w-2xl">Run GM, Donate, Deploy and more through MainHub with a single click.</p>
        </div>

        {status && (
          <div className="rounded-xl border border-[#FBCC5C]/30 bg-[#FBCC5C]/10 px-4 py-3 text-sm text-[#FBCC5C]">{status}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {MODULE_ACTIONS.map((module) => (
            <ActionCard
              key={module.id}
              title={module.title}
              description={module.description}
              badge={module.premium ? 'Premium' : 'Basic'}
              accent={module.premium ? 'secondary' : 'primary'}
              meta={module.meta}
              onAction={() => handleExecute(module.id, module.action, module.premium)}
              actionLabel="Execute"
              loading={loading}
              disabled={loading}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
