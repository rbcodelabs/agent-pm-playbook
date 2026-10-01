# Tree Health Checks

> The agent's practice of proactively auditing the Loop tree (Opportunity, Outcome, Key Result, Solution, Test) for structural problems without being asked, and surfacing degradation before it compounds.

**Layer:** 2 — Tree Integrity & Maintenance
**Companion:** [[Agentic PM — Agent Capability Framework]]
**Structure:** `guides/the-loop.md` defines the levels, structural rules and IDs (`OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`) this skill audits.

---

## What This Skill Is

Tree health checks are the Loop equivalent of a linting pass: a systematic scan, across all five levels, for structural problems that don't announce themselves but quietly corrupt the tree's usefulness over time. The skill is not about responding to PM queries about the tree's state. It is about the agent proactively generating an unsolicited health report on a regular cadence and surfacing specific, actionable issues. An agent that only answers questions about the tree is a reference tool. An agent that can audit it is a steward.

The audit checks the tree against its structural rules:

- **One parent each.** Outcome has one Opportunity parent, KR one Outcome, Solution one KR, Test one Solution. A second relationship is a secondary link, never a second parent.
- **Fan-out.** An Outcome has 2-3 KRs. A KR has at least 3 candidate Solutions before any is selected. A Solution has at least 1 Test before it is built.
- **No orphans.** Nothing exists without its parent, and nothing that should have children is left childless.
- **At-risk means harder Solutions and Tests.** When a KR is at risk, the response is more and better Solutions and Tests, not more roadmap items.
- **Archive, don't delete.** Branches are retired with a reason, so the tree keeps its memory.

Nine health signals translate those rules into failure modes the agent must monitor:

**Zombie Tests** are Tests that are technically still running but have stopped being managed. Signatures: no update in 14+ days, no kill condition defined at launch, the PM can't recall the current status without looking it up. Zombies are the most common health problem in active trees because Tests are easy to launch and easy to forget. They consume attention budget and create a false sense of rigor: the tree shows "Test running" but no learning is happening, and the Solution's confidence never moves.

**Orphans** are records missing the parent the structure requires. Solutions with no parent KR usually arrive in one of two ways: a stakeholder or PM adds a Solution idea directly (skipping the upper levels entirely), or a parent KR is archived and its child Solutions are left behind. Tests with no Solution are checks with no assumption to falsify. Outcomes with no Opportunity parent are commitments with no cited customer need behind them. Either way, the record exists without grounding, and there is no way to judge whether it is right because the thing it is supposed to serve is no longer stated in the tree.

**Fan-out violations** are shape problems. A KR with no Solutions is a coverage gap: someone committed to a measurable change and nothing is aimed at it. A KR with one or two Solutions has not been explored; the team has jumped to its first idea. An Outcome with more than three KRs has lost focus, and one with a single KR is probably a KR in disguise. An Outcome with no Opportunity parent fails the same test as an orphan. A Solution heading toward the roadmap with no Test (or no cleared investment gate) is a bet nobody examined.

**Outcome drift** is when the work being done (Tests running, Solutions being explored) has stopped connecting to what the Opportunity actually called for. It happens in two directions. The Outcome or its KRs can drift away from the Opportunity: the behavior change the team commits to, or the number it watches, no longer answers the cited customer need. Or the Solutions and Tests can drift away from the KR they were meant to move. The tree looks coherent at every level but the levels have drifted apart. Outcome drift is the hardest health problem to catch because no single step looks wrong.

**Evidence attached to KRs** is a placement error. Per the structure, signals attach to Opportunities (and, when specific, to the Solution or Test they bear on), never to KRs. A KR carrying raw quotes or tickets means the evidence has no home in the part of the tree that decides whether the need is real, and the Opportunity looks weaker than it is. The agent flags it and proposes the right attachment point.

**Stale branches** are Opportunities, Outcomes, KRs or Solutions that haven't been updated in two or more weeks during an active cycle. Staleness is sometimes appropriate: a deprioritized branch may legitimately sit dormant. But stale branches in the active portion of the tree indicate that either the team has moved on without archiving the branch, or work is happening outside the tree's view (in a tracker, in docs, in chat) and not being reflected back.

