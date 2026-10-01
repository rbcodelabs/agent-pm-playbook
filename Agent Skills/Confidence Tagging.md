# Confidence Tagging

> The practice of explicitly signaling what the agent is certain about, uncertain about, and what evidence would change its conclusion — attached to every substantive output and carried at each level of the OOKRST tree where it applies.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]] · [OOKRST Structure](../guides/ookrst-structure.md)

---

## What This Skill Is

Confidence tagging is the discipline of making epistemic state visible. Every synthesis, cluster, Opportunity draft, Test brief, or recommendation the agent produces carries an implicit claim about how reliable that output is. Confidence tagging makes that claim explicit rather than leaving the PM to guess whether a pattern is built on 30 data points or 3. It transforms vague outputs into calibrated ones.

In the OOKRST tree, confidence is not one number. Different levels are supported by different kinds of evidence, so each carries its own tag:

| Level | What the confidence tag expresses | What it is built from |
|---|---|---|
| **Opportunity** | How sure we are the need is real, sized for its segment, and worth pursuing | Cited evidence: source count, source diversity, recency, direct vs. inferred |
| **Solution** | How sure we are this Solution will move its parent KR | Aggregated from its Test results, plus the state of its riskiest assumption |
| **Key Result (reading)** | How reliable the current measurement is, and whether it is on track | Baseline quality, measurement method, sample, time since last reading |
| **Outcome (health)** | Whether the behavior change is actually happening | Rolled up from its KRs' readings and their reliability |

Evidence attaches to Opportunities (and to the Solution or Test it bears on), never to KRs. A KR carries a reading, not raw signals, and its tag describes the measurement.

At the evidence level, the agent tags how much signal backs a given Opportunity: number of sources, source diversity, recency, and whether the signal is direct (a user said this verbatim) or inferred (the agent read between the lines). At the inference level, the agent flags when it is making an interpretive leap vs. reporting something unambiguous. At the assumption level, the agent identifies which parts of an output depend on an assumption that could be wrong — and names that assumption explicitly. A Solution's confidence is aggregated from its Tests, so it is only as strong as the assumptions those Tests actually probed; an untested Solution is Low no matter how appealing the idea.

Good confidence tagging is not hedging everything. It is discriminating. An agent that adds "I'm not certain" to every sentence has not tagged confidence — it has performed humility without substance. The goal is accurate calibration: high confidence where evidence is strong, explicit uncertainty where it isn't, and clear statements of what additional data would upgrade or downgrade the signal. A well-tagged cluster might read: "This pattern appears in 9 of 11 interviews across three different customer segments — high confidence. The 'lack of visibility into status' framing is the agent's synthesis, not a verbatim user phrase — medium confidence on the exact framing."

The agent must also tag confidence on its own prior conclusions when new evidence arrives, and propagate the change up the tree. If an Opportunity tagged high-confidence at 10 interviews starts looking different at 20, the agent should update its tag — not silently, but explicitly, noting what changed and which Solutions, KR forecasts, and Outcome-health calls depend on it. A Test result that lowers a Solution's confidence should update the KR forecast, and sustained KR movement (or its absence) should update Outcome health and, over time, whether the Opportunity is pursuing, sustained, or retired. Confidence is not a one-time stamp; it is a running assessment that evolves as evidence accumulates.

## Why It Matters

PMs make prioritization decisions — which Opportunities to pursue, which Tests to run, which Solutions to kill — on the basis of evidence that agents synthesize. If the agent presents a prioritized list without any confidence differentiation, the PM has no way to weight the options appropriately. A well-evidenced Opportunity and a barely-inferred one look identical on paper. The PM will either over-invest in weak signals or under-invest in strong ones, and they won't know which error they're making until it's too late.

The consequence extends to team credibility. When a PM presents an Opportunity to engineering or leadership and it falls apart under scrutiny — because it was based on two interviews the agent over-weighted — the trust in the entire discovery workflow erodes. Confidence tagging is a form of risk disclosure. It lets the PM decide when to act on imperfect evidence and when to wait for more, rather than having the agent make that judgment implicitly by presenting weak evidence as though it were strong.

Separating the levels matters just as much. A strongly evidenced Opportunity whose only Solution is untested is not a strong bet, and a KR that has moved while every Solution beneath it is Low confidence may be moving for reasons the team doesn't control. Without per-level tags, the PM reads one blended impression ("this area looks solid") and cannot see which level is carrying the risk.

There is also a second-order effect on agent improvement. A system that tags confidence creates a feedback loop: when a high-confidence tag turns out to be wrong, there is a specific claim to investigate. When a low-confidence tag turns out to be right, the agent learns something about what signal types it tends to underweight. Without explicit tagging, the agent's calibration cannot improve because there is nothing concrete to evaluate against.

