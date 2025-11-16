import { ethers } from "ethers";
import { MAINHUB_ABI, MAINHUB_ADDRESS, NFT_ABI, NFT_ADDRESS } from "../constants/contracts.js";

const getHubContract = (providerOrSigner) =>
  new ethers.Contract(MAINHUB_ADDRESS, MAINHUB_ABI, providerOrSigner);

const getNftContract = (providerOrSigner) =>
  new ethers.Contract(NFT_ADDRESS, NFT_ABI, providerOrSigner);

export const createProfile = async (signer, profile) => {
  const contract = getHubContract(signer);
  return contract.createProfile(
    profile.username || "",
    profile.twitter || "",
    profile.github || "",
    profile.talent || "",
    profile.selfID || ""
  );
};

export const updateProfile = async (signer, profile) => {
  const contract = getHubContract(signer);
  return contract.updateProfile(
    profile.twitter || "",
    profile.github || "",
    profile.talent || "",
    profile.selfID || ""
  );
};

export const getUserProfile = async (provider, address) => {
  const contract = getHubContract(provider);
  const [username, createdAt, twitter, github, talent, selfID, hasNFT] = await contract.getUserProfile(address);
  return { username, createdAt: createdAt.toNumber ? createdAt.toNumber() : Number(createdAt), twitter, github, talent, selfID, hasNFT };
};

export const executeModule = async (signer, moduleId, data = "0x", premium = false) => {
  const contract = getHubContract(signer);
  const fee = premium ? await contract.premiumFee() : await contract.basicFee();
  return contract.executeModule(moduleId, data, { value: fee });
};

export const getUserStats = async (provider) => {
  const contract = getHubContract(provider);
  const [totalActionsBN, moduleIds] = await Promise.all([
    contract.totalGlobalActions(),
    contract.getAllModuleIds(),
  ]);
  const totalActions = totalActionsBN.toNumber ? totalActionsBN.toNumber() : Number(totalActionsBN);
  const uniqueModules = moduleIds.length;
  const score = totalActions;
  return { totalActions, uniqueModules, score };
};

export const getNFTPrice = async (provider) => {
  const contract = getNftContract(provider);
  const price = await contract.getNFTPrice();
  return price;
};

export const hasNFT = async (provider, address) => {
  const contract = getNftContract(provider);
  return contract.hasNFT(address);
};

export const mintNFT = async (signer) => {
  const contract = getNftContract(signer);
  const price = await contract.getNFTPrice();
  return contract.mintNFT({ value: price });
};
