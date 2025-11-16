CeloModuleX — Module Documentation (50 Modules)

This document defines the standardized format for describing all module contracts within the CeloModuleX ecosystem.
Each module MUST follow the template below.

📌 Module Template (Use This for All 50 Modules)
## Module #<ID> — <Module Name>
- **Category:** <Category Name>
- **Type:** <gm | deploy | donate | nft | analytics | social | misc>
- **Premium:** Yes/No
- **Version:** 1
- **Description:** <Short explanation of what this module does>
- **Input:** <Parameters passed to module.execute()>
- **Output:** <What the module returns or emits>
- **Events:** <Event list>
- **Fee:** 0.1 CELO (Premium: 0.01 CELO)

Example
Module #1 — GM Standard

Category: Social Tools

Type: gm

Premium: No

Version: 1

Description: Creates an on-chain GM message written by the user.

Input: string gmMessage

Output: On-chain GM record stored by the module

Events: ModuleAction(user, timestamp, "GM")

Fee: 0.1 CELO (Premium: 0.01 CELO)

⚠️ Not: Bu dosya 50 modülün tam referans listesi olacak.
Frontend, developers ve Codex bu dosyayı okuyarak modül davranışını anlayacak.

✅ 2. Dosya
/docs/categories.md
CeloModuleX — Module Categories Documentation

CeloModuleX contains 10 standardized categories. Each category groups modules with similar functionality.

📌 Category Template
# Category <ID> — <Category Name>
<Description>

Modules:
- Module Name 1
- Module Name 2
- Module Name 3
...

Example:
Category 1 — Social Modules

This category includes on-chain interaction tools for social signaling and communication.

Modules:

GM Standard

GN Standard

Follow Module

Like Module

Onchain Comment Module

Purpose of Category System

Keeps the module ecosystem structured

Helps users find the correct module quickly

Provides a scalable taxonomy for 100+ modules

Allows frontend to auto-generate module lists
