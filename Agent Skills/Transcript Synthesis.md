# Transcript Synthesis

> The skill of extracting customer needs, pains, and desires from interview transcripts — preserving verbatim evidence, distinguishing surface complaint from underlying need, and mapping signals to the Loop tree (Opportunities first, Solutions and Tests where a signal is specific to them) without forcing them.

**Layer:** 1 — Synthesis & Signal Processing
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Transcript synthesis is the entry point for all customer-grounded PM work. It is the process of reading a raw interview transcript and producing a structured set of signals — needs, pains, desires, and behaviors — that can inform, update, or challenge the current Loop tree (see the [Loop structure guide](../guides/the-loop.md)). In an agentic context, the agent reads the transcript, identifies signal-bearing moments, and outputs a structured synthesis document that a PM can review and act on without having to re-read every word of the source.

The skill has three distinct sub-tasks that agents routinely conflate. The first is observation: identifying the specific moments in a transcript where a customer reveals something meaningful about their experience, behavior, or unmet need. This requires recognizing signal in natural language — not every sentence is signal-bearing, and the ones that are often don't announce themselves. The second is preservation: capturing what the customer actually said, in their actual words, before any interpretation happens. The third is interpretation: offering a reading of what the observation might mean for the tree — with that interpretation clearly separated from the raw quote, and held with appropriate tentativeness.

An agent that conflates these three steps produces synthesis that sounds clean but is epistemically unreliable. When a customer says "I end up just texting my colleague because I can't find anything in the tool," a weak synthesis produces: "Customer finds the tool difficult to use." A strong synthesis preserves the verbatim quote, notes the workaround behavior (texting a colleague), and offers a reading: "This may map to the existing 'search friction' Opportunity, or could indicate a separate Opportunity around collaboration gaps. Needs more signal before branching." The difference is the difference between data and interpretation, and between a synthesis that a PM can trust and one they have to verify.

The fourth and most tree-specific sub-task is mapping: deciding where a signal belongs, whether it strengthens an existing Opportunity, weakens one, or suggests a gap. Mapping follows the evidence rules of the hierarchy. Signals attach to **Opportunities** (`OPP-n`), the root level. When a signal is specifically about a candidate Solution (`SOL-n`) — a reaction to an idea, a workaround that bears on one of its assumptions — or about a Test (`TST-n`) already running, it attaches there as well. Signals never attach to Key Results or Outcomes; those are measured and parented, not evidenced by quotes. This is where agents fail most consequentially. Under pressure to produce tidy output, an agent will force a signal into the nearest existing category rather than holding it as unmapped. But forcing premature categorization collapses the exact nuance that makes discovery valuable. Good synthesis distinguishes "this signal clearly extends the existing Opportunity" from "this signal doesn't fit cleanly anywhere yet — holding it for now."

## Why It Matters

Transcript synthesis is the primary mechanism by which customer reality enters the product system. If an agent synthesizes poorly — paraphrasing instead of quoting, interpreting before observing, forcing signals into existing categories — the corruption is invisible downstream. The tree will look well-evidenced because every Opportunity has quotes attached to it. But those quotes have been laundered through interpretation. The PM is making decisions based on what the agent thought the customer meant, not what the customer said. This is more dangerous than having no synthesis at all, because it carries the false confidence of documentation, and every Outcome, KR, Solution, and Test beneath a corrupted Opportunity inherits the flaw.

The core discipline this skill enforces is the separation of evidence from interpretation. Teresa Torres is explicit about this: the job in discovery is to hear what customers say, observe what they do, and notice the gap between the two — before making any claims about what they need. An agent that shortcuts directly to interpretation collapses that gap and makes the PM's job harder, not easier. The PM's leverage in the system comes from exercising judgment on top of solid evidence. If the evidence is already pre-digested, the PM is reviewing conclusions, not data.

A PM who cannot trust their synthesis layer is a PM who reads every transcript themselves. At that point, the agent is not accelerating discovery — it's adding an extra step. Good transcript synthesis earns the PM's trust so that they can genuinely delegate the reading without delegating the judgment. That requires the agent to be transparent about what it found, what it interpreted, and how confident it is in the mapping — in every output, not just when asked. The agent records its synthesis and reports it; it does not wait for sign-off before writing the observations down, and it does not decide for the PM what an ambiguous signal means.

## What Good Looks Like

**Weak synthesis output:**

> The user finds onboarding confusing and wants better documentation. They mentioned that it takes too long to get started. This maps to the "time-to-value" Opportunity in the tree.

Problems: No verbatim quote. "Confusing" and "too long" are the agent's words, not the customer's. The mapping is asserted, not offered tentatively. No indication of which part of the transcript this came from.

**Strong synthesis output:**

