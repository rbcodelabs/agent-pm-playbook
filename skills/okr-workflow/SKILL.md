---
name: okr-workflow
description: >-
  Manage the Outcome and Key Result layer and the cycle of the Loop
  (formerly OOKRST) hierarchy (Opportunity -> Outcome -> KR -> Solution -> Test) — use when the
  user is setting up a new OKR cycle, logging a check-in against a Key Result,
  reviewing OKR health, connecting Outcomes and KRs to their Opportunity and
  Solutions, converting legacy OKR/OST data to the Loop, or archiving a completed
  cycle. Also activates when the user asks whether discovery work is aligned to
  a KR, or wants to know which KRs are at risk.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - OKR
    - OKRs
    - the Loop framework
    - outcome
    - outcomes
    - objective
    - key result
    - KR
    - okr cycle
    - okr check-in
    - okr health
    - okr review
    - kr check-in
    - quarterly goals
    - Q1 OKRs
    - Q2 OKRs
    - Q3 OKRs
    - Q4 OKRs
  intents:
    - set up OKRs for this quarter
    - create a new OKR cycle
    - set outcomes and key results for this cycle
    - log a check-in for my KR
    - update my key result
    - review OKR health
    - which KRs are at risk
    - connect this KR to discovery
    - connect this outcome to an opportunity
    - convert my OKRs and OST to the Loop
    - archive the OKR cycle
    - are my OKRs outcome-focused
    - what should I work on to move this KR
    - my KR is off track
  entities:
    - Outcome
    - Objective
    - Key Result
    - KR
    - OKR cycle
    - the Loop framework
    - Opportunity
    - Solution
    - check-in
    - baseline
    - target
    - OKR health
    - desired outcome
    - OST
chainTo:
  - pattern: "opportunity.*tree|\\bOST\\b|\\bOOKRST\\b|\\bthe loop\\b|\\bloop framework\\b|desired outcome|discovery|opportunity|solution|connect.*KR"
    targetSkill: ost-workflow
    message: Switching to the Loop tree workflow to connect this Outcome and KR to Opportunities and Solutions
  - pattern: "experiment|\\btest\\b|assumption test|validate|test.*KR|what.*could.*move"
    targetSkill: experiment-workflow
    message: Switching to the Test workflow to design tests that could move this KR
  - pattern: "roadmap|delivery|milestone|when.*ship|what.*build"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow to connect roadmap items to KR progress
---

# OKR Workflow — the Outcome and KR Layer of the Loop

The canonical definition of the five levels, structural rules, legacy mapping, and IDs is [the Loop guide](../../guides/the-loop.md). This skill owns the middle of that tree (Outcome and Key Result) and the cycle that scopes them. `ost-workflow` owns the tree-wide workflow; `experiment-workflow` owns Tests.

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Drafting cycles, logging check-ins, setting KR status, linking Outcomes to Opportunities and KRs to Solutions, reframing weak Outcomes or KRs, converting legacy data, and closing a finished cycle are reversible: do them and say what changed. Missing values or context: infer from the config, tracker, analytics, or conversation, state the assumption in one line, and continue. Deleting a cycle, Outcome, or KR needs a human first.

## Provider Preflight

Read `pm-config.md` and resolve the `okrs` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. For legacy configs, state the inferred mapping and proceed. With no config, work from context, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow` and persist Outcomes, KRs, and check-ins inline.

File paths and templates below are the Markdown/Obsidian adapter only. For another provider, apply the same quality gates and lifecycle steps to native objects and IDs, map each level to the nearest native object, and preserve the parent chain; never flatten it. Updating `pm-config.md` updates active references, never a duplicate Outcome or KR body.

An Outcome with no parent Opportunity has no evidence behind it, and a KR with no Solutions has no path to movement; connect both.

---

## The Hierarchy

```
Opportunity   — evidence-backed customer need or market opening
  └── Outcome   — customer-behavior change we commit to (qualitative, no numbers)
        └── Key Result (KR)   — measurable signal, baseline, target, date
              └── Solution   — one of >=3 candidate ways to move the KR
                    ├── Test   — cheapest experiment on the riskiest assumption
                    └── Roadmap Item   — delivery, after the investment gate
