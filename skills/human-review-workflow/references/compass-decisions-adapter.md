# Compass Decisions Adapter

Use this adapter when both `review_requests` and `decision_records` resolve to
`compass_decisions`. It maps the workflow contract to Compass's generic decision tools:

- `request_decision(workspaceId, subjectType, subjectId, question, context, idempotencyKey)`
- `list_decisions(workspaceId, state?, subjectType?, outcome?, reviewerId?, query?, page?, pageSize?)`
- `get_decision(workspaceId, requestId)`
- `apply_recorded_decision(decisionId)` — writes a native receipt that a decision has been
  actioned. Service actors may call this (Compass PR #202, merged `f4991b3`). It does not
  decide anything and does not mutate the linked entity. See "Native decision receipts" below.

Service actors and workspace members may create and read requests within their workspace.
Only an authenticated human workspace or organization admin may decide in the Compass UI.
The fixed outcomes are **Approve**, **Request changes**, and **Reject**. Rationale is
required for Request changes and Reject and optional for Approve.

## Tracking-only contract

An opted-in worker may use a purpose-bound build request as evidence under its separately
established [build-authorization policy](../../build-authorization/SKILL.md). The worker
verifies the exact immutable package and human revision and stores execution receipts in
its runtime. Ordinary decisions and historical approvals remain informational.

Every option has continuation `NO_ACTION`. A recorded decision never mutates its linked
entity, dispatches work, moves a roadmap item, merges or deploys code, or performs a
destructive action. Approval is evidence of the human's call, not an executable grant and
does not expand an agent's authority.

**Tracking-only for deciding and for continuations — that has not changed.** Only an
authenticated human workspace or organization admin may choose Approve, Request changes, or
Reject in the Compass UI; a service actor still cannot take a decision. What did change
(Compass PR #202, merged `f4991b3`, verified against production 2026-09-12): a service actor
may call `apply_recorded_decision(decisionId)` to write Compass's own receipt that a decision
has been actioned. Writing that receipt is not auto-applying an outcome — it records, after
the mechanical action has been carried out under this workflow's pre-existing authority (or
after confirming none was required), that the loop has been closed. `pm-config.md`'s
`auto_apply: false` continues to govern whether an agent may act on an outcome at all;
`apply_recorded_decision` is orthogonal bookkeeping, not an authorization grant. Preserve this
distinction exactly — taking a decision and recording that it was actioned remain two
separate permissions, and only the second has opened up to agents.

### Native decision receipts (`apply_recorded_decision`)

- **Pass the decision *record* ID, not the request ID.** Resolve it via
  `get_decision(workspaceId, requestId).decisions[0].id` — never the `requestId` used
  everywhere else in this adapter. Passing the request ID instead returns `decisionRecord
  not found or access denied: <id>`, wording that reads exactly like the old human-identity
  permission error and will send a future run chasing a permission regression that isn't
  there. If that error appears, check which ID was passed before suspecting access was
  revoked.
- **Idempotent, verified.** A second call for the same decision returns the identical receipt
  ID; it does not error or create a duplicate.
- **No side effects, verified.** Applying the receipt leaves the linked experiment's status
  and assumption untouched. It is a bookkeeping write, not an executor.
- Treat this as the **primary** "has this decided request already been handled?" signal for
  Mode 4 reconciliation — check it before falling back to a product-state comparison.

When a run reaches a genuine human judgment:

1. Build a clear question and concise context, link the closest supported Compass subject,
   and persist one UUID idempotency key for the workflow, subject, and source version.
2. Call `request_decision` with that persisted key and persist the returned request ID.
   After an uncertain create response, retry `request_decision` with the same persisted
   UUID idempotency key; Compass returns the
   original request. Persist its request ID before doing anything else.
3. Re-read the exact request with `get_decision` and store its current revision identity in
   run state. `list_decisions` is for discovering and filtering a queue; never treat it as
   exact request recovery for a created request.
4. Notify through the resolved notification provider, including the Compass deep link when
   available.
5. Return `AWAITING_DECISION` and stop the run.

A later run reads the exact request ID with `get_decision`; it does not infer a response
from notification text or search results. While pending, stop again. Once decided, record
the outcome and immutable revision identity in the run report. Continue only when the
next action is independently permitted by the run's pre-existing authority. Approval does
not auto-apply anything.

## Reconciling decided requests

`list_decisions(workspaceId, state: "PENDING")` answers "what is waiting on the reviewer?"
It cannot answer "what has the reviewer already answered that nobody has acted on?" —
deciding a request removes it from that result. A scheduled run that queries only `PENDING`
will report an empty queue while answered decisions accumulate indefinitely.

Implement `list_decided` as `list_decisions(workspaceId, state: "DECIDED")`, and run it on
every scheduled pass, not only when a specific request is being followed up:

- This is queue discovery, which the adapter permits. It does not weaken the rule above:
  recovering a request this run created still uses the persisted idempotency key or request
  ID, never a list result.
- Page the query. `pageSize` is capped, and an unfiltered workspace-wide list of full
  decision packets is large enough to exceed a tool-result limit outright. Narrow with
  `state`, `subjectType`, or `outcome`, page through results, and read individual packets
  with `get_decision` only for the requests being reconciled.
- Reconcile against `currentRevision`. Compass decisions are revisioned, and a decision
  recorded against a superseded revision is not a current answer.
- Reconcile `REQUEST_CHANGES` and `REJECT`, not just `APPROVE`. Rationale is mandatory on
  those two outcomes, so they carry the most reviewer intent and the greatest loss if
  dropped. That rationale is often prose spanning several objects; it becomes a tracked work
  item, never an agent's own interpretation applied directly to product state.
- **Use `decisions[0].decidedAt` for a decision's age — never the request's `createdAt`.** A
  request can sit `PENDING` for days awaiting the reviewer; conflating request creation with
  the decision itself overstates how long an answer has gone unactioned. (Observed against
  production 2026-09-11: a scheduled run reported seven decisions as unexecuted for "8+ days"
  based on a request `createdAt` of 2026-09-04. The reviewer actually decided all seven
  between 09:38Z and 20:42Z on 2026-09-11 — hours old, not days.)
- **A `DECIDED` outcome does not by itself imply a pending mutation.** Some decisions affirm
  the current state rather than instruct a change — for example, approving that an experiment
  "stay" in `DESIGNING` until a dependency is ready means the state it is already in is the
  decided outcome, not backlog work. Others are a question aimed at the agent rather than at
  product state (for example, "do we have mocks yet?"), where the required action is posting
  an answer, not mutating anything. Both are legitimately closable with a receipt and no
  mutation; do not manufacture a follow-up item merely because a decision record exists.
- **Receipt first, product state second.** `apply_recorded_decision` gives this adapter real
  application state to read, so establish "already handled" primarily from that receipt —
  call it once the mechanical action (if any) is complete or confirmed unneeded; it is
  idempotent, so a repeat call is safe. Keep the authoritative product-state comparison as a
  corroborating cross-check, not the primary signal — it remains essential for the affirm- or
  question-shaped decisions above, where there is no entity mutation to diff against.

For Request changes, use the Compass UI's revised-request flow or create a new request with
a new idempotency key. Always use the explicit request identity and current revision when
checking a response. Never overwrite, reinterpret, or discard prior revisions; preserve
the full history returned by `get_decision`. A stale or superseded revision is not a current
decision.
