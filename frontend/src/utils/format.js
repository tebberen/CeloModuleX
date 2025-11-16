export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const formatPrice = (value) => {
  if (!value) return '0';
  return Number(value).toLocaleString();
};
