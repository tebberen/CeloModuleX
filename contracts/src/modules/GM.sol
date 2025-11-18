// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../interfaces/IModule.sol";

contract GM is IModule {
    mapping(address => uint256) public gmCount;
    mapping(address => uint256) public lastGmTime;
    uint256 public totalGMs;
    
    event GMSent(address indexed user, uint256 count, uint256 timestamp);

    function execute(bytes calldata data) external override returns (bytes memory) {
        gmCount[msg.sender]++;
        totalGMs++;
        lastGmTime[msg.sender] = block.timestamp;

        emit GMSent(msg.sender, gmCount[msg.sender], block.timestamp);

        return abi.encode(gmCount[msg.sender]);
    }
}