## What Good Looks Like

**Poor output (no confidence tagging):**
> Opportunity: Users struggle to understand where their request is in the workflow. This is a high-priority Opportunity based on interview synthesis.

No indication of how many interviews, whether this is a direct quote or an inference, what confidence level applies, or what would change the assessment.

**Good output (confidence tagged, Opportunity level):**
> **OPP-3 (draft):** Users lose trust in the product when they can't tell whether their request is being processed or has stalled.
>
> **Evidence base:** 7 of 10 interviews (Sessions 3, 4, 5, 7, 8, 9, 10) surface this theme. Direct quotes anchor the "trust" framing — this is not a synthesis invention. Support ticket analysis adds 14 corroborating tickets tagged "status confusion" in Q1.
>
> **Confidence: Medium-High.** The pattern is consistent and cross-source. Confidence is not "High" because all interviews were conducted with small-team customers — we have no large-account signal on this yet. If large-account interviews show the same pattern, upgrade to High.
>
> **What would change this:** A cohort analysis showing status-confusion users don't actually churn at higher rates would lower the urgency of this Opportunity even if the problem is real.

**Good output (confidence tagged across the tree):**
> **OUT-1 health: Amber, Medium confidence.** Customers act on request status without contacting support.
>
> - **OUT-1-KR-1** (support contacts about request status per 100 requests: 14 → 7 by end of cycle). Latest reading 11, taken on a 4-week window from the support system. Reading confidence: Medium-High (consistent method; the baseline was reconstructed from ticket tags, not instrumented).
> - **SOL-5** (in-product status timeline) — **Solution confidence: Medium.** One Test (TST-8) supported the riskiest assumption (users who see a timeline stop asking for status: 38 of 50 prototype users did not contact support, against a pre-set bar of 35). The second assumption, that the timeline can be populated accurately for slow requests, is untested. Upgrade to Medium-High if TST-9 passes.
> - **SOL-6** (status emails) — **Solution confidence: Low.** No Test has run.
> - **Rolled up:** the Opportunity (OPP-3) stays at Medium-High; the KR is moving in the right direction but one reading does not yet separate the effect of SOL-5 from seasonal ticket volume. Outcome health is Amber until a second reading confirms the trend.

The second and third versions give the PM everything they need to calibrate their own judgment, at the level where the risk actually sits.

## Failure Modes

**Uniform high confidence.** Agent presents every cluster, every Opportunity, and every recommendation with the same implicit certainty. The PM cannot distinguish signal from noise. Over time, they stop trusting the agent's outputs because there is no calibration to anchor trust to.

**Uniform hedging.** Agent adds "this is preliminary" or "more research needed" to everything. The tags carry no information because they never differentiate. A PM who sees every output hedged the same way starts ignoring the hedges.

**Confidence tagging evidence quantity without evidence quality.** Agent says "based on 12 interviews" but doesn't flag that 10 of those interviews were conducted by the same researcher using leading questions, or that all 12 came from users who'd already churned. Volume is not quality. Good tagging addresses both.

**Missing "what would change this."** The agent tags uncertainty without giving the PM a path to resolve it. "Medium confidence" is useful; "medium confidence — here is what would make it high" is actionable. Stopping at the tag without the upgrade path is an incomplete output.

**Retrograde confidence decay without update.** An Opportunity was tagged high-confidence in March based on 15 interviews. It's now June and 5 new interviews have surfaced contradicting signals. The agent continues referencing the March tag without updating it. Confidence tags must be living assessments, not historical footnotes.

**Blending levels into one tag.** The agent reports "high confidence" for an area because the Opportunity evidence is strong, while its Solutions are untested and its KR has a single noisy reading. Each level gets its own tag, and a rolled-up statement must name which level limits it.

**Putting evidence tags on KRs, or Test-less confidence on Solutions.** Raw signals are attached to a KR as if they measured it, or a Solution is tagged Medium because the idea "feels right." KR tags describe the measurement; Solution confidence comes from Test results. If there is no Test, the tag is Low and says so.

## How to Evaluate It

**Test 1 — Thin evidence prompt.** Give the agent 2 user interviews and ask it to synthesize Opportunities. Evaluate: does it flag the thin evidence base explicitly? Does it distinguish direct quotes from inference? Does it identify what more data is needed?

**Test 2 — Mixed-quality corpus prompt.** Give the agent a corpus that includes 8 interviews from churned users and 2 from active users. Ask for an Opportunity synthesis. Does it flag the sampling skew? Does its confidence tags reflect the uneven distribution?

**Test 3 — Prior contradiction prompt.** Show the agent a previously tagged high-confidence Opportunity, then give it 3 new interviews that partially contradict it. Does it update the confidence tag? Does it explain what changed and why, and name the Solutions and Outcome health that depend on it?

