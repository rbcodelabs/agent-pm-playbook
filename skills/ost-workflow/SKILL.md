---
name: ost-workflow
description: >-
  Build, review, and maintain Opportunity Solution Trees — use when the user is
  actively constructing an OST from scratch, adding to an existing tree, running
  a health check, or prioritizing which opportunity to pursue next.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - OST
    - opportunity solution tree
    - opportunity tree
    - solution tree
    - tree review
    - tree health
  intents:
    - build an OST
    - review my opportunity solution tree
    - check my tree health
    - add opportunities to my tree
    - prioritize within my OST
    - help me structure opportunities and solutions
    - validate my opportunity
    - my tree needs work
  entities:
    - opportunity solution tree
    - OST
    - desired outcome
    - opportunity layer
    - solution layer
    - experiment layer
    - tree health
    - opportunity framing
chainTo:
  - pattern: "interview|transcript|signal|feedback|research|survey"
    targetSkill: pm-signal-synthesis
    message: Switching to signal synthesis to process research before updating the tree
  - pattern: "coach|playbook|philosophy|how should I|what should I|strategy"
    targetSkill: agentic-pm
    message: Switching to PM coaching for broader strategic guidance
---

# OST Workflow

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Framing the outcome, adding or restructuring branches, writing solution candidates, choosing a focus branch, and changing statuses are all reversible: do them and say what changed. Only archiving or killing a branch that has work behind it needs a human first; prepare that as one recommendation and keep working. When context is missing, infer, state the assumption in one line, and continue.

## Provider Preflight

Read `pm-config.md` and resolve the `ost` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. For legacy configs, state the inferred mapping and proceed. With no config, work from the conversation and repository, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow` and persist the desired outcome, opportunities, solutions, and assumptions inline.

The methodology below is provider-neutral. Markdown file language applies to the Markdown/Obsidian adapter only; otherwise use native objects and stable IDs while preserving the hierarchy.

## OST Structure

```
Desired Outcome (exactly 1)
  └── Opportunity (N) — unmet customer needs, pain points, desires
        └── Solution (N) — ways to address the opportunity
              └── Experiment (N) — how to validate a solution's key assumption
```

- One tree = one desired outcome. Multiple outcomes = multiple trees.
- Opportunities are customer-centric, not company-centric. Reframe solutions that appear at the opportunity layer.
- Every experiment tests a specific assumption within a specific solution.

## Building an OST from Scratch

### Step 1 — Define the Desired Outcome
Take it from the OKRs, config, or conversation: the change in customer behavior that drives the business outcome. If none is stated, infer one and say so.

Good: "Increase the percentage of new users who complete their first meaningful action within 7 days"
Poor: "Launch onboarding v2 by Q3" — output, not outcome

If the outcome is output-framed, reframe it yourself and note the reframe; everything downstream inherits the root.

### Step 2 — Map Opportunities
For each relevant segment: what prevents them from reaching the outcome, what do they struggle with, what workarounds do they use? Format each as "Customers struggle to [X] when [context]" or "Customers need [X] but currently [workaround/gap]". Single-source or weak evidence still becomes an opportunity, tagged `weak`.

### Step 3 — Cluster and Organize
Group related opportunities into sub-trees, merge duplicates with a one-line rationale, and reframe any solution in disguise.

### Step 4 — Choose the Focus Branch
Pick the branch with the strongest evidence, the most direct link to the outcome, and the right risk/effort profile now. Record the choice and why. Flag it if the team is working several branches at once.

### Step 5 — Generate Solutions
For the focus opportunity, write at least 3 meaningfully different directions, incremental to transformative, each stating how it addresses the parent. Then pick the lead candidate to test and give the reason. Writing and selecting candidates are reversible; roadmap admission follows `roadmap-workflow`.

### Step 6 — Design Experiments
Name the riskiest assumption, design the minimum test that could falsify it, and define success and failure criteria before running anything. Hand off to `experiment-workflow`.

## Tree Health Checks

Run these on any review, then fix what you can in the same pass:

| Check | Red flag | Your action |
|---|---|---|
| Outcome clarity | Output-framed, vague, or unmeasurable root | Reframe it |
| Opportunity framing | Sounds like a solution or company goal | Reframe it |
| Coverage | Fewer than 5 distinct opportunities | Add candidates from available evidence, tagged by confidence |
| Evidence | Most opportunities lack citations | Tag them `weak`; name what would strengthen them |
| Focus | 3+ branches actively explored | Recommend one focus branch |
| Experiment velocity | No experiments closed in 2 weeks | Draft a test for the focus branch |
| Dead ideas | Abandoned solutions still shown active | Recommend archiving (human confirms) |
| Solution coverage | Any active/prioritized opportunity with **zero** solutions | Generate candidates per Step 5 now |
| Solution breadth | Only one solution ever considered | Add alternatives |
| Coverage gap age | Zero-solution opportunity or KR-cohort gap older than 1 week | Treat as urgent; close it this run |

A zero-solution opportunity is a dead end with an active label: nothing moves until a candidate exists. Close the gap the run you find it. With 3+ red flags, restructure the tree and report the changes.

## Prioritizing Within the Tree

Score each candidate 1–3 on evidence strength, outcome connection, and now-ability (testable this cycle with available resources). Show the matrix, set the top 1–2 as focus, and give the rationale. State the evidence age and outcome link you assumed.

## Common Mistakes

| Mistake | Correction |
|---|---|
| Solution in the opportunity layer | Reframe as the customer need it addresses |
| Multiple desired outcomes in one tree | Split into separate trees |
| No experiments running | Design a test for the riskiest assumption in the focus branch |
| Tree too wide, no depth | Mark unvalidated opportunities `weak`; deepen the focus branch |
| Stale tree | Note the last customer-evidence date and what would refresh it |
| Deleting dead ideas | Archive with a reason instead; deleted ideas teach nothing |

## References

- [Full Playbook — OST as Operating System](../../Agentic%20PM%20Playbook.md)
- [Tree Health Checks](../../Agent%20Skills/Tree%20Health%20Checks.md)
- [Opportunity Validation](../../Agent%20Skills/Opportunity%20Validation.md)
- [Dead Ideas Tracking](../../Agent%20Skills/Dead%20Ideas%20Tracking.md)
- [Evidence Attribution](../../Agent%20Skills/Evidence%20Attribution.md)
