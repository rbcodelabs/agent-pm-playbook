---
name: scheduled-product-operations
description: >-
  Install or run one recurring playbook job that checks every product operating area,
  builds one checklist, triages findings, and executes safe work through existing skills.
  Use when asked to schedule the playbook, consolidate its cron jobs, or check and triage
  all product operations. Every area is inspected on every run.
---

# Scheduled Product Operations

One recurring job per configured product: inspect everything, build one checklist, then
work through actionable findings. Current evidence and outstanding work determine action.
Do not divide inspection by daily, weekly, monthly, or quarterly eligibility. Never create
child schedules. Human rituals and reporting deadlines can retain their cadence; check
their readiness every run without regenerating unchanged artifacts.

## Install or consolidate

Use this mode only when the user requests schedule installation or migration. Running an
existing job never enters installation mode.

1. Read `pm-config.md` and use [integration-routing](../integration-routing/SKILL.md) to
   resolve the product and workflow providers. Use [pm-setup](../pm-setup/SKILL.md) if
   configuration is missing. Resolve the product identity, working directory, runtime
   project ID, frequency, and timezone from configuration and the current request. Ask
   only for missing scheduling preferences; there is no implicit daily frequency.
2. Inspect the installed skill and available runtime tools. Verify that the scheduled
   environment can load this skill and the configuration. Use installed skill discovery
   or a verified durable installed path, never a temporary worktree path. A documented
   adapter contract alone is not a functioning runtime integration.
3. List existing schedules. Identify ownership by product/project, working directory,
   and prompt together, not name alone. Reuse an existing matching operations job;
   update only requested settings. Repeated installation must not create a duplicate.
4. For consolidation, show the exact existing job IDs and settings to replace. Obtain
   explicit migration authorization unless already provided. Pause the identified old
   jobs, preserve their settings for rollback, and check for still-running executions
   before enabling the replacement. Leave unrelated jobs and event subscriptions intact.
   If replacement fails, restore the prior settings; do not leave both sets enabled.
5. Install one job named `<Product> Product Operations` through the resolved runtime.
   For Geode, use `CronList`, `CronCreate` or `CronUpdate` with the verified `projectId`,
   `cwd`, and requested schedule fields. Geode time fields use the host's local timezone;
   verify it agrees with the requested timezone before installation. Do not set a global
   empty-feedback or empty-NOW `gateCommand`: either would hide work in other areas.
   When reusing an old gated job, remove that gate (`clearGate: true` in Geode).
6. Re-read the saved job to verify the prompt, scope, frequency, timezone interpretation,
   enabled state, and absence of a queue gate. Report its ID and next run. If the runtime
   is unavailable, provide the intended job specification and report installation blocked.

Use this prompt, replacing the configuration locator with its verified value:

```text
Run scheduled-product-operations in RUN mode using <pm-config locator>.
Check every area in its checklist on this run, then prioritize and execute safe work
through the configured providers and existing domain skills. Record all results in one
checklist. Preserve human gates, continue independent items after blockers, and leave
unfinished work visible. Do not create or modify schedules.
```

## Run: inspect before execution

Read `pm-config.md` and resolve providers through `integration-routing`. Read the previous
operations checklist and active runs through the configured `automation_runtime`; it owns
run state. The checklist is a receipt linking authoritative objects, never a second OST,
roadmap, or decision store. Do not silently create a local state file or a new provider.
If durable run state is unavailable, inspect what is readable and report the limitation;
do not start mutations that require unavailable receipts or ownership checks.

Create all checklist rows below before substantial execution. Inspect each area's current
sources, using pagination or provider-supported complete queries, and record evidence or
the precise read failure. Share fetched context across rows. If an inventory is incomplete,
mark it blocked or unfinished, never healthy. A missing optional capability remains a
visible limitation on its row and does not stop other areas. Invalid or ambiguous routing
blocks reads/writes for the affected capability until resolved.

