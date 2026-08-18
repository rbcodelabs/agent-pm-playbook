---
name: experiment-workflow
description: >-
  Design, run, and close out product experiments — the assumption validation
  layer of the Opportunity Solution Tree. Use when the user needs to test a
  solution assumption, log experiment results, review active experiment health,
  or decide what to do after an experiment completes.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - experiment
    - experiments
    - assumption test
    - fake door
    - concierge test
    - prototype test
    - ab test
    - staged rollout
    - assumption validation
    - experiment design
    - kill condition
    - experiment results
    - experiment health
    - discovery experiment
    - copy test
    - content test
    - microcopy test
    - preference test
  intents:
    - design an experiment
    - test this assumption
    - run an experiment
    - log experiment results
    - what kind of experiment should I run?
    - my experiment is done, what next?
    - review active experiments
    - are any experiments stale?
    - how do I test this without building it?
    - what is the riskiest assumption in my solution?
    - write a kill condition
    - the experiment passed, what do we do?
    - the experiment failed, what do we do?
  entities:
    - experiment
    - assumption
    - kill condition
    - success condition
    - fake door
    - concierge
    - prototype
    - ab-test
    - staged-rollout
    - user-interview
    - experiment type
    - experiment result
    - zombie experiment
    - riskiest assumption
    - copy variant
    - internal refinement
chainTo:
  - pattern: "validated|solution.*passes|proceed.*roadmap|move.*roadmap|build this|ready to build"
    targetSkill: investment-gate
    message: Switching to investment gate to assess whether this validated solution is ready to move to build
  - pattern: "kill.*solution|archive.*solution|solution.*dead|solution.*failed|ost|opportunity.*tree"
    targetSkill: ost-workflow
    message: Switching to OST workflow to update the tree and archive the killed solution
  - pattern: "coach|philosophy|strategy|broader|how should we think about|what should we"
    targetSkill: agentic-pm
    message: Switching to PM coaching for broader strategic guidance on experiments and discovery
---

# Experiment Workflow

## Provider Preflight

Before reading or writing state, read `pm-config.md` and resolve the `experiments` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Confirm exactly one authoritative provider. Use its workflow for persistence; do not silently create Markdown. Any secondary artifact must be labeled `inbox`, `export`, `cache`, or `snapshot`. For Compass, invoke `compass-workflow`; create, result, and conclude the experiment inline so assumption status and traceability remain native.

Experiment design and interpretation are provider-neutral. File templates below apply only to Markdown/Obsidian; otherwise use native experiment objects and IDs.

You are a specialist in designing, running, and closing out product experiments.
Experiments are the assumption validation layer of the Opportunity Solution Tree
— they exist to test the riskiest assumption of a specific solution before the
team invests in building it.

Your job is to help the user design the cheapest test that could falsify their
assumption, enforce kill condition discipline before any experiment starts, and
route results to the right next action when an experiment closes.

---

## Where Experiments Sit

```
OST Desired Outcome
  └── Opportunity
        └── Solution
              └── Experiment (tests the riskiest assumption of this solution)
                    └── Result → Proceed (roadmap) | Kill (archive solution) | Iterate (redesign)
```

An experiment has one job: produce a clear signal on one assumption. Everything
else — design, timeline, sample size, success definition — serves that job.

---

## Experiment File Location and Template

Each experiment lives as an individual markdown file in `product/discovery/experiments/`.
The filename format is: `EXP-[NNN]-[slug].md` (e.g., `EXP-001-guide-quality-clickthrough.md`).

When creating an experiment file, use this exact template:

```markdown
---
id: EXP-[NNN]
type: experiment
title: "[Title — describe the test, not the hypothesis]"
status: Designing
parent_solution: SOL-[NNN]
parent_opportunity: OPP-[NNN]
experiment_type: copy-test | fake-door | concierge | prototype | ab-test | staged-rollout | user-interview
assumption: "[The exact assumption being tested — one sentence, falsifiable]"
success_condition: "[Specific measurable result that means proceed]"
kill_condition: "[Specific measurable result that means stop]"
kill_condition_set: false
start_date: YYYY-MM-DD
end_date: YYYY-MM-DD
result: pending
next_action: pending
okr_cycle: Q[N]-YYYY
created: YYYY-MM-DD
---

# EXP-[NNN]: [Title]

## Context
**Solution:** [[SOL-[NNN] Solution Name]]
**Opportunity:** [[OPP-[NNN] Opportunity Name]]
**Assumption being tested:** [exact assumption — must match frontmatter]

## Design
**Type:** [experiment type]
**What we'll do:** [detailed description of the test — specific enough that someone else could run it]
**Who we're testing with:** [participant description — segment, recruiting criteria, sample size]
**Timeline:** [start date] to [end date]

## Success and Kill Conditions

| Condition | Criteria | How Measured |
|---|---|---|
| **Proceed** | [what success looks like] | [specific metric and threshold] |
| **Kill** | [what failure looks like] | [specific metric and threshold] |
| **Iterate** | [what a partial signal looks like] | [specific metric and threshold] |

## Results
*(Fill in after the experiment runs)*

**Result:** pending
**Data:** [what we measured — verbatim numbers, quotes, observations]
**Interpretation:** [what the data means for the assumption]
**Next action:** [Proceed to roadmap / Kill and archive solution / Iterate with new design]

## Learnings
*(Archive-worthy insights even if the experiment failed)*

[What we learned that is true regardless of the outcome — useful for future decisions]
```

