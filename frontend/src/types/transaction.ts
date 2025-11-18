export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  status: 'pending' | 'success' | 'failed'
  moduleId?: number
  fee?: string
}

export interface TransactionReceipt {
  blockHash: string
  blockNumber: number
  contractAddress: string | null
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  logs: any[]
  logsBloom: string
  status: number
  to: string
  transactionHash: string
  transactionIndex: number
  type: number
}
