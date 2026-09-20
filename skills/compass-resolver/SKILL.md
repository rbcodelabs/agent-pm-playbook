---
name: compass-resolver
description: >
  Implement one approved build through a tested PR and preview verification. Opted-in
  projects reuse exact human scope approval; other projects use
  already-approved NOW work. Never infers approval from raw feedback or queue position.
---

# Compass Delivery Resolver

Turns one exact approved build into a reviewable PR, including direct requests and
approved work whose roadmap horizon is still `LATER`. Discovery intake, opportunity focus, solution selection, experiments,
investment gating, and roadmap commitment happen upstream. This skill does not infer
approval from clarity, votes, or roadmap position alone.

With enabled `approved_build_policy`, follow
[build-authorization](../build-authorization/SKILL.md) for the common authority, Task claim,
recovery and completion procedure. Direct instructions enter that same path. No second
Plan approval or roadmap admission is required for an unconditional approved build.

## Scheduling and scope

Invoke this skill from the authorized-delivery item in
[scheduled-product-operations](../scheduled-product-operations/SKILL.md), or manually.
Do not install a separate resolver cron. Resolve the organization, workspace ID, endpoint
and repository from `pm-config.md` and verified invocation context.

Check eligibility inside the shared run. An empty NOW queue means no legacy delivery work,
not an empty product-operations checklist. For opted-in projects, also inspect approved
build Decisions — they may target a `LATER` item not yet visible in the NOW
list. Never put a delivery-only gate on the shared schedule. Preserve authorization,
ownership, and one-PR limits below; return results to the checklist.

## Non-negotiable guardrails

1. **One item per run.** Ship exactly one PR, or zero if nothing is eligible. Never batch
   multiple roadmap items into one run — keeps PR volume reviewable and blast radius small.
2. **PR only. Never merge, never `--force` push, never `git push --force`, never skip
   hooks (`--no-verify`).** A human merges. This is a hard rule, not a default — do not
   escalate to auto-merge even if checks are green.
3. **Never fabricate a fix.** If the top item can't be scoped with reasonable confidence
   after real investigation (ambiguous requirements, needs a product decision, touches
   auth/billing/data-destructive paths), do NOT force a low-quality patch. Skip it and
   record the skip as durable state, not as a title edit: move (or create) a linked Task
   to `BLOCKED` with a comment stating exactly why it was skipped — see Edge cases. That
   `BLOCKED` Task is what keeps the eligibility filter in Step 1 from silently re-attempting
   the same item every run. Say exactly why in the final report too. Move to the next
   eligible item only if this run has budget left — otherwise end the run with zero PRs
   and report why.
4. **Never touch secrets directly.** If the fix requires a new/rotated secret, stop and
   report — do not guess values or write them to code/env files. Follow CLAUDE.md's
   secret-handling rules (1Password + `vercel env`) or use `request_secret`.
5. **No silent duplicate work.** Follow Step 2 before code and repeat the check before
   publishing. Task create/re-read is best-effort collision detection, not an atomic lock.
   Opportunity/Solution lifecycle does not establish ownership. Stop ambiguous ownership.
6. **Two failures means change strategy.** If the same fix approach fails twice (test
   still red, build still broken), stop, re-read the actual error, form a new hypothesis.
   Do not attempt a third variation of the same broken approach.
7. **Isolate in a worktree.** Never edit the configured repository's primary checkout
   directly — it may be shared with other active work.

## Standing task procedure

This is a substantial, extended autonomous task. Use the harness-native task plan for each requirement and a final
"End-to-end verification of every requirement" item. Mark complete only after observing
the result. Use one durable linked delivery Task for execution ownership and checkpoints;
the internal plan is not another product-state store.

---

## Step 1 — Resolve routing, workspace, and target item

**Approved Build path takes precedence.** If `approved_build_policy.enabled` is true,
invoke [build-authorization](../build-authorization/SKILL.md), read exact approved Decisions
as well as NOW work, and use its common worker procedure. Direct instructions also use
that procedure. Do not run an evaluator, require NOW admission or create another design
request. A tracking-only decision itself does not grant authority; execution uses the
verified standing policy and the exact human build approval. Never fall through when its
authority checks fail. Legacy `build_authorization_policy` projects must retain their
pinned legacy revision or explicitly migrate; this skill does not silently reinterpret it.

For other legacy NOW work, retain the following eligibility requirements. A generic
tracked decision is context, not an executable authorization.

