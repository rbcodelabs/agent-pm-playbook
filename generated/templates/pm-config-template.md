# PM Config

> [Guide: This file is the single source of truth for how PM agents and skills operate in this product. Every agent reads it at the start of a session. Keep it current — stale config produces stale agent behavior. Run `pm-setup` to regenerate it, or edit directly. Any agent that updates focus (active objective, KR, opportunity) should update this file as part of its output.]

---

## Product

> [Guide: The product name and one-line description. Agents use this for context in synthesis reports, signal ledger entries, and any output they write. Be specific: "Golden Wealth — estate planning and document vault for high-net-worth families" is better than "Golden Wealth."]

- **Product:** [Product name]
- **Description:** [One sentence: what it does and for whom]
- **Team:** [Team name, if applicable]

---

## Notes System

> [Guide: Where PM artifacts live. Agents use these paths to write synthesis reports, OST notes, and signal ledger entries. All paths should be absolute or relative to the repo root. If using Obsidian, use the vault-relative path.]

- **Tool:** Obsidian
- **Vault path:** [Absolute path to vault root, e.g., /Users/yourname/Documents/VaultName]
- **Product folder:** [Vault-relative path, e.g., Products/MyProduct]
- **Synthesis reports:** [Vault-relative path, e.g., Products/MyProduct/discovery/Signal Ledger.md]
- **OST notes:** [Vault-relative path, e.g., Products/MyProduct/discovery/ost-summary.md]
- **Opportunities folder:** [Vault-relative path, e.g., Products/MyProduct/discovery/opportunities]
- **Solutions folder:** [Vault-relative path, e.g., Products/MyProduct/discovery/solutions]
- **Experiments folder:** [Vault-relative path, e.g., Products/MyProduct/discovery/experiments]
- **Roadmap folder:** [Vault-relative path, e.g., Products/MyProduct/roadmap/items]

---

## Issue Tracker

> [Guide: The tool where engineering work is tracked. Agents use this to create and link issues when a solution moves to Building. `workflow_states` should match the exact state names in your tracker — agents use these when updating issue status.]

- **Tool:** [Linear | Jira | GitHub Issues | none]
- **Project / Team:** [Identifier — e.g., Linear team key "GW", Jira project key "HT"]
- **Workflow states:** [e.g., Backlog → In Progress → In Review → Deployed]

---

## Active OKR Cycle

> [Guide: The current cycle file path. Agents read this to know which objectives and KRs are active, where to write check-ins, and how to filter the opportunity and experiment queues. Update this at the start of each new cycle. Only one cycle should be Active at a time.]

- **Cycle:** Q2-2026
- **File:** `product/okrs/Q2-2026.md`
- **Period:** 2026-04-01 to 2026-06-30
- **Status:** Active

---

## Active Focus

> [Guide: The single objective, KR, desired outcome, and opportunity that the team is focused on right now. Agents use this as the default context for synthesis, experiment design, and roadmap updates. Update this when focus shifts — do not list multiple active focuses. If you're pulled in multiple directions, that's a signal to review cycle health.]

- **Active Objective:** OBJ-01 — [Objective title]
- **Active KR:** OBJ-01-KR-1 — [KR description: metric increases from X to Y by date]
- **Current Desired Outcome:** [The desired outcome from ost-summary.md that the active KR serves]
- **Focus Opportunity:** [[OPP-001]] — [Opportunity title]
- **Focus Solution:** [[SOL-001]] — [Solution title, or "None yet — still at opportunity level"]

---

## Discovery Paths

> [Guide: Absolute or repo-relative paths to the discovery artifact folders. Agents use these to list, create, and update opportunity, solution, and experiment files. All three folders must exist before agents start writing files.]

- **OST summary:** `product/discovery/ost-summary.md`
- **Signal Ledger:** `product/discovery/Signal Ledger.md`
- **Opportunities:** `product/discovery/opportunities/`
- **Solutions:** `product/discovery/solutions/`
- **Experiments:** `product/discovery/experiments/`

---

## Roadmap Paths

> [Guide: Where roadmap items live. `roadmap-summary.md` is a human-readable narrative; `items/` holds the individual RM-XXX files that power Obsidian Bases views.]

- **Roadmap summary:** `product/roadmap/roadmap-summary.md`
- **Roadmap items:** `product/roadmap/items/`

---

## OKR Path

> [Guide: All OKR cycle files live here. Naming convention: Q[1-4]-YYYY.md or H[1-2]-YYYY.md. Agents create a new file here at the start of each cycle using the okr-cycle-template.]

- **OKR cycles:** `product/okrs/`

---

## Desired Outcome

> [Guide: This is the root of your Opportunity Solution Tree — the single measurable customer behavior change that all discovery work is pointed at. It should match the root node in ost-summary.md exactly. A good desired outcome names who benefits and what changes: "Increase the percentage of new users who complete their first key action within 7 days from 23% to 45%." If this field is vague or output-framed, update it before doing any OST work.]

[One clear statement of the measurable outcome this product work is driving toward]

---

## Agent Behavior Overrides

> [Guide: Optional section. Use this to customize agent behavior for this product. Examples: suppress certain question types, set default customer segment for synthesis, specify which signal types to weight more heavily. Leave blank if no overrides are needed.]

- [Optional override, e.g., "When synthesizing signals, always tag by customer segment: [Segment A | Segment B | Segment C]"]
- [Optional override, e.g., "Default synthesis report format: bullet summary + OST mapping table"]
