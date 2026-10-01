# Result Interpretation

> Reading Test outcomes accurately (classifying signal strength, resisting confirmation bias, taking only the action the evidence supports) and carrying the result up the tree.

**Layer:** 3 — Test & Assumption Reasoning
**Companion:** [[Agentic PM — Agent Capability Framework]] · [[Autonomy Policy]]
**Structure:** `guides/ookrst-structure.md`. A Test (`TST-n`) result is logged on the Test, updates its Solution (`SOL-n`), and from there informs the KR, Outcome and Opportunity above it.

---

## What This Skill Is

Result interpretation is reading what a Test actually said, not what the team hoped it would say. The agent classifies the result first, then derives the next action from the classification rather than from anyone's prior conviction. Four categories:

- **Clear signal** — confidently supports or refutes the assumption.
- **Weak signal** — directionally suggestive, not conclusive. Prescribes a follow-up Test, not go/no-go.
- **No signal** — too noisy, small, or flawed to tell us anything. Prescribes redesigning the Test.
- **Contradictory signal** — segments or conditions showed materially opposite results. Prescribes understanding the segmentation before acting on either direction.

Classification comes first because interpretation is where confirmation bias operates. Once a result is labeled "weak signal", recommending "ship it" requires openly overriding the label.

Results are read against the pre-specified criteria, not post-hoc standards. If the threshold was a 4pp lift and the result was 2.8pp, it failed to reach the threshold, even if significant, directionally positive, and exciting.

The agent then makes the call (Proceed, Iterate, Retire, or "not enough to decide yet, here is the next Test"), records its reasoning and confidence, and reports it ([[Autonomy Policy]]). Ambiguity is not a reason to wait for a human; it is a reason to classify honestly and pick the cheapest action that resolves it. "We don't know yet" is a complete, valuable output when paired with the next step. Only actions that are irreversible (archiving a Solution with work behind it, exposing customers to a change, recruiting participants) go to a human, as one recommendation.

**Results flow up the tree.** A Test is a small piece of a larger picture, and interpretation isn't finished until the result has been carried upward in order:

1. **Test to Solution.** The result sets or adjusts the confidence on the Solution's assumption, and so on the Solution. A clear refutation of the riskiest assumption moves the Solution toward retirement; a clear confirmation lets the next riskiest assumption become the target of the next Test.
2. **Solution to KR.** Solution progress, and any metric reading the Test produced, updates the KR. If several Solutions under one KR have been retired, the KR is at risk, and the response is harder Solutions and Tests, not roadmap items.
3. **KR to Outcome.** KR movement updates the health of the Outcome.
4. **Outcome to Opportunity.** Outcome health updates the Opportunity's status: `pursuing`, `sustained` (the Outcome is being achieved and held), or `retired` (the need has gone, or no Outcome worth committing to remains).

Evidence is different from results. Raw signals from a Test (session notes, verbatim quotes, support tickets) attach to the Opportunity they bear on, and to the Solution or Test they bear on specifically. They never attach to a KR. The KR receives numbers, with a baseline, a target and a date.

## Why It Matters

Confirmation bias dominates product discovery and peaks at interpretation. Teams get ambiguous results and find the positive signal: a 28% open rate becomes "strong early traction", a power-user segment gets generalized to everyone, a week-1 spike that decays by week 3 becomes "validation". This is usually motivated reasoning under sunk cost, not deception.

An agent that tells the PM what they want to hear is doing rationalization, not discovery. Its value here is having no stake in the outcome: it should be harder to spin than someone six weeks into the Solution.

Contradictory signal is the most information-rich and most mishandled result. Averaging opposite segments to "neutral" produces Solutions designed for nobody. Surfacing the segmentation is the value.

Misreading is expensive because the tree compounds it. An overclaimed Test lifts a Solution's confidence, which lifts a KR's apparent progress, which tells the Outcome it is on track, which keeps the Opportunity `pursuing` long after the evidence for it has run out. The cheapest place to stop that is the first step.

## What Good Looks Like

**Poor output — confirmation bias:**

