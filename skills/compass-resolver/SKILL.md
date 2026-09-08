---
name: compass-resolver
description: >
  Implement one approved build through a tested PR and preview verification. Opted-in
  projects use a bounded build package for admission and execution; other projects use
  already-approved NOW work. Never infers approval from raw feedback or queue position.
---

# Compass Delivery Resolver

Turns the top approved `NOW` item into a real, reviewable PR without requiring manual
assignment. Discovery intake, opportunity focus, solution selection, experiments,
investment gating, and roadmap commitment happen upstream. This skill does not infer
approval from clarity, votes, or roadmap position alone.

With an enabled `build_authorization_policy`, the build-package route in Step 1 replaces
the legacy NOW-only discovery, separate plan approval, title-prefix claims and skip rules.
The common verification and release boundaries still apply.

## Scheduling and scope

Invoke this skill from the authorized-delivery item in
[scheduled-product-operations](../scheduled-product-operations/SKILL.md), or manually.
Do not install a separate resolver cron. Resolve the organization, workspace ID, endpoint
and repository from `pm-config.md` and verified invocation context.

Check eligibility inside the shared run. An empty NOW queue means no legacy delivery work,
not an empty product-operations checklist. For opted-in projects, also inspect approved
packages and unfinished receipts. Never put a delivery-only gate on the shared schedule.
Preserve authorization, ownership, and one-PR limits below; return results to the checklist.

## Non-negotiable guardrails

1. **One item per run.** Ship exactly one PR, or zero if nothing is eligible. Never batch
   multiple roadmap items into one run — keeps PR volume reviewable and blast radius small.
2. **PR only. Never merge, never `--force` push, never `git push --force`, never skip
   hooks (`--no-verify`).** A human merges. This is a hard rule, not a default — do not
   escalate to auto-merge even if checks are green.
3. **Never fabricate a fix.** If the top item can't be scoped with reasonable confidence
   after real investigation (ambiguous requirements, needs a product decision, touches
   auth/billing/data-destructive paths), do NOT force a low-quality patch. Skip it, mark
   it `⚠️ ` + originalTitle via `update_roadmap_item` (not `🤖` — this isn't a claim, it's
   a "needs human input" flag, and it keeps the eligibility filter in Step 1 from silently
   re-attempting the same item every run), and say exactly why in the final report. Move
   to the next eligible item only if this run has budget left — otherwise end the run with
   zero PRs and report why.
4. **Never touch secrets directly.** If the fix requires a new/rotated secret, stop and
   report — do not guess values or write them to code/env files. Follow CLAUDE.md's
   secret-handling rules (1Password + `vercel env`) or use `request_secret`.
5. **No silent duplicate work.** Use the build contract's serialized durable claim for
   opted-in packages, or the legacy Step 2 check for other work, before writing code.
   If ownership is uncertain, stop and reconcile; never duplicate an existing execution.
6. **Two failures means change strategy.** If the same fix approach fails twice (test
   still red, build still broken), stop, re-read the actual error, form a new hypothesis.
   Do not attempt a third variation of the same broken approach.
7. **Isolate in a worktree.** Never edit the configured repository's primary checkout
   directly — it may be shared with other active work.

## Standing task procedure

This is a substantial, extended autonomous task. Use `TaskCreate` for each requirement
below plus a final "end-to-end verification" item; work one at a time; mark items
`completed` only after observing the result (not assuming it). See the user's global
Task Procedure rules — they apply in full here since this runs unattended.

Note there are **two task layers** and they serve different audiences: your internal
`TaskCreate` list tracks *this run's* execution for the harness, while the **Compass
tasks** you create in Step 4 (`create_task`) are the durable, team-visible breakdown of
the work on the Compass board. Keep them roughly in sync as you work, but the Compass
tasks are the ones that outlive the run.

---

## Step 1 — Resolve routing, workspace, and target item

**Opted-in build path takes precedence over Steps 1–4's legacy approval and claim rules.**
If `build_authorization_policy.enabled` is true, invoke
[build-authorization](../build-authorization/SKILL.md). Discover approved packages as well
as existing NOW work; the package may authorize exact LATER-to-NOW admission. Run its
evaluator before mutations, use durable runtime receipts and serialized claims, and resume
the same execution despite its own ACTIVE/IN_DELIVERY/title markers. Reuse the approved
plan without another design request. Then perform implementation and verification below
within package limits. Never fall through to the legacy path when opted-in validation
fails. Disabled/absent policy retains the existing eligibility and direct-instruction path.

The opt-in delivery eligibility check must inspect pending approved packages and unfinished receipts,
not just NOW count. A tracking-only decision itself does not grant authority; execution
uses the verified standing policy. Eligibility inspection is not an authorization check
or a lock.

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
   - Skip any item whose `title` already starts with `🤖` (claimed — see Step 2) or `⚠️`
     (previously attempted and skipped as unsuitable — see Edge cases). Both mean a
     previous run already made a final call on this item; don't re-litigate it silently
     every run.
   - For items with a linked `Opportunity`, call `get_opportunity(opportunityId)` and
     skip if its status is already `ACTIVE` (another run/human already claimed it) or if
     any of its solutions is `IN_DELIVERY` / `SHIPPED`.
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

