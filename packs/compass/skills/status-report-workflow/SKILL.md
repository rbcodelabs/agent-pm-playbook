---
name: status-report-workflow
description: Produce a read-only product status report from the active Compass workspace.
---

# Status Report Workflow

This workflow is read-only. Use the host-injected active workspace and host-provided Compass MCP tools to read roadmap, OKRs, discovery, experiments, feedback, and delivery tasks that the host makes available.

Use the seven days ending today unless the user specifies another window, and state exact dates. Report Roadmap and OKR Movement, Discovery Health, Delivery Snapshot, Data Gaps, Decisions Needed, and Follow-ups. Cite stable Compass IDs and distinguish recorded facts from recommendations.

When a source or time-window comparison is unsupported, write `DATA UNAVAILABLE (reason)` for that section and continue. Never infer movement from current state alone.

Return the complete report in the assistant response. The saved Compass conversation history is the only archive for v1. Do not create a separate report record or mutate product state while reporting.
