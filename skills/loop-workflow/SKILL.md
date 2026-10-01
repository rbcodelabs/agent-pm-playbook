---
name: loop-workflow
description: >-
  Build, run, and maintain the Loop (Opportunity -> Outcome -> KR -> Solution ->
  Test), the playbook's single goal-to-learning hierarchy — use when the user is
  constructing the tree from an Opportunity, adding Solutions under a KR,
  running a tree health check or orphan/coverage check, prioritizing a branch,
  setting up an Outcome and KR cycle, logging a check-in against a Key Result,
  reviewing which KRs are at risk, closing a cycle, feeding Test results back up
  the tree, or converting legacy OKR/OST data. Also the home for requests that
  use the older terms: OKR, OKRs, OST, opportunity solution tree, OOKRST, desired
  outcome, quarterly goals, KR check-in.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - the Loop
    - the Loop framework
    - Loop tree
    - OST
    - opportunity solution tree
    - opportunity tree
    - solution tree
    - OOKRST
    - OKR
    - OKRs
    - outcome
    - outcomes
    - key result
    - KR
    - okr cycle
    - okr check-in
    - okr health
    - kr check-in
    - quarterly goals
    - Q1 OKRs
    - Q2 OKRs
    - Q3 OKRs
    - Q4 OKRs
    - tree review
    - tree health
    - discovery tree
  intents:
    - build the Loop tree
    - build an OST
    - start from an opportunity and derive the outcome and KRs
    - review my opportunity solution tree
    - check my tree health
    - add opportunities to my tree
    - generate solutions for this KR
    - find orphaned solutions or KRs
    - prioritize within my tree
    - help me structure opportunities and solutions
    - validate my opportunity
    - my tree needs work
    - set up OKRs for this quarter
    - create a new OKR cycle
    - set outcomes and key results for this cycle
    - log a check-in for my KR
    - update my key result
    - review OKR health
    - which KRs are at risk
    - my KR is off track
    - connect this KR to discovery
    - connect this outcome to an opportunity
    - convert my OKRs and OST to the Loop
    - archive the OKR cycle
    - are my OKRs outcome-focused
    - what should I work on to move this KR
    - close the loop on this test result
  entities:
    - the Loop
    - Opportunity
    - Outcome
    - Objective
    - Key Result
    - KR
    - Solution
    - Test
    - OKR cycle
    - check-in
    - baseline
    - target
    - OKR health
    - opportunity solution tree
    - OST
    - desired outcome
    - tree health
    - opportunity framing
    - orphan
    - coverage gap
chainTo:
  - pattern: "interview|transcript|signal|feedback|research|survey"
    targetSkill: pm-signal-synthesis
    message: Switching to signal synthesis to process research before updating the tree
  - pattern: "\\btest\\b|experiment|assumption|kill condition|validate"
    targetSkill: experiment-workflow
    message: Switching to the Test workflow to design the cheapest test of this Solution's riskiest assumption
  - pattern: "roadmap|delivery|milestone|when.*ship|what.*build"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow to connect roadmap items to KR progress
  - pattern: "coach|playbook|philosophy|how should I|what should I|strategy"
    targetSkill: agentic-pm
    message: Switching to PM coaching for broader strategic guidance
---

# Loop Workflow

The Loop is the playbook's one hierarchy for going from customer need to learning. This skill is the single workflow for every level except Test design: building and health-checking the tree, setting up Outcome and KR cycles and logging check-ins, closing the loop with Test results, and converting legacy OKR/OST data. [The Loop guide](../../guides/the-loop.md) is the source of truth for levels, rules, legacy mapping, and IDs. Test design and execution live in [`experiment-workflow`](../experiment-workflow/SKILL.md), which owns the Test level.

## Contents

