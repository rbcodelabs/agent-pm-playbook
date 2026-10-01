---
id: TST-1
type: test
title: "[Concise name for what you're testing]"
status: Planned
parent_solution: SOL-1
parent_kr: OUT-1-KR-1
parent_outcome: OUT-1
parent_opportunity: OPP-1
test_type: fake-door
assumption: "[The single assumption this Test is designed to test]"
success_condition: "[Specific measurable outcome that confirms the assumption]"
kill_condition: "[Specific measurable outcome that falsifies the assumption]"
kill_condition_set: false
start_date: ""
end_date: ""
result: ""
next_action: ""
cycle: Q2-2026
created: 2026-04-01
---

> [Guide: A Test is the fifth and lowest level of the Loop tree (Opportunity -> Outcome -> KR -> Solution -> Test); see `guides/the-loop.md`. It has exactly ONE parent Solution (`parent_solution`); the KR, Outcome, and Opportunity are derived from that ancestry and recorded for readability. A Test not tied to a Solution assumption is not a Test. `test_type` must be one of: fake-door | concierge | prototype | ab-test | staged-rollout | user-interview. Pick the type that generates signal fastest with least build cost. `kill_condition_set` must be true before the Test starts — if this is false when status moves to Running, something is wrong. `result` stays blank until the Test closes.]

> [Guide: `assumption` is the single belief most likely to be wrong. "Customers will pay for X" not "We should build X." One assumption per Test. If you have two assumptions, run two Tests. `success_condition` and `kill_condition` are defined before running — never after. They must be measurable, not subjective.]

# TST-1: [Title]

**Test type:** fake-door
**Status:** Planned
**Parent Solution:** [[SOL-1]]
**KR informed:** OUT-1-KR-1
**Outcome:** [[OUT-1]]
**Opportunity:** [[OPP-1]]
**Cycle:** [[Q2-2026]]

---

## Context

> [Guide: 2-4 sentences. What Solution, KR, and Opportunity does this Test sit under? Why is it needed now — what decision is it unblocking? A reader who hasn't seen the tree should understand why this Test exists.]

**The opportunity we're investigating:** [Customer struggle from OPP-1]

**The KR this informs:** [OUT-1-KR-1 target statement]

**The solution hypothesis being tested:** [The solution direction from SOL-1]

**The decision this Test unblocks:** [What we will decide based on this result]

---

## Design

> [Guide: Be specific enough that someone else could run this Test without asking you questions. Vague designs produce ambiguous results. If the design requires engineering, ask whether a faster manual version would answer the same question first.]

**Assumption being tested:**
> [The single belief this Test can falsify. Paste from frontmatter.]

**What we'll do:**
[Step-by-step description of how the Test runs. Include: who the participants are, how they're recruited, what they experience, what we observe, and for how long.]

**Test type rationale:**
[Why this type (fake-door / concierge / prototype / etc.) is the right minimum test for this assumption. What makes it cheaper or faster than the alternatives?]

**Sample / scope:**
- Target participants: [n=X or segment description]
- Duration: [X days / X interviews]
- Channel: [where participants encounter the Test]

---

## Success and Kill Conditions

> [Guide: Both conditions must be defined before the Test starts. "We'll see if people like it" is not a kill condition. Set the bar at a level where the result is actually actionable — if 30% would trigger a decision but 35% wouldn't, you haven't thought this through yet. `kill_condition_set` in frontmatter flips to true when this table is complete.]

| Condition | Definition | Threshold |
|---|---|---|
| **Success** | [What we will observe if the assumption is true] | [Specific number or rate, e.g., ">40% click-through on fake feature"] |
| **Kill** | [What we will observe if the assumption is false] | [Specific number or rate, e.g., "<15% click-through"] |
| **Inconclusive zone** | [What we'll do if results land between success and kill] | [e.g., "Run a follow-up concierge test with 5 users"] |

---

## Results

> [Guide: Fill this in after the Test closes. Record raw observations first, then interpretation. Don't let the interpretation overwrite the data — both must be visible. If results are inconclusive, say so explicitly rather than spinning a story.]

**Status:** [Running / Closed — succeeded / Closed — killed / Closed — inconclusive]

**Run dates:** [YYYY-MM-DD] to [YYYY-MM-DD]

**Raw observations:**
[What actually happened. Numbers, quotes, behaviors — not interpretation yet.]

**Result vs. conditions:**

| Condition | Threshold | Actual | Met? |
|---|---|---|---|
| Success | | | |
| Kill | | | |

**Interpretation:**
[What do these results mean for the assumption? Be honest about what you learned vs. what you hoped to learn.]

---

## Learnings

> [Guide: Learnings are what you carry forward regardless of success or kill. A killed Test is not a failure — it's the fastest way to stop building the wrong thing. Every Test should produce at least one learning that updates the Solution, its parent KR, or the Opportunity. Results are logged against the KR the Test informs.]

**What this confirms or refutes about the opportunity (OPP-n):**

**What this changes about the solution (SOL-n) and its KR (OUT-n-KR-n):**

**Next action:** [One of: run follow-up Test TST-n | advance solution to Building | kill solution SOL-n and archive | update opportunity OPP-n]
