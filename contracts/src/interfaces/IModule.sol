// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IModule {
    function execute(bytes calldata data) external returns (bytes memory);
}