1. [Autonomy](#autonomy) and [Provider Preflight](#provider-preflight)
2. [The Loop](#the-loop) and [Where Things Live](#where-things-live)
3. [Part 1: Build the Tree](#part-1-build-the-tree-from-an-opportunity)
4. [Part 2: Tree Health Checks](#part-2-tree-health-checks-all-five-levels)
5. [Part 3: Outcome and KR Cycle](#part-3-outcome-and-kr-cycle) (create a cycle, log a check-in, KR health review, connect to the tree, quality gate)
6. [Part 4: Closing the Loop](#part-4-closing-the-loop) (feedback up the tree, closing a cycle)
7. [Part 5: Convert Legacy OKR/OST Data](#part-5-convert-legacy-okrost-data-to-the-loop)
8. [Prioritizing](#prioritizing-within-the-tree), [Anti-Patterns](#anti-patterns), [Bridging KRs to Discovery](#bridging-krs-to-discovery)

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Framing an Opportunity, deriving an Outcome and KRs, drafting cycles, logging check-ins, setting KR status, adding or restructuring branches, writing Solution candidates, choosing a focus branch, reframing weak Outcomes or KRs, converting legacy data, closing a finished cycle, and changing statuses are all reversible: do them and say what changed. Only archiving or killing a branch that has work behind it, or deleting a cycle, Outcome, or KR, needs a human first; prepare that as one recommendation and keep working. When context or a value is missing, infer from the config, tracker, analytics, or conversation, state the assumption in one line, and continue.

## Provider Preflight

Read `pm-config.md` and resolve the `loop` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). `loop` covers Opportunities, Outcomes, KRs, cycles, check-ins, Solutions, and assumptions; Tests resolve through `experiments`, which must share the same provider as `loop`. Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. With no config, work from the conversation and repository, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow` and persist Opportunities, Outcomes, KRs, check-ins, Solutions, assumptions, and Tests inline.

The methodology below is provider-neutral. File paths and templates are the Markdown/Obsidian adapter only; otherwise map each level to the nearest native object, keep stable IDs, and preserve the parent chain. Do not flatten the hierarchy: if a provider cannot represent a level natively, state the interim mapping (label, custom field) and keep going. Updating `pm-config.md` updates active references, never a duplicate Outcome or KR body.

## The Loop

```
Opportunity (N)   — bounded, evidence-backed customer need or market opening
  └── Outcome (1-N)   — customer-behavior change we commit to; qualitative, no numbers
        └── Key Result (2-3 per Outcome)   — measurable signal, baseline, target, date
              └── Solution (>=3 per KR)   — candidate ways to move the KR
                    ├── Test (>=1 per Solution)   — cheapest experiment on one assumption
                    └── Roadmap Item   — only after the Solution clears its investment gate
```

- **One parent each:** Outcome -> Opportunity, KR -> Outcome, Solution -> KR, Test -> Solution. A Solution that serves two KRs is split, or the second KR is a secondary link, never a second parent. An Outcome that serves two Opportunities is split, or one link is secondary.
- Every Outcome has 2-3 KRs. An Outcome with no parent Opportunity has no evidence behind it, and a KR with no Solutions has no path to movement; connect both.
- Opportunities are customer-centric, not company-centric. Reframe Solutions that appear at the Opportunity level.
- Opportunities persist across cycles. Outcomes and KRs belong to a cycle. Solutions and Tests carry over until resolved.
- Every Test tests a specific assumption within a specific Solution and informs the KR above it.
- Signals attach to Opportunities (or to the specific Solution or Test they bear on), never to KRs. KRs receive metric readings and rolled-up Solution and Test progress.
- An at-risk KR calls for working its Solutions and Tests harder, not adding roadmap items.
- The Outcome is the legacy OKR Objective and the legacy OST Desired Outcome as one object (see Part 5).

## Where Things Live

With Markdown or Obsidian, cycles live in `product/okrs/[CYCLE].md` (e.g., `product/okrs/Q2-2026.md`); Opportunity, Solution, and Test files live under `product/discovery/`. Other providers own all of these natively. `pm-config.md` names the active cycle and the active KR (its `active_okr_cycle` key). Read it first; if absent, use the most recent cycle and say so.

---

## Part 1: Build the Tree from an Opportunity

### Step 1 - Frame the Opportunity
Start from a customer need, pain, desire, or market opening with a named segment and cited evidence. Format as "Customers struggle to [X] when [context]" or "Customers need [X] but currently [workaround/gap]". Single-source or weak evidence still becomes an Opportunity, tagged `weak`. Reframe any Solution in disguise as the need it addresses. If the user starts from a goal rather than a need, find or create the Opportunity beneath it; do not start the tree at an Outcome with nothing behind it.

### Step 2 - Cluster and Organize
Group related Opportunities, merge duplicates with a one-line rationale, and note which ones share a segment.

### Step 3 - Derive the Outcome
For the Opportunity you are pursuing, state the customer-behavior change that capturing it requires: one sentence, behavior-framed, no numbers, no deliverables. Take it from the cycle, config, or conversation when one exists; otherwise infer and say so. If an existing Outcome already covers it, attach the Opportunity there instead of creating a duplicate. One Opportunity may justify several Outcomes (different segments or horizons).

Good: "More new users complete a meaningful action in their first week"
Poor: "Launch onboarding v2 by Q3" - an output, not an Outcome. Reframe it yourself and note the reframe; everything downstream inherits it.

### Step 4 - Derive the KRs
Write 2-3 KRs per Outcome, each with baseline, target, and date, and place them in the cycle (Part 3). KRs measure outcomes, not output. If no baseline exists, record `TBD` plus a task to measure it.

### Step 5 - Choose the Focus Branch
Across Opportunities, pick the one with the strongest evidence, the most direct link to an active KR, and the right risk/effort profile now. Record the choice and why. Flag it if the team is working several branches at once.

### Step 6 - Generate Solutions per KR
For each KR in the focus branch, write at least 3 meaningfully different Solutions, incremental to transformative. Each states its parent KR, how it addresses the Opportunity, and its assumptions, with the riskiest named. Then pick the lead candidate to test and give the reason. Writing and selecting candidates are reversible; roadmap admission follows `roadmap-workflow` after the investment gate.

### Step 7 - Design Tests
For the lead Solution, name the riskiest assumption, design the minimum Test that could falsify it, and define success and failure criteria before running anything. Hand off to [`experiment-workflow`](../experiment-workflow/SKILL.md).

---

## Part 2: Tree Health Checks (all five levels)

Run these on any review, then fix what you can in the same pass. A review that reads only one level is not a tree health check.

| Level | Check | Red flag | Your action |
|---|---|---|---|
| Opportunity | Framing | Sounds like a solution or company goal | Reframe it |
| Opportunity | Evidence | Most Opportunities lack citations | Tag them `weak`; name what would strengthen them |
| Opportunity | Coverage | Fewer than 5 distinct Opportunities in the active area | Add candidates from available evidence, tagged by confidence |
| Opportunity | Freshness | Last customer-evidence date is stale | Note the date and what would refresh it |
| Outcome | Clarity | Output-framed, numeric, vague, or unmeasurable | Reframe it |
| Outcome | Parentage | No parent Opportunity, or more than one | Find or create the parent; record extras as secondary links |
| KR | Quality | Output KR, no baseline, no target or date | Fix per the Part 3 quality gate |
| KR | Fan-out | One KR under an Outcome, or 4+ | Add or merge KRs |
| KR | Coverage | KR with **zero** Solutions, or fewer than 3 candidates before selection | Generate candidates per Part 1 Step 6 now |
| Solution | Breadth | Only one Solution ever considered for a KR | Add alternatives |
| Solution | Parentage | No parent KR, or serves two KRs | Re-parent or split |
| Solution | Assumptions | No assumptions listed or no riskiest named | Write them |
| Solution | Dead ideas | Abandoned Solutions still shown active | Recommend archiving (human confirms) |
| Test | Coverage | Solution in Validating with no Test; no Test closed in 2 weeks | Draft a Test for the focus branch |
| Test | Tie-back | Test not tied to a Solution assumption or a KR | Attach it or drop it; an untied test is not a Test |
| Tree | Focus | 3+ branches actively explored | Recommend one focus branch |
| Tree | Gap age | Zero-Solution KR or cohort gap older than 1 week | Treat as urgent; close it this run |

### Orphan and coverage checks

- **Orphans:** Outcome with no Opportunity; KR with no Outcome; Solution with no KR; Test with no Solution; Roadmap Item with no cleared Solution. Name each and attach, re-parent, or archive it.
- **Coverage gaps:** KR with no Solutions; Solution with no Test and no clearing gate; Opportunity pursued with no Outcome; active Outcome whose Opportunity has gone stale.
- **Chain integrity:** pick any Roadmap Item and walk up. If you cannot reach an Opportunity, the chain is broken; fix it before anything else.

A zero-Solution KR is a dead end with an active label: nothing moves until a candidate exists. Close the gap the run you find it. With 3+ red flags, restructure the tree and report the changes.

---

## Part 3: Outcome and KR Cycle

The cycle scopes the Outcome and KR levels: which behavior changes we commit to now, how we measure them, and how they are moving.

### Workflow 1: Create a New Cycle

#### Step 1 - Gather inputs

From the conversation, strategy docs, prior cycle, the existing Opportunities, and analytics, collect: cycle identifier, start/end dates, Outcomes (qualitative, one per strategic direction, each tied to a parent Opportunity), 2-3 KRs per Outcome, and each KR's baseline and target. Fill gaps with a stated inference (e.g., calendar quarter dates; baseline from the latest metric reading). If no baseline can be found, record `Baseline: TBD` and add a task to measure it before the first check-in. If an Outcome has no Opportunity to hang under, create a candidate Opportunity from available evidence (tagged `weak`) via Part 1 rather than leaving the Outcome unrooted.

#### Step 2 - Apply the quality gate

Run the Quality Gate below and fix failures yourself: move numbers from Outcomes into KRs, reframe output KRs as outcomes, trim excess Outcomes with a note on what was cut. Report each fix.

#### Step 3 - Scaffold the cycle file

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
**Solutions:** None yet - generate at least 3 (see Part 1, Step 6)
**Active Tests:** None yet
**Evidence this KR is moving:** None yet - cycle just started

#### Check-ins
| Date | Current Value | Status | Notes |
|---|---|---|---|
| [cycle start] | [baseline value] | On Track | Cycle started |
```

Repeat the KR block per KR and the Outcome block per Outcome.

#### Step 4 - Connect each Outcome and KR to the tree

Confirm each Outcome's parent Opportunity exists and each KR has (or is queued for) at least 3 candidate Solutions. If Solutions are missing, generate them (Part 1, Step 6) in the same run. Record the IDs in the KR's `**Solutions:**` line.

#### Step 5 - Update pm-config.md

Add the cycle path and set `active_okr_cycle`. If the previous cycle's end date has passed, close it via Part 4; otherwise leave it and note the overlap.

### Workflow 2: Log a Check-In

#### Step 1 - Identify the KR
Use the KR named in the conversation, else the active KR in `pm-config.md`.

#### Step 2 - Get the data
Take the current value, measurement date, and notes from the conversation or the bound metric. Do not fabricate a missing measurement. Set status yourself from pace (see Workflow 3, Step 2): On Track / At Risk / Off Track.

#### Step 3 - Update the cycle file
1. Update the KR's `**Current:**` line with value and date.
2. Update `**Status:**` if it changed.
3. Add a Check-ins row:
```
| [YYYY-MM-DD] | [current value] | [On Track / At Risk / Off Track] | [brief note] |
```

#### Step 4 - Propagate up the tree
A check-in does not stop at the KR:
1. Fold any Test results and Solution progress logged since the last check-in into the KR's `**Evidence this KR is moving:**` line, naming the Solution (`SOL-n`) and Test (`TST-n`) IDs.
2. Recompute the Outcome's status from its KRs (the worst KR drives it unless the others clearly compensate; say which rule you applied).
3. If every KR under an Outcome is Achieved, or the Outcome has clearly stopped moving, update the parent Opportunity's status (pursuing / sustained / retired) and report it.
4. Close the loop (Part 4): a Test that passed updates the KR; a failed or inconclusive Test that changed what we know about the need goes back to the Opportunity (reopen, re-score, or spawn new ones).

#### Step 5 - Act on risk
If At Risk or Off Track, report the gap to target (absolute and %), cycle elapsed %, whether the trajectory reaches the target, and which Solutions and Tests are in play. If the trajectory misses and no Tests are running, generate Solutions (Part 1) or design a Test ([`experiment-workflow`](../experiment-workflow/SKILL.md)) and start the work. If the KR has stalled or been missed despite Solutions and Tests in play, go back and re-examine the Outcome and its Opportunity (is the behavior change still right, is the KR measuring it?) instead of adding more Solutions. See [Closing the loop](../../guides/the-loop.md#closing-the-loop).

### Workflow 3: KR Health Review

#### Step 1 - Pull the current state
For each KR: baseline, current, target, elapsed vs. remaining time, last check-in date, status.

#### Step 2 - Compute trajectory
- Progress ratio: (current - baseline) / (target - baseline)
- Time ratio: days elapsed / total cycle days
- On pace when progress ratio >= time ratio; otherwise size the gap and whether it can close in time.

#### Step 3 - Check the tree beneath each at-risk KR
- Does the KR have at least 3 candidate Solutions, and are Tests running against the selected ones?
- Does the parent Outcome still trace to a live Opportunity with current evidence?
- **Solution coverage** (check first): a KR with zero Solutions is a coverage gap; a Test needs a Solution to test.
- **Fixed-cohort coverage:** if the KR tracks a fixed set (e.g., "N of M capability groups"), count how many of the M have an owning Solution. A KR stuck at 0/M or low for over a week is a coverage gap, not an effort gap.

Zero Solutions is a coverage urgency and comes before Test velocity. Close it by generating candidates (Part 1, Step 6) in the same run; that is discovery drafting, not a roadmap admission.

#### Step 4 - Deliver the health report

```
## KR Health Review - [CYCLE] - [Date]

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

### Workflow 4: Connect Outcomes and KRs to the Tree

#### Step 1 - Find the parent Opportunity for each Outcome
Read the existing Opportunities. Look for the customer need whose capture requires the behavior change the Outcome describes.

Good match: Outcome "More new users complete a meaningful action in their first week" under Opportunity "New users struggle to see what to do first".
Weak match: the same Outcome under "Grow the user base" - a company goal, not a customer need; it produces discovery that doesn't move the KR.

#### Step 2 - Create or fix it
No match: frame a new Opportunity (Part 1, Step 1) from the Outcome statement and available evidence. Weak match: reframe the Opportunity as a customer need (or reframe the Outcome) and note the change. An Outcome serving two Opportunities is split or one link is recorded as secondary, never a second parent.

#### Step 3 - Attach Solutions to each KR
Each Solution has exactly one parent KR. List the Solution IDs under the KR; a KR with fewer than 3 candidates goes to Part 1, Step 6.

#### Step 4 - Update the cycle file
Set the Outcome's `**Parent Opportunity:**` and each KR's `**Solutions:**` fields.

### Quality Gate for Outcomes and KRs

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

## Part 4: Closing the Loop

A Test result is not the end of the chain; it feeds back up the tree and into Opportunities (see [Closing the loop](../../guides/the-loop.md#closing-the-loop)):

- **Failed or inconclusive Test:** reopen or re-score the parent Opportunity, or spawn new Opportunities the result exposed; kill, iterate, or re-test the Solution.
- **Passed Test:** promote the Solution and update the parent KR (Workflow 2, Step 4).
- **Stalled or missed KR:** re-examine the Outcome and its Opportunity before adding more Solutions.
- **New signal at any step:** add it as an Opportunity (or attach it to an existing one), never to a KR.

### Workflow 5: Close a Cycle

#### Step 1 - Final check-ins
Record a final end-of-cycle value per KR. If a value is unavailable, use the latest reading, mark it `(latest available, [date])`, and continue.

#### Step 2 - Write the cycle summary
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

#### Step 3 - Update frontmatter, tree status, and config
Change `status: Active` to `status: Completed`. Update each parent Opportunity's status (pursuing / sustained / retired) from how its Outcomes ended. Clear or update `active_okr_cycle` in `pm-config.md`, pointing to the next cycle if it exists. Archive retired branches with a reason; do not delete.

---

## Part 5: Convert Legacy OKR/OST Data to the Loop

Use when a workspace still holds the legacy OKR -> OST shape (Objectives with KRs, separate OST roots called Desired Outcomes, Experiments). Follow the mapping in [the Loop guide](../../guides/the-loop.md) deliberately, and preserve existing IDs and links as aliases so history stays traceable.

1. **Inventory.** List Objectives, KRs, Desired Outcomes, Opportunities, Solutions, and Experiments with their current parents.
2. **Merge Objective and Desired Outcome.** Each legacy Desired Outcome (the OST root, linked to a KR) and the Objective above that KR become one Outcome. Where several Objectives share one Desired Outcome or the reverse, keep one Outcome per distinct behavior change and record the merge rationale in one line.
3. **Re-root Opportunities.** Each Opportunity that sat under a Desired Outcome becomes a candidate Opportunity parent of that Outcome. Merge duplicates with a one-line rationale; where one Outcome now has several Opportunities, either keep the most evidenced as parent and record the rest as secondary links, or split into more than one Outcome per the fan-out rule.
4. **Re-parent Solutions** to the KR the Opportunity most directly moves, keeping the Opportunity reachable through ancestry. A Solution that moves two KRs is split or given a secondary link.
5. **Rename Experiments to Tests**, keeping each tied to its Solution's assumption and informing KR.
6. **Re-key IDs** to the Loop scheme (`OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`), keeping legacy IDs (`OBJ-0N`, `EXP-NNN`) in an `aliases` or `legacy_id` field.
7. **Run the tree health check** (Part 2) and report orphans and coverage gaps the conversion exposed.

Report the old-to-new mapping table. Conversion is reversible while legacy records still exist; do not delete them in the same run.

---

## Prioritizing Within the Tree

Score each candidate branch 1-3 on evidence strength, KR connection, and now-ability (testable this cycle with available resources). At the Solution level, add risk and effort. Show the matrix, set the top 1-2 as focus, and give the rationale. State the evidence age and KR link you assumed.

## Anti-Patterns

Name these plainly and fix them:

| Anti-pattern | Fix |
|---|---|
| Solution at the Opportunity level | Reframe as the customer need it addresses |
| Outcome with numbers or a deliverable | Move numbers to a KR; reframe the deliverable as behavior |
| Output KR ("Launch X by Y") | Reframe as the customer behavior change expected after launch |
| Outcome with no parent Opportunity | Find or create the Opportunity (Workflow 4) |
| Outcome inflation (4+) | Keep the 3 with the clearest evidence link; list what was cut |
| Missing baseline | Pull one from analytics, or mark TBD with a measurement task |
| Vanity KR (already mostly hit, below trajectory, or measures activity like "run 10 interviews") | Raise the target or replace with an outcome |
| KR driven by external factors | Name the dependency; propose a KR the team can influence |
| KR with zero Solution coverage | Generate candidate Solutions now; it can sit silently at baseline for weeks otherwise. Check every check-in and review |
| Solution parented to an Opportunity instead of a KR | Re-parent to the KR it moves; its Opportunity stays reachable by ancestry |
| Signals attached to KRs | Move them to the Opportunity (or the Solution or Test they bear on) |
| Roadmap work added for an at-risk KR with no Solution or Test behind it | Route it back through the Solution and its investment gate |
| No Tests running | Design a Test for the riskiest assumption in the focus branch |
| Tree too wide, no depth | Mark unvalidated Opportunities `weak`; deepen the focus branch |
| Stale tree | Note the last customer-evidence date and what would refresh it |
| Deleting dead ideas | Archive with a reason instead; deleted ideas teach nothing |
| Legacy shape (separate OKR file plus Desired Outcome root plus Experiments) | Convert per Part 5 |

## Bridging KRs to Discovery

For an at-risk KR, work its Solutions and Tests rather than adding roadmap items:

1. Is the parent Opportunity current? Does new signal update it?
2. Does the KR have at least 3 candidate Solutions? If not, generate candidates now.
3. Are Tests running on the selected Solution's riskiest assumption? If not, start one.
4. Is effort on the highest-priority branch, or spread thin?

**Check the reverse direction too.** Roadmap items can point at a stale KR, typically after a mid-cycle KR was created and `NOW`/`NEXT` items were never re-pointed. Cross-reference `okr_krs` on active roadmap items against the current cycle (see `roadmap-workflow`'s KR coverage and stale-link checks) and re-point stale links, reporting each. Otherwise an Outcome can have nothing rolling up to it while the tree and roadmap both look busy.

Handoff to `experiment-workflow`:
> "KR [id] target is [target]; current is [value]. For Solution [id], identify the riskiest assumption about moving this metric and design a Test."

## References

- [The Loop](../../guides/the-loop.md)
- [Full Playbook - Discovery Tree as Operating System](../../Agentic%20PM%20Playbook.md)
- [Test Workflow](../experiment-workflow/SKILL.md)
- [Tree Health Checks](../../Agent%20Skills/Tree%20Health%20Checks.md)
- [Opportunity Validation](../../Agent%20Skills/Opportunity%20Validation.md)
- [Dead Ideas Tracking](../../Agent%20Skills/Dead%20Ideas%20Tracking.md)
- [Evidence Attribution](../../Agent%20Skills/Evidence%20Attribution.md)
- [Investment Gate](../investment-gate/SKILL.md)
- [PM Setup](../pm-setup/SKILL.md)
