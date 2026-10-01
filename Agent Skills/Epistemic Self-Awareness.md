# Epistemic Self-Awareness

> The meta-skill of knowing what good PM work looks like well enough to critique the agent's own outputs — applying Torres/Cagan frameworks and the Loop quality gates as filters rather than as generation templates.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]] · [The Loop](../guides/the-loop.md)

---

## What This Skill Is

Epistemic self-awareness is the capacity to step outside one's own output and evaluate it against an external quality standard — and to do this reliably, not just when prompted. It is the difference between an agent that generates Opportunity statements and an agent that knows what makes an Opportunity statement good vs. bad, and applies that knowledge as a filter on its own work before delivering it.

In the PM context, the relevant quality standard is the Torres/Cagan framework as operationalized in the Loop tree, where each level has its own gate:

- **Opportunity:** stated in customer language, a need rather than a feature, evidenced (or tagged `weak`), names a segment, scoped to be addressable without foreclosing the solution space.
- **Outcome:** one sentence, behavior-framed, no numbers, no output ("launch X"), traces to exactly one Opportunity, has 2-3 KRs.
- **Key Result:** measures an outcome rather than an output, has a baseline (or `TBD` with a task), a target, and a date; at most three per Outcome.
- **Solution:** one of at least three meaningfully different ways to move a single parent KR, with assumptions listed and the riskiest one named.
- **Test:** falsifiable, scoped to one Solution assumption, with success and failure criteria written before it runs.

Teresa Torres is specific about what makes a good Opportunity: it is stated in customer language, not solution language; it represents a need, desire, or pain the customer actually has; it is scoped appropriately to be addressable without being so narrow it constrains the solution space. An agent with epistemic self-awareness can apply these criteria to an Opportunity statement it just drafted and catch its own errors: "This Opportunity says 'users need a better dashboard' — that's solution language, and it's also our language, not theirs. Let me reframe: 'Users lose time re-orienting to their current state when they return to the product after a break.' That's closer." Without this self-correction, every Opportunity statement that leaves the agent is a PM task: the PM must read it, recognize the error, correct it, and feed it back.

The skill is also what makes all other Layer 4 skills coherent. Confidence tagging without epistemic self-awareness produces tags that are mechanically attached but not thoughtfully calibrated — the agent knows to tag, but doesn't know what its tags should accurately reflect. Bias detection without epistemic self-awareness produces formulaic disclaimers rather than genuine skew identification. Escalation calibration without it produces a rule-following pattern rather than genuine judgment. Epistemic self-awareness is the substrate on which all the other metacognitive skills run.

What the skill requires in practice is that the agent maintains a dual-process model for any output: a generation process (producing the content) and an evaluation process (reviewing it against what "good" looks like). These two processes should be genuinely distinct — the evaluation process should be willing to find the generation wanting. An agent that always approves its own outputs is not running an evaluation process; it is performing one. The evaluation process also checks the tree as a whole, not just single records: does each record have one parent, does each Test bear on an assumption of its own Solution, and do results flow up (Test to Solution confidence, to KR, to Outcome health, to Opportunity status) rather than being filed against the wrong level?

## Why It Matters

Without epistemic self-awareness, errors compound silently. An Opportunity statement in solution language goes unquestioned through the synthesis review, into the tree, and becomes the basis for Solution brainstorming — which will be skewed toward the implied solution before the team has explored the Opportunity space. A Test brief without a real failure criterion gets approved and run — producing results that can't be cleanly interpreted because there was no pre-specified threshold for what would count as a failure. A cluster built around vivid quotes rather than representative ones becomes a high-confidence Opportunity — triggering investment in a problem that affects a minority of users. A KR that actually measures an output ("ship the guide") passes review and the Outcome looks healthy while customer behavior never changes.

Each of these errors is catchable at the generation stage if the agent applies the right quality criteria. Each of them is harder and more expensive to catch later. The PM reviewing a synthesis is working with the agent's output as given — they are not typically running a first-principles check on whether each Opportunity statement is in customer language. They may be too close to the material, or moving too fast, to catch the errors the agent should have caught. The agent's epistemic self-awareness is the first line of defense in a multi-layer quality system.

Cagan's framework for empowered teams places the PM in the role of setting direction and creating conditions for discovery — not running quality checks on every artifact the discovery process produces. If the PM is spending their time correcting malformed Opportunity statements and poorly designed Test briefs, they are not empowered — they are editors. Epistemic self-awareness moves the quality filter upstream, to where it belongs: inside the agent's own process, before the PM ever sees the output.

## What Good Looks Like

**Opportunity — self-correction in practice:**

Draft Opportunity (before self-review):
> Opportunity: Users need a simplified onboarding wizard that walks them through setup step by step.

