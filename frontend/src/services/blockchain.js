import { ethers } from 'ethers';
import { MAIN_HUB, NFT_CONTRACT } from '../constants/contracts.js';
import { formatEtherDisplay } from '../utils/format.js';

export const getProviderOrSigner = (providerOrSigner) => {
  if (!providerOrSigner) return null;
  if (providerOrSigner instanceof ethers.Signer) return providerOrSigner;
  if (providerOrSigner.getSigner) return providerOrSigner.getSigner();
  return null;
};

export const getMainHubContract = (providerOrSigner) => {
  const signerOrProvider = providerOrSigner || null;
  if (!signerOrProvider) return null;
  return new ethers.Contract(MAIN_HUB.address, MAIN_HUB.abi, signerOrProvider);
};

export const getAccessNFTContract = (providerOrSigner) => {
  const signerOrProvider = providerOrSigner || null;
  if (!signerOrProvider) return null;
  return new ethers.Contract(NFT_CONTRACT.address, NFT_CONTRACT.abi, signerOrProvider);
};

export const getUserProfile = async (signer) => {
  const contract = getMainHubContract(signer);
  const user = await signer.getAddress();
  if (!contract) {
    return { username: 'Guest', bio: 'Connect wallet', modules: 0 };
  }
  try {
    const profile = await contract.getProfile(user);
    return {
      username: profile.username || 'Guest',
      bio: profile.bio || 'On-chain explorer',
      modules: profile.modules?.toNumber?.() ?? 0,
    };
  } catch (err) {
    return { username: 'Guest', bio: err.message, modules: 0 };
  }
};

export const createProfile = async (signer, profile) => {
  const contract = getMainHubContract(signer);
  if (!contract) throw new Error('Connect wallet first');
  const tx = await contract.createProfile(profile.username, profile.bio, profile.modules || 0);
  await tx.wait();
  return 'Profile created';
};

export const updateProfile = async (signer, profile) => {
  const contract = getMainHubContract(signer);
  if (!contract) throw new Error('Connect wallet first');
  const tx = await contract.updateProfile(profile.username, profile.bio, profile.modules || 0);
  await tx.wait();
  return 'Profile updated';
};

export const fetchNFTMetadata = async (provider) => {
  const contract = getAccessNFTContract(provider);
  if (!contract) return null;
  const name = await contract.name();
  const symbol = await contract.symbol();
  const price = await contract.price();
  return { name, symbol, price: formatEtherDisplay(price) };
};
