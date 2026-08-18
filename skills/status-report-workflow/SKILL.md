---
name: status-report-workflow
description: >-
  Generate a weekly product status report by resolving roadmap, OKRs,
  discovery, delivery, and archive providers independently from pm-config.md.
metadata:
  priority: 4
retrieval:
  aliases: [status report, weekly status, weekly update, product status]
  intents: [generate a weekly status report, what happened this week, give me a status update]
chainTo:
  - pattern: "roadmap item|move.*horizon|promote to roadmap"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow for a state change found in the report
  - pattern: "okr|key result|\\bKR\\b|check-?in"
    targetSkill: okr-workflow
    message: Switching to OKR workflow for a check-in found in the report
---

# Status Report Workflow

## Provider Preflight

Before reading sources, read `pm-config.md` and resolve `roadmap`, `okrs`, `ost`, `insights`, `delivery`, and `reporting_archive` independently through the named profile and overrides, following the installed [integration-routing contract](../integration-routing/SKILL.md). Confirm exactly one authoritative provider per capability. Read each provider directly and write only to the resolved archive. A report is a labeled `snapshot`, never product state.

This skill is read-only and reporting-only. It never changes roadmap, OKR,
discovery, or delivery state. Put recommended changes in Follow-ups for the
appropriate domain/provider workflow.

## Inputs

For routed configs, product-system inputs come from `pm-config.md`. The invoker
supplies only operational context:

| Parameter | Example | Required |
|---|---|---|
| Product name | `Golden Wealth` | Yes |
| Product slug | `golden-wealth` | Yes |
| Repo path | `~/projects/golden-wealth-app` | Only when engineering activity is requested |
| Deployment platform | `vercel` \| `amplify` \| `electron-local-build` \| `none` | Yes |
| Traffic/usage source | configured path/provider or `none` | Yes |

Provider identifiers, workspace/team IDs, and archive paths come from resolved
provider connections. Ask when required operational context is missing.

### Legacy compatibility inputs

Only when `pm-config.md` has no integration profile may an existing job supply
legacy `Roadmap/OKR source`, `Issue tracker`, Compass workspace, and vault-folder
parameters. Label this the legacy compatibility path, infer and display a
proposed capability map, and mark ambiguity `NOT VERIFIED`. Do not require or
prefer these parameters for routed configs.

## Step 1 — Determine the report window

Use the seven days ending today and state the exact dates in the report header.

## Step 2 — Read roadmap, OKRs, and discovery

Resolve `roadmap` and `okrs` separately. Resolve `ost` and `insights` when the
report includes discovery health. Query each authoritative provider once.

- **Compass providers:** use the Compass connection and `compass-workflow` to
  read roadmap items, active OKR/KR progress, opportunities, experiments, and
  insights relevant to each resolved capability. Diff stable IDs/statuses
  against the previous snapshot; never invent timestamp-based movement.
- **Markdown/Obsidian providers:** read only configured capability paths. Do not
  assume filenames such as `roadmap.md`, `ost.md`, or `okrs/*.md`.
- **JPD or another provider:** use its native goals, insights, discovery, and
  roadmap objects for the capabilities it owns.
- **Unavailable provider:** mark only that capability **DATA UNAVAILABLE
  (reason)** and continue. One missing source must not suppress other sections.

For each KR, report current versus target and stale check-ins. For roadmap,
report horizon/status movement. For OST/insights, report material opportunity,
experiment, and evidence changes without mutating them.

## Step 3 — Engineering activity

When a repo path is configured, report commits, merged/open PRs, stale PRs, and
deployment/release status for the window. Use the repository's default branch.
Follow `vercel-tools` for Vercel; use the configured platform's supported client.
If no repo is configured, omit this source without treating delivery as absent.

## Step 4 — Read delivery

Resolve `delivery` independently from roadmap and discovery.

- **`compass_tasks`:** read Compass Tasks grouped by delivery status and tasks
  changed in the window. Reuse the Compass workspace lookup, but never substitute
  roadmap/opportunity counts for Tasks. If Tasks reads are unavailable, mark
  delivery **DATA UNAVAILABLE**.
- **`linear`:** read the configured team using its available connector or synced
  issue notes; report status counts and issues updated in the window.
- **`jira`:** read the configured project and workflow; report status counts and
  issues updated in the window.
- **Other/unavailable:** use the provider adapter or report the precise gap.

## Step 5 — Traffic and usage

Read the configured source and report headline metrics. If none is configured,
write **NOT AVAILABLE**; never estimate or fabricate usage.

## Step 6 — Write to the resolved archive

Write the report to `reporting_archive` as a labeled `snapshot`:

- Markdown/Obsidian: use the configured archive path and
  `<product-slug>-<YYYY-MM-DD>-status.md`.
- Compass Docs, JPD, or another native provider: create a provider-native report
  and preserve its stable ID.
- Unavailable archive: do not redirect to the current directory or a vault;
  report the blocked write and preserve the rendered response in conversation.

Use these sections: Roadmap & OKR Movement, Discovery Health, Engineering
Activity, Delivery Snapshot, Traffic/Usage Metrics, Data Gaps, and Follow-ups.

## Step 7 — Provider-specific archive follow-through

When the resolved archive is Obsidian, follow vault rules: link the report from
today's daily note and sync only when its folder is vault-bridged. For every
other archive provider, use its native link/navigation behavior. Do not create a
daily note or vault path merely because older runs did so.

## Unattended runs

If any source is unreachable, write remaining sections and mark the affected
capability **DATA UNAVAILABLE (reason)**. A partial honest snapshot beats a
skipped or fabricated report.