Compass's MCP API has a real gap here: there is no `get_roadmap_item` or
`update_opportunity` (non-status) tool, so you cannot safely read-modify-append a
description field. Use only fields you already have and can set outright:

1. **Cross-check GitHub first** in case Compass state drifted from reality: from the repo,
   `gh pr list --state all --search "<first 8 chars of the roadmap item's UUID>"`. If a PR
   already exists (open or merged) referencing this item, treat it as claimed — do not
   duplicate. Fix the Compass claim marker instead (title prefix + opportunity status) and
   move to the next eligible item.
2. Rename the roadmap item using the **exact title you already fetched**, prefixed:
   `update_roadmap_item(itemId, title: "🤖 " + originalTitle)`.
3. If the item has a linked opportunity: `update_opportunity_status(opportunityId, status: "ACTIVE")`.
4. These two calls ARE the claim. They must both succeed before you write a single line of
   code. If either fails, stop and report — do not proceed silently.

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
   internal `TaskCreate` list, not a replacement for it:
   - **Solution Plan.** If a current approved plan already covers the implementation, use
     it. Otherwise call `add_solution_plan(solutionId, ...)` with the approach, affected
     subsystems, tests, migration, alternatives, and tradeoffs. Invoke
     `human-review-workflow` with gate type `design-direction`, persist the review request,
     and end `AWAITING_DECISION` before writing code. **Do NOT call
     `approve_solution_plan`** as a side effect of the decision. The next resolver run may
     read the exact tracked outcome, then proceed only if its pre-existing delivery authority
     independently permits implementation of the current plan version.
   - **Compass tasks.** Break the work into `create_task` items (one per meaningful unit —
     e.g. "write failing test", "implement fix", "update MCP docs"), each with a sensible
     `priority`; for a multi-part item use `parentTaskId` for an Epic→subtask shape. Link
     each to the work via `link_task` (`linkedType: "ROADMAP_ITEM"`, and `"SOLUTION"` when
     present). If the roadmap item has a squad, `assign_squad` the tasks to match.
   - Keep the Compass tasks in lockstep with actual progress: `move_task_status` each
     `TODO → IN_PROGRESS` as you start it, then to `IN_REVIEW` once the PR is open (Step 6).
     Leave the final `DONE` transition to a human on merge — same principle as never
     self-merging.
   - **No linked solution** (bare execution NOW item — see Edge cases): skip the solution
     plan, but still `create_task` at least one roadmap-linked task so the work is visible
     on the board.
4. Follow **TDD**: write a failing test first (`__tests__/` for unit/integration), then
   the minimal fix, then confirm green. Use the `test-first` skill if useful.
5. If the fix needs a schema change, follow the target repository's database migration
   workflow and verify against its configured development environment before opening the PR.
6. Keep the change scoped to the one item. Resist drive-by refactors — they slow review
   and widen blast radius.

## Step 5 — Verify before opening the PR

Run the target repository's PR checklist and applicable test, type, build, and E2E checks.
Observe results and update the relevant documentation. Resolve commands and paths from
that repository rather than assuming a package manager or framework.

## Step 6 — Push and open the PR

1. Commit with a message describing the *why*. Push the branch (no force, no skipped hooks).
2. `gh pr create` with:
   - Title mirroring the roadmap item's original title (without the 🤖 prefix).
   - Body: what changed, why, test plan, and — if a data migration script is needed — a
     "Migration required" section (script path, when to run it, one-line rollback).
   - Reference the Compass roadmap item ID and, if applicable, the originating feedback ID
     in the PR body for traceability.
3. Move the Compass task(s) created in Step 4 to `IN_REVIEW` via `move_task_status` now
   that the PR is open. Do NOT move them to `DONE` — that's the human's call on merge, same
   as the PR itself.
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
resolver leaves Tasks `IN_REVIEW`, the Roadmap Item in `NOW`, and the Solution in
`IN_DELIVERY`; only a later observed human merge plus verified production behavior may
advance them. A preview deployment is evidence for review, not permission to mark shipped.

## Step 9 — Report and notify

End every run with a short report:
- Item picked (title and ID from approved `NOW`), `AWAITING_DECISION`, or "queue empty or
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
  pattern to follow): skip per guardrail #3 rather than guessing — flag it in the report
  as needing human input, and apply the `⚠️` marker (not `🤖`) so a human or a future
  `EnterPlanMode` session can pick it up properly, and future runs don't re-attempt it.
- **Two resolver runs for different workspaces race on the same day**: not a conflict —
  each workspace has its own `workspaceId`, roadmap, and routed decision records. Claims
  and idempotency keys are evaluated independently per workspace.