**Weak-evidence Opportunities** are Opportunities tagged `weak` that were supposed to be upgraded to multi-source before an Outcome was committed against them, but haven't been. The two-source threshold from opportunity validation is only useful if the agent tracks whether weak items ever got their second source. Without follow-through, the weak backlog quietly becomes a de facto Opportunity layer.

**Stalled Solutions** are Solutions that have been in "exploring" status for more than two cycles with no linked Test. This is often a sign that the Solution hasn't been broken down into testable assumptions, or that it's being explored through conversation and internal review rather than customer-facing tests.

**Roadmap response to an at-risk KR** is the ninth signal. When a KR is flagged at risk and the movement in the tree is new roadmap items rather than new or harder Solutions and Tests, the team is treating a learning problem as a delivery problem. The agent flags it and asks which assumption the new items rest on.

The health check is most useful when it runs on a fixed cadence (bi-weekly) and produces a structured report, not a narrative. The agent should be able to issue a health report that a PM can skim in two minutes and act on.

## Why It Matters

Tree degradation is a silent process. On any given day, the tree looks roughly fine. The problems accumulate across weeks: a Test nobody is managing, an Opportunity added on a sales call that never got a second source, a KR that quietly lost its Solutions when two were archived, a Solution that has been "exploring" since the last cycle. The PM who built the tree and works in it daily develops a kind of familiarity blindness: they know the intended structure so well that they stop seeing the actual structure.

The agent doesn't have this blindness. It has no stake in the tree looking healthy. It has no memory of why a branch was added or what the team was excited about at the time. If given the right criteria and a consistent cadence, it will surface what the PM stopped seeing, and it will do so before the compounded drift becomes a costly misdirection.

The stakes are real. A zombie Test that runs for six weeks without a kill condition wastes six weeks of PM attention and produces results that may not be interpretable because no one agreed what success looked like. An orphaned Solution that gets built wastes engineering capacity on a feature with no customer need or measurable change behind it. A KR with a single Solution means the team will build the first idea it had. Outcome drift means the team can ship successfully against the tree and still miss the change the Opportunity was about. These are not edge cases. They are the predictable failure modes of any active tree that isn't being stewarded.

The other reason health checks matter: they create the institutional feedback loop that keeps PMs honest. When the agent surfaces a pattern ("four of the last six Opportunities had weak evidence at entry"), it is not just flagging a structural problem. It is giving the PM a signal about their own process quality. Over time, knowing that a health check is coming changes how records get entered.

## What Good Looks Like

**A bi-weekly health report (strong output):**

> **Tree Health Check: 2026-05-08**
>
> **Status: Needs Attention. 5 issues flagged, in priority order.**
>
> **Fan-out violations (2):**
> - `OUT-2-KR-2` (7-day return rate) has no Solutions. It is active this cycle. Recommend: generate at least 3 candidate Solutions from `OPP-4` before anything else is scheduled against this KR.
> - `OUT-3` has four KRs. Recommend: merge `OUT-3-KR-3` and `OUT-3-KR-4` (both measure setup completion) or archive one with a reason.
>
> **Zombie Tests (1):**
> - `TST-9` "Inline session prompt" under `SOL-14` — last update 2026-04-18, no kill condition on file. 20 days elapsed. Recommend: record current data, define kill condition, or close with findings.
>
> **Orphans (1):**
> - `SOL-21` "Admin permission batch editor" has no parent KR. Added 2026-04-22. Recommend: link to an existing KR or archive. If the underlying need is real, the customer evidence goes on an Opportunity first.
>
> **Evidence on KRs (1):**
> - `OUT-1-KR-1` carries three raw support-ticket quotes. Recommend: move them to `OPP-2` and link the ticket cluster there.
>
> **No issues found:** outcome drift (every Outcome still answers its Opportunity), stale branches (all active branches updated within 2 weeks), weak-evidence Opportunities (all parents of active Outcomes have 2+ sources), stalled Solutions, roadmap response to at-risk KRs.

**A weak health check (bad output):**

> "The tree looks generally healthy. There are a few areas that could use attention, including some Tests that might need updates and a Solution that doesn't have a clear connection to the rest of the tree. Overall the tree is in decent shape."

The weak version provides no specifics, no actionable items, and no way to know what was actually checked. It sounds like a health report but functions as a status-quo endorsement.

