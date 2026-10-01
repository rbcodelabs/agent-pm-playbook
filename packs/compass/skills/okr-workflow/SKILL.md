---
name: okr-workflow
description: Create, review, and check in on the Outcome and Key Result layer of the OOKRST hierarchy in Compass.
---

# OKR Workflow (Outcome and Key Result layer)

Use the host-injected active workspace and host-provided Compass MCP tools to read the current OKR cycle, Outcomes (objectives), key results, and the Opportunities and Solutions linked to them.

OOKRST is the product hierarchy: Opportunity, Outcome, Key Result, Solution, Test. An Outcome is a qualitative customer-behavior change with exactly one parent Opportunity and two to three key results; a key result is a measurable signal with a baseline, target, owner, and time boundary. Compass is mid-migration to OOKRST: map each level to the native Compass object that exists, and do not flatten the parent chain. Reject feature delivery as a key result, and reject numbers or deliverables inside an Outcome.

For check-ins, record the observed value, date, confidence, evidence, blockers, and next learning action without fabricating missing measurements. Propagate the reading up the tree: fold Solution progress and Test results into the key result, then report the effect on its Outcome and on the parent Opportunity's status. Never attach raw signals to a key result.

Show drift between active Solutions, Tests, or roadmap work and the stated key results, and flag any key result with fewer than three candidate Solutions. Converting a legacy objective, desired outcome, and experiment structure into OOKRST means merging objective and desired outcome into one Outcome, re-rooting Opportunities above it, re-parenting Solutions to key results, and treating experiments as Tests; propose the mapping and preserve legacy IDs. Creating an Outcome or KR, changing a target, or closing a cycle requires the user's product judgment. Verify every authorized mutation against the returned object.
