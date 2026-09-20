---
name: build-authorization
description: Execute one explicit human approval through a tested PR. Use for direct or scheduled approved builds, claims, recovery and review fixes. Merge and production remain separate.
---

# Approved Build

One explicit human approval bound to exact scope authorizes one worker to produce one
tested PR. This skill keeps its historical name for installed links; there is no separate
build package, snapshot evaluator, digest, lease service or exclusive executor.

## Authority and routing

Resolve the repository, tenant/workspace, delivery provider and applicable workflow
providers through [integration-routing](../integration-routing/SKILL.md). An Approved
Build is an authorization relationship, not a new provider object. Record:

1. authority: current synchronous user instruction or approved immutable Decision revision;
2. exact scope: inline approved scope or an immutable plan Doc/version;
3. configured repository and tenant/workspace when applicable;
4. stop boundary: tested PR;
5. exclusions, expiry and any explicit limits.

Direct instructions and scheduled discovery enter the same worker procedure below.
A direct instruction authorizes only its stated work. Unattended discovery requires
explicitly enabled `approved_build_policy`; missing or disabled policy never silently
opts a project into automated execution. Agents cannot enable or widen policy themselves.

For asynchronous work, resolve review and decision providers and verify their immutable
human response contract. Compass uses `compass_decisions` for both; use its adapter.
The endpoint remains tracking-only with `NO_ACTION` continuations: it neither dispatches
nor mutates linked state. The worker acts under the enabled policy and exact human build
approval. A generic concept approval, validated Solution or roadmap position is not build
authority. A native decision-application receipt is bookkeeping, never proof the PR exists.

Read the exact request/revision and plan version, authenticated human author, outcome,
current scope, supersession/revocation and expiry. Compare the approved immutable content
with the scope being executed; a mutable live plan cannot silently replace it. If live
plan content changed, reconcile the difference before execution. Check repo/workspace
identity and same-workspace links. Do not manufacture readiness booleans or infer approval
from title matches, cached excerpts or lifecycle status.

If an approved implementation plan covers the scope, this satisfies
[design-before-code](../design-before-code/SKILL.md).
Do not enter Plan mode or ask for the same approval again.
Use the design workflow once only when design is absent or materially changing. Routine
implementation, tests, rebases and review fixes within the approved scope stay covered.
A material change requires a concise delta approval; preserve prior evidence and branches.

## Preparing an approval when none exists

Read the implementation context first. Present exact scope, approach, acceptance criteria,
tests, exclusions and stop boundary, with evidence and uncertainty appropriate to the work.
For unattended execution, save a versioned plan and a purpose-explicit build Decision;
persist/reuse the provider idempotency key and request ID. Follow
[human-review-workflow](../human-review-workflow/SKILL.md) and return `AWAITING_DECISION`.
Do not create another request when the current human instruction already approved this scope.

## Common worker procedure

1. Re-read authority and current execution evidence. Search linked delivery Tasks,
   matching open/closed PRs, exact branches and runtime threads using stable item IDs.
   Lifecycle states such as Opportunity `ACTIVE` or Solution `IN_DELIVERY` are not ownership.
   A matching merged PR calls for completion reconciliation, not another build.
2. Inspect any existing Task's recorded owner and runtime before changing its description
   or status. Never overwrite a running or uncertain owner's claim; use recovery below.
   Create or reuse one linked delivery Task before code. Record authorization/plan
   references, item ID, repository, intended branch, worker thread/run ID and timestamp
   in supported description/comment fields; move it to `IN_PROGRESS`. Re-read all linked
   Tasks and PRs. Reuse the same Task on resume; do not create per-test duplicate Tasks.
3. Treat create/re-read as **best-effort collision detection, not an atomic lock**.
   Current Task tools have no unique claim key or compare-and-swap, so this protocol
   cannot guarantee exactly-once execution. If simultaneous claims are visible and neither
   worker has begun, choose earliest creation time then stable Task ID; other workers stop.
   If either has begun or state is ambiguous, coordinate with the recorded owner and
   stop only the ambiguous item. Never take over a running owner. Repeat collision checks
   before code and before push or PR creation. Do not claim serialization from status writes.
4. For an uncertain create response, read provider state by stable item/authorization
   linkage before retrying. If creation cannot be recovered unambiguously, stop the item;
   do not blindly issue another create. Record the observed error and next action.
5. Create an isolated worktree from the current configured default branch; preserve dirty
   primary checkouts. Inspect source/tests and follow the approved plan with delegated
   engineering where the harness supports it. Follow the repository's test and PR gates.
6. Checkpoint the same Task after worktree creation, regression test evidence, verification,
   push and PR creation. Record branch/worktree, commit, test results and next action.
   On recovery, inspect the recorded thread: running means leave it alone; idle means send
   continuation to that owner when supported; missing/archived means reconcile branch/PR,
   recheck authority and claims, then record takeover on the same Task before proceeding.
   Unknown runtime state blocks takeover, not independent product operations.
7. Recheck scope, expiry, revocation and collisions before publishing. Open or reuse one PR,
   with reciprocal Task/authority/branch/commit links and actual verification evidence.
   Verify the configured preview when applicable. Move the Task to `IN_REVIEW` and stop.
   [delivery-completion-watcher](../delivery-completion-watcher/SKILL.md) observes later
   authorized release and production evidence; a tested PR is not shipped work.

## Dispatch

The direct request's current thread may be the worker immediately. Scheduled Product
Operations discovers approved, unclaimed work and dispatches at most one dedicated worker
early, then continues its health checklist. It is a backstop, not an exclusive executor.
The parent may prepare a Task handoff, but only the named worker claims execution after
re-reading it. If dispatch response is uncertain, inspect runtime threads and Task
checkpoints; never spawn another worker blindly. No child schedule is needed.

## Capacity and safety

Unknown capacity blocks roadmap admission only. When capacity cannot be read,
leave the horizon unchanged and continue the approved build. Do not demand browser login
or guessed limits to produce reviewable code. If exact admission/displacement is separately
included in the approval, apply it only after the roadmap workflow's live checks succeed.
If the human explicitly made building conditional on admission, honor that condition.
Never mark an unvalidated Solution validated just to satisfy a build or roadmap gate.

Merge and production require separate authority. This workflow grants no production
deployment, production migration/data repair, destructive rollback, external message or
additional paid resource authority. Same-tenant checks and repository tests remain required.
Revocation stops the next safe operation; preserve the Task, branch and PR, never roll back
external state automatically.

## Migration and compatibility

`approved_build_policy` is explicit opt-in; never silently opt in legacy projects.
Absent/disabled new policy retains direct-instruction and existing non-policy workflows.
A project still using `build_authorization_policy` must keep its pinned legacy skill revision
until a human authorizes migration. If encountered with this revision, report that policy
route unavailable; do not reinterpret it or fall through to another unattended route.
If both policies are enabled, resolve the conflict before unattended dispatch.

Existing exact human approvals carry forward during an authorized migration with their
original scope, exclusions and expiry; no new product Decision is required. Retain any old
package ID as correlation only. Generic historical approvals do not become build approvals.
Migration cannot erase an explicit per-build condition: reconcile any retired executor
restriction against the migration authority and preserve the original Decision history.

Install this contract and its referring skills/templates together; update existing schedule
prompts in place only when authorized. Read back installed files, policy and schedule.
Remove calls to the retired evaluator; do not invent replacements for its states.
Verify one live approved item reaches a tested, preview-verified PR without a second
approval or unavailable prerequisite. Documentation tests do not prove that live path.
