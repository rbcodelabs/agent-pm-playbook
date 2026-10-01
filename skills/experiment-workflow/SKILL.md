---
name: experiment-workflow
description: >-
  Design, run, and close out Tests — the assumption-validation level of the
  Loop (formerly OOKRST) hierarchy (Opportunity -> Outcome -> KR -> Solution -> Test), formerly
  called experiments. Use when the user needs to test a Solution assumption,
  log test results, review active test health, or decide what to do after a
  test completes.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - test
    - tests
    - the Loop test
    - solution test
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
    - design a test for this solution
    - log test results
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
    - Test
    - Solution
    - Key Result
    - the Loop framework
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
  - pattern: "kill.*solution|archive.*solution|solution.*dead|solution.*failed|\\bost\\b|ookrst|the loop|loop framework|opportunity.*tree"
    targetSkill: ost-workflow
    message: Switching to the Loop tree workflow to update the tree and archive the killed Solution
  - pattern: "coach|philosophy|strategy|broader|how should we think about|what should we"
    targetSkill: agentic-pm
    message: Switching to PM coaching for broader strategic guidance on tests and discovery
---

# Test Workflow (experiment-workflow)

A **Test** is the fifth level of the Loop hierarchy ([structure guide](../../guides/the-loop.md)): the cheapest experiment that could falsify one assumption of one Solution, with success and failure criteria written before it runs and its result logged against the KR it informs. This skill's name stays `experiment-workflow` and it still answers "experiment" requests; the record is now called a Test.

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Naming assumptions, designing Tests, writing conditions, recording data, interpreting results, and choosing Proceed / Iterate / Not Pursued are reversible: do them and report your reasoning and confidence. A human is needed first only to put something in front of customers (a live fake door, an A/B variant), to recruit participants or commit someone's time, or to archive a Solution that has work behind it. Missing context: infer, state the assumption in one line, continue.

## Provider Preflight

Read `pm-config.md` and resolve the `experiments` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. With no config, work from context, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow`; create, result, and conclude the Test inline (Compass's native object may still be named experiment) so assumption status and traceability remain native.

Design and interpretation are provider-neutral. File templates apply only to Markdown/Obsidian; otherwise use the provider's native Test (or experiment) objects and IDs, and keep the link to the parent Solution, its assumption, and the KR the Test informs. If the provider cannot hold the KR link natively, record it in a label or custom field; never drop it.

Design the cheapest Test that could falsify the riskiest assumption, set the kill condition before it runs, and route the result to the next action.

---

## Where Tests Sit

```
Opportunity
  └── Outcome
        └── Key Result (the signal this Test ultimately informs)
              └── Solution
                    └── Test (tests the riskiest assumption of this Solution)
                          └── Result -> Proceed (investment gate) | Kill (archive Solution) | Iterate (redesign)
```

One Test, one clear signal on one assumption. A Test not tied to a Solution assumption is not a Test.

---

## Test File Location and Template

Each Test lives as an individual markdown file in `product/discovery/tests/` (the folder is named for Tests; the `experiments` capability key is kept for compatibility, and an existing `experiments/` folder keeps working). The filename format is: `TST-[NNN]-[slug].md` (e.g., `TST-001-guide-quality-clickthrough.md`). Legacy `EXP-[NNN]` files keep working; record the old ID as `legacy_id` when converting.

When creating a Test file, use this exact template:

```markdown
---
id: TST-[NNN]
type: test
title: "[Title - describe the test, not the hypothesis]"
status: Designing
parent_solution: SOL-[NNN]
parent_kr: OUT-[N]-KR-[N]
parent_opportunity: OPP-[NNN]
test_type: copy-test | fake-door | concierge | prototype | ab-test | staged-rollout | user-interview
assumption: "[The exact assumption being tested - one sentence, falsifiable]"
success_condition: "[Specific measurable result that means proceed]"
kill_condition: "[Specific measurable result that means stop]"
kill_condition_set: false
start_date: YYYY-MM-DD
end_date: YYYY-MM-DD
result: pending
next_action: pending
okr_cycle: Q[N]-YYYY
legacy_id: ""
created: YYYY-MM-DD
---

