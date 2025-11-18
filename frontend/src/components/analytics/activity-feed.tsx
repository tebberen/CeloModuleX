'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useTransactions } from '@/hooks/use-transactions'
import { useAccount } from 'wagmi'
import { formatDate } from '@/lib/utils/format'

export function ActivityFeed() {
  const { address } = useAccount()
  const { transactions, loading } = useTransactions(address)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!transactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No activity yet. Execute your first module to get started!
          </p>
        </CardContent>
      </Card>
    )
  }

  const getModuleName = (moduleId: number) => {
    const modules: { [key: number]: string } = {
      1: 'GM',
      2: 'Donate',
      3: 'Deploy',
      4: 'Vote',
      5: 'Achievement',
    }
    return modules[moduleId] || `Module ${moduleId}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 10).map((tx, index) => (
            <div key={tx.hash} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-celo-green rounded-full flex items-center justify-center text-white text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold">
                  {getModuleName(tx.moduleId)} Module
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(tx.timestamp)}
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  Fee: {tx.fee} CELO
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-celo-green">
                  Executed
                </div>
                <div className="text-xs text-gray-500">
                  {tx.fee} CELO
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
