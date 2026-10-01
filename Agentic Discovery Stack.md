# Agentic Discovery Stack

> The complete Obsidian + Linear replacement for Jira Product Discovery. Built for agentic teams doing continuous discovery without a separate SaaS tool.

**See also:** [[Agentic PM Playbook]] for philosophy and workflows. [[Agentic PM — Agent Capability Framework]] for skill definitions. [The Loop](guides/the-loop.md) for the level definitions, rules, and ID formats this stack implements.

---

## What This Is

This document describes the full agentic-JPD-equivalent system: a set of skills, file structures, and Obsidian Bases views that replicate everything Jira Product Discovery does — and puts goals and discovery in one integrated tree (Loop) rather than a separate OKR layer bolted onto a separate tree.

Every JPD construct has a direct equivalent here. All state lives in Markdown files in your product vault folder, queryable by Obsidian Bases. All workflows are driven by named skills. Nothing requires a separate SaaS subscription. This is the Markdown/Obsidian adapter; other providers map the same five levels to their own objects (see [PM Tool Integration Guide](PM%20Tool%20Integration%20Guide.md)).

---

## The Full Hierarchy

```
OPPORTUNITY  OPP-n  (customer need, pain, or desire with evidence)
└── OUTCOME  OUT-n  (the customer-behavior change we commit to producing)
    └── Key Result  OUT-n-KR-n  (measurable signal: baseline, target, date)
        └── Solution  SOL-n  (candidate way to move the KR; 3+ per KR)
            ├── Test  TST-n  (riskiest-assumption test, kill condition written first)
            └── Roadmap Item  (only after the Solution clears its investment gate)
                └── Linear Issue  (engineering work)
```

Opportunity is the root. Each level has its own skill coverage, file template, and Bases view. Nothing moves to the next level without passing the quality gate at the current one. Every record has exactly one parent.

---

## JPD Equivalence Map

| JPD Construct | Agentic Stack | File Location | Skill |
|---|---|---|---|
| Insights (signals) | Signal Ledger | `product/discovery/Signal Ledger.md` | `pm-signal-synthesis` |
| Ideas / Opportunities | Opportunity files (`OPP-n`) | `product/discovery/opportunities/` | `loop-workflow` |
| Goals | Outcomes (`OUT-n`, each naming its parent `OPP-n`) with their Key Results (`OUT-n-KR-n`), recorded in the cycle file | `product/okrs/[CYCLE].md` | `loop-workflow` |
| Ideas / Solutions | Solution files (`SOL-n`) | `product/discovery/solutions/` | `loop-workflow` |
| Tests | Test files (`TST-n`) | `product/discovery/tests/` | `experiment-workflow` |
| Delivery Issues | Linear issues | Linear + `product/roadmap/items/` | `roadmap-workflow`, `jira-workflow` |
| Hierarchy view | Tree summary | `product/discovery/tree-summary.md` | `loop-workflow` |
| Board / Kanban | Obsidian Bases | `[Product] Discovery Board.base` | n/a |
| Roadmap view | Roadmap Bases | `[Product] Roadmap.base` | `roadmap-workflow` |

`loop-workflow` covers the whole Loop: tree building and health check, Outcome and KR cycles and check-ins, and closing the loop; `experiment-workflow` covers Test design and results.

---

## The Skill Chain

This is the complete workflow from raw signal to shipped feature. Each arrow is a handoff point where PM judgment is applied (the agent proposes, then acts and reports per the [Autonomy Policy](Autonomy%20Policy.md)).

```
Signal arrives (interview, ticket, NPS, sales call)
  → pm-signal-synthesis
      Cluster into opportunity themes, tag confidence, cite evidence
  → loop-workflow
      Add the Opportunity (OPP-n) as a root of the tree, with evidence and segment
  → loop-workflow
      Define the Outcome (OUT-n) for the focus Opportunity and its 2-3 Key Results (OUT-n-KR-n) for the cycle
  → loop-workflow
      Add 3+ candidate Solutions (SOL-n) under each KR, map riskiest assumptions
  → experiment-workflow
      Design the Test (TST-n) on the riskiest assumption, write success, failure, and kill criteria, run, record result against the KR
  → investment-gate
      Is the evidence strong enough for the Solution to advance (and reach the roadmap)?
  → roadmap-workflow
      Cleared Solution → roadmap item (Now / Next / Later)
  → jira-workflow
      Roadmap item → Linear issue for engineering handoff
```

Calls that weigh most on PM judgment: `investment-gate`, `loop-workflow` (adding new branches), `roadmap-workflow` (committing to Now). The agent makes them, states what it would need to believe, and reports so the PM can overrule; it asks first only before irreversible actions.

