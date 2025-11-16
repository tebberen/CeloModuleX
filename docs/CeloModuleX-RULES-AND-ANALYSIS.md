CeloModuleX — Project Rules & Modular Hub Analysis (Professional Audit-Level Document)

This document defines all current gaps, improvement recommendations, and the execution roadmap for building CeloModuleX as a scalable, secure, and fully modular on-chain action infrastructure.

It is intended for:
Codex, Cursor, developers, auditors, contributors, and future integrations.

1. Current Gaps & Ambiguities
1.1 Module Metadata Gap

The current Module struct lacks:

On-chain name

On-chain description

On-chain metadataURI

This forces:

Frontend → hardcoded labels

Risk of mismatch between frontend and on-chain truth

Complicates multi-chain deployments

Missing fields:

string name

string uri (metadata JSON, docs, icon)

uint256 usageCount (optional on-chain tracking)

1.2 Leaderboard Persistence

The design defines daily counters, but:

No weekly/monthly storage rules

No snapshot/epoch system

No strategy for reset, rotation, or aggregation

This affects:

Weekly/Monthly leaderboards

Multi-chain analytics

External dashboards (Dune, TheGraph, etc.)

1.3 Deployment Guide Missing Critical Steps

The deployment order is correct but incomplete. Missing:

Explorer verification

.env & private key standardization

Rollback and re-deploy procedure

Version tagging / manifest generation

1.4 External Integrations Have 0 Prepared Data

For Celo AI, Talent Protocol, and Self XYZ:

No base URLs

No API endpoints

No auth rules

No webhook/callback logic

No module mapping (which module uses which API)

1.5 NFT Economy Parameters Incomplete

Dynamic pricing is defined, but unclear:

Tier supply limits

Transferability rules (soulbound?)

Royalty/fee structure

Locking/staking model

Multi-chain or bridgeable policy

1.6 Missing Advanced QA & Security Plan

Current test plan lacks:

Fuzz testing

Invariant tests

Forked network testing

Economic attack scenarios

Reentrancy stress tests

1.7 Preparation Checklist Not Fully Completed

Still missing:

Final category list

Final 50-module list

User flow diagrams

Codex prompt packages

Module blueprint library

Complete integrations registry

2. Recommended Improvements
2.1 Extend Module Registry Metadata

Add the following fields on-chain:

string name;
string metadataURI;
uint32 usageCount;


Benefits:

No more frontend hardcoding

Multi-chain consistency

Automatic icon/description loading

Better analytics

Emit enhanced events:

event ModuleRegistered(
  uint256 moduleId,
  address moduleAddress,
  string name,
  uint8 category,
  uint8 moduleType,
  bool premium,
  uint16 version
);

2.2 Introduce On-Chain Leaderboard Epochs

Design LeaderboardEpoch logic:

Daily rollup

Weekly aggregation

Monthly aggregation
Optional add-ons:

Cron-like TaskScheduler module

Off-chain worker that stores deterministic snapshots

2.3 Standardize Deployment & Verification Pipeline

Add:

Network-specific deploy scripts

Automatic explorer verification

Manifest generation for:

Contract address

ABI file

Version

Chain ID

Rollback strategy using Git tags

2.4 Build Integrations Registry

Create:

/docs/integrations/README.md


Include for each service:

Base URL

API endpoints

Auth method

Test key

Module that consumes it

Callback/webhook requirement

Environment matrix (dev → staging → prod)

2.5 Create Formal NFT Policy Document

Define:

Tier supply caps

Transferability rules

Royalty/fee rules

Dynamic pricing parameters

Multi-chain bridging UX

Staking/locking behavior

Document inside:

/docs/NFT-ACCESS-POLICY.md

2.6 Extend QA & Security Framework

Include:

Slither static analysis

Foundry fuzz tests

Invariant tests

Replay attack tests

Multi-chain conflict testing

Economic & griefing vectors

2.7 Complete All Preparation Docs

Finish and commit:

Category & module list

Module blueprint library

Full user journey diagrams

Codex generation prompt packages

Full system architecture diagrams

3. Detailed Task List (Execution Roadmap)

This is the official development roadmap for CeloModuleX.

3.1 Repository & Directory Structure
contracts/
contracts/modules/
modules/blueprints/
frontend/
scripts/
docs/
docs/integrations/
docs/architecture/

3.2 Codex + Cursor Integration Prep

Store module blueprint templates under:

modules/blueprints/<category>/<module>.md


Codex prompt package includes:

Module generation rules

MainHub interaction rules

Test boilerplates

RegisterModule patterns

Frontend sync rules

Cursor tasks automate:

Contract creation

Test generation

Deployment

Registration

Frontend binding

3.3 Core Smart Contract Development

Tasks:

Implement MainHub.sol

Implement NFTAccessPass.sol

Add fee/commission model

Add RBAC (owner/admin/moderator)

Emit full, rich events

Implement recordUsage + analytics logic

3.4 Module System Implementation

Implement registerModule

Add enable/disable

Add category queries

Create BaseModule abstract contract

Build 50 production modules across:

GM

Deploy

Mint

Donate

Governance

Badge

Social

AI

Multi-chain tools

3.5 Data & Leaderboard Layer

Implement:

dailyActions

moduleActions

globalActions

User stats mapping

Epoch rollups

Score calculation

Events:

UserStatsUpdated

GlobalStatsUpdated

ModuleExecuted

3.6 Frontend Integration Tasks

Implement:

constants.js

contractService.js

walletService.js

hooks & state

UI pages for:

Home

Profile

Modules

Module Detail

Leaderboard

Stats

NFT Mint

Settings

WalletConnect

3.7 Deployment Steps

Order:

Deploy NFT

Deploy MainHub

Deploy all modules

Register all modules

Update constants.js

Verify contracts

Generate manifest

3.8 Testing & Debugging

Add:

Basic tests

Integration tests

Fuzz/invariant tests

Fork tests for Celo/Base

Scenario tests:

Fee manipulation

Stats spoofing

Leaderboard abuse

3.9 Security Review

Perform:

Slither analysis

Reentrancy review

Fee withdrawal security

NFT pricing & supply validation

3.10 Launch Preparation

Deliver:

Full documentation

Integration sheets

Diagrams

Final blueprints

Deployment manifest

Explorer links

Post-launch:

Set up dashboard

Monitor module activity

Track gas & fees

Plan next 50 modules

Final Note

This document is a mandatory part of the CeloModuleX architecture.
Codex and Cursor will use this as a reference for:

✔ module generation
✔ contract design
✔ deployment automation
✔ frontend integration
✔ multi-chain expansion
✔ audit preparation