```

- Every Outcome has exactly one parent Opportunity and 2-3 KRs; every KR has exactly one parent Outcome.
- Outcomes and KRs belong to a cycle. Opportunities persist across cycles; Solutions and Tests carry over until resolved.
- An at-risk KR calls for working its Solutions and Tests harder, not adding roadmap items.
- The Outcome is the legacy OKR Objective and the legacy OST Desired Outcome as one object. See Workflow 6 for converting old data.

---

## Where Cycles Live

With Markdown or Obsidian, cycles live in `product/okrs/[CYCLE].md` (e.g., `product/okrs/Q2-2026.md`); other providers own cycles natively. `pm-config.md` names the active cycle and the active KR (its `active_okr_cycle` key is unchanged). Read it first; if absent, use the most recent cycle and say so. Opportunity, Solution, and Test files live under `product/discovery/` (see `ost-workflow`).

---

## Workflow 1: Create a New OKR Cycle

### Step 1 - Gather inputs

From the conversation, strategy docs, prior cycle, the existing Opportunities, and analytics, collect: cycle identifier, start/end dates, Outcomes (qualitative, one per strategic direction, each tied to a parent Opportunity), 2-3 KRs per Outcome, and each KR's baseline and target. Fill gaps with a stated inference (e.g., calendar quarter dates; baseline from the latest metric reading). If no baseline can be found, record `Baseline: TBD` and add a task to measure it before the first check-in. If an Outcome has no Opportunity to hang under, create a candidate Opportunity from available evidence (tagged `weak`) via `ost-workflow` rather than leaving the Outcome unrooted.

### Step 2 - Apply the quality gate

Run the Quality Gate below and fix failures yourself: move numbers from Outcomes into KRs, reframe output KRs as outcomes, trim excess Outcomes with a note on what was cut. Report each fix.

### Step 3 - Scaffold the cycle file

Create `product/okrs/[CYCLE].md` using this template exactly:

```markdown
---
type: okr-cycle
cycle: [CYCLE]
start_date: [YYYY-MM-DD]
end_date: [YYYY-MM-DD]
status: Active
---

# Outcomes and Key Results - [CYCLE formatted]

## Outcome [N]: [Qualitative customer-behavior change - no numbers, no deliverables]
**id:** OUT-[N]
**Parent Opportunity:** [[OPP-[NNN] Opportunity name]]
**Why this matters:** [Strategic rationale - one sentence]
**Status:** On Track

### KR [N.N]: [Specific measurable signal statement]
**id:** OUT-[N]-KR-[N]
**Target:** [metric name]: [target value] by [end date]
**Baseline:** [baseline value] (as of [date baseline was measured])
**Current:** [baseline value] (as of [cycle start date])
**Status:** On Track
**Solutions:** None yet - generate at least 3 (see ost-workflow)
**Active Tests:** None yet
**Evidence this KR is moving:** None yet - cycle just started

