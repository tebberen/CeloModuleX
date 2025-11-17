# CeloModuleX

Frontend for CeloModuleX rebuilt with Vite + React for GitHub Pages deployment. The production build outputs to `docs/site` so GitHub Pages can serve it from the repository root without extra configuration.

## Project Structure

- `frontend/` – source code for the SPA
- `docs/site/` – Vite build output (do not edit manually)
- `docs/` – existing documentation bundle

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

To generate the static site:

```bash
npm run build
```

The app is preconfigured with MetaMask and WalletConnect connections, enforces Celo Mainnet (chainId 42220), and ships placeholder contracts for the provided addresses.
