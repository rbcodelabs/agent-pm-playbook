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

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Naming assumptions, designing tests, writing conditions, recording data, interpreting results, and choosing Proceed / Iterate / Not Pursued are reversible: do them and report your reasoning and confidence. A human is needed first only to put something in front of customers (a live fake door, an A/B variant), to recruit participants or commit someone's time, or to archive a solution that has work behind it. Missing context: infer, state the assumption in one line, continue.

## Provider Preflight

Read `pm-config.md` and resolve the `experiments` capability through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider for persistence; label any secondary artifact `inbox`, `export`, `cache`, or `snapshot`. With no config, work from context, name the defaults you used, and offer `pm-setup` at the end. For Compass, invoke `compass-workflow`; create, result, and conclude the experiment inline so assumption status and traceability remain native.

Design and interpretation are provider-neutral. File templates apply only to Markdown/Obsidian; otherwise use native experiment objects and IDs.

Experiments are the assumption validation layer of the OST: design the cheapest test that could falsify the riskiest assumption, set the kill condition before it runs, and route the result to the next action.

---

## Where Experiments Sit

```
OST Desired Outcome
  └── Opportunity
        └── Solution
              └── Experiment (tests the riskiest assumption of this solution)
                    └── Result → Proceed (roadmap) | Kill (archive solution) | Iterate (redesign)
```

One experiment, one clear signal on one assumption.

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

### Step 1 — Locate the parent solution and opportunity

Find the parent solution (SOL-NNN) and opportunity (OPP-NNN). If either is missing, create it from context (tagged `weak` if thinly evidenced) and say so. If the solution is archived or already on the roadmap, note that and design against the closest active solution.

### Step 2 — Name the riskiest assumption

Ask yourself what must be true for the solution to deliver value. Categories, highest risk first:
1. **Demand** — customers will want or seek it out
2. **Behavior** — customers will change what they do
3. **Value** — customers will perceive the outcome as meaningfully better
4. **Usability** — customers can use it without help
5. **Technical** — the system can deliver at scale

The riskiest is usually the one whose failure throws away the most work. If the solution has an assumption map, rank it; otherwise write at least 3 assumptions and pick the riskiest. One assumption per experiment; split bundles.

### Step 3 — Choose the experiment type

Pick the cheapest type that could falsify the assumption.

| Assumption type | Type | Reasoning |
|---|---|---|
| Content — which wording or small UI element performs better? | copy-test | Resolve with real users same-day, not internal debate |
| Demand — will anyone want this? | fake-door | Tests demand without building |
| Demand — will they pay or commit? | fake-door or concierge | Fake door for intent; concierge if commitment matters |
| Behavior — will they change what they do? | concierge | Real behavior is observable when delivered manually |
| Value — does the outcome feel better? | concierge or prototype | Prototype if interaction design matters |
| Usability — can they complete the task? | prototype | Lo-fi prototype plus task-based testing |
| Scale — does it hold up with many users? | ab-test or staged-rollout | Only after earlier assumptions are validated |

- **copy-test** — 2–3 variants to real users via a live split, a 5–10 person preference test, or a short sequential rollout. Hours to a day. Default whenever a team debates copy instead of testing it.
- **user-interview** — Tests whether problem and solution resonate. Cheapest demand/desirability test; not behavioral evidence.
- **fake-door** — UI or CTA without the feature; clicks go to a waitlist. Real demand signal before production code.
- **concierge** — Deliver the solution manually before automating. Proves value and behavior.
- **prototype** — Lo-fi clickable mock or wizard-of-oz. Use when interaction design is the assumption; not production code.
- **ab-test** — Live split on a production variant. Needs traffic, instrumentation, and significance planning. A refinement tool, not a discovery tool.
- **staged-rollout** — Gradual production release with metric gates, for solutions already in Building. Not a discovery experiment.

### Step 4 — Write the success and kill conditions

Both are written before the experiment runs.

- **Success:** a specific measurable threshold ("at least 15% CTR", not "higher CTR"), observable with available instrumentation, reachable in the timeline.
- **Kill:** the specific result that means stop, equally precise, written before data arrives.
- **Iterate** (recommended): what a partial signal looks like and the redesign it would trigger.

Then set `kill_condition_set: true`.

### Step 5 — Save the experiment

Assign the next EXP-NNN ID (highest existing + 1). Fill every field except Results. Set `status: Designing`. Report the design; launching it follows Procedure 2.

---

## Procedure 2: Move an Experiment to Running

Check these gates and fix any gap yourself before setting `status: Running`:

1. **Kill condition set** — `kill_condition_set: true` and a specific threshold. Without one, any result gets rationalized.
2. **One assumption** — split "A and B" into separate experiments; run the riskier first.
3. **Sample defined** — a named segment and recruiting approach ("we'll post in chat" is not one).
4. **Metrics instrumented** — conditions measurable with existing tools, or instrumentation scheduled before the start date.

If the test is internal (analysis of existing data, an internal prototype review), set `status: Running` and fill `start_date`. If it exposes customers or needs recruited participants, ask the human once with the ready design and a recommendation; everything else continues meanwhile.

---

## Procedure 3: Log Experiment Results

### Step 1 — Record the raw data