1. Read `pm-config.md`. Resolve `roadmap`, `ost`, and `delivery` plus the workflow
   `decision_records` capability. Load `integration-routing` and the configured decision provider's
   adapter. A contract-v1 config or unavailable decision provider blocks delivery.
   When implementation direction is genuinely ambiguous, create a request through the
   configured human-decision provider and stop `AWAITING_DECISION`. Its outcome does not
   grant delivery, merge, or deployment authority; the resolver continues only within its
   pre-existing authority after rechecking the normal eligibility gates.
2. Invoke the `compass` skill for the MCP tool catalog and data model if not already loaded.
3. Use the configured organization and workspace ID; if discovery is required, call
   `list_workspaces` for that organization and match the configured workspace.
4. `list_roadmap_items(workspaceId, horizon: "NOW")`.
5. **Eligibility filter**, in list order (list order = kanban priority order, top = highest):
   - Skip any item that is already claimed, in flight, or deliberately parked. Read this
     from state, never from the title:
     - An open or merged PR references the item's UUID (the Step 2 cross-check).
     - A linked Task is `IN_PROGRESS` or `IN_REVIEW` (in flight), or `BLOCKED` (a previous
       run already made a final call — read its comment via `list_comments` rather than
       re-litigating it silently every run). Read these with
       `list_tasks(workspaceId, linkedType: "ROADMAP_ITEM", linkedId: itemId)`.
   - **Legacy tolerance (read-only, deprecated).** Also skip any item whose `title` starts
     with `🤖` or `⚠️`. These are residue from a retired title-prefix convention and may
     still mark genuinely in-flight or deliberately-parked work in a workspace that hasn't
     been cleaned up. Honor them as a skip signal; **never write one**. When you skip on
     this signal, say so in the report so the item can be migrated to real Task state.
   - Verify the linked solution is `VALIDATED`. Implementation clarity is not validation.
   - Confirm the item is already in `NOW` and that the current run has explicit delivery
     authority under the configured standing policy or a direct human instruction. A
     generic tracked decision is context, not an executable authorization.
   - Skip items with missing or ambiguous authority. Report them as upstream workflow gaps;
     do not create or assume permission here.
   - The **first surviving item in list order is the target.**
6. If no eligible approved item remains, do nothing. Report `queue empty or awaiting
   upstream approval` with the skipped item IDs and missing gate. Do not inspect `NEXT`,
   inspect raw feedback, promote anything, or invent work.

## Step 2 — Claim it before writing any code

