CeloModuleX — Frontend Architecture & UI/UX Specification

This document defines the complete UI/UX flow, technical structure, component hierarchy, and Web3 service architecture for the CeloModuleX frontend.
Codex will use this specification to generate a fully functional dApp interface.

🟩 1. Page Architecture (UI/UX Flow)

User flow:

Home → WalletConnect → Profile → Modules → Module Detail → Execute → Stats → Leaderboard → NFT Mint → Settings

Below are the professional descriptions for each page.

🏠 1. Home Page

Purpose:
Introduce the platform and direct the user to connect their wallet.

Content:

CeloModuleX logo + hero section

“Connect Wallet” button

Total module count (dynamic)

Total user count

Recently used modules

“Start Exploring Modules” CTA button

UI Notes:

Celo yellow theme (#FBCC5C)

Clean, minimal design

Fully responsive & mobile-friendly

👤 2. Profile Page

Purpose:
Display user profile, socials, and usage statistics.

Content:

Username

Wallet address

Social links (X/Twitter, GitHub, Talent Protocol, Self ID)

Total modules used

Premium NFT status (Locked / Unlocked badge)

Edit Profile form

User score (leaderboard value)

📦 3. Modules Page (All Modules)

Purpose:
Display all categories and module cards.

Content:

10 categories in a grid layout

Inside each category:

Module cards

Icons

Free / Premium badges

Short description

Module Card Structure:

Icon

Module name

Category

Premium/Free badge

“View Details” button

🧩 4. Module Detail Page

Purpose:
Show full module information.

Content:

Module name

Full description

Category

Version

Module ID

Usage count

Access level (Free / Premium)

“Execute Module” button

Fee Banner:

Non-NFT user → “0.1 CELO fee per execution”

NFT holder → “0.01 CELO fee per execution”

🏆 5. Leaderboard Page

Purpose:
Show global ranking.

Content:

Rank number

Username

Wallet

Total actions

Unique modules used

Score

Filters:

Daily

Weekly

All-time

📊 6. Stats Dashboard

Purpose:
Visualize platform-wide analytics.

Content:

Total module executions

Per-module usage charts

Daily / weekly activity growth

Total user count

Global actions

Frontend API:

contractService.getGlobalStats()

contractService.getModuleStats()

💳 7. NFT Mint Page

Purpose:
Allow users to mint the Premium NFT Access Pass.

Content:

NFT image

NFT description

Current price (dynamic)

Next price (how many modules left until increase)

“Mint Now” button

Premium Advantages:

All modules unlocked

10× cheaper fees (0.01 CELO)

Lifetime access to future modules

🔗 8. WalletConnect Page

Purpose:
Wallet connection screen.

Content:

WalletConnect v2 modal

Wallet selection

Connection status

Error handling

⚙️ 9. Settings Page

Purpose:
User settings & app configuration.

Content:

Language selector

Theme (dark/light)

Social connection settings

Logout

Chain switcher (Jello, Celo, Base, etc.)

🟦 2. constants.js Architecture

This file contains all on-chain addresses, module metadata, categories, and access levels.

2.1 MainHub Address
export const MAIN_HUB_ADDRESS = "0x123...";

2.2 NFT Contract Address
export const NFT_CONTRACT_ADDRESS = "0xabc...";

2.3 Module Registry
export const MODULES = {
  1: {
    address: "0x111...",
    name: "GM Standard",
    type: "gm",
    category: "Social",
    access: "FREE",
  },
  2: {
    address: "0x222...",
    name: "Deploy ERC721",
    type: "deploy",
    category: "Developer",
    access: "PREMIUM",
  },
  // ... up to 50 modules
};

2.4 Categories
export const CATEGORIES = {
  1: "GM Tools",
  2: "Deploy Tools",
  3: "NFT Tools",
  4: "Analytics",
  5: "Social Identity",
  6: "Onchain Dev Tools",
  7: "Security Tools",
  8: "Fun Modules",
  9: "Multi-chain",
  10: "AI Tools"
};

2.5 Access Levels
export const ACCESS = {
  FREE: 0,
  PREMIUM: 1,
};

🟩 3. contractService.js — Full Web3 Logic Layer

This file handles all blockchain operations.

🔧 Function List
✔ getUserProfile(address)

Fetches:

username

socials

total actions

moduleActions

premium status

✔ createProfile(username, socials)

Creates a new profile.

✔ executeModule(moduleId, params)

Flow:

User clicks Execute

Calls MainHub.executeModule

Module's execute() runs

Events processed

✔ getGlobalStats()

Reads global analytics.

✔ getModuleStats(moduleId)

Reads usage count for a module.

✔ checkNFTAccess(address)

Checks:

Does the user own the NFT?

Are they Premium?

✔ mintNFT()

Executes the NFT mint function.

✔ getModuleInfo(moduleId)

Returns:

name

description

type

category

version

premium status

🟫 4. Frontend API Architecture

Frontend consists of 3 layers:

(A) View Layer (React Components)

ModulesList.jsx

ModuleDetail.jsx

Profile.jsx

Leaderboard.jsx

NFTMint.jsx

WalletConnect.jsx

(B) Hooks / State Layer

useUser()

useModules()

useWallet()

useNFT()

(C) Blockchain Service Layer

contractService.js

walletService.js

utils/formatter.js

✅ Final Note

This document gives Codex everything needed to:

Build the entire frontend

Generate React components

Connect MainHub + Modules

Handle WalletConnect + NFT + Leaderboards

Create a clean Celo-themed UI