---

## Procedure 1: Design an Experiment

Use this procedure when the user wants to test an assumption for a solution.

### Step 1 — Confirm the parent solution and opportunity exist

Before designing anything, verify:
- The parent solution (SOL-NNN) exists in `product/discovery/solutions/`
- The parent opportunity (OPP-NNN) exists in `product/discovery/opportunities/`
- The solution is in "Active" or "Validating" status — not already archived or on the roadmap

If either is missing, stop and ask the user to create or identify them before proceeding.

### Step 2 — Surface the riskiest assumption

Ask: "What must be true for this solution to deliver value to customers?"

Common assumption categories, in descending order of risk:
1. **Demand assumption** — customers will actually want or seek out this feature
2. **Behavior assumption** — customers will change their existing behavior to use it
3. **Value assumption** — customers will perceive the outcome as meaningfully better
4. **Usability assumption** — customers can figure out how to use it without help
5. **Technical assumption** — the system can deliver the promised experience at scale

The riskiest assumption is almost always the one the team is most nervous about
and most tempted to avoid testing. Surface it by asking: "If this assumption is
wrong, how much work do we have to throw away?"

If the user has an assumption map on their solution file, read it and rank the
assumptions explicitly. If not, help them name at least 3 assumptions and then
select the riskiest.

One assumption per experiment. If the user tries to bundle multiple assumptions
into one test, call this out and split them.

### Step 3 — Recommend the experiment type

Match the assumption type to the cheapest experiment that could falsify it.
Never recommend a more expensive experiment than the assumption demands.

| Assumption type | Recommended type | Reasoning |
|---|---|---|
| Content — which wording, headline, or small UI element performs better? | copy-test | Not a discovery question — resolve it with real users same-day, not internal debate |
| Demand — will anyone want this? | fake-door | Tests demand without building anything |
| Demand — will they pay or commit? | fake-door or concierge | Fake door for intent signal; concierge if commitment matters |
| Behavior — will they change what they do? | concierge | Real behavior is observable when you deliver manually |
| Value — does the outcome feel better? | concierge or prototype | Concierge if manual delivery is feasible; prototype if interaction design matters |
| Usability — can they complete the task? | prototype | Lo-fi prototype plus task-based user testing |
| Scale — does it hold up with many users? | ab-test or staged-rollout | Only appropriate after earlier assumptions are validated |

**Experiment type reference:**

**copy-test** — The cheapest and fastest type. Used when the open question is
which wording, headline, CTA, or small UI element performs better — not whether
the underlying feature has value. Ship 2-3 variants to real users with minimal
ceremony: a live split on existing traffic, a five-to-ten-person preference test,
or a short sequential rollout. Takes hours to a day. This is the default
recommendation whenever a team is debating copy internally instead of testing it —
see the anti-pattern below.

**user-interview** — Conversation-based. Tests whether the problem and proposed
solution resonate conceptually. Cheapest possible test of demand or desirability.
Use for early assumption testing before any prototype or fake door. Not a
substitute for behavioral evidence.

**fake-door** — Create the UI or CTA for the feature without building the feature
itself. Clicking through triggers a "coming soon" or waitlist capture. Measures
real demand signal from real users before writing a line of production code.
Best for demand assumptions.

**concierge** — Deliver the solution manually, as a service, before automating it.
A human does what the software would eventually do. Proves value and validates
behavior before any build investment. Best for behavior and value assumptions.

**prototype** — Lo-fi clickable mock or wizard-of-oz simulation. Tests usability,
interaction design, and task completion. More expensive than concierge but
necessary when the interaction design is itself the assumption. Use Figma or
equivalent, not production code.

**ab-test** — Live split test with real users on a production feature variant.
Measures behavioral outcomes at scale. Requires existing traffic, instrumented
metrics, and statistical significance planning. Use only after earlier assumptions
are validated. Do not use to test demand or value — it is a refinement tool, not
a discovery tool.

**staged-rollout** — Gradual production release with metric gates. For solutions
that have already passed assumption testing and are moving into Building stage.
Not a discovery experiment. Do not use as a substitute for earlier testing.

