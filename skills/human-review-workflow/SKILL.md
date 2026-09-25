---
name: human-review-workflow
description: >-
  Create and route asynchronous human-review requests for irreversible actions (destroying
  records or work, reaching outside the team, shipping to production, spending money or
  human time) and for decisions a human explicitly asked to own; then read, apply, and
  reconcile decisions according to the configured provider's mode. Do not use for
  reversible work such as prioritization, horizon moves, OST changes, or direction choices:
  the agent makes those and reports them.
---

# Human Review Workflow

## Autonomy

Follow the [Autonomy Policy](../../Autonomy%20Policy.md): act, then report. This workflow
exists only for the four irreversible categories and for decisions the human explicitly
asked to own. Never open a request for reversible work (prioritization, `NEXT`/`NOW`
moves, new OST branches, direction choices); do it and report it. Every request carries a
recommended default, and one pending request never blocks unrelated work.

An unattended run turns the irreversible step into a durable asynchronous handoff: create
or reuse a request, notify the reviewer, record `AWAITING_DECISION` for that item, and
continue other work. A later run reads the response from persisted state, never from
conversation memory.

## Capability Preflight

For an explicit approval to build through a tested PR, load
[build-authorization](../build-authorization/SKILL.md). Under enabled
`approved_build_policy`, the worker verifies the immutable human Decision and exact plan;
the decision adapter stays tracking-only and the worker owns execution. Direct synchronous
approval uses the same path without creating a second Decision.

Read `pm-config.md` and load the installed [integration-routing skill](../integration-routing/SKILL.md).

```yaml
requires:
  workflow_capabilities: [automation_runtime, review_requests, decision_records, notifications]
optional:
  workflow_capabilities: [prototype_artifacts]
```

Also resolve every product capability named in the request's `source_ids` or continuation,
with exactly one provider per state-owning capability. Do not silently use Markdown,
Obsidian, or a different notification channel. Contract-v1 configs must be upgraded or
completed before this skill writes workflow state.

Load only the adapter reference selected by routing:

- `compass_decisions` (tracking-only): [references/compass-decisions-adapter.md](references/compass-decisions-adapter.md)
- `obsidian` or `markdown`: [references/obsidian-adapter.md](references/obsidian-adapter.md)
- Legacy no-schema Compass pilot (`compass_tasks` + `compass_solution_plan_status`):
  [references/compass-native-pilot.md](references/compass-native-pilot.md). It covers only
  the owner-requested modes 5–8 and must not be generalized to `NOW`, release, security,
  billing, or destructive gates.

Other providers must declare tracking-only or action-capable and implement the matching
operations below.

## Provider Modes and Operations

| Capability | Tracking-only | Action-capable |
|---|---|---|
| `review_requests` | `create`, `get`, `list_pending`, `list_decided`, `deep_link` | tracking operations plus `update_response`, `mark_applied` |
| `decision_records` | `get_by_review` | tracking operations plus `record`, `verify_not_applied` |
| `notifications` | `send_request`, `send_reminder`, `send_digest`, `send_escalation` | same |
| `automation_runtime` | run state; no continuation dispatch required | `dispatch`, `retry`, `get_run_status` |
| `prototype_artifacts` | `publish`, `version`, `deep_link`, `archive` | same |

Tracking-only providers must not pretend to implement `mark_applied` or continuations. If
an adapter cannot perform a required operation, stop with a configuration error before
changing product state.

Some tracking-only providers expose a native decision-application receipt (for
`compass_decisions`, `apply_recorded_decision`). It records that a decision was actioned
without granting continuation authority or reclassifying the provider; it is the primary
Mode 4 reconciliation signal wherever supported.

`list_decided` is required, not optional. Without `mark_applied`, answering a request
removes it from the pending queue with no record of follow-through, so a run that lists
only pending requests never sees answered decisions. A decided request is open work until
Mode 4 reconciles it.

Read [references/review-contract.md](references/review-contract.md) whenever creating,
validating, applying, expiring, or superseding a review.

## Mode 1 — Create a Review Request

Use when the next step is irreversible or the human asked to own the decision. First apply
[Writing requests people can decide](references/human-facing-requests.md): do all
reversible prep, check whether existing authority already covers the step, and make the
decision one word.

1. **Snapshot the source:** stable IDs plus `updatedAt` values or content hashes.
2. **Reuse before creating.** The idempotency key is product + gate type + source IDs +
   source version; reuse an existing pending request.
3. **Build the packet** with one decision, why now, the recommended default, minimum
   evidence, and uncertainty.
   - Tracking-only: use the provider's fixed outcomes and map every outcome to `NO_ACTION`.
   - Action-capable: two or three real options, the exact continuation for each response,
     `revise`/`defer`/`reject` unless the gate excludes one, and an explicit
     `selection_mode` (`single` or `multiple`).
4. **Attach decision aids** through routed `prototype_artifacts` when available, as a
   stable versioned link.
5. **Persist first**, then re-read to verify source IDs, version, choices, and (for
   action-capable) the continuation map.
6. **Notify second** with the direct link, recommendation, due date, and one-sentence
   decision.
7. **Return `AWAITING_DECISION`** with the review ID and link, end that item, and continue
   independent work.

Silence never means approval of the irreversible step. On expiry, preserve product state
and mark the review `expired` or `deferred` per configured policy.

## Mode 2 — Read a Tracking-only Decision

