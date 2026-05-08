# Tree Health Checks

> The agent's practice of proactively auditing the Opportunity Solution Tree for structural problems — without being asked — and surfacing degradation before it compounds.

**Layer:** 2 — OST Integrity & Maintenance
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Tree health checks are the OST equivalent of a linting pass: a systematic scan for structural problems that don't announce themselves but quietly corrupt the tree's usefulness over time. The skill is not about responding to PM queries about the tree's state — it's about the agent proactively generating an unsolicited health report on a regular cadence and surfacing specific, actionable issues. An agent that only answers questions about the OST is a reference tool. An agent that can audit it is a steward.

There are six distinct health signals the agent must monitor. Each represents a different failure mode:

**Zombie experiments** are tests that are technically still running but have stopped being managed. Signatures: no update in 14+ days, no kill condition was defined at launch, the PM can't recall the current status without looking it up. Zombies are the most common health problem in active OSTs because experiments are easy to launch and easy to forget. They consume attention budget and create a false sense of rigor — the tree shows "experiment running" but no learning is happening.

**Orphaned solutions** are solutions with no parent opportunity in the tree. They usually get created in one of two ways: a stakeholder or PM adds a solution idea directly (skipping the opportunity layer entirely), or a parent opportunity is deleted or archived but its child solutions are left behind. Either way, the solution now exists without any customer grounding. There is no way to evaluate whether it's the right solution because the problem it's supposed to solve is no longer stated in the tree.

**Outcome drift** is when the work being done — experiments running, solutions being explored — has stopped connecting to the team's stated desired outcome. This happens gradually: an opportunity gets prioritized, solutions get built, and by the time experiments are running, the team has implicitly shifted focus without updating the outcome. The tree looks coherent at every layer but the layers have drifted apart. Outcome drift is the hardest health problem to catch because no single step looks wrong.

**Stale branches** are opportunities or solutions that haven't been updated in two or more weeks during an active sprint cycle. Staleness is sometimes appropriate — a deprioritized branch may legitimately sit dormant. But stale branches in the active portion of the tree indicate that either the team has moved on without archiving the branch, or work is happening outside the tree's view (in Jira, in docs, in Slack) and not being reflected back.

**Weak-evidence opportunities** are opportunities that passed entry with a single source and were supposed to be upgraded to multi-source before proceeding — but haven't been. The two-source threshold from opportunity validation is only useful if the agent tracks whether held items ever got their second source. Without follow-through, the "signals to investigate" backlog quietly becomes a de facto opportunity layer.

**Stalled solutions** are solutions that have been in "exploring" status for more than two planning cycles with no linked experiment. This is often a sign that the solution hasn't been broken down into testable assumptions — or that it's being explored through conversation and internal review rather than customer-facing tests.

The health check is most useful when it runs on a fixed cadence (bi-weekly) and produces a structured report, not a narrative. The agent should be able to issue a health report that a PM can skim in two minutes and act on.

## Why It Matters

OST degradation is a silent process. On any given day, the tree looks roughly fine. The problems accumulate across weeks: an experiment nobody is managing, an opportunity added on a sales call that never got a second source, a solution that's been "exploring" since Q1. The PM who built the tree and works in it daily develops a kind of familiarity blindness — they know the intended structure so well that they stop seeing the actual structure.

The agent doesn't have this blindness. It has no stake in the tree looking healthy. It has no memory of why a branch was added or what the team was excited about at the time. If given the right criteria and a consistent cadence, it will surface what the PM stopped seeing — and it will do so before the compounded drift becomes a costly misdirection.

The stakes are real. A zombie experiment that runs for six weeks without a kill condition wastes six weeks of PM attention and produces results that may not be interpretable because no one agreed what success looked like. An orphaned solution that gets built wastes engineering capacity on a feature that has no customer problem backing it. Outcome drift means the team can ship successfully against the tree and still miss the metric the business cares about. These are not edge cases — they are the predictable failure modes of any active OST that isn't being actively stewarded.

