---
name: ost-workflow
description: >-
  Build, review, and maintain the Loop tree (Opportunity -> Outcome -> KR ->
  Solution -> Test), the playbook's successor to the Opportunity Solution Tree (OST; also called the Loop framework or, formerly, OOKRST)
  — use when the user is constructing the tree from an Opportunity, adding
  Solutions or Tests under a KR, running a tree health check across all five
  levels, checking for orphans and coverage gaps, or prioritizing which branch
  to pursue next.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - the Loop framework
    - Loop tree
    - OST
    - opportunity solution tree
    - opportunity tree
    - solution tree
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
  entities:
    - the Loop framework
    - Opportunity
    - Outcome
    - Key Result
    - Solution
    - Test
    - opportunity solution tree
    - OST
    - desired outcome
    - opportunity layer
    - solution layer
    - experiment layer
    - tree health
    - opportunity framing
    - orphan
    - coverage gap
chainTo:
  - pattern: "interview|transcript|signal|feedback|research|survey"
    targetSkill: pm-signal-synthesis
    message: Switching to signal synthesis to process research before updating the tree
  - pattern: "\\bKR\\b|key result|check-in|cycle|\\bOKR"
    targetSkill: okr-workflow
    message: Switching to the Outcome/KR workflow to manage the cycle, KRs, and check-ins
  - pattern: "\\btest\\b|experiment|assumption|kill condition"
    targetSkill: experiment-workflow
    message: Switching to the Test workflow to design the cheapest test of this Solution's riskiest assumption
  - pattern: "coach|playbook|philosophy|how should I|what should I|strategy"
    targetSkill: agentic-pm
    message: Switching to PM coaching for broader strategic guidance
---

# Loop Tree Workflow

This is the tree-wide workflow for the integrated hierarchy defined in [the Loop guide](../../guides/the-loop.md) (the source of truth for levels, rules, legacy mapping, and IDs). It replaces the separate Opportunity Solution Tree: the skill keeps its name `ost-workflow` and still answers "OST" requests, but the unit of work is now the five-level tree. Cycle management and check-ins live in `okr-workflow`; Test design lives in `experiment-workflow`.

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Framing an Opportunity, deriving an Outcome and KRs, adding or restructuring branches, writing Solution candidates, designing Tests, choosing a focus branch, and changing statuses are all reversible: do them and say what changed. Only archiving or killing a branch that has work behind it needs a human first; prepare that as one recommendation and keep working. When context is missing, infer, state the assumption in one line, and continue.

## Provider Preflight

Read `pm-config.md` and resolve the `ost` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. For legacy configs, state the inferred mapping and proceed. With no config, work from the conversation and repository, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow` and persist Opportunities, Outcomes, KRs, Solutions, assumptions, and Tests inline.

The methodology below is provider-neutral. Markdown file language applies to the Markdown/Obsidian adapter only; otherwise map each level to the nearest native object, keep stable IDs, and preserve the parent chain. Do not flatten the hierarchy: if a provider cannot represent a level natively, state the interim mapping (label, custom field) and keep going. Where the `ost` and `okrs` capabilities resolve to different providers, the tree still has one authoritative parent chain; name which provider owns each level.

## The Loop

```
Opportunity (N)   — bounded, evidence-backed customer need or market opening
  └── Outcome (1-N)   — customer-behavior change we commit to; qualitative, no numbers
        └── Key Result (2-3 per Outcome)   — measurable signal, baseline, target, date
              └── Solution (>=3 per KR)   — candidate ways to move the KR
                    ├── Test (>=1 per Solution)   — cheapest experiment on one assumption
                    └── Roadmap Item   — only after the Solution clears its investment gate
