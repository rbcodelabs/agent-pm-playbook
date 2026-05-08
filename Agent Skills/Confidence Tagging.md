# Confidence Tagging

> The practice of explicitly signaling what the agent is certain about, uncertain about, and what evidence would change its conclusion — attached to every substantive output.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Confidence tagging is the discipline of making epistemic state visible. Every synthesis, cluster, opportunity draft, experiment brief, or recommendation the agent produces carries an implicit claim about how reliable that output is. Confidence tagging makes that claim explicit rather than leaving the PM to guess whether a pattern is built on 30 data points or 3. It transforms vague outputs into calibrated ones.

The skill operates at multiple levels. At the evidence level, the agent tags how much signal backs a given conclusion: number of sources, source diversity, recency, and whether the signal is direct (a user said this verbatim) or inferred (the agent read between the lines). At the inference level, the agent flags when it is making an interpretive leap vs. reporting something unambiguous. At the assumption level, the agent identifies which parts of an output depend on an assumption that could be wrong — and names that assumption explicitly.

Good confidence tagging is not hedging everything. It is discriminating. An agent that adds "I'm not certain" to every sentence has not tagged confidence — it has performed humility without substance. The goal is accurate calibration: high confidence where evidence is strong, explicit uncertainty where it isn't, and clear statements of what additional data would upgrade or downgrade the signal. A well-tagged cluster might read: "This pattern appears in 9 of 11 interviews across three different customer segments — high confidence. The 'lack of visibility into status' framing is the agent's synthesis, not a verbatim user phrase — medium confidence on the exact framing."

The agent must also tag confidence on its own prior conclusions when new evidence arrives. If a cluster that was tagged high-confidence at 10 interviews starts looking different at 20, the agent should update its tag — not silently, but explicitly, noting what changed. Confidence is not a one-time stamp; it is a running assessment that evolves as evidence accumulates.

## Why It Matters

PMs make prioritization decisions — which opportunities to pursue, which experiments to run, which solutions to kill — on the basis of evidence that agents synthesize. If the agent presents a prioritized opportunity list without any confidence differentiation, the PM has no way to weight the options appropriately. A well-evidenced opportunity and a barely-inferred one look identical on paper. The PM will either over-invest in weak signals or under-invest in strong ones, and they won't know which error they're making until it's too late.

The consequence extends to team credibility. When a PM presents an opportunity to engineering or leadership and it falls apart under scrutiny — because it was based on two interviews the agent over-weighted — the trust in the entire discovery workflow erodes. Confidence tagging is a form of risk disclosure. It lets the PM decide when to act on imperfect evidence and when to wait for more, rather than having the agent make that judgment implicitly by presenting weak evidence as though it were strong.

There is also a second-order effect on agent improvement. A system that tags confidence creates a feedback loop: when a high-confidence tag turns out to be wrong, there is a specific claim to investigate. When a low-confidence tag turns out to be right, the agent learns something about what signal types it tends to underweight. Without explicit tagging, the agent's calibration cannot improve because there is nothing concrete to evaluate against.

## What Good Looks Like

**Poor output (no confidence tagging):**
> Opportunity: Users struggle to understand where their request is in the workflow. This is a high-priority opportunity based on interview synthesis.

No indication of how many interviews, whether this is a direct quote or an inference, what confidence level applies, or what would change the assessment.

**Good output (confidence tagged):**
> **Opportunity (draft):** Users lose trust in the product when they can't tell whether their request is being processed or has stalled.
>
> **Evidence base:** 7 of 10 interviews (Sessions 3, 4, 5, 7, 8, 9, 10) surface this theme. Direct quotes anchor the "trust" framing — this is not a synthesis invention. Support ticket analysis adds 14 corroborating tickets tagged "status confusion" in Q1.
>
> **Confidence: Medium-High.** The pattern is consistent and cross-source. Confidence is not "High" because all interviews were conducted with SMB customers — we have no enterprise signal on this yet. If enterprise interviews show the same pattern, upgrade to High.
>
> **What would change this:** A cohort analysis showing status-confusion users don't actually churn at higher rates would lower the urgency of this opportunity even if the problem is real.

The second version gives the PM everything they need to calibrate their own judgment.

## Failure Modes

**Uniform high confidence.** Agent presents every cluster, every opportunity, and every recommendation with the same implicit certainty. The PM cannot distinguish signal from noise. Over time, they stop trusting the agent's outputs because there is no calibration to anchor trust to.

**Uniform hedging.** Agent adds "this is preliminary" or "more research needed" to everything. The tags carry no information because they never differentiate. A PM who sees every output hedged the same way starts ignoring the hedges.

