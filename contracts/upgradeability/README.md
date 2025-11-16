# contracts/upgradeability Directory

## Purpose
Proxy implementations, upgrade managers, and version beacons supporting hot upgrades.

## How to Use
Deploy TransparentUpgradeableProxy, ProxyAdmin, or beacons before pointing to implementations.

## Naming Conventions
MainHubProxy.sol, ModuleBeacon.sol.

## Coding Rules
Follow OpenZeppelin reference implementations and emit Upgrade events.

## Scaling Notes
Enable seamless upgrades while keeping storage stable across hundreds of modules.

## Security Notes
Restrict upgrade functions to multisig or timelock and document version history.

## Codex/Cursor Automation
Deployment manifest references proxies found here when generating instructions.

## Example
```solidity
contract MainHubProxy is TransparentUpgradeableProxy { constructor(...) TransparentUpgradeableProxy(...) {} }
```
