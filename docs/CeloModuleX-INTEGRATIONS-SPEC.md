CeloModuleX — Integrations Preparation Specification

This document defines all external integrations required for CeloModuleX and the technical details Codex must consider when generating modules that interact with external APIs.

🟪 1. Overview of Integration Requirements

CeloModuleX integrates with 3 major partner ecosystems:

Celo AI Partner Program

Talent Protocol (Builder Identity)

Self XYZ (On-Chain Identity Layer)

For each integration, this document defines:

Required documentation sources

API base URLs

Authentication methods

API key usage (private, not stored on-chain)

Whether callbacks or webhooks are required

Which module(s) will use the integration

Test API keys for development environments

These details ensure Codex generates integration-ready module templates.

2. Integration #1 — Celo AI Partner Docs
2.1 Documentation Source

Celo AI Partner Docs (official)
(You will provide the exact URL when available.)

2.2 Required Information

API URL:
Example (placeholder):
https://api.celo.ai/v1/

API Key:

Stored off-chain

Inserted by the developer at deploy or runtime

Never stored inside the smart contract

Authentication:

Bearer token:
Authorization: Bearer <API_KEY>

Callback / Webhook Requirement:

Optional depending on endpoint

If needed → handled by backend, not by the smart contract

Modules That May Use This Integration

AI-powered GM Generator Module

AI-based Social Booster Module

AI Insight / Recommendation Module

Test Keys:

You will enter sandbox/test keys manually during development.

3. Integration #2 — Talent Protocol
3.1 Documentation Source

Talent Protocol Developer Docs
(You will provide URL when ready.)

3.2 Required Information

API URL:
Example (placeholder):
https://api.talentprotocol.com/v2/

API Key:

Required for private endpoints

Stored on backend, not on-chain

Authentication:

Standard API Key header

Optional OAuth depending on endpoint

Callback / Webhook Requirement:

If verifying user identity: optional webhook

Smart contract does NOT handle webhooks directly

Modules That May Use This Integration

Talent Identity Sync Module

Builder Score Fetcher

“Verify Builder Badge” Module

Test Keys:

To be manually inserted into environment variables during development.

4. Integration #3 — Self XYZ
4.1 Documentation Source

Self.ID / Self XYZ Official Docs

4.2 Required Information

API URL:
Example (placeholder):
https://api.self.xyz/identity/

API Key:

Required for identity lookup and signature verification

Stored off-chain

Authentication:

Bearer token or project secret

Callback / Webhook Requirement:

Optional for identity events

Handled server-side only

Modules That May Use This Integration

On-Chain Identity Verifier

External Profile Sync

“Link Self Identity” Module

Test Keys:

Inserted manually using .env during testing.

5. General Security Rules for All Integrations
5.1 No API Keys On-Chain

Smart contracts never store or expose API keys.

5.2 API Calls Occur Off-Chain

Modules will emit events

Backend / frontend will listen

API will be called off-chain

Results may be written back via a special module if needed

5.3 Optional Oracle Layer

If real on-chain API data is required:

Use a custom oracle

Or Chainlink / Pyth

Or your own Verification Module

6. Integration Checklist (For Codex & Developers)

Before a module uses any integration:

 API URLs confirmed

 API keys added to environment variables

 Authentication verified

 Required webhooks implemented (if any)

 Module-level integration logic defined

 Test keys created

 Frontend service wrapper created

7. Summary

This specification ensures:

Codex understands how integrations work

API calls remain off-chain

Modules remain lightweight and secure

Developers know exactly where to place keys

Each integration is expandable in v2/v3
