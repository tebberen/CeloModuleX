// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IModule.sol";

contract MainHub is Ownable {
    struct Module {
        address moduleAddress;
        bool active;
        uint8 category; // 0: Social, 1: Builder, 2: Finance, 3: Governance, 4: Achievement
        uint8 moduleType; // 0: Free, 1: Paid, 2: Restricted
        bool premium; // if true, only NFT holders can execute
        uint16 version;
    }

    struct UserProfile {
        string username;
        string twitter;
        string github;
        string talentProtocol;
        string selfID;
        uint256 actionCount;
        bool exists;
    }

    uint256 public basicFee = 0.1 ether; // 0.1 CELO
    uint256 public premiumFee = 0.01 ether; // 0.01 CELO
    uint256 public nextModuleId = 1;
    address public nftContract;

    mapping(uint256 => Module) public modules;
    mapping(address => UserProfile) public userProfiles;
    mapping(uint256 => uint256) public moduleActions;
    mapping(uint256 => uint256) public dailyActions;
    uint256 public totalGlobalActions;
    uint256 public totalUsers;

    event ModuleRegistered(address indexed moduleAddress, uint256 indexed moduleId);
    event ModuleActivated(uint256 indexed moduleId);
    event ModuleDeactivated(uint256 indexed moduleId);
    event ModuleExecuted(address indexed user, uint256 indexed moduleId, uint256 timestamp);
    event UserStatsUpdated(address indexed user, int256 newScore);
    event NFTAccessGranted(address indexed user);
    event GlobalStatsUpdated(uint256 totalGlobalActions);

    constructor(
        address _nftContract,
        uint256 _basicFee,
        uint256 _premiumFee,
        address initialOwner
    ) Ownable(initialOwner) {
        nftContract = _nftContract;
        basicFee = _basicFee;
        premiumFee = _premiumFee;
    }

    function registerModule(
        address moduleAddress,
        uint8 category,
        uint8 moduleType,
        bool premium,
        uint16 version
    ) external onlyOwner returns (uint256 id) {
        id = nextModuleId++;
        modules[id] = Module({
            moduleAddress: moduleAddress,
            active: true,
            category: category,
            moduleType: moduleType,
            premium: premium,
            version: version
        });

        emit ModuleRegistered(moduleAddress, id);
    }

    function executeModule(uint256 moduleId, bytes calldata data) external payable returns (bytes memory) {
        require(modules[moduleId].active, "Module not active");
        Module storage module = modules[moduleId];

        if (module.premium) {
            require(hasNFT(msg.sender), "Premium module requires NFT");
            require(msg.value >= premiumFee, "Insufficient premium fee");
        } else {
            require(msg.value >= basicFee, "Insufficient basic fee");
        }

        // Execute the module
        (bool success, bytes memory result) = module.moduleAddress.call(data);
        require(success, "Module execution failed");

        // Update statistics
        _updateStats(msg.sender, moduleId);

        emit ModuleExecuted(msg.sender, moduleId, block.timestamp);
        return result;
    }

    function _updateStats(address user, uint256 moduleId) internal {
        // Update user profile action count
        if (!userProfiles[user].exists) {
            totalUsers++;
            userProfiles[user].exists = true;
        }
        userProfiles[user].actionCount++;

        // Update module action count
        moduleActions[moduleId]++;

        // Update global and daily actions
        totalGlobalActions++;
        uint256 today = block.timestamp / 1 days;
        dailyActions[today]++;

        emit GlobalStatsUpdated(totalGlobalActions);
    }

    function createProfile(
        string calldata username,
        string calldata twitter,
        string calldata github,
        string calldata talent,
        string calldata selfID
    ) external {
        require(!userProfiles[msg.sender].exists, "Profile already exists");
        
        userProfiles[msg.sender] = UserProfile({
            username: username,
            twitter: twitter,
            github: github,
            talentProtocol: talent,
            selfID: selfID,
            actionCount: 0,
            exists: true
        });

        totalUsers++;
    }

    function updateProfile(
        string calldata twitter,
        string calldata github,
        string calldata talent,
        string calldata selfID
    ) external {
        require(userProfiles[msg.sender].exists, "Profile does not exist");
        
        UserProfile storage profile = userProfiles[msg.sender];
        profile.twitter = twitter;
        profile.github = github;
        profile.talentProtocol = talent;
        profile.selfID = selfID;
    }

    function hasNFT(address user) public view returns (bool) {
        (bool success, bytes memory data) = nftContract.staticcall(
            abi.encodeWithSignature("balanceOf(address)", user)
        );
        return success && abi.decode(data, (uint256)) > 0;
    }

    function activateModule(uint256 moduleId) external onlyOwner {
        modules[moduleId].active = true;
        emit ModuleActivated(moduleId);
    }

    function deactivateModule(uint256 moduleId) external onlyOwner {
        modules[moduleId].active = false;
        emit ModuleDeactivated(moduleId);
    }

    function updateFee(uint256 _basicFee, uint256 _premiumFee) external onlyOwner {
        basicFee = _basicFee;
        premiumFee = _premiumFee;
    }

    function withdrawFees(address payable to, uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        to.transfer(amount);
    }

    function getModule(uint256 moduleId) external view returns (Module memory) {
        return modules[moduleId];
    }

    function getUserProfile(address user) external view returns (
        string memory username,
        uint256 actionCount,
        string memory twitter,
        string memory github,
        string memory talent,
        string memory selfID,
        bool hasNFT_
    ) {
        UserProfile storage profile = userProfiles[user];
        return (
            profile.username,
            profile.actionCount,
            profile.twitter,
            profile.github,
            profile.talentProtocol,
            profile.selfID,
            hasNFT(user)
        );
    }

    function getAllModuleIds() external view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](nextModuleId - 1);
        for (uint256 i = 1; i < nextModuleId; i++) {
            ids[i - 1] = i;
        }
        return ids;
    }

    receive() external payable {}
}
