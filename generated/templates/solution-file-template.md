---
id: SOL-1
type: solution
title: "[Solution hypothesis name]"
status: Exploring
parent_kr: OUT-1-KR-1
parent_outcome: OUT-1
parent_opportunity: OPP-1
riskiest_assumption: "[The assumption most likely to be wrong — the one that would kill this solution if false]"
assumption_count: 0
cycle: Q2-2026
created: 2026-04-01
last_updated: 2026-04-01
---

> [Guide: A Solution is the fourth level of the Loop tree (Opportunity -> Outcome -> KR -> Solution -> Test); see `guides/the-loop.md`. It has exactly ONE parent KR (`parent_kr`); `parent_outcome` and `parent_opportunity` are derived from that ancestry and recorded for readability. A Solution that serves two KRs is split, or the second KR is a secondary link. A KR needs at least 3 candidate Solutions before one is selected. `title` names the solution direction, not the feature. "Real-time submission feedback" is better than "Add a status banner." The title should hint at the mechanism without over-specifying the implementation — solutions at this stage are hypotheses, not specs.]

> [Guide: `status` lifecycle: Exploring (idea, no validation) → Testing (a Test is running) → Validated (a Test confirmed the riskiest assumption) → Building (in delivery) → Shipped (live) → Killed (assumption failed or opportunity deprioritized). Solutions in Killed status are never deleted — they teach the team what doesn't work.]

> [Guide: `riskiest_assumption` is the single belief that, if wrong, would make this entire solution worthless. Identifying this upfront determines what to test first. If you have 5 risky assumptions and can't pick one, you're not ready to commit to this solution yet.]

# SOL-1: [Title]

**Status:** Exploring
**Parent KR:** OUT-1-KR-1 — [KR target statement]
**Outcome:** [[OUT-1]]
**Opportunity:** [[OPP-1]]
**Cycle:** [[Q2-2026]]
**Riskiest assumption:** [paste from frontmatter]

---

## Solution Hypothesis

> [Guide: One clear hypothesis statement in this form: "We believe that [solution] will [outcome] for [customer segment], as evidenced by [leading indicator we will measure]." This is not a feature description — it is a testable prediction. If you can't write the "as evidenced by" part, you don't yet know how to validate this solution.]

"We believe that [solution direction] will [specific change in customer behavior or outcome] for [customer segment], as evidenced by [measurable leading indicator]."

---

## How This Moves the KR and Addresses the Opportunity

> [Guide: Connect explicitly to the parent KR and, through it, the Opportunity. Explain the causal chain: if the customer's struggle is X, and this solution does Y, then the KR should move. Vague connections ("this should help customers") are a red flag that the solution isn't well-grounded in the opportunity.]

**The KR this moves (OUT-1-KR-1):** [Paste the KR target statement]

**The customer struggle (from OPP-1):** [Paste the opportunity framing]

**The mechanism:** [How this solution specifically removes or reduces that struggle]

**Expected customer behavior change:** [What customers will do differently if this solution works]

---

## Assumptions

> [Guide: List every belief this solution depends on. At minimum: one assumption about customer desirability (will they want this?), one about usability (can they use it?), and one about impact (will it move the metric?). Rate risk and impact honestly — the riskiest + highest impact assumption becomes your first Test. Mark the riskiest one with an asterisk.]

| Assumption | Risk Level | Impact if Wrong | Test Approach |
|---|---|---|---|
| [Customers will notice and engage with the new feedback mechanism] * | High | Fatal | fake-door test |
| [Customers understand what "in review" status means without explanation] | Medium | Significant | user-interview |
| [The feedback appears fast enough to feel real-time on slow connections] | Low | Minor | prototype test |

**Riskiest assumption (asterisked above):** [Repeat it here for clarity]

`assumption_count`: update the frontmatter field to match the number of rows above.

---

## Connected Tests

> [Guide: Each row is a TST-n file in `product/discovery/tests/`. A Solution needs at least one Test before it is built. List Tests in chronological order, with what each one tests and what it concluded. Agents append to this list as Tests are created and closed. A Test result updates this Solution's confidence; Solution progress updates the parent KR.]

| Test | Type | Assumption tested | Status | Result |
|---|---|---|---|---|
| [[TST-1]] | fake-door | [Which assumption] | Planned | |
| [[TST-2]] | concierge | [Which assumption] | | |

---

## Kill Condition

> [Guide: Define what would make you abandon this solution. This should be tied to a Test result or a change in the parent KR or Opportunity — not to a business constraint like "if it takes too long to build." Kill conditions set before testing are the clearest sign that a team is running disciplined discovery.]

This solution is killed if:
- TST-1 result falls below the kill threshold (see [[TST-1]] for specifics), OR
- OUT-1-KR-1 is dropped or OPP-1 is retired, OR
- [Other specific condition, e.g., "a competing solution in the same opportunity scores higher on the prioritization matrix"]

---

## Killed

> [Guide: Fill this section in only when status is Killed. Leave blank otherwise. The reason for killing is as valuable as the reason for building — it prevents future teams from re-exploring the same dead end and helps calibrate how well the team identifies risky assumptions upfront.]

**Killed on:** [YYYY-MM-DD]

**Reason:** [Which assumption failed, or which external factor changed]

**What we learned:** [What this means for the parent opportunity — does OPP-1 still stand, or does the kill signal challenge the opportunity itself?]

**Carried forward to:** [Another solution direction, or "Opportunity retired"]
