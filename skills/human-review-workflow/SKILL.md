---
name: human-review-workflow
description: >-
  Create and route asynchronous human-review requests, then read or apply decisions
  according to the configured provider's mode.
  Use when an unattended PM flow reaches an approval or direction gate, when a reviewer
  responds to a pending packet, or when pending decisions need a digest. Do not use for
  ordinary status reports or approvals already handled synchronously in the active session.
---

# Human Review Workflow

Turn a blocking question into a durable asynchronous handoff. An unattended run must
create or reuse a request, notify the reviewer, record `AWAITING_DECISION`, and end. A
later run reads the response from persisted state; it never resumes from conversation
memory.

## Capability Preflight

For a request explicitly marked `build-authorization-v1`, load
[build-authorization](../build-authorization/SKILL.md). That opt-in standing policy may
authorize a separate worker to act after checking the current human response. It combines
investment, design and commitment in one package. The decision adapter stays tracking-only;
ordinary approvals below still have no automatic continuation. Without enabled policy,
do not treat the package as execution authority.

Read `pm-config.md` and load the installed [integration-routing skill](../integration-routing/SKILL.md).

```yaml
requires:
  workflow_capabilities: [automation_runtime, review_requests, decision_records, notifications]
optional:
  workflow_capabilities: [prototype_artifacts]
```

Also resolve every product capability named in the request's `source_ids` or continuation.
Verify exactly one provider per state-owning capability. Do not silently use Markdown,
Obsidian, or a different notification channel. Contract-v1 configs must be upgraded or
explicitly completed before this skill writes workflow state.

Load only the adapter reference selected by routing. For `compass_decisions`, read
[references/compass-decisions-adapter.md](references/compass-decisions-adapter.md). This is
a tracking-only adapter. For `obsidian` or `markdown` review
requests, read [references/obsidian-adapter.md](references/obsidian-adapter.md). Other
providers must declare whether they are tracking-only or action-capable and implement the
matching operation contract below before use. For the legacy no-schema
Compass pilot (`compass_tasks` + `compass_solution_plan_status`), read
[references/compass-native-pilot.md](references/compass-native-pilot.md); it supports
concept-direction selection, portfolio admission to `LATER`, validation authorization in
`LATER`, and exact capacity-aware `NEXT` admission. It must not be generalized to `NOW`,
release, security, billing, or destructive gates.

## Provider Modes and Operations

All providers support durable create/read/list operations. Tracking-only providers stop
there; they must not pretend to implement `mark_applied` or automated continuations.
Action-capable legacy adapters additionally implement application and dispatch operations.

| Capability | Tracking-only | Action-capable |
|---|---|---|
| `review_requests` | `create`, `get`, `list_pending`, `list_decided`, `deep_link` | tracking operations plus `update_response`, `mark_applied` |
| `decision_records` | `get_by_review` | tracking operations plus `record`, `verify_not_applied` |
| `notifications` | `send_request`, `send_reminder`, `send_digest`, `send_escalation` | same |
| `automation_runtime` | run state; no continuation dispatch required | `dispatch`, `retry`, `get_run_status` |
| `prototype_artifacts` | `publish`, `version`, `deep_link`, `archive` | same |

If an adapter cannot perform a required operation, stop with a configuration error before
changing product state.

