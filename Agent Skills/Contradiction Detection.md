# Contradiction Detection

> The skill of recognizing when new evidence directly conflicts with an existing claim anywhere in the Loop tree — an Opportunity framing, an Outcome, a Key Result reading, a Solution assumption, or a Test result — and surfacing that conflict explicitly, then carrying it up the tree, rather than silently absorbing the signal.

**Layer:** 1 — Synthesis & Signal Processing
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Contradiction detection is the discipline of holding the existing Loop tree (see the [Loop structure guide](../guides/the-loop.md)) in active memory and comparing every new signal against it — not just to find where the signal fits, but to notice where it doesn't fit, and to name that non-fit explicitly. An agent that only adds to the tree and never challenges it is not a discovery partner. It is a confirmation machine. It makes the tree look well-evidenced while gradually decoupling it from what customers actually experience.

The skill requires three things simultaneously. First, the agent must hold a representation of the current tree — not just as a list of records, but as a set of implicit claims, level by level:

- An **Opportunity** (`OPP-n`) asserts "customers in this segment feel this need, with this intensity, in this context."
- An **Outcome** (`OUT-n`) asserts "capturing this Opportunity requires this change in customer behavior."
- A **Key Result** (`OUT-n-KR-n`) asserts "this measurable signal tells us the Outcome is happening." Its readings can contradict the claim that the Outcome is progressing.
- A **Solution** (`SOL-n`) asserts "this approach moves its KR and addresses the Opportunity," resting on a list of assumptions, one of them the riskiest.
- A **Test** (`TST-n`) asserts, through its pre-written criteria, what result would confirm or refute one assumption. Its recorded result is itself a claim that can be contradicted by later evidence.

These are all falsifiable claims, and they are all subject to being contradicted by new evidence.

Second, the agent must compare each new signal against those claims at the right level of abstraction. A signal that contradicts a specific Solution assumption is not the same as a signal that contradicts the entire Opportunity. A customer saying "I actually don't mind the current export process" contradicts the assumption that the pain is universal, but may not invalidate the Opportunity if other signals show it affects a specific segment acutely. Good contradiction detection is precise about which record is being contradicted and to what degree.

Third, and most critically, the agent must surface the contradiction explicitly rather than silently resolving it — and must route it to the right level. The most common failure is for an agent to encounter a contradicting signal and simply not map it anywhere — it gets absorbed into the "doesn't fit" pile without the PM being told that it contradicts something specific in the current tree. Or worse, the agent re-frames the contradicting signal slightly so that it doesn't appear to contradict anything. Neither of these is the agent's job. The job is to say: "This signal appears to conflict with the current framing of `OPP-3`, 'export friction.' Here is the specific conflict. The PM should decide how to interpret this." The agent records the flag and reports it; it does not wait for permission to surface a contradiction, and it does not resolve it on the PM's behalf.

**Contradictions flow up the tree.** Evidence attaches only to Opportunities and to the Solution or Test it bears on — never to Key Results. So a contradiction typically enters low and propagates: a Test result that refutes a Solution assumption lowers that Solution's confidence; a Solution that has lost its riskiest assumption weakens the KR's path to moving; a KR reading that is flat or reversed despite active Solutions is a contradiction of the Outcome's health; and an Outcome in trouble is a contradiction of the Opportunity's status (pursuing / sustained / retired). The agent should trace each contradiction as far up as its weight justifies and say where it stops.

Contradiction detection is an active discipline, not a passive filter. The agent should be looking for contradictions, not just noticing them when they're obvious. This means the agent needs a mental model of where the tree is most vulnerable — which Opportunities have thin evidence, which Solution assumptions are strong claims, which Solutions rest on a small number of supporting signals, which Test results were drawn from a single small run. Those are the places where a single contradicting signal is most consequential.

## Why It Matters

A tree that is never challenged becomes a record of what the team believed at the time they built it, not a model of current customer reality. The default behavior of most PM systems — human and agentic — is additive: new signals get added to existing Opportunities, strengthening them over time. But customer reality changes, and early assumptions get disproved. Without an active contradiction detection mechanism, the tree becomes increasingly confident about things that are increasingly wrong.

