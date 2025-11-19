import { ethers } from 'ethers'

export function formatEther(wei: ethers.BigNumberish): string {
  return ethers.utils.formatEther(wei)
}

export function parseEther(ether: string): ethers.BigNumber {
  return ethers.utils.parseEther(ether)
}

export function formatUnits(value: ethers.BigNumberish, decimals: number = 18): string {
  return ethers.utils.formatUnits(value, decimals)
}

export function parseUnits(value: string, decimals: number = 18): ethers.BigNumber {
  return ethers.utils.parseUnits(value, decimals)
}

export function formatPercentage(numerator: number, denominator: number): string {
  if (denominator === 0) return '0%'
  const percentage = (numerator / denominator) * 100
  return `${percentage.toFixed(1)}%`
}

export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatAddress(address?: string | null): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