# TST-[NNN]: [Title]

## Context
**Solution:** [[SOL-[NNN] Solution Name]]
**Key Result informed:** [[OUT-[N]-KR-[N] KR statement]]
**Opportunity (by ancestry):** [[OPP-[NNN] Opportunity Name]]
**Assumption being tested:** [exact assumption - must match frontmatter]

## Design
**Type:** [test type]
**What we'll do:** [detailed description of the test - specific enough that someone else could run it]
**Who we're testing with:** [participant description - segment, recruiting criteria, sample size]
**Timeline:** [start date] to [end date]

## Success and Kill Conditions

| Condition | Criteria | How Measured |
|---|---|---|
| **Proceed** | [what success looks like] | [specific metric and threshold] |
| **Kill** | [what failure looks like] | [specific metric and threshold] |
| **Iterate** | [what a partial signal looks like] | [specific metric and threshold] |

## Results
*(Fill in after the Test runs)*

**Result:** pending
**Data:** [what we measured - verbatim numbers, quotes, observations]
**Interpretation:** [what the data means for the assumption]
**Effect up the tree:** [Solution confidence change; what this says about the KR]
**Next action:** [Proceed to investment gate / Kill and archive Solution / Iterate with new design]

## Learnings
*(Archive-worthy insights even if the Test failed)*

