---
id: OPP-1
type: opportunity
title: "Customers struggle to [X] when [Y]"
status: Exploring
confidence: hypothesis
segment: "[Who experiences this]"
child_outcomes:
  - OUT-1
evidence_count: 0
severity: medium
created: 2026-04-01
last_updated: 2026-04-01
---

> [Guide: The Opportunity is the ROOT of the OOKRST tree (Opportunity -> Outcome -> KR -> Solution -> Test); see `guides/ookrst-structure.md`. It has no parent. It persists across cycles and fans out to one or more child Outcomes (`OUT-n`). `title` must be phrased as a customer need or struggle, not a solution. "Customers struggle to understand their plan status during onboarding" is an opportunity. "Add a progress indicator" is a solution — it belongs in a SOL file. If you're tempted to put a feature name here, reframe it first.]

> [Guide: `status` lifecycle: Exploring (just identified, little evidence) → Validating (gathering evidence) → Prioritized (chosen as focus, strong evidence) → Pursuing (an Outcome is active) → Sustained (outcome achieved, monitoring) → Retired (deprioritized or invalidated). Never delete — retire with a reason so the team doesn't re-discover the same dead end.]

> [Guide: `confidence` reflects evidence quality: hypothesis (team intuition only) | low (1-2 weak signals) | medium (3-5 consistent signals from real customers) | high (strong pattern across multiple sources, quantified if possible). Don't promote confidence without new evidence.]

> [Guide: `segment` names who has this need. `child_outcomes` lists the Outcomes (in the cycle file) committed to capturing this Opportunity; one Opportunity may have several (different segments or horizons). `severity`: low (minor inconvenience) | medium (regular friction, workarounds exist) | high (blocks progress) | critical (causes abandonment or churn). Severity must be evidence-backed.]

# OPP-1: [Title]

**Status:** Exploring
**Confidence:** hypothesis
**Severity:** medium
**Segment:** [who]
**Child Outcomes:** OUT-1

---

## Customer Voice Statement

> [Guide: Write this in customer language, not product language. Ideally quote a real customer or paraphrase from interview transcripts. Anyone reading this file should immediately understand what the customer experiences. If you can't write this from real data yet, mark confidence as `hypothesis` until you can.]

"[The opportunity in the customer's own words, or a close paraphrase. Example: 'I never know if I filled out the form right until three days later when I get an error email — by then I've already moved on and have to start over.']"

**Opportunity framing:** Customers struggle to [clearly understand the outcome of their submission] when [they complete the initial setup flow], leading to [re-work and drop-off before the value moment].

---

## Evidence

> [Guide: Evidence attaches here, at the root (and, when specific, to the Solution or Test it bears on) — never to a KR. List each piece with a source and date. Weak evidence (one person said something once) stays at confidence `low`. Strong evidence means multiple independent sources saying similar things. Link to Signal Ledger sessions where this was synthesized, not just raw transcripts.]

| Source | Type | Date | Quote or Summary |
|---|---|---|---|
| [Interview / survey / support ticket / review / analytics] | [Qualitative / Quantitative] | [YYYY-MM-DD] | "[Relevant quote or data point]" |
| | | | |
| | | | |

**Evidence count:** 0 (update `evidence_count` in frontmatter when adding rows)

**Signal Ledger sessions that include this opportunity:**
- [[product/discovery/Signal Ledger]] — [YYYY-MM-DD] session

---

## Child Outcomes

> [Guide: Each Outcome is the customer-behavior change required to capture this Opportunity, written in the cycle file (`OUT-n`) with this Opportunity as its single parent. Outcome health rolls up to this Opportunity's status. If you can't state the Outcome in one behavioral sentence, the Opportunity is not yet bounded enough to pursue.]

| Outcome | Cycle | Health | Key Results |
|---|---|---|---|
| [[OUT-1]] — [Outcome statement] | Q2-2026 | On Track | OUT-1-KR-1, OUT-1-KR-2 |
| | | | |

**How capturing this opportunity connects to the outcome:** [1-2 sentences. Be specific: "If customers understand their submission status immediately, they are less likely to abandon before completing step 2, which drives 7-day activation."]

---

## Solutions Addressing This Opportunity

> [Guide: Solutions are parented by a KR, not by the Opportunity; they reach this Opportunity through their ancestry (KR -> Outcome -> Opportunity). List them here for readability, with the KR each moves. Update as Solutions are created or killed.]

- [[SOL-1]] — [Solution title] — KR: OUT-1-KR-1 — Status: Exploring
- [[SOL-2]] — [Solution title] — KR: OUT-1-KR-1 — Status: Killed

---

## Signal Ledger References

> [Guide: Dates of synthesis sessions where this opportunity was identified, refined, or challenged. Agents update this list after each synthesis run.]

- [YYYY-MM-DD] — [Brief note: "First identified", "Confidence upgraded to medium", "Challenged by contradicting signal from segment X"]

---

## Retirement Note

> [Guide: Fill this in only when status moves to Retired. Future agents and PMs need to understand why this was set aside. "Not enough evidence" and "we decided to focus elsewhere" are valid reasons. Leave blank otherwise.]

**Retired:** [YYYY-MM-DD]
**Reason:** [Why this was retired — invalidated, deprioritized, merged into OPP-n, etc.]