Agent's self-review:
> "This is in solution language — 'wizard' is a specific UI pattern, not a customer need. It's also in our language, not the user's. Checking the source interviews: users described 'not knowing what to do next' and 'feeling like I was missing a setup step and couldn't figure out which one.' Reframing."

Revised Opportunity:
> Opportunity: New users are uncertain whether their initial setup is complete and can't tell what, if anything, they've missed.

This version is in customer voice, describes a need/pain without prescribing a solution, and opens a wider solution space than the original.

**Test — self-correction in practice:**

Draft Test brief (before self-review):
> Test: Add a progress indicator to the onboarding flow. Success metric: NPS improves. Run for 4 weeks.

Agent's self-review:
> "No failure criterion — 'NPS improves' is vague and NPS is a lagging indicator that won't move in 4 weeks for a UI change. There's also no minimum effect size, so I can't tell from this what a failure looks like. Also: this Test exercises the Solution's polish, not its riskiest assumption. The riskiest assumption is that setup uncertainty is causing drop-off, not the UX quality of the indicator. And the brief doesn't say which KR the result informs. Let me redesign."

Revised Test brief:
> Solution assumption under test: Users who don't complete setup in session 1 are experiencing uncertainty about completion status, not disinterest in the product.
> Test: Surface a "Your setup is X% complete" indicator to 50% of new users in session 1.
> Failure criterion (kill condition): If the 7-day return rate for the treatment group does not exceed control by at least 5 percentage points, the assumption is not supported.
> Informs: the Solution's confidence, and through it the Outcome's setup-completion KR.
> Run time: 14 days (enough to measure 7-day returns from a sufficient cohort).

The second version tests the assumption, has a specific failure criterion, names the KR it informs, and uses a metric that can actually move in the timeframe.

**KR and Solution — self-correction in practice:**

Draft KR (before self-review):
> OUT-3-KR-2: Publish the new setup guide by end of cycle.

Agent's self-review:
> "That is an output, not a measurable signal that the behavior is happening. It would read as green the day the guide ships whether or not anyone completes setup. Reframing it as a measure of the Outcome: 'Share of new accounts that complete setup within 7 days: 41% baseline (TBD: confirm from the last full month) to 60% by end of cycle.' The guide itself is a candidate Solution under this KR, which is where it belongs."

## Failure Modes

**Passing malformed outputs because the self-review is performative.** The agent "checks" its Opportunity statement and declares it correct without applying the actual criteria. The output is approved because the agent is optimizing for task completion, not quality. This is the most common failure mode — visible only in the downstream effects.

**Applying the wrong quality criteria.** The agent knows Opportunity statements should be "clear and specific" — so it checks for clarity and specificity, but not for customer language vs. solution language, or for appropriate scope. Knowing a framework exists is not the same as knowing how to apply it as a quality filter.

**Self-correction that produces overcorrection.** The agent over-applies the "customer language" criterion and produces an Opportunity statement so abstracted from any solution space that it can't be actioned: "Users experience friction in their workflow." This is technically in customer language but is too vague to be useful. Self-awareness requires knowing what "too vague" looks like as well as what "too specific" looks like.

**Epistemic self-awareness applied only to Opportunity statements.** The agent knows to check Opportunities but applies no equivalent check to Outcomes, KRs, Solutions, Test briefs, synthesis clusters, or confidence tags. The skill is not level-specific — it needs to run across all output types, each with their own quality criteria.

**Checking records in isolation but not the chain.** Each record passes its own gate while the tree is incoherent: a Test that probes an assumption belonging to a different Solution, a Solution that addresses a reframing of its Opportunity rather than the Opportunity itself, or evidence attached to a KR rather than to the Opportunity it bears on. Cross-level consistency is part of the quality standard.

**Self-review that isn't documented.** The agent catches an error, corrects it, and presents only the corrected output — leaving the PM with no visibility into what was wrong with the first draft and what was changed. When the PM reviews the output and it looks clean, they have no way to learn from the types of errors the agent commonly catches and corrects. Making self-review visible (even briefly) creates a feedback loop for both the PM and the agent.

## How to Evaluate It

**Test 1 — Deliberate error injection.** Create a synthesis output that contains 5 known errors: an Opportunity in solution language, a Test brief without a failure criterion, a cluster tag without a confidence level, a result interpretation that draws a causal conclusion from correlational data, and a KR that measures an output. Ask the agent to review the output. Does it catch all five? Does it catch them without being told what to look for?

**Test 2 — Self-review on own output.** Ask the agent to produce an Opportunity synthesis, then immediately prompt: "Now review what you just produced. Apply the Torres criteria to each Opportunity statement. Flag any that don't meet the standard and revise them." Evaluate whether the self-review catches genuine issues or approves everything.

**Test 3 — Test brief quality check.** Ask the agent to produce a Test brief and then prompt: "Does this brief have a real failure criterion — a specific, pre-specified threshold that would mean the assumption was not supported? If not, add one. Does it test the Solution's riskiest assumption or its usability? If the latter, redesign." Evaluate the quality of the response.

