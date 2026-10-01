# Discovery Health Metrics

> Diagnostics for your discovery practice and the health of its [Loop tree](guides/the-loop.md) (Opportunity → Outcome → KR → Solution → Test). These metrics answer "is my habit healthy?" not "am I a good PM?"

**Part of:** [[Agentic PM Playbook]]
**Last updated:** 2026-05-15

---

## The Core Framing

These metrics are diagnostic, not evaluative. The goal of continuous discovery is the habit. A PM who runs one solid interview per week for a year learns more than one who does a 40-interview sprint quarterly. The accumulation of consistent signals, tracked in a structured ledger, mapped to Opportunities in a maintained Loop tree, is what makes discovery useful. Optimizing for metric counts rather than the underlying habit is the failure mode to avoid.

Use these metrics to catch when the practice is slipping before it shows up in bad product decisions.

---

## Five Metric Categories

### 1. Cadence: Are you showing up?

Continuous discovery lives or dies on the weekly habit. If synthesis sessions are happening, the rest of the practice tends to hold. If they stop, everything else degrades.

| Metric | Target | Flag threshold |
|---|---|---|
| Synthesis sessions | At least one per week. Any source type counts: interview, support review, NPS, app reviews, sales call. | Missed for 2+ consecutive weeks |
| Signal ledger entries | No gap longer than 2 weeks between dated entries | Gap of 2+ weeks |
| Tree updates | The Loop tree is touched every week, even if just a status update, a Test result, or a confidence revision | Not updated in 2+ consecutive weeks |

**On interview frequency:** Torres's baseline is one customer interview per week. That is a floor, not a quota. One consistent interview per week, maintained over months, builds a richer and more honest picture than sporadic bursts. More is not better beyond the cadence — what matters is the consistency.

---

### 2. Coverage: Are you learning broadly enough?

Consistent synthesis sessions can still produce biased inputs if every session draws from the same segment and the same source type. Coverage metrics catch that narrowing.

| Metric | Target | Flag threshold |
|---|---|---|
| Segment coverage | In any 30-day window, signals from at least 2 distinct customer segments | Single-segment synthesis for 30+ days |
| Source type diversity | In any 30-day window, at least 2 different source types. Interviews alone are not enough. | Single source type for 30+ days |
| Active Opportunity freshness | Every Prioritized or Active Opportunity (one that has an Outcome in the active cycle) should have signals attached from the last 30 days | Any Active Opportunity with no signals in 30+ days |
| Unmapped signal rate | Signals that are still unmapped after 2 weeks should represent less than 30% of new entries | Rate above 30% after 2 weeks |
| Solution coverage | Every KR in the active cycle has at least one non-killed Solution (target: 3+ candidates before one is selected) | **Any** KR with zero Solutions — flag immediately, don't batch it into the next review |
| Coverage gap age | How long a zero-Solution KR or fixed-cohort item has persisted uncovered | Uncovered for more than 1 week |
| Fixed-cohort coverage | For a KR tracking a fixed set of items (e.g., "N of M capability groups"), the fraction of the cohort with at least one owning Solution | Any cohort stuck below its target fraction for more than one review cycle — this is the generalized form of "0/7 for a week and nobody noticed" |

**On unmapped signals:** A high unmapped rate after two weeks usually means one of two things: the tree is missing Opportunities that should exist, or synthesis outputs are not being connected to them. Either is a structural problem worth diagnosing before the next synthesis session.

**On Solution coverage and fixed-cohort coverage:** a metric that measures a fixed cohort
(a capability checklist, a migration target list, anything framed as "N of M") can sit at
0/M indefinitely if no Solutions were ever authored against the KR
that tracks them — not because discovery stalled, but because nobody generated candidates to select
from in the first place. This is silent: the KR just reads "flat," which looks identical
to slow progress instead of blocked progress. Compute cohort coverage directly rather than
inferring it from KR trend lines, and treat a persistent zero as a coverage defect to fix
by generating Solution candidates immediately — that step needs no prioritization sign-off, only
selecting among the candidates does.

---

### 3. Evidence Quality: Are you earning the right to act?

Cadence and coverage tell you whether you are showing up and learning broadly. Evidence quality tells you whether what you have earned the right to act on.

| Metric | Target | Flag threshold |
|---|---|---|
| Confidence floor for action | No Opportunity should move to Prioritized status (and no Outcome should be committed against it) with fewer than 2 independent evidence sources | Any Prioritized Opportunity with a single source |
| Verbatim quote coverage | Every signal cluster in the ledger should have at least 2 verbatim quotes | Clusters with only paraphrase |
| Test coverage | Every Solution that is selected or advancing has at least one Test that is either running or complete, before any Roadmap Item is admitted | Selected Solutions with zero Tests, or Roadmap Items whose Solution has no cleared investment gate |
| Stale Tests | No Test should remain in Running status for more than 4 weeks without a result logged | Any Test running for 4+ weeks without a result |

**On verbatim quotes:** Paraphrase-only clusters are interpretation, not evidence. The PM has already processed the language once before logging it, which introduces bias. Direct quotes are the raw material that an agent or a reviewer can evaluate independently. If a cluster has no verbatims, it cannot be audited.

**On Tests without results:** A Test running for more than four weeks with no result logged is either operating without success and failure criteria or being ignored. Both are problems. A Test with no defined endpoint is a hypothesis being treated like a Solution.

---

### 4. Tree Structure: Is the tree sound?

The five levels only work if the parent chain is intact. These checks run against the tree itself, not the ledger, and they are the "tree health check" the other skills refer to.