| Area | Inspect on every run | Work route when actionable |
|---|---|---|
| Feedback and research | New/open feedback, unprocessed transcripts, source attribution, unlinked evidence, contradictions | [pm-signal-synthesis](../pm-signal-synthesis/SKILL.md); [compass-feedback-triage](../compass-feedback-triage/SKILL.md) only when insights and OST resolve to Compass |
| OST and opportunities | Weak, duplicate, stale, unmapped branches; evidence changes; focus and pruning candidates | [ost-workflow](../ost-workflow/SKILL.md), then human review for focus or consequential pruning |
| Solutions and assumptions | Orphaned solutions, changed concept directions, untested assumptions, investment readiness | [investment-gate](../investment-gate/SKILL.md), [human-review-workflow](../human-review-workflow/SKILL.md) for concept/review packets |
| Experiments | Missing success/kill conditions, overdue results, stalled tests, new results and contradictory interpretations | [experiment-workflow](../experiment-workflow/SKILL.md); launch and material conclusions retain human gates |
| Roadmap and capacity | Complete NOW/NEXT/LATER queues, validation, ownership, dependencies, capacity and active-work collisions | [roadmap-workflow](../roadmap-workflow/SKILL.md), including its existing build-policy route where enabled |
| Authorized delivery | Approval evidence, eligible commitments/packages, active claims, branches, PRs, unfinished execution receipts | [compass-resolver](../compass-resolver/SKILL.md) for Compass delivery; otherwise the configured delivery workflow; no inferred permission from queue position |
| Completion and adoption | PR/CI/deployment changes, stale review tasks, launch work, exposure, adoption, safety and outcome evidence | [delivery-completion-watcher](../delivery-completion-watcher/SKILL.md); resolved analytics for adoption; review scale/iterate/stop choices |
| Outcomes and OKRs | Metric freshness, KR coverage, outcome drift, cycle boundaries, discovery health, calibration and retrospective needs | [okr-workflow](../okr-workflow/SKILL.md), [pm-coach](../pm-coach/SKILL.md); reconfirm/reset outcomes through human review |
| Decisions and notifications | Pending and responded reviews, source revisions, unhandled decisions, due reminders and escalations | [human-review-workflow](../human-review-workflow/SKILL.md), including its notification deduplication rules |
| Reporting | Material changes since the last draft, reporting commitments, missing evidence and decision digest needs | [status-report-workflow](../status-report-workflow/SKILL.md); draft/reuse evidence-linked updates for review |
| Automation health | Failed sources/runs, unavailable credentials or adapters, stale locks, duplicate claims, partial writes, policy review needs | Runtime diagnostics and reconciliation under existing authority; never clear an uncertain claim or rotate credentials automatically |

Use statuses `checking`, `healthy`, `actionable`, `completed`, `awaiting decision`,
`blocked`, `failed`, and `unfinished`. Each row records checked sources/time, findings,
next action, and artifact/request/run links. Multiple findings can have different statuses;
retain unresolved findings even when another finding in the same area is completed.

## Triage and execute

- Inspect every row first so a lengthy delivery task cannot hide other areas. Rank findings
  by observed urgency, impact on the current outcome, and dependencies. Prefer finishing
  interrupted work and unblocking existing commitments before creating new work.
- Load the selected domain skill before acting. Resolve its required capabilities and
  re-read relevant authority and source state immediately before mutation. Completion
  can change capacity; intake can change evidence. Refresh affected checklist findings
  after those actions, without recursively restarting the entire run.
- Execute safe actionable work within the run using existing skills and permitted worker
  delegation. Preserve each skill's limits, including at most one delivery PR per resolver
  invocation; invoke the resolver at most once per operations run. Reconcile existing
  active workers instead of launching duplicate work. Check runtime ownership and existing
  domain receipts before mutation; uncertain ownership blocks that action.
- Reuse source IDs, versions, existing artifacts and domain idempotency receipts. Retry
  partial work by reconciling destination state. A fresh cron timestamp alone is never
  a reason to duplicate synthesis, tasks, reviews, reports, or notifications. Unchanged
  evidence can still require action when a deadline or previously failed operation warrants it.
- At a human gate, create/reuse the configured request and mark that finding
  `awaiting decision`. A domain skill's “end the run” ends that work item; continue
  independent checklist items and finish the parent run without waiting for a reply.
  Tracking-only responses are context, not new authority. Enabled build policies keep
  their own authorization checks. Merge, release and production authority are unchanged.
- On failure, record observed error and partial effects; continue independent items and
  block dependent actions. When an operation is unsupported, name the missing adapter or
  skill rather than inventing its implementation. Preserve unfinished work and its next
  action before reaching the runtime's execution limit. Do not schedule retry jobs; the
  next regular run inspects it again. Track any authorized active worker by its run link.

## One consolidated result

Update the same runtime checklist as work progresses and return it at completion:

```text
Product Operations — <product, run ID, timestamp>
Area | Status | Evidence/findings | Action/result | Links/next step
<every area, including healthy and blocked rows>

Needs your decision: <deduplicated review links, or none>
Unfinished or failed: <remaining work, owner/dependency, next action>
```

Existing domain artifacts stay in their resolved providers. Include links in this report
instead of producing separate top-level status messages for every area. Send only authorized
notifications through the configured provider; stakeholder updates remain drafts. A quiet
run still reports that every area was checked, without manufacturing work.