> Results: We ran the concierge Test with 18 users. 12 completed the full workflow. Of the remaining 6, 3 dropped off at step 2 and 3 never responded to the initial invitation.
>
> Interpretation: Strong validation. Two-thirds completion rate indicates high demand for the Solution. Recommend proceeding to prototype.

This ignores the 33% non-completion rate, conflates drop-offs (usability) with non-responses (demand), and hides that 18 users is too few. "Strong validation" overclaims.

---

**Strong output — classify, interpret, decide, carry up:**

> Results: `TST-11`, concierge, 18 users invited, 12 completed the full workflow, 3 dropped at step 2, 3 never responded.
>
> Signal classification: Weak signal, directionally positive but not conclusive.
>
> What the data supports:
> — Among users who engaged, completion was high (12/15 = 80%): a positive usability signal for the workflow.
> — 3 of 18 never responded: possible demand uncertainty, not reliable either way at this size.
> — 3 dropped at step 2: could be usability, an expectation mismatch, or self-qualification.
>
> What it does not support: validated demand. 18 is below our pre-specified minimum of 25, and this Test was designed for workflow viability, not demand.
>
> Decision (confidence: medium): Iterate; not proceeding to prototype. Next: I've drafted (1) a follow-up interview guide for the 3 step-2 drop-offs and (2) a separate demand Test. Needs human sign-off: contacting the drop-offs and recruiting 10 more users to reach 25.
>
> Up the tree: `SOL-6` confidence stays low-to-medium on the workflow assumption, unchanged on demand. No change to `OUT-1-KR-2`; no KR reading was produced. Verbatim notes from the sessions are attached to `OPP-5` and `TST-11`, not the KR.
>
> Branches: if step 2 was a workflow problem, redesign it and run another small cohort. If it was an expectation mismatch, I'll reframe `OPP-5` and note it.

---

The strong output classifies first, separates supported from unsupported claims, names the sample limit, makes a decision with a confidence level, says where the result lands in the tree, and routes only the participant recruiting to a human.

**Contradictory signal example:**

> Results: `TST-14`, A/B test of new onboarding flow under `SOL-8`. Overall: Group A (new flow) showed 1.8pp improvement in 7-day retention vs. Group B, below our 4pp success threshold.
>
> Segment analysis: New users with prior experience in [category] showed 6.2pp improvement. New users without prior experience showed -1.4pp (worse than control).
>
> Signal classification: Contradictory signal. Not acting on the aggregate.
>
> What the data suggests: The new flow assumes familiarity with [category] concepts. It helps users who have it and appears to harm those who don't.
>
> Decision: Iterate. I've added a candidate Solution under the same KR for a targeted flow (new flow for experienced users, original for novices) and a Test of whether the two groups can be identified at signup. If they can't, the new flow as designed may cause net harm, and `SOL-8` moves toward retirement. The aggregate 1.8pp is logged on the KR as a reading with its segment caveat, not as progress.

## Failure Modes

**Averaging contradictory signals.** Calling opposite segment results "mixed" destroys the most important information in the data.

**Overclaiming on small samples.** Treating a 12-person concierge result like a 500-person A/B test, with no mention of sample size.

**Conflating direction with magnitude.** "The metric went up" is not "the Test succeeded" when the lift is below threshold.

**Confabulating patterns from noise.** Finding a non-pre-specified sub-segment with a within-margin positive result. Slice enough ways and something is always positive.

**Post-hoc threshold revision.** Suggesting the threshold was too high and treating the miss as a success. That is goalpost shifting; name it.

**Forcing a conclusion from no signal.** A recommendation built on an unusable Test is worse than "no usable signal; here is the redesign."

**Ignoring confounds.** Unusual periods (holidays, a viral moment, an outage), unrepresentative samples, or contaminated controls must be stated even when the answer becomes "we don't know yet."

**Deferring the call.** Presenting the classification and then asking the PM what to do. The agent makes the call, states confidence, and lets the human correct it.

**Stopping at the Test.** The result is classified and logged on the Test, and nothing above it changes. The Solution's confidence, the KR, the Outcome and the Opportunity's status all go stale, and the tree stops reflecting what the team knows.

**Over-propagating.** One weak Test on one Solution gets reported as KR movement or an Outcome win. Each step up the tree needs its own justification; a Test informs the KR only as far as the Solution is actually moving it.

