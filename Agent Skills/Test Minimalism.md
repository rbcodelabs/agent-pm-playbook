# Test Minimalism

> Designing the cheapest Test that could falsify a Solution's riskiest assumption, with success and failure criteria written before it runs. The goal is meaningful signal, not the most rigorous or comprehensive Test available.

**Layer:** 3 — Test & Assumption Reasoning
**Companion:** [[Agentic PM — Agent Capability Framework]]
**Structure:** `guides/the-loop.md`. A Test (`TST-n`) hangs off exactly one Solution (`SOL-n`), is scoped to one assumption of that Solution, and its result is logged against the KR the Solution is trying to move.

---

## What This Skill Is

Test minimalism is the discipline of working backward from a specific question ("what is the minimum we need to learn to decide whether to keep investing in this Solution?") and designing a Test that answers only that question, nothing else. It is aggressive scope reduction applied to Test design. It is not about cutting corners. It is about matching Test complexity to the state of knowledge. Early in a Solution's life, when almost everything is unproven, a two-week fake door gives more decision-relevant signal than a six-week A/B test of a fully built feature.

In the Loop model a Test is never free-floating. It exists to put one assumption of one Solution at risk. Every Solution carries a list of assumptions with the riskiest one named, and the Solution needs at least one Test before it is built. Test minimalism picks the cheapest Test that could falsify that riskiest assumption. The acceptance criteria (what counts as success, what counts as failure, what kills the Solution) are written before the Test runs, so the result can't be argued into whatever shape is convenient.

The key cognitive move is backward design. Most agents (and many PMs) design Tests forward: they start with the Solution, then ask "how do we test this?" This reliably produces over-engineered Tests: A/B tests when a concierge pilot would work, fully coded prototypes when paper sketches would work, live tests when a five-person usability session would work. Backward design starts with the decision: "What would cause us to keep investing in this Solution? What would cause us to archive it?" Then it asks: "What is the smallest piece of evidence that would move us in one direction or the other?" Then it designs the Test that generates that evidence.

The skill also includes isolation discipline: one assumption per Test. Multi-assumption Tests are seductive because they feel efficient, but they reliably produce uninterpretable results. If a landing page Test changes the headline, the CTA, and the price simultaneously, a low conversion rate tells you nothing about which element failed. Test minimalism means resisting the temptation to bundle, and flagging explicitly when a proposed Test touches more than one assumption. If a Test truly needs two assumptions, it is two Tests under the same Solution.

Understanding the test type ladder is central to this skill. The ladder runs from copy and micro-content tests (choosing between concrete wordings or small UI elements with real users, at the bottom) through fake door (demand validation with zero build) through concierge (manual delivery of the Solution to validate the value proposition before automation) through prototype testing (wizard of oz or lo-fi, to test usability and desirability without full engineering investment) through A/B testing (live comparison with a subset of real users) through staged rollout (progressively expanding release with monitoring). Moving up the ladder costs more time and money. The default should be the lowest rung that answers the question. Moving up requires a specific justification: the question genuinely cannot be answered by a lower-cost method.

The bottom rung deserves its own emphasis because it is the one teams skip most often, not by over-engineering, but by not testing at all. When the open question is which headline, CTA, or microcopy variant works best, the correct move is a same-day Test with real users, not a round of internal opinions. Treating a copy choice as a discussion topic rather than a testable question is the same failure as building before testing demand: it substitutes internal confidence for external signal, just at a smaller and lower-stakes scale.

## Why It Matters

Agents trained on general research methodology will default to recommending A/B tests. This is not because A/B tests are always appropriate. It is because A/B tests are the most cited method in PM literature and training data, and agents pattern-match to what they have seen most. The consequence is systematic over-engineering of early Tests. Teams waste four to eight weeks building infrastructure to A/B test an assumption that a fake door or a five-person concierge pilot would have resolved in ten days.

The compounding cost is even larger than the time cost on a single Test. Teams that habitually over-engineer Tests run fewer Tests per quarter. Fewer Tests means fewer opportunities to retire weak Solutions early and double down on strong ones. In a discovery practice grounded in continuous discovery, velocity of learning is a core performance variable: teams that run six Tests per quarter beat teams that run two, even if the individual Test quality is lower. The tree's fan-out rules make this concrete. A KR needs at least three candidate Solutions, and each needs a Test before it is built, so a team that can only afford one heavyweight Test per cycle cannot honor the structure at all. Test minimalism is what makes high-velocity learning possible.

There is also a motivation and morale effect that PMs often underestimate. When teams routinely spend six weeks building things they then retire based on the Test result, morale suffers and there is political pressure to not retire Solutions that failed their Tests. Test minimalism reduces the psychological cost of archiving a Solution because the team has not over-invested in it. A concierge Test that fails represents one week of effort. That is easy to archive. A fully built A/B test that fails represents eight weeks of engineering. That is very hard to archive.

