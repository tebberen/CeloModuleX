CeloModuleX — MainHub Technical Specification
(MainHub.sol complete design document — for Codex, auditors, engineers, and module developers)
1. Purpose of the Main Contract (High-Level Definition)

MainHub.sol is the central coordination layer of the CeloModuleX ecosystem.
It manages modules, user profiles, access logic, economic mechanisms, statistics, leaderboard logic, and multi-chain interaction patterns.

The MainHub is responsible for:

Registering all modules

Controlling which user can execute which module

Verifying Premium NFT access

Collecting transaction fees

Tracking all user statistics

Updating global metrics

Producing the data required for leaderboard scoring

Maintaining unified logic across modules and across chains

The MainHub is the brain of the entire system.

2. Data Structure Design
2.1 Module Data Model
struct Module {
    address moduleAddress;
    bool active;
    uint8 category;
    uint8 moduleType;
    bool premium;
    uint16 version;
}

2.2 User Profile Model
struct UserProfile {
    string username;
    uint256 createdAt;

    string twitter;
    string github;
    string talent;
    string selfID;

    uint256 totalActions;
    mapping(uint256 => uint256) moduleActions;
    uint256 uniqueModulesUsed;
    uint256 score;
}

2.3 Global Statistics Model
struct GlobalStats {
    uint256 totalUsers;
    uint256 totalGlobalActions;
    mapping(uint256 => uint256) actionsPerModule;
}

3. Economy / Fee / NFT System (Stored in MainHub)
uint256 public basicFee;       
uint256 public premiumFee;     
address public nftContract;    


Admin functions:

updateFee

setNFTContract

withdrawFees

4. Seven Required Systems in MainHub
4.1 Module Management System

Functions:

registerModule

activateModule

deactivateModule

getModuleInfo

getModulesByCategory

getModules

Security:

registerModule → OWNER

deactivate → OWNER / ADMIN

module addresses immutable

4.2 User Profile System

Functions:

createProfile

updateProfile

getUserProfile

getUserStats

Requirements:

Profile required before using modules

All identity stored on-chain

4.3 Statistics & Analytics System

User stats:

totalActions

moduleActions

uniqueModulesUsed

Global:

totalGlobalActions

actionsPerModule

totalUsers

Leaderboard:

score = uniqueModulesUsed * 5
      + totalActions * 1
      + premiumModuleUsage * 10


Mandatory events:

stats update on every module execution

4.4 Role-Based Access Control

Roles:

OWNER

ADMIN

MODERATOR

4.5 Access Control Logic

Before executing:

Check profile

Check module active

If premium → verify NFT

Compute fee

Collect fee

Execute module

Update stats

Emit events

4.6 Event System

ProfileCreated

ModuleRegistered

ModuleExecuted

NFTAccessGranted

GlobalStatsUpdated

FeeCollected

ProfileUpdated

ModuleDeactivated

4.7 Upgradeability Options

Proxy upgrade (UUPS / Transparent)

Migration Manager

5. Execution Flow

executeModule(moduleId)

validate profile

check module active

premium logic → NFT

calculate fee

collect fee

call module.execute()

update stats

update global stats

emit events

6. Complete Function List
User:

createProfile

updateProfile

getUserProfile

getUserStats

executeModule

Module:

registerModule

activateModule

deactivateModule

getModuleInfo

getModulesByCategory

Economy:

updateFee

collectFee

withdrawFees

setNFTContract

Stats:

updateUserStats

updateGlobalStats

getGlobalStats

getModuleStats

getLeaderboard

Management:

addAdmin

removeAdmin

addModerator

removeModerator

maintenanceMode
