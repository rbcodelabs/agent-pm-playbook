# Null Hypothesis Awareness

> Designing Tests that are genuinely falsifiable: failure is a clearly defined, recognizable outcome, not merely the absence of the positive result.

**Layer:** 3 — Test & Assumption Reasoning
**Companion:** [[Agentic PM — Agent Capability Framework]]
**Structure:** `guides/the-loop.md`. A Test (`TST-n`) is falsifiable by definition: it targets one assumption of one Solution, and its success and failure criteria are written before it runs.

---

## What This Skill Is

Null hypothesis awareness is the ability to structure Tests so they can actually fail, and to recognize when a Test design makes failure practically impossible to see. In formal hypothesis testing, the null hypothesis is the default assumption (typically "there is no effect"), and a test is designed to either reject it or fail to reject it. In product discovery, the equivalent is the falsifiability question: "If this Solution's assumption is wrong, what would the Test results look like, and would we be able to tell the difference between that and noise?"

The practical work of this skill has three components. First, writing an explicit failure condition before the Test runs, not as an afterthought, but as a design constraint. A failure condition is not "the success metric was not met." It is a specific result: "fewer than 8% of users who see the toggle activate it" or "median task completion time exceeds 4 minutes in usability sessions." Writing the failure condition first forces the PM and agent to confront what a negative result actually looks like. Second, calibrating the success threshold so that achieving it would actually mean something. A Test where "5 users signing up" counts as success, when the product already has 500 users, is not falsifiable in any meaningful sense. The success bar needs to be set at a level that is actually uncertain, not at a level that is virtually guaranteed. Where possible the threshold is anchored to the KR the Solution is meant to move: how much of the gap to the KR target would this effect close? Third, applying this discipline to the interpretation phase: not allowing a result that narrowly misses the failure condition to be reframed as a near-success.

The skill also covers a specific failure mode called the unfalsifiable Test: a Test structured so that almost any result confirms the assumption. These are common in product teams under pressure to show progress. An agent without null hypothesis awareness will generate unfalsifiable Tests without recognizing them, because the structure looks reasonable on the surface: "we'll test this feature and measure engagement." Engagement is not a falsifiable metric. It can always be framed positively. A falsifiable version says: "We will measure 7-day retention specifically, and define failure as a less than 2 percentage point lift compared to the control group, with a pre-specified minimum sample size of 400 users per group."

This skill is closely related to the PM judgment layer of the Agentic PM model. The agent surfaces the null hypothesis structure and flags when it is missing or calibrated wrong. The PM decides what the right success and failure thresholds are, based on knowledge of the user base, the business context, and the metric. But the agent must prompt that decision. It cannot leave those thresholds implicit.

## Why It Matters

Tests without well-defined failure conditions do not generate learning. They generate confirmation. Teams that run Tests without explicit failure conditions reliably interpret ambiguous results as positive, keep Solutions alive longer than they should, and ship features that do not move the KR. This pattern is sometimes called "success theater": running Tests that are designed, consciously or not, to be impossible to fail.

In the Loop tree this failure travels upward. A Test result sets the confidence on its Solution; Solution progress informs the KR; the KR informs the Outcome; the Outcome informs the status of the Opportunity. A Test that can't fail pushes false confidence at every level above it. The KR looks like it has a promising Solution when it has an untested one, and the tree's fan-out rule (at least three candidates, each with a Test) is satisfied in form and empty in substance.

Agents are particularly prone to this failure mode because they are trained to be helpful and to support the user's goals. Structuring a Test so it could embarrass the user's favorite Solution feels uncooperative. But in discovery practice, an agent that cannot help design Tests that could fail is actively harmful: it gives the PM false confidence in the validity of results. An agent that only designs Tests structured to confirm is not a discovery assistant. It is a rationalization engine.

The calibration problem is equally important. Success thresholds set too low produce Tests that confirm assumptions trivially. If a PM already has 5,000 active users and sets "20 people sign up for the beta" as the success criterion for a new feature, that Test cannot distinguish between genuine demand and normal baseline behavior. The agent must recognize when a proposed success metric is unanchorable (not set relative to anything that gives it meaning) and flag it before the Test runs, not after.

## What Good Looks Like

**Poor output — unfalsifiable Test design:**

