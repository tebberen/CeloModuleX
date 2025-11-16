import { ethers } from "ethers";

export const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatEth = (wei) => {
  try {
    return Number(ethers.utils.formatEther(wei)).toFixed(3);
  } catch (e) {
    return "0";
  }
};