The other reason health checks matter: they create the institutional feedback loop that keeps PMs honest. When the agent surfaces a pattern — "four of the last six opportunities had weak evidence at entry" — it's not just flagging a structural problem. It's giving the PM a signal about their own process quality. Over time, knowing that a health check is coming changes how opportunities get entered.

## What Good Looks Like

**A bi-weekly health report (strong output):**

> **OST Health Check — 2026-05-08**
>
> **Status: Needs Attention — 3 issues flagged**
>
> **Zombie experiments (1):**
> - "Inline session prompt" experiment under "Users lose track of session position" — last update 2026-04-18, no kill condition on file. 20 days elapsed. Recommend: record current data, define kill condition, or close with findings.
>
> **Orphaned solutions (1):**
> - "Admin permission batch editor" has no parent opportunity in the tree. Added 2026-04-22. Recommend: link to an existing opportunity or remove. If the underlying need is real, we should surface the customer evidence first.
>
> **Stalled solutions (1):**
> - "Contextual re-engagement nudge" has been in exploring status since 2026-03-15 — two cycles with no linked experiment. Recommend: decompose into assumptions and identify the riskiest one to test, or archive if deprioritized.
>
> **No issues found:** Outcome connection (all active work links to activation outcome), evidence quality (all active opportunities have 2+ sources), stale branches (all branches updated within 2 weeks).

**A weak health check (bad output):**

> "The OST looks generally healthy. There are a few areas that could use attention, including some experiments that might need updates and a solution that doesn't have a clear connection to opportunities. Overall the tree is in decent shape."

The weak version provides no specifics, no actionable items, and no way to know what was actually checked. It sounds like a health report but functions as a status-quo endorsement.

## Failure Modes

**Health theater.** The agent generates a health report that checks visible fields (timestamps, status labels) but not semantic connections. It reports "no outcome drift" because all solutions nominally link to an opportunity that links to the outcome — without evaluating whether the connection is real or just structural. A solution can be linked to an opportunity in the tool while being completely disconnected from it in practice.

**False urgency.** The agent flags every stale branch regardless of whether the branch is intentionally deprioritized. If every health report contains 12 issues, PMs stop reading them. The agent needs to distinguish between stale-and-active (problem) and stale-and-deprioritized (expected). This requires understanding context — ideally through explicit status labels on branches, or by asking the PM to confirm deprioritization.

**One-time audit mentality.** The agent runs a health check when asked and then stops. The value of health checks is in the cadence — catching drift as it happens, not diagnosing a fully corrupted tree. If the skill isn't running on a regular schedule, it's not functioning as stewardship.

**Flagging without triage.** The agent identifies six issues and lists them with equal weight. A zombie experiment 25 days old with no kill condition and active engineering resources is more urgent than a two-week-old stale branch in a deprioritized area. The agent should prioritize issues by severity and urgency, not just enumerate them.

**Missing the kill-condition gap.** The agent checks whether experiments are running (they are) and whether they've been updated recently (they have) — and misses that neither the success criterion nor the kill condition was ever defined. An experiment that's being diligently updated but has no success metric is a zombie with better hygiene. The agent needs to check for kill condition presence, not just activity.

## How to Evaluate It

**Test 1 — Structural problem detection.** Give the agent a deliberately degraded OST: one zombie experiment, one orphaned solution, one stale branch that should be active, and one solution that's been "exploring" for three cycles. Ask it to run a health check. It should identify all four issues specifically (not generically) and suggest concrete actions for each.

**Test 2 — Semantic vs. structural connection.** Give the agent an OST where all the links are technically in place (solution linked to opportunity, opportunity linked to outcome) but the opportunity is about feature discoverability and the outcome is about 30-day retention. Ask for a health check. A passing agent flags the semantic disconnect. A failing agent reports no outcome drift because the links exist.

**Test 3 — Prioritization under noise.** Give the agent an OST with eight health issues of varying severity. The report should prioritize them — ideally grouping by urgency or tagging which need immediate action vs. can wait for next cycle. If the output is a flat list with no triage, it fails.

**Test 4 — Kill condition audit.** Present an experiment with recent updates and a clear success metric — but no kill condition. Ask the agent to assess the experiment's health. It should flag the missing kill condition as a problem even though the other signals look clean.