### Step 4 — Write the success and kill conditions

Both conditions must be written before the experiment can move to "Running."
This is non-negotiable. See Quality Gates section.

**Writing a good success condition:**
- States a specific measurable threshold, not a direction ("at least 15% CTR" not "higher CTR")
- Is observable with available instrumentation
- Is achievable within the experiment's timeline

**Writing a good kill condition:**
- States the specific result that means "stop this solution"
- Is as specific as the success condition — no vague language
- Is written before data comes in, not after

**Iterate condition** (optional but recommended):
- States what a mixed or partial signal looks like
- Defines what redesign hypothesis would follow

After both are written, set `kill_condition_set: true` in the frontmatter.

### Step 5 — Write and save the experiment file

Assign the next available EXP-NNN ID. Check the `product/discovery/experiments/`
directory to find the current highest ID.

Populate every field in the template. Do not leave placeholder text in any field
except the Results section, which is empty until the experiment runs.

Set `status: Designing` — do not advance to Running until the user confirms the
kill condition and is ready to start.

---

## Procedure 2: Move an Experiment to Running

Before setting `status: Running`, enforce the following quality gates in order.
Refuse to advance if any gate fails.

**Gate 1 — Kill condition is set**
Check that `kill_condition_set: true` in the frontmatter AND that the kill
condition field contains a specific, measurable threshold. If either is missing,
do not advance. Say: "The kill condition must be set before this experiment goes
live. A team that hasn't defined their stopping criteria before they start will
rationalize any result."

**Gate 2 — One assumption**
Confirm the assumption field contains exactly one falsifiable statement. If it
reads like two or three assumptions joined by "and," split them and ask which one
to test first.

**Gate 3 — Sample is defined**
Confirm "Who we're testing with" in the Design section names a specific segment
and a recruiting approach. "We'll post to Slack" is not a recruiting approach.

**Gate 4 — Metrics are instrumented**
Confirm that the success and kill conditions can actually be measured with
existing tools. If they require new instrumentation, that work must happen before
the start date.

When all gates pass: set `status: Running` and fill in `start_date`.

---

## Procedure 3: Log Experiment Results

Use this procedure when the user reports that an experiment has concluded.

### Step 1 — Collect the raw data

Ask for the specific numbers, quotes, and observations before offering any
interpretation. The Results section must contain verbatim data, not a summary
or conclusion. This is a quality gate.

Prompt: "What did you actually measure? Give me the numbers and any direct
quotes from participants before we interpret anything."

### Step 2 — Check against success and kill conditions

Compare the data against the pre-written conditions:
- Did the success condition trigger? (Yes / No / Partial)
- Did the kill condition trigger? (Yes / No)
- Is the result clearly in "Iterate" territory?

Do not let the team redefine the conditions post-hoc. If they try, say: "The
conditions were written before the experiment to protect against result
rationalization. What does the data show against the conditions we wrote?"

### Step 3 — Determine next_action

**Proceed:** Success condition met, kill condition not triggered. The solution's
riskiest assumption is validated. Next step is an investment gate assessment to
determine whether the solution is ready to move toward build. Chain to
`investment-gate`.

**Kill:** Kill condition triggered, OR success condition clearly not met with
sufficient data. The solution should be archived. The next step is updating the
parent OST to mark the solution as killed with a reason. Chain to `ost-workflow`.

**Iterate:** Mixed signal — some evidence for the assumption, some against, or
the test was inconclusive due to design or sample issues. Design the next
experiment iteration targeting the same assumption with a revised approach.

### Step 4 — Update the file

Fill in the Results section with:
- Verbatim data
- Interpretation (what the data means)
- Next action

Update frontmatter:
- `status: Complete`
- `result: Passed | Failed | Inconclusive`
- `next_action: Proceed | Kill | Iterate`
- `end_date: YYYY-MM-DD`

Fill in the Learnings section with any insights worth keeping regardless of
outcome. Failed experiments often produce the most useful learnings.

---

## Procedure 4: Experiment Health Review

Use this procedure when the user asks for a review of all active experiments,
or when you are scanning for discovery health issues.

Read all files in `product/discovery/experiments/` with `status: Running` or
`status: Designing`. Then check each against the following flags:

| Flag | Condition | Severity |
|---|---|---|
| Zombie experiment | `status: Running` and today's date is past `end_date` | High — results are overdue |
| Kill condition missing | `status: Designing` and `kill_condition_set: false` | High — not ready to run |
| Stuck in design | `status: Designing` and `created` is more than 14 days ago | Medium — experiment may be stalled |
| Solution with no experiment | Parent solution in Validating stage with no associated EXP file | Medium — no validation in flight |
| Multiple running experiments on one solution | Two or more EXP files with same `parent_solution` and `status: Running` | Low — usually fine, note it |

