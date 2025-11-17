import { ethers } from 'ethers';
import { MAINHUB_ADDRESS, NFT_ADDRESS, MAINHUB_ABI, NFT_ABI } from '../constants/contracts';

let provider;
let signer;

export const getProvider = () => {
  if (!provider && window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  return provider;
};

export const getSigner = async () => {
  if (!signer) {
    const currentProvider = getProvider();
    if (currentProvider) {
      signer = await currentProvider.getSigner();
    }
  }
  return signer;
};

export const getMainHubContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(MAINHUB_ADDRESS, MAINHUB_ABI, signer);
};

export const getNFTContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
};

export const getUserProfile = async (address) => {
  try {
    const contract = await getMainHubContract();
    const profile = await contract.getUserProfile(address);
    return {
      username: profile[0],
      totalActions: profile[1].toString(),
      hasPremium: profile[2]
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const createProfile = async (username) => {
  try {
    const contract = await getMainHubContract();
    const tx = await contract.createProfile(username);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error creating profile:', error);
    return false;
  }
};

export const updateProfile = async (username) => {
  try {
    const contract = await getMainHubContract();
    const tx = await contract.updateProfile(username);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

export const getNFTPrice = async () => {
  try {
    const contract = await getNFTContract();
    const price = await contract.getNFTPrice();
    return price.toString();
  } catch (error) {
    console.error('Error getting NFT price:', error);
    return '0';
  }
};

export const hasNFT = async (address) => {
  try {
    const contract = await getNFTContract();
    const hasNFT = await contract.hasNFT(address);
    return hasNFT;
  } catch (error) {
    console.error('Error checking NFT:', error);
    return false;
  }
};

export const mintNFT = async (price) => {
  try {
    const contract = await getNFTContract();
    const tx = await contract.mintNFT({ value: price });
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error minting NFT:', error);
    return false;
  }
};