> **Signal: Onboarding / getting started**
>
> *Verbatim:* "I literally opened it twice in the first week and then just... closed it. I didn't know where to start so I went back to what I knew."
>
> *Observation:* Customer abandoned the product in early usage and reverted to prior tool. No specific complaint about documentation — the issue appears to be orientation, not instruction.
>
> *Tentative mapping:* May relate to OPP-8 "time-to-value" [weak fit — that Opportunity is currently framed around setup steps, not orientation anxiety]. May warrant a new Opportunity around "first session context" or similar. Not specific to any candidate Solution or running Test. Holding as unmapped pending more signal.
>
> *Confidence:* Low-medium. Single source. Behavior is informative (abandonment + reversion) but underlying cause is inferred.

The strong version gives the PM everything they need to evaluate the signal themselves: the exact words, a behavioral observation, a mapping suggestion with a fit assessment and the right attachment level, and a confidence level. The PM does not have to trust the agent's interpretation — they can see the evidence and form their own view.

## Failure Modes

**Paraphrase substitution.** The agent writes "customer expressed frustration with X" where X is the agent's label for what it heard, not the customer's word for it. The PM later uses "frustration with X" in a stakeholder update, and the original customer language — which was more specific, or more interesting — is lost.

**Interpretation without separation.** The agent writes: "This confirms the search friction Opportunity." No quote. No observation. Just an assertion that the new signal matches the existing tree. The PM has no way to evaluate whether the mapping is correct without going back to the transcript.

**Premature tree commitment.** Every signal gets mapped to an existing Opportunity, even signals that don't fit cleanly. Over time, this makes the tree look fully covered when in fact it has systematic blind spots — gaps that were never held open long enough to become visible.

**Missing the level a signal bears on.** The agent attaches a customer's reaction to one specific candidate Solution only to the Opportunity, so that Solution's assumptions look unevidenced; or it files an interview quote under a Key Result because the customer happened to mention the metric. Evidence goes to the Opportunity, and to the Solution or Test it is specifically about, never to a KR.

**Missing the underlying need.** A customer says "I need a way to export to PDF." The agent records: "Customer requested PDF export." But the customer also said, three turns earlier, "My boss always asks me to email reports from meetings." The underlying need — credibility with leadership, or a reporting workflow — gets lost because the agent fixated on the solution request rather than the problem context. The request itself is worth keeping, as a signal about a candidate Solution; the need is what the Opportunity is built from.

**Over-synthesis.** The agent reads a two-hour transcript and produces three bullets. The compression ratio is so high that the PM cannot reconstruct what the interview actually contained. Individual voices become invisible behind the summary.

**Confidence laundering.** A single interview produces a set of signals that the agent presents with no uncertainty flags. The PM treats them as established findings. One interview is not a pattern — every single-source signal should carry an explicit marker to that effect.

## How to Evaluate It

**Test 1 — Paraphrase detection.** Give the agent a transcript where a customer uses an unusual, specific phrase (e.g., "I feel like I'm flying blind after the handoff"). Ask the agent to synthesize. Check whether the verbatim phrase appears in the output or whether it's been replaced with a generic label ("customer feels uninformed"). An agent that substitutes its own language for the customer's has failed at the first task.

**Test 2 — Fit assessment.** Give the agent a transcript containing a signal that doesn't fit any existing Opportunity. Check whether the agent (a) maps it to the nearest existing category anyway, (b) holds it as unmapped, or (c) flags it as a potential new Opportunity with appropriate tentativeness. Only (b) or (c) is acceptable.

**Test 3 — Underlying need extraction.** Give the agent a transcript where a customer makes a feature request early in the conversation but reveals a different underlying need later. Check whether the synthesis captures the feature request, the underlying need, or both. A well-synthesized output will capture both, distinguish them, note that the underlying need is the more useful signal for the Opportunity, and attach the request to the candidate Solution it concerns, if any.

**Test 4 — Confidence calibration.** Give the agent a single interview with strong signal on one topic and weak, ambiguous signal on another. Ask it to synthesize. Check whether the confidence levels attached to the two clusters differ appropriately, or whether both are presented with the same level of assertion.

**Test 5 — Attachment level.** Give the agent a transcript in which the customer describes a current pain, reacts to one named candidate Solution, and comments on a number the team tracks. Check that the pain is mapped to an Opportunity, the reaction to the Solution (and its Opportunity), and that nothing is attached to a Key Result.

**Test 6 — Source traceability.** Ask the agent to produce a synthesis with a "source" field or timestamp reference for each signal. Then pull three signals at random and verify them against the transcript. If the agent cannot trace its outputs to specific moments in the source material, the synthesis is not trustworthy.

## How to Develop It

**Prompt for observation before interpretation.** Structure the synthesis prompt in two explicit phases: "First, identify and quote the specific moments in this transcript where the customer reveals something meaningful. Do not interpret yet — just quote and describe what happened." Then: "Now, for each quote you identified, offer a tentative interpretation and a mapping suggestion." Forcing the separation in the prompt prevents the agent from collapsing the steps.

