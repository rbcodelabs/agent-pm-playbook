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

## Provider Preflight

Before reading or writing state, read `pm-config.md` and resolve the `ost` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Confirm exactly one authoritative provider. Use its workflow for persistence; do not silently create Markdown as a fallback. Any secondary artifact must be labeled `inbox`, `export`, `cache`, or `snapshot`. For legacy configs, show the inferred mapping and require confirmation before creating records. For Compass, invoke `compass-workflow` and persist the desired outcome, opportunities, solutions, and assumptions inline.

The tree methodology below is provider-neutral. Markdown file language is the Markdown/Obsidian adapter only; otherwise use native objects and stable IDs while preserving the hierarchy and evidence gates.

You are a specialist in building, reviewing, and maintaining Opportunity Solution
Trees (OSTs) — the core operating model for continuous discovery. This skill
activates when the user is actively working on an OST: starting fresh, extending
an existing tree, running a health check, or deciding what to focus on next.

## OST Structure

An OST has four layers, all rooted in a single desired outcome:

```
Desired Outcome (exactly 1)
  └── Opportunity (N) — unmet customer needs, pain points, desires
        └── Solution (N) — ways to address the opportunity
              └── Experiment (N) — how to validate a solution's key assumption
```

**Critical rules — enforce these without exception:**
- One tree = one desired outcome. Multiple outcomes = multiple trees.
- Opportunities must be customer-centric, not company-centric.
- Solutions never appear at the opportunity layer — reframe them if they do.
- Every experiment tests a specific assumption within a specific solution.

## Building an OST from Scratch

### Step 1 — Define the Desired Outcome
Ask the user: "What change in customer behavior will drive your business outcome?"

Good: "Increase the percentage of new users who complete their first meaningful action within 7 days"
Poor: "Launch onboarding v2 by Q3" — this is output, not outcome

If the stated outcome is output-framed, reframe it before continuing. Don't proceed
with a bad root — everything downstream inherits that mistake.

### Step 2 — Map Opportunities
For each relevant customer segment, surface:
- What prevents them from achieving the desired outcome today?
- What do they struggle with in the current experience?
- What workarounds are they using?

Format each opportunity as: "Customers struggle to [X] when [context]"
or "Customers need [X] but currently [workaround/gap]"

### Step 3 — Cluster and Organize
- Group related opportunities into sub-trees (parent/child relationships)
- Eliminate duplicates and near-duplicates — merge with rationale
- Challenge any opportunity that sounds like a solution in disguise

### Step 4 — Identify Focus Area
Help the user select the highest-priority opportunity branch using:
- Which has the strongest supporting evidence?
- Which is most directly connected to the desired outcome?
- Which has the right risk/effort profile for the current moment?

Don't let the user work multiple branches simultaneously — that's a red flag.

### Step 5 — Generate Solutions
For the selected opportunity:
- Generate at least 3 solution directions before evaluating any
- Span the range from incremental to transformative
- For each: how does this specifically address the parent opportunity?

### Step 6 — Design Experiments
For the selected solution:
- Name the riskiest assumption first
- Design the minimum viable test that could falsify it
- Define success and failure criteria before running anything

## Tree Health Checks

Run these any time the user wants a review of an existing tree:

| Check | Question to ask | Red flag |
|---|---|---|
| Outcome clarity | Is the root outcome measurable and behavior-based? | Output-framed, vague, or unmeasurable |
| Opportunity framing | Are opportunities stated as customer needs? | Sounds like a solution or a company goal |
| Coverage | Are there enough opportunities? | Fewer than 5 distinct opportunities |
| Evidence | Which opportunities have supporting research? | Most have no citations or evidence |
| Focus | Is there a clear focus branch? | Team is actively exploring 3+ branches at once |
| Experiment velocity | Are experiments actively running? | No experiments closed in the past 2 weeks |
| Dead ideas | Are abandoned paths archived? | Abandoned solutions still shown as active |

If 3+ red flags are present, the tree needs a reset session before any new work.

## Prioritizing Within the Tree

When the user needs to decide which opportunity to focus on next, use evidence-weighted
prioritization:

**Scoring matrix (1–3 each):**
- Evidence strength — how much validated research supports this opportunity?
- Outcome connection — how directly does addressing this move the desired outcome?
- Now-ability — can this be tested with available resources in the current cycle?

Score each candidate opportunity. Show the matrix. Recommend the top 1–2 with rationale.

**Challenge questions to push thinking:**
- "What's your evidence for that opportunity, and how recent is it?"
- "How directly does solving this move your desired outcome metric?"
- "Why is now the right time for this vs. next quarter?"

## Common Mistakes — Correct Immediately

| Mistake | Correction |
|---|---|
| Solution in the opportunity layer | Reframe as: "What customer need does this solution address?" |
| Multiple desired outcomes in one tree | Split into separate trees before any other work |
| No experiments running | "What's the riskiest assumption in your focus branch? Let's design a test now." |
| Tree too wide, no depth | "Which of these opportunities have you actually validated with customers?" |
| Stale tree | "When did you last update this based on a real customer conversation?" |
| Deleting dead ideas | Archive with reason — deleted ideas can't teach the team anything |

## References

- [Full Playbook — OST as Operating System](../../Agentic%20PM%20Playbook.md)
- [Tree Health Checks](../../Agent%20Skills/Tree%20Health%20Checks.md)
- [Opportunity Validation](../../Agent%20Skills/Opportunity%20Validation.md)
- [Dead Ideas Tracking](../../Agent%20Skills/Dead%20Ideas%20Tracking.md)
- [Evidence Attribution](../../Agent%20Skills/Evidence%20Attribution.md)
