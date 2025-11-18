'use client'

import { useEffect, useState } from 'react'
import { useMainHub } from '@/hooks/use-main-hub'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StatsPage() {
  const { totalGlobalActions, totalUsers, getAllModuleIds, getModule } = useMainHub()
  const [actions, setActions] = useState(0)
  const [users, setUsers] = useState(0)
  const [modules, setModules] = useState<number[]>([])

  useEffect(() => {
    const load = async () => {
      const [a, u, ids] = await Promise.all([
        totalGlobalActions(),
        totalUsers(),
        getAllModuleIds(),
      ])
      setActions(a)
      setUsers(u)
      setModules(ids ? ids.map(Number) : [])
    }
    load()
  }, [totalGlobalActions, totalUsers, getAllModuleIds])

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout py-12 space-y-6">
        <div>
          <p className="text-[#FBCC5C] text-sm uppercase font-semibold">Stats</p>
          <h1 className="text-3xl font-bold text-white">MainHub activity</h1>
          <p className="text-white/70">Live counters direct from the MainHub smart contract.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Total Global Actions</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{actions}</CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{users}</CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Registered Modules</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{modules.length}</CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Module Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80">
            {modules.length === 0 ? (
              <div>No modules discovered yet.</div>
            ) : (
              modules.map((id) => (
                <div key={id} className="flex items-center justify-between border-b border-white/5 py-2 last:border-0">
                  <span>Module #{id}</span>
                  <ModuleSummary id={id} getModule={getModule} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function ModuleSummary({ id, getModule }: { id: number; getModule: (id: number) => Promise<any> }) {
  const [text, setText] = useState('Loading...')

  useEffect(() => {
    const load = async () => {
      const data = await getModule(id)
      if (!data) {
        setText('Unavailable')
      } else {
        const [, active,, , premium, version] = data as [string, boolean, number, number, boolean, number]
        setText(`${active ? 'Active' : 'Paused'} • ${premium ? 'Premium' : 'Basic'} • v${version}`)
      }
    }
    load()
  }, [id, getModule])

  return <span className="text-sm text-white/70">{text}</span>
}
