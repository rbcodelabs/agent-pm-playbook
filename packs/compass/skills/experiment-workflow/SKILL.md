---
name: experiment-workflow
description: Design, run, and conclude Tests (assumption experiments) connected to Compass Solutions and key results.
---

# Test Workflow (experiments)

Read the Solution, its assumptions, the parent key result, and related evidence from the host-injected active workspace with host-provided Compass MCP tools. A Test is the OOKRST level beneath a Solution; Compass may still name the native object an experiment, and the Test must stay linked to its Solution's assumption and the key result it informs.

Name the riskiest assumption before choosing a method. Prefer the smallest test that could falsify it. Define hypothesis, method, audience, duration, success threshold, kill threshold, evidence to capture, and decision rule before marking a Test running.

When results arrive, compare them to the precommitted thresholds and recommend `PROCEED`, `KILL`, or `ITERATE`. Interpreting results is read-only: supplying or confirming an interpretation does not authorize a mutation. Preserve inconclusive results as inconclusive, and state the effect on the Solution's confidence and the key result.

Require a separate explicit user request to persist, log, or conclude the result. Only after that request, use the native conclusion operation when available so linked assumption state remains consistent, then verify the returned object.
