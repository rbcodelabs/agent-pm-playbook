---
name: scheduled-product-operations
description: >-
  Install or run one recurring playbook job that checks every product operating area,
  builds one checklist, and does the reversible work it finds through existing skills.
  Use when asked to schedule the playbook, consolidate its cron jobs, or check and triage
  all product operations. Every area is inspected on every run.
---

# Scheduled Product Operations

One recurring job per configured product: create one checklist, dispatch approved work
early, then inspect every area and do the work its findings call for. Current evidence and
outstanding work determine action, not daily/weekly/monthly eligibility. Never create child
schedules. Human rituals and reporting deadlines keep their cadence; check their readiness
every run without regenerating unchanged artifacts.

## Autonomy

Follow the [Autonomy Policy](../../Autonomy%20Policy.md): act, then report. Each run does
the reversible work it finds (triage, linking, new opportunities, status fixes,
reprioritization, drafts) and reports it. Only the four irreversible categories (destroy,
reach outside the team, ship to production, spend money or human time) become review
requests; everything else proceeds without waiting.

## Install or consolidate

Use this mode only when the user requests schedule installation or migration. Running an
existing job never enters installation mode.

1. Read `pm-config.md` and resolve product and workflow providers with
   [integration-routing](../integration-routing/SKILL.md). Resolve product identity,
   working directory, runtime project ID, frequency, and timezone from configuration and the
   request. If frequency is unstated, pick a sensible default, say so, and continue.
2. Verify that the scheduled environment can load this skill and the configuration, using
   installed skill discovery or a durable installed path, never a temporary worktree path.
3. List existing schedules. Identify ownership by product/project, working directory, and
   prompt together. Reuse a matching operations job and update only requested settings;
   repeated installation must not create a duplicate.
4. For consolidation, record the exact old job IDs and settings, pause (do not delete) them,
   check for still-running executions, then enable the replacement. Leave unrelated jobs
   intact. If replacement fails, restore the prior settings; never leave both sets enabled.
5. Install one job named `<Product> Product Operations`. For Geode, use `CronList`,
   `CronCreate` or `CronUpdate` with the verified `projectId`, `cwd`, and schedule fields;
   confirm the host's local timezone matches the requested one. Do not set a global
   empty-queue `gateCommand` (it hides work in other areas); remove one from a reused job
   (`clearGate: true`).
6. Re-read the saved job and report its ID, prompt, scope, frequency, timezone, enabled
   state, and next run. If the runtime is unavailable, report the intended specification
   and that installation is blocked.

Use this prompt, replacing the configuration locator with its verified value:

```text
Run scheduled-product-operations in RUN mode using <pm-config locator>.
Create the checklist, inspect authorized delivery early and dispatch at most one dedicated
worker under approved_build_policy; continue every area and do the reversible work found
through the configured providers and existing domain skills. Record all results in one
checklist. Raise review requests only for irreversible actions, continue independent items
after blockers, and leave unfinished work visible. Do not create or modify schedules.
```

## Run: inspect, then act

Read `pm-config.md`, resolve providers, and read the previous checklist and active runs
through the configured `automation_runtime`, which owns run state. The checklist is a
receipt linking authoritative objects, never a second OST, roadmap, or decision store. If
durable run state is unavailable, inspect what is readable, report the limitation, and skip
only mutations that need receipts or ownership checks.

Create all checklist rows first. After assigned tasks, inspect authorized delivery
before the remaining health inventory. Under enabled approved_build_policy, verify one
exact approval and check existing Tasks/PRs/threads through build-authorization. Dispatch
at most one dedicated delivery worker with authority, plan, repository/workspace and Task
references; the worker re-reads and claims before code, and the parent does not claim as a
competing worker. Record its runtime link and continue
every remaining checklist row without waiting for implementation. The schedule is a
backstop, not an exclusive executor. If dispatch is unavailable or ambiguous, mark that item
blocked and reconcile runtime state before retry.

Inspect each area's sources with pagination or complete queries and record evidence or the
precise read failure. Share fetched context across rows. An incomplete inventory is blocked
or unfinished, never healthy. A missing optional capability is a limitation on its row, not
a stop for other areas. Ambiguous routing blocks only the affected capability.

Start with **assigned tasks**: follow-ups a prior run filed against the agent identity.
Clearing them first keeps the run from piling new work on its own unresolved items.

