# CeloModuleX Architecture

CeloModuleX is designed as a modular on-chain action platform that can be replicated across multiple EVM-compatible chains. The architecture is intentionally opinionated so that new modules can be onboarded without having to change any of the platform-level contracts.

## 1. MainHub: The Coordination Brain

`MainHub.sol` is deployed on every supported chain and owns all of the shared state for the platform.

- **Module Registry** – Maintains a canonical list of module addresses, their metadata and availability flags.
- **Profile Management** – Stores `UserProfile` structs and requires users to create a profile before they can execute any action.
- **Access Control** – Verifies whether a caller owns the Premium NFT Access Pass and automatically applies the correct fee tier.
- **Fee Accounting** – Collects every transaction fee, aggregates balances per chain, and exposes owner-only withdrawal hooks.
- **Usage Tracking** – Emits `ModuleExecuted` and `UserStatsUpdated` events, updates leaderboard scores, and keeps per-module counters.

## 2. Modules: Focused On-Chain Actions

Modules are isolated contracts (for example, "GM Standard", "NFT Minter", or "AI Insight") that execute one purpose-built action.

- Modules contain **no fee logic** and **no access checks**; they delegate both to MainHub.
- Each module implements a simple `execute(bytes calldata data)` entry point that MainHub calls after validation.
- Modules may read user data via shared interfaces but should not mutate global state directly.
- Because modules are registered addresses, scaling from 50 to 1,000+ modules requires only appending to the registry—no breaking upgrades.

## 3. Multi-Chain Layout

- A dedicated `MainHub` instance is deployed per chain (Celo, Base, etc.), all following the same ABI.
- Module libraries can be redeployed per chain or shared when bytecode compatibility allows.
- Cross-chain deploys let CeloModuleX tap into multiple ecosystem incentive programs while distributing risk.

## 4. Frontend and Services

- The frontend calls MainHub for every action, so it automatically benefits from the latest registry and fee schedule.
- Off-chain services (indexers, leaderboards, partner dashboards) subscribe to on-chain events and hydrate their databases accordingly.
- SDKs and scripts interact with MainHub first, ensuring user experience remains consistent even when new modules are added.

## 5. Security Considerations

- The hub enforces upgradeable ownership controls to pause modules or adjust fees without touching individual module contracts.
- Isolated module execution limits blast radius—failures are scoped to a single module, leaving the rest of the system untouched.
- Premium NFT ownership checks are centralized, preventing duplicate logic and reducing the likelihood of access bypasses.
