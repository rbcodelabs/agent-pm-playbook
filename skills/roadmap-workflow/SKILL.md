---
name: roadmap-workflow
description: >-
  Manage the product roadmap — preserve candidates in Later, admit validated and
  capacity-ranked solutions to Next, create delivery commitments in Now,
  move items between horizons, run quarterly reviews, and generate stakeholder
  updates. Every roadmap item must trace back to a validated OST solution and an
  OKR KR. Use when the user is adding items to the roadmap, updating status,
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
    message: Switching to experiment workflow — the solution needs validation before roadmap commitment
  - pattern: "okr|key result|\\bKR\\b|objective|which.*metric|move.*metric"
    targetSkill: okr-workflow
    message: Switching to OKR workflow to check KR alignment for this roadmap item
  - pattern: "opportunity|\\bOPP-\\b|why.*exist|customer.*need|\\bOST\\b|solution.*parent"
    targetSkill: ost-workflow
    message: Switching to OST workflow to understand the opportunity behind this roadmap item
---

# Roadmap Workflow

## Provider Preflight

Before reading or writing state, read `pm-config.md` and resolve the `roadmap` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Confirm exactly one authoritative provider. Use its workflow for persistence; do not silently create Markdown. Any secondary artifact must be labeled `inbox`, `export`, `cache`, or `snapshot`. Resolve `delivery` separately when creating execution work. For Compass roadmap or Compass Tasks, invoke `compass-workflow` and preserve stable cross-object links.

When prioritization, displacement, scope, or another ambiguous judgment needs a human,
resolve `review_requests` and `decision_records` and route it through the configured decision provider.
A tracking-only decision records the call but does not grant execution authority
or mutate the roadmap; apply a roadmap change only under the workflow's existing authority
boundary and after its normal validations.

Roadmap evidence and capacity gates are provider-neutral. Read `portfolio_policy` from
`pm-config.md` before recommending or applying a horizon change. Markdown files below are
only that adapter. Create execution work through the separately resolved `delivery`
provider and link it to the validated solution and roadmap record.

You are a specialist in managing the product delivery roadmap — the commitment layer
that bridges validated OST solutions to shipped work. This skill activates when the
user is adding a new roadmap item, updating status, running a quarterly review, or
generating a stakeholder roadmap communication.

## Where the Roadmap Sits

The roadmap separates preserved possibilities from delivery commitments. `LATER` may hold
a deduplicated candidate while discovery and validation continue. `NEXT` and `NOW` are the
delivery queue and require validation first:

```
OKR KR (what we're trying to achieve)
  └── OST Opportunity (why users need it)
        └── OST Solution (what we'll build)
              └── Experiment (validates the approach)
                    └── Roadmap Item (`NEXT`/`NOW` delivery commitment)
                          └── Resolved delivery task (Compass Tasks, Linear, Jira, etc.)
```

A roadmap item is not a feature request. `LATER` preserves a possibility without promising
delivery. `NEXT` means validated, ordered, and admitted within configured capacity. `NOW`
means delivery capacity is committed.

## File Structure

### Roadmap Summary

`product/roadmap/roadmap-summary.md` — the narrative overview of the full pipeline.
This is the file humans read.

```markdown
---
type: roadmap-summary
product: [name]
last_updated: YYYY-MM-DD
---

# Roadmap — [Product Name]

> A governed portfolio, not a wishlist. Later preserves reviewed candidates; Next and Now require validated solutions.

## Now (This Quarter)
[Active items being built — owner, target date, Linear/Jira link]

## Next (Capacity-limited delivery queue)
[Validated, explicitly ranked items admitted within the configured limit]

## Later (Preserved candidates — not committed)
[Deduplicated possibilities, including candidates still gathering validation evidence]

## Shipped
[Completed items — link to release, date shipped]
```

### Individual Roadmap Items

