---
name: pm-setup
description: >-
  Configure your PM environment. Run once when adopting the Agentic PM Playbook.
  Asks about your notes system, issue tracker, OKR cycle, and current desired
  outcome, then writes a pm-config.md and scaffolds the full product folder
  structure that all PM agents and skills will use.
retrieval:
  aliases:
    - pm setup
    - configure pm
    - setup playbook
    - pm config
  intents:
    - set up the pm playbook
    - configure my pm environment
    - create pm config
    - I'm new to the playbook
    - update my pm configuration
chainTo:
  - okr-workflow
---

# PM Setup

You are helping the user configure their PM environment for the Agentic PM Playbook. Your job is to ask the right questions, write a `pm-config.md` file, and scaffold the full product folder structure that all PM agents and skills will reference.

## Before You Start

Check if `pm-config.md` already exists in the current directory. If it does, show the user its current values and ask: "Would you like to update any of these, or start fresh?"

## Questions to Ask

Ask one section at a time. Don't present all questions at once.

### 1. Notes System

Ask: "What notes system do you use for PM artifacts?" (e.g. Obsidian, Notion, a plain filesystem folder, etc.)

Then ask where each type of artifact should go:
- Synthesis reports / Signal Ledger
- OST notes
- Opportunities, solutions, and experiments
- Roadmap items

If they say Obsidian or a similar structured system, ask for the vault root path and a product folder (vault-relative path). Derive the sub-paths automatically from those two values. If they say a general filesystem, ask for a base directory and derive sub-paths from that.

### 2. Issue Tracker

Ask: "What tool do you use for issues, epics, or user stories?" (e.g. Linear, Jira, GitHub Issues, none)

If they name a tool, ask:
- Any team or project identifiers to know? (e.g. a Linear team key, a Jira project key)
- What are the workflow states you use? (or confirm defaults like Backlog → In Progress → In Review → Done)

### 3. Product Context

Ask: "What product or project is this configuration for? Give me the product name and one sentence describing what it does and for whom."

### 4. OKR Configuration

Ask: "What OKR cycle are we setting up? (e.g. Q3 2026, H2 2026)"

Derive the cycle ID (e.g. "Q3-2026") and the start/end dates from the user's answer. If they're unsure of dates, use the calendar quarter or half-year as the default.

Then ask: "What is your first Objective for this cycle?" Explain that an Objective is a qualitative ambition -- inspirational but grounded -- not a list of features to ship.

Then ask: "What is your first Key Result for that Objective?" Explain that a good KR measures a customer or business outcome and uses the form "[Metric] increases/decreases from [baseline] to [goal] by [date]." If they don't have a baseline yet, note that and set the current value to "TBD -- measure before committing to this KR."

Then ask: "What is the current desired outcome -- the single measurable customer behavior change that this KR is serving? This becomes the root of your Opportunity Solution Tree."

Help them get specific if they're vague. A good desired outcome names who benefits and what changes: "Increase the percentage of new users who complete their first key action within 7 days from 23% to 45%."

## Scaffolding the Folder Structure

Once you have all answers, create the following folder structure relative to the current directory (or the repo root the user confirms):

```
product/
  okrs/
    [CYCLE].md            # e.g. Q3-2026.md -- from okr-cycle-template
  discovery/
    ost-summary.md        # stub file
    Signal Ledger.md      # stub file
    opportunities/
      .gitkeep
    solutions/
      .gitkeep
    experiments/
      .gitkeep
  roadmap/
    roadmap-summary.md    # stub file
    items/
      .gitkeep
```

### OKR Cycle File

Create `product/okrs/[CYCLE].md` using the structure from `generated/templates/okr-cycle-template.md`. Fill in:
- The cycle ID, period, and dates from the user's answers
- OBJ-01 with the objective title and statement the user provided
- KR-01-1 with the target, current value (or "TBD"), connected desired outcome, and today's date as the measurement date

Remove OBJ-02 and its KRs -- leave only what the user has provided. They can add more objectives using the `okr-workflow` skill.

### ost-summary.md Stub

Create `product/discovery/ost-summary.md` with this content:

