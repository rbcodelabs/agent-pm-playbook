---
name: roadmap-workflow
description: >-
  Manage the product roadmap — preserve candidates in Later, rank and admit
  solutions to Next, commit delivery in Now, move items between horizons and
  report what moved, run quarterly reviews, and draft stakeholder updates. Items
  trace to an OST solution and an OKR KR. Use when the user is adding items to the roadmap, updating status,
  reviewing delivery pipeline health, or preparing a roadmap communication.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - roadmap
    - roadmap item
    - delivery plan
    - now next later
    - ship it
    - roadmap review
    - quarterly review
    - roadmap update
    - roadmap status
    - RM-
  intents:
    - add something to the roadmap
    - move this to now
    - we're shipping this
    - review the roadmap
    - what's on the roadmap
    - update roadmap status
    - mark this as shipped
    - kill this roadmap item
    - roadmap health check
    - generate a roadmap update
    - stakeholder roadmap report
    - what are we building this quarter
    - promote from later to next
  entities:
    - roadmap item
    - roadmap summary
    - delivery commitment
    - horizon
    - Now
    - Next
    - Later
    - Shipped
    - Killed
    - target date
    - release notes
    - RM-001
chainTo:
  - pattern: "experiment|validate|not.*validated|no.*experiment|risk|assumption"
    targetSkill: experiment-workflow
    message: Switching to experiment workflow — the solution has an open assumption worth testing
  - pattern: "okr|key result|\\bKR\\b|objective|which.*metric|move.*metric"
    targetSkill: okr-workflow
    message: Switching to OKR workflow to check KR alignment for this roadmap item
  - pattern: "opportunity|\\bOPP-\\b|why.*exist|customer.*need|\\bOST\\b|solution.*parent"
    targetSkill: ost-workflow
    message: Switching to OST workflow to understand the opportunity behind this roadmap item
---

# Roadmap Workflow

## Autonomy

Follow the [Autonomy Policy](../../Autonomy%20Policy.md): act, then report. Admitting,
reordering, and moving items across `LATER`, `NEXT`, and `NOW` are reversible — do them and
report what moved and why. Ask a human first only to kill, archive, or delete an item, to
send a roadmap update outside the team, or to ship to production. Missing data: infer, state
the assumption in one line, continue.

## Provider Preflight

Before reading or writing state, read `pm-config.md` and resolve the `roadmap` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Confirm exactly one authoritative provider. Use its workflow for persistence; do not silently create Markdown. Any secondary artifact must be labeled `inbox`, `export`, `cache`, or `snapshot`. Resolve `delivery` separately when creating execution work. For Compass roadmap or Compass Tasks, invoke `compass-workflow` and preserve stable cross-object links.

Irreversible roadmap actions (killing or archiving an item, external communication) go
through `review_requests` and `decision_records` to the configured decision provider.
A tracking-only decision records the call; it does not grant execution authority beyond
the workflow's existing authority boundary.

Read `portfolio_policy` from `pm-config.md` before changing a horizon. Markdown files below
are only that adapter. Create execution work through the separately resolved `delivery`
provider and link it to the solution and roadmap record.

## Where the Roadmap Sits

```
OKR KR (what we're trying to achieve)
  └── OST Opportunity (why users need it)
        └── OST Solution (what we'll build)
              └── Experiment (validates the approach)
                    └── Roadmap Item (`NEXT`/`NOW` delivery commitment)
                          └── Resolved delivery task (Compass Tasks, Linear, Jira, etc.)
```

A roadmap item is not a feature request. `LATER` preserves a deduplicated possibility.
`NEXT` is an ordered queue within `next_limit`, normally of validated solutions. `NOW` is
committed delivery within `now_limit`.

## File Structure

### Roadmap Summary

`product/roadmap/roadmap-summary.md` — the narrative overview humans read.

```markdown
---
type: roadmap-summary
product: [name]
last_updated: YYYY-MM-DD
---

# Roadmap — [Product Name]

## Now (This Quarter)
[Active items — owner, target date, delivery link]

## Next (Capacity-limited delivery queue)
[Ranked items within the configured limit]

## Later (Preserved candidates — not committed)
[Deduplicated possibilities, including candidates still gathering evidence]

## Shipped
[Completed items — release link, date shipped]
```

### Individual Roadmap Items

`product/roadmap/items/[RM-XXX].md` — one file per item, used by Obsidian Bases.

```markdown
---
id: RM-001
type: roadmap-item
title: "[Initiative name]"
status: Now | Next | Later | Shipped | Killed
phase: Discovery | Delivery | Infrastructure
parent_solution: SOL-001
parent_opportunity: OPP-001
okr_krs:
  - OBJ-01-KR-1
target_date: YYYY-MM-DD
shipped_date: ""
linear_url: ""
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
---

# RM-001: [Title]

## Context
**OST Solution:** [[SOL-001 Solution Name]]
**OST Opportunity:** [[OPP-001 Opportunity Name]]
**Connected KRs:** OBJ-01-KR-1 — [KR description]

## What We're Building
[What the customer will be able to do, not what the team will build: "users will
receive timely alerts when [trigger], reducing the need to manually check [X]."]

## Acceptance Criteria
- [ ] [Observable behavior that confirms this is done]
- [ ] [Observable behavior that confirms this is done]

## Release Notes
*(Fill in when shipped)*
```

