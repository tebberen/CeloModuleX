'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useMainHub } from '@/hooks/use-main-hub'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const MODULE_ACTIONS = [
  {
    id: 1,
    title: 'GM Module',
    description: 'Send an on-chain GM ping through MainHub',
    data: '0x',
    premium: false,
    action: 'gm',
  },
  {
    id: 2,
    title: 'Donate',
    description: 'Send a 0.01 CELO gratitude donation',
    data: '0x',
    premium: false,
    action: 'donate',
  },
  {
    id: 3,
    title: 'Deploy',
    description: 'Trigger a demo deploy action via MainHub',
    data: '0x',
    premium: true,
    action: 'deploy',
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
          <div className="glass-card p-4 text-sm text-white/80">{status}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODULE_ACTIONS.map((module) => (
            <Card key={module.id} className="bg-white/5 border-white/10 text-white">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  {module.premium && <Badge className="bg-[#FBCC5C] text-black">Premium</Badge>}
                </div>
                <p className="text-sm text-white/70">{module.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Fee</span>
                  <span className="font-semibold text-white">{module.premium ? 'Premium fee' : 'Basic fee'}</span>
                </div>
                <Button
                  disabled={loading}
                  onClick={() => handleExecute(module.id, module.action, module.premium)}
                  className="w-full bg-[#FBCC5C] text-black font-semibold hover:brightness-110"
                >
                  {loading ? 'Executing...' : 'Execute'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
