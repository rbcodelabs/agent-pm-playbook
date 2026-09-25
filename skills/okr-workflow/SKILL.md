---
name: okr-workflow
description: >-
  Create, maintain, and review OKR cycles — use when the user is setting up a
  new OKR cycle, logging a check-in against a Key Result, reviewing OKR health,
  connecting KRs to OST desired outcomes, or archiving a completed cycle. Also
  activates when the user asks whether discovery work is aligned to a KR, or
  wants to know which KRs are at risk.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - OKR
    - OKRs
    - objective
    - key result
    - okr cycle
    - okr check-in
    - okr health
    - okr review
    - quarterly goals
    - Q1 OKRs
    - Q2 OKRs
    - Q3 OKRs
    - Q4 OKRs
  intents:
    - set up OKRs for this quarter
    - create a new OKR cycle
    - log a check-in for my KR
    - update my key result
    - review OKR health
    - which KRs are at risk
    - connect this KR to discovery
    - archive the OKR cycle
    - are my OKRs outcome-focused
    - what should I work on to move this KR
    - my KR is off track
  entities:
    - Objective
    - Key Result
    - KR
    - OKR cycle
    - desired outcome
    - check-in
    - baseline
    - target
    - OST
    - OKR health
chainTo:
  - pattern: "opportunity.*tree|\\bOST\\b|desired outcome|discovery|opportunity|connect.*KR"
    targetSkill: ost-workflow
    message: Switching to OST workflow to connect this KR to the discovery tree
  - pattern: "experiment|assumption test|validate|test.*KR|what.*could.*move"
    targetSkill: experiment-workflow
    message: Switching to experiment workflow to design tests that could move this KR
  - pattern: "roadmap|delivery|milestone|when.*ship|what.*build"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow to connect roadmap items to KR progress
---

# OKR Workflow

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Drafting cycles, logging check-ins, setting KR status, linking KRs to OST outcomes, reframing weak Objectives or KRs, and closing a finished cycle are reversible: do them and say what changed. Missing values or context: infer from the config, tracker, analytics, or conversation, state the assumption in one line, and continue. Deleting a cycle or KR needs a human first.

## Provider Preflight

Read `pm-config.md` and resolve the `okrs` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. For legacy configs, state the inferred mapping and proceed. With no config, work from context, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow` and persist OKRs and check-ins inline.

File paths and templates below are the Markdown/Obsidian adapter only. For another provider, apply the same quality gates and lifecycle steps to native objects and IDs. Updating `pm-config.md` updates active references, never a duplicate OKR body.

OKRs sit at the top of the hierarchy that directs discovery. A KR with no connected OST desired outcome has no structured path to solutions; connect it.

---

## The Hierarchy

```
OKR Objective
  └── Key Result (measurable outcome)
        └── Desired Outcome (OST root — one per active KR)
              └── Opportunity (OST L2 — customer needs, pain points, desires)
                    └── Solution (OST L3 — ways to address the opportunity)
                          ├── Experiment (assumption test)
                          └── Roadmap Item (delivery)
```

- Every KR has exactly one connected Desired Outcome, and each Desired Outcome traces to exactly one KR.
- An at-risk KR calls for working its OST harder, not adding roadmap items.

---

## Where OKRs Live

With Markdown or Obsidian, cycles live in `product/okrs/[CYCLE].md` (e.g., `product/okrs/Q2-2026.md`); other providers own cycles natively. `pm-config.md` names the active cycle and the active KR. Read it first; if absent, use the most recent cycle and say so.

---

## Workflow 1: Create a New OKR Cycle

### Step 1 — Gather inputs

From the conversation, strategy docs, prior cycle, and analytics, collect: cycle identifier, start/end dates, Objectives (qualitative, one per strategic direction), 2–3 KRs per Objective, and each KR's baseline and target. Fill gaps with a stated inference (e.g., calendar quarter dates; baseline from the latest metric reading). If no baseline can be found, record `Baseline: TBD` and add a task to measure it before the first check-in.

### Step 2 — Apply the quality gate

Run the Quality Gate below and fix failures yourself: move numbers from Objectives into KRs, reframe output KRs as outcomes, trim excess Objectives with a note on what was cut. Report each fix.

### Step 3 — Scaffold the cycle file

Create `product/okrs/[CYCLE].md` using this template exactly:

```markdown
---
type: okr-cycle
cycle: [CYCLE]
start_date: [YYYY-MM-DD]
end_date: [YYYY-MM-DD]
status: Active
---

# OKRs — [CYCLE formatted]

