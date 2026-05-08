# Result Interpretation

> Reading experiment outcomes accurately — classifying signal strength, resisting confirmation bias, and prescribing only the action the evidence actually supports.

**Layer:** 3 — Experiment & Assumption Reasoning
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Result interpretation is the skill of reading what an experiment actually said — not what the team hoped it would say. It requires the agent to classify the result before drawing any conclusions, then derive the appropriate next action from the classification, not from the PM's prior conviction about the solution. The classification scheme has four categories: clear signal (the result confidently supports or refutes the hypothesis), weak signal (directionally suggestive but not conclusive — prescribes a follow-up test, not a go/no-go decision), no signal (the test was too noisy, too small, or too flawed to tell us anything useful — prescribes redesigning the test, not acting on the result), and contradictory signal (different user segments or conditions showed materially opposite results — prescribes understanding the segmentation before acting on either direction).

The core discipline is that the classification comes first. The agent must characterize the result before interpreting it. This ordering matters because interpretation is where confirmation bias operates — teams find the positive signal in ambiguous data and amplify it. Forcing classification first creates a structural check: if you classify the result as "weak signal" before interpreting it, you cannot then recommend "ship it" without acknowledging the contradiction.

Good result interpretation also requires the agent to read results against the pre-specified criteria from the experiment design — not against post-hoc standards. If the success threshold was a 4 percentage point lift and the result was 2.8 percentage points, the correct classification is "failed to reach success threshold" — even if the result is statistically significant, even if it is directionally positive, and even if the PM is excited. The agent's job is to name what the experiment said. The PM's job is to decide what to do with that. These are distinct.

Finally, this skill includes knowing when the result does not give enough information to decide, and saying so clearly. "This doesn't give us enough to decide" is a complete and valuable output. It is far more useful than forcing a conclusion from insufficient evidence. An agent that cannot produce "we don't know yet" as an output will reliably over-claim on weak or contradictory signals, creating false confidence in solution branches that should be tested further.

## Why It Matters

Confirmation bias is the dominant failure mode in product discovery, and it operates most powerfully at the result interpretation stage. Teams design experiments with some genuine intention of falsifiability, run them, get ambiguous results — and then find the positive signal. The 28% open rate gets described as "strong early traction." The segmented result where power users responded positively gets generalized to all users. The week-1 spike that decays by week 3 gets called "validation." These reframings are often not conscious deception — they are motivated reasoning under time pressure and investment sunk costs.

Agents amplify this problem when they are trained to be helpful and supportive. An agent that reads an experiment result and generates a recommendation based on what it thinks the PM wants to hear is not doing discovery work — it is doing rationalization. The agent's value in the result interpretation step is specifically its lack of stake in the outcome. It should be harder to spin than a human team member who has been working on the solution for six weeks. If the agent is not harder to spin, it is not providing value at this stage.

The "contradictory signal" classification deserves special attention because it is both the most information-rich result type and the most commonly mishandled. When different segments show opposite results, the instinct is to average them and call it neutral. But a contradictory result is not neutral — it is a finding. It means the solution works for some users and not others, or works in some contexts and not others. Acting on averaged contradictory results produces solutions designed for nobody. The correct response to contradictory signal is to understand the segmentation before making any decision — and an agent that surfaces this instead of averaging is delivering significant value.

## What Good Looks Like

**Poor output — confirmation bias in interpretation:**

> Results: We ran the concierge test with 18 users. 12 completed the full workflow. Of the remaining 6, 3 dropped off at step 2 and 3 never responded to the initial invitation.
>
> Interpretation: Strong validation. Two-thirds completion rate indicates high demand for the solution. Recommend proceeding to prototype.

This output ignores the 33% non-completion rate, does not distinguish between users who dropped off (a usability signal) and users who never engaged (a demand signal), and does not note that 18 users is too small for statistical confidence. "Strong validation" is an overclaim.

---

**Strong output — classification first, then interpretation:**