The specific failure this skill prevents is false confidence. When a PM looks at an Opportunity with eight supporting signals, they read it as strong evidence. They don't see the three contradicting signals that were silently absorbed or dropped during synthesis. They prioritize the Opportunity, commit an Outcome, start Tests, maybe build something — and then the contradicting evidence shows up as customer feedback on the shipped feature. Contradiction detection is the mechanism that would have surfaced those signals earlier and cheaper.

There is also a more subtle organizational cost. In empowered teams, the PM's authority rests on the quality of their discovery. When an Opportunity they championed turns out to be based on a biased or incomplete reading of the evidence, the team's confidence in the discovery process — and in the PM — is damaged. A PM whose agent catches contradictions and surfaces them proactively is a PM who can say "we considered the counter-evidence" even when the final call doesn't change. That's a meaningfully different position than being surprised by the contradiction post-launch.

## What Good Looks Like

**Weak contradiction handling:**

The agent adds a new signal to the "notification preferences" Opportunity cluster. The customer said they "don't really care about email notifications." The agent files this under "notification preferences" with no flag. The Opportunity now has 10 signals, one of which directly contradicts the framing, but the PM can't tell.

**Strong contradiction detection output:**

> **Contradiction flagged — OPP-6 "Notification Preferences"**
>
> *New signal:* "Honestly I turn off all notifications in every app. I'd rather check things on my own schedule." [Interview, User D, 2026-04-22]
>
> *Existing claim being challenged:* OPP-6 is currently framed as: "I miss important updates because I don't have control over which notifications I receive." This framing assumes customers want better notification control, not fewer notifications.
>
> *Level:* Opportunity framing (OPP-6). Not yet a challenge to its Outcome (OUT-3) or to SOL-11, which assumes shoppers will configure per-channel preferences.
>
> *Nature of the contradiction:* The new signal challenges the framing at the level of the underlying desire. User D doesn't want better notification control — they want no notifications. This is a different need (or the absence of a need) that the current Opportunity framing doesn't accommodate.
>
> *Degree:* Moderate. This is one signal against an existing medium-confidence Opportunity (3 prior sources). It doesn't invalidate the Opportunity but it suggests the statement may be too broad — it's capturing at least two different customer orientations: "I want better control" and "I want to opt out entirely."
>
> *Upward effect:* None yet. If a second source corroborates, SOL-11's assumption "customers want fine-grained control" should be re-ranked and may become the riskiest assumption, which would point the next Test at it.
>
> *Recommendation for PM:* Consider whether this is (a) a different segment's response and the Opportunity holds for a different user type, (b) evidence that the Opportunity should be split, or (c) a signal that the existing framing is wrong. Do not attach this signal to OPP-6 without resolving the framing question.

The strong version names the specific record being challenged, the level it sits at, characterizes the nature and degree of the conflict, states whether and how far it propagates up the tree, and defers the resolution decision to the PM while making the options explicit.

## Failure Modes

**Silent absorption.** The agent encounters a contradicting signal and maps it to the nearest Opportunity without flagging the conflict. The Opportunity now has more signals, but its framing is internally inconsistent. The PM never knows the conflict exists.

**Re-framing to resolve.** The agent subtly re-words the contradicting signal so it doesn't conflict with the existing Opportunity. "I don't want notifications" becomes "customer has strong notification preferences" — technically true, but it has been bent to fit the existing framing rather than challenging it.

**Contradicting the wrong level.** The agent flags a contradiction at the wrong level of the tree — calling out a conflict with a specific Solution assumption when the signal actually challenges the parent Opportunity, or flagging an Opportunity when only one Solution assumption is at risk. The PM acts on the wrong level and misses the real implication.

**Attaching evidence to a KR.** The agent treats a contradicting customer signal as a challenge to a Key Result directly. KRs are measured, not argued with: a customer quote bears on an Opportunity, or on the Solution or Test it concerns, and only reaches the KR by moving up the tree through a Test result or a metric reading. Raw signals do not attach to KRs.

**Calibration failure: over-triggering.** The agent flags every minor tension as a contradiction, producing so much noise that the PM learns to dismiss the flags. Contradictions need to be real and meaningfully scoped. A customer who says "the onboarding is fine" when the Opportunity is about "onboarding being confusing for a specific user type" may not be contradicting anything — the PM should be told there's a potential scope clarification, not that the Opportunity has been contradicted.

