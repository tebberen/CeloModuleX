import { ethers } from 'ethers';

export const shortenAddress = (addr) => {
  if (!addr) return '0x0';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const formatEtherDisplay = (value) => {
  if (!value) return '0.00 CELO';
  try {
    return `${parseFloat(ethers.utils.formatEther(value)).toFixed(2)} CELO`;
  } catch (err) {
    return '0.00 CELO';
  }
};
