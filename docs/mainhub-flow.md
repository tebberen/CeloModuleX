MainHub — Execution Flow Diagram

MainHub controls access, fee management, module routing, stats, and events.

📌 Main Execution Flow
executeModule(moduleId)
     ↓
Check Profile Exists
     ↓
Check Module Active
     ↓
Check Access (Premium / Free)
     ↓
Calculate Fee
     ↓
chargeFee()
     ↓
Call Module: module.execute()
     ↓
recordUsage()
     ↓
updateGlobalStats()
     ↓
updateUserStats()
     ↓
emit ModuleExecuted

Purpose

Backend logic reference

Frontend integration guide

Required for audits and module developers

Ensures all modules follow the same execution path
