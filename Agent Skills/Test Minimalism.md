# Test Minimalism

> Designing the smallest, fastest test that produces meaningful signal on the riskiest assumption — not the most rigorous or comprehensive test available.

**Layer:** 3 — Experiment & Assumption Reasoning
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Test minimalism is the discipline of working backward from a specific question — "what is the minimum we need to learn to decide whether to continue?" — and designing an experiment that answers only that question, nothing else. It is the practice of aggressive scope reduction applied to experiment design. It is not about cutting corners. It is about matching test complexity to the state of knowledge. Early in a solution branch, when almost everything is unproven, a two-week fake door test gives more decision-relevant signal than a six-week A/B test of a fully built feature.

The key cognitive move is backward design. Most agents (and many PMs) design experiments forward: they start with the solution, then ask "how do we test this?" This reliably produces over-engineered tests — A/B tests when concierge would work, fully coded prototypes when paper sketches would work, live experiments when a five-person usability session would work. Backward design starts with the decision: "What would cause us to continue investing in this solution branch? What would cause us to kill it?" Then it asks: "What is the smallest piece of evidence that would move us in one direction or another?" Then it designs the test that generates that evidence.

The skill also includes isolation discipline — the insistence on testing one assumption at a time. Multi-assumption tests are seductive because they feel efficient, but they reliably produce uninterpretable results. If a landing page test changes the headline, the CTA, and the price simultaneously, a low conversion rate tells you nothing about which element failed. Test minimalism means resisting the temptation to bundle, and flagging explicitly when a proposed test is testing more than one assumption.

Understanding the experiment type ladder is central to this skill. The ladder runs from fake door (demand validation with zero build) through concierge (manual delivery of the solution to validate the value proposition before automation) through prototype testing (wizard of oz or lo-fi, to test usability and desirability without full engineering investment) through A/B testing (live comparison with a subset of real users) through staged rollout (progressively expanding release with monitoring). Moving up the ladder costs more time and money. The default should be the lowest rung that answers the question. Moving up requires a specific justification: the question genuinely cannot be answered by a lower-cost method.

## Why It Matters

Agents trained on general research methodology will default to recommending A/B tests. This is not because A/B tests are always appropriate — it is because A/B tests are the most cited method in PM literature and training data, and agents pattern-match to what they have seen most. The consequence is systematic over-engineering of early experiments. Teams waste four to eight weeks building infrastructure to A/B test an assumption that a fake door or a five-person concierge pilot would have resolved in ten days.

The compounding cost is even larger than the time cost on a single experiment. Teams that habitually over-engineer experiments run fewer experiments per quarter. Fewer experiments means fewer opportunities to kill bad ideas early and double down on good ones. In a discovery practice grounded in Torres's model, velocity of learning is a core performance variable — teams that run six experiments per quarter beat teams that run two, even if the individual experiment quality is lower. Test minimalism is what makes high-velocity learning possible.

There is also a motivation and morale effect that PMs often underestimate. When teams routinely spend six weeks building things they then kill based on the experiment result, morale suffers and there is political pressure to not kill ideas that failed their experiments. Test minimalism reduces the psychological cost of killing a solution branch because the team has not over-invested in it. A concierge test that fails represents one week of effort. That is easy to kill. A fully built A/B test that fails represents eight weeks of engineering. That is very hard to kill.

## What Good Looks Like

**Poor output — over-engineered recommendation:**

> Assumption to test: Do users want a weekly email digest of their activity data?
>
> Recommended test: Build the weekly digest feature, release it to 50% of users, and measure open rate, click-through rate, and 30-day retention difference between the test and control groups. Run for six weeks to achieve statistical significance.

This recommends A/B testing a fully built feature to validate basic demand. It requires engineering resources, six weeks of calendar time, and statistical analysis infrastructure — before we know whether users want this at all.

---

**Strong output — minimal test with clear rationale:**

> Assumption to test: Do users want a weekly email digest of their activity data?
>
> Decision this test informs: Whether to invest engineering time building the digest feature.
>
> Minimum test: Fake door with manual fulfillment.
> — Add a "Weekly Digest" toggle to the settings page (one engineering hour).
> — When a user enables it, log the action and send a manually assembled email from a shared inbox on Friday.
> — Run for two weeks with the first 100 users who see the toggle.
>
> Success metric: 15%+ toggle rate, and 40%+ open rate on the manual emails.
> Failure metric: Under 8% toggle rate, or users toggle it on and ignore the emails (under 20% open rate).
>
> Why not an A/B test: We do not know yet whether demand exists. Building the feature to A/B test it would require 3-4 engineering weeks before we have any signal on basic demand. This test gives us demand signal in two weeks with approximately two hours of engineering work.
>
> What this test does NOT tell us: Whether the automated version would perform at the same quality as a manually assembled email. That is a feasibility/viability assumption we test later, if demand is confirmed.

---

The strong output includes the key elements: a specific decision being enabled, the choice of test type with an explicit rationale for not going higher up the ladder, clear success and failure metrics, and an honest statement of what the test does not tell us.

## Failure Modes