[What we learned that is true regardless of the outcome - useful for future decisions]
```

---

## Procedure 1: Design a Test

### Step 1 - Locate the parent Solution and KR

Find the parent Solution (SOL-NNN) and, through it, its KR and Opportunity. If the Solution is missing, create it from context (tagged `weak` if thinly evidenced) under the KR it most directly moves, and say so; if the KR is missing, chain to `okr-workflow`. If the Solution is archived or already on the roadmap, note that and design against the closest active Solution.

### Step 2 - Name the riskiest assumption

Ask yourself what must be true for the Solution to deliver value and move its KR. Categories, highest risk first:
1. **Demand** - customers will want or seek it out
2. **Behavior** - customers will change what they do
3. **Value** - customers will perceive the outcome as meaningfully better
4. **Usability** - customers can use it without help
5. **Technical** - the system can deliver at scale

The riskiest is usually the one whose failure throws away the most work. If the Solution has an assumption map, rank it; otherwise write at least 3 assumptions and pick the riskiest. One assumption per Test; split bundles.

### Step 3 - Choose the test type

Pick the cheapest type that could falsify the assumption.

| Assumption type | Type | Reasoning |
|---|---|---|
| Content - which wording or small UI element performs better? | copy-test | Resolve with real users same-day, not internal debate |
| Demand - will anyone want this? | fake-door | Tests demand without building |
| Demand - will they pay or commit? | fake-door or concierge | Fake door for intent; concierge if commitment matters |
| Behavior - will they change what they do? | concierge | Real behavior is observable when delivered manually |
| Value - does the outcome feel better? | concierge or prototype | Prototype if interaction design matters |
| Usability - can they complete the task? | prototype | Lo-fi prototype plus task-based testing |
| Scale - does it hold up with many users? | ab-test or staged-rollout | Only after earlier assumptions are validated |

- **copy-test** - 2-3 variants to real users via a live split, a 5-10 person preference test, or a short sequential rollout. Hours to a day. Default whenever a team debates copy instead of testing it.
- **user-interview** - Tests whether problem and solution resonate. Cheapest demand/desirability test; not behavioral evidence.
- **fake-door** - UI or CTA without the feature; clicks go to a waitlist. Real demand signal before production code.
- **concierge** - Deliver the Solution manually before automating. Proves value and behavior.
- **prototype** - Lo-fi clickable mock or wizard-of-oz. Use when interaction design is the assumption; not production code.
- **ab-test** - Live split on a production variant. Needs traffic, instrumentation, and significance planning. A refinement tool, not a discovery tool.
- **staged-rollout** - Gradual production release with metric gates, for Solutions already in Building. Not a discovery test.

### Step 4 - Write the success and kill conditions

Both are written before the Test runs.

- **Success:** a specific measurable threshold ("at least 15% CTR", not "higher CTR"), observable with available instrumentation, reachable in the timeline, and stated so that it says something about the KR's movement.
- **Kill:** the specific result that means stop, equally precise, written before data arrives.
- **Iterate** (recommended): what a partial signal looks like and the redesign it would trigger.

Then set `kill_condition_set: true`.

### Step 5 - Save the Test

Assign the next TST-NNN ID (highest existing + 1). Fill every field except Results. Set `status: Designing`. Report the design; launching it follows Procedure 2.

---

## Procedure 2: Move a Test to Running

Check these gates and fix any gap yourself before setting `status: Running`:

1. **Kill condition set** - `kill_condition_set: true` and a specific threshold. Without one, any result gets rationalized.
2. **One assumption** - split "A and B" into separate Tests; run the riskier first.
3. **Sample defined** - a named segment and recruiting approach ("we'll post in chat" is not one).
4. **Metrics instrumented** - conditions measurable with existing tools, or instrumentation scheduled before the start date.
5. **Tied to the tree** - `parent_solution` and `parent_kr` set and the assumption matches the Solution's list.

If the Test is internal (analysis of existing data, an internal prototype review), set `status: Running` and fill `start_date`. If it exposes customers or needs recruited participants, ask the human once with the ready design and a recommendation; everything else continues meanwhile.

---

## Procedure 3: Log Test Results

### Step 1 - Record the raw data

Record the specific numbers, quotes, and observations verbatim before interpreting. If only a summary is available, record it, mark the result `low confidence`, and name the raw data that would firm it up.

### Step 2 - Check against the pre-written conditions

Did the success condition trigger (Yes / No / Partial)? Did the kill condition trigger? Is it Iterate territory? Judge against the conditions as written; if someone proposes changing them after the fact, record that as a new Test design, not a reinterpretation.

### Step 3 - Decide next_action

Make the call, record the reasoning and confidence, and report it. For ambiguous data, follow [Result Interpretation](../../Agent%20Skills/Result%20Interpretation.md).

- **Proceed:** success met, kill not triggered. Chain to `investment-gate`.
- **Kill:** kill triggered, or success clearly missed with sufficient data. Record the result, then recommend archiving the Solution to a human (it has work behind it) via `ost-workflow`.
- **Iterate:** mixed or inconclusive, including design or sample issues. Design the next iteration on the same assumption.
- **Not Pursued:** a deliberate choice not to run the Test (opportunity cost, timing, a blocked dependency, reprioritization) - no evidence either way. For Compass, call `conclude_experiment` with `NOT_PURSUED`, never `KILL`: `NOT_PURSUED` leaves the linked Assumption `UNTESTED`, while `KILL` would incorrectly set it `INVALIDATED`. A `reason` is required; record the actual reasoning. Don't leave a shelved Test in `DESIGNING`.

### Step 4 - Update the record

Fill Results with verbatim data, interpretation, and next action. For a Test that ran:
- `status: Complete`
- `result: Passed | Failed | Inconclusive`
- `next_action: Proceed | Kill | Iterate`
- `end_date: YYYY-MM-DD`

For one not run, use the distinct Not Pursued state (never Complete/Kill):
- `status: Not Pursued`
- `result: Not Pursued`
- `next_action: Not Pursued`
- `end_date: YYYY-MM-DD`
- The rationale goes in Learnings.

Add Learnings worth keeping regardless of outcome; failed Tests often teach the most.

### Step 5 - Propagate up the tree

A result is not finished until it has moved up (structure rule 6):
1. Update the Solution's confidence and its assumption status (validated / invalidated / untested).
2. Add the Test and what it showed to the parent KR's evidence line (see `okr-workflow` Workflow 2, Step 4), without attaching raw signals to the KR.
3. If the result is new customer evidence about the underlying need, attach it to the Opportunity or ask `pm-signal-synthesis` to.
4. Close the loop. A passed Test promotes the Solution and updates the KR. A failed or inconclusive Test reopens or re-scores the parent Opportunity, or spawns new Opportunities the result exposed. Side-findings enter as Opportunities. See [Closing the loop](../../guides/the-loop.md#closing-the-loop).

---

## Procedure 4: Test Health Review

Read all Tests with `status: Running` or `status: Designing` and flag:

| Flag | Condition | Severity |
|---|---|---|
| Zombie Test | Running and past `end_date` | High - results overdue |
| Kill condition missing | Designing and `kill_condition_set: false` | High - not ready to run |
| Untied Test | No parent Solution assumption or no KR | High - not a Test; attach or drop |
| Stuck in design | Designing and `created` more than 14 days ago | Medium - may be stalled |
| Solution with no Test | Solution in Validating with no Test | Medium - nothing in flight |
| KR with no running Test | At-risk KR whose selected Solution has no Test | Medium - work the Solutions harder |
| Multiple running on one Solution | 2+ Running with the same `parent_solution` | Low - note it |

Fix what you can in the same pass: draft missing kill conditions, extend or close zombies from available data, design a Test for uncovered Solutions, and record Not Pursued (with reason) for deliberately shelved ones so they leave the scan.

```
## Test Health Review - [date]