| Area | Inspect on every run | Work route when actionable |
|---|---|---|
| Assigned tasks | Open tasks assigned to the agent identity (`list_tasks` with the agent assignee filter), excluding those covered by Authorized delivery or Decisions | Resolve directly or through the matching domain skill ([okr-workflow](../okr-workflow/SKILL.md), [experiment-workflow](../experiment-workflow/SKILL.md), [investment-gate](../investment-gate/SKILL.md)); close the task with the outcome |
| Feedback and research | New/open feedback, unprocessed transcripts, source attribution, unlinked evidence, contradictions | [pm-signal-synthesis](../pm-signal-synthesis/SKILL.md); [compass-feedback-triage](../compass-feedback-triage/SKILL.md) when insights and OST resolve to Compass |
| OST and opportunities | Weak, duplicate, stale, unmapped branches; evidence changes; focus and pruning candidates | [ost-workflow](../ost-workflow/SKILL.md): restructure, refocus, and deprioritize directly; deletion or archival is a review request |
| Solutions and assumptions | Orphaned solutions, changed concept directions, untested assumptions, investment readiness | [investment-gate](../investment-gate/SKILL.md); advance or hold stages directly and report |
| Experiments | Missing success/kill conditions, overdue results, stalled tests, new or contradictory results | [experiment-workflow](../experiment-workflow/SKILL.md); record and interpret results directly; launches that reach users or spend money are review requests |
| Roadmap and capacity | Complete NOW/NEXT/LATER queues, validation, ownership, dependencies, capacity, active-work collisions | [roadmap-workflow](../roadmap-workflow/SKILL.md): reprioritize and move items between horizons directly, including its build-policy route where enabled |
| Authorized delivery | Approval evidence, approved builds, active claims, branches, PRs, unfinished Task checkpoints | [compass-resolver](../compass-resolver/SKILL.md) for Compass delivery, otherwise the configured delivery workflow |
| Completion and adoption | PR/CI/deployment changes, stale review tasks, launch work, exposure, adoption, outcome evidence | [delivery-completion-watcher](../delivery-completion-watcher/SKILL.md); resolved analytics for adoption |
| Outcomes and OKRs | Metric freshness, KR coverage, outcome drift, cycle boundaries, discovery health | [okr-workflow](../okr-workflow/SKILL.md), [pm-coach](../pm-coach/SKILL.md) |
| Decisions and notifications | Pending reviews, **every decided review whose outcome is not yet reflected in product state**, due reminders | [human-review-workflow](../human-review-workflow/SKILL.md) Mode 4, including reconciliation and notification deduplication |
| Reporting | Material changes since the last draft, reporting commitments, missing evidence | [status-report-workflow](../status-report-workflow/SKILL.md); draft updates; sending outside the team is a review request |
| Automation health | Failed sources/runs, unavailable credentials or adapters, stale locks, duplicate claims, partial writes | Runtime diagnostics and reconciliation; never clear an uncertain claim or rotate credentials automatically |

Statuses: `checking`, `healthy`, `actionable`, `completed`, `awaiting decision`, `blocked`,
`failed`, `unfinished`. Each row records sources/time checked, findings, action taken, and
links. Findings in one area can carry different statuses.

An empty queue is only `healthy` when the query that produced it covers everything the row
claims. A decisions row is healthy only when nothing awaits the reviewer **and** no
already-answered decision is still unreflected; check what any default filter excludes.

For `compass_decisions`, establish "unreflected" primarily from the native
decision-application receipt (`apply_recorded_decision`) per the
[adapter reference](../human-review-workflow/references/compass-decisions-adapter.md), with
product state as the cross-check. Compute age from the decision's own decided timestamp,
never the request's creation time. A `DECIDED` outcome that affirms current state or asks
the agent a question closes with a receipt and no follow-up item.

Agent identities still cannot call `list_research_studies` (verified blocked as of
2026-09-12), although `list_decisions` works. Treat an empty or unavailable study inventory
as unverifiable from this seat and mark that sub-check `blocked`, not `healthy`.

## Triage and execute

- Rank findings by urgency, outcome impact, and dependencies. Finish interrupted work and
  unblock existing commitments before creating new work.
- Load the domain skill, re-read source state immediately before each mutation, and
  refresh affected checklist rows afterwards without restarting the run.
- Do the reversible work in-run: triage and link feedback, create and score opportunities,
  fix stale statuses, reprioritize the roadmap, draft reports and specs. Keep one delivery
  PR per worker and at most one new delivery worker per run; reconcile active workers
  instead of launching duplicates. Uncertain runtime ownership blocks only that action.
- Stay idempotent: reuse source IDs, versions, artifacts, and receipts, and retry partial
  work by reconciling destination state. A new cron timestamp is never a reason to
  duplicate synthesis, tasks, reviews, reports, or notifications.
- For an irreversible action, do the prep, create or reuse one review request with a
  recommended default, mark the finding `awaiting decision`, and keep going. Tracking-only
  responses are context, not new authority. Merge, release, and production keep their own
  authority; enabled build policies keep their own checks.
- On failure, record the error and partial effects, continue independent items, and name
  any missing adapter rather than inventing one. Do not schedule retry jobs; the next run
  picks it up.

## One consolidated result

Update the same checklist as work progresses and return it at completion:

```text
Product Operations — <product, run ID, timestamp>
Area | Status | Evidence/findings | Action/result | Links/next step
<every area, including healthy and blocked rows>

Changed this run: <records, horizons, statuses, drafts, with links and one-line why>
Assumed: <inferences the human may want to correct>
Needs your decision: <irreversible actions only, with recommendation, or none>
Unfinished or failed: <remaining work, dependency, next action>
```

Domain artifacts stay in their providers; link them here instead of sending per-area
messages. External and stakeholder communications stay drafts until approved. A quiet run
still reports that every area was checked.
