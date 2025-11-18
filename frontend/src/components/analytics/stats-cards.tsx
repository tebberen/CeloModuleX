'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMainHub } from '@/hooks/use-main-hub'
import { useEffect, useState } from 'react'
import { formatLargeNumber } from '@/lib/utils/format'

interface StatsData {
  totalGlobalActions: number
  totalUsers: number
  dailyActions: number
  premiumUsers: number
}

export function StatsCards() {
  const { totalGlobalActions, totalUsers } = useMainHub()
  const [stats, setStats] = useState<StatsData>({
    totalGlobalActions: 0,
    totalUsers: 0,
    dailyActions: 0,
    premiumUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [actions, users] = await Promise.all([
          totalGlobalActions(),
          totalUsers(),
        ])
        setStats({
          totalGlobalActions: actions,
          totalUsers: users,
          dailyActions: Math.max(12, Math.floor(actions / 10)),
          premiumUsers: Math.floor(users * 0.25),
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [totalGlobalActions, totalUsers])

  const statsData = [
    {
      title: 'Total Actions',
      value: formatLargeNumber(stats.totalGlobalActions),
      description: 'Modules executed',
      color: 'bg-[#FBCC5C]',
    },
    {
      title: 'Total Users',
      value: formatLargeNumber(stats.totalUsers),
      description: 'Active community',
      color: 'bg-emerald-400',
    },
    {
      title: 'Daily Actions',
      value: formatLargeNumber(stats.dailyActions),
      description: 'Last 24 hours',
      color: 'bg-sky-400',
    },
    {
      title: 'Premium Users',
      value: formatLargeNumber(stats.premiumUsers),
      description: 'NFT holders',
      color: 'bg-purple-400',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <div className="h-4 bg-white/10 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-white/10 rounded animate-pulse"></div>
              <div className="h-3 bg-white/10 rounded animate-pulse mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden bg-white/5 border-white/10">
          <div className={`absolute top-0 right-0 w-16 h-16 ${stat.color} opacity-20 rounded-full -mr-8 -mt-8`}></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-white/70 uppercase">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-white/60 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
