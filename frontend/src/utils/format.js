export const formatAddress = (addr = '') =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(addr.length - 4)}` : '';

export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return Number(num).toLocaleString();
};

export const formatEther = (value) => {
  if (!value) return '0';
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 4 });
};