#### Check-ins
| Date | Current Value | Status | Notes |
|---|---|---|---|
| [cycle start] | [baseline value] | On Track | Cycle started |
```

Repeat the KR block per KR and the Outcome block per Outcome.

### Step 4 - Connect each Outcome and KR to the tree

Confirm each Outcome's parent Opportunity exists and each KR has (or is queued for) at least 3 candidate Solutions. If Solutions are missing, chain to `ost-workflow` to generate them in the same run. Record the IDs in the KR's `**Solutions:**` line.

### Step 5 - Update pm-config.md

Add the cycle path and set `active_okr_cycle`. If the previous cycle's end date has passed, close it via Workflow 5; otherwise leave it and note the overlap.

---

## Workflow 2: Log a Check-In

### Step 1 - Identify the KR
Use the KR named in the conversation, else the active KR in `pm-config.md`.

### Step 2 - Get the data
Take the current value, measurement date, and notes from the conversation or the bound metric. Set status yourself from pace (see Workflow 3, Step 2): On Track / At Risk / Off Track.

### Step 3 - Update the cycle file
1. Update the KR's `**Current:**` line with value and date.
2. Update `**Status:**` if it changed.
3. Add a Check-ins row:
```
| [YYYY-MM-DD] | [current value] | [On Track / At Risk / Off Track] | [brief note] |
```

### Step 4 - Propagate up the tree
A check-in does not stop at the KR:
1. Fold any Test results and Solution progress logged since the last check-in into the KR's `**Evidence this KR is moving:**` line, naming the Solution (`SOL-n`) and Test (`TST-n`) IDs.
2. Recompute the Outcome's status from its KRs (the worst KR drives it unless the others clearly compensate; say which rule you applied).
3. If every KR under an Outcome is Achieved, or the Outcome has clearly stopped moving, update the parent Opportunity's status (pursuing / sustained / retired) and report it.
4. Close the loop: a Test that passed updates the KR; a failed or inconclusive Test that changed what we know about the need goes back to the Opportunity (reopen, re-score, or spawn new ones).

### Step 5 - Act on risk
If At Risk or Off Track, report the gap to target (absolute and %), cycle elapsed %, whether the trajectory reaches the target, and which Solutions and Tests are in play. If the trajectory misses and no Tests are running, chain to `ost-workflow` or `experiment-workflow` and start the work. If the KR has stalled or been missed despite Solutions and Tests in play, go back and re-examine the Outcome and its Opportunity (is the behavior change still right, is the KR measuring it?) instead of adding more Solutions. See [Closing the loop](../../guides/the-loop.md#closing-the-loop).

---

## Workflow 3: OKR Health Review

### Step 1 - Pull the current state
For each KR: baseline, current, target, elapsed vs. remaining time, last check-in date, status.

### Step 2 - Compute trajectory
- Progress ratio: (current - baseline) / (target - baseline)
- Time ratio: days elapsed / total cycle days
- On pace when progress ratio >= time ratio; otherwise size the gap and whether it can close in time.

### Step 3 - Check the tree beneath each at-risk KR
- Does the KR have at least 3 candidate Solutions, and are Tests running against the selected ones?
- Does the parent Outcome still trace to a live Opportunity with current evidence?
- **Solution coverage** (check first): a KR with zero Solutions is a coverage gap; a Test needs a Solution to test.
- **Fixed-cohort coverage:** if the KR tracks a fixed set (e.g., "N of M capability groups"), count how many of the M have an owning Solution. A KR stuck at 0/M or low for over a week is a coverage gap, not an effort gap.

Zero Solutions is a coverage urgency and comes before Test velocity. Close it by generating candidates (`ost-workflow` Step 5) in the same run; that is discovery drafting, not a roadmap admission.

### Step 4 - Deliver the health report

```
## OKR Health Review - [CYCLE] - [Date]

### Summary
[1-3 sentence overall assessment]

### KR Status

| KR | Baseline | Current | Target | Progress | Pace | Status |
|---|---|---|---|---|---|---|
| [id] [short name] | [val] | [val] | [val] | [N]% | On Pace / Behind / Ahead | On Track / At Risk / Off Track |

### At-Risk KRs

**[KR id]: [name]**
- Gap: [current] vs. [target] - [X]% behind pace
- Parent Outcome / Opportunity: [ids - live evidence? yes/no]
- Solutions: [count and IDs; fewer than 3 = coverage gap]
- Active Tests: [yes/no - list if yes]
- Recommended action: [specific]

### Discovery Alignment
[For each KR: do its Solutions and Tests point at it and is work happening? One line each.]