**Calibration failure: under-triggering.** The agent flags nothing. All new signals are absorbed. The tree grows but never gets challenged. This is the more dangerous failure mode — the tree looks healthy and well-evidenced but has drift that the PM can't see.

**Missing the compounding contradiction.** A single signal doesn't disprove an Opportunity, but the agent doesn't track accumulating counter-evidence. By the time five signals have piled up that conflict with an existing claim, the Opportunity is badly wrong — but because each individual signal wasn't a strong enough contradiction to flag, none of them were surfaced. The agent needs to track the accumulating weight of counter-evidence, not just individual signals.

**Stopping the flow too early.** The agent records that a Test refuted a Solution assumption but never updates the Solution's confidence, never checks whether sibling Solutions under the same KR are also weak, and never notes the effect on the KR's coverage. The contradiction is logged at the leaf and dies there.

**Ignoring structural contradictions.** The agent catches signal-level contradictions ("this customer says X, but the Opportunity assumes Y") but misses structural ones: an Opportunity that's been active for two months with no supporting evidence added, despite active discovery; a Solution that has survived three rounds of synthesis without any corroborating signal; a KR with an at-risk reading whose Solutions have no active Test; a Test whose result, when re-read, doesn't actually support the conclusion that was drawn. These are contradictions in the structure of the tree, not just in the signals.

## How to Evaluate It

**Test 1 — Direct contradiction.** Give the agent a tree with a clear, well-evidenced Opportunity. Add a new signal that directly and obviously challenges the core claim of that Opportunity. Check whether the agent flags it as a contradiction with explicit framing, silently absorbs it, or re-frames it to fit. The pass/fail is binary: does the contradiction get named?

**Test 2 — Subtle contradiction.** Give the agent an Opportunity framed around one user segment. Add a signal from a different segment that doesn't contradict the pain but contradicts the universality implied by the framing. Check whether the agent notices that the signal challenges the scope of the Opportunity, not the existence of the pain.

**Test 3 — Accumulating counter-evidence.** Give the agent a corpus of six signals where three support an existing Opportunity and three challenge it. The individual challenges are each weak (single source, hedged language). Check whether the agent notices the pattern of accumulating counter-evidence and flags it, or whether it only counts the three supporting signals and reports the Opportunity as medium-confidence.

**Test 4 — Flow up the tree.** Give the agent a Test result that refutes the riskiest assumption of a Solution whose two sibling Solutions under the same KR are already low-confidence. Check whether the agent updates the Solution's confidence, notes the KR now lacks a credible path, and says whether the Outcome or Opportunity status is affected — or whether it stops at the Test.

**Test 5 — Structural contradiction.** Give the agent a tree with a Solution that has been in "exploring" status for three cycles with no linked Test and no supporting signal added since its creation. Check whether the agent surfaces this as a structural problem — a Solution with no active evidence base and no Test — or simply reports the tree as-is.

**Test 6 — Calibration check.** Give the agent two signals: one that clearly contradicts an existing Opportunity claim, and one that is merely in tension with it (different user segment, similar surface language). Check whether the agent treats them differently — flagging the contradiction and noting the tension — or whether it either misses both or over-flags both.

## How to Develop It

**Build an explicit contradiction-check step into synthesis prompts.** After synthesis and mapping, add: "Now review your synthesis against the current tree. For each signal you mapped, ask: does this signal confirm the existing record's claim, or does it challenge it? Flag any that challenge the existing framing, even if only partially." This separates the confirmation instinct from the contradiction-detection instinct.

**Maintain a claims log.** Document the core claims embedded in each record ("this pain affects [user type] when [context] with [severity]" for an Opportunity; the assumption list and riskiest assumption for a Solution; the pass and fail criteria for a Test) and include it in the agent's context during synthesis. This gives the agent explicit targets to check new signals against, rather than requiring it to infer the claims from record titles.

**Define what counts as a contradiction.** In the system prompt, make the taxonomy explicit: "A contradiction is when a new signal challenges the underlying claim of an existing record — not just when it presents a different perspective. A signal that 'doesn't fit' any cluster is different from a signal that 'contradicts' an existing cluster. Both should be flagged, but they require different PM responses."