Read the exact request and current revision from persisted state. If pending, return
`AWAITING_DECISION` and end. If decided, report the outcome and rationale. The approval does not auto-apply a continuation or grant roadmap, merge, deploy, destructive, or any other new authority. A later workflow acts only within its
pre-existing authority and re-validates immediately before acting. Every decided request
then goes to Mode 4.

## Mode 3 — Apply a Decision with an Action-capable Adapter

1. Read the request from `review_requests`, never from notification text.
2. Validate the response value and any required note for `revise`, `defer`, or `reject`.
3. `verify_not_applied(review_id)`; if already applied, return a clean no-op.
4. Re-read every source and compare with `source_version`. If changed, mark the request
   `superseded`, create a refreshed request, notify once, and end without applying.
5. Write an immutable decision record (`application_status: pending`, idempotency key)
   before mutating product state.
6. Execute only the mapped continuation. A decision to test a concept cannot authorize roadmap promotion or production implementation.
7. Mark the record and request `applied` with resulting IDs and continuation run ID.
8. Dispatch the next mapped flow and end without waiting.

If step 6 fails, leave the record `pending` with the error; retries reuse the same
decision and idempotency keys.

## Mode 4 — Notify, Digest, and Reconcile Decided Work

Run from the decisions-and-notifications row of
[scheduled-product-operations](../scheduled-product-operations/SKILL.md) or on a review
event; no separate notifier cron. Inspect pending **and decided** requests.

### Notify pending requests

- Send the creation notification once and at most one due-date reminder.
- Digest overdue low- and medium-risk requests; escalate an overdue high-risk request once.
- Return no work when nothing is eligible. Never expose credentials or private content
  beyond the configured audience.

### Reconcile decided requests

A decision is finished when the answer has visibly changed something or has been recorded
as declined.

1. **Enumerate, do not remember.** Call `list_decided` for the configured scope. Exact
   request recovery still uses the persisted idempotency key or request ID.
2. **Check for a handled receipt — native signal first.** Use the provider's native
   receipt where it exists, else a receipt recorded in `automation_runtime`, keyed by
   request ID plus decided revision.
3. **Corroborate against product state** to classify decisions that are not simple state
   changes; without a native receipt this comparison is the primary signal.
4. **Classify each unreflected decision:**
   - *Already reflected — no mutation required*: the outcome affirms current state. Write
     the receipt; no follow-up item.
   - *A question directed at the agent, not at product state*: answer it through the
     appropriate channel, then write the receipt.
   - *Closable under existing authority*: re-validate, act, write the receipt.
   - *Beyond this run's authority, or rationale that is not a mechanical instruction*:
     create or reuse one tracked follow-up work item linked to the request. Convert intent
     into visible work; never silently interpret it into mutations, and never discard it.
   - *Blocked on a missing capability*: name the missing operation; do not approximate it
     with an operation the reviewer did not agree to.
   - *Deliberately not actioned*: record the reason and a receipt.
5. **Report every unreflected decision**, oldest first, aged from the decision's own
   decided timestamp (`decisions[0].decidedAt` for `compass_decisions`) — never the originating request's creation timestamp, which can differ by days.

Reconciliation never expands authority; it guarantees the answer is seen, acted on where
already permitted, or visible as outstanding work. `Request changes` and `Reject` require reconciliation exactly as `Approve` does.

## Owner-requested reviews (Modes 5–8)

By default the agent makes these choices itself through the domain skill
([ost-workflow](../ost-workflow/SKILL.md), [roadmap-workflow](../roadmap-workflow/SKILL.md),
[experiment-workflow](../experiment-workflow/SKILL.md)) and reports them. Use a mode below
only when the human has explicitly asked to own that decision, in session or in
`pm-config.md`. With `compass_decisions` or any tracking-only provider, each mode means:
create or reuse the request, later read and report the outcome, and stop that item without
starting the continuation.

## Mode 5 — Concept Direction Review

Decision: **which direction should we test?** Offer minimum intervention, a recommended
balance, and an assumption-challenging alternative, each with before/after, prototype or
storyboard, scope, evidence, riskiest assumption, cheapest test, and tradeoff. Tracking-only:
report the outcome and stop. Only an action-capable adapter may apply the declared
experiment-design continuation; it does not validate the solution or authorize code.

## Mode 6 — Portfolio Admission Review

For several non-exclusive candidates: `selection_mode: multiple`,
`approved_effect: roadmap_candidate`. Tracking-only: report the outcome and stop. Only an
action-capable adapter may create or reuse one linked `LATER` item per approved option,
without inferring priority.

## Mode 7 — Validation Authorization Review

For a candidate worth testing whose Solution is not yet validated: method, participant,
riskiest assumption, learning question, success threshold, kill condition, cost, and
timebox. Tracking-only: report the outcome and stop. Only an action-capable adapter may
dispatch validation and keep the candidate in `LATER`.

## Mode 8 — `NEXT` Admission Review

Only after the Solution is `VALIDATED`. Re-read the ordered `NEXT` queue and
`portfolio_policy`, state the target rank and before/after counts, and name every item
displaced when `next_limit` is full. Missing capacity, rank, or validation evidence yields
`KEEP_LATER`. Tracking-only: report the outcome and stop. Only an action-capable adapter
may apply the exact queue mutation; it creates no delivery tasks.

## Completion Evidence

Report resolved providers; review and decision IDs; source IDs and version check;
notification result; the outcome with `NO_ACTION` (tracking-only) or the applied
continuation or no-op (action-capable); for each Mode 4 reconciliation, its
classification, receipt or follow-up item, and age from the decided timestamp; resulting
object/run IDs; and any missing capability or retryable error.