> Solution: Add a streak feature to encourage daily check-ins.
> Test: Launch the streak feature to a beta group and measure engagement.
> Success: Users engage with the streak feature.
>
> (No failure condition defined. "Engage" is undefined. Any result will look like confirmation.)

---

**Slightly better but still problematic:**

> Success: 30% of beta users activate the streak feature within the first week.
> Failure: Fewer than 30% activate.
>
> (The threshold is arbitrary. We do not know if 30% is high or low. No comparison to base rates. No definition of "activate.")

---

**Strong output — falsifiable design with calibrated thresholds:**

> Solution: `SOL-9` Add a streak feature to encourage daily check-ins (under `OUT-1-KR-2`, 7-day check-in rate, baseline 41%, target 50%).
> Assumption being tested: Users who see a streak display will change their check-in behavior because of it, not just use it passively.
>
> Null hypothesis: The streak feature has no effect on 7-day check-in frequency compared to users without access to it.
>
> Test design: A/B test. Group A sees the streak display. Group B does not. Both groups are existing users with at least 30 days of history, to control for novelty effects.
>
> Success condition (reject null): Group A shows a 4+ percentage point increase in 7-day check-in rate vs. Group B, sustained over 3 weeks (not just week 1). Statistical significance at p < 0.05 with minimum 500 users per group.
>
> Why 4 percentage points: Our current 7-day check-in rate is 41% against a KR target of 50%. A 4pp lift would close roughly 45% of that gap, the threshold at which this Solution would meaningfully contribute to the KR. A lift smaller than this would not move the KR in a way the business cares about, even if statistically significant.
>
> Failure condition (fail to reject null): Less than a 4pp lift, or a statistically significant result that is smaller than 4pp (practically insignificant). Also includes: any result where Group A shows higher week-1 engagement that decays by week 3, which would indicate novelty, not behavior change.
>
> Kill condition: If week-3 data shows under 2pp lift, we archive the Solution and revisit the Opportunity framing. If week-3 shows 2-4pp, we investigate whether a redesign of the streak display could amplify the effect before deciding.
>
> Criteria locked: dated on `TST-n` before launch.

---

The strong output makes the null hypothesis explicit, calibrates the threshold against something real (the KR target), defines failure specifically, and distinguishes practical from statistical significance. The kill condition creates a decision rule before the results are seen.

## Failure Modes

**Implicit null hypothesis.** The Test design specifies a success condition but no failure condition. Results that are ambiguous or negative get interpreted as "we need more data" rather than "this did not work."

**Threshold anchoring to arbitrary numbers.** Success is set at "10% conversion" without any reference to current baseline, industry benchmarks, or the minimum threshold that would actually move the KR. A 10% conversion rate might be strong in one context and a failure in another.

**Conflating statistical significance with practical significance.** The Test is powered to detect very small effects, achieves statistical significance at p < 0.05 on a 0.5 percentage point lift, and declares success. A 0.5pp lift may be real and detectable and still be completely irrelevant to the KR the team owns.

**Novelty effect blindness.** The Test is designed to measure week-1 engagement without controlling for novelty. New features almost always show elevated engagement in week 1. A Test that measures only week 1 will almost always produce a positive result, regardless of whether the feature has durable value.

**Moving the goalposts after results arrive.** This is not strictly a Test design failure. It is an interpretation failure. But it begins with a design failure: not writing and locking the failure condition before the Test runs. Agents that help generate post-hoc reframings of failures are enabling this pattern.

**Vague metrics.** "Engagement," "satisfaction," "interest," and "usage" are not falsifiable metrics. They can be operationalized in dozens of ways, most of which can be spun positively. A falsifiable metric is specific, directional, and tied to a threshold.

**Testing the wrong thing.** The null hypothesis is crisp, but it is about a convenient assumption rather than the Solution's riskiest one. A Test that can fail on an unimportant question still leaves the Solution's real risk untested.

## How to Evaluate It

1. **Null hypothesis extraction test.** Give the agent a Test design and ask: "Write the null hypothesis for this Test in one sentence." A skilled agent will produce something like: "The streak feature has no effect on 7-day check-in frequency." An unskilled agent will either produce a positive-framing statement or be unable to formulate one at all.