**Run a dedicated contradiction review pass.** Separate from synthesis, run a periodic pass with the explicit frame: "Your job in this pass is not to find what the signals confirm. It is to find what they challenge. Read the current tree and look for where the incoming signals, Test results, and KR readings create tension." Giving the agent an adversarial frame activates a different mode than the additive synthesis mode.

**Test with planted contradictions.** When evaluating the agent, deliberately plant signals that contradict existing claims at different levels. Grade the agent on whether it catches them, how precisely it characterizes the contradiction and its level, and whether it calibrates the severity correctly. Track the false negative rate (missed contradictions) and the false positive rate (over-flagged tensions) and tune toward a specific balance.

## Sample Prompts

**Contradiction check prompt:**

```
You have just synthesized a set of new signals. Before attaching them to the tree, perform a contradiction check.

For each new signal:
1. Read the existing Opportunities, Solutions, and Test records and their embedded claims (the assumptions they make about customer needs, severity, scope, and behavior).
2. Ask: does this signal confirm those claims, challenge them, or neither?
3. For any signal that challenges an existing claim, write a contradiction report:
   - Which record (OPP-n, SOL-n, TST-n) is being challenged, and at what level?
   - What specifically does the existing record claim?
   - What does the new signal suggest instead?
   - How serious is the conflict — does it invalidate the record, narrow its scope, or just introduce uncertainty?
   - Does it propagate upward (Solution confidence, KR path, Outcome health, Opportunity status)? Say where it stops.
   - What should the PM decide?
4. Do not silently absorb contradicting signals into the nearest matching cluster. Do not attach raw signals to Key Results. Surface the conflict first.

New signals: [PASTE]
Current tree with Opportunity statements and Solution assumptions: [PASTE]
```

**Accumulating counter-evidence prompt:**

```
Review all signals collected in the past [time period] for the "[Opportunity Name]" Opportunity.

Separate them into two groups:
1. Signals that support the current Opportunity framing
2. Signals that challenge or complicate the current Opportunity framing

For the challenging signals:
- What, specifically, do they challenge?
- Taken together, do they represent enough counter-evidence to recommend revising the Opportunity framing, or the assumptions of the Solutions that rest on it?
- Or are they better explained as a different segment or use case that the Opportunity doesn't currently capture?

Do not try to reconcile the tension. Describe it and defer the resolution to the PM.
```

**Structural tree audit prompt:**

```
Review the current Loop tree structure (not the signals — the tree itself) and flag any structural contradictions:

1. Records with no parent (Outcome with no Opportunity, KR with no Outcome, Solution with no KR, Test with no Solution assumption)
2. Opportunities with no supporting signals added in the past 30 days, despite active discovery
3. Tests that have been running longer than their kill-condition window with no recorded update
4. Opportunities or Outcomes whose current framing conflicts with Test results or KR readings recorded elsewhere in the tree
5. Solutions whose named riskiest assumption has already been contradicted by prior research
6. KRs with an at-risk reading whose Solutions have no active Test

For each structural issue, describe what it is and what the PM should decide.
```

## Connected Skills

[[Transcript Synthesis]] — Synthesis is where the raw material for contradiction detection comes from; synthesis quality determines whether contradictions are visible.

[[Signal Clustering]] — Clustering is where accumulating counter-evidence patterns first become visible; a cluster of contradicting signals is a structural contradiction of the Opportunity it challenges.

[[Longitudinal Pattern Tracking]] — Contradiction detection over time requires knowing what was believed before; longitudinal tracking is what makes that history accessible across cycles.

[[Opportunity Validation]] — When a contradiction is severe enough, it triggers re-validation of an existing Opportunity — is it still a real Opportunity given the counter-evidence?

[[Dead Ideas Tracking]] — Opportunities, Solutions, and Tests that have been contradicted out of the tree should be archived (not deleted) as dead ideas with the evidence that retired them.

[[Confidence Tagging]] — Contradictions should update confidence levels on affected Opportunities and Solutions; the mechanism for that update is confidence tagging.

[[Escalation Calibration]] — Contradiction severity determines whether the agent escalates to the PM immediately or flags it in the next review; calibrating that threshold is an escalation question.

[[Epistemic Self-Awareness]] — The meta-skill that underlies contradiction detection: the agent must be willing to challenge its own prior synthesis, not just new inputs.

The `loop-workflow` skill covers all five Loop levels, and contradictions found here route to it.
