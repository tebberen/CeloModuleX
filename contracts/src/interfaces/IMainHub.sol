// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IMainHub {
    struct Module {
        address moduleAddress;
        bool active;
        uint8 category;
        uint8 moduleType;
        bool premium;
        uint16 version;
    }

    function executeModule(uint256 moduleId, bytes calldata data) external payable returns (bytes memory);
    function registerModule(address moduleAddress, uint8 category, uint8 moduleType, bool premium, uint16 version) external returns (uint256);
    function hasNFT(address user) external view returns (bool);
    function getUserProfile(address user) external view returns (string memory, uint256, string memory, string memory, string memory, string memory, bool);
}