```

- **One parent each:** Outcome -> Opportunity, KR -> Outcome, Solution -> KR, Test -> Solution. A Solution that serves two KRs is split, or the second KR is a secondary link, never a second parent.
- Opportunities are customer-centric, not company-centric. Reframe Solutions that appear at the Opportunity level.
- Opportunities persist across cycles. Outcomes and KRs belong to a cycle. Solutions and Tests carry over until resolved.
- Every Test tests a specific assumption within a specific Solution and informs the KR above it.
- Signals attach to Opportunities (or to the specific Solution or Test they bear on), never to KRs.

## Building the Tree from an Opportunity

### Step 1 - Frame the Opportunity
Start from a customer need, pain, desire, or market opening with a named segment and cited evidence. Format as "Customers struggle to [X] when [context]" or "Customers need [X] but currently [workaround/gap]". Single-source or weak evidence still becomes an Opportunity, tagged `weak`. Reframe any Solution in disguise as the need it addresses. If the user starts from a goal rather than a need, find or create the Opportunity beneath it; do not start the tree at an Outcome with nothing behind it.

### Step 2 - Cluster and Organize
Group related Opportunities, merge duplicates with a one-line rationale, and note which ones share a segment.

### Step 3 - Derive the Outcome
For the Opportunity you are pursuing, state the customer-behavior change that capturing it requires: one sentence, behavior-framed, no numbers, no deliverables. Take it from the cycle, config, or conversation when one exists; otherwise infer and say so. If an existing Outcome already covers it, attach the Opportunity there instead of creating a duplicate. One Opportunity may justify several Outcomes (different segments or horizons).

Good: "More new users complete a meaningful action in their first week"
Poor: "Launch onboarding v2 by Q3" - an output, not an Outcome. Reframe it yourself and note the reframe; everything downstream inherits it.

### Step 4 - Derive the KRs
Write 2-3 KRs per Outcome, each with baseline, target, and date (hand details and cycle placement to `okr-workflow`). KRs measure outcomes, not output. If no baseline exists, record `TBD` plus a task to measure it.

### Step 5 - Choose the Focus Branch
Across Opportunities, pick the one with the strongest evidence, the most direct link to an active KR, and the right risk/effort profile now. Record the choice and why. Flag it if the team is working several branches at once.

### Step 6 - Generate Solutions per KR
For each KR in the focus branch, write at least 3 meaningfully different Solutions, incremental to transformative. Each states its parent KR, how it addresses the Opportunity, and its assumptions, with the riskiest named. Then pick the lead candidate to test and give the reason. Writing and selecting candidates are reversible; roadmap admission follows `roadmap-workflow` after the investment gate.

### Step 7 - Design Tests
For the lead Solution, name the riskiest assumption, design the minimum Test that could falsify it, and define success and failure criteria before running anything. Hand off to `experiment-workflow`.

## Tree Health Checks (all five levels)

Run these on any review, then fix what you can in the same pass. A review that reads only one level is not a tree health check.

| Level | Check | Red flag | Your action |
|---|---|---|---|
| Opportunity | Framing | Sounds like a solution or company goal | Reframe it |
| Opportunity | Evidence | Most Opportunities lack citations | Tag them `weak`; name what would strengthen them |
| Opportunity | Coverage | Fewer than 5 distinct Opportunities in the active area | Add candidates from available evidence, tagged by confidence |
| Opportunity | Freshness | Last customer-evidence date is stale | Note the date and what would refresh it |
| Outcome | Clarity | Output-framed, numeric, vague, or unmeasurable | Reframe it |
| Outcome | Parentage | No parent Opportunity, or more than one | Find or create the parent; record extras as secondary links |
| KR | Quality | Output KR, no baseline, no target or date | Fix per `okr-workflow` quality gate |
| KR | Fan-out | One KR under an Outcome, or 4+ | Add or merge KRs |
| KR | Coverage | KR with **zero** Solutions, or fewer than 3 candidates before selection | Generate candidates per Step 6 now |
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

## Closing the Loop

A Test result is not the end of the chain; it feeds back up the tree and into Opportunities (see [Closing the loop](../../guides/the-loop.md#closing-the-loop)):

- **Failed or inconclusive Test:** reopen or re-score the parent Opportunity, or spawn new Opportunities the result exposed; kill, iterate, or re-test the Solution.
- **Passed Test:** promote the Solution and update the parent KR (chain to `okr-workflow`).
- **Stalled or missed KR:** re-examine the Outcome and its Opportunity before adding more Solutions.
- **New signal at any step:** add it as an Opportunity (or attach it to an existing one), never to a KR.

## Prioritizing Within the Tree

Score each candidate branch 1-3 on evidence strength, KR connection, and now-ability (testable this cycle with available resources). At the Solution level, add risk and effort. Show the matrix, set the top 1-2 as focus, and give the rationale. State the evidence age and KR link you assumed.

## Common Mistakes

| Mistake | Correction |
|---|---|
| Solution at the Opportunity level | Reframe as the customer need it addresses |
| Outcome with numbers or a deliverable | Move numbers to a KR; reframe the deliverable as behavior |
| Solution parented to an Opportunity instead of a KR | Re-parent to the KR it moves; its Opportunity stays reachable by ancestry |
| Signals attached to KRs | Move them to the Opportunity (or the Solution or Test they bear on) |
| No Tests running | Design a Test for the riskiest assumption in the focus branch |
| Tree too wide, no depth | Mark unvalidated Opportunities `weak`; deepen the focus branch |
| Stale tree | Note the last customer-evidence date and what would refresh it |
| Deleting dead ideas | Archive with a reason instead; deleted ideas teach nothing |
| Legacy shape (separate OKR file plus Desired Outcome root plus Experiments) | Convert per `okr-workflow` Workflow 6 |

## References

- [The Loop](../../guides/the-loop.md)
- [Full Playbook - Discovery Tree as Operating System](../../Agentic%20PM%20Playbook.md)
- [Tree Health Checks](../../Agent%20Skills/Tree%20Health%20Checks.md)
- [Opportunity Validation](../../Agent%20Skills/Opportunity%20Validation.md)
- [Dead Ideas Tracking](../../Agent%20Skills/Dead%20Ideas%20Tracking.md)
- [Evidence Attribution](../../Agent%20Skills/Evidence%20Attribution.md)
