'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useUserProfile } from '@/hooks/use-user-profile'
import { Badge } from '@/components/ui/badge'
import { formatLargeNumber } from '@/lib/utils/format'

export function UserStats() {
  const { profile, loading } = useUserProfile()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Create a profile to start tracking your stats</p>
        </CardContent>
      </Card>
    )
  }

  const stats = [
    {
      label: 'Total Actions',
      value: formatLargeNumber(profile.actionCount),
      description: 'Modules executed',
    },
    {
      label: 'NFT Holder',
      value: profile.hasNFT ? 'Yes' : 'No',
      description: 'Premium access',
      badge: profile.hasNFT ? '💎 Premium' : 'Basic',
    },
    {
      label: 'Profile',
      value: 'Verified',
      description: 'On-chain identity',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          User Stats
          {profile.hasNFT && (
            <Badge className="bg-yellow-100 text-yellow-800">💎 Premium</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-celo-green rounded-full flex items-center justify-center text-white font-semibold">
              {profile.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-semibold">{profile.username}</h3>
              <p className="text-sm text-gray-600">CeloModuleX User</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-celo-green">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.badge && (
                  <div className="text-xs mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {stat.badge}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {profile.twitter || profile.github ? (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-2">Social Profiles</h4>
              <div className="flex gap-2 flex-wrap">
                {profile.twitter && (
                  <Badge variant="outline" className="text-xs">
                    Twitter: {profile.twitter}
                  </Badge>
                )}
                {profile.github && (
                  <Badge variant="outline" className="text-xs">
                    GitHub: {profile.github}
                  </Badge>
                )}
                {profile.talentProtocol && (
                  <Badge variant="outline" className="text-xs">
                    Talent: {profile.talentProtocol}
                  </Badge>
                )}
                {profile.selfID && (
                  <Badge variant="outline" className="text-xs">
                    Self.ID: {profile.selfID}
                  </Badge>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
