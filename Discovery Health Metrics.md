# Discovery Health Metrics

> Diagnostics for your discovery practice. These metrics answer "is my habit healthy?" not "am I a good PM?"

**Part of:** [[Agentic PM Playbook]]
**Last updated:** 2026-05-15

---

## The Core Framing

These metrics are diagnostic, not evaluative. The goal of continuous discovery is the habit. A PM who runs one solid interview per week for a year learns more than one who does a 40-interview sprint quarterly. The accumulation of consistent signals, tracked in a structured ledger, mapped to a maintained OST, is what makes discovery useful. Optimizing for metric counts rather than the underlying habit is the failure mode to avoid.

Use these metrics to catch when the practice is slipping before it shows up in bad product decisions.

---

## Four Metric Categories

### 1. Cadence: Are you showing up?

Continuous discovery lives or dies on the weekly habit. If synthesis sessions are happening, the rest of the practice tends to hold. If they stop, everything else degrades.

| Metric | Target | Flag threshold |
|---|---|---|
| Synthesis sessions | At least one per week. Any source type counts: interview, support review, NPS, app reviews, sales call. | Missed for 2+ consecutive weeks |
| Signal ledger entries | No gap longer than 2 weeks between dated entries | Gap of 2+ weeks |
| OST updates | Touched every week, even if just a status update or confidence revision | Not updated in 2+ consecutive weeks |

**On interview frequency:** Torres's baseline is one customer interview per week. That is a floor, not a quota. One consistent interview per week, maintained over months, builds a richer and more honest picture than sporadic bursts. More is not better beyond the cadence — what matters is the consistency.

---

### 2. Coverage: Are you learning broadly enough?

Consistent synthesis sessions can still produce biased inputs if every session draws from the same segment and the same source type. Coverage metrics catch that narrowing.

| Metric | Target | Flag threshold |
|---|---|---|
| Segment coverage | In any 30-day window, signals from at least 2 distinct customer segments | Single-segment synthesis for 30+ days |
| Source type diversity | In any 30-day window, at least 2 different source types. Interviews alone are not enough. | Single source type for 30+ days |
| Active opportunity freshness | Every Prioritized or Active opportunity should have signals from the last 30 days | Any Active opportunity with no signals in 30+ days |
| Unmapped signal rate | Signals that are still unmapped after 2 weeks should represent less than 30% of new entries | Rate above 30% after 2 weeks |

**On unmapped signals:** A high unmapped rate after two weeks usually means one of two things: the OST is missing branches that should exist, or synthesis outputs are not being connected to the tree. Either is a structural problem worth diagnosing before the next synthesis session.

---

### 3. Evidence Quality: Are you earning the right to act?

Cadence and coverage tell you whether you are showing up and learning broadly. Evidence quality tells you whether what you have earned the right to act on.

| Metric | Target | Flag threshold |
|---|---|---|
| Confidence floor for action | No opportunity should move to Prioritized status with fewer than 2 independent evidence sources | Any Prioritized opportunity with a single source |
| Verbatim quote coverage | Every signal cluster in the ledger should have at least 2 verbatim quotes | Clusters with only paraphrase |
| Experiment coverage | Every Active opportunity should have at least one experiment that is either running or complete | Active opportunities with zero experiments |
| Stale experiments | No experiment should remain in Running status for more than 4 weeks without a result logged | Any experiment running for 4+ weeks without a result |

**On verbatim quotes:** Paraphrase-only clusters are interpretation, not evidence. The PM has already processed the language once before logging it, which introduces bias. Direct quotes are the raw material that an agent or a reviewer can evaluate independently. If a cluster has no verbatims, it cannot be audited.

**On experiments without results:** An experiment running for more than four weeks with no result logged is either operating without a success metric or being ignored. Both are problems. A test with no defined endpoint is a hypothesis being treated like a solution.

---

### 4. Honesty Indicators: Are you being rigorous?

Rigorous discovery produces dead ends. If everything in your OST looks viable and nothing has been killed, the practice is not working honestly. These metrics catch confirmation bias at the system level.

| Metric | Target | Watch for |
|---|---|---|
| Kill rate | At least some solutions killed and some opportunities archived per quarter | Zero kills and zero archives in 90 days |
| Confidence distribution | Majority of Prioritized or Active opportunities carry Medium or High confidence | Majority carrying Low confidence |
| Solution count per opportunity | At least 3 solutions considered before any are eliminated | Every opportunity with exactly one solution |

**On kill rate:** A team that runs continuous discovery for three months and has killed nothing is not discovering; they are confirming. Real discovery surfaces ideas that do not work. Dead ends are expected outputs of a rigorous process. If nothing is being archived, either the OST is not being maintained or the team is not being honest with their evidence.

**On solution count:** If every OST opportunity maps to exactly one solution, the team is skipping solution ideation and committing to the first idea. Three or more solutions considered before elimination is a minimum bar — not because more is always better, but because a single-solution opportunity has no evidence that the chosen path is the best path.

---

## What Not to Track

**Interview count as a quota.** Tracking raw interview counts and optimizing for a higher number is the wrong optimization. It produces more interviews, not better ones. One honest interview per week, maintained consistently, is the target. If interview count is healthy but the ledger has no dated entries and the OST has not changed in three weeks, the interviews are not being used.

---

## Monthly Health Check

Run this prompt monthly against your signal ledger and OST. Paste the relevant inputs and ask for a diagnostic report.

```
Run a discovery health check across these four areas. For each, report status (Healthy / Watch / Flag) and cite specific evidence from the inputs.

1. Cadence: Are there any gaps longer than 2 weeks in the signal ledger? Has the OST been updated in the past week? What is the frequency of synthesis sessions over the past 30 days?

2. Coverage: In the past 30 days, how many distinct customer segments appear in the ledger? How many distinct source types? Are there any Active or Prioritized opportunities with no signals in the past 30 days?

3. Evidence quality: Are there any Prioritized opportunities with fewer than 2 independent evidence sources? Are there signal clusters with no verbatim quotes? Are there Active opportunities with no linked experiment, or experiments that have been in Running status for more than 4 weeks?

4. Honesty indicators: Has any solution been killed or any opportunity archived in the past 90 days? What is the confidence distribution across Active and Prioritized opportunities? How many solutions have been considered per opportunity on average?

For each flag, state what specifically triggered it and what action would resolve it.

Signal ledger (past 90 days): [PASTE]
Current OST: [PASTE]
```

---

## Connection to the Signal Ledger

Most of these metrics are only computable if the [[Signal Ledger]] is being maintained with discipline. Without dated, consistently structured entries, cadence and coverage metrics require manual reconstruction from memory. The ledger turns health checking from a subjective impression into a queryable audit.

Specifically:
- **Cadence metrics** require dated entries. No dates, no cadence data.
- **Coverage metrics** require segment and source type fields on every entry. Missing fields make the 30-day coverage check impossible.
- **Evidence quality metrics** require verbatim quotes and OST mapping fields populated on every cluster.
- **Honesty metrics** require that killed solutions and archived opportunities are logged, not just deleted.

If the health check prompt is returning vague results, the problem is usually ledger schema drift: fields being skipped on some entries, or synthesis outputs not being logged at all. Fix the ledger discipline before trying to diagnose the health metrics.

---

## See Also

[[Signal Ledger]] — the artifact that makes most of these metrics computable.

[[Continuous Feedback Streams]] — the infrastructure that feeds synthesis sessions.

[[Longitudinal Pattern Tracking]] — how trends across the ledger surface opportunity momentum and staleness.

[[Agentic PM Playbook]] — the full continuous discovery workflow these metrics support.