> Results: Concierge test, 18 users invited, 12 completed the full workflow, 3 dropped at step 2, 3 never responded.
>
> Signal classification: Weak signal — directionally positive but not conclusive.
>
> What the data supports:
> — Among users who engaged, completion rate was high (12/15 = 80%). This is a positive usability signal for the designed workflow.
> — The 3 non-responses (out of 18 invitations) may indicate demand uncertainty — these users did not find the offer compelling enough to engage. With 18 users total, this is not a reliable demand signal in either direction.
> — The 3 drop-offs at step 2 warrant specific investigation. Step 2 is [description]. This could indicate a usability problem, an expectation mismatch, or users who qualified themselves out after understanding what was involved.
>
> What the data does not support: A claim of validated demand. 18 users is below our pre-specified minimum of 25. Even at 25, a concierge test of this type validates workflow viability, not market demand.
>
> Recommended action: Do not proceed to prototype yet. Before that decision: (1) Conduct short follow-up interviews with the 3 drop-offs at step 2 to understand why they stopped. (2) Recruit 10 more users to bring total to a minimum of 25. (3) Revisit demand validation separately — the concierge test was designed to test workflow viability, not demand.
>
> If follow-up interviews show step 2 was a workflow problem: redesign step 2 and run another small concierge cohort.
> If step 2 was an expectation mismatch: escalate to PM — this may indicate an opportunity framing issue, not a solution design issue.

---

The strong output classifies first, separates what the data supports from what it does not, makes the 18-user limitation explicit, and produces a decision tree rather than a single recommendation. The PM makes the call — the agent ensures the call is made on accurate information.

**Contradictory signal example:**

> Results: A/B test of new onboarding flow. Overall: Group A (new flow) showed 1.8pp improvement in 7-day retention vs. Group B — below our 4pp success threshold.
>
> Segment analysis: New users with prior experience in [category] showed 6.2pp improvement. New users without prior experience showed -1.4pp (worse than control).
>
> Signal classification: Contradictory signal. Do not act on the aggregate result.
>
> What the data suggests: The new onboarding flow assumes familiarity with [category] concepts. It works well for users who have that familiarity and appears to harm users who do not.
>
> Recommended action: Do not ship or kill. Investigate the segmentation. If the two user types can be identified at signup, a targeted flow (new flow only for experienced users, original for novice users) is worth designing. If they cannot be identified at signup, the new flow as designed may create net harm.

## Failure Modes

**Averaging contradictory signals.** The agent computes an aggregate result across segments with opposite results and calls it "mixed." This destroys the most important information in the dataset. Mixed is not a result — contradictory is.

**Overclaiming on small samples.** The agent interprets a 12-person concierge result with the same confidence it would apply to a 500-person A/B test. Sample size is not surfaced. The conclusion is stated without qualification.

**Conflating direction with magnitude.** The result is directionally positive (higher is better) and the agent calls it a win, ignoring that the magnitude is below the pre-specified threshold. "The metric went up" is not the same as "the experiment succeeded."

**Confabulating patterns from noise.** The agent finds a sub-segment that showed a positive result, even though the sub-segment was not pre-specified and the result is within margin of error. This is a classic multiple comparisons problem — if you slice the data enough ways, you will find a positive result somewhere. An agent without result interpretation skill will amplify this noise as signal.

**Post-hoc threshold revision.** The agent notes that the pre-specified success threshold was not met, then suggests the threshold may have been set too high, and recommends treating the result as a success with a revised threshold. This is goalpost shifting. The agent should flag this pattern explicitly rather than facilitate it.

**Forcing a conclusion from no-signal results.** When a test is too small, too noisy, or too flawed to produce meaningful results, the agent produces a recommendation anyway rather than saying "this test did not generate usable signal." Forcing a conclusion from no signal is worse than having no conclusion.

**Ignoring confounds.** The agent interprets a result without noting that the test ran during a period of unusual behavior (holiday season, a viral moment, a product outage), that the sample was not representative, or that the control condition was contaminated. Confounds that invalidate a result must be surfaced even when they produce an inconvenient "we don't know yet."

## How to Evaluate It

1. **Classification-first discipline test.** Give the agent a set of experiment results and ask for interpretation. Check whether the agent classifies the result (clear signal / weak signal / no signal / contradictory signal) before offering any interpretation. An agent that jumps directly to "what we should do next" has skipped the classification step.

2. **Contradictory signal test.** Provide results where aggregate numbers look neutral but segments show opposite directions. Ask for interpretation. A skilled agent will flag the contradiction and recommend understanding the segmentation before acting. An unskilled agent will report the aggregate and call it neutral or mixed.