## What Good Looks Like

**Poor output — over-engineered recommendation:**

> Assumption to test: Do users want a weekly email digest of their activity data?
>
> Recommended test: Build the weekly digest feature, release it to 50% of users, and measure open rate, click-through rate, and 30-day retention difference between the test and control groups. Run for six weeks to achieve statistical significance.

This recommends A/B testing a fully built feature to validate basic demand. It requires engineering resources, six weeks of calendar time, and statistical analysis infrastructure before we know whether users want this at all.

---

**Strong output — minimal Test with clear rationale:**

> Solution: `SOL-7` Weekly activity digest (under `OUT-2-KR-1`, weekly active return rate)
> Assumption to test: Users want a weekly email digest of their activity data. This is the riskiest assumption on the Solution; the others (feasibility, deliverability) are cheaper to check later.
>
> Decision this Test informs: Whether to invest engineering time building the digest, or archive the Solution and move on to the next candidate under the KR.
>
> Minimum Test: Fake door with manual fulfillment.
> — Add a "Weekly Digest" toggle to the settings page (one engineering hour).
> — When a user enables it, log the action and send a manually assembled email from a shared inbox on Friday.
> — Run for two weeks with the first 100 users who see the toggle.
>
> Criteria (written before the Test runs): Success is a 15%+ toggle rate and a 40%+ open rate on the manual emails. Failure is under an 8% toggle rate, or users toggle it on and ignore the emails (under 20% open rate).
>
> Why not an A/B test: We do not know yet whether demand exists. Building the feature to A/B test it would require 3-4 engineering weeks before we have any signal on basic demand. This Test gives us demand signal in two weeks with approximately two hours of engineering work.
>
> What this Test does NOT tell us: Whether the automated version would perform at the same quality as a manually assembled email. That is a feasibility and viability assumption we test later, if demand is confirmed.
>
> Where the result goes: Logged on `TST-n`, updates `SOL-7` confidence, then informs `OUT-2-KR-1`.

---

The strong output includes the key elements: a specific Solution and assumption, the decision being enabled, the choice of Test type with an explicit rationale for not going higher up the ladder, success and failure criteria fixed in advance, an honest statement of what the Test does not tell us, and where the result lands in the tree.

## Failure Modes

**Default A/B test recommendation.** The agent recommends an A/B test for every assumption, regardless of where in the Solution's lifecycle the team is. A/B tests are appropriate for later-stage validation (does this version perform better than that version?), not for early demand or desirability validation.

**Building to test.** The agent recommends building the feature before testing whether it is wanted. This is backwards. You test demand before you build, not after. A Solution with no Test has not earned a roadmap item.

**Multi-assumption Tests.** The agent designs a Test that simultaneously changes multiple variables: messaging, price, form factor, and feature set. When results come in, there is no way to know which variable drove the result.

**Fake minimalism.** The agent recommends a "concierge test" but scopes it to 500 users over eight weeks with a full operational setup. This is not a concierge Test in any useful sense. It is a scaled manual operation that costs as much as building the feature. True concierge is five to twenty users, enough to validate the value proposition, not to establish statistical confidence.

**Ignoring the test type ladder.** The agent does not reason about which rung of the ladder is appropriate. It picks a Test type arbitrarily or defaults to the most familiar one. It does not ask "why can't we answer this with a lower-cost Test?" before recommending a higher-cost one.

**Testing the wrong assumption.** The agent designs a minimal Test, but tests a low-stakes assumption while the riskiest assumption on the Solution goes untested. Minimalism without assumption ranking produces efficient Tests of unimportant questions.

**Criteria written after the fact.** The Test runs, the number comes in, and only then does anyone decide what it means. A Test whose success and failure criteria were not fixed beforehand cannot falsify anything. See [[Null Hypothesis Awareness]].

**Test with no Solution.** The agent designs a clever Test of a general curiosity ("do users like dark mode?") that hangs off no Solution assumption. By the tree's rules this is not a Test; it is research, and belongs with the evidence on an Opportunity.