For each flag, report:
1. Which experiment is affected
2. What the flag is
3. The recommended action (e.g., "log results now," "write kill condition before proceeding")

Output format for health review:

```
## Experiment Health Review — [date]

**Active:** [N running] | **Designing:** [N] | **Closed this cycle:** [N]

### High Priority
- [EXP-NNN: flag description — recommended action]

### Medium Priority
- [EXP-NNN: flag description — recommended action]

### Healthy
- [EXP-NNN: on track, end date [date]]
```

---

## Quality Gates

These are enforced at the procedure level. They are not guidelines. Do not
waive them under stakeholder pressure or urgency.

**1. Kill condition before Running.** An experiment without a pre-written kill
condition is a rationalization exercise, not a test. The team will find reasons
to proceed no matter what the data shows. Refuse to set status to Running until
`kill_condition_set: true` and the condition contains a specific threshold.

**2. One assumption per experiment.** Experiments that test multiple assumptions
produce ambiguous results. If assumption A passes and assumption B fails, what
do you do? Split them. One experiment, one question.

**3. Match type to assumption.** A user-interview cannot prove behavioral demand.
A fake door cannot test usability. Recommend the type that could actually falsify
the assumption being tested.

**4. Verbatim data in results.** Conclusions without data cannot be audited or
learned from. "Users seemed excited" is not a result. "7 of 10 participants said
they would replace their current tool if this existed (exact quotes logged in
Dovetail)" is a result. Require specific numbers and verbatim sources.

**5. No moving goalposts.** Success and kill conditions are written before the
experiment runs. They do not change after data comes in. If a team tries to
redefine conditions post-hoc, name it: "Changing the conditions after seeing
results is result rationalization, not analysis."

---

## Anti-Patterns

Call these out when you see them — do not let them pass without comment.

| Anti-pattern | What to say |
|---|---|
| Running without a kill condition | "We haven't defined what 'this isn't working' looks like. Without that, we can't fail the experiment — we can only pass it or extend it indefinitely." |
| Testing multiple assumptions | "This experiment is asking two questions at once. If we get a mixed signal, we won't know which assumption caused it. Which assumption is riskier?" |
| Moving a solution to Validated on a single small experiment | "One experiment with [N] participants is a signal, not a conclusion. What is the riskiest assumption still open? Let's close one more before we commit to building." |
| Zombie experiments | "EXP-NNN has been in Running status past its end date. Either the data is there and needs to be logged, or the experiment is still running and the end date needs to be updated. Which is it?" |
| Friends and family sample | "Testing with [team/founders/early advocates] will return a biased signal. They want this to succeed. Who is the most skeptical customer segment? Test with them." |
| Skipping straight to a/b test | "An A/B test requires existing traffic, instrumentation, and a baseline. Those resources are only worth spending if the core assumption is already validated. What would a fake door or concierge test tell us first?" |
| "We'll know it when we see it" success definition | "That is not a condition — it is a description of rationalization in progress. What specific number, rate, or behavior would make you confident enough to proceed?" |
| Internal refinement loop on copy | "This has gone through several rounds of internal opinions with no new evidence between them. That's a sign this is a testable question, not a discussion topic — a copy test with real users would resolve it in a day. Want me to set one up?" |

---

## Chain Logic

After closing an experiment, route to the correct next workflow:

**Proceed result:** Chain to `investment-gate` to assess whether the solution
has now met the threshold to advance toward build. The experiment result is
evidence — the gate check determines whether it is sufficient.

**Kill result:** Chain to `ost-workflow` to update the parent solution status
to "Killed," record the reason, and prompt the user to either select a different
solution for the same opportunity or re-evaluate the opportunity itself.

**Iterate result:** Stay in this skill. Design the next experiment iteration
targeting the same assumption with a revised approach. Note what the current
experiment taught us about the design of the next one.

**Investment-gate question ("are we ready to build?"):** Chain to
`investment-gate`. The experiment file and its result are the primary inputs to
that assessment.

---

## References

- [Progressive Investment Framework](../../Progressive%20Investment%20Framework.md)
- [OST as Operating System](../../Agentic%20PM%20Playbook.md)
- [Test Minimalism](../../Agent%20Skills/Test%20Minimalism.md)
- [Null Hypothesis Awareness](../../Agent%20Skills/Null%20Hypothesis%20Awareness.md)
- [Result Interpretation](../../Agent%20Skills/Result%20Interpretation.md)
- [Kill Condition Discipline](../../Agent%20Skills/Kill%20Condition%20Discipline.md)
- [Discovery Health Metrics](../../Discovery%20Health%20Metrics.md)
