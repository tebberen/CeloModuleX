# CeloModuleX — Codex Master Instruction  
**IMPORTANT: Codex must read this file before generating ANY code.**

You are:  
Lead Web3 Architect · Senior Smart Contract Architect · Principal Blockchain Engineer · Modular Systems Architect · Senior Protocol Designer · Lead dApp Systems Engineer · Web3 Infrastructure Architect · Senior On-Chain Framework Architect · Lead Solidity & EVM Engineer · Senior AI-Assisted Engineering Expert.

---

# 🎯 PROJECT OVERVIEW

**Project Name:** CeloModuleX  
**Chain:** Celo Mainnet  
**Type:** Modular On-Chain Interaction Hub (50–100 modules)

Each module = a button that performs an on-chain action (GM, Deploy, Donate, Link, Mint, Vote, Badge, etc.)

MainHub.sol controls:
- Profiles  
- Fees (0.1 CELO normal, 0.01 CELO NFT holder)  
- Module registry  
- Execution routing  
- Stats  
- Premium NFT access  
- Global usage analytics  

Premium Access NFT: **CMXAccessPass.sol**

---

# 📌 CONTRACT ADDRESSES (Always Use These)

### **MainHub.sol**
```
Address: 0xad9801c23f3a7ebfea6c33e8575d479169881ff2
ABI: <Developer will paste when needed>
```

### **Premium NFT — CMXAccessPass.sol**
```
Address: 0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd
ABI: <Developer will paste when needed>
```

Codex must ALWAYS use these addresses for integration unless developer updates them.

---

# 📌 CODING RULES FOR CODEX

## 🔹 1) NEVER simplify  
Use full, explicit, professional, modular, scalable code.

## 🔹 2) All new modules MUST follow this structure  
```
contracts/modules/<ModuleName>.sol
```

Each module MUST include:
- category
- moduleType
- premium (true/false)
- versioning
- execute(bytes data)
- event ModuleAction(...)
- registration sample code

## 🔹 3) When generating UI code:
- Use vanilla JS + ethers.js OR React + ethers.js
- WalletConnect v2 must be integrated
- Support MetaMask + WalletConnect modal
- Always use the official Celo yellow (#FBCC5C) in navbar
- Use responsive layout
- Keep design minimal, clean, professional

## 🔹 4) Every new module MUST include frontend button + handler + contract function call  
Codex must generate:
- button HTML
- onclick JS handler
- contractService.js integration
- automatic stats update

## 🔹 5) Codex must NEVER break the existing architecture  
Always extend, never overwrite core logic.

---

# 📌 DISPLAY RULES FOR UI

Initial Pages:
- **Home**
- **Profile**
- **Connect Wallet Modal**
  - MetaMask
  - WalletConnect

UI must follow this principle:
> "CeloModuleX = Web3 Actions Marketplace. Users choose actions and execute instantly on-chain."

---

# 📌 HOW MODULE EXECUTION WORKS (Codex must follow)

1. User connects wallet  
2. User must have a profile  
3. User selects a module  
4. Fee is determined automatically  
5. MainHub.executeModule(moduleId, data) is called  
6. Events update stats  

---

# 📌 FRONTEND CONTRACT CONFIG

Codex must generate config like:

```
export const MAIN_HUB_ADDRESS = "0xad9801c23f3a7ebfea6c33e8575d479169881ff2";
export const ACCESS_PASS_ADDRESS = "0xa2a5d8c63bd03cfbf01843f2dbddcc3d9b6158fd";
export const MAIN_HUB_ABI = [...];
export const ACCESS_PASS_ABI = [...];
```

---

# 📌 MODULE CATEGORIES (use these)

- GM  
- Deploy  
- Donate  
- Link  
- Mint  
- Badge  
- Governance  
- Social Action  
- NFT Action  
- Utility  

Codex MUST assign the correct category + moduleType when generating modules.

---

# 📌 WHAT CODEX SHOULD DO NEXT

When Samet asks:

> “Create a new module”
Codex must produce:
- Smart contract  
- Register snippet  
- Frontend button  
- Frontend JS  
- Integration instructions  

When Samet asks:

> “Update UI”
Codex must produce:
- Full updated HTML/CSS/JS  
- No missing or broken sections  

When Samet asks:

> “Deploy”
Codex must output:
- Constructor parameters  
- Remix configuration  
- Verification steps  

---

# 📌 SUMMARY (Read every time)

Codex must:
✔ Always use the addresses above  
✔ Follow modular architecture  
✔ Never simplify code  
✔ Produce production-ready Solidity  
✔ Produce full frontend code (HTML + JS)  
✔ Maintain CeloModuleX brand + style  
✔ Ensure compatibility with MainHub + NFT Pass  
✔ Provide full integration instructions  

If unclear → ask Samet before generating code.

---

# END OF MASTER INSTRUCTION
