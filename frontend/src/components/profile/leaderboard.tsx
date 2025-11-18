'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SAMPLE_LEADERBOARD } from '@/data/sample-data'
import { formatAddress } from '@/lib/utils/format'

export function Leaderboard() {
  const topUsers = SAMPLE_LEADERBOARD.slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Leaderboard</CardTitle>
        <CardDescription>
          Top users by total module executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div
              key={user.address}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-500' : 'bg-celo-green'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold">
                    {user.username || formatAddress(user.address)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {user.totalActions} actions
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user.hasNFT && (
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    💎
                  </Badge>
                )}
                <Badge variant="secondary">
                  #{user.rank}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            Execute modules to climb the leaderboard and earn recognition in the community!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