## Failure Modes

**Health theater.** The agent generates a health report that checks visible fields (timestamps, status labels, parent links) but not semantic connections. It reports "no outcome drift" because every Solution nominally links to a KR that links to an Outcome that links to an Opportunity, without evaluating whether the connection is real or just structural. A Solution can be linked to a KR in the tool while being completely disconnected from it in practice.

**False urgency.** The agent flags every stale branch regardless of whether the branch is intentionally deprioritized. If every health report contains 12 issues, PMs stop reading them. The agent needs to distinguish between stale-and-active (problem) and stale-and-deprioritized (expected). This requires understanding context, ideally through explicit status labels on branches, or by asking the PM to confirm deprioritization.

**One-time audit mentality.** The agent runs a health check when asked and then stops. The value of health checks is in the cadence: catching drift as it happens, not diagnosing a fully corrupted tree. If the skill isn't running on a regular schedule, it's not functioning as stewardship.

**Flagging without triage.** The agent identifies six issues and lists them with equal weight. A zombie Test 25 days old with no kill condition and active engineering resources is more urgent than a two-week-old stale branch in a deprioritized area. The agent should prioritize issues by severity and urgency, not just enumerate them.

**Missing the kill-condition gap.** The agent checks whether Tests are running (they are) and whether they've been updated recently (they have), and misses that neither the success criterion nor the kill condition was ever defined. A Test that's being diligently updated but has no success metric is a zombie with better hygiene. The agent needs to check for kill condition presence, not just activity.

**Counting fan-out instead of judging it.** The agent sees three Solutions under a KR and passes it, without noticing that all three are the same idea in different clothing. The rule exists to force meaningfully different options; the audit should check that they are.

**Checking only the lower levels.** The agent audits Tests and Solutions carefully and never asks whether the Outcome still answers its Opportunity or whether the Opportunity still has evidence behind it. A tree can be tidy at the bottom and wrong at the root.

## How to Evaluate It

**Test 1 — Structural problem detection.** Give the agent a deliberately degraded tree: one zombie Test, one orphaned Solution, one KR with no Solutions, one stale branch that should be active, and one Solution that has been "exploring" for three cycles. Ask it to run a health check. It should identify all five issues specifically (not generically) and suggest concrete actions for each.

**Test 2 — Semantic vs. structural connection.** Give the agent a tree where all the links are technically in place but the Opportunity is about feature discoverability and the Outcome is about 30-day retention. Ask for a health check. A passing agent flags the semantic disconnect. A failing agent reports no outcome drift because the links exist.

**Test 3 — Prioritization under noise.** Give the agent a tree with eight health issues of varying severity. The report should prioritize them, ideally grouping by urgency or tagging which need immediate action vs. can wait for next cycle. If the output is a flat list with no triage, it fails.

**Test 4 — Kill condition audit.** Present a Test with recent updates and a clear success metric but no kill condition. Ask the agent to assess the Test's health. It should flag the missing kill condition as a problem even though the other signals look clean.

**Test 5 — Fan-out and evidence placement.** Give the agent an Outcome with four KRs, a KR with one Solution, and a KR carrying three raw customer quotes. It should flag all three, name the rule each breaks, and propose where the quotes belong.

**Test 6 — At-risk response.** Mark a KR at risk and show three new roadmap items added in the same week, none linked to a Test. The agent should flag that the response is delivery rather than learning, and ask which Solution assumption the new items rest on.

**Test 7 — Cadence and proactivity.** Ask the agent to set up a recurring health check routine. Evaluate whether it specifies: the cadence (bi-weekly), what it will check (all nine signals, across all five levels), what format the report will take, and what triggers an escalation vs. a flag. An agent that just says "I'll check in regularly" has not developed this skill.

## How to Develop It

**Enumerate the nine signals explicitly in the system prompt.** Don't rely on the agent to infer what "health" means in a Loop context. List the signals (zombie Tests, orphans, fan-out violations, outcome drift, evidence on KRs, stale branches, weak-evidence Opportunities, stalled Solutions, roadmap response to at-risk KRs), define the threshold for each, and specify the expected output format.

**Give the agent a health report template.** Structure reduces variance. A template that specifies sections (fan-out violations, zombie Tests, orphans, etc.) and requires "no issues found" to be stated explicitly for clean signals is much more reliable than an open-ended "tell me how the tree looks."