Record the specific numbers, quotes, and observations verbatim before interpreting. If only a summary is available, record it, mark the result `low confidence`, and name the raw data that would firm it up.

### Step 2 — Check against the pre-written conditions

Did the success condition trigger (Yes / No / Partial)? Did the kill condition trigger? Is it Iterate territory? Judge against the conditions as written; if someone proposes changing them after the fact, record that as a new experiment design, not a reinterpretation.

### Step 3 — Decide next_action

Make the call, record the reasoning and confidence, and report it. For ambiguous data, follow [Result Interpretation](../../Agent%20Skills/Result%20Interpretation.md).

- **Proceed:** success met, kill not triggered. Chain to `investment-gate`.
- **Kill:** kill triggered, or success clearly missed with sufficient data. Record the result, then recommend archiving the solution to a human (it has work behind it) via `ost-workflow`.
- **Iterate:** mixed or inconclusive, including design or sample issues. Design the next iteration on the same assumption.
- **Not Pursued:** a deliberate choice not to run the test (opportunity cost, timing, a blocked dependency, reprioritization) — no evidence either way. For Compass, call `conclude_experiment` with `NOT_PURSUED`, never `KILL`: `NOT_PURSUED` leaves the linked Assumption `UNTESTED`, while `KILL` would incorrectly set it `INVALIDATED`. A `reason` is required; record the actual reasoning. Don't leave a shelved experiment in `DESIGNING`.

### Step 4 — Update the record

Fill Results with verbatim data, interpretation, and next action. For an experiment that ran:
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

Add Learnings worth keeping regardless of outcome; failed experiments often teach the most.

---

## Procedure 4: Experiment Health Review

Read all experiments with `status: Running` or `status: Designing` and flag:

| Flag | Condition | Severity |
|---|---|---|
| Zombie experiment | Running and past `end_date` | High — results overdue |
| Kill condition missing | Designing and `kill_condition_set: false` | High — not ready to run |
| Stuck in design | Designing and `created` more than 14 days ago | Medium — may be stalled |
| Solution with no experiment | Solution in Validating with no experiment | Medium — nothing in flight |
| Multiple running on one solution | 2+ Running with the same `parent_solution` | Low — note it |

Fix what you can in the same pass: draft missing kill conditions, extend or close zombies from available data, design an experiment for uncovered solutions, and record Not Pursued (with reason) for deliberately shelved ones so they leave the scan.

```
## Experiment Health Review — [date]

**Active:** [N running] | **Designing:** [N] | **Closed this cycle:** [N]

### High Priority
- [EXP-NNN: flag — action taken or needed]

### Medium Priority
- [EXP-NNN: flag — action taken or needed]

### Healthy
- [EXP-NNN: on track, end date [date]]
```

---

## Quality Gates

These hold under pressure or urgency. They are things you do, not reasons to wait.

1. **Kill condition before Running.** Otherwise the team finds reasons to proceed whatever the data shows.
2. **One assumption per experiment.** If A passes and B fails, you can't tell what to do.
3. **Match type to assumption.** An interview cannot prove behavioral demand; a fake door cannot test usability.
4. **Verbatim data in results.** "Users seemed excited" is not a result. "7 of 10 participants said they would replace their current tool (quotes logged)" is.
5. **No moving goalposts.** Conditions don't change after data arrives; redefining them post-hoc is rationalization.

---

## Anti-Patterns

Name these when you see them and fix them:

| Anti-pattern | What to do |
|---|---|
| Running without a kill condition | Write one before the next data point is read |
| Testing multiple assumptions | Split; run the riskier first |
| Validating on one small experiment | Treat it as a signal; design one more test on the riskiest open assumption |
| Zombie experiments | Log available data or update the end date, and say which |
| Friends-and-family sample | Retarget the most skeptical customer segment |
| Skipping straight to A/B | Design a fake door or concierge test first |
| "We'll know it when we see it" | Replace with a specific number, rate, or behavior |
| Internal refinement loop on copy | Set up a copy test with real users |

---

## Chain Logic

- **Proceed:** chain to `investment-gate`; the result is evidence, the gate decides sufficiency.
- **Kill:** chain to `ost-workflow` to record the kill reason, recommend archiving the solution, and pick the next candidate for the same opportunity or re-evaluate the opportunity.
- **Iterate:** stay here and design the next iteration, noting what this one taught about the design.
- **Not Pursued result:** record `conclude_experiment(experimentId, "NOT_PURSUED", reason)` and stop. Don't chain as if it failed or passed; the solution's fate is a separate decision.
- **"Are we ready to build?":** chain to `investment-gate` with the experiment as primary input.

---

## References

- [Progressive Investment Framework](../../Progressive%20Investment%20Framework.md)
- [OST as Operating System](../../Agentic%20PM%20Playbook.md)
- [Test Minimalism](../../Agent%20Skills/Test%20Minimalism.md)
- [Null Hypothesis Awareness](../../Agent%20Skills/Null%20Hypothesis%20Awareness.md)
- [Result Interpretation](../../Agent%20Skills/Result%20Interpretation.md)
- [Kill Condition Discipline](../../Agent%20Skills/Kill%20Condition%20Discipline.md)
- [Discovery Health Metrics](../../Discovery%20Health%20Metrics.md)
