// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../interfaces/IModule.sol";

contract Donate is IModule {
    struct Donation {
        address from;
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    mapping(address => Donation[]) public donations;
    mapping(address => uint256) public totalDonated;
    uint256 public totalDonations;
    address public treasury;

    event DonationSent(address indexed from, uint256 amount, string message, uint256 timestamp);

    constructor(address _treasury) {
        treasury = _treasury;
    }

    function execute(bytes calldata data) external payable override returns (bytes memory) {
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        string memory message = abi.decode(data, (string));
        
        // Transfer funds to treasury
        (bool success, ) = treasury.call{value: msg.value}("");
        require(success, "Transfer failed");

        donations[msg.sender].push(Donation({
            from: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            message: message
        }));

        totalDonated[msg.sender] += msg.value;
        totalDonations += msg.value;

        emit DonationSent(msg.sender, msg.value, message, block.timestamp);

        return abi.encode(msg.value);
    }

    function getDonationCount(address user) external view returns (uint256) {
        return donations[user].length;
    }
}
