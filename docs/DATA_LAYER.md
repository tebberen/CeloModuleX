# Data & Leaderboard Layer

MainHub continuously records user behavior so that the platform can drive engagement through transparent analytics.

## 1. User Profiles

- Every wallet must create a `UserProfile` before calling a module.
- Profiles include nickname, optional metadata URIs, and counters for total actions and premium actions.
- Profile creation events let third parties verify the existence and uniqueness of a user.

## 2. Metrics Tracked

| Metric | Description |
| --- | --- |
| `totalActions` | Aggregate number of actions a user has run across all modules. |
| `moduleActions[moduleId]` | Per-module usage count for the user. |
| `uniqueModulesUsed` | How many distinct modules the user has interacted with. |
| `premiumActions` | Number of executions performed at the premium fee tier. |

## 3. Leaderboard Score Formula

$$\text{Score} = (\text{Unique Modules} \times 5) + (\text{Total Actions} \times 1) + (\text{Premium Actions} \times 10)$$

- The formula rewards both breadth (trying new modules) and depth (repeated actions).
- Premium interactions receive the highest weight to incentivize NFT ownership.

## 4. Leaderboard Views

1. **All-Time** – Lifetime cumulative score.
2. **Weekly** – Sliding 7-day window.
3. **Monthly** – Calendar-month aggregation.
4. **Module-Based** – Per module rankings derived from the same counters.

## 5. Analytics Integrations

- `ModuleExecuted` and `UserStatsUpdated` events are emitted for every action.
- TheGraph, Dune, and similar services can index these events for dashboards.
- Public APIs can expose the processed results to the frontend or partner leaderboards.