**Debating instead of testing.** The team (or the agent, by facilitating it) treats a copy, wording, or small-UI-element decision as something to resolve through internal discussion (a chat thread, a design review, a stakeholder's preference) rather than a cheap external Test. This is the inverse failure mode from over-engineering: instead of spending too much on a Test, the team spends real time (meetings, revision cycles, escalations) on a question a same-day test with real users would answer more cheaply and more accurately. The tell is a decision that keeps getting re-opened by new opinions with no new evidence. The fix is not "test less" or "test more." It is recognizing that this is still a testable question and routing it to a copy or micro-content Test instead of another round of internal refinement.

## How to Evaluate It

1. **Ladder justification test.** Give the agent a Solution and assumption, then ask it to design a Test. After it produces a recommendation, ask: "Why can't we answer this with a fake door?" If it cannot articulate a specific reason the question requires a more expensive method, the recommendation is over-engineered.

2. **Isolation test.** Give the agent a multi-variable Test design and ask it to evaluate whether the Test can distinguish between competing explanations. A skilled agent will flag the isolation problem and propose a single-assumption alternative, or split it into two Tests under the same Solution.

3. **Build-before-test detection test.** Present the agent with a proposed Test that requires the feature to be built first. Ask: "Is there a way to test this before building?" A skilled agent will suggest a fake door, concierge, or prototype alternative.

4. **Concierge calibration test.** Ask the agent to design a concierge Test. Check whether the proposed scope (number of users, duration) is genuinely minimal or whether it has inflated to something that requires significant operational overhead.

5. **Decision anchoring test.** Ask the agent: "What decision does this Test enable?" The answer should be binary and actionable: "Continue investing in this Solution" or "Archive this Solution and move to the next candidate under the KR." If the agent cannot name the decision, the Test is not properly scoped.

6. **Riskiest-assumption test.** Give the agent a Solution with a ranked assumption list. Ask for a Test. It should target the top-ranked assumption, and say so, rather than the easiest one to measure.

7. **Criteria-first test.** Ask for a Test design. Check that success and failure criteria appear before the run, tied to a threshold, not added as an afterthought.

## How to Develop It

**Prompt engineering: backward design forcing function.** Build the backward design sequence into the system prompt explicitly. Require the agent to answer three questions before designing any Test: (1) What decision does this Test enable? (2) What is the minimum result that would move us toward the "continue" decision? (3) What is the minimum result that would move us toward the "archive" decision? Only then design the Test.

**Ladder documentation in context.** Include the test type ladder with descriptions and cost/speed profiles in the agent's system context. Require the agent to justify why it is not using the next-lower rung before recommending any Test type.

**Isolation rule enforcement.** Add a mandatory output field: "How many assumptions does this Test test simultaneously?" If the answer is more than one, require the agent to propose a redesign before proceeding.

**Parent fields as required output.** Every Test design names its Solution, the assumption under test, and the KR the result will inform. A Test that can't fill those three fields isn't ready.

**Calibration through examples.** Train the agent on paired examples: a bloated Test recommendation next to the minimal version that produces equivalent signal faster. Pattern recognition on the contrast builds the reflex.

**Post-test scope review.** After each Test completes, have the agent retrospectively assess: "Did we learn what we needed to in order to make the decision? Could we have learned it faster with a smaller Test?" This feedback loop builds calibration over time.

## Sample Prompts

**Prompt 1 — Backward design:**
> "We are considering a Test of the following assumption on Solution [SOL-n]: [assumption]. Before designing the Test, answer these three questions: (1) What exact decision will this Test enable us to make? (2) What is the minimum evidence that would support continuing? (3) What is the minimum evidence that would support archiving the Solution? Then, working backward from those answers, design the smallest Test that would produce that evidence, with success and failure criteria written before it runs. Start with a fake door and explain why you are or are not moving up the test type ladder."

**Prompt 2 — Over-engineering audit:**
> "Here is the Test design our team is planning: [design]. Evaluate it on the following criteria: (1) Is there a lower-cost Test type that would answer the same question? (2) Is this Test testing more than one assumption simultaneously? (3) Does the Test require building any part of the Solution before we have demand validation? (4) Does it target the Solution's riskiest assumption? Recommend a simpler alternative if any of these are a problem."

**Prompt 3 — Assumption-to-Test mapping:**
> "Given this ranked assumption list for [SOL-n]: [list], design a Test for assumption #1 only. The Test must: use the lowest rung of the test type ladder that can answer the question, test exactly one assumption, and be completable in under three weeks with under two weeks of engineering time. State what the Test does not tell us and which KR the result will inform."

## Connected Skills

- [[Assumption Decomposition]] — provides the ranked assumption list on a Solution that determines which assumption to test first
- [[Null Hypothesis Awareness]] — ensures the minimal Test is designed so it could actually fail
- [[Result Interpretation]] — reads the outcome of the minimal Test without over-claiming and carries it up the tree
- [[Tree Health Checks]] — tracks whether each KR's candidate Solutions are generating Tests at appropriate velocity
- [[Dead Ideas Tracking]] — captures what was learned when a minimal Test retires a Solution
- [[Escalation Calibration]] — determines when a minimal Test result is ambiguous enough to require escalation before deciding to continue or archive
