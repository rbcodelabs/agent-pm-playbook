# Approved Build walkthroughs

Synthetic instruction scenarios, not a live integration test. All identities below are
fictional. Read the exact source objects through the configured providers.

| Scenario | Expected action | Stop boundary |
|---|---|---|
| User approves plan P-101 in the active thread | Reuse that instruction and plan; create/re-read Task T-101; implement in an isolated worktree without another Plan request | One tested PR, T-101 IN_REVIEW |
| Enabled policy discovers immutable Decision D-101 approving P-101 | Verify human author, scope, repository/workspace and expiry; dispatch one dedicated worker early; parent continues every health row | Same common worker procedure |
| D-101 is exact but NOW limit is unreadable | Leave horizon unchanged, record admission limitation, continue unconditional build approval | No browser login or guessed capacity |
| D-101 expressly says build only after admission | Honor the explicit condition; defer build until the authorized condition holds | No reinterpretation of human limits |
| Two workers create T-101/T-102 concurrently | Re-read Tasks/PRs before code and publication; coordinate any active owner; deterministic tie-break only when neither began | Best-effort collision detection; no exactly-once claim |
| Task create response times out | Read linked provider Tasks and recover the exact operation; if uncertain, stop this item and continue independent health work | No blind create retry |
| Worker is running / idle / archived | Leave running owner alone / resume idle owner / reconcile branch and PR before recorded takeover | Same Task and branch, no duplicate PR |
| Approval expired, revoked or scope changed | Stop next safe operation, preserve execution evidence, seek only required delta authority | No publication under stale authority |
| Legacy policy is present without migration | Keep pinned legacy revision; new revision reports that route unavailable | No silent opt-in or fallback |
| Human authorizes policy migration and D-101 still matches | Carry exact approval forward with original exclusions/expiry | No repeated product Decision |
| PR opened but preview failed | Keep work in progress and repair within scope | No IN_REVIEW success claim until required verification passes |
| Tested preview passes | Link Task, branch, commit and PR; mark IN_REVIEW | No merge, production change or shipped claim |

Provider trace: feedback F-101 links to opportunity O-101; solution S-101 and experiment
X-101 carry evidence, not permission. A roadmap candidate R-101 remains in LATER until
admission is authorized and capacity is readable. Explicit D-101 can independently
authorize a tested PR linked to R-101. In compass-full, these product writes use Compass,
decision reads use compass_decisions, Task checkpoints use compass_tasks, and thread
dispatch uses the resolved automation runtime. In another profile, resolve each provider
independently; do not copy Compass product state into Markdown.

Live acceptance remains necessary: observe one approval → one Task → one isolated worker
→ tests → one preview-verified PR, with zero repeated approval requests. These walkthroughs
and contract tests cannot demonstrate provider availability or atomic execution.
