CeloModuleX — User Flow Documentation

This document explains the full journey of a user interacting with CeloModuleX.

📌 User Flow Diagram (Text Version)
User Enters App
     ↓
Connect Wallet
     ↓
Profile Exists?
     ↓
(No) → Create Profile
     ↓
Modules Page
     ↓
User Selects a Module
     ↓
Free Module?
    ↓ Yes                     ↓ No
Execute (0.1 CELO)       Check NFT →
                              ↓
                       NFT Exists?
                         ↓No → Go to NFT Mint Page
                         ↓Yes
                     Execute (0.01 CELO)
     ↓
Stats Update
     ↓
Leaderboard Update
     ↓
Profile Refresh

Scope

Represents end-to-end user behavior

Guides UX/UI designers

Essential for Codex/Cursor during frontend logic generation

Helps developers align interface-state vs smart contract behavior
