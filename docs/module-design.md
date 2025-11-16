CeloModuleX — Module Contract Template Specification

Standard for All Modules (50 → 500 → 1000 Modules)

🟦 1. Module Purpose (High-Level Definition)

Each module within the CeloModuleX ecosystem:

Performs one isolated on-chain action

Is called exclusively through MainHub

Inherits access control from MainHub

Uses fee logic defined only in MainHub

Emits its own events independently

Updates usage stats through MainHub

The module must focus only on its function.
Everything related to:

Access

Premium/free logic

Commission

Statistics

Score system

belongs exclusively to MainHub.sol.

This ensures:

Infinite scalability (50 → 500 → 1000 modules)

Zero breaking changes between module versions

Clean, minimal, predictable module code

Easy auditing & maintenance

🟦 2. REQUIRED FUNCTIONS (MANDATORY)

Every module MUST contain the following functions:

2.1. execute() — (Required)

The main function of the module.

MainHub calls this when a user selects a module.

Responsibilities:

Run module logic

Mint NFT / send GM message / verify data / compute result etc.

Emit module events

Notify MainHub that the action is complete

Access & fee checks must NOT happen here
(MainHub performs them before calling the module).

2.2. getModuleInfo() — (Required)

Returns module metadata for the frontend.

Must return:

Module name

Module description

Module type ID

Module category ID

Module version

function getModuleInfo() external view returns(
    string memory,
    string memory,
    uint8,
    uint8,
    uint16
);

2.3. supportsFeature() — (Required)

Returns strings describing module capabilities.
Example:

"deploy,erc721,randomizer"


Used by frontend automations.

2.4. version() — (Required)
return 1;
return 2;


Helps MainHub track upgrades.

🟦 3. MAINHUB CONNECTION (MANDATORY)

Each module must bind to MainHub at deployment.

3.1. Constructor Requirement
constructor(address _mainHub, uint256 _moduleID) {
    mainHub = MainHub(_mainHub);
    moduleID = _moduleID;
}

3.2. Usage Tracking Requirement

After module logic executes:

mainHub.recordUsage(msg.sender, moduleID);


This updates:

User stats

Global stats

Score

Leaderboard

Events

🟦 4. FEE & ACCESS SYSTEM (MANDATORY)

Modules do not implement fee or premium checks.

But they MUST call these two lines:

4.1. Access Control
require(mainHub.hasAccess(msg.sender, moduleID), "No access");

4.2. Fee Collection
mainHub.chargeFee(msg.sender, moduleID);


MainHub automatically charges:

0.1 CELO → non-NFT

0.01 CELO → Premium NFT holder

🟦 5. REQUIRED EVENT STANDARD

Every module MUST emit the following event:

event ModuleAction(
    address indexed user,
    uint256 timestamp,
    string details
);


Details can include:

GM message

Deployed contract address

Minted NFT ID

Parameters sent

Donation amount

Any action result

🟦 6. REQUIRED ON-CHAIN METADATA

Each module must store:

Variable	Purpose
moduleName	Human-readable name
moduleDescription	Short description
moduleType	Type ID
moduleCategory	Category ID
version	Module version
usageCount	(Optional but recommended)

Example mapping:

Type IDs

1 = GM

2 = Deploy

3 = Donate

4 = Mint

5 = Social

6 = DevTools

7 = NFT Tools

8 = Fun Modules

9 = Analytics

🟦 7. FULL MODULE TEMPLATE (Codex-Ready)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MainHub.sol";

contract ExampleModule {

    MainHub public mainHub;
    uint256 public moduleID;

    string public moduleName = "Example Module";
    string public moduleDescription = "This module performs an example action";
    uint8 public moduleType = 1;
    uint8 public moduleCategory = 1;
    uint16 public version = 1;

    uint256 public usageCount;

    event ModuleAction(address indexed user, uint256 timestamp, string details);

    constructor(address _mainHub, uint256 _moduleID) {
        mainHub = MainHub(_mainHub);
        moduleID = _moduleID;
    }

    function execute(string calldata data) external {
        require(mainHub.hasAccess(msg.sender, moduleID), "No access");
        mainHub.chargeFee(msg.sender, moduleID);

        usageCount++;

        emit ModuleAction(msg.sender, block.timestamp, data);

        mainHub.recordUsage(msg.sender, moduleID);
    }

    function getModuleInfo() external view returns(
        string memory,
        string memory,
        uint8,
        uint8,
        uint16
    ) {
        return (
            moduleName,
            moduleDescription,
            moduleType,
            moduleCategory,
            version
        );
    }

    function supportsFeature() external pure returns(string memory) {
        return "example_feature";
    }
}

🟩 8. FINAL NOTES — THIS DOCUMENT IS 100% COMPLETE

This standard guarantees:

Perfect compatibility with MainHub

Zero-breaking expansion to 1000+ modules

Clean and predictable code structure

Easy auditing

Seamless frontend generation

Perfect behavior for statistics + fees + leaderboard
