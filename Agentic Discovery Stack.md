# Agentic Discovery Stack

> The complete Obsidian + Linear replacement for Jira Product Discovery. Built for agentic teams doing continuous discovery without a separate SaaS tool.

**See also:** [[Agentic PM Playbook]] for philosophy and workflows. [[Agentic PM — Agent Capability Framework]] for skill definitions.

---

## What This Is

This document describes the full agentic-JPD-equivalent system: a set of skills, file structures, and Obsidian Bases views that replicate everything Jira Product Discovery does — and adds OKR-layer connective tissue that JPD lacks.

Every JPD construct has a direct equivalent here. All state lives in Markdown files in your product vault folder, queryable by Obsidian Bases. All workflows are driven by named skills. Nothing requires a separate SaaS subscription.

---

## The Full Hierarchy

```
OBJECTIVE  (OKR — why this matters to the business)
└── Key Result  (measurable milestone, owned by the team)
    └── Desired Outcome  (OST root — the product metric the team controls)
        └── Opportunity  (customer need, pain, or desire with evidence)
            ├── Solution A  (hypothesis for addressing the opportunity)
            │   └── Experiment  (riskiest assumption test)
            └── Solution B
                └── Experiment
                    └── Roadmap Item  (validated solution → delivery commitment)
                        └── Linear Issue  (engineering work)
```

Each layer has its own skill, file template, and Bases view. Nothing moves to the next layer without passing the quality gate at the current one.

---

## JPD Equivalence Map

| JPD Construct | Agentic Stack | File Location | Skill |
|---|---|---|---|
| Goals | OKR cycles | `product/okrs/[CYCLE].md` | `okr-workflow` |
| Insights (signals) | Signal Ledger | `product/discovery/Signal Ledger.md` | `pm-signal-synthesis` |
| Ideas / Opportunities | Opportunity files | `product/discovery/opportunities/` | `ost-workflow` |
| Ideas / Solutions | Solution files | `product/discovery/solutions/` | `ost-workflow` |
| Tests / Experiments | Experiment files | `product/discovery/experiments/` | `experiment-workflow` |
| Delivery Issues | Linear issues | Linear + `product/roadmap/items/` | `roadmap-workflow`, `jira-workflow` |
| Hierarchy view | OST summary | `product/discovery/ost-summary.md` | `ost-workflow` |
| Board / Kanban | Obsidian Bases | `[Product] Discovery Board.base` | n/a |
| Roadmap view | Roadmap Bases | `[Product] Roadmap.base` | `roadmap-workflow` |

---

## The Skill Chain

This is the complete workflow from raw signal to shipped feature. Each arrow is a handoff point where PM judgment is required.

```
Signal arrives (interview, ticket, NPS, sales call)
  → pm-signal-synthesis
      Cluster into opportunity themes, tag confidence, cite evidence
  → ost-workflow
      Add opportunity to OST, connect to desired outcome, assign status
  → okr-workflow
      Connect opportunity to the active Key Result it would move
  → investment-gate
      Is evidence strong enough (2+ sources) to explore solutions?
  → ost-workflow
      Add candidate solutions (3 minimum), map riskiest assumptions
  → experiment-workflow
      Design assumption test, set kill condition, run, record result
  → roadmap-workflow
      Validated solution → roadmap item (Now / Next / Later)
  → jira-workflow
      Roadmap item → Linear issue for engineering handoff
```

Skills that require PM judgment before proceeding: `investment-gate`, `ost-workflow` (adding new branches), `roadmap-workflow` (committing to Now). The agent never makes these calls autonomously.

---

## Product Folder Structure

Every product gets this folder layout. Run `pm-setup` to scaffold it.

```
product/
  pm-config.md                        # Team config, desired outcome, skill paths
  vision.md                           # Product vision and ICP summary
  icp.md                              # Ideal customer profile
  okrs/
    Q3-2026.md                        # OKR cycle (one file per cycle)
  discovery/
    ost-summary.md                    # OST tree narrative (human-readable)
    Signal Ledger.md                  # Signal synthesis sessions log
    opportunities/
      OPP-001-[slug].md               # Individual opportunity files
      OPP-002-[slug].md
    solutions/
      SOL-001-[slug].md               # Individual solution files
    experiments/
      EXP-001-[slug].md               # Experiment files with kill conditions
  roadmap/
    roadmap-summary.md                # Narrative overview of roadmap
    items/
      RD-001-[slug].md                # Individual roadmap items
```

All individual files use consistent frontmatter (`status`, `created`, `updated`, `confidence`, etc.) so Obsidian Bases can query across them without any database or external index.

---

## Obsidian Bases Views

Create these three `.base` files in the product's vault folder. They give you the equivalent of JPD's board, experiment tracker, and roadmap view.

### Discovery Board

File: `[Product] Discovery Board.base`

Kanban view over `product/discovery/opportunities/`. Group by `status` field.

Columns: `Exploring` → `Validating` → `Prioritized` → `Active` → `Archived`

Use this as your daily driver for opportunity work. Every opportunity in the OST has a card here. The card links to the opportunity file, which links to its parent solutions and experiments.

### Experiments Table

File: `[Product] Experiments.base`

Table view over `product/discovery/experiments/`. Show columns: `name`, `assumption`, `status`, `kill_condition`, `deadline`, `result`.

The `kill_condition` column is the health check. If any experiment row has a blank kill condition, it's a zombie. Fix it before it runs.

### Roadmap Board

File: `[Product] Roadmap.base`

Kanban view over `product/roadmap/items/`. Group by `horizon` field.

Columns: `Now` / `Next` / `Later`

Items move to `Now` only after the linked experiment shows a validated result. Items in `Later` are directional bets, not commitments.

---

## Getting Started (5 Steps)

**Step 1: Run `pm-setup`**

This scaffolds the product folder, creates `pm-config.md`, and walks you through the initial desired outcome.

**Step 2: Run `okr-workflow` to create your first OKR cycle**

Name the cycle file (e.g., `Q3-2026.md`), write one Objective, and define 2-3 Key Results. Connect the most important KR to a Desired Outcome. That Desired Outcome becomes the root of your OST.

**Step 3: Seed the OST with existing knowledge**

Run `ost-workflow` and add your 3 best existing customer insights as opportunities. These should come from real signals (interviews, tickets, reviews) — not from internal intuition. Each opportunity needs at least one evidence citation before it's valid.

**Step 4: Create your Bases views**

In the product's vault folder, create the three `.base` files described above. Point each one at the correct subfolder. You now have a working discovery board, experiment tracker, and roadmap.

**Step 5: Run your first weekly discovery cycle**

- Customer touchpoint (interview or async review)
- Run `pm-signal-synthesis` on the transcript or signal batch
- Add new opportunities to the OST via `ost-workflow`
- Check active experiments via `experiment-workflow`
- Update KR progress via `okr-workflow`

After 4-6 weeks of this rhythm, the OST will start surfacing patterns you didn't know you knew.