**Train on corrupted trees.** Create a library of practice trees with known problems at different severities and subtlety levels. Run the agent through health check exercises against these and grade the output. The agent should reliably catch all problems in a deliberately corrupted tree before you trust it to audit a real one.

**Build in the escalation threshold.** Some health issues the agent should flag and move on. Others (a zombie Test with real engineering resources attached, a Solution that has been "exploring" for months, a KR that has been uncovered for a full cycle) warrant a proactive PM conversation. The agent's system prompt should specify which issues trigger escalation vs. regular report inclusion.

**Separate the health check from the tree update.** The agent should not restructure the tree while running the health check. It should surface, triage, and recommend. Reversible fixes it is confident in (moving misplaced evidence to the right Opportunity, tagging a stale branch) may be made and reported afterward, per the [[Autonomy Policy]]. Archiving a branch with work behind it is irreversible in effect and goes to the PM as one recommendation. Archive with a stated reason; never delete.

## Sample Prompts

**Bi-weekly health check prompt:**
> "Run a health check on the following Loop tree. Check each of these nine signals: (1) zombie Tests, running with no update in 14+ days or no kill condition defined; (2) orphans, meaning any record without its required parent (Outcome without Opportunity, KR without Outcome, Solution without KR, Test without Solution); (3) fan-out violations: Outcome with fewer than 2 or more than 3 KRs, KR with fewer than 3 candidate Solutions, Solution heading to build with no Test; (4) outcome drift, meaning an Outcome or KR that no longer answers its Opportunity, or Solutions and Tests that no longer move their KR; (5) evidence attached to KRs instead of Opportunities; (6) stale branches, with no update in 14+ days in an area that should be active; (7) weak-evidence Opportunities, single source and not yet upgraded; (8) stalled Solutions, in 'exploring' status for 2+ cycles with no linked Test; (9) at-risk KRs answered with roadmap items instead of Solutions and Tests. For each issue found, name the specific record ID, describe the problem, and suggest a next action. For each signal with no issues, confirm 'no issues found.'"

**Kill condition audit prompt:**
> "Review all currently running Tests in this tree. For each one, confirm: (1) Is there a stated success metric? (2) Is there a stated kill condition, meaning a result that would cause us to abandon the Solution or assumption? (3) When was the last update? Flag any Test missing either the success metric or the kill condition, regardless of recency."

**Outcome drift detection prompt:**
> "For each active Outcome, state in one sentence how it answers its parent Opportunity: [OPPORTUNITIES]. For each KR, state how it measures its Outcome. For each Solution, state how it moves its KR. Flag any link where the connection is unclear or tenuous, and suggest whether the record should be archived, reframed, or kept with a clarified rationale."

## Connected Skills

[[Opportunity Validation]] — Validates Opportunities at entry; tree health checks audit the existing population of Opportunities for ongoing validity.

[[Evidence Attribution]] — Health checks include verifying that Opportunities still have traceable evidence and that evidence sits on Opportunities, not KRs. Evidence attribution maintains the underlying source trail.

[[Dead Ideas Tracking]] — Stalled Solutions and zombie Tests flagged by health checks often become candidates for the dead ideas archive. The two skills work in tandem on resolution.

[[Proactive Surfacing]] — Tree health checks are the primary expression of proactive surfacing in Layer 2. The cadence and trigger threshold are set by the health check skill.

[[Contradiction Detection]] — A health check that finds new signals contradicting existing branches should hand off to contradiction detection for deeper analysis.

[[Escalation Calibration]] — Determines which health issues the agent can note in a report vs. which require an immediate PM conversation. High-severity issues (zombie Tests with active eng resources) should escalate; low-severity issues (mildly stale deprioritized branch) can wait for the next report.

[[Epistemic Self-Awareness]] — The meta-skill underlying health checks: the agent must know what a healthy tree looks like well enough to recognize an unhealthy one, and be confident enough to surface bad news without softening it.

**Related skills by id:** `ost-workflow` and `okr-workflow` keep their ids for compatibility. Both cover the Loop levels (the former the Opportunity and Solution side, the latter the Outcome and KR side); the health check reads the tree they maintain as one structure.
