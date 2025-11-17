export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance) => {
  if (!balance) return '0';
  return parseFloat(balance).toFixed(4);
};

export const formatPrice = (price) => {
  if (!price) return '0';
  const celoPrice = parseFloat(price) / 1e18;
  return celoPrice.toFixed(4);
};
