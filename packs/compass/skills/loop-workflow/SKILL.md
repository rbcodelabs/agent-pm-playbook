---
name: loop-workflow
description: Build, run, health-check, and check in on the Loop (Opportunity, Outcome, Key Result, Solution, Test) in Compass, including the Outcome and Key Result cycle and legacy OKR/OST conversion. Also answers OKR, OST, and OOKRST requests.
---

# Loop Workflow

Read the current tree, OKR cycle, Outcomes (objectives), key results, and linked Opportunities and Solutions in the host-injected active workspace using host-provided Compass MCP tools before proposing changes. Test design lives in `experiment-workflow`.

## The hierarchy

The hierarchy is Opportunity, Outcome, Key Result, Solution, Test, with exactly one parent per record: Outcome to Opportunity, key result to Outcome, Solution to key result, Test to Solution. Compass is mid-migration to the Loop; map each level to the native Compass object that exists and never flatten the chain. Frame Opportunities as customer needs, pains, or desires, never as features. An Outcome is a qualitative customer-behavior change with exactly one parent Opportunity and two to three key results; reject numbers or deliverables inside an Outcome. A key result is a measurable signal with a baseline, target, owner, and time boundary; reject feature delivery as a key result. Link at least three meaningfully different Solutions to each key result, identify assumptions within each Solution, and connect each Test to the assumption it tests and the key result it informs. Signals attach to Opportunities, not key results.

## Health check

For a health check, assess all five levels: Opportunity framing and evidence, Outcome clarity and parentage, key result quality and Solution coverage, Solution breadth and assumptions, Test velocity and tie-back, plus orphaned records and stale branches. Name every orphan (an Outcome with no Opportunity, a key result with no Solutions, a Solution with no Test or parent key result, a Test with no assumption) and every coverage gap. Show drift between active Solutions, Tests, or roadmap work and the stated key results. Cite the Compass records supporting each finding. A health check and its recommendations are read-only. Never silently prioritize a branch: present the evidence and obtain the user's product judgment before recording focus or priority changes.

## Check-ins and closing the loop

For check-ins, record the observed value, date, confidence, evidence, blockers, and next learning action without fabricating missing measurements. Propagate the reading up the tree: fold Solution progress and Test results into the key result, then report the effect on its Outcome and on the parent Opportunity's status. Never attach raw signals to a key result. Close the loop: a failed or inconclusive Test reopens or re-scores its Opportunity or spawns new ones, a passed Test promotes the Solution and updates the key result, a stalled or missed key result sends you back to re-examine the Outcome and its Opportunity before adding more Solutions, and any new signal enters as an Opportunity.

## Legacy conversion

Converting a legacy objective, desired outcome, and experiment structure into the Loop means merging objective and desired outcome into one Outcome, re-rooting Opportunities above it, re-parenting Solutions to key results, and treating experiments as Tests; propose the mapping and preserve legacy IDs.

## Mutations

Require an explicit user request before archiving a branch or changing its status. Creating an Outcome or KR, changing a target, or closing a cycle requires the user's product judgment. When authorized, preserve the reason, do not erase the learning trail, and verify every mutation against the returned object.
