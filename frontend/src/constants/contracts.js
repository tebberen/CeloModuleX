export const MAINHUB_ADDRESS = '0xad9801c23f3a7ebfea6c33e8575d479169881ff2';
export const NFT_ADDRESS = '0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd';

export const MAINHUB_ABI = [
  "function getUserProfile(address) view returns (string, uint256, bool)",
  "function createProfile(string)",
  "function updateProfile(string)",
  "function totalActions() view returns (uint256)",
  "function getUsername(address) view returns (string)"
];

export const NFT_ABI = [
  "function getNFTPrice() view returns (uint256)",
  "function hasNFT(address) view returns (bool)",
  "function mintNFT() payable",
  "function tokenURI(uint256) view returns (string)",
  "function ownerOf(uint256) view returns (address)"
];
