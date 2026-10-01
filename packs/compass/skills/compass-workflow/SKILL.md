---
name: compass-workflow
description: Read and maintain product discovery state through host-owned Compass tools.
---

# Compass Workflow

Use the host-injected active workspace and only host-provided Compass MCP tools. Use stable object IDs returned by tools. Read current state immediately before a mutation and update state inline when the user has authorized the underlying decision.

Preserve the Loop hierarchy: Opportunity, Outcome, Key Result, Solution, Test (with assumptions attached to Solutions). Compass is mid-migration to the Loop, so map each level to whatever native Compass objects exist today and never flatten the chain: keep every parent link, and when a level or link is not yet native, say exactly which operation is unsupported rather than collapsing levels together. Keep roadmap items, feedback, insights, and delivery tasks linked to that product state where supported; feedback and insights attach to Opportunities.

Never delete learning merely because it is no longer active; use the available archive or terminal status and record the reason. Do not infer success from a tool call alone: inspect its result and report any partial or rejected operation.

If an operation is not present in the host tool catalog, state the exact unsupported operation. Do not simulate persistence in the response or claim that Compass changed.