### Recommended Priority
[Which single KR needs the most attention right now, and why]
```

---

## Workflow 4: Connect Outcomes and KRs to the Tree

### Step 1 - Find the parent Opportunity for each Outcome
Read the existing Opportunities. Look for the customer need whose capture requires the behavior change the Outcome describes.

Good match: Outcome "More new users complete a meaningful action in their first week" under Opportunity "New users struggle to see what to do first".
Weak match: the same Outcome under "Grow the user base" - a company goal, not a customer need; it produces discovery that doesn't move the KR.

### Step 2 - Create or fix it
No match: chain to `ost-workflow` with the Outcome statement and a proposed Opportunity. Weak match: reframe the Opportunity as a customer need (or reframe the Outcome) and note the change. An Outcome serving two Opportunities is split or one link is recorded as secondary, never a second parent.

### Step 3 - Attach Solutions to each KR
Each Solution has exactly one parent KR. List the Solution IDs under the KR; a KR with fewer than 3 candidates goes to `ost-workflow` Step 5.

### Step 4 - Update the cycle file
Set the Outcome's `**Parent Opportunity:**` and each KR's `**Solutions:**` fields.

---

## Workflow 5: Close a Cycle

### Step 1 - Final check-ins
Record a final end-of-cycle value per KR. If a value is unavailable, use the latest reading, mark it `(latest available, [date])`, and continue.

### Step 2 - Write the cycle summary
Add a `## Cycle Summary` section after the frontmatter, before Outcome 1:

```markdown
## Cycle Summary - [CYCLE]

**Final status:** Completed | Completed with exceptions | Abandoned
**Overall assessment:** [2-4 sentences: what was achieved, what fell short, key learnings]

### KR Outcomes
| KR | Baseline | Final | Target | Result |
|---|---|---|---|---|
| [id] [name] | [val] | [val] | [val] | Achieved / Missed / Partially Achieved |

### What we learned
- [Key insight from the cycle - about the metrics, the market, or the team's capacity]
- [Repeat as needed]

### What to carry forward
- [KRs to continue or strengthen in the next cycle]
- [Opportunities that proved important and should parent the next cycle's Outcomes]
- [Solutions and Tests still unresolved - they carry over; Outcomes and KRs do not]
```

### Step 3 - Update frontmatter, tree status, and config
Change `status: Active` to `status: Completed`. Update each parent Opportunity's status (pursuing / sustained / retired) from how its Outcomes ended. Clear or update `active_okr_cycle` in `pm-config.md`, pointing to the next cycle if it exists. Archive retired branches with a reason; do not delete.

---

## Workflow 6: Convert Legacy OKR/OST Data to the Loop

Use when a workspace still holds the legacy OKR -> OST shape (Objectives with KRs, separate OST roots called Desired Outcomes, Experiments). Follow the mapping in [the structure guide](../../guides/the-loop.md) deliberately, and preserve existing IDs and links as aliases so history stays traceable.

1. **Inventory.** List Objectives, KRs, Desired Outcomes, Opportunities, Solutions, and Experiments with their current parents.
2. **Merge Objective and Desired Outcome.** Each legacy Desired Outcome (the OST root, linked to a KR) and the Objective above that KR become one Outcome. Where several Objectives share one Desired Outcome or the reverse, keep one Outcome per distinct behavior change and record the merge rationale in one line.
3. **Re-root Opportunities.** Each Opportunity that sat under a Desired Outcome becomes a candidate Opportunity parent of that Outcome. Merge duplicates with a one-line rationale; where one Outcome now has several Opportunities, either keep the most evidenced as parent and record the rest as secondary links, or split into more than one Outcome per the fan-out rule.
4. **Re-parent Solutions** to the KR the Opportunity most directly moves, keeping the Opportunity reachable through ancestry. A Solution that moves two KRs is split or given a secondary link.
5. **Rename Experiments to Tests**, keeping each tied to its Solution's assumption and informing KR.
6. **Re-key IDs** to the Loop scheme (`OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`), keeping legacy IDs (`OBJ-0N`, `EXP-NNN`) in an `aliases` or `legacy_id` field.
7. **Run the tree health check** (`ost-workflow`) and report orphans and coverage gaps the conversion exposed.

Report the old-to-new mapping table. Conversion is reversible while legacy records still exist; do not delete them in the same run.

