// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @notice Interface that every module must implement.
interface IModule {
    function execute(address caller, bytes calldata data) external returns (bytes memory result);
}

/// @notice Minimal interface for the Premium Access Pass NFT.
interface INFTAccessPass {
    function hasNFT(address user) external view returns (bool);
}

/// @title MainHub
/// @notice Central coordination contract for the CeloModuleX modular system.
contract MainHub is AccessControl, Pausable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    struct Module {
        address moduleAddress;
        bool active;
        uint8 category;
        uint8 moduleType;
        bool premium; // true => requires NFT access pass
        uint16 version;
        uint64 createdAt;
    }

    struct UserProfile {
        string username;
        string twitter;
        string github;
        string talent;
        string selfID;
        uint256 createdAt;
        uint256 totalActions;
        uint256 uniqueModulesUsed;
        uint256 premiumModuleCount;
        uint256 score;
        mapping(uint256 => uint256) moduleActions;
    }

    struct GlobalStats {
        uint256 totalUsers;
        uint256 totalGlobalActions;
        uint256 uniqueModulesUsedGlobal;
    }

    uint256 public basicFee = 0.1 ether;
    uint256 public premiumFee = 0.01 ether;
    address public nftContract;
    address payable public treasury;

    uint256 public accruedFees;
    GlobalStats public globalStats;
    bytes32 public immutable chainKey;

    mapping(uint256 => Module) public modules;
    mapping(uint256 => uint256) public moduleActions;
    mapping(address => UserProfile) private profiles;
    mapping(address => bool) public profileExists;
    mapping(address => mapping(uint256 => bool)) private userUsedModule;
    mapping(uint256 => uint256) public dailyActions; // YYYYMMDD => count
    mapping(bytes32 => uint256) public chainTxCount;

    uint256[] private moduleIds;

    event ModuleRegistered(uint256 indexed moduleId, address indexed moduleAddress, uint16 version);
    event ModuleActivated(uint256 indexed moduleId);
    event ModuleDeactivated(uint256 indexed moduleId);
    event ModuleExecuted(
        uint256 indexed moduleId,
        address indexed user,
        address moduleAddress,
        uint256 feePaid,
        bool usedPremiumFee,
        bytes result
    );
    event UserStatsUpdated(
        address indexed user,
        uint256 totalActions,
        uint256 uniqueModulesUsed,
        uint256 score,
        uint256 premiumModuleCount
    );
    event GlobalStatsUpdated(uint256 totalUsers, uint256 totalGlobalActions, uint256 uniqueModulesUsedGlobal);
    event ProfileCreated(address indexed user, string username);
    event ProfileUpdated(address indexed user);
    event NFTAccessValidated(address indexed user, uint256 indexed moduleId);
    event FeeUpdated(uint256 basicFee, uint256 premiumFee);
    event FeesWithdrawn(address indexed to, uint256 amount);

    constructor(address admin, address payable treasury_, address nftContract_, bytes32 chainKey_) {
        require(admin != address(0), "admin required");
        require(treasury_ != address(0), "treasury required");
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        treasury = treasury_;
        nftContract = nftContract_;
        chainKey = chainKey_;
    }

    // ===== Module Management =====

    function registerModule(
        uint256 moduleId,
        address moduleAddress,
        uint8 category,
        uint8 moduleType,
        bool premium,
        uint16 version
    ) external onlyRole(ADMIN_ROLE) {
        require(moduleAddress != address(0), "invalid module");
        Module storage m = modules[moduleId];
        require(m.moduleAddress == address(0), "module exists");
        modules[moduleId] = Module({
            moduleAddress: moduleAddress,
            active: true,
            category: category,
            moduleType: moduleType,
            premium: premium,
            version: version,
            createdAt: uint64(block.timestamp)
        });
        moduleIds.push(moduleId);
        emit ModuleRegistered(moduleId, moduleAddress, version);
    }

    function activateModule(uint256 moduleId) external onlyRole(ADMIN_ROLE) {
        Module storage m = modules[moduleId];
        require(m.moduleAddress != address(0), "missing module");
        require(!m.active, "already active");
        m.active = true;
        emit ModuleActivated(moduleId);
    }

    function deactivateModule(uint256 moduleId) external onlyRole(ADMIN_ROLE) {
        Module storage m = modules[moduleId];
        require(m.moduleAddress != address(0), "missing module");
        require(m.active, "already paused");
        m.active = false;
        emit ModuleDeactivated(moduleId);
    }

    function getModuleIds() external view returns (uint256[] memory) {
        return moduleIds;
    }

    // ===== Profile Management =====

    function createProfile(
        string calldata username,
        string calldata twitter,
        string calldata github,
        string calldata talent,
        string calldata selfID
    ) external {
        require(!profileExists[msg.sender], "profile exists");
        require(bytes(username).length > 0, "username required");
        UserProfile storage profile = profiles[msg.sender];
        profile.username = username;
        profile.twitter = twitter;
        profile.github = github;
        profile.talent = talent;
        profile.selfID = selfID;
        profile.createdAt = block.timestamp;
        profileExists[msg.sender] = true;
        globalStats.totalUsers += 1;
        emit ProfileCreated(msg.sender, username);
        emit GlobalStatsUpdated(globalStats.totalUsers, globalStats.totalGlobalActions, globalStats.uniqueModulesUsedGlobal);
    }

    function updateProfile(
        string calldata username,
        string calldata twitter,
        string calldata github,
        string calldata talent,
        string calldata selfID
    ) external {
        require(profileExists[msg.sender], "no profile");
        UserProfile storage profile = profiles[msg.sender];
        if (bytes(username).length > 0) profile.username = username;
        profile.twitter = twitter;
        profile.github = github;
        profile.talent = talent;
        profile.selfID = selfID;
        emit ProfileUpdated(msg.sender);
    }

    function getUserProfile(address user)
        external
        view
        returns (
            string memory username,
            string memory twitter,
            string memory github,
            string memory talent,
            string memory selfID,
            uint256 createdAt,
            uint256 score
        )
    {
        UserProfile storage profile = profiles[user];
        require(profileExists[user], "no profile");
        return (
            profile.username,
            profile.twitter,
            profile.github,
            profile.talent,
            profile.selfID,
            profile.createdAt,
            profile.score
        );
    }

    function getUserStats(address user)
        external
        view
        returns (
            uint256 totalActions,
            uint256 uniqueModulesUsed,
            uint256 premiumModuleCount,
            uint256 score
        )
    {
        UserProfile storage profile = profiles[user];
        require(profileExists[user], "no profile");
        return (profile.totalActions, profile.uniqueModulesUsed, profile.premiumModuleCount, profile.score);
    }

    function getUserModuleActions(address user, uint256 moduleId) external view returns (uint256) {
        UserProfile storage profile = profiles[user];
        require(profileExists[user], "no profile");
        return profile.moduleActions[moduleId];
    }

    // ===== Execution Logic =====

    function executeModule(uint256 moduleId, bytes calldata data) external payable whenNotPaused {
        require(profileExists[msg.sender], "profile missing");
        Module storage moduleInfo = modules[moduleId];
        require(moduleInfo.active, "module inactive");
        bool hasPass = _hasAccessPass(msg.sender);
        if (moduleInfo.premium) {
            require(hasPass, "premium required");
            emit NFTAccessValidated(msg.sender, moduleId);
        }
        uint256 fee = hasPass ? premiumFee : basicFee;
        require(msg.value == fee, "fee mismatch");

        accruedFees += fee;
        chainTxCount[chainKey] += 1;
        globalStats.totalGlobalActions += 1;
        moduleActions[moduleId] += 1;
        uint256 dayKey = _dateKey(block.timestamp);
        dailyActions[dayKey] += 1;

        UserProfile storage profile = profiles[msg.sender];
        profile.totalActions += 1;
        if (!userUsedModule[msg.sender][moduleId]) {
            userUsedModule[msg.sender][moduleId] = true;
            profile.uniqueModulesUsed += 1;
            globalStats.uniqueModulesUsedGlobal += 1;
        }
        if (moduleInfo.premium) {
            profile.premiumModuleCount += 1;
        }
        profile.moduleActions[moduleId] += 1;
        _updateScore(profile);

        bytes memory result = IModule(moduleInfo.moduleAddress).execute(msg.sender, data);

        emit ModuleExecuted(moduleId, msg.sender, moduleInfo.moduleAddress, fee, hasPass, result);
        emit UserStatsUpdated(
            msg.sender,
            profile.totalActions,
            profile.uniqueModulesUsed,
            profile.score,
            profile.premiumModuleCount
        );
        emit GlobalStatsUpdated(globalStats.totalUsers, globalStats.totalGlobalActions, globalStats.uniqueModulesUsedGlobal);
    }

    // ===== Fee & Treasury Management =====

    function updateFees(uint256 newBasicFee, uint256 newPremiumFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newBasicFee >= newPremiumFee, "fees invalid");
        basicFee = newBasicFee;
        premiumFee = newPremiumFee;
        emit FeeUpdated(newBasicFee, newPremiumFee);
    }

    function setTreasury(address payable newTreasury) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newTreasury != address(0), "treasury required");
        treasury = newTreasury;
    }

    function setNFTContract(address newNFT) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newNFT != address(0), "nft required");
        nftContract = newNFT;
    }

    function withdrawFees(address payable to, uint256 amount) external onlyRole(ADMIN_ROLE) {
        require(to != address(0), "invalid to");
        require(amount <= accruedFees, "insufficient");
        accruedFees -= amount;
        (bool success, ) = to.call{value: amount}("");
        require(success, "transfer failed");
        emit FeesWithdrawn(to, amount);
    }

    // ===== Chain Analytics =====

    function recordExternalChainActivity(bytes32 externalChainKey, uint256 count) external onlyRole(MODERATOR_ROLE) {
        chainTxCount[externalChainKey] += count;
    }

    // ===== Admin Controls =====

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // ===== Internal Helpers =====

    function _updateScore(UserProfile storage profile) internal {
        profile.score = profile.uniqueModulesUsed * 5 + profile.totalActions + profile.premiumModuleCount * 10;
    }

    function _hasAccessPass(address user) internal view returns (bool) {
        if (nftContract == address(0)) {
            return false;
        }
        return INFTAccessPass(nftContract).hasNFT(user);
    }

    function _dateKey(uint256 timestamp) internal pure returns (uint256) {
        // Convert to YYYYMMDD using Unix timestamp math (valid until year 9999)
        uint256 z = timestamp / 1 days;
        uint256 era = (z >= 0 ? z : z - 146096) / 146097;
        uint256 doe = z - era * 146097;
        uint256 yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
        uint256 y = yoe + era * 400;
        uint256 doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
        uint256 mp = (5 * doy + 2) / 153;
        uint256 d = doy - (153 * mp + 2) / 5 + 1;
        uint256 m = mp < 10 ? mp + 3 : mp - 9;
        y += m <= 2 ? 1 : 0;
        uint256 year = y + 1970;
        uint256 month = m;
        uint256 day = d;
        return year * 1e4 + month * 100 + day;
    }

    receive() external payable {
        accruedFees += msg.value;
    }
}
