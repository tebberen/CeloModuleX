import { ethers } from 'ethers';
import {
  ACCESS_PASS_ABI,
  ACCESS_PASS_ADDRESS,
  MAIN_HUB_ABI,
  MAIN_HUB_ADDRESS,
} from '../constants/contracts';

const celoRpc = 'https://forno.celo.org';

export const getReadProvider = () => new ethers.providers.JsonRpcProvider(celoRpc);

export const getAccessPassContract = (signerOrProvider) =>
  new ethers.Contract(ACCESS_PASS_ADDRESS, ACCESS_PASS_ABI, signerOrProvider ?? getReadProvider());

export const getMainHubContract = (signerOrProvider) =>
  new ethers.Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, signerOrProvider ?? getReadProvider());

export const fetchNftPrice = async (provider) => {
  const contract = getAccessPassContract(provider);
  return contract.getNFTPrice();
};

export const fetchHasNft = async (address, provider) => {
  if (!address) return false;
  const contract = getAccessPassContract(provider);
  return contract.hasNFT(address);
};

export const mintAccessPass = async (signer) => {
  const contract = getAccessPassContract(signer);
  const price = await contract.getNFTPrice();
  const tx = await contract.mintNFT({ value: price });
  const receipt = await tx.wait();
  return { receipt, price };
};