2. **Threshold calibration test.** Give the agent a proposed success metric (e.g., "10% of users click the new CTA") and ask: "Is this threshold anchored to anything meaningful? What would this result tell us?" A skilled agent will ask what the current baseline is and what minimum effect size would matter to the KR.

3. **Failure condition elicitation test.** Present a Test design with only a success condition defined. Ask the agent: "What would failure look like?" See if it produces a specific, operationalized failure condition or a vague statement like "the success metric wasn't met."

4. **Novelty control test.** Present a Test design that measures only week-1 results. Ask the agent: "Is this design vulnerable to novelty effects? How would you redesign it?" A skilled agent will recommend a sustained measurement period and explain why week-1 results alone are insufficient for behavior-change assumptions.

5. **Unfalsifiable Test detection.** Present a Test designed to measure "user engagement with the feature." Ask the agent: "Is this Test falsifiable? What result would cause us to archive this Solution?" If the agent cannot answer clearly, flag the design as problematic.

6. **Criteria-locking test.** Ask the agent to prepare a Test for launch. Check that the success, failure and kill conditions are recorded and dated on the Test before it runs, and that later changes require a stated reason.

## How to Develop It

**Require null hypothesis as a mandatory output field.** Build a template into the system prompt that requires the agent to complete: "Null hypothesis: [feature/change] has no effect on [specific metric]." This forces explicit articulation before the success condition is defined.

**Lock and date failure conditions.** Require the agent to timestamp or log the failure condition at design time. This creates an artifact that prevents post-hoc goalpost shifting. In practice, this means the agent produces a dated Test record with the failure condition listed, and the PM is told of it before the Test runs. A change to the criteria after launch is logged as a change with a reason, not silently applied.

**Anchor thresholds to metric math.** Require the agent to trace the logic from the proposed success threshold back to the KR's baseline and target. "We need a 4pp lift because..." should be a mandatory sentence in every Test design. This forces the calibration conversation before the Test runs.

**Novelty effect protocol.** Add a standard checklist item: "Does this Test design control for novelty effects? If the behavior being measured is durable behavior change, is there a week-3+ measurement point?" Build this into the Test design template.

**Post-Test null review.** After each Test, prompt the agent: "Based on the results, did we reject the null hypothesis? Was the failure condition met?" Force a clean binary before any interpretation or recommendation. This trains the agent to treat null hypothesis evaluation as a first step, not an afterthought.

## Sample Prompts

**Prompt 1 — Full falsifiable design:**
> "Design a falsifiable Test for the following assumption on [SOL-n]: [assumption]. The design must include: (1) the null hypothesis in one sentence, (2) a success condition with a specific numeric threshold anchored to the KR's baseline and target, (3) a failure condition that is specific and observable, not just 'success was not achieved,' (4) a kill condition that describes what result causes us to archive this Solution, and (5) a note on whether novelty effects could confound the results and how the design controls for them."

**Prompt 2 — Calibration challenge:**
> "Here is our proposed success metric: [metric and threshold]. Is this threshold anchored to anything meaningful (our current baseline, the KR target, or a minimum effect size that matters)? If not, what information do we need to calibrate it properly, and what would a calibrated version look like?"

**Prompt 3 — Unfalsifiable Test audit:**
> "Review this Test design: [design]. Answer these questions: (1) Is there an explicit failure condition? (2) Is the success threshold set at a level that is actually uncertain, or is it trivially easy to hit? (3) Is the measurement metric specific enough that results cannot be reinterpreted after the fact? (4) Could a result that is genuinely bad for the KR still be framed as a success given this design? Flag any problems and propose fixes."

## Connected Skills

- [[Assumption Decomposition]] — identifies which Solution assumption the Test should be designed to falsify
- [[Test Minimalism]] — ensures the falsifiable Test is also the smallest Test that can produce the signal
- [[Result Interpretation]] — reads outcomes against the pre-defined null hypothesis without post-hoc reframing, and carries the result up the tree
- [[Confidence Tagging]] — assigns confidence levels that account for whether the Test was properly falsifiable
- [[Bias Detection]] — catches when Test designs are structured to confirm rather than challenge
- [[Epistemic Self-Awareness]] — enables the agent to flag when success thresholds are unanchored to known baselines
- [[Evidence Attribution]] — ensures Test results are tracked against the specific Solution assumption they were designed to test