**Confidence tagging evidence quantity without evidence quality.** Agent says "based on 12 interviews" but doesn't flag that 10 of those interviews were conducted by the same researcher using leading questions, or that all 12 came from users who'd already churned. Volume is not quality. Good tagging addresses both.

**Missing "what would change this."** The agent tags uncertainty without giving the PM a path to resolve it. "Medium confidence" is useful; "medium confidence — here is what would make it high" is actionable. Stopping at the tag without the upgrade path is an incomplete output.

**Retrograde confidence decay without update.** An opportunity was tagged high-confidence in March based on 15 interviews. It's now June and 5 new interviews have surfaced contradicting signals. The agent continues referencing the March tag without updating it. Confidence tags must be living assessments, not historical footnotes.

## How to Evaluate It

**Test 1 — Thin evidence prompt.** Give the agent 2 user interviews and ask it to synthesize opportunities. Evaluate: does it flag the thin evidence base explicitly? Does it distinguish direct quotes from inference? Does it identify what more data is needed?

**Test 2 — Mixed-quality corpus prompt.** Give the agent a corpus that includes 8 interviews from churned users and 2 from active users. Ask for an opportunity synthesis. Does it flag the sampling skew? Does its confidence tags reflect the uneven distribution?

**Test 3 — Prior contradiction prompt.** Show the agent a previously tagged high-confidence cluster, then give it 3 new interviews that partially contradict it. Does it update the confidence tag? Does it explain what changed and why?

**Test 4 — Assumption tagging prompt.** Ask the agent to generate an experiment brief for a solution. After it outputs the brief, ask: "Which parts of this brief depend on assumptions that could be wrong?" Evaluate: does it identify specific assumptions vs. generic hedges? Does it tag which assumptions are high-risk vs. low-risk?

**Test 5 — Calibration challenge.** Ask the agent: "What's your confidence in the top opportunity on this OST, and what's the single piece of evidence that would most change your view?" Evaluate whether the answer is specific and falsifiable or vague and unfalsifiable.

## How to Develop It

**Build a confidence vocabulary into system prompts.** Define specific tiers: High (5+ independent sources, direct quotes, cross-validated), Medium (3-4 sources, mix of direct and inferred, single channel), Low (1-2 sources, mostly inferred, unvalidated). Give the agent examples of each tier so it can self-classify rather than improvise.

**Add an evidence ledger requirement.** Require the agent to produce an evidence ledger alongside every synthesis: a table mapping each claim to its source count, source type, and confidence tier. This makes confidence tagging structural rather than optional.

**Prompt for the "upgrade path" explicitly.** In system prompts, add: "For every medium or low-confidence claim, state what additional evidence would upgrade it to the next tier." This forces the agent to operationalize uncertainty rather than just label it.

**Run calibration retrospectives.** After experiments produce results, go back to the opportunity and solution that were tagged with confidence levels before the experiment. Compare the prediction to the outcome. Track calibration over time — is the agent overconfident, underconfident, or well-calibrated on specific signal types?

**Use forced ranking prompts to surface implicit confidence.** Ask the agent: "If you had to rank these three opportunities by how much additional research would change your view of them, what order would you put them in and why?" This surfaces implicit confidence differentials even when the agent hasn't tagged them explicitly.

## Sample Prompts

**Prompt 1 — Synthesis with tagging built in:**
> "Synthesize opportunities from the attached interviews. For each opportunity, include: (1) the evidence base (number of sessions, direct quote vs. inference, source diversity), (2) a confidence tier (High / Medium / Low) with justification, and (3) one specific piece of additional evidence that would move the confidence tier up or down."

**Prompt 2 — Retroactive confidence audit:**
> "Here is our current OST with opportunities and their confidence levels from last quarter. Here are the 8 new interview transcripts from this quarter. For each opportunity: confirm, downgrade, or upgrade the confidence tag, and explain what changed. Flag any new signals that don't map to existing opportunities."

**Prompt 3 — Assumption-level tagging:**
> "Here is a proposed solution. Decompose it into its key assumptions. For each assumption: tag its current confidence level, identify the evidence supporting it, and name the single experiment or data point that would most effectively test it."

## Connected Skills

[[Epistemic Self-Awareness]] — the meta-skill that makes confidence tagging self-correcting rather than mechanical
[[Signal Clustering]] — where confidence tags are first assigned at the pattern level
[[Evidence Attribution]] — the traceability practice that makes confidence tags auditable
[[Contradiction Detection]] — surfaces the evidence that should trigger confidence downgrades
[[Longitudinal Pattern Tracking]] — the context in which confidence tags need to be updated over time
[[Bias Detection]] — identifies systematic reasons why a confidence tag might be inflated
[[Escalation Calibration]] — uses confidence tags as one input to the proceed-vs-ask decision
[[Assumption Decomposition]] — the practice of making confidence visible at the assumption level
