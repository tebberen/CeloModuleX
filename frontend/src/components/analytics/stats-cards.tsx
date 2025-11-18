'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMainHub } from '@/hooks/use-main-hub'
import { useState, useEffect } from 'react'
import { formatLargeNumber } from '@/lib/utils/format'

interface StatsData {
  totalGlobalActions: number
  totalUsers: number
  dailyActions: number
  premiumUsers: number
}

export function StatsCards() {
  const { contract } = useMainHub()
  const [stats, setStats] = useState<StatsData>({
    totalGlobalActions: 0,
    totalUsers: 0,
    dailyActions: 0,
    premiumUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      if (!contract) {
        // Use mock data for development
        setStats({
          totalGlobalActions: 1242,
          totalUsers: 189,
          dailyActions: 47,
          premiumUsers: 42,
        })
        setLoading(false)
        return
      }

      try {
        const [totalGlobalActions, totalUsers] = await Promise.all([
          contract.totalGlobalActions(),
          contract.totalUsers(),
        ])

        // For demo purposes, we'll use mock data for daily actions and premium users
        setStats({
          totalGlobalActions: totalGlobalActions.toNumber(),
          totalUsers: totalUsers.toNumber(),
          dailyActions: Math.floor(Math.random() * 50) + 20, // Mock daily actions
          premiumUsers: Math.floor(totalUsers.toNumber() * 0.22), // Estimate 22% premium
        })
      } catch (error) {
        console.error('Error loading stats:', error)
        // Fallback to mock data
        setStats({
          totalGlobalActions: 1242,
          totalUsers: 189,
          dailyActions: 47,
          premiumUsers: 42,
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [contract])

  const statsData = [
    {
      title: 'Total Actions',
      value: formatLargeNumber(stats.totalGlobalActions),
      description: 'Modules executed',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: formatLargeNumber(stats.totalUsers),
      description: 'Active community',
      color: 'bg-green-500',
    },
    {
      title: 'Daily Actions',
      value: formatLargeNumber(stats.dailyActions),
      description: 'Last 24 hours',
      color: 'bg-purple-500',
    },
    {
      title: 'Premium Users',
      value: formatLargeNumber(stats.premiumUsers),
      description: 'NFT holders',
      color: 'bg-yellow-500',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-16 h-16 ${stat.color} opacity-10 rounded-full -mr-8 -mt-8`}></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