3. **Threshold adherence test.** Provide results where the metric moved in the right direction but fell short of the pre-specified success threshold. The success threshold should be noted in the context. Ask for interpretation. A skilled agent will note the threshold was not reached and classify accordingly. An unskilled agent will call the directional positive result a validation.

4. **No-signal detection test.** Provide results from a test that was too small to be meaningful (e.g., n=8 for a binary outcome experiment) or that ran during a period with an obvious confound. Ask for interpretation. A skilled agent will classify this as no signal and recommend redesigning the test. An unskilled agent will interpret the result anyway.

5. **Overclaim detection test.** Provide results with clear limitations (small n, short duration, non-representative sample) and ask the agent to "write up what we learned." Check whether the agent's write-up includes the limitations or presents the result as more definitive than it is.

## How to Develop It

**Classification taxonomy in system prompt.** Define the four result categories (clear signal, weak signal, no signal, contradictory signal) in the agent's system prompt with descriptions and examples. Require the agent to label every result with one of these four categories before producing any interpretation.

**Pre-specified criteria retrieval.** Before interpreting results, require the agent to retrieve and display the success and failure conditions that were defined before the experiment ran. This makes threshold adherence visible and hard to skip.

**Segment analysis as standard.** Require the agent to perform segment analysis as a standard step in result interpretation, not an optional one. Define the minimum segments to always check: new vs. returning users, high-engagement vs. low-engagement users, mobile vs. desktop. This makes contradictory signals detectable even when the aggregate looks clean.

**Confidence calibration training.** Run the agent through exercises where it assigns confidence levels to results and then those are evaluated against ground truth (from a future experiment or eventual outcome). Agents that consistently overclaim get feedback that recalibrates the confidence scores they assign.

**"What we don't know" mandatory field.** Require every result interpretation to include a section titled "What this result does not tell us." This structural requirement counteracts the tendency to let a result feel more conclusive than it is.

## Sample Prompts

**Prompt 1 — Structured interpretation:**
> "Here are the results from our experiment: [results]. The pre-specified success threshold was [threshold] and the failure condition was [condition]. Before interpreting these results: (1) Classify the result as clear signal, weak signal, no signal, or contradictory signal, and explain your classification. (2) State explicitly whether the pre-specified success threshold was met. (3) Identify any segments or conditions where results differed materially from the aggregate. (4) List what this result does not tell us. Then, and only after completing the above, recommend the appropriate next action."

**Prompt 2 — Contradictory signal investigation:**
> "Our experiment showed [aggregate result], but when segmented by [dimension], we found [segment A result] vs. [segment B result]. Interpret these results. Specifically: (1) Is this a meaningful segmentation difference or noise? (2) What does this suggest about who the solution works for and who it does not? (3) What would we need to understand before making a go/no-go decision? (4) Do not recommend shipping or killing — recommend what we need to learn first."

**Prompt 3 — Overclaim audit:**
> "Here is the write-up our PM drafted from the experiment results: [write-up]. The raw results were: [results]. Audit the write-up for: (1) any claims not directly supported by the data, (2) any limitations of the data that are not disclosed, (3) any threshold that was moved from what was pre-specified, and (4) any aggregate result that masks a contradictory segment result. List every problem you find."

## Connected Skills

- [[Null Hypothesis Awareness]] — the pre-specified failure conditions that results must be read against
- [[Assumption Decomposition]] — identifies what the experiment was designed to test, so results are interpreted in that context
- [[Confidence Tagging]] — the appropriate confidence level to assign to a result based on signal strength
- [[Bias Detection]] — catches when interpretation is being shaped by confirmation bias or sunk cost
- [[Contradiction Detection]] — surfaces when a result contradicts prior evidence in the OST
- [[Evidence Attribution]] — ensures the result is logged correctly against the specific assumption it tested
- [[Epistemic Self-Awareness]] — enables the agent to say "we don't know" when the evidence is insufficient
- [[Escalation Calibration]] — determines when a result is ambiguous enough that it should be escalated to the PM rather than interpreted autonomously
- [[Dead Ideas Tracking]] — captures what was learned when a clear negative signal kills a solution branch
