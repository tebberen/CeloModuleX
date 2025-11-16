CeloModuleX — Data & Leaderboard Layer Specification
0. Purpose of the Data Layer

The Data & Leaderboard Layer is responsible for:

Collecting all user-based on-chain interaction data

Recording module-level usage statistics

Continuously updating global system metrics

Calculating the scoring formula

Generating 4 types of leaderboard tables

(Optional) Collecting multi-chain transaction analytics

This layer is an integral part of the MainHub.sol smart contract.

1. On-Chain Data to Be Collected
1.1. Daily Action Counts
mapping(uint256 => uint256) public dailyActions;
// key = date in YYYYMMDD format


Examples:

20250112 → 823 actions

20250113 → 912 actions

Used for daily activity charts and analytics dashboards.

1.2. Actions per Module
mapping(uint256 => uint256) public moduleActions;


Tracked for:

Module Detail Page

Stats Dashboard

Module-based leaderboards

1.3. User-Based Usage Metrics

Stored inside UserProfile:

totalActions++

moduleActions[moduleID]++

uniqueModulesUsed++
→ when a module is used for the first time

premiumModuleCount++
→ used for score calculation

These values directly power the scoring algorithm.

1.4. Multi-Chain TX Analytics (Optional)
mapping(string => uint256) public chainTxCount;


Examples:

"Celo" → 1231

"Base" → 522

"Jello" → 3122

Used for cross-chain dashboards & builder ranking.

2. Scoring System (Score Formula)

Final scoring formula:

User Score =
(uniqueModulesUsed * 5)
+ (totalActions * 1)
+ (premiumModuleCount * 10)

Breakdown
✔ Unique Modules Used × 5

Encourages exploration & module diversity.

✔ Total Actions × 1

Rewards consistency.

✔ Premium Module Usage × 10

Rewards NFT holders & premium interactions.

Score Update Logic
function updateScore(address user) internal {
    UserProfile storage u = userProfile[user];
    u.score =
        u.uniqueModulesUsed * 5 +
        u.totalActions * 1 +
        u.premiumModuleCount * 10;
}


Score is updated:

When module is executed

During recordUsage()

When stored into userProfile[user].score

3. Leaderboard Types (Top 4 Lists)
🥇 3.1. All-Time Leaderboard

Sorted by:

score


Purpose:

Show the most active long-term users

Reward consistent contributors

🥈 3.2. Weekly Leaderboard

Based on the last 7 days.

Tracked via:

weeklyActions


Calculated off-chain using:

Event logs

Block timestamps

🥉 3.3. Monthly Leaderboard

Based on the last 30 days.

Tracked via:

monthlyActions


Same filtering logic as weekly.

🎖 3.4. Module-Based Leaderboard

Per-module ranking example:

Top GM users

Top Deploy users

Top NFT Minters

Top Social module users

Based on:

userProfile[user].moduleActions[moduleID]

4. Leaderboard Generation Architecture
✔ On-chain

MainHub stores all core stats.

✔ Frontend

Regularly reads:

getUserStats()

getGlobalStats()

moduleActions[moduleID]

all user score values

✔ Sorts in JavaScript:
users.sort((a, b) => b.score - a.score)

✔ Cached client-side

Faster load time

Zero gas usage

Fully multi-chain compatible

✔ Optional backend

Suggested for:

Weekly Leaderboards

Monthly Leaderboards

Backend examples:

MongoDB

Supabase

Firebase

5. Required On-Chain Events

MainHub must emit:

event ModuleExecuted(address indexed user, uint256 moduleId, uint256 timestamp);
event GlobalStatsUpdated(uint256 totalActions);
event UserStatsUpdated(address indexed user, uint256 newScore);


Allows:

TheGraph integration

Dune dashboards

Custom backend indexing

6. Frontend Leaderboard API

Inside contractService.js:

✔ getLeaderboard()

Returns all-time rankings.

✔ getWeeklyLeaderboard()

Computed by filtering event timestamps.

✔ getMonthlyLeaderboard()

Same logic for 30-day window.

✔ getModuleLeaderboard(moduleId)

Ranks by:

moduleActions[moduleId]