## Procedure 1 — Adding a Roadmap Item

1. **Find the parent solution** in the OST (`product/ost/solutions/` or the resolved
   provider) and check its status and linked experiments. If there is no parent solution,
   create the item in `LATER` and link or propose the OST solution in the same pass.
2. **Pick the horizon.** Validated → `NEXT` at the rank it earns (or `NOW` if a slot, owner,
   and date exist). Not yet validated → `LATER`, plus a drafted validation task. If you place
   an unvalidated item in `NEXT` or `NOW` anyway (for example, a cheap reversible change),
   flag it as a risk in the item and the report.
3. **Assign an ID:** highest existing RM-XXX plus one, or RM-001.
4. **Fill the fields from what you can read** — KRs from the active OKR cycle, target date
   from the delivery provider or quarter, owner from the delivery provider. Infer what is
   missing and state it in one line.
5. **Write the item** from the template: frontmatter, context links, customer-outcome
   description, at least two observable acceptance criteria.
6. **Update `roadmap-summary.md`** (create it from the template if absent).
7. **Create the delivery epic** in the configured tracker if one exists, linking the RM and
   SOL IDs, and write the URL back to `linear_url`.
8. **Report** the item, horizon, rank, anything displaced, and any inference.

## Procedure 2 — Updating Roadmap Status

### Shipping an item

1. Take the shipped date, description, and release link from the merged PR, release, or
   deploy record; ask only for what you cannot find.
2. Set `status: Shipped`, `shipped_date`, the Release Notes section, and `last_updated`.
3. Move the item to Shipped in `roadmap-summary.md` with date and release link.
4. Transition any linked epic to Done.

Never delete a shipped item — the release notes are institutional memory.

### Killing an item

Killing removes an item from the roadmap, so it needs a human. Do the prep first, then ask
once with a recommendation: "I'd kill RM-012 — its experiment invalidated demand (link).
OK?" On approval:

1. Set `status: Killed`, add a dated `## Kill Reason` section, and update `last_updated`.
2. Remove it from all horizon sections of `roadmap-summary.md`; do not add it to Shipped.
3. Close or cancel any linked epic with the kill reason.

### Promoting an item

**Approved Builds and roadmap admission are separate.** Follow
[build-authorization](../build-authorization/SKILL.md) to produce a tested PR under exact
human approval; the build never waits on a horizon move.

Moving items between horizons is the agent's call:

1. Re-read the full ordered horizon and `portfolio_policy`; never evaluate the candidate
   in isolation.
2. For `LATER → NEXT`, compare the candidate with every existing `NEXT` item and pick its
   rank. If `next_limit` is full, pick the lowest-value item to displace to `LATER`.
3. For `NEXT → NOW`, check the `now_limit` slot, target date, delivery owner, dependencies,
   and execution collisions. If `NOW` is full, move the lowest-value item back to `NEXT`
   and say why. Missing date: set one from delivery load and state it. Missing owner: use
   the owner already recorded in the delivery provider; if none exists, leave it unassigned
   and flag it. Assigning a person commits their time, so that goes to review.
4. The move is the agent's call. A tracking-only review, if one exists, is context only and
   cannot trigger a queue mutation by itself; the move rests on the steward's separately
   established authority under this policy (or an action-capable adapter).
   Immediately before applying, re-read the horizon and
   repeat the validation, capacity, and collision checks.
5. Update the summary and record before/after counts, ranks, displaced IDs, and the reason.
6. Validation approval by itself never runs this procedure; the item remains in `LATER`
   until the validation result is in, and then the agent moves it.

## Procedure 3 — Quarterly Roadmap Review

Run at the start of each quarter or on request.

### Step 1: Inventory the pipeline

Read every roadmap item and build a table:

| ID | Title | Status | KRs | Has Target Date | Has Delivery URL | Parent Solution Validated |
|----|-------|--------|-----|-----------------|------------------|--------------------------|

### Step 2: Check, fix, report

Fix what you can directly; report the rest.