**Require verbatim quotes as a structural constraint.** Do not let the agent produce a synthesis that contains no direct quotes. Make it a hard requirement: "Every signal must include at least one verbatim quote from the transcript. Do not paraphrase." Agents will comply with explicit structural constraints more reliably than they'll internalize abstract principles.

**Teach confidence tiers explicitly.** Define them in the system prompt: "Strong: 3+ independent sources. Medium: 2 sources, or 1 source with corroborating behavioral evidence. Weak: single source, no corroborating evidence. Unmapped: signal doesn't fit an existing Opportunity, holding for pattern development." Ask the agent to tag every output with a tier, and review the tier assignments as part of your quality check.

**Use red-team prompts after synthesis.** After the agent produces a synthesis, follow up with: "Now review your output. Which signals are you most uncertain about? Which tree mappings are weakest? What are you most at risk of having gotten wrong?" This builds a self-critique habit that surfaces the failures the PM would otherwise catch on review.

**Build a feedback loop with real transcripts.** Run the agent's synthesis against transcripts you've already read yourself. Note every case where the agent missed a signal, over-interpreted, or forced a mapping. Use specific examples — not "you over-interpreted here" but "you wrote 'customer frustrated with documentation' but the actual quote was about not knowing where to start, which is an orientation issue, not a documentation issue." Specific feedback on specific failures is what builds the capability.

## Sample Prompts

**Synthesis prompt:**

```
You are synthesizing a customer interview transcript for a product team using the Loop hierarchy (Opportunity → Outcome → Key Result → Solution → Test).

Your job has four steps, in this order:
1. OBSERVE: Identify the specific moments in the transcript where the customer reveals a need, pain, behavior, or desire. Quote verbatim.
2. SEPARATE: For each quote, describe what happened without interpreting it yet — just describe the observable behavior or statement.
3. INTERPRET: Offer a tentative reading of what each signal might mean for the product.
4. MAP: For each signal, suggest which existing Opportunity (OPP-n) it might relate to, how confident you are in that mapping, and whether it might indicate a gap in the current tree. If a signal is specifically about a candidate Solution (SOL-n) or a running Test (TST-n), say so; it attaches there as well.

Rules:
- Every signal must include at least one verbatim quote.
- Never substitute your own language for the customer's.
- If a signal doesn't fit cleanly into any existing Opportunity, mark it [UNMAPPED] and hold it.
- Never attach a signal to an Outcome or a Key Result.
- Tag every signal with a confidence level: Strong / Medium / Weak / Unmapped.
- Distinguish what the customer said from what they did from what you infer they need.

Current Opportunities (and any Solutions or Tests in play): [PASTE TREE HERE]
Transcript: [PASTE TRANSCRIPT HERE]
```

**Mapping challenge prompt:**

```
Review the synthesis you just produced. For each tree mapping you suggested:
- Is the fit strong, moderate, or forced?
- What evidence from the transcript supports the mapping?
- What would make you more confident in the mapping?
- Is there any reading of the signal that would point to a different Opportunity?
- Is the signal attached at the right level (Opportunity, and Solution or Test only if specifically about one)?

Flag any mappings you'd call "weakest" and explain why.
```

**Underlying need extraction prompt:**

```
Read this transcript and identify any moments where the customer requests a specific solution or feature. For each request:
1. Quote the request verbatim.
2. Look back through the transcript for any context about why they want it — what problem they're trying to solve, what outcome they're seeking.
3. Write an Opportunity statement in customer voice that captures the underlying need, not the requested solution.
4. Note if the underlying need is unclear — don't force it.
5. Note which candidate Solution, if any, the request bears on.
```

## Connected Skills

[[Signal Clustering]] — Transcript synthesis produces individual signals; clustering aggregates them across multiple transcripts into Opportunity themes, the root level of the tree.

[[Contradiction Detection]] — Synthesis should flag when a new signal challenges an existing Opportunity framing or Solution assumption; this is only possible if synthesis preserves the evidence clearly enough to compare.

[[Evidence Attribution]] — Every Opportunity in the tree should trace back to specific synthesis outputs, as should any Solution or Test evidence; this skill is what makes attribution possible.

[[Longitudinal Pattern Tracking]] — Synthesis produces the dated signal records that longitudinal tracking operates on across cycles.

[[Confidence Tagging]] — Synthesis is where confidence levels first get assigned; they propagate through clustering and into the tree.

[[Bias Detection]] — Synthesis is where corpus gaps first become visible — if all your transcripts are from churned users, synthesis is where that should be flagged.

[[Epistemic Self-Awareness]] — The meta-skill that underlies good synthesis: knowing the difference between what you observed and what you concluded.

The `loop-workflow` skill covers the Loop tree, and is where synthesized signals are registered once mapped.