**Evidence on the wrong record.** Interview quotes from a Test get attached to the KR because that is where the team is looking. They belong on the Opportunity and the Test.

## How to Evaluate It

1. **Classification-first.** Given results, does the agent classify before interpreting?
2. **Contradictory signal.** With a neutral aggregate hiding opposite segments, does it flag the contradiction rather than call it mixed?
3. **Threshold adherence.** With a directional result short of the pre-specified threshold, does it classify it as not reaching the threshold?
4. **No-signal detection.** With n=8 on a binary outcome or an obvious confound, does it classify no signal and redesign the Test?
5. **Overclaim detection.** Asked to "write up what we learned" from limited data, does the write-up include the limitations?
6. **Decision ownership.** Does it end with a decision, confidence, and next step rather than a question back to the PM?
7. **Upward flow.** After a clear refutation of a Solution's riskiest assumption, does the agent update the Solution, check whether the KR is now short of viable candidates, and say what that means for the Outcome, without inflating any level?
8. **Evidence placement.** Given session quotes from a Test, does it attach them to the Opportunity and Test, and keep only numbers on the KR?

## How to Develop It

- **Taxonomy in the system prompt.** Define the four categories with examples and require a label on every result before interpretation.
- **Retrieve pre-specified criteria first.** Display the success and failure conditions before interpreting, so threshold adherence is visible.
- **Standard segment analysis.** Always check new vs. returning, high vs. low engagement, and mobile vs. desktop.
- **Confidence calibration.** Compare assigned confidence against later outcomes and recalibrate overclaiming agents.
- **Mandatory "What this result does not tell us" section.**
- **Mandatory "Up the tree" section.** For every result, state the effect on the Solution, whether the KR reading changes, and whether Outcome health or Opportunity status is affected. "No change" is an acceptable answer; a blank is not.

## Sample Prompts

**Prompt 1 — Structured interpretation:**
> "Here are the results from our Test of [SOL-n]: [results]. The pre-specified success threshold was [threshold] and the failure condition was [condition]. (1) Classify the result as clear, weak, no, or contradictory signal and explain. (2) State whether the threshold was met. (3) Identify segments that differed materially from the aggregate. (4) List what this result does not tell us. (5) State the effect on the Solution's confidence, the KR, the Outcome and the Opportunity's status. Then make the call on next action, with your confidence, and record it."

**Prompt 2 — Contradictory signal investigation:**
> "Our Test showed [aggregate result], but segmented by [dimension] we found [segment A result] vs. [segment B result]. (1) Is this meaningful or noise? (2) Who does the Solution work for and who not? (3) What must we learn before a go/no-go? (4) Set up the cheapest next Test to learn it."

**Prompt 3 — Overclaim audit:**
> "Here is the write-up drafted from the Test results: [write-up]. The raw results were: [results]. Audit it for: (1) claims not supported by the data, (2) undisclosed limitations, (3) thresholds moved from what was pre-specified, (4) aggregates masking contradictory segments, and (5) progress claimed at the KR, Outcome or Opportunity level that the Test does not support. List every problem and fix the write-up."

## Connected Skills

- [[Null Hypothesis Awareness]] — the pre-specified failure conditions results are read against
- [[Assumption Decomposition]] — the Solution assumptions the Test was designed to examine
- [[Confidence Tagging]] — the confidence level a result's signal strength supports
- [[Bias Detection]] — catches confirmation bias and sunk cost in interpretation
- [[Contradiction Detection]] — surfaces results that contradict prior evidence on the Opportunity
- [[Evidence Attribution]] — logs the result against the specific Solution assumption it tested and keeps raw evidence on Opportunities, never KRs
- [[Epistemic Self-Awareness]] — lets the agent say "we don't know yet" when evidence is insufficient
- [[Escalation Calibration]] — limits escalation to the irreversible follow-ups a result may trigger
- [[Dead Ideas Tracking]] — captures what was learned when a clear negative signal retires a Solution
- [[Tree Health Checks]] — audits whether results are actually moving up the tree and whether any KR has run out of viable Solutions