| # | Check | What the agent does |
|---|---|---|
| 1 | Orphaned items (no `parent_solution`) | Link the matching OST solution, or add one; report what was linked |
| 2 | `NOW` item without `target_date` | Set it from the delivery provider or quarter end; state the inference |
| 3 | `NOW` item without delivery URL | Create or link the epic |
| 4 | Unvalidated solution in `NOW` | Flag as the top risk; draft the cheapest validation test |
| 5 | `NOW` over `now_limit` | Move the lowest-value excess back to `NEXT`; report which and why |
| 6 | `NEXT` unranked, over `next_limit`, or unvalidated | Rank it; displace the excess to `LATER`; flag unvalidated items |
| 7 | `LATER` item older than 6 months | Recommend kill or promotion; promote if evidence supports it, ask before killing |
| 8 | Stale or wrong-objective KR links | Re-point to the correct KR in the active cycle; report each change |
| 9 | Shipped but still `NOW`/`NEXT` | Check release evidence (merged PRs, tags, deploys) directly; mark Shipped and free the slot |

Checks 8 and 9 catch silent drift: a KR created mid-cycle leaves items pointed at a closed
KR, and a missed webhook or broken Task link leaves released work occupying scarce `NOW`
capacity. Do not assume `delivery-completion-watcher` already reconciled it.

### Step 3: KR coverage

Group `NOW` and `NEXT` items by KR, then by Objective. Call out every KR and every Objective
with zero roadmap items rolling up to it — an Objective can look staffed while nothing
actually serves it.

### Step 4: Report

```
## Roadmap Review — [Date]

### Pipeline Summary
- Now: N · Next: N · Later: N (N stale) · Shipped this quarter: N

### Changes Made
[Moves, re-links, date fixes — item, before → after, reason]

### Risks and Open Questions
[Unvalidated items in Next/Now, kill recommendations awaiting a human]

### KR Coverage
[KRs and Objectives with item counts and gaps]
```

## Procedure 4 — Scheduled Roadmap Steward

For projects with enabled `approved_build_policy`, route approved build work to
[build-authorization](../build-authorization/SKILL.md); do not wait for roadmap admission.

Each run:

1. Resolve `roadmap`, `ost`, `experiments`, `okrs`, `delivery`, `review_requests`, and
   `decision_records`, then read `portfolio_policy`.
2. Inventory the ordered `NOW`, `NEXT`, and `LATER` horizons, active validation work,
   delivery work, agent runs, branches, and pull requests. Record before-counts.
3. For unvalidated candidates worth investigating, apply `VALIDATE_IN_LATER`: keep the item
   in `LATER` and draft the validation task. Recruiting participants or paid tests need a
   human; a tracking-only provider never dispatches that work after approval, it only
   records and reports it. Only an action-capable adapter may apply the continuation under
   existing authority.
4. For each `VALIDATED` candidate, compare it with every `NEXT` item and apply
   `ADMIT_TO_NEXT_AT_RANK`, or `REPLACE_NEXT_ITEM` with the displaced item sent to `LATER`
   when `next_limit` is full.
5. Apply `COMMIT_TO_NOW` when a `now_limit` slot, owner, dependencies, and dates are in
   place and no collision exists. If capacity data is missing, keep the item in place and
   open a task to collect it.
6. Run checks 8 and 9 every cycle. Report each KR-coverage gap that persisted more than one
   cycle as its own line.
7. Report what moved and why. End cleanly when nothing material changed; do not create a
   recurring note about an unchanged queue.

## Procedure 5 — Roadmap Narrative for Stakeholders

Draft freely; sending it outside the team needs a human. The update is a story about why,
not a feature list:

```
## Roadmap Update — [Date]

### What We're Shipping Now
"We're working on [initiative] because [customer need]. This should move [KR].
Target: [date]."

### What's Coming Next
"Next we'll tackle [initiative], which addresses [opportunity] and connects to [KR]."

### What We've Learned and Deprioritized
"We explored [initiative] but [kill reason]. This tells us [learning]."

### Delivered This Quarter
"[Initiative] shipped on [date]. [What users can now do.] [Release link]"
```

Pair every item with its customer outcome and connected opportunity. Link a release for
every shipped item. Name any KR with no `NOW`/`NEXT` work: "We don't have active delivery
work against [KR] — this is a gap."

## Anti-Patterns

| Anti-pattern | Correction |
|---|---|
| Feature language in descriptions | "Users will be able to…", not "We're building…" |
| Appending to a full `NEXT` queue | Rank it and displace the lowest-value item to `LATER` |
| More `NOW` items than the team can ship | Move the excess back to `NEXT` and report it |
| Using `NEXT` as a validation queue | Keep unvalidated items in `LATER` with a validation task, or flag the risk |
| Treating the roadmap as a backlog | Keep raw ideas in the OST; `LATER` holds deduplicated candidates only |
| Killing without a reason | Every kill gets a dated Kill Reason |
| Waiting for approval to reorder | Reorder, then report |

## References

- [Autonomy Policy](../../Autonomy%20Policy.md)
- [Full Playbook — OST as Operating System](../../Agentic%20PM%20Playbook.md)
- [OKR Workflow](../okr-workflow/SKILL.md)
- [Experiment Workflow](../experiment-workflow/SKILL.md)
- [Build Authorization](../build-authorization/SKILL.md)
- [Stakeholder Status Reports](../status-report-workflow/SKILL.md)