`product/roadmap/items/[RM-XXX].md` — one file per item, used by Obsidian Bases
for kanban views and structured queries.

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
[1-2 paragraph description of the delivery work. Frame this in terms of what the
customer will be able to do, not what the team will build. Not "we're building
a notification system" — "users will now receive timely alerts when [trigger],
reducing the need to manually check [X]."]

## Acceptance Criteria
- [ ] [Observable behavior that confirms this is done — user-facing or measurable]
- [ ] [Observable behavior that confirms this is done]

## Release Notes
*(Fill in when shipped)*
[What shipped, what changed for users, date, link to release]
```

## Procedure 1 — Adding a Roadmap Item

Trigger: a reviewed candidate deserves preservation in `LATER`, or a validated solution is
ready for capacity-ranked delivery admission.

### Step 1: Verify the parent solution

Before creating anything, confirm the parent solution meets the bar for roadmap
commitment:

1. Ask the user for the solution ID (SOL-XXX) or look it up in `product/ost/solutions/`.
2. Check the solution's `status` frontmatter field.
3. Check whether a linked experiment has status "Validated".

**If the solution status is not "Validated":**
- If the requested horizon is `NEXT` or `NOW`, refuse the promotion and switch to the
  validation workflow. Implementation clarity, strategic fit, and low experiment cost do
  not substitute for evidence.
- `LATER` is allowed only as a deduplicated portfolio candidate. Create validation work
  separately and leave the horizon unchanged when that work is approved.

### Step 2: Assign a roadmap ID

Find the highest existing RM-XXX in `product/roadmap/items/`. Increment by 1.
If no items exist, start at RM-001.

### Step 3: Gather required information

Ask for anything not already known:

- **Horizon:** `LATER` for preservation, `NEXT` for a validated capacity-ranked queue slot,
  or `NOW` for a delivery commitment?
- **Target date:** Specific date for "Now" items. Approximate quarter for "Next".
  Optional for "Later".
- **OKR KRs:** Which key results does this delivery item move? Check
  `product/okrs/` if the user is unsure. Every item should connect to at least
  one KR.
- **Linear/Jira epic:** If the user has an issue tracker configured in
  `pm-config.md`, offer to create the epic now. Ask for the project and team.

### Step 4: Create the roadmap item file

Write `product/roadmap/items/RM-XXX.md` using the template above.

Fill in:
- All frontmatter fields. Leave `shipped_date` and `linear_url` blank if not
  yet available.
- The Context section with wikilinks to the parent solution and opportunity.
- "What We're Building" framed as customer outcome, not feature description.
- At least 2 acceptance criteria written as observable behaviors.
- Leave Release Notes blank with the placeholder text.

### Step 5: Update roadmap-summary.md

Add the new item under the correct horizon section. Include:
- Item ID and title as a wikilink: `[[RM-001 Initiative Name]]`
- Owner (if known)
- Target date (for Now items)
- Linear/Jira link (if already created)

If `roadmap-summary.md` doesn't exist yet, create it using the template above,
then add this item.

### Step 6: Create the issue tracker epic (if configured)

Check `pm-config.md` for the configured issue tracker.

- **Linear:** Use the Linear CLI or API to create an epic in the configured team.
  Set the title to the roadmap item title. Add a description that includes the
  roadmap item ID and a link to the OST solution.
- **Jira:** Create an epic using the Jira workflow. Set the Epic Name to the
  roadmap item title. Add a description linking to SOL-XXX and OPP-XXX.

After creating, write the URL back into the roadmap item's `linear_url` frontmatter
and update `last_updated`.

## Procedure 2 — Updating Roadmap Status

### Shipping an item

When the user says a roadmap item has shipped:

1. Ask for: the shipped date, a brief description of what shipped, and a link
   to the release (blog post, changelog entry, app version, etc.).
2. Update the roadmap item file:
   - Set `status: Shipped`
   - Set `shipped_date: YYYY-MM-DD`
   - Fill in the Release Notes section with the description and release link
   - Set `last_updated` to today
3. Move the item in `roadmap-summary.md` from its current horizon to the
   Shipped section. Add the shipped date and release link inline.
4. If a Linear/Jira epic is linked, transition it to Done.

Never delete a shipped item. The release notes are institutional memory.

### Killing an item

When the user wants to remove an item from the roadmap without shipping it:

1. Ask: "What's the reason for killing this? (e.g., invalidated by experiment,
   market shift, reprioritized, duplicate of another item)"
2. Update the roadmap item file:
   - Set `status: Killed`
   - Add a `## Kill Reason` section at the end of the file with the date and
     reason. This is not optional — killed items without documented reasons are
     lost learning.
   - Set `last_updated` to today
3. Remove the item from all horizon sections in `roadmap-summary.md`. Do not
   add it to Shipped. Killed items are archived, not celebrated.
4. If a Linear/Jira epic is linked, close or cancel it and add a comment with
   the kill reason.

### Promoting an item

Moving an item between horizons (Later to Next, Next to Now):

1. Re-read the full ordered horizon and `portfolio_policy`; never evaluate the candidate
   in isolation.
2. For `LATER → NEXT`, require a `Validated` parent solution and compare the candidate
   against every existing `NEXT` item. The human review must name the exact target rank.
   When `next_limit` is full, it must also name every item displaced to `LATER`. Missing
   capacity or ordering data means no promotion.
3. For `NEXT → NOW`, require an available `now_limit` slot, target date, delivery owner,
   dependency readiness, and a current execution-collision preflight. If full, the review
   must name the displaced or completed item. This is a separate `NOW` commitment decision.
4. A tracking-only decision is context only and cannot trigger an approved queue mutation.
   Mutation requires either an explicitly action-capable adapter or separately established
   authority for this exact change. In either case, re-read the horizon and repeat every
   current validation immediately before applying the exact mutation. Then update the summary
   and record before/after counts, ranks, displaced IDs, authority evidence, and an idempotency
   receipt.
5. Validation approval by itself never runs this procedure; the item remains in `LATER`.

## Procedure 3 — Quarterly Roadmap Review

Run this at the start of each quarter, or when the user asks for a roadmap
health check.

### Step 1: Inventory the pipeline

Read all files in `product/roadmap/items/`. Build a summary table:

| ID | Title | Status | KRs | Has Target Date | Has Linear URL | Parent Solution Validated |
|----|-------|--------|-----|-----------------|----------------|--------------------------|

### Step 2: Surface quality gate failures

Check each item against the quality gates and flag violations:

**Gate 1: Orphaned items**
Flag any item missing `parent_solution`. These are feature requests that bypassed
the OST. Surface them: "These items have no OST parent — they're not connected
to a validated customer need."

**Gate 2: Now items missing a target date**
Flag every "Now" item with no `target_date`. Items in Now without a date aren't
delivery commitments — they're wishes.

**Gate 3: Now items missing a Linear/Jira URL**
Flag every "Now" item with no `linear_url`. If there's no delivery tracking,
there's no way to know if it's on schedule.

**Gate 4: Unvalidated solutions in Now**
Cross-reference each Now item's `parent_solution` against the OST. Flag any
where the solution status is not "Validated". These are the highest-risk items
on the roadmap.

**Gate 5: Now items count vs. team capacity**
Read `now_limit` and current capacity from `pm-config.md` and the resolved delivery
provider. If either is unavailable, block new `NOW` admission. If `NOW` exceeds the limit,
surface the exact excess and require a displacement or completion decision.

**Gate 6: Next queue capacity and validation**
Flag every `NEXT` item whose parent Solution is not `Validated`, whose exact rank is
unknown, or that exceeds `next_limit`. Recommend returning unvalidated items to `LATER`.
New admissions to a full queue must identify the displaced item; never append silently.

**Gate 7: Stale Later items**
Flag any "Later" item where `created` is more than 6 months ago. These are
candidates for a decision: kill it, promote it, or document why it's still valid.
Stale Later items are roadmap debt.

### Step 3: KR coverage analysis

Group all Now and Next items by their `okr_krs` values. For each KR:
- How many roadmap items are expected to move it?
- Which KRs have no delivery work assigned?

Surface KRs with no associated roadmap items: "This KR has no delivery work —
either the roadmap isn't aligned to it, or it's being addressed in a way that
isn't tracked here."

### Step 4: Report the findings

Output a structured review:

```
## Roadmap Review — [Date]

### Pipeline Summary
- Now: N items
- Next: N items
- Later: N items (N stale)
- Shipped this quarter: N items

### Quality Gate Violations
[List of violations with item IDs and recommended actions]

### KR Coverage
[Table of KRs with roadmap item counts and gaps]

### Recommended Actions
[Prioritized list of actions to improve roadmap health]
```

## Procedure 4 — Scheduled Roadmap Steward

Run this as the recurring portfolio decision flow. It prepares reviews; it does not grow
the roadmap because a candidate sounds promising.

1. Resolve `roadmap`, `ost`, `experiments`, `okrs`, `delivery`, `review_requests`, and
   `decision_records`, then read `portfolio_policy`.
2. Inventory the complete ordered `NOW`, `NEXT`, and `LATER` horizons; active validation
   work; delivery work; agent runs; branches; and pull requests. Record a collision
   fingerprint and before-counts.
3. For each unvalidated candidate worth investigating, recommend `VALIDATE_IN_LATER` and
   create a validation-authorization review. A tracking-only provider never dispatches the
   prototype or experiment-design task after approval; read and report it, then stop. Only
   an action-capable adapter may dispatch that continuation under existing authority.
4. For each `VALIDATED` candidate, compare it with every `NEXT` item. Recommend
   `ADMIT_TO_NEXT_AT_RANK` only when the queue is below `next_limit`; otherwise recommend
   `REPLACE_NEXT_ITEM` with named displacement IDs. Missing capacity or rank data means
   `KEEP_LATER`.
5. Recommend `COMMIT_TO_NOW` only through the separate commitment gate with an available
   `now_limit` slot, owner, dependencies, dates, and current collision check.
6. Reconcile open reviews without applying partial responses. With a tracking-only provider,
   read and report the final outcome and stop without mutation. Only an action-capable adapter
   may re-read the queue fingerprint, apply the exact approved mutation, record an idempotent
   receipt, and dispatch the next eligible flow under existing authority.
7. End cleanly when no material evidence, capacity, ordering, or status changed. Do not
   create a recurring review about an unchanged queue.

## Procedure 5 — Roadmap Narrative for Stakeholders

Generate a stakeholder-facing roadmap update. This is not a feature list — it is
a story about why the team is building what it's building.

### Structure

```
## Roadmap Update — [Date]

### What We're Shipping Now
For each Now item:
"We're working on [initiative] because [connected opportunity — customer need framing].
This is expected to move [KR description]. Target: [date].
[Optional: early signal if any experiments ran]"

### What's Coming Next
For each Next item:
"Following that, we'll tackle [initiative], which addresses [opportunity].
This connects to [KR]."

### What We've Learned and Deprioritized
For each Killed item this quarter:
"We explored [initiative] but [kill reason]. This informs [what the team now knows]."

### Delivered This Quarter
For each item Shipped this quarter:
"[Initiative] shipped on [date]. [One sentence on what users can now do.] [Release link]"
```

### Framing rules — enforce these

- Never describe what you're building without also saying why (the connected opportunity).
- Never use feature language ("we're building X") without customer outcome language
  ("so that users can Y").
- Never list Shipped items without a release link. Shipped with no evidence is an
  unverified claim.
- If a KR is not represented in Now or Next, name it explicitly in the update:
  "We don't have active delivery work against [KR] — this is a gap."

## Quality Gates

Check these before confirming any roadmap action:

| Gate | Check | Action if failed |
|------|-------|-----------------|
| OST parent | Every item has a `parent_solution` | Refuse to add without one, or flag as orphaned |
| Solution validated | Parent solution is `Validated` before `NEXT` or `NOW` | Keep unvalidated candidates in `LATER`; dispatch validation separately |
| Now target date | Every Now item has a `target_date` | Ask for one before adding to Now |
| OKR connection | Every item links to at least one KR | Ask which KR this is expected to move |
| Next capacity | Ordered `NEXT` count is within `next_limit` | Require exact rank and named displacement before admission |
| Now capacity | `NOW` count is within `now_limit` and capacity data is current | Block admission until a slot, owner, and capacity evidence exist |
| Release notes | Shipped items have populated Release Notes | Refuse to mark Shipped without them |
| Kill reason | Killed items have a documented reason | Refuse to kill without a reason |

## Anti-Patterns

| Anti-pattern | Why it's wrong | Correction |
|---|---|---|
| Roadmap items with no OST parent | These are feature requests, not validated commitments | Require a parent_solution or route to OST workflow first |
| Feature language in roadmap descriptions | Hides the customer need behind the implementation | Reframe: "Users will be able to..." not "We're building..." |
| Later items older than 6 months | Roadmap debt — team avoids the decision | Surface for kill-or-commit decision |
| Now items without target dates | Aspirational, not committed | Require a date or move to Next |
| Shipped items with no release notes | Lost institutional memory | Block the status change until notes are written |
| Adding to Now without checking OKR alignment | Team may ship something that doesn't move the needle | Cross-reference OKRs before committing |
| Killing items without documenting why | Same mistake will be made again | Require a Kill Reason section every time |
| Roadmap with more Now items than the team can ship | Creates a culture of missed commitments | Trim Now to what's truly committed; move the rest to Next |
| Using Next as a validation queue | Makes unvalidated ideas look delivery-ready and hides overload | Keep the item in Later; create a separate validation task |
| Appending to a full Next queue | Avoids the real tradeoff and grows an unbounded wishlist | Name the rank and item displaced to Later |
| Treating the roadmap as a backlog | Unfiltered ideas obscure preserved candidates and delivery commitments | Keep only explicitly admitted, deduplicated candidates in Later; leave raw ideas in the OST |

## References

- [Full Playbook — OST as Operating System](../../Agentic%20PM%20Playbook.md)
- [OKR Layer](../../Agent%20Skills/OKR%20Layer.md)
- [Experiment Validation Gate](../../Agent%20Skills/Experiment%20Validation%20Gate.md)
- [Roadmap as Commitment Layer](../../Agent%20Skills/Roadmap%20Commitment%20Layer.md)
- [Stakeholder Communication](../../Agent%20Skills/Stakeholder%20Communication.md)