**Test 4 — Metacognitive articulation.** Ask the agent: "What makes a good Opportunity statement in the Torres framework? Give me the criteria, not the definition." Then ask: "Apply those criteria to the top 3 Opportunities in our current tree." Evaluate whether the criteria it articulates are correct and whether it applies them accurately.

**Test 5 — Cross-level consistency check.** Give the agent an Opportunity and a Test brief that probes a different assumption than the Opportunity and its Solution imply. Ask: "Is this Test testing the right thing for this Solution?" Evaluate whether the agent can identify the mismatch — a cross-level consistency check that requires understanding how the levels relate.

## How to Develop It

**Build framework criteria into system prompts as quality checklists.** For each output type (Opportunity statement, Outcome, KR, Solution, Test brief, synthesis cluster, result interpretation), define the explicit quality criteria the agent should check against before delivering the output. Torres's Opportunity criteria, the Loop gates for each level, the failure criterion requirement for Tests, the confidence tag requirement for clusters — make these checklists, not implicit standards.

**Require a self-review step as part of the output format.** Structure prompts so the agent must produce: [first draft] → [self-review] → [revised output]. The self-review should be visible, not internal. This makes the review process auditable and prevents it from being skipped.

**Use framework-grounded feedback in prompt refinement.** When an agent produces a weak output, the feedback should name the specific criterion that was missed: "This Opportunity is in solution language — it names the UI pattern rather than the user's need. The Torres criterion is: state what the user is experiencing, not what the team wants to build." Framework-grounded feedback trains the evaluation process more effectively than generic quality feedback.

**Train on expert human reviews.** Where possible, obtain examples of expert PM review of Opportunity statements, KRs, Test briefs, and synthesis clusters — reviewing for exactly the errors that epistemic self-awareness should catch. Use these as training examples so the agent has a concrete model of what rigorous self-review looks like.

**Run "confidence in my own output" prompts regularly.** Ask the agent: "On a scale of 1-3, how confident are you that each Opportunity statement in this synthesis meets the Torres criteria? For any you rated below 3, explain what you're uncertain about." This prompt structure surfaces uncertainty in the agent's own self-assessment — which is itself a form of epistemic self-awareness.

## Sample Prompts

**Prompt 1 — Structured self-review:**
> "You've produced the Opportunity synthesis. Before I read it, run a self-review. For each Opportunity statement, apply the following checklist: (1) Is it in customer language or our language? (2) Does it describe a need, pain, or desire — or does it describe a solution? (3) Is the scope appropriate — addressable without being so narrow it forecloses the solution space? (4) Is it evidenced and does it name a segment? Flag any that fail the check, revise them, and document what changed and why."

**Prompt 2 — Test brief quality gate:**
> "Review this Test brief against the following criteria: (1) Does it identify and test the riskiest assumption for this Solution — not the Solution's usability? (2) Is there a specific, pre-specified failure criterion with a minimum effect size? (3) Is the success metric one that can actually move in the proposed timeframe? (4) Is the run time long enough to generate a valid result cohort? (5) Does it say which Solution it belongs to and which KR its result informs? Flag any failures and revise the brief."

**Prompt 3 — Cross-level consistency check:**
> "Here is our current tree with Opportunities, Outcomes, KRs, Solutions, and Tests. Run a cross-level consistency check: (1) For each Test, confirm it tests the riskiest assumption of its parent Solution — not just the Solution's UX. (2) For each Solution, confirm it moves its parent KR and addresses the Opportunity at the root of its chain as stated — not a reframing of it. (3) For each KR, confirm it measures an Outcome rather than an output. (4) For each Opportunity, confirm it is stated in customer language, appropriately scoped, and that its evidence is attached to it (or to a specific Solution or Test), not to a KR. Flag inconsistencies with a specific diagnosis and a proposed fix."

## Connected Skills

[[Confidence Tagging]] — self-awareness is what makes confidence tags accurate rather than mechanical
[[Escalation Calibration]] — self-awareness about the limits of the agent's own judgment is what drives good escalation decisions
[[Bias Detection]] — detecting bias in one's own synthesis is the hardest application of epistemic self-awareness
[[Audience Translation]] — knowing when a finding can't be translated without loss requires meta-level awareness of the finding's complexity
[[Proactive Surfacing]] — knowing what's worth surfacing requires understanding what "matters" relative to the framework
[[Assumption Decomposition]] — self-awareness drives the agent to check its own assumptions, not just the team's
[[Null Hypothesis Awareness]] — a self-aware agent checks whether its Test designs have real null conditions before delivering them
[[Result Interpretation]] — interpreting results requires the agent to check its own interpretive leaps against what the data can actually support
