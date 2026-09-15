---
name: experiment-workflow
description: Design, run, and conclude assumption tests connected to Compass solutions.
---

# Experiment Workflow

Read the solution, assumption, and related evidence from the host-injected active workspace with host-provided Compass MCP tools.

Name the riskiest assumption before choosing a method. Prefer the smallest test that could falsify it. Define hypothesis, method, audience, duration, success threshold, kill threshold, evidence to capture, and decision rule before marking an experiment running.

When results arrive, compare them to the precommitted thresholds and recommend `PROCEED`, `KILL`, or `ITERATE`. Interpreting results is read-only: supplying or confirming an interpretation does not authorize a mutation. Preserve inconclusive results as inconclusive.

Require a separate explicit user request to persist, log, or conclude the result. Only after that request, use the native conclusion operation when available so linked assumption state remains consistent, then verify the returned object.