| Metric | Target | Flag threshold |
|---|---|---|
| Parent chain | Every Outcome has exactly one parent Opportunity, every KR one Outcome, every Solution one KR, every Test one Solution | Any record with no parent or two parents |
| Outcome fan-out | Each Outcome has 2–3 KRs, each framed as a measured result, not an output | Outcomes with 0–1 KRs, or more than 3 |
| Orphans | No KR without Solutions, no Solution without a Test and no cleared gate, no Test not tied to a Solution assumption | Any orphan, flagged at once |
| Roll-up freshness | Test results have updated their Solution, Solution progress and metric readings their KR, KR movement their Outcome, Outcome health its Opportunity | A KR check-in with no Test or reading behind it, or an Opportunity whose Outcomes changed status without its status changing |
| Evidence direction | Raw signals attached to Opportunities (or the specific Solution or Test they bear on) | Signals attached directly to a KR |
| Roadmap admission | Every Roadmap Item hangs off a Solution that cleared its investment gate | Roadmap Items with no parent Solution, or a Solution that skipped the gate |

**On at-risk KRs:** an at-risk KR is a prompt to work its Solutions and Tests harder, not to add roadmap items.

---

### 5. Honesty Indicators: Are you being rigorous?

Rigorous discovery produces dead ends. If everything in your tree looks viable and nothing has been killed, the practice is not working honestly. These metrics catch confirmation bias at the system level.

| Metric | Target | Watch for |
|---|---|---|
| Kill rate | At least some Solutions killed and some Opportunities archived per quarter | Zero kills and zero archives in 90 days |
| Confidence distribution | Majority of Prioritized or Active Opportunities carry Medium or High confidence | Majority carrying Low confidence |
| Solution count per KR | At least 3 Solutions considered before any are eliminated | Every KR with exactly one Solution |

**On kill rate:** A team that runs continuous discovery for three months and has killed nothing is not discovering; they are confirming. Real discovery surfaces ideas that do not work. Dead ends are expected outputs of a rigorous process. If nothing is being archived, either the tree is not being maintained or the team is not being honest with their evidence.

**On Solution count:** If every KR has exactly one Solution, the team is skipping Solution ideation and committing to the first idea. Three or more Solutions considered before elimination is a minimum bar — not because more is always better, but because a single-Solution KR has no evidence that the chosen path is the best path.

---

## What Not to Track

**Interview count as a quota.** Tracking raw interview counts and optimizing for a higher number is the wrong optimization. It produces more interviews, not better ones. One honest interview per week, maintained consistently, is the target. If interview count is healthy but the ledger has no dated entries and the tree has not changed in three weeks, the interviews are not being used.

---

## Monthly Health Check

Run this prompt monthly against your signal ledger and Loop tree. Paste the relevant inputs and ask for a diagnostic report.

```
Run a discovery health check across these five areas. For each, report status (Healthy / Watch / Flag) and cite specific evidence from the inputs.

1. Cadence: Are there any gaps longer than 2 weeks in the signal ledger? Has the Loop tree been updated in the past week? What is the frequency of synthesis sessions over the past 30 days?

2. Coverage: In the past 30 days, how many distinct customer segments appear in the ledger? How many distinct source types? Are there any Active or Prioritized Opportunities with no signals attached in the past 30 days? Are there any KRs or fixed-cohort items (e.g., "N of M capability groups") with **zero** Solutions, and if so, how long has that gap persisted?

3. Evidence quality: Are there any Prioritized Opportunities with fewer than 2 independent evidence sources? Are there signal clusters with no verbatim quotes? Are there selected or advancing Solutions with no linked Test, or Tests that have been in Running status for more than 4 weeks?

4. Tree structure: Does every Outcome, KR, Solution and Test have exactly one parent? Does each Outcome have 2–3 KRs? Are there orphans (KRs with no Solutions, Solutions with no Test and no cleared gate)? Are any raw signals attached to a KR? Does every Roadmap Item hang off a Solution that cleared its investment gate?

5. Honesty indicators: Has any Solution been killed or any Opportunity archived in the past 90 days? What is the confidence distribution across Active and Prioritized Opportunities? How many Solutions have been considered per KR on average?

For each flag, state what specifically triggered it and what action would resolve it.

Signal ledger (past 90 days): [PASTE]
Current Loop tree (with IDs): [PASTE]
```

---

## Connection to the Signal Ledger

Most of these metrics are only computable if the [[Signal Ledger]] is being maintained with discipline. Without dated, consistently structured entries, cadence and coverage metrics require manual reconstruction from memory. The ledger turns health checking from a subjective impression into a queryable audit.

Specifically:
- **Cadence metrics** require dated entries. No dates, no cadence data.
- **Coverage metrics** require segment and source type fields on every entry. Missing fields make the 30-day coverage check impossible.
- **Evidence quality metrics** require verbatim quotes and Opportunity mapping fields populated on every cluster.
- **Tree structure metrics** are computed from the tree itself, not the ledger, but need stable IDs (`OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`) so parent links can be checked.
- **Honesty metrics** require that killed Solutions and archived Opportunities are logged, not just deleted.

If the health check prompt is returning vague results, the problem is usually ledger schema drift: fields being skipped on some entries, or synthesis outputs not being logged at all. Fix the ledger discipline before trying to diagnose the health metrics.

---

## See Also

[[Signal Ledger]] — the artifact that makes most of these metrics computable.

[[Continuous Feedback Streams]] — the infrastructure that feeds synthesis sessions.

[[Longitudinal Pattern Tracking]] — how trends across the ledger surface Opportunity momentum and staleness.

[[Agentic PM Playbook]] — the full continuous discovery workflow these metrics support.
