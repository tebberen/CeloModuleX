# CeloModuleX Frontend

A production-ready React + Vite single-page dApp for CeloModuleX, deployable to GitHub Pages at `https://tebberen.github.io/CeloModuleX/`.

## Features
- Wallet system with MetaMask and WalletConnect v2
- Network enforcement for Celo Mainnet (chainId 42220)
- Profile management (create/update) through MainHub contract
- Premium NFT dashboard with mint flow and metadata fetch
- Responsive UI themed with Celo yellow and Inter typography
- HashRouter + Vite `base` configured for GitHub Pages, builds to `docs/`

## Getting Started
```bash
npm install
npm run dev
```

## Build for GitHub Pages
```bash
npm run build
```
The static site is emitted to `docs/` for GitHub Pages hosting.

## Environment
- Node.js 18+
- Uses ethers v6 and @walletconnect/ethereum-provider v2
