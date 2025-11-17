export const formatAddress = (addr = '') => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '');
export const formatWei = (value) => {
  if (!value) return '0';
  try {
    const num = Number(value) / 1e18;
    return num.toFixed(4);
  } catch (e) {
    return value.toString();
  }
};
