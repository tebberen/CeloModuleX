import { Contract, JsonRpcProvider } from 'ethers'
import { MAIN_HUB_ABI, MAIN_HUB_ADDRESS, ACCESS_NFT_ABI, ACCESS_NFT_ADDRESS } from '../constants/contracts'

export const getRpcProvider = () => new JsonRpcProvider('https://forno.celo.org')

export const getMainHubContract = (signerOrProvider) => new Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, signerOrProvider)

export const getAccessNftContract = (signerOrProvider) => new Contract(ACCESS_NFT_ADDRESS, ACCESS_NFT_ABI, signerOrProvider)