**Test 5 — Cadence and proactivity.** Ask the agent to set up a recurring health check routine. Evaluate whether it specifies: the cadence (bi-weekly), what it will check (all six signals), what format the report will take, and what triggers an escalation vs. a flag. An agent that just says "I'll check in regularly" has not developed this skill.

## How to Develop It

**Enumerate the six signals explicitly in the system prompt.** Don't rely on the agent to infer what "health" means in an OST context. List the signals (zombie experiments, orphaned solutions, outcome drift, stale branches, weak-evidence opportunities, stalled solutions), define the threshold for each, and specify the expected output format.

**Give the agent a health report template.** Structure reduces variance. A template that specifies sections (zombie experiments, orphaned solutions, etc.) and requires "no issues found" to be stated explicitly for clean signals is much more reliable than an open-ended "tell me how the tree looks."

**Train on corrupted OSTs.** Create a library of practice OSTs with known problems at different severities and subtlety levels. Run the agent through health check exercises against these and grade the output. The agent should be able to reliably catch all problems in an OST that has been deliberately corrupted — before you trust it to audit a real one.

**Build in the escalation threshold.** Some health issues the agent should flag and move on. Others — a zombie experiment with real engineering resources attached, a solution that's been "exploring" for months — warrant a proactive PM conversation. The agent's system prompt should specify which issues trigger escalation vs. regular report inclusion.

**Separate the health check from the tree update.** The agent should not fix health problems while running the health check. It should surface, triage, and wait for PM direction. Agents that silently archive stale branches or delete orphaned solutions while "cleaning up" the tree may remove things the PM hasn't intentionally deprioritized.

## Sample Prompts

**Bi-weekly health check prompt:**
> "Run a health check on the following OST. Check for each of these six issues: (1) zombie experiments — running with no update in 14+ days or no kill condition defined; (2) orphaned solutions — no linked parent opportunity; (3) outcome drift — active work that doesn't connect to the stated desired outcome [OUTCOME]; (4) stale branches — no update in 14+ days in an area that should be active; (5) weak-evidence opportunities — single source, not yet upgraded; (6) stalled solutions — in 'exploring' status for 2+ cycles with no linked experiment. For each issue found, name the specific node, describe the problem, and suggest a next action. For each signal with no issues, confirm 'no issues found.'"

**Kill condition audit prompt:**
> "Review all currently running experiments in this OST. For each one, confirm: (1) Is there a stated success metric? (2) Is there a stated kill condition — a result that would cause us to abandon this solution? (3) When was the last update? Flag any experiment missing either the success metric or the kill condition, regardless of recency."

**Outcome drift detection prompt:**
> "Our stated desired outcome is: [OUTCOME]. Review all active opportunities and solutions in this OST. For each one, explain in one sentence how it connects to that outcome. Flag any where the connection is unclear or tenuous, and suggest whether the item should be archived, reframed, or kept with a clarified rationale."

## Connected Skills

[[Opportunity Validation]] — Validates opportunities at entry; tree health checks audit the existing population of opportunities for ongoing validity.

[[Evidence Attribution]] — Health checks include verifying that opportunities still have traceable evidence. Evidence attribution maintains the underlying source trail.

[[Dead Ideas Tracking]] — Stalled and zombie items flagged by health checks often become candidates for the dead ideas archive. The two skills work in tandem on resolution.

[[Proactive Surfacing]] — Tree health checks are the primary expression of proactive surfacing in Layer 2. The cadence and trigger threshold are set by the health check skill.

[[Contradiction Detection]] — A health check that finds new signals contradicting existing branches should hand off to contradiction detection for deeper analysis.

[[Escalation Calibration]] — Determines which health issues the agent can note in a report vs. which require an immediate PM conversation. High-severity issues (zombie experiments with active eng resources) should escalate; low-severity issues (mildly stale deprioritized branch) can wait for the next report.

[[Epistemic Self-Awareness]] — The meta-skill underlying health checks: the agent must know what a healthy OST looks like well enough to recognize an unhealthy one, and be confident enough to surface bad news without softening it.
