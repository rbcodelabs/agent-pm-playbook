# Dead Ideas Tracking

> Maintaining a structured archive of previously explored and rejected solution paths — including the evidence that killed them, the assumptions they rested on, and the conditions under which they might deserve reconsideration.

**Layer:** 2 — OST Integrity & Maintenance
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Dead ideas tracking is the practice of treating rejected solutions as assets rather than embarrassments. When a solution is killed — whether by a failed experiment, a negative discovery finding, a feasibility constraint, or a deliberate deprioritization decision — the agent's job is to capture not just what was killed but why, what was learned in the process, what assumptions were invalidated, and what external conditions would need to change for the idea to be worth revisiting. This archive is then actively consulted when new solution ideas are proposed, when the team is exploring an opportunity for the second time, or when external context (new technology, changed customer behavior, a shift in market conditions) creates a plausible trigger for resurrection.

Without this skill, teams experience what might be called idea Groundhog Day: the same solution concepts get proposed, explored, and eventually killed repeatedly across planning cycles. Each cycle, someone — a new team member, a returning PM, an enthusiastic stakeholder — proposes an idea that sounds compelling and original. Without access to institutional memory about why that idea failed before, the team invests weeks re-exploring it. They re-run research that was already done. They re-discover assumptions that were already tested. They build conviction for a solution that was already invalidated. This is not just wasteful; it erodes the team's confidence in the discovery process when history keeps repeating.

The skill has three distinct components. The first is the capture protocol: when a solution is killed or archived, the agent ensures that a structured record is created before it leaves the active tree. The record needs to capture more than "we decided not to do this." It needs to capture: the specific evidence or experiment results that drove the decision, the assumptions that were invalidated, the assumptions that were never tested (because the solution died before reaching them), and the external conditions that would need to change for this idea to be worth reconsideration. This last element — the resurrection conditions — is what separates a useful archive from a graveyard.

The second component is the retrieval mechanism: when a new solution is proposed for an existing opportunity, the agent should automatically check the dead ideas archive for prior work on that opportunity or related ones. If there is prior work, the agent surfaces it immediately — not as a veto, but as context: "We explored a similar direction in Q3 2025. Here's what we found and why we stopped. Do any of these conditions look different now?" This surface-before-exploring habit prevents the team from re-discovering things it already knows.

The third component is the periodic context scan: the agent should watch for triggers that might warrant resurrecting a dead idea — a new third-party API that solves a previously infeasible technical constraint, a shift in analytics data showing customer behavior has changed, a significant change to the competitive landscape, or a new experiment result on a related solution that challenges an assumption the dead idea rested on. When a trigger appears, the agent surfaces the potentially relevant dead ideas and asks whether they deserve a second look.

## Why It Matters

The most immediate cost of missing dead ideas tracking is wasted team time. Research time, design time, engineering time spent re-exploring territory that was already mapped. In a fast-moving team, this can mean multiple sprints wasted per year. In a team with meaningful turnover — where new engineers or PMs join and bring their own solution intuitions — the waste compounds. Every six months of team change potentially resets the institutional memory that prevents repeat mistakes.

But the deeper cost is epistemic. When teams repeatedly re-discover the same dead ends, they lose the ability to distinguish between "we haven't tried this" and "we tried this and it didn't work." All of discovery starts to feel like first-pass exploration, even when much of the territory has already been mapped. This makes it hard to know what you actually know. It makes it hard to explain to stakeholders why certain directions aren't worth pursuing — because you can't point to the evidence of prior invalidation. And it makes the PM feel, correctly, that they're building on sand rather than accumulated learning.

The flip side is equally important: without active tracking of resurrection conditions, dead ideas stay dead even when the conditions that killed them have changed. A solution that was technically infeasible in 2024 may become feasible with a new library. A solution that customers didn't want in a growth market may become relevant in a saturated one. A solution that failed because of a UI implementation flaw (not a core assumption failure) may deserve a cleaner attempt. The team that maintains a dead ideas archive with resurrection conditions can act on these shifts; the team that doesn't will either re-explore the idea from scratch (expensive) or never reconsider it at all (a missed opportunity).

## What Good Looks Like

**A well-maintained dead ideas archive entry:**

