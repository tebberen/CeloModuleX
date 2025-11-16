eloModuleX — Full Professional Test Plan (QA Document)

MainHub + Modules + Frontend Integration Testing

🟩 1. MAINHUB TESTS (Core Smart Contract QA)

MainHub is the brain of CeloModuleX, so its tests are the most critical.
Tests may be executed using Remix, Foundry, Hardhat, or Thirdweb CLI.

✔ 1.1. Profile Creation Tests
Test 1 — Create a new profile

Call createProfile("samet")

Expected event: ProfileCreated

getUserProfile(user) must return:

username = "samet"

createdAt > 0

totalActions = 0

uniqueModulesUsed = 0

Test 2 — Prevent duplicate profiles

Same wallet calls createProfile() again

Expect revert: "ProfileAlreadyExists"

Test 3 — Add social accounts

Fill Twitter, GitHub, Talent, SELF-ID fields

Validate returned profile JSON structure

✔ 1.2. Module Registration Tests
Test 4 — Owner registers a module

Call:
registerModule(0xModule, category, type, premium, version)

Expected event: ModuleRegistered

Validate getModuleInfo() output

Test 5 — Non-owner cannot register

Normal user calls registerModule

Expect revert: "OnlyOwner"

Test 6 — Activate / Deactivate module

deactivateModule(moduleID) → inactive

activateModule(moduleID) → active again

✔ 1.3. Access Control Tests
Test 7 — No profile → cannot execute module

Call executeModule(moduleID)

Expect revert: "ProfileRequired"

Test 8 — Premium module without NFT

Expect revert: "PremiumAccessRequired"

Test 9 — Free module without NFT

Should execute normally

Fee = 0.1 CELO

Test 10 — Premium module with NFT

Should execute

Fee = 0.01 CELO

✔ 1.4. NFT Access Tests
Test 11 — hasNFT() correctness

Mint NFT → user owns 1 pass

mainHub.hasAccess(user, premiumModule) → TRUE

Test 12 — No NFT → cannot access premium

Premium module should revert

Test 13 — NFT dynamic pricing logic

getNFTPrice() = 5 CELO (initial)

After 50 modules registered → should be +2 CELO

🟦 2. MODULE TESTS (Applies to All 50 Modules)

All modules must follow identical test structure.

✔ 2.1. execute() Behavior Tests
Test 14 — Execute flow

Call execute()

Expected:

Event: ModuleAction

usageCount++

mainHub.recordUsage() successfully called

Test 15 — Correct parameter handling

Example checks:

GM module → GM message stored

Deploy module → contract address returned

NFT Mint module → tokenID is correct

✔ 2.2. Event Validation

Each module must emit:

ModuleAction(address user, uint256 timestamp, string details)


Verify:

Correct user

Correct timestamp

Correct details payload

✔ 2.3. recordUsage Tests
Test 16 — User stats update

After execute:

totalActions += 1

moduleActions[moduleID] += 1

If first time → uniqueModulesUsed += 1

If module is premium → premiumModuleCount += 1

Test 17 — Global stats update

totalGlobalActions += 1

actionsPerModule[moduleID] += 1

🟦 3. FRONTEND TESTS (UI + Web3 Integration)

The frontend interacts deeply with blockchain logic.
All user paths must be validated.

✔ 3.1. Wallet Connection Tests
Test 18 — Connect wallet

WalletConnect modal opens

Wallet connects successfully

Address displays in UI

Test 19 — Wrong network

Must show “Switch Network” warning

✔ 3.2. Module Execution Tests
Test 20 — Execute free module

Click "Execute Module"

MetaMask opens

Tx completes successfully

UI shows success

MainHub stats update

Test 21 — Premium module without NFT

UI must show:

“Premium Required”

Button redirects to NFT Mint Page

Test 22 — Premium module with NFT

Fee = 0.01 CELO

Stats update

UI updates immediately

✔ 3.3. Stats & Leaderboard Tests
Test 23 — Profile Stats

Validate:

totalActions

uniqueModulesUsed

moduleActions

premium status

score

Test 24 — Leaderboard correctness

Correct ordering

Highest score at top

Pagination works

All-time / weekly / monthly filters work

Test 25 — Module Detail

usageCount correct

moduleActions correct

🟫 4. MASTER QA CHECKLIST (Mark after completion)
MainHub Tests

☑ Profile creation
☑ Social account updates
☑ Module registration
☑ Activate/deactivate module
☑ Premium access tests
☑ Free module tests
☑ NFT validation
☑ Fee system accuracy
☑ Stats update
☑ Required events emitted

Module Tests

☑ execute() logic
☑ recordUsage
☑ ModuleAction event
☑ usageCount increments
☑ Module metadata
☑ Functional logic validated

Frontend Tests

☑ WalletConnect
☑ Execute Module flow
☑ Stats Dashboard
☑ Leaderboard
☑ NFT Mint Page
☑ Profile Page
☑ constants.js addresses correct
☑ contractService.js functional
