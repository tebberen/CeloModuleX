import { Contract, Provider } from 'ethers';
import { rpcProvider } from '../contexts/WalletContext';

export const MAIN_HUB_ADDRESS = '0xad9801c23f3a7ebfea6c33e8575d479169881ff2';
export const NFT_ADDRESS = '0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd';

const MAIN_HUB_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserProfile',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'username', type: 'string' },
          { internalType: 'string', name: 'twitter', type: 'string' },
          { internalType: 'string', name: 'github', type: 'string' },
          { internalType: 'string', name: 'talent', type: 'string' },
          { internalType: 'string', name: 'selfID', type: 'string' },
          { internalType: 'bool', name: 'exists', type: 'bool' }
        ],
        internalType: 'struct Profile',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: 'username', type: 'string' },
      { internalType: 'string', name: 'twitter', type: 'string' },
      { internalType: 'string', name: 'github', type: 'string' },
      { internalType: 'string', name: 'talent', type: 'string' },
      { internalType: 'string', name: 'selfID', type: 'string' }
    ],
    name: 'createProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: 'twitter', type: 'string' },
      { internalType: 'string', name: 'github', type: 'string' },
      { internalType: 'string', name: 'talent', type: 'string' },
      { internalType: 'string', name: 'selfID', type: 'string' }
    ],
    name: 'updateProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const NFT_ABI = [
  {
    inputs: [],
    name: 'getNFTPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'hasNFT',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mintNFT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  }
];

export const getMainHubContract = (provider: Provider = rpcProvider) => new Contract(MAIN_HUB_ADDRESS, MAIN_HUB_ABI, provider);

export const getNFTContract = (provider: Provider = rpcProvider) => new Contract(NFT_ADDRESS, NFT_ABI, provider);
