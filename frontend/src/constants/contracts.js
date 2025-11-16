export const ACCESS_PASS_ADDRESS = '0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd';
export const MAIN_HUB_ADDRESS = '0xad9801c23f3a7ebfea6c33e8575d479169881ff2';

export const ACCESS_PASS_ABI = [
  {
    inputs: [],
    name: 'mintNFT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'hasNFT',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNFTPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const MAIN_HUB_ABI = [
  {
    inputs: [],
    name: 'getNFTPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'hasNFT',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];
