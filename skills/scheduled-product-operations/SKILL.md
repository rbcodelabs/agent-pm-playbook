---
name: scheduled-product-operations
description: >-
  Install or run one recurring playbook job that checks every product operating area,
  builds one checklist, triages findings, and executes safe work through existing skills.
  Use when asked to schedule the playbook, consolidate its cron jobs, or check and triage
  all product operations. Every area is inspected on every run.
---

# Scheduled Product Operations

One recurring job per configured product: create one checklist, dispatch approved work
early, then inspect every area and work through actionable findings. Current evidence and outstanding work determine action.
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
Create the checklist, inspect authorized delivery early and dispatch at most one dedicated
worker under approved_build_policy; continue every area and execute safe work
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

Create all checklist rows below first. After assigned tasks, inspect authorized delivery
before the remaining health inventory. Under enabled approved_build_policy, verify one
exact approval and check existing Tasks/PRs/threads through build-authorization. Dispatch
at most one dedicated delivery worker with authority, plan, repository/workspace and Task
references; the worker re-reads and claims before code. The parent may prepare the linked
Task handoff but must not claim as a competing worker. Record its runtime link and continue
every remaining checklist row without waiting for implementation. The schedule is a
backstop, not an exclusive executor. If dispatch is unavailable or its result ambiguous,
record that item blocked and reconcile runtime state before retry; do not run long delivery
inline or spawn blindly. Legacy policies keep their explicit compatibility boundary.

Inspect each area's current
sources, using pagination or provider-supported complete queries, and record evidence or
the precise read failure. Share fetched context across rows. If an inventory is incomplete,
mark it blocked or unfinished, never healthy. A missing optional capability remains a
visible limitation on its row and does not stop other areas. Invalid or ambiguous routing
blocks reads/writes for the affected capability until resolved.

Inspect the **assigned tasks** row first. It surfaces judgment calls a prior run parked
for itself — open questions filed as tasks against the agent identity rather than pushed
through the Decisions inbox. Picking those up before generating new findings keeps this
run from piling fresh work on top of its own unresolved follow-ups.

| Area | Inspect on every run | Work route when actionable |
|---|---|---|
| Assigned tasks | Every open task assigned to the current agent identity (`list_tasks` with `assignedToMe`/agent assignee filter) across configured task providers, excluding tasks already covered by the Authorized delivery or Decisions rows below | Resolve directly if mechanical and low-risk; otherwise route by subject to the matching domain skill (e.g. [okr-workflow](../okr-workflow/SKILL.md), [experiment-workflow](../experiment-workflow/SKILL.md), [investment-gate](../investment-gate/SKILL.md)) or [human-review-workflow](../human-review-workflow/SKILL.md) when it poses a judgment call; update or close the task with the outcome so it does not resurface |
| Feedback and research | New/open feedback, unprocessed transcripts, source attribution, unlinked evidence, contradictions | [pm-signal-synthesis](../pm-signal-synthesis/SKILL.md); [compass-feedback-triage](../compass-feedback-triage/SKILL.md) only when insights and OST resolve to Compass |
| OST and opportunities | Weak, duplicate, stale, unmapped branches; evidence changes; focus and pruning candidates | [ost-workflow](../ost-workflow/SKILL.md), then human review for focus or consequential pruning |
| Solutions and assumptions | Orphaned solutions, changed concept directions, untested assumptions, investment readiness | [investment-gate](../investment-gate/SKILL.md), [human-review-workflow](../human-review-workflow/SKILL.md) for concept/review packets |
| Experiments | Missing success/kill conditions, overdue results, stalled tests, new results and contradictory interpretations | [experiment-workflow](../experiment-workflow/SKILL.md); launch and material conclusions retain human gates |
| Roadmap and capacity | Complete NOW/NEXT/LATER queues, validation, ownership, dependencies, capacity and active-work collisions | [roadmap-workflow](../roadmap-workflow/SKILL.md), including its existing build-policy route where enabled |
| Authorized delivery | Approval evidence, explicit approved builds, active claims, branches, PRs, unfinished Task checkpoints | [compass-resolver](../compass-resolver/SKILL.md) for Compass delivery; otherwise the configured delivery workflow; no inferred permission from queue position |
| Completion and adoption | PR/CI/deployment changes, stale review tasks, launch work, exposure, adoption, safety and outcome evidence | [delivery-completion-watcher](../delivery-completion-watcher/SKILL.md); resolved analytics for adoption; review scale/iterate/stop choices |
| Outcomes and OKRs | Metric freshness, KR coverage, outcome drift, cycle boundaries, discovery health, calibration and retrospective needs | [okr-workflow](../okr-workflow/SKILL.md), [pm-coach](../pm-coach/SKILL.md); reconfirm/reset outcomes through human review |
| Decisions and notifications | Pending reviews, **every decided review whose outcome is not yet reflected in product state**, source revisions, due reminders and escalations | [human-review-workflow](../human-review-workflow/SKILL.md) Mode 4, including its reconciliation rules and notification deduplication |
| Reporting | Material changes since the last draft, reporting commitments, missing evidence and decision digest needs | [status-report-workflow](../status-report-workflow/SKILL.md); draft/reuse evidence-linked updates for review |
| Automation health | Failed sources/runs, unavailable credentials or adapters, stale locks, duplicate claims, partial writes, policy review needs | Runtime diagnostics and reconciliation under existing authority; never clear an uncertain claim or rotate credentials automatically |

Use statuses `checking`, `healthy`, `actionable`, `completed`, `awaiting decision`,
`blocked`, `failed`, and `unfinished`. Each row records checked sources/time, findings,
next action, and artifact/request/run links. Multiple findings can have different statuses;
retain unresolved findings even when another finding in the same area is completed.

An empty queue is only `healthy` when the query that produced it covers everything the row
claims. A decisions row is not healthy because no review is awaiting the reviewer; it is
healthy when nothing is awaiting the reviewer **and** no already-answered decision is still
unreflected. The same caution applies wherever answering, resolving, or closing an item
moves it out of the default filter: verify what the query excludes before reporting `healthy`.

For `compass_decisions`, establish "unreflected" primarily from the provider's native
decision-application receipt (`apply_recorded_decision`) per the
[adapter reference](../human-review-workflow/references/compass-decisions-adapter.md); treat
product-state comparison as the corroborating cross-check, and compute a decision's age from
its own decided timestamp — never the originating request's creation timestamp, which can
diverge by days. A `DECIDED` outcome does not by itself imply pending work: some decisions
affirm the current state, and some pose a question to the agent rather than instruct a
mutation; both close with a receipt and no follow-up item.

Agent identities still cannot call `list_research_studies` (verified blocked as of
2026-09-12), unlike `list_decisions`, which does work for agents. Treat an empty or
unavailable research-study inventory as unverifiable from this seat, never as evidence that
no transcripts remain unprocessed — mark that sub-check `blocked`, not `healthy`.

## Triage and execute

- Dispatch approved delivery early as above; inspect every row before other substantial work.
  Rank findings
  by observed urgency, impact on the current outcome, and dependencies. Prefer finishing
  interrupted work and unblocking existing commitments before creating new work.
- Load the selected domain skill before acting. Resolve its required capabilities and
  re-read relevant authority and source state immediately before mutation. Completion
  can change capacity; intake can change evidence. Refresh affected checklist findings
  after those actions, without recursively restarting the entire run.
- Execute safe actionable work within the run using existing skills and permitted worker
  delegation. Preserve each skill's limits, including one delivery PR per worker and
  at most one new delivery worker per operations run. Reconcile existing
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
