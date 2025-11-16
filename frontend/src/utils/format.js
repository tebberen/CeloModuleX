export const shortenAddress = (addr) => {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export const formatCelo = (weiValue) => {
  if (!weiValue) return '0'
  const asNumber = typeof weiValue === 'bigint' ? weiValue : BigInt(weiValue)
  return Number(asNumber) / 1e18
}