**Test 4 — Assumption tagging prompt.** Ask the agent to generate a Test brief for a Solution. After it outputs the brief, ask: "Which parts of this brief depend on assumptions that could be wrong?" Evaluate: does it identify specific assumptions vs. generic hedges? Does it tag which assumptions are high-risk vs. low-risk?

**Test 5 — Calibration challenge.** Ask the agent: "What's your confidence in the top Opportunity in this tree, and what's the single piece of evidence that would most change your view?" Evaluate whether the answer is specific and falsifiable or vague and unfalsifiable.

**Test 6 — Roll-up integrity.** Give the agent a Solution with one passing Test, a KR with a single reading, and a well-evidenced parent Opportunity. Ask for Solution confidence and Outcome health. Pass: the Solution is rated from its Test coverage, the KR reading is rated on its measurement, and the roll-up names the weakest level. Fail: one blended "High".

## How to Develop It

**Build a confidence vocabulary into system prompts.** Define specific tiers per level. For Opportunities: High (5+ independent sources, direct quotes, cross-validated), Medium (3-4 sources, mix of direct and inferred, single channel), Low (1-2 sources, mostly inferred, unvalidated). For Solutions: High (riskiest assumption passed a Test with pre-set criteria and a second Test or a rollout reading agrees), Medium (riskiest assumption passed one Test), Low (no Test, or Tests inconclusive). For KR readings: reliable (instrumented, enough sample, baseline recorded), provisional (reconstructed baseline or thin sample), unknown (baseline `TBD`). Give the agent examples of each tier so it can self-classify rather than improvise.

**Add an evidence ledger requirement.** Require the agent to produce an evidence ledger alongside every synthesis: a table mapping each claim to its source count, source type, and confidence tier, and listing the Solutions and Tests each Opportunity's evidence bears on. This makes confidence tagging structural rather than optional.

**Prompt for the "upgrade path" explicitly.** In system prompts, add: "For every medium or low-confidence claim, state what additional evidence or Test result would upgrade it to the next tier." This forces the agent to operationalize uncertainty rather than just label it.

**Run calibration retrospectives.** After Tests produce results and KR readings land, go back to the Opportunity and Solution that were tagged with confidence levels before the Test. Compare the prediction to the outcome. Track calibration over time — is the agent overconfident, underconfident, or well-calibrated on specific signal types and at specific levels of the tree?

**Use forced ranking prompts to surface implicit confidence.** Ask the agent: "If you had to rank these three Solutions under this KR by how much additional testing would change your view of them, what order would you put them in and why?" This surfaces implicit confidence differentials even when the agent hasn't tagged them explicitly.

## Sample Prompts

**Prompt 1 — Synthesis with tagging built in:**
> "Synthesize Opportunities from the attached interviews. For each Opportunity, include: (1) the evidence base (number of sessions, direct quote vs. inference, source diversity), (2) a confidence tier (High / Medium / Low) with justification, and (3) one specific piece of additional evidence that would move the confidence tier up or down."

**Prompt 2 — Retroactive confidence audit:**
> "Here is our current tree with Opportunities and their confidence levels from last quarter. Here are the 8 new interview transcripts from this quarter. For each Opportunity: confirm, downgrade, or upgrade the confidence tag, and explain what changed. For every downgrade or upgrade, list the Solutions, KR forecasts, and Outcome-health calls that depend on it and whether they move. Flag any new signals that don't map to existing Opportunities."

**Prompt 3 — Assumption-level tagging:**
> "Here is a proposed Solution. Decompose it into its key assumptions. For each assumption: tag its current confidence level, identify the evidence supporting it, and name the single Test or data point that would most effectively test it. Then give the Solution's overall confidence, aggregated from the Tests that exist."

**Prompt 4 — Tree roll-up:**
> "For OUT-1, give me confidence at each level: the Opportunity, each Solution, each KR reading, and the Outcome's health. Name the weakest level and the single result that would most improve it."

## Connected Skills

[[Epistemic Self-Awareness]] — the meta-skill that makes confidence tagging self-correcting rather than mechanical
[[Signal Clustering]] — where confidence tags are first assigned at the pattern level
[[Evidence Attribution]] — the traceability practice that makes confidence tags auditable
[[Contradiction Detection]] — surfaces the evidence that should trigger confidence downgrades
[[Longitudinal Pattern Tracking]] — the context in which confidence tags need to be updated over time
[[Bias Detection]] — identifies systematic reasons why a confidence tag might be inflated
[[Escalation Calibration]] — uses confidence tags as one input to the act-and-report vs. ask-first decision
[[Assumption Decomposition]] — the practice of making confidence visible at the assumption level
