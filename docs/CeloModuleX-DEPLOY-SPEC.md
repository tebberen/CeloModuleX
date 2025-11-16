CeloModuleX — Deploy Order & Preparation Specification

This plan applies to both single-chain and multi-chain deployments.
The order is strict — a wrong deploy sequence can break the entire system.

🟧 1. Mandatory Deployment Order (Must Not Be Changed)
1.1 NFT Contract (First)

The NFT contract must be deployed first because:

Premium access checks are performed inside MainHub

MainHub needs to know the nftContract address (constructor or setter)

Modules read premium/free behavior through MainHub

Therefore, MainHub must know the NFT before anything else

Deploy:

NFTAccessPass.sol

Output: NFT_CONTRACT_ADDRESS

1.2 MainHub.sol (System Brain)

Once the NFT contract is deployed, MainHub is deployed.

Parameters for MainHub constructor:

nftContract address

basicFee = 0.1 CELO

premiumFee = 0.01 CELO

After deployment:

MAIN_HUB_ADDRESS is final and must not change.

MainHub must be feature-complete at this point.

1.3 50 Modules (Batch of Feature Contracts)

Each module constructor:

constructor(address mainHub, uint256 moduleId)


So MainHub’s address must be known and fixed.

Total:

50 modules → 50 independent contracts

Each module has:

moduleId

name

description

category

premium / free flag

version

After this step, CeloModuleX becomes modular and extendable.

1.4 Link Modules to MainHub (registerModule)

Each deployed module must be registered in MainHub:

registerModule(
    moduleAddress,
    categoryID,
    moduleType,
    isPremium,
    version
);


If this step is skipped:

❌ Frontend will not display the module

❌ executeModule will not work

❌ Stats will not be recorded

❌ Users won’t see or use the module

Therefore, all 50 modules must be registered.

1.5 Add 50 Module Addresses to constants.js

For each module:

Deployed → has an address

Registered → linked to MainHub

Then added to frontend constants:

const MODULES = {
  1: { address, name, category, type, access },
  2: { /* ... */ },
  // ...
  50: { /* ... */ }
};


Without this mapping:

❌ Frontend cannot list modules

❌ Module Detail Page cannot load

❌ executeModule cannot be triggered correctly

1.6 Frontend Wiring

Once constants.js is updated:

contractService.js reads:

MainHub address

Module addresses

UI builds module cards

“Execute Module” buttons call the correct contract

Profile & Stats pages read data from MainHub

At this stage:

✅ CeloModuleX frontend is fully operational

✅ All modules are one-click executable

✅ NFT & premium logic is active

🟦 2. Multi-Chain Deployment Preparation

CeloModuleX can run on multiple chains (e.g. Celo, Base, etc.).
Each chain requires a separate deploy script.

2.1 Celo Deploy Script — deploy_celo.js

The script should:

Deploy NFT contract

Deploy MainHub

Deploy 50 modules

Call registerModule for each

Update constants.js with addresses

Write a log file with deployed addresses

Command:

node scripts/deploy_celo.js

2.2 Base Deploy Script — deploy_base.js

Same structure, different network configuration.

Command:

node scripts/deploy_base.js

2.3 Single Command Batch Module Deployment

This batch engine is very important.

Example structure:

const modules = [
  { name: "GM Standard", file: "GMStandard.sol", category: 1, type: 1, premium: false, version: 1 },
  { name: "Deploy721",   file: "Deploy721.sol",   category: 2, type: 4, premium: true,  version: 1 },
  // ...
  // up to module #50
];

for (let i = 0; i < modules.length; i++) {
  const module = modules[i];
  const deployed = await deploy(module.file, MAIN_HUB_ADDRESS, i + 1);

  await mainHub.registerModule(
    deployed.address,
    module.category,
    module.type,
    module.premium,
    module.version
  );
}


Command:

node scripts/deploy_modules_batch.js


Benefits:

50 modules → one command

100 modules → one command

500 modules → one command

→ CeloModuleX becomes infinitely extendable.
→ “Adding a module” = adding one line to the config array.

🟫 3. Post-Deploy Checklist (QA Flow)

You should check off each item:

 NFT deployed

 NFT price = 5 CELO verified

 MainHub deployed

 basicFee = 0.1 CELO confirmed

 premiumFee = 0.01 CELO confirmed

 nftContract address set in MainHub

 50 modules deployed

 50 modules registered in MainHub

 Module IDs in correct order

 constants.js updated with all addresses

 contractService.js uses correct addresses

 WalletConnect works

 NFT Mint Page works

 Execute Module works

 Profile stats increase after execution

 Leaderboard stats change correctly

 Multi-chain deploy scripts tested

This checklist should be used as the official QA checklist for CeloModuleX deployments.

🟧 4. Why the Deploy Order Is So Critical

Because:

MainHub cannot run premium logic without knowing the NFT address

Modules cannot be deployed correctly without a final MAIN_HUB_ADDRESS

constants.js cannot be configured without module addresses

executeModule cannot work until all modules are registered

The frontend cannot operate without a valid MainHub address

Therefore, the deployment order must NEVER be changed:

NFT

MainHub

Modules

Register modules

Update frontend constants

Wire frontend