> **Solution:** In-context session resume prompt
> **Parent opportunity:** Users lose track of where they were after a multi-day gap
> **Killed:** 2026-03-28
> **Why killed:** Experiment ran for 3 weeks; 18% of returning users clicked the prompt but only 6% reported it helped them re-orient (target: 25%). Exit survey qualitative: prompt appeared too late in the session flow — users had already started scrolling and the prompt felt interruptive at that point.
>
> **Assumptions invalidated:**
> - Users would engage with a re-orientation prompt when returning (partially invalidated — they click but don't find it useful)
> - Earlier in the session is better timing for re-orientation (invalidated — interruptive, not helpful)
>
> **Assumptions never tested:**
> - Whether a passive indicator (not a prompt) would reduce disorientation
> - Whether the problem is more severe on mobile vs. desktop
> - Whether users who set their own re-entry point (bookmarking) have lower disorientation rates
>
> **Resurrection conditions:**
> - Evidence that the disorientation pain is more acute on a specific platform (mobile) where a non-interruptive UI pattern is viable
> - A test of passive re-orientation indicators (breadcrumbs, progress state) that validates the demand without the intrusion problem
> - Significant increase in multi-day gap frequency in the user base that raises the severity of the problem

**A bad dead ideas record (what not to do):**

> **Solution:** Session resume prompt
> **Status:** Killed Q1 2026 — didn't work well enough

The second entry tells you almost nothing useful. You can't evaluate whether the failure was a solution failure or an execution failure. You can't identify what to do differently. You can't determine whether context has changed. It's a tombstone, not a record.

**How the retrieval mechanism works in practice:**

PM proposes: "What if we built a 'continue where you left off' prompt for returning users?"

Agent response: "We explored something very close to this in Q1 — an in-context session resume prompt for the same opportunity. The experiment ran for 3 weeks and failed: users clicked but didn't find it helpful. The key failure was timing — the prompt felt interruptive rather than helpful. We never tested passive indicators vs. active prompts, or mobile vs. desktop separately. If the current hypothesis is different in one of those dimensions, it might be worth distinguishing this from the prior attempt. What's the specific mechanism you're imagining, and does it address the timing/interruption issue?"

## Failure Modes

**Killing without capturing.** The solution is archived or removed from the active tree and the reasoning lives in someone's memory, a Slack thread, or a product review deck. Three months later, when the idea resurfaces, there is no record. This is the most common failure mode and produces the full Groundhog Day cycle.

**Capturing outcomes without capturing assumptions.** The record says "experiment failed — 6% improvement, target was 25%." This is better than nothing but doesn't explain what was learned. The team knows the solution didn't hit the metric but doesn't know whether the core assumption was wrong, the execution was wrong, or the metric was wrong. Future resurrection decisions have no foundation.

**Recording resurrection conditions as "when things change."** This is not a resurrection condition — it's a placeholder. Useful resurrection conditions are specific: "when third-party API X supports Y feature," "when session gap frequency exceeds Z threshold," "when a passive re-orientation indicator is validated by a separate experiment." Vague conditions never trigger retrieval.

**Treating prior failure as automatic veto.** The agent retrieves a dead idea and presents it as a reason not to explore the current proposal. But the PM's new proposal may be meaningfully different — it may address the specific failure point, or the conditions may have genuinely changed. The dead ideas archive should inform the conversation, not end it. The agent's job is to surface the history and ask whether the current proposal is sufficiently differentiated, not to block exploration.

**Missing related-opportunity retrieval.** The agent only checks dead ideas on the exact same opportunity. But a dead solution from opportunity A may contain invalidated assumptions that are directly relevant to a new solution being proposed under opportunity B. Narrow retrieval logic misses cross-opportunity learning.

**Letting the archive grow without curation.** Over time, a dead ideas archive accumulates dozens of entries. Without periodic curation — removing entries where conditions clearly can never change, updating entries where context has evolved — the archive becomes too dense to use. The agent needs to maintain the archive, not just append to it.

## How to Evaluate It

**Test 1 — Capture protocol completeness.** Walk the agent through killing a solution: a specific experiment result, a stated reason for archiving. Ask it to produce the dead idea record. Evaluate whether the output captures: (a) the invalidated assumptions, (b) the untested assumptions, and (c) specific resurrection conditions. Generic entries ("when the product is more mature") should not pass.

**Test 2 — Retrieval on proposal.** Seed the agent with a dead ideas archive that includes a prior session resume experiment. Then propose "a 'pick up where you left off' feature for returning users." The agent should surface the prior work immediately, before exploring the new proposal. If it proceeds to generate a new solution exploration without checking the archive, it has failed.

**Test 3 — Cross-opportunity retrieval.** A dead idea under opportunity A contains an invalidated assumption that is also foundational to a new solution proposed under opportunity B. Ask the agent to check for relevant prior work. It should identify the cross-opportunity connection, not just search within the specific opportunity's history.

**Test 4 — Resurrection trigger detection.** Present the agent with a dead idea archive entry that includes a specific resurrection condition. Then present new information that meets that condition (e.g., a new analytics finding, a changed technical constraint). The agent should surface the dead idea as potentially worth reconsidering. If it doesn't connect the dots proactively, the trigger detection is not working.

**Test 5 — Differentiated vs. repeated proposal.** A PM proposes a solution that looks very similar to a dead idea. Surface the dead idea history and ask the agent to assess whether the new proposal is meaningfully differentiated. A good agent asks specific questions: "Does this proposal address the timing/interruption problem that failed in the prior test? If so, how?" A bad agent either blocks the proposal outright or accepts it without interrogating the differentiation.

## How to Develop It

**Build the capture template into the kill/archive workflow.** The best time to capture a dead idea record is the moment it's archived — when the evidence is fresh and the reasoning is accessible. If capture happens later, the nuance gets lost. The agent should prompt for the record as part of the archiving action, not as a separate step.

**Create a standard resurrection condition taxonomy.** Train the agent to generate resurrection conditions in specific categories: (1) technical change (new API, library, or platform capability), (2) customer behavior change (measurable shift in how users behave), (3) market change (competitive shift, regulatory change), (4) team change (new data, new research capability), (5) execution change (different implementation approach that addresses the prior failure point). Conditions that don't fit one of these categories are probably too vague to trigger reliable retrieval.

**Build retrieval into the solution proposal flow.** The agent should not wait to be asked about prior work. Whenever a solution is proposed for any opportunity, the check against the dead ideas archive should be automatic. This requires the archive to be stored in a retrievable format — either in the agent's context, in a linked document, or in a searchable tool the agent can query.

**Add a periodic resurrection scan.** On a regular cadence (monthly or when significant new data arrives), the agent should compare the current context — new analytics, new research findings, new technical landscape — against the resurrection conditions in the dead ideas archive. This is an active scan, not a passive retrieval. The agent should surface candidates for reconsideration rather than waiting to be asked.

**Practice the differentiation conversation.** The most delicate application of dead ideas tracking is the conversation where a PM is excited about a proposal that resembles something that failed before. The agent needs to be able to surface the history without being dismissive, ask the right differentiation questions, and reach a clear conclusion: this is sufficiently different to explore, or this is the same bet with a new coat of paint. Train the agent on this conversation explicitly — it requires calibrated confidence, not just retrieval.

## Sample Prompts

**Dead idea capture prompt (run at solution archive time):**
> "Before we archive this solution, let's capture a dead idea record. I need: (1) the specific evidence or experiment result that drove this decision — be precise, not general; (2) which assumptions this outcome invalidated; (3) which assumptions we planned to test but never got to; (4) the specific conditions that would need to be true for this idea to be worth revisiting — think technical change, customer behavior shift, or a different implementation approach that addresses the failure point."

**Retrieval and differentiation prompt (run on new solution proposal):**
> "Before we explore this solution, check the dead ideas archive for this opportunity and any related opportunities. If there is prior work in this direction, surface it: what was the solution, when was it killed, why, and what was learned. Then assess this new proposal: is it meaningfully differentiated from the prior attempt? What specific aspect of the prior failure does it address, and how? If it's not clearly differentiated, flag that before we invest in exploration."

**Resurrection scan prompt (run monthly or after significant new data):**
> "Review the dead ideas archive for this product area. For each entry, compare its resurrection conditions against our current context: new analytics data, recent research findings, any changes to technical capabilities or the competitive landscape. Flag any dead ideas where one or more resurrection conditions appear to have been met. For each flagged idea, summarize what's changed and whether it's worth bringing back to the PM for reconsideration."

## Connected Skills

[[Tree Health Checks]] — Health checks identify stalled and zombie items that should be candidates for the dead ideas archive. Dead ideas tracking handles what comes after archiving.

[[Assumption Decomposition]] — The quality of a dead idea record depends on capturing which assumptions were invalidated and which were never tested. Assumption decomposition provides the framework for doing this rigorously.

[[Result Interpretation]] — Understanding what an experiment result actually means — which assumption it invalidates, vs. which it's inconclusive about — is prerequisite to a useful dead idea record. Weak result interpretation produces dead idea records that capture outcomes without capturing learning.

[[Contradiction Detection]] — New evidence sometimes contradicts assumptions that were treated as invalidated. Contradiction detection may trigger a resurface from the dead ideas archive.

[[Longitudinal Pattern Tracking]] — Tracking changes in customer behavior over time is one of the primary mechanisms for detecting resurrection conditions. The two skills work together: longitudinal tracking generates the signals; dead ideas tracking translates them into reconsideration decisions.

[[Confidence Tagging]] — Dead idea records should carry confidence levels on their own conclusions. An idea killed by a single failed experiment with a small sample size carries different confidence in its invalidation than one killed by three independent experiments with clear results.

[[Epistemic Self-Awareness]] — The meta-skill underlying dead ideas tracking: the agent must know the difference between "we didn't do this" and "we tried this and learned it doesn't work" — and must be willing to surface that distinction clearly, even when it makes a PM's new proposal less exciting than it felt.
