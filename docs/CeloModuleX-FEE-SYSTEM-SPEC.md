CeloModuleX — Fee & Commission System Specification

This document defines the complete fee architecture for CeloModuleX, including commission rules, economic design, free/premium module tiers, and MainHub fee flow logic.

It is required by Codex, Cursor, auditors, and developers building modules and frontend components.

🔥 0. Purpose of the Fee System

The fee mechanism is one of the two core pillars of the CeloModuleX economy:

Non-NFT users pay → 0.1 CELO per module execution

Premium NFT Access Pass holders pay → 0.01 CELO per execution

Objectives:

Create consistent passive revenue for the platform

Reward users who mint the Premium NFT

Keep module usage sustainable

Apply the same fee model across all chains

Grow the economic pool as the ecosystem expands

🟧 1. Fee Amounts
1.1. Non-NFT User Fee

0.1 CELO per action (default)
Charged for every module execution.

1.2. Premium NFT Holder Fee

0.01 CELO per action (10× discount)

Benefits:

Incentivizes Premium NFT purchase

Encourages long-term loyalty

Creates predictable behavior for active users

1.3. Fees Stored in MainHub

MainHub stores the fee parameters:

uint256 public basicFee = 0.1 ether;      // 0.1 CELO
uint256 public premiumFee = 0.01 ether;   // 0.01 CELO


Both can be updated by the owner via updateFee().

🟦 2. Do Premium NFT Holders Pay Fees? (Yes)

Premium holders still pay fees, but enjoy a major discount.

Reasoning:

Ensures continuous income for the platform

Prevents dependency on NFT sales only

Rewards Premium users

Creates a scalable, predictable economy

Fee Comparison:

User Type	Fee
Non-NFT	0.1 CELO
NFT Holder	0.01 CELO
🟩 3. Free Tier Modules (Free Module List)

CeloModuleX offers the first 10 modules as free modules (no module cost), but users still pay the commission fee.

Purpose of Free Modules:

Teach users how the platform works

Introduce the module execution system

Encourage users to buy the NFT

Provide early activation funnel

Allow exploration without barriers

Example Free Modules (recommended):

GM Standard

GN (Goodnight)

Like / Favorite Module

Simple Hash Generator

Basic NFT Viewer

Basic CELO Price Fetcher

Simple Profile Checker

Wallet Health Scanner

Color NFT Generator (free version)

Onchain Timestamp Proof

Important:
Free = no module-specific fee
But commission (0.1 / 0.01 CELO) still applies.

🟦 4. Paid Modules (Premium / Pay-Per-Action)

Most of the initial 50 modules belong to the paid category.

Examples:

Deploy ERC721

Deploy ERC1155

Deploy Minimal Proxy

Deploy ERC20

Deploy VoteModule

Deploy Custom Template

Advanced NFT Mint

VRF Randomizer Module

CELO → cUSD Swap Tool

Multi-Send Token Distributor

ZK-Proof Verifier

Trait-Based NFT Mint

NFT Metadata Injector

Social Reputation Writer

GitHub Commit Proof

Twitter Signature Attester

Talent Protocol Writer

SELF ID Connector

On-Chain Score Upgrader

Reward Claim Module

Oracle Data Fetcher

Cross-Chain Notifier

Multi-Contract Interaction Tool

NFT Bulk/Folders Mint

Fee Logic:

NFT holder → 0.01 CELO

Non-NFT user → 0.1 CELO

MainHub tracks this via the premium flag:

struct Module {
    address moduleAddress;
    bool premium;
}

🟥 5. Where Are Fees Stored? (Critical Design Decision)
⭐ The correct architecture: Fees are stored in the MainHub contract.

Not inside modules.

Reasons:
✔ Centralized fee management

If modules handled fees:

Code duplication

Higher gas

More security hazards

Harder audits

MainHub → the single economic control center.

✔ Clean, simple module code

Modules simply call:

mainHub.chargeFee(msg.sender, moduleId);

✔ Prevent fee manipulation

Modules cannot override fees.
Only MainHub admins can manage fee rules.

✔ Multi-chain standardization

Each chain has a single MainHub → consistent global behavior.

🟦 6. Fee Functions in MainHub

MainHub MUST include:

function chargeFee(address user, uint256 moduleId) internal;

function withdrawFees(address to, uint256 amount) external onlyOwner;

function updateFee(uint256 _basic, uint256 _premium) external onlyOwner;

function getFeesCollected() external view returns (uint256);

Responsibilities of chargeFee():

Check NFT ownership

Determine fee (0.1 or 0.01 CELO)

Collect CELO

Add to fee pool

Emit FeeCollected event

🟩 7. Full Fee Execution Flow

User clicks Execute Module:

MainHub.executeModule(moduleId)

Check user profile

Check module active status

Check NFT ownership

Determine fee (0.1 or 0.01 CELO)

chargeFee() → collect CELO

Call module’s execute()

Update user & global stats

Emit events for analytics

🟧 8. Investor Summary (Short Format)

“CeloModuleX earns commission from every on-chain action.
Non-NFT users pay 0.1 CELO, Premium NFT holders pay 0.01 CELO.
All fees are collected in the MainHub contract, creating reliable, long-term passive income.
As module count and usage grow, fee revenue scales exponentially.”
