# Contradiction Detection

> The skill of recognizing when new evidence directly conflicts with an existing OST assumption, opportunity framing, or solution hypothesis — and surfacing that conflict explicitly rather than silently absorbing the signal into the existing tree.

**Layer:** 1 — Synthesis & Signal Processing
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Contradiction detection is the discipline of holding the existing OST in active memory and comparing every new signal against it — not just to find where the signal fits, but to notice where it doesn't fit, and to name that non-fit explicitly. An agent that only adds to the OST and never challenges it is not a discovery partner. It is a confirmation machine. It makes the tree look well-evidenced while gradually decoupling it from what customers actually experience.

The skill requires three things simultaneously. First, the agent must hold a representation of the current OST — not just as a list of opportunities, but as a set of implicit claims. Every opportunity node in the tree asserts something: "customers care about X," "this is a meaningful pain," "the intensity of this need is high enough to warrant investment." Every solution node asserts something: "this approach addresses the underlying need," "customers would find this usable." Every assumption in an experiment brief asserts something about how customers behave or what they value. These are all falsifiable claims, and they are all subject to being contradicted by new evidence.

Second, the agent must compare each new signal against those claims at the right level of abstraction. A signal that contradicts a specific assumption is not the same as a signal that contradicts the entire opportunity. A customer saying "I actually don't mind the current export process" contradicts the assumption that the pain is universal, but may not invalidate the opportunity if other signals show it affects a specific segment acutely. Good contradiction detection is precise about what exactly is being contradicted and to what degree.

Third, and most critically, the agent must surface the contradiction explicitly rather than silently resolving it. The most common failure is for an agent to encounter a contradicting signal and simply not map it anywhere — it gets absorbed into the "doesn't fit" pile without the PM being told that it contradicts something specific in the current tree. Or worse, the agent re-frames the contradicting signal slightly so that it doesn't appear to contradict anything. Neither of these is the agent's job. The job is to say: "This signal appears to conflict with the current framing of the 'export friction' opportunity. Here is the specific conflict. The PM should decide how to interpret this."

Contradiction detection is an active discipline, not a passive filter. The agent should be looking for contradictions, not just noticing them when they're obvious. This means the agent needs a mental model of where the OST is most vulnerable — which opportunities have thin evidence, which assumptions are strong claims, which solution hypotheses rest on a small number of supporting signals. Those are the places where a single contradicting signal is most consequential.

## Why It Matters

An OST that is never challenged becomes a record of what the team believed at the time they built it, not a model of current customer reality. The default behavior of most PM systems — human and agentic — is additive: new signals get added to existing opportunities, strengthening them over time. But customer reality changes, and early assumptions get disproved. Without an active contradiction detection mechanism, the OST becomes increasingly confident about things that are increasingly wrong.

The specific failure this skill prevents is false confidence. When a PM looks at an opportunity with eight supporting signals, they read it as strong evidence. They don't see the three contradicting signals that were silently absorbed or dropped during synthesis. They prioritize the opportunity, start designing experiments, maybe build something — and then the contradicting evidence shows up as customer feedback on the shipped feature. Contradiction detection is the mechanism that would have surfaced those signals earlier and cheaper.

There is also a more subtle organizational cost. In empowered teams, the PM's authority rests on the quality of their discovery. When an opportunity they championed turns out to be based on a biased or incomplete reading of the evidence, the team's confidence in the discovery process — and in the PM — is damaged. A PM whose agent catches contradictions and surfaces them proactively is a PM who can say "we considered the counter-evidence" even when the final call doesn't change. That's a meaningfully different position than being surprised by the contradiction post-launch.

## What Good Looks Like

**Weak contradiction handling:**

The agent adds a new signal to the "notification preferences" opportunity cluster. The customer said they "don't really care about email notifications." The agent files this under "notification preferences" with no flag. The opportunity now has 10 signals, one of which directly contradicts the framing, but the PM can't tell.

**Strong contradiction detection output:**

