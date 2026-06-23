---
id: OPP-001
type: opportunity
title: "Customers struggle to [X] when [Y]"
status: Exploring
confidence: hypothesis
okr_cycle: Q2-2026
parent_okr: OBJ-01-KR-1
desired_outcome: "[The desired outcome from ost-summary.md that this opportunity serves]"
parent_opportunity: ""
evidence_count: 0
severity: medium
created: 2026-04-01
last_updated: 2026-04-01
---

> [Guide: `title` must be phrased as a customer need or struggle, not a solution. "Customers struggle to understand their plan status during onboarding" is an opportunity. "Add a progress indicator" is a solution — it belongs in SOL-XXX. If you're tempted to put a feature name here, reframe it first.]

> [Guide: `status` lifecycle: Exploring (just identified, little evidence) → Validating (actively gathering evidence) → Prioritized (chosen as focus, strong evidence) → Active (solutions being built) → Archived (deprioritized or invalidated). Never delete — archive with a reason so the team doesn't re-discover the same dead end.]

> [Guide: `confidence` reflects evidence quality: hypothesis (team intuition only) | low (1-2 weak signals) | medium (3-5 consistent signals from real customers) | high (strong pattern across multiple sources, quantified if possible). Don't promote confidence without new evidence.]

> [Guide: `parent_opportunity` is blank if this is a top-level opportunity. Fill in an OPP-ID if this is a sub-opportunity (a more specific framing of a parent struggle). Sub-opportunities share the parent's desired outcome connection but narrow the scope.]

> [Guide: `severity` reflects how much this struggle impedes the customer: low (minor inconvenience) | medium (regular friction, workarounds exist) | high (blocks progress, significant workarounds) | critical (causes customers to abandon or churn). Severity should be evidence-backed, not assumed.]

# OPP-001: [Title]

**Status:** Exploring
**Confidence:** hypothesis
**Severity:** medium
**OKR cycle:** [[Q2-2026]]
**Connected KR:** OBJ-01-KR-1
**Desired outcome:** [paste from ost-summary.md]

---

## Customer Voice Statement

> [Guide: Write this in customer language, not product language. Ideally quote a real customer or paraphrase from interview transcripts. This is the "front door" of the opportunity — anyone reading this file should immediately understand what the customer experiences. If you can't write this from real data yet, mark confidence as `hypothesis` until you can.]

"[The opportunity in the customer's own words, or a close paraphrase. Example: 'I never know if I filled out the form right until three days later when I get an error email — by then I've already moved on and have to start over.']"

**Opportunity framing:** Customers struggle to [clearly understand the outcome of their submission] when [they complete the initial setup flow], leading to [re-work and drop-off before the value moment].

---

## Evidence

> [Guide: List each piece of evidence with a source and date. Weak evidence (one person said something once) should stay at confidence `low`. Strong evidence means multiple independent sources saying similar things. Link to Signal Ledger sessions where this was synthesized, not just to raw transcripts.]

| Source | Type | Date | Quote or Summary |
|---|---|---|---|
| [Interview / survey / support ticket / review / analytics] | [Qualitative / Quantitative] | [YYYY-MM-DD] | "[Relevant quote or data point]" |
| | | | |
| | | | |

**Evidence count:** 0 (update `evidence_count` in frontmatter when adding rows)

**Signal Ledger sessions that include this opportunity:**
- [[product/discovery/Signal Ledger]] — [YYYY-MM-DD] session

---

## OST Context

> [Guide: Trace the chain from this opportunity up to the desired outcome. A reader should be able to see exactly how solving this moves the needle on the KR. If you can't draw this connection clearly, the opportunity may not belong in this tree.]

**Desired outcome:** [From ost-summary.md — the root of the tree]

**How this opportunity connects:** [1-2 sentences explaining why solving this customer struggle would move the desired outcome metric. Be specific: "If customers understand their submission status immediately, they are less likely to abandon before completing step 2, which directly drives 7-day activation rate."]

**Parent opportunity (if sub-opportunity):** [OPP-XXX title, or "Top-level opportunity"]

**Connected KR:** OBJ-01-KR-1 — [KR description]

---

## Connected Solutions

> [Guide: List solutions being explored or tested for this opportunity. Update this list as solutions are created (SOL-XXX files) or killed. A solution appears here only if its `parent_opportunity` field points to this OPP-ID.]

- [[SOL-001]] — [Solution title] — Status: Exploring
- [[SOL-002]] — [Solution title] — Status: Killed

---

## Signal Ledger References

> [Guide: Dates of synthesis sessions where this opportunity was identified, refined, or challenged. Agents update this list after each synthesis run. Keeps a breadcrumb trail back to the raw evidence even as the Signal Ledger grows.]

- [YYYY-MM-DD] — [Brief note on what the session contributed: "First identified", "Confidence upgraded to medium", "Challenged by contradicting signal from user segment X"]

---

## Archival Note

> [Guide: Fill this in only when status moves to Archived. Future agents and PMs need to understand why this was set aside so they don't spend time re-investigating it. "Not enough evidence" is a valid reason. "We decided to focus elsewhere" is a valid reason. Leave it blank while status is Active.]

**Archived:** [YYYY-MM-DD]
**Reason:** [Why this was archived — invalidated, deprioritized, merged into OPP-XXX, etc.]