Use the common Task claim and recovery procedure in
[build-authorization](../build-authorization/SKILL.md#common-worker-procedure), including
for otherwise-authorized legacy work. Search PRs, exact branches, linked Tasks and runtime
threads. Create/reuse one roadmap-linked Task, record authority, intended branch and
worker thread, move it to `IN_PROGRESS`, then re-read. Check again before code and push.
Never treat Opportunity `ACTIVE`, Solution `IN_DELIVERY` or a title prefix as a lock.
No Task API supplies atomic claim semantics; report ambiguity honestly and reconcile
instead of starting a competing worker. Product lifecycle synchronization is reporting,
not a prerequisite for ownership.

## Step 3 — Isolate work in a fresh worktree

Use the `worktree-bootstrap` skill (or `EnterWorktree`) to create an isolated worktree off
the configured default branch — do not edit the primary checkout directly. Branch naming per
`.claude/pr-guidelines.md`:

- `fix/<slug>-<first8ofUUID>` for bugs
- `feat/<slug>-<first8ofUUID>` for features
- `chore/<slug>-<first8ofUUID>` for non-user-facing work

Embedding the item's short UUID in the branch name is what makes the Step 2 GitHub
cross-check reliable later.

## Step 4 — Plan, then investigate and implement

1. Read the item's full context: `get_opportunity` (if linked) for description, customer
   segment, and existing solutions/assumptions — **note the `solutionId` of the solution
   this roadmap item implements**; any linked feedback via `get_feedback_item` for the
   original report/repro details.
2. Actually read the relevant source before editing — grep/Explore the codebase, don't
   guess file locations. Follow the target repository's architecture and conventions;
   using Compass for delivery tracking does not imply a particular application stack.
3. **Record the plan and task breakdown in Compass** — the team-facing mirror of your
   internal harness task plan, not a replacement for it:
   - **Solution Plan.** If a current approved plan already covers the implementation, use
     it. Otherwise call `add_solution_plan(solutionId, ...)` with the approach, affected
     subsystems, tests, migration, alternatives, and tradeoffs. Invoke
     `human-review-workflow` with gate type `design-direction`, persist the review request,
     and end `AWAITING_DECISION` before writing code. **Do NOT call
     `approve_solution_plan`** as a side effect of the decision. The next resolver run may
     read the exact tracked outcome, then proceed only if its pre-existing delivery authority
     independently permits implementation of the current plan version.
   - **Compass Task.** Reuse the claim Task from Step 2 for the implementation checklist,
     test evidence and recovery checkpoints. Add subtasks only when independently useful,
     never as a mandatory per-test ceremony. Keep the same Task `IN_PROGRESS` while
     building and move it to `IN_REVIEW` once the tested PR and preview are verified.
4. Follow [test-first](../test-first/SKILL.md): write a failing regression test, observe
   the failure, implement the scoped change, and observe the targeted tests passing.
5. Apply approved schema changes only through the repository's development migration
   workflow. Production migrations require separate authority.
6. Preserve the approved scope; record checkpoints on the same Task.

## Step 5 — Verify before opening the PR

Run the repository's PR checklist and applicable test, type, build and E2E commands.
Read the actual outputs, update affected documentation, and follow
[verify-done](../verify-done/SKILL.md). Resolve commands from the repository; do not
assume a package manager or framework. Failed checks keep the work in progress.

## Step 6 — Push and open the PR

1. Re-read authority, expiry/revocation, Task ownership and matching PRs before push.
   Reuse an existing PR; stop ambiguous collisions rather than creating a second one.
2. Commit the scoped change, push without force or skipped hooks, and open one PR.
   Include the concrete problem, resulting behavior, observed verification and stable
   authority/Task/roadmap IDs. Keep private context out of public descriptions.
3. Keep the Task in progress until verification and any configured preview pass, then
   move it to `IN_REVIEW`. Never mark it `DONE` merely because the PR opened.
4. Write reciprocal delivery linkage to every covered Compass Task using `update_task`:
   PR URL/number, repository, head branch, current commit, Roadmap Item ID, Solution ID,
   and all covered Task IDs. Add the same stable IDs to the PR body. If a linked Solution
   exists, add one Solution discussion comment with the PR URL and linkage receipt. Title
   matching is not a durable link.

## Step 7 — Verify the preview when configured

When the repository has an authorized preview workflow, wait for that preview, smoke-test
the affected flow, and note its URL in the PR. Use the configured provider's workflow;
do not infer deployment authority or require a particular hosting platform.

## Step 8 — Hand off completion

Invoke or dispatch `delivery-completion-watcher` with the PR and linked Compass IDs. The
resolver leaves Tasks `IN_REVIEW` and preserves the Roadmap Item's existing horizon;
report supported Solution lifecycle updates accurately; only a later observed human merge plus verified production behavior may
advance them. A preview deployment is evidence for review, not permission to mark shipped.

## Step 9 — Report and notify

End every run with a short report:
- Item picked (title and stable ID), `AWAITING_DECISION`, or "queue empty or
  awaiting upstream approval."
- Approval record IDs and source-version checks.
- What changed (files, approach) and why.
- Compass artifacts recorded: whether a Solution Plan was added, and the Compass task IDs
  created with their current statuses.
- Verification results actually observed (test/build/tsc, E2E if run).
- PR URL, preview URL, smoke-test result.
- Anything skipped and why (ambiguous scope, needs a secret, needs a product decision).

Write run outcomes to the resolved `reporting_archive` provider. If a design decision is
needed, `human-review-workflow` owns the request and notification through configured
providers. Do not hardcode an Obsidian vault, daily-note path, or notification channel.
Pure no-op runs create neither a report nor a notification unless automation-health policy
requires one.

## Edge cases

- **Roadmap NOW item has no linked opportunity or validated solution:** not ordinarily
  eligible. It may proceed only under an explicit standing execution policy that covers
  the action class, risk, and rollback path; otherwise report the missing upstream gate.
- **Ambiguous or too-large item** (e.g. spans multiple files/systems, unclear acceptance
  criteria): do not force it into one PR. Either scope down to the smallest real slice of
  the item and say so explicitly in the report, or skip per guardrail #3.
- **Item requires a design/product decision** (multiple valid UX approaches, no existing
  pattern to follow): skip per guardrail #3 rather than guessing. Record the skip as
  durable state so a human — or a future planning session — can pick it up properly and
  future runs don't silently re-attempt it:
  - Prefer the route this skill already documents: raise a request through the configured
    human-decision provider (`human-review-workflow`, gate type `design-direction`) and end
    `AWAITING_DECISION`. That request is the durable record.
  - Either way, move the linked Task to `BLOCKED` via `move_task_status` (creating and
    linking one first if the item has none), and `add_comment` stating precisely why it was
    skipped and what decision is needed. Reference the decision request if one was raised.
  - Never encode any of this in the roadmap item's title.
- **Two workspaces share a repository:** tenant scope remains separate, but branches and
  code can still overlap. Cross-check repository work and coordinate overlapping changes;
  different workspace IDs do not prove absence of a conflict.