> **Contradiction flagged — "Notification Preferences" opportunity**
>
> *New signal:* "Honestly I turn off all notifications in every app. I'd rather check things on my own schedule." [Interview, User D, 2026-04-22]
>
> *Existing OST claim being challenged:* The "notification preferences" opportunity is currently framed as: "I miss important updates because I don't have control over which notifications I receive." This framing assumes customers want better notification control, not fewer notifications.
>
> *Nature of the contradiction:* The new signal challenges the framing at the level of the underlying desire. User D doesn't want better notification control — they want no notifications. This is a different need (or the absence of a need) that the current opportunity framing doesn't accommodate.
>
> *Degree:* Moderate. This is one signal against an existing medium-confidence opportunity (3 prior sources). It doesn't invalidate the opportunity but it suggests the opportunity statement may be too broad — it's capturing at least two different customer orientations: "I want better control" and "I want to opt out entirely."
>
> *Recommendation for PM:* Consider whether this is (a) a different segment's response and the opportunity holds for a different user type, (b) evidence that the opportunity should be split, or (c) a signal that the existing framing is wrong. Do not add this signal to the existing opportunity without resolving the framing question.

The strong version names the specific OST claim being challenged, characterizes the nature and degree of the conflict, and defers the resolution decision to the PM while making the options explicit.

## Failure Modes

**Silent absorption.** The agent encounters a contradicting signal and maps it to the nearest opportunity without flagging the conflict. The opportunity now has more signals, but its framing is internally inconsistent. The PM never knows the conflict exists.

**Re-framing to resolve.** The agent subtly re-words the contradicting signal so it doesn't conflict with the existing opportunity. "I don't want notifications" becomes "customer has strong notification preferences" — technically true, but it has been bent to fit the existing framing rather than challenging it.

**Contradicting the wrong thing.** The agent flags a contradiction at the wrong level of abstraction — calling out a conflict with a specific solution hypothesis when the signal actually challenges the parent opportunity. Or vice versa. The PM acts on the wrong level and misses the real implication.

**Calibration failure: over-triggering.** The agent flags every minor tension as a contradiction, producing so much noise that the PM learns to dismiss the flags. Contradictions need to be real and meaningfully scoped. A customer who says "the onboarding is fine" when the opportunity is about "onboarding being confusing for a specific user type" may not be contradicting anything — the PM should be told there's a potential scope clarification, not that the opportunity has been contradicted.

**Calibration failure: under-triggering.** The agent flags nothing. All new signals are absorbed. The OST grows but never gets challenged. This is the more dangerous failure mode — the tree looks healthy and well-evidenced but has drift that the PM can't see.

**Missing the compounding contradiction.** A single signal doesn't disprove an opportunity, but the agent doesn't track accumulating counter-evidence. By the time five signals have piled up that conflict with an existing OST claim, the opportunity is badly wrong — but because each individual signal wasn't a strong enough contradiction to flag, none of them were surfaced. The agent needs to track the accumulating weight of counter-evidence, not just individual signals.

**Ignoring structural contradictions.** The agent catches signal-level contradictions ("this customer says X, but the opportunity assumes Y") but misses structural ones: an opportunity that's been active for two months with no supporting evidence added, despite active discovery; a solution hypothesis that's survived three rounds of synthesis without any corroborating signal; an experiment whose results, when re-read, don't actually support the conclusion that was drawn. These are contradictions in the structure of the OST, not just in the signals.

## How to Evaluate It

**Test 1 — Direct contradiction.** Give the agent an OST with a clear, well-evidenced opportunity. Add a new signal that directly and obviously challenges the core assumption of that opportunity. Check whether the agent flags it as a contradiction with explicit framing, silently absorbs it, or re-frames it to fit. The pass/fail is binary: does the contradiction get named?

**Test 2 — Subtle contradiction.** Give the agent an OST opportunity framed around one user segment. Add a signal from a different segment that doesn't contradict the pain but contradicts the universality implied by the framing. Check whether the agent notices that the signal challenges the scope of the opportunity, not the existence of the pain.

**Test 3 — Accumulating counter-evidence.** Give the agent a corpus of six signals where three support an existing opportunity and three challenge it. The individual challenges are each weak (single source, hedged language). Check whether the agent notices the pattern of accumulating counter-evidence and flags it, or whether it only counts the three supporting signals and reports the opportunity as medium-confidence.

**Test 4 — Structural contradiction.** Give the agent an OST with a solution that has been in "exploring" status for three cycles with no linked experiment and no supporting signal added since its creation. Check whether the agent surfaces this as a structural problem — a solution with no active evidence base — or simply reports the tree as-is.

**Test 5 — Calibration check.** Give the agent two signals: one that clearly contradicts an existing OST assumption, and one that is merely in tension with it (different user segment, similar surface language). Check whether the agent treats them differently — flagging the contradiction and noting the tension — or whether it either misses both or over-flags both.

## How to Develop It