**Active:** [N running] | **Designing:** [N] | **Closed this cycle:** [N]

### High Priority
- [TST-NNN: flag - action taken or needed]

### Medium Priority
- [TST-NNN: flag - action taken or needed]

### Healthy
- [TST-NNN: on track, end date [date]]
```

---

## Quality Gates

These hold under pressure or urgency. They are things you do, not reasons to wait.

1. **Kill condition before Running.** Otherwise the team finds reasons to proceed whatever the data shows.
2. **One assumption per Test.** If A passes and B fails, you can't tell what to do.
3. **Match type to assumption.** An interview cannot prove behavioral demand; a fake door cannot test usability.
4. **Verbatim data in results.** "Users seemed excited" is not a result. "7 of 10 participants said they would replace their current tool (quotes logged)" is.
5. **No moving goalposts.** Conditions don't change after data arrives; redefining them post-hoc is rationalization.
6. **Every Test is tied.** Solution assumption and KR, or it does not run.

---

## Anti-Patterns

Name these when you see them and fix them:

| Anti-pattern | What to do |
|---|---|
| Running without a kill condition | Write one before the next data point is read |
| Testing multiple assumptions | Split; run the riskier first |
| Validating on one small Test | Treat it as a signal; design one more Test on the riskiest open assumption |
| Zombie Tests | Log available data or update the end date, and say which |
| Friends-and-family sample | Retarget the most skeptical customer segment |
| Skipping straight to A/B | Design a fake door or concierge Test first |
| "We'll know it when we see it" | Replace with a specific number, rate, or behavior |
| Internal refinement loop on copy | Set up a copy-test with real users |
| Test with no Solution or KR | Attach it to a Solution assumption and its KR, or do not run it |

---

## Chain Logic

- **Proceed:** chain to `investment-gate`; the result is evidence, the gate decides sufficiency.
- **Kill:** chain to `ost-workflow` to record the kill reason, recommend archiving the Solution, and pick the next candidate under the same KR or re-evaluate the Opportunity.
- **Iterate:** stay here and design the next iteration, noting what this one taught about the design.
- **Not Pursued result:** record `conclude_experiment(experimentId, "NOT_PURSUED", reason)` and stop. Don't chain as if it failed or passed; the Solution's fate is a separate decision.
- **"Are we ready to build?":** chain to `investment-gate` with the Test as primary input.

---

## References

- [The Loop](../../guides/the-loop.md)
- [Progressive Investment Framework](../../Progressive%20Investment%20Framework.md)
- [Discovery Tree as Operating System](../../Agentic%20PM%20Playbook.md)
- [Test Minimalism](../../Agent%20Skills/Test%20Minimalism.md)
- [Null Hypothesis Awareness](../../Agent%20Skills/Null%20Hypothesis%20Awareness.md)
- [Result Interpretation](../../Agent%20Skills/Result%20Interpretation.md)
- [Kill Condition Discipline](../../Agent%20Skills/Kill%20Condition%20Discipline.md)
- [Discovery Health Metrics](../../Discovery%20Health%20Metrics.md)
