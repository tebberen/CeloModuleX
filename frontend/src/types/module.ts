export interface Module {
  id: number
  name: string
  description: string
  category: 'social' | 'builder' | 'finance' | 'governance' | 'achievement'
  premium: boolean
  fee: number
  version: number
  active: boolean
  moduleAddress?: string
}

export interface ModuleExecution {
  moduleId: number
  user: string
  data: string
  timestamp: number
  feePaid: number
  txHash: string
}

export interface ModuleStats {
  totalExecutions: number
  dailyExecutions: number
  uniqueUsers: number
}

export interface ModuleCategory {
  name: string
  description: string
  color: string
  icon: string
}