**Build an explicit contradiction-check step into synthesis prompts.** After synthesis and mapping, add: "Now review your synthesis against the current OST. For each signal you mapped, ask: does this signal confirm the existing opportunity framing, or does it challenge it? Flag any that challenge the existing framing, even if only partially." This separates the confirmation instinct from the contradiction-detection instinct.

**Maintain an OST claims log.** Document the core claims embedded in each opportunity ("this pain affects [user type] when [context] with [severity]") and include it in the agent's context during synthesis. This gives the agent explicit targets to check new signals against, rather than requiring it to infer the claims from the opportunity framing.

**Define what counts as a contradiction.** In the system prompt, make the taxonomy explicit: "A contradiction is when a new signal challenges the underlying assumption of an existing opportunity — not just when it presents a different perspective. A signal that 'doesn't fit' any cluster is different from a signal that 'contradicts' an existing cluster. Both should be flagged, but they require different PM responses."

**Run a dedicated contradiction review pass.** Separate from synthesis, run a periodic pass with the explicit frame: "Your job in this pass is not to find what the signals confirm. It is to find what they challenge. Read the current OST and look for where the incoming signals create tension." Giving the agent an adversarial frame activates a different mode than the additive synthesis mode.

**Test with planted contradictions.** When evaluating the agent, deliberately plant signals that contradict existing OST assumptions. Grade the agent on whether it catches them, how precisely it characterizes the contradiction, and whether it calibrates the severity correctly. Track the false negative rate (missed contradictions) and the false positive rate (over-flagged tensions) and tune toward a specific balance.

## Sample Prompts

**Contradiction check prompt:**

```
You have just synthesized a set of new signals. Before mapping them to the OST, perform a contradiction check.

For each new signal:
1. Read the existing OST opportunities and their embedded claims (the assumptions they make about customer needs, severity, and scope).
2. Ask: does this signal confirm those claims, challenge them, or neither?
3. For any signal that challenges an existing claim, write a contradiction report:
   - Which OST node is being challenged?
   - What specifically does the existing node claim?
   - What does the new signal suggest instead?
   - How serious is the conflict — does it invalidate the opportunity, narrow its scope, or just introduce uncertainty?
   - What should the PM decide?
4. Do not silently absorb contradicting signals into the nearest matching cluster. Surface the conflict first.

New signals: [PASTE]
Current OST with opportunity statements: [PASTE]
```

**Accumulating counter-evidence prompt:**

```
Review all signals collected in the past [time period] for the "[Opportunity Name]" opportunity.

Separate them into two groups:
1. Signals that support the current opportunity framing
2. Signals that challenge or complicate the current opportunity framing

For the challenging signals:
- What, specifically, do they challenge?
- Taken together, do they represent enough counter-evidence to recommend revising the opportunity framing?
- Or are they better explained as a different segment or use case that the opportunity doesn't currently capture?

Do not try to reconcile the tension. Describe it and defer the resolution to the PM.
```

**Structural OST audit prompt:**

```
Review the current OST structure (not the signals — the tree itself) and flag any structural contradictions:

1. Solutions with no parent opportunity
2. Opportunities with no supporting signals added in the past 30 days, despite active discovery
3. Experiments that have been running longer than [kill condition window] with no recorded update
4. Opportunities whose current framing conflicts with experiment results that have been recorded elsewhere in the tree
5. Solution hypotheses where the "riskiest assumption" identified has already been contradicted by prior research

For each structural issue, describe what it is and what the PM should decide.
```

## Connected Skills

[[Transcript Synthesis]] — Synthesis is where the raw material for contradiction detection comes from; synthesis quality determines whether contradictions are visible.

[[Signal Clustering]] — Clustering is where accumulating counter-evidence patterns first become visible; a cluster of contradicting signals is a structural contradiction.

[[Longitudinal Pattern Tracking]] — Contradiction detection over time requires knowing what was believed before; longitudinal tracking is what makes that history accessible.

[[Opportunity Validation]] — When a contradiction is severe enough, it triggers re-validation of an existing opportunity — is it still a real opportunity given the counter-evidence?

[[Dead Ideas Tracking]] — Opportunities that have been contradicted out of the OST should be tracked as dead ideas with the evidence that killed them.

[[Confidence Tagging]] — Contradictions should update confidence levels on affected opportunities; the mechanism for that update is confidence tagging.

[[Escalation Calibration]] — Contradiction severity determines whether the agent escalates to the PM immediately or flags it in the next review; calibrating that threshold is an escalation question.

[[Epistemic Self-Awareness]] — The meta-skill that underlies contradiction detection: the agent must be willing to challenge its own prior synthesis, not just new inputs.
