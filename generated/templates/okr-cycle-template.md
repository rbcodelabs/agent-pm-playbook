---
type: okr-cycle
cycle: Q2-2026
start_date: 2026-04-01
end_date: 2026-06-30
status: Active
---

> [Guide: This is the Outcome and Key Result level of the Loop tree (Opportunity -> Outcome -> KR -> Solution -> Test). Canonical definition: `guides/the-loop.md`. `cycle` uses the format Q[1-4]-YYYY or H[1-2]-YYYY. `status` moves through Draft -> Active -> Closed. Never have more than one Active cycle per product at a time. Opportunities persist across cycles; Outcomes and KRs belong to this cycle.]

# Outcome/KR Cycle: Q2-2026

**Period:** April 1 – June 30, 2026
**Status:** Active

> [Guide: State the single most important thing this cycle must prove. One sentence. If you can't write it, your outcomes aren't aligned yet.]

**Cycle Theme:** [One sentence: the single strategic bet this quarter is making]

---

## Outcomes

> [Guide: Maximum 3 Outcomes per cycle. Each Outcome is the qualitative customer-behavior change that capturing one parent Opportunity requires. No numbers and no outputs ("launch X"); the numbers live in its 2-3 KRs. Every Outcome has exactly one parent Opportunity (`OPP-n`). An Opportunity may have several Outcomes across segments or cycles. If you are tempted to write a 4th Outcome, you don't have focus yet.]

---

### OUT-1: [Outcome title]

> [Guide: A good Outcome sounds like "New users invite a teammate in their first week", not "Improve onboarding" and not "Ship invitations." It describes what customers will do differently.]

**Outcome:** [One sentence: the customer-behavior change we commit to producing]

| Field | Value |
|---|---|
| **ID** | OUT-1 |
| **Parent Opportunity** | [[OPP-1]] — [Opportunity title] |
| **Status** | Active |
| **Health** | On Track |

> [Guide: `Health` is rolled up from the KRs below (rule 6 of the structure guide). Outcome health updates the parent Opportunity's status (pursuing / sustained / retired).]

#### OUT-1-KR-1: [Measurable signal name]

> [Guide: Every KR measures that the Outcome is happening, not that work shipped. Use the form "[Metric] increases/decreases from [baseline] to [goal] by [date]." Wrong: "Ship the onboarding redesign." Right: "7-day activation rate increases from 23% to 38% by June 30." If there is no baseline yet, your first task is to establish one, not to skip writing the KR.]

| Field | Value |
|---|---|
| **ID** | OUT-1-KR-1 |
| **Parent Outcome** | OUT-1 |
| **Target** | [Metric] increases from [current baseline] to [goal] by 2026-06-30 |
| **Current** | [current value] as of [YYYY-MM-DD] |
| **Status** | On Track |
| **Solutions moving this KR** | [[SOL-1]], [[SOL-2]], [[SOL-3]] (at least 3 candidates before one is selected) |
| **Evidence** | [Link or description of the Signal Ledger entry confirming the baseline] |

> [Guide: "Current" must always include a measurement date. Update at every weekly check-in. Attach raw signals to the Opportunity (or the Solution/Test they bear on), never to the KR. A KR with no Solution is a coverage gap.]

**Check-ins**

| Date | Current Value | Status | Notes |
|---|---|---|---|
| [YYYY-MM-DD] | | On Track | |
| [YYYY-MM-DD] | | | |
| [YYYY-MM-DD] | | | |

---

#### OUT-1-KR-2: [Measurable signal name]

| Field | Value |
|---|---|
| **ID** | OUT-1-KR-2 |
| **Parent Outcome** | OUT-1 |
| **Target** | [Metric] increases from [current baseline] to [goal] by 2026-06-30 |
| **Current** | [current value] as of [YYYY-MM-DD] |
| **Status** | On Track |
| **Solutions moving this KR** | [[SOL-4]] |
| **Evidence** | [Link or description of the Signal Ledger entry confirming the baseline] |

**Check-ins**

| Date | Current Value | Status | Notes |
|---|---|---|---|
| [YYYY-MM-DD] | | On Track | |
| [YYYY-MM-DD] | | | |

---

### OUT-2: [Outcome title]

> [Guide: If you only have one strong Outcome this cycle, that is fine. Don't manufacture Outcomes to fill three slots.]

**Outcome:** [One sentence]

| Field | Value |
|---|---|
| **ID** | OUT-2 |
| **Parent Opportunity** | [[OPP-2]] — [Opportunity title] |
| **Status** | Active |
| **Health** | On Track |

#### OUT-2-KR-1: [Measurable signal name]

| Field | Value |
|---|---|
| **ID** | OUT-2-KR-1 |
| **Parent Outcome** | OUT-2 |
| **Target** | [Metric] increases from [current baseline] to [goal] by 2026-06-30 |
| **Current** | [current value] as of [YYYY-MM-DD] |
| **Status** | On Track |
| **Solutions moving this KR** | [[SOL-5]] |
| **Evidence** | [Link or description] |

**Check-ins**

| Date | Current Value | Status | Notes |
|---|---|---|---|
| [YYYY-MM-DD] | | On Track | |
| [YYYY-MM-DD] | | | |

---

## Cycle Health Snapshot

> [Guide: Update at each weekly review. It is a snapshot, not a report. One word status per KR plus a blocker if one exists. At-risk KRs mean work the Solutions and Tests harder, not add roadmap items.]

| KR | Outcome | Status | Blocker |
|---|---|---|---|
| OUT-1-KR-1 | OUT-1 | On Track | |
| OUT-1-KR-2 | OUT-1 | On Track | |
| OUT-2-KR-1 | OUT-2 | On Track | |

**Opportunities pursued this cycle:** [[OPP-1]], [[OPP-2]]

**Solutions in testing:** [[SOL-1]], [[SOL-4]]

**Tests running this cycle:** [Count] — [[TST-1]], [[TST-2]] (see `product/discovery/tests/`)

---

## Retrospective

> [Guide: Fill this in at cycle close, after measuring actuals, before planning the next cycle. A good retro takes 30 minutes and saves 2 weeks of misaligned work next quarter.]

**Actuals vs. targets:**

| KR | Target | Actual | % Achieved |
|---|---|---|---|
| OUT-1-KR-1 | | | |
| OUT-1-KR-2 | | | |
| OUT-2-KR-1 | | | |

**What we achieved:**

**What we missed and why:**

**What we learned about the tree (did Opportunities, Solutions, or Tests change shape?):**

**What carries forward to the next cycle:** [Opportunities persist; unresolved Solutions and Tests carry over; Outcomes and KRs are re-declared]
