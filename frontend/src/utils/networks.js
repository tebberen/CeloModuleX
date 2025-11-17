export const CELO_MAINNET = {
  chainId: '0xA4EC', // 42220 in hex
  chainName: 'Celo Mainnet',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18
  },
  rpcUrls: ['https://forno.celo.org'],
  blockExplorerUrls: ['https://celoscan.io/']
};

export const CELO_ALFAJORES = {
  chainId: '0xAEF3', // 44787 in hex
  chainName: 'Celo Alfajores Testnet',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18
  },
  rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
  blockExplorerUrls: ['https://alfajores.celoscan.io/']
};

export const switchToCeloNetwork = async () => {
  if (!window.ethereum) return false;
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CELO_MAINNET.chainId }],
    });
    return true;
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CELO_MAINNET],
        });
        return true;
      } catch (addError) {
        console.error('Error adding Celo network:', addError);
        return false;
      }
    }
    console.error('Error switching to Celo network:', switchError);
    return false;
  }
};