**Default A/B test recommendation.** The agent recommends an A/B test for every assumption, regardless of where in the solution lifecycle the team is. A/B tests are appropriate for later-stage validation (does this version perform better than that version?), not for early demand or desirability validation.

**Building to test.** The agent recommends building the feature before testing whether it is wanted. This is backwards. You test demand before you build, not after.

**Multi-assumption tests.** The agent designs a test that simultaneously changes multiple variables — messaging, price, form factor, and feature set. When results come in, there is no way to know which variable drove the result.

**Fake minimalism.** The agent recommends a "concierge test" but scopes it to 500 users over eight weeks with a full operational setup. This is not a concierge test in any useful sense — it is a scaled manual operation that costs as much as building the feature. True concierge is five to twenty users, enough to validate the value proposition, not to establish statistical confidence.

**Ignoring the experiment type ladder.** The agent does not reason about which rung of the ladder is appropriate. It picks a test type arbitrarily or defaults to the most familiar one. It does not ask "why can't we answer this with a lower-cost test?" before recommending a higher-cost one.

**Testing the wrong assumption.** The agent designs a minimal test, but tests a low-stakes assumption while the high-stakes assumption (from the assumption map) goes untested. Minimalism without assumption ranking produces efficient tests of unimportant questions.

## How to Evaluate It

1. **Ladder justification test.** Give the agent a solution and assumption, then ask it to design a test. After it produces a recommendation, ask: "Why can't we answer this with a fake door?" If it cannot articulate a specific reason the question requires a more expensive method, the recommendation is over-engineered.

2. **Isolation test.** Give the agent a multi-variable test design and ask it to evaluate whether the test can distinguish between competing explanations. A skilled agent will flag the isolation problem and propose a single-variable alternative.

3. **Build-before-test detection test.** Present the agent with a proposed experiment that requires the feature to be built first. Ask: "Is there a way to test this before building?" A skilled agent will suggest a fake door, concierge, or prototype alternative.

4. **Concierge calibration test.** Ask the agent to design a concierge test. Check whether the proposed scope (number of users, duration) is genuinely minimal or whether it has inflated to something that requires significant operational overhead.

5. **Decision anchoring test.** Ask the agent: "What decision does this experiment enable?" The answer should be binary and actionable: "Continue investing in this solution branch" or "Kill this branch and redirect." If the agent cannot name the decision, the test is not properly scoped.

## How to Develop It

**Prompt engineering: backward design forcing function.** Build the backward design sequence into the system prompt explicitly. Require the agent to answer three questions before designing any test: (1) What decision does this test enable? (2) What is the minimum result that would move us toward the "continue" decision? (3) What is the minimum result that would move us toward the "kill" decision? Only then design the test.

**Ladder documentation in context.** Include the experiment type ladder with descriptions and cost/speed profiles in the agent's system context. Require the agent to justify why it is not using the next-lower rung before recommending any test type.

**Isolation rule enforcement.** Add a mandatory output field: "How many assumptions does this test test simultaneously?" If the answer is more than one, require the agent to propose a redesign before proceeding.

**Calibration through examples.** Train the agent on paired examples: a bloated test recommendation next to the minimal version that produces equivalent signal faster. Pattern recognition on the contrast builds the reflex.

**Post-test scope review.** After each experiment completes, have the agent retrospectively assess: "Did we learn what we needed to in order to make the decision? Could we have learned it faster with a smaller test?" This feedback loop builds calibration over time.

## Sample Prompts

**Prompt 1 — Backward design:**
> "We are considering testing the following solution assumption: [assumption]. Before designing the test, answer these three questions: (1) What exact decision will this test enable us to make? (2) What is the minimum evidence that would support continuing? (3) What is the minimum evidence that would support stopping? Then, working backward from those answers, design the smallest test that would produce that evidence. Start with a fake door and explain why you are or are not moving up the experiment ladder."

**Prompt 2 — Over-engineering audit:**
> "Here is the experiment design our team is planning: [design]. Evaluate it on the following criteria: (1) Is there a lower-cost test type that would answer the same question? (2) Is this test testing more than one assumption simultaneously? (3) Does the test require building any part of the solution before we have demand validation? Recommend a simpler alternative if any of these are true."

**Prompt 3 — Assumption-to-test mapping:**
> "Given this ranked assumption map: [map], design a test for assumption #1 only. The test must: use the lowest rung of the experiment ladder that can answer the question, test exactly one assumption, and be completable in under three weeks with under two weeks of engineering time. State what the test does not tell us."

## Connected Skills

- [[Assumption Decomposition]] — provides the ranked assumption map that determines which assumption to test first
- [[Null Hypothesis Awareness]] — ensures the minimal test is designed so it could actually fail
- [[Result Interpretation]] — reads the outcome of the minimal test without over-claiming
- [[Tree Health Checks]] — tracks whether the solution branch is generating tests at appropriate velocity
- [[Dead Ideas Tracking]] — captures what was learned when a minimal test kills a solution branch
- [[Escalation Calibration]] — determines when a minimal test result is ambiguous enough to require escalation before deciding to continue or kill
