import { ethers } from 'ethers';
import { MAIN_HUB_ADDRESS, MAIN_HUB_ABI, NFT_ADDRESS, NFT_ABI } from '../constants/contracts.js';

const getMainHubContract = (providerOrSigner) => new ethers.Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, providerOrSigner);
const getNftContract = (providerOrSigner) => new ethers.Contract(NFT_ADDRESS, NFT_ABI, providerOrSigner);

export const createProfile = async (signer, profile) => {
  const contract = getMainHubContract(signer);
  const tx = await contract.createProfile(
    profile.username,
    profile.twitter,
    profile.github,
    profile.talent,
    profile.selfID,
  );
  return tx.wait();
};

export const updateProfile = async (signer, profile) => {
  const contract = getMainHubContract(signer);
  const tx = await contract.updateProfile(profile.twitter, profile.github, profile.talent, profile.selfID);
  return tx.wait();
};

export const getUserProfile = async (provider, userAddress) => {
  const contract = getMainHubContract(provider);
  const result = await contract.getUserProfile(userAddress);
  return {
    username: result[0],
    score: Number(result[1]),
    twitter: result[2],
    github: result[3],
    talent: result[4],
    selfID: result[5],
    premium: result[6],
  };
};

export const executeModule = async (signer, moduleId, data = '0x', value = '0') => {
  const contract = getMainHubContract(signer);
  const tx = await contract.executeModule(moduleId, data, { value });
  return tx.wait();
};

export const getUserStats = async (provider) => {
  const contract = getMainHubContract(provider);
  const [totalGlobalActions, totalUsers, basicFee, premiumFee] = await Promise.all([
    contract.totalGlobalActions(),
    contract.totalUsers(),
    contract.basicFee(),
    contract.premiumFee(),
  ]);
  return {
    totalGlobalActions: Number(totalGlobalActions),
    totalUsers: Number(totalUsers),
    basicFee: ethers.formatEther(basicFee),
    premiumFee: ethers.formatEther(premiumFee),
  };
};

export const getNFTPrice = async (provider) => {
  const contract = getNftContract(provider);
  const price = await contract.getNFTPrice();
  return ethers.formatEther(price);
};

export const hasNFT = async (provider, userAddress) => {
  const contract = getNftContract(provider);
  return contract.hasNFT(userAddress);
};

export const mintNFT = async (signer) => {
  const contract = getNftContract(signer);
  const price = await contract.getNFTPrice();
  const tx = await contract.mintNFT({ value: price });
  return tx.wait();
};

export default {
  createProfile,
  updateProfile,
  getUserProfile,
  executeModule,
  getUserStats,
  getNFTPrice,
  hasNFT,
  mintNFT,
};