## Objective [N]: [Qualitative ambition statement]
**id:** OBJ-0N
**Why this matters:** [Strategic rationale — one sentence]
**Status:** On Track

### KR [N.N]: [Specific measurable outcome statement]
**id:** OBJ-0N-KR-N
**Target:** [metric name]: [target value] by [end date]
**Baseline:** [baseline value] (as of [date baseline was measured])
**Current:** [baseline value] (as of [cycle start date])
**Status:** On Track
**Connected Desired Outcome:** "[desired outcome statement from OST]"
**OST file:** product/discovery/ost-[identifier].md
**Evidence this KR is moving:** None yet — cycle just started

#### Check-ins
| Date | Current Value | Status | Notes |
|---|---|---|---|
| [cycle start] | [baseline value] | On Track | Cycle started |
```

Repeat the KR block per KR and the Objective block per Objective.

### Step 4 — Connect each KR to the OST

If a matching Desired Outcome exists, link it. If not, chain to `ost-workflow` to create one.

### Step 5 — Update pm-config.md

Add the cycle path and set `active_okr_cycle`. If the previous cycle's end date has passed, close it via Workflow 5; otherwise leave it and note the overlap.

---

## Workflow 2: Log a Check-In

### Step 1 — Identify the KR
Use the KR named in the conversation, else the active KR in `pm-config.md`.

### Step 2 — Get the data
Take the current value, measurement date, and notes from the conversation or the bound metric. Set status yourself from pace (see Workflow 3, Step 2): On Track / At Risk / Off Track.

### Step 3 — Update the cycle file
1. Update the KR's `**Current:**` line with value and date.
2. Update `**Status:**` if it changed.
3. Add a Check-ins row:
```
| [YYYY-MM-DD] | [current value] | [On Track / At Risk / Off Track] | [brief note] |
```

### Step 4 — Act on risk
If At Risk or Off Track, report the gap to target (absolute and %), cycle elapsed %, whether the trajectory reaches the target, and which OST opportunities are in play. If the trajectory misses and no experiments are running, chain to `ost-workflow` or `experiment-workflow` and start the work.

---

## Workflow 3: OKR Health Review

### Step 1 — Pull the current state
For each KR: baseline, current, target, elapsed vs. remaining time, last check-in date, status.

### Step 2 — Compute trajectory
- Progress ratio: (current - baseline) / (target - baseline)
- Time ratio: days elapsed / total cycle days
- On pace when progress ratio >= time ratio; otherwise size the gap and whether it can close in time.

### Step 3 — Check the OST connection for each at-risk KR
- Is there a connected desired outcome, and are experiments running against it?
- Are high-priority opportunities sitting unworked?
- **Solution coverage** (check first): do the KR's opportunities have any solutions? An experiment needs a solution to test.
- **Fixed-cohort coverage:** if the KR tracks a fixed set (e.g., "N of M capability groups"), count how many of the M have an owning solution. A KR stuck at 0/M or low for over a week is a coverage gap, not an effort gap.

Zero solutions is a coverage urgency and comes before experiment velocity. Close it by generating candidates (`ost-workflow` Step 5) in the same run; that is discovery drafting, not a roadmap admission.

### Step 4 — Deliver the health report

```
## OKR Health Review — [CYCLE] — [Date]

### Summary
[1-3 sentence overall assessment]

### KR Status

| KR | Baseline | Current | Target | Progress | Pace | Status |
|---|---|---|---|---|---|---|
| [id] [short name] | [val] | [val] | [val] | [N]% | On Pace / Behind / Ahead | On Track / At Risk / Off Track |

### At-Risk KRs

**[KR id]: [name]**
- Gap: [current] vs. [target] — [X]% behind pace
- Connected OST: [yes/no — link]
- Active experiments: [yes/no — list if yes]
- Recommended action: [specific]

### Discovery Alignment
[For each KR: is the OST pointed at it and is work happening? One line each.]

### Recommended Priority
[Which single KR needs the most attention right now, and why]
```

---

## Workflow 4: Connect a KR to the OST

### Step 1 — Find a matching Desired Outcome
Read the OST the KR references. Look for a Desired Outcome expressing the same behavioral shift.

Good match: KR "day-7 retention rate" ↔ "More new users complete a meaningful action in their first week."
Weak match: KR "day-7 retention rate" ↔ "Grow the user base" — produces discovery that doesn't move the KR.

### Step 2 — Create or fix it
No match: chain to `ost-workflow` with the KR statement, target metric, and a proposed Desired Outcome. Weak match: reframe the Desired Outcome to fit the KR and note the change (or, if the KR is clearly meant to be broader, record that reading).

### Step 3 — Update the cycle file
Set the KR's `**Connected Desired Outcome:**` and `**OST file:**` fields.

---

## Workflow 5: Close a Cycle

### Step 1 — Final check-ins
Record a final end-of-cycle value per KR. If a value is unavailable, use the latest reading, mark it `(latest available, [date])`, and continue.

### Step 2 — Write the cycle summary
Add a `## Cycle Summary` section after the frontmatter, before Objective 1:

```markdown
## Cycle Summary — [CYCLE]

**Final status:** Completed | Completed with exceptions | Abandoned
**Overall assessment:** [2-4 sentences: what was achieved, what fell short, key learnings]

### KR Outcomes
| KR | Baseline | Final | Target | Outcome |
|---|---|---|---|---|
| [id] [name] | [val] | [val] | [val] | Achieved / Missed / Partially Achieved |

### What we learned
- [Key insight from the cycle — about the metrics, the market, or the team's capacity]
- [Repeat as needed]

### What to carry forward
- [Any KRs to continue or strengthen in the next cycle]
- [Any opportunities that proved important and should anchor the next cycle's OSTs]
```

### Step 3 — Update frontmatter and config
Change `status: Active` to `status: Completed`. Clear or update `active_okr_cycle` in `pm-config.md`, pointing to the next cycle if it exists.

---

## Quality Gate for OKR Cycles

Run before a cycle goes active and fix what fails; defects compound.

| Check | Rule | Failure signal |
|---|---|---|
| Objective count | At most 3 per cycle | More than 3 = losing focus |
| KR count | 2–3 per Objective | 1 = thin accountability; 4+ = too complex |
| Total KR count | At most 9 | More won't fit in working memory |
| Objective framing | Qualitative and directional | Contains a number, date, or deliverable |
| KR framing | Measurable outcome, not output | Mentions shipping, launching, building, delivering |
| Baseline present | Every KR has one | Can't track progress |
| Target present | Specific value and date | "Improve", "increase" |
| OST connection | Every KR has a Desired Outcome | No discovery direction |

- **Objectives are qualitative.** "Achieve 80% day-7 retention" becomes Objective "Build a product that keeps new users coming back" plus a retention KR.
- **KRs measure outcomes.** If it can be achieved with no change in customer behavior, it's an output. Output: "Ship the onboarding redesign by May 1". Outcome: "Increase new users completing their first meaningful action within 7 days from 34% to 55%".
- **KRs need baselines.** "Increase NPS to 50" means little without knowing it's 32 today.

---

## Anti-Patterns

Name these plainly and fix them:

| Anti-pattern | Fix |
|---|---|
| Output KR ("Launch X by Y") | Reframe as the customer behavior change expected after launch |
| KR with no OST connection | Connect it (Workflow 4) |
| Objective inflation (4+) | Keep the 3 with the clearest outcome link; list what was cut |
| Missing baseline | Pull one from analytics, or mark TBD with a measurement task |
| Vanity KR (already mostly hit, below trajectory, or measures activity like "run 10 interviews") | Raise the target or replace with an outcome |
| KR driven by external factors | Name the dependency; propose a KR the team can influence |
| KR or cohort item with zero solution coverage | Generate candidate solutions now; it can sit silently at baseline for weeks otherwise. Check every check-in and review |

---

## Bridging OKRs to Discovery

For an at-risk KR, work its OST rather than adding roadmap items:

1. Are the right opportunities in the tree? Does new signal update it?
2. Do they have solutions? If not, generate candidates now.
3. Are experiments running? If not, start one.
4. Is effort on the highest-priority branch, or spread thin?

**Check the reverse direction too.** Roadmap items can point at a stale KR, typically after a mid-cycle KR was created and `NOW`/`NEXT` items were never re-pointed. Cross-reference `okr_krs` on active roadmap items against the current cycle (see `roadmap-workflow`'s KR coverage and stale-link checks) and re-point stale links, reporting each. Otherwise an Objective can have nothing rolling up to it while the tree and roadmap both look busy.

Handoff to `ost-workflow`:
> "KR [id] is [at risk / off track]. Connected Desired Outcome: '[statement]'. Review the OST for this outcome and set which opportunities get attention to move the KR before cycle end."

Handoff to `experiment-workflow`:
> "KR [id] target is [target]; current is [value]. Identify the riskiest assumption about moving this metric and design a test."

---

## References

- [Full Playbook — OKR Layer](../../Agentic%20PM%20Playbook.md)
- [OST Workflow](../ost-workflow/SKILL.md)
- [Investment Gate](../investment-gate/SKILL.md)
- [PM Setup](../pm-setup/SKILL.md)
