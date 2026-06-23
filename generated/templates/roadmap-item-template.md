---
id: RM-001
type: roadmap-item
title: "[Initiative name]"
status: Now
phase: Delivery
parent_solution: SOL-001
parent_opportunity: OPP-001
okr_krs:
  - OBJ-01-KR-1
  - OBJ-01-KR-2
target_date: 2026-06-30
shipped_date: ""
linear_url: ""
created: 2026-04-01
last_updated: 2026-04-01
---

> [Guide: `status` values: Now (current sprint/cycle focus) | Next (committed for the next cycle) | Later (on the horizon, not committed) | Shipped | Killed. Roadmap items should never be in Now status without a connected validated solution. If SOL-XXX is still Exploring, the roadmap item should be Later at most.]

> [Guide: `phase` distinguishes the nature of the work: Discovery (validating an opportunity or solution — not building the full thing) | Delivery (building a validated solution) | Infrastructure (technical investment that enables future delivery). This matters for planning: Discovery items should be small and time-boxed; Delivery items should have acceptance criteria; Infrastructure items need a "enables X" justification.]

> [Guide: `okr_krs` is a list of KR IDs from the active OKR cycle. Every roadmap item must connect to at least one KR. If you can't connect a Now item to a KR, either the KR is missing or the item shouldn't be Now.]

# RM-001: [Title]

**Status:** Now
**Phase:** Delivery
**Target date:** 2026-06-30
**OKR cycle:** [[Q2-2026]]

---

## Context

> [Guide: The three-line elevator pitch for this item: what customer problem does it solve, what validated solution is it implementing, and which KR does it move. A new engineer joining the team should be able to read this and understand why this exists without reading any other document.]

**Customer opportunity addressed:** [[OPP-001]] — [Opportunity title]

**Validated solution being built:** [[SOL-001]] — [Solution title]

**Connected KRs:**
- OBJ-01-KR-1: [KR description — paste the target statement]
- OBJ-01-KR-2: [KR description — paste the target statement]

**Why now:** [One sentence explaining the prioritization decision. What validated evidence or business context puts this in Now rather than Next or Later?]

---

## What We're Building

> [Guide: 1-2 paragraphs. Describe the initiative at a level that a designer or engineer can scope it. Avoid implementation specifics — those belong in Linear issues or specs. Focus on what the customer experiences and what changes for them. Link to the Linear project or epic if it exists.]

[Paragraph 1: What the customer experiences today and what changes with this initiative.]

[Paragraph 2: Any important scope boundaries — what is explicitly included and what is out of scope for this initiative. Scope creep at the roadmap level is a sign that the item needs to be split.]

**Linear:** [Link to project or epic, or "Not yet created"]

---

## Acceptance Criteria

> [Guide: These are observable customer or system outcomes, not task checklists. "A user can complete the setup flow in under 2 minutes without asking for help" is an acceptance criterion. "Engineering completes the backend task" is a task. Acceptance criteria define when this item can move to Shipped. Write them before building starts.]

- [ ] [Customer-observable outcome that confirms the initiative is working as intended]
- [ ] [Customer-observable outcome — measurable if possible]
- [ ] [Customer-observable outcome]
- [ ] [Edge case or error state handled correctly]
- [ ] [The KR metric has moved or a leading indicator is confirmed] (verify at ship)

---

## Dependencies

> [Guide: List anything this item depends on that could cause a delay. Be specific: "Depends on EXP-002 closing successfully" is useful; "Depends on engineering" is not. If a dependency is blocking, the item should move from Now to Next until it's resolved.]

| Dependency | Status | Owner | Blocking? |
|---|---|---|---|
| [[EXP-001]] validated | Closed — succeeded | | No |
| [Other roadmap item or external factor] | | | |

---

## Release Notes

> [Guide: Fill this in when the item ships. Write for a non-technical audience — customers or stakeholders who want to understand what changed. Link to the shipped Linear issue and any announcement. Agents use this field to generate changelog entries.]

**Shipped:** [YYYY-MM-DD]

**What changed:** [1-3 sentences in plain language about what customers now experience differently]

**Metrics update:** [First read of the connected KR metric after ship, with date]

**Linear issue:** [Link to closed issue]

---

## Killed

> [Guide: Fill this in only if status moves to Killed. State why clearly — if the parent solution was killed, say so. If the business priority shifted, say so. Future teams will use this context to avoid re-prioritizing the same item without new information.]

**Killed on:** [YYYY-MM-DD]

**Reason:** [Why this item will not be built]