---

## Product Folder Structure

Every product gets this folder layout. Run `pm-setup` to scaffold it.

```
product/
  pm-config.md                        # Team config, active Outcome, skill paths
  vision.md                           # Product vision and ICP summary
  icp.md                              # Ideal customer profile
  okrs/
    Q3-2026.md                        # Cycle file (one per cycle): holds the Outcomes and their KRs, each with a parent Opportunity
  discovery/
    tree-summary.md                   # Loop tree narrative (human-readable)
    Signal Ledger.md                  # Signal synthesis sessions log
    opportunities/
      OPP-001-[slug].md               # Opportunity files (the root level)
      OPP-002-[slug].md
    solutions/
      SOL-001-[slug].md               # Solution files; parent: a KR
    tests/
      TST-001-[slug].md               # Test files with success, failure, and kill criteria; parent: a Solution
  roadmap/
    roadmap-summary.md                # Narrative overview of roadmap
    items/
      RD-001-[slug].md                # Roadmap items; parent: a cleared Solution
```

All individual files use consistent frontmatter (`status`, `created`, `updated`, `confidence`, `parent`, etc.) so Obsidian Bases can query across them without any database or external index. The `parent` field holds the single parent ID (`OUT-001` for a KR's outcome, `OUT-001-KR-2` for a Solution, and so on).

---

## Obsidian Bases Views

Create these three `.base` files in the product's vault folder. They give you the equivalent of JPD's board, test tracker, and roadmap view.

### Discovery Board

File: `[Product] Discovery Board.base`

Kanban view over `product/discovery/opportunities/`. Group by `status` field.

Columns: `Exploring` → `Validating` → `Prioritized` → `Active` → `Archived`

Use this as your daily driver for Opportunity work. Every Opportunity in the tree has a card here. The card links to the Opportunity file, which links to its Outcomes, and through their Key Results to Solutions and Tests.

### Tests Table

File: `[Product] Tests.base`

Table view over `product/discovery/tests/`. Show columns: `name`, `solution`, `assumption`, `status`, `kill_condition`, `deadline`, `result`.

The `kill_condition` column is the health check. If any Test row has a blank kill condition, it's a zombie. Fix it before it runs.

### Roadmap Board

File: `[Product] Roadmap.base`

Kanban view over `product/roadmap/items/`. Group by `horizon` field.

Columns: `Now` / `Next` / `Later`

Items move to `Now` only after the parent Solution has cleared its investment gate on the strength of a validated Test result. Items in `Later` are directional bets, not commitments.

---

## Getting Started (5 Steps)

**Step 1: Run `pm-setup`**

This scaffolds the product folder, creates `pm-config.md`, and walks you through the initial focus Opportunity.

**Step 2: Seed the tree with Opportunities**

Run `loop-workflow` and add your 3 best existing customer insights as Opportunities (`OPP-n`). These should come from real signals (interviews, tickets, reviews) — not from internal intuition. Each Opportunity needs at least one evidence citation (or a `weak` tag) and a named segment.

**Step 3: Run `loop-workflow` to define your first Outcome and cycle**

Name the cycle file (e.g., `Q3-2026.md`). For the focus Opportunity, write one Outcome (`OUT-n`): a one-sentence customer-behavior change, no numbers. Then define 2-3 Key Results (`OUT-n-KR-n`) with baseline, target, and date. The Outcome's parent is the Opportunity; each KR's parent is the Outcome.

**Step 4: Create your Bases views**

In the product's vault folder, create the three `.base` files described above. Point each one at the correct subfolder. You now have a working discovery board, test tracker, and roadmap.

**Step 5: Run your first weekly discovery cycle**

- Customer touchpoint (interview or async review)
- Run `pm-signal-synthesis` on the transcript or signal batch
- Add new Opportunities to the tree via `loop-workflow`
- Add Solutions under any KR with fewer than 3 candidates
- Check active Tests via `experiment-workflow` and log results up the tree
- Update KR progress via `loop-workflow`

After 4-6 weeks of this rhythm, the tree will start surfacing patterns you didn't know you knew.

---

## Legacy terminology

Earlier versions of this stack used the OKR → OST hierarchy (Objective → Key Result → Desired Outcome → Opportunity → Solution → Experiment) with `EXP-nnn` experiment files and an `ost-summary.md`. Those level names are retired: Objective and Desired Outcome merged into Outcome, Opportunity became the root, Solutions are parented by a KR, and Experiment is now Test. The former `ost-workflow` and `okr-workflow` skills are merged into `loop-workflow`. Existing data can be converted using the mapping in the [Loop guide](guides/the-loop.md#mapping-from-the-legacy-okr--ost-model).