Some tracking-only providers additionally expose a native decision-application receipt (for
example `compass_decisions`' `apply_recorded_decision`; see its adapter reference). That
receipt lets a service actor record that a decision has been actioned without granting
continuation authority — it does not reclassify the provider as action-capable, and it never
substitutes for the human decision itself. Treat it as the primary signal for Mode 4
reconciliation wherever the provider supports it.

`list_decided` is required, not optional. A tracking-only provider has no `mark_applied`,
so answering a request silently removes it from the pending queue without recording that
anything was done about it. A run that enumerates only pending requests can therefore never
observe a decision the reviewer already made, and answered judgment accumulates unread for
as long as that run repeats. Treat a decided request as open work until Mode 4 reconciles it.

Read [references/review-contract.md](references/review-contract.md) whenever creating,
validating, applying, expiring, or superseding a review.

## Mode 1 — Create a Review Request

Use when a product workflow reaches a human gate.

1. **Snapshot the source.** Read the authoritative source objects and capture stable IDs
   plus `updatedAt` values or deterministic content hashes.
2. **Check for an existing request.** The idempotency key is product + gate type + source
   IDs + source version. Reuse the existing pending request instead of creating a duplicate.
3. **Build the packet for the provider mode.** Include one decision, why it is needed now,
   the recommendation, minimum supporting evidence, and uncertainty.
   - For a tracking-only provider, use its fixed outcomes and map every outcome to
     `NO_ACTION`. Do not invent a continuation field the provider does not support.
   - For an action-capable provider, include two or three real options and the exact
     continuation authorized by every response. Include `revise`, `defer`, and `reject`
     unless the gate contract explicitly excludes one. Declare `selection_mode` as
     `single` or `multiple`; never infer exclusivity from the number of options.
4. **Attach decision aids.** If routed `prototype_artifacts` is available, publish the
   lowest-fidelity artifact that makes the decision inspectable and store its stable
   versioned link. Absence of this optional provider may reduce fidelity; it may not reroute
   the artifact or skip required evidence.
5. **Persist first.** Create the request through the configured adapter and re-read it to
   verify the source IDs, version, and choices. For action-capable providers, also verify
   the continuation map.
6. **Notify second.** Send the direct link, recommendation, due date, and one-sentence
   decision through the configured notification adapter.
7. **End the run.** Return `AWAITING_DECISION` with the review ID and direct link. Do not
   ask a blocking conversational question and do not keep the task alive.

Silence never means approval. On expiry, preserve product state and mark the review
`expired` or `deferred` according to configured policy.

## Mode 2 — Read a Tracking-only Decision

Use when a tracking-only provider has a human response. Read the exact request and current
revision from persisted state. If it remains pending, return `AWAITING_DECISION` and end.
If decided, report the immutable outcome and rationale. Approval does not auto-apply a
continuation or trigger any automatic action. It does not grant roadmap, merge, deploy,
destructive, or any other new authority. A subsequent workflow may act only inside its
pre-existing authority and must perform its ordinary validation immediately before acting.

Reporting an outcome does not complete it. Hand every decided request to Mode 4
reconciliation so it is acted on, converted into tracked work, or explicitly recorded as not
actioned. A decision that is only ever read and restated is indistinguishable, to the
reviewer, from one that was ignored.

## Mode 3 — Apply a Decision with an Action-capable Adapter

Use only when the configured adapter explicitly declares action-capable semantics and the
decision router detects a response.

1. Read the request from `review_requests`; do not trust notification text as the decision.
2. Validate that the response is one allowed value and includes any note required for
   `revise`, `defer`, or `reject`.
3. Call `verify_not_applied(review_id)`. If already applied, return a clean no-op.
4. Re-read every authoritative source and compare it with `source_version`.
   - If unchanged, continue.
   - If changed, mark this request `superseded`, create a refreshed request, notify once,
     and end without applying the stale decision.
5. Write an immutable decision record with `application_status: pending` and an idempotency
   key before mutating product state.
6. Execute only the continuation mapped to the selected response. A decision to test a
   concept cannot authorize roadmap promotion or production implementation.
7. Mark the decision record and request `applied`, recording resulting provider IDs and
   the continuation run ID.
8. Dispatch the next flow if one is mapped. End this router run; do not wait for that flow.

If step 6 fails, leave the decision record `pending` with the error and retry through the
configured runtime. A retry reuses the same decision and idempotency keys.

## Mode 4 — Notify, Digest, and Reconcile Decided Work

Inspect pending **and decided** requests from the decisions-and-notifications item in
[scheduled-product-operations](../scheduled-product-operations/SKILL.md), or on an existing
review event. No separate notifier cron is required. In a shared run, `AWAITING_DECISION`
ends the item for a request that is still pending; the parent continues independent
checklist work, including reconciliation of requests that were already decided.

### Notify pending requests

- Send the creation notification once.
- Send at most one due-date reminder.
- Put overdue low- and medium-risk requests into the configured digest.
- Escalate an overdue high-risk request once through the configured escalation target.
- If there are no eligible notifications, return no work to the shared checklist;
  standalone event invocations may skip an empty event without a model turn.
- Never expose credentials or private source content beyond the configured audience.

### Reconcile decided requests

A decision is not finished when the reviewer answers it. It is finished when the answer has
visibly changed something or has been explicitly recorded as declined. Every run must close
that loop, because nothing else will: the request has already left the pending queue.

1. **Enumerate, do not remember.** Call `list_decided` for the configured scope. A scheduled
   run is rarely the run that created the request, so it holds no persisted request ID and
   cannot rely on `get` alone. Enumeration is queue discovery and does not replace exact
   request recovery, which still uses the persisted idempotency key or request ID.
2. **Check for an existing handled receipt — native signal first.** Where the provider
   exposes a native decision-application receipt (`compass_decisions`' `apply_recorded_decision`),
   that receipt is the primary "already handled" signal: check it before anything else. Where
   no native receipt capability exists, fall back to a durable receipt this workflow recorded
   in `automation_runtime`. Either way, reconciliation is keyed by request ID plus the decided
   revision identity — a receipt from an earlier revision does not close a later one.
3. **Compare the outcome against authoritative product state — corroboration, not the primary
   signal, once a native receipt exists.** Read the resolved provider for the objects the
   decision concerns and determine whether the outcome is already reflected. This comparison
   stays essential even with a native receipt: it is how a run classifies decisions whose
   implication is not a simple state change (an answer owed to the reviewer, or an affirmation
   that current state already is the decided outcome). For a provider with no native receipt
   operation, this comparison remains the primary signal.
4. **Classify each unreflected decision.**
   - *Already reflected — no mutation required* — the decided outcome affirms the current
     state rather than instructing a change (for example, approving that a solution "remain"
     at its current stage). Write the handled receipt; do not create a follow-up item merely
     because a decision record exists.
   - *A question directed at the agent, not at product state* — the rationale is a question
     the reviewer is asking the agent (for example, "do we have mocks yet?"), not an
     instruction to mutate anything. Post the answer through the appropriate channel, then
     write the handled receipt.
   - *Mechanically closable under existing authority* — perform the ordinary action, then
     write the handled receipt. The decision supplies the human judgment; the authority must
     already exist independently. Re-validate immediately before acting.
   - *Requires work beyond this run's authority, or carries rationale that is not a
     mechanical instruction* — create or reuse one tracked follow-up work item in the
     resolved delivery provider, linked to the request, and record it on the checklist.
     Reviewer rationale is frequently prose describing intent across several objects. Convert
     it into visible work; never silently interpret it into mutations, and never discard it.
   - *Blocked on a missing capability* — record the specific missing operation or tool and
     surface it. Do not approximate the outcome with a different operation whose side effects
     the reviewer did not agree to.
   - *Deliberately not actioned* — record that with a reason and a handled receipt so it stops
     reappearing. An outcome may legitimately be informational.
5. **Report every decided request that remains unreflected**, oldest first, with its age since
   the decision. Compute that age from the decision's own decided timestamp (for
   `compass_decisions`, `decisions[0].decidedAt`) — never the originating request's creation
   timestamp; the two can diverge by days and conflating them manufactures false urgency. Age
   is the signal that this loop is failing; a growing backlog of answered decisions means the
   reviewer is spending judgment that the system is discarding.

Reconciliation never expands authority. An approval still authorizes nothing by itself; this
mode only guarantees the answer is seen, acted on where already permitted, or made visible as
outstanding work. `Request changes` and `Reject` require reconciliation exactly as `Approve`
does — a reviewer who asked for changes is owed the same follow-through as one who agreed.

## Mode 5 — Concept Direction Review

For early ideas, the decision is: **Which direction should we test?** Prepare three
meaningfully different directions:

1. minimum intervention;
2. recommended balance of value, evidence, risk, and effort;
3. assumption-challenging alternative.

Each direction includes a customer before/after, prototype or storyboard, scope, outcome
connection, evidence, riskiest assumption, cheapest test, relative delivery shape, and
tradeoff. For an action-capable adapter, the allowed response may select a direction for
assumption mapping and experiment design under existing authority. It does not validate
the solution, add it to `NOW`, or authorize code.

With `compass_decisions` or another tracking-only provider, construct or reuse the request,
later read and report the exact outcome, and stop; never start assumption mapping, an
experiment, or another workflow. Only an explicitly action-capable adapter may apply the
declared experiment-design continuation under its existing authority.

## Mode 6 — Portfolio Admission Review

Use when several non-exclusive ideas may each deserve preservation on the roadmap. Set
`selection_mode: multiple` and `approved_effect: roadmap_candidate`. The reviewer may
approve any subset. Only an action-capable adapter may create or reuse one linked roadmap
item in `LATER` for each approved option; do not infer priority from approval and do not
move anything to `NEXT` or `NOW`.
A later roadmap review ranks admitted candidates using evidence, outcome alignment,
dependencies, and capacity.

With `compass_decisions` or another tracking-only provider, construct or reuse the request,
later read and report the exact outcome, and stop; never create or move a `LATER` item or
start another workflow. Only an explicitly action-capable adapter may apply the declared
candidate-admission continuation under its existing authority.

## Mode 7 — Validation Authorization Review

Use when a preserved candidate is worth testing but its linked Solution is not yet
validated. The packet contains the prototype or experiment method, target reviewer or
participant, riskiest assumption, learning question, success threshold, kill condition,
cost, and timebox. Only an action-capable adapter may dispatch that validation work and
create or reuse the candidate in `LATER`; it leaves the candidate there. Validation
approval never means `NEXT`, `NOW`, or delivery priority.

With `compass_decisions` or another tracking-only provider, construct or reuse the request,
later read and report the exact outcome, and stop; never create a `LATER` item, dispatch
validation, or start another workflow. Only an explicitly action-capable adapter may apply
the declared validation continuation under its existing authority.

## Mode 8 — `NEXT` Admission Review

Use only after the linked Solution is `VALIDATED`. Re-read the complete ordered `NEXT`
queue and `portfolio_policy`. Compare the candidate against every queued item, state the
exact target rank, and show before/after counts. If `next_limit` is full, the recommended
action must name every item displaced to `LATER`; an additive approval is invalid. Missing
capacity, rank, or validation evidence produces `KEEP_LATER`, not a promotion. Only an
action-capable adapter may apply the exact approved queue mutation, and it creates no
delivery tasks. `NEXT → NOW` remains a separate commitment gate.

With `compass_decisions` or another tracking-only provider, construct or reuse the request,
later read and report the exact outcome, and stop; never mutate `NEXT`, displace an item,
mark a decision applied, or start another workflow. Only an explicitly action-capable
adapter may apply the declared queue continuation under its existing authority.

## Completion Evidence

Report:

- resolved workflow providers;
- review and decision IDs;
- source IDs and version check;
- notification result;
- for tracking-only providers, the reported outcome and explicit `NO_ACTION`; for
  action-capable providers, the applied continuation or explicit no-op;
- for every decided request reconciled under Mode 4: its classification, the handled receipt
  (native provider receipt where available, else the runtime receipt) or the tracked
  follow-up work item created, and the age of any decision still unreflected, computed from
  the decision's own decided timestamp;
- resulting object/run IDs;
- any missing capability or retryable error.