```markdown
# Opportunity Solution Tree

**Desired Outcome:** [paste the desired outcome the user provided]

**Connected KR:** OBJ-01-KR-1 -- [KR description]
**Cycle:** [CYCLE]
**OKR file:** `product/okrs/[CYCLE].md`

---

## Opportunities

_No opportunities mapped yet. Use the `ost-workflow` skill to explore and add opportunities._

## Solutions

_No solutions mapped yet._

## Experiments

_No experiments running yet._
```

### Signal Ledger Stub

Create `product/discovery/Signal Ledger.md` with this content:

```markdown
# Signal Ledger

> Signals are evidence: customer interviews, usage data, support themes, sales calls, NPS comments, A/B results. Log them here with a date, source, and OST connection. Agents read this file to synthesize patterns.

| Date | Signal | Source | Type | OST Connection | Strength |
|---|---|---|---|---|---|
| | | | | | |
```

### Roadmap Summary Stub

Create `product/roadmap/roadmap-summary.md` with this content:

```markdown
# Roadmap Summary

**Cycle:** [CYCLE]
**Last updated:** [today's date]

> This is a narrative summary of the current roadmap. Individual items live in `product/roadmap/items/`. Use the `roadmap` skill to add or update items.

_No roadmap items yet._
```

## Writing pm-config.md

After scaffolding, write `pm-config.md` in the current directory using this template. Fill in every field from the user's answers -- do not leave guide text in the output file:

```markdown
# PM Config

> This file is the single source of truth for how PM agents and skills operate in this product. Every agent reads it at the start of a session. Keep it current -- stale config produces stale agent behavior. Run `pm-setup` to regenerate it, or edit directly. Any agent that updates focus (active objective, KR, opportunity) should update this file as part of its output.

---

## Product

- **Product:** [Product name]
- **Description:** [One sentence: what it does and for whom]
- **Team:** [Team name, if applicable, or omit]

---

## Notes System

- **Tool:** [Obsidian | Notion | filesystem | etc.]
- **Vault path:** [Absolute path to vault root, if applicable]
- **Product folder:** [Vault-relative path, e.g., Products/MyProduct]
- **Synthesis reports:** [Path to Signal Ledger.md]
- **OST notes:** [Path to ost-summary.md]
- **Opportunities folder:** [Path to opportunities/]
- **Solutions folder:** [Path to solutions/]
- **Experiments folder:** [Path to experiments/]
- **Roadmap folder:** [Path to roadmap/items/]

---

## Issue Tracker

- **Tool:** [Linear | Jira | GitHub Issues | none]
- **Project / Team:** [Identifier, if applicable]
- **Workflow states:** [e.g., Backlog --> In Progress --> In Review --> Deployed]

---

## Active OKR Cycle

- **Cycle:** [CYCLE, e.g., Q3-2026]
- **File:** `product/okrs/[CYCLE].md`
- **Period:** [start date] to [end date]
- **Status:** Active

---

## Active Focus

- **Active Objective:** OBJ-01 -- [Objective title]
- **Active KR:** OBJ-01-KR-1 -- [KR description: metric from X to Y by date]
- **Current Desired Outcome:** [The desired outcome the user provided]
- **Focus Opportunity:** None yet -- run `ost-workflow` to map opportunities
- **Focus Solution:** None yet

---

## Discovery Paths

- **OST summary:** `product/discovery/ost-summary.md`
- **Signal Ledger:** `product/discovery/Signal Ledger.md`
- **Opportunities:** `product/discovery/opportunities/`
- **Solutions:** `product/discovery/solutions/`
- **Experiments:** `product/discovery/experiments/`

---

## Roadmap Paths

- **Roadmap summary:** `product/roadmap/roadmap-summary.md`
- **Roadmap items:** `product/roadmap/items/`

---

## OKR Path

- **OKR cycles:** `product/okrs/`

---

## Desired Outcome

[The desired outcome the user provided -- exact text]

---

## Agent Behavior Overrides

[Leave blank unless the user specifies overrides]
```

## After Writing

Tell the user:
- Where `pm-config.md` was written
- Which folders were created
- That the OKR cycle file is at `product/okrs/[CYCLE].md` and ready to fill in with baselines and additional KRs
- That all PM agents and skills will now use the config automatically
- That they can run `okr-workflow` to add more objectives or KRs to this cycle
- That they can update `pm-config.md` any time by running this skill again or editing the file directly