---

## Quality Gate for Outcomes and KRs

Run before a cycle goes active and fix what fails; defects compound.

| Check | Rule | Failure signal |
|---|---|---|
| Outcome count | At most 3 per cycle | More than 3 = losing focus |
| KR count | 2-3 per Outcome | 1 = thin accountability; 4+ = too complex |
| Total KR count | At most 9 | More won't fit in working memory |
| Outcome framing | Customer-behavior change, qualitative | Contains a number, date, or deliverable |
| KR framing | Measurable outcome, not output | Mentions shipping, launching, building, delivering |
| Baseline present | Every KR has one | Can't track progress |
| Target present | Specific value and date | "Improve", "increase" |
| Opportunity parent | Every Outcome traces to exactly one Opportunity | No evidence behind the commitment |
| Solution coverage | Every KR has >=3 candidate Solutions before any is selected | No discovery direction |

- **Outcomes are qualitative.** "Achieve 80% day-7 retention" becomes Outcome "New users keep coming back after their first week" plus a retention KR.
- **KRs measure outcomes.** If it can be achieved with no change in customer behavior, it's an output. Output: "Ship the onboarding redesign by May 1". Outcome: "Increase new users completing their first meaningful action within 7 days from 34% to 55%".
- **KRs need baselines.** "Increase NPS to 50" means little without knowing it's 32 today.
- **No raw signals on KRs.** Signals attach to Opportunities (see `pm-signal-synthesis`); KRs receive metric readings and rolled-up Solution/Test progress.

---

## Anti-Patterns

Name these plainly and fix them:

| Anti-pattern | Fix |
|---|---|
| Output KR ("Launch X by Y") | Reframe as the customer behavior change expected after launch |
| Outcome with no parent Opportunity | Find or create the Opportunity (Workflow 4) |
| Outcome inflation (4+) | Keep the 3 with the clearest evidence link; list what was cut |
| Missing baseline | Pull one from analytics, or mark TBD with a measurement task |
| Vanity KR (already mostly hit, below trajectory, or measures activity like "run 10 interviews") | Raise the target or replace with an outcome |
| KR driven by external factors | Name the dependency; propose a KR the team can influence |
| KR with zero Solution coverage | Generate candidate Solutions now; it can sit silently at baseline for weeks otherwise. Check every check-in and review |
| Roadmap work added for an at-risk KR with no Solution or Test behind it | Route it back through the Solution and its investment gate |

---

## Bridging KRs to Discovery

For an at-risk KR, work its Solutions and Tests rather than adding roadmap items:

1. Is the parent Opportunity current? Does new signal update it?
2. Does the KR have at least 3 candidate Solutions? If not, generate candidates now.
3. Are Tests running on the selected Solution's riskiest assumption? If not, start one.
4. Is effort on the highest-priority branch, or spread thin?

**Check the reverse direction too.** Roadmap items can point at a stale KR, typically after a mid-cycle KR was created and `NOW`/`NEXT` items were never re-pointed. Cross-reference `okr_krs` on active roadmap items against the current cycle (see `roadmap-workflow`'s KR coverage and stale-link checks) and re-point stale links, reporting each. Otherwise an Outcome can have nothing rolling up to it while the tree and roadmap both look busy.

Handoff to `ost-workflow`:
> "KR [id] is [at risk / off track]. Parent Outcome: '[statement]' under Opportunity [id]. Review the Solutions beneath this KR and set which get Tests to move it before cycle end."

Handoff to `experiment-workflow`:
> "KR [id] target is [target]; current is [value]. For Solution [id], identify the riskiest assumption about moving this metric and design a Test."

---

## References

- [The Loop](../../guides/the-loop.md)
- [Full Playbook - Goals Layer](../../Agentic%20PM%20Playbook.md)
- [Loop Tree Workflow](../ost-workflow/SKILL.md)
- [Investment Gate](../investment-gate/SKILL.md)
- [PM Setup](../pm-setup/SKILL.md)
