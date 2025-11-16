NFT Access Pass — Flow Diagram

This document explains how the Premium NFT Access Pass integrates with the module execution system.

📌 Access Flow
User wants to execute Premium Module
     ↓
MainHub: hasNFT(user)?
     ↓
No → Redirect to NFT Mint Page
     ↓
Mint NFT
     ↓
NFT Minted
     ↓
Premium Access Granted (event)
     ↓
Execute Module (fee = 0.01 CELO)

Purpose

Educates users

Defines NFT logic for frontend

Ensures Codex implements correct mint → premium → execute flow
