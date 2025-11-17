export const CELO_CHAIN_ID = 42220;
export const CELO_RPC = 'https://forno.celo.org';

export const HUB_ADDRESS = '0xad9801c23f3a7ebfea6c33e8575d479169881ff2';
export const NFT_ADDRESS = '0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd';

export const HUB_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "username", "type": "string" },
      { "internalType": "string", "name": "twitter", "type": "string" },
      { "internalType": "string", "name": "github", "type": "string" },
      { "internalType": "string", "name": "talent", "type": "string" },
      { "internalType": "string", "name": "selfId", "type": "string" }
    ],
    "name": "createProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "username", "type": "string" },
      { "internalType": "string", "name": "twitter", "type": "string" },
      { "internalType": "string", "name": "github", "type": "string" },
      { "internalType": "string", "name": "talent", "type": "string" },
      { "internalType": "string", "name": "selfId", "type": "string" }
    ],
    "name": "updateProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getProfile",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "username", "type": "string" },
          { "internalType": "string", "name": "twitter", "type": "string" },
          { "internalType": "string", "name": "github", "type": "string" },
          { "internalType": "string", "name": "talent", "type": "string" },
          { "internalType": "string", "name": "selfId", "type": "string" },
          { "internalType": "uint256", "name": "actions", "type": "uint256" }
        ],
        "internalType": "struct ModuleProfile",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGlobalStats",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "totalProfiles", "type": "uint256" },
          { "internalType": "uint256", "name": "totalActions", "type": "uint256" }
        ],
        "internalType": "struct GlobalStats",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "moduleId", "type": "uint256" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "executeModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const NFT_ABI = [
  {
    "inputs": [],
    "name": "getNFTPrice",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "hasNFT",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];
