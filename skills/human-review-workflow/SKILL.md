---
name: human-review-workflow
description: >-
  Create, route, and apply asynchronous human-review requests for product decisions.
  Use when an unattended PM flow reaches an approval or direction gate, when a reviewer
  responds to a pending packet, or when pending decisions need a digest. Do not use for
  ordinary status reports or approvals already handled synchronously in the active session.
---

# Human Review Workflow

Turn a blocking question into a durable asynchronous handoff. An unattended run creates a
review request, notifies the reviewer, records `AWAITING_DECISION`, and ends. A later run
applies the response from persisted state; it never resumes from conversation memory.

## Capability Preflight

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

Load only the adapter reference selected by routing. For `obsidian` or `markdown` review
requests, read [references/obsidian-adapter.md](references/obsidian-adapter.md). Other
providers must implement the operation contract below before use. For the no-schema
Compass pilot (`compass_tasks` + `compass_solution_plan_status`), read
[references/compass-native-pilot.md](references/compass-native-pilot.md); it supports
concept-direction selection, portfolio admission to `LATER`, validation authorization in
`LATER`, and exact capacity-aware `NEXT` admission. It must not be generalized to `NOW`,
release, security, billing, or destructive gates.

## Provider Operations

The resolved adapters must support:

| Capability | Required operations |
|---|---|
| `review_requests` | `create`, `get`, `list_pending`, `update_response`, `mark_applied`, `deep_link` |
| `decision_records` | `record`, `get_by_review`, `verify_not_applied` |
| `notifications` | `send_request`, `send_reminder`, `send_digest`, `send_escalation` |
| `automation_runtime` | `dispatch`, `retry`, `get_run_status` |
| `prototype_artifacts` | `publish`, `version`, `deep_link`, `archive` |

If an adapter cannot perform a required operation, stop with a configuration error before
changing product state.

Read [references/review-contract.md](references/review-contract.md) whenever creating,
validating, applying, expiring, or superseding a review.

## Mode 1 — Create a Review Request

Use when a product workflow reaches a human gate.

1. **Snapshot the source.** Read the authoritative source objects and capture stable IDs
   plus `updatedAt` values or deterministic content hashes.
2. **Check for an existing request.** The idempotency key is product + gate type + source
   IDs + source version. Reuse the existing pending request instead of creating a duplicate.
3. **Build the packet.** Include one decision, why it is needed now, the recommendation,
   two or three real options, minimum supporting evidence, uncertainty, and the exact
   continuation authorized by every response. Include `revise`, `defer`, and `reject`
   unless the gate contract explicitly excludes one. Declare `selection_mode` as `single`
   or `multiple`; never infer exclusivity from the number of options.
4. **Attach decision aids.** If routed `prototype_artifacts` is available, publish the
   lowest-fidelity artifact that makes the decision inspectable and store its stable
   versioned link. Absence of this optional provider may reduce fidelity; it may not reroute
   the artifact or skip required evidence.
5. **Persist first.** Create the request through the configured adapter and re-read it to
   verify the source IDs, version, choices, and continuation map.
6. **Notify second.** Send the direct link, recommendation, due date, and one-sentence
   decision through the configured notification adapter.
7. **End the run.** Return `AWAITING_DECISION` with the review ID and direct link. Do not
   ask a blocking conversational question and do not keep the task alive.

Silence never means approval. On expiry, preserve product state and mark the review
`expired` or `deferred` according to configured policy.

## Mode 2 — Apply a Decision

Use when the decision router detects a response.

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

## Mode 3 — Notify and Digest

Use a scheduled notifier to inspect pending requests without changing their decisions.

- Send the creation notification once.
- Send at most one due-date reminder.
- Put overdue low- and medium-risk requests into the configured digest.
- Escalate an overdue high-risk request once through the configured escalation target.
- Do not generate a model turn when there are no eligible notifications.
- Never expose credentials or private source content beyond the configured audience.

## Mode 4 — Concept Direction Review

For early ideas, the decision is: **Which direction should we test?** Prepare three
meaningfully different directions:

1. minimum intervention;
2. recommended balance of value, evidence, risk, and effort;
3. assumption-challenging alternative.

Each direction includes a customer before/after, prototype or storyboard, scope, outcome
connection, evidence, riskiest assumption, cheapest test, relative delivery shape, and
tradeoff. The allowed response selects a direction for assumption mapping and experiment
design. It does not validate the solution, add it to `NOW`, or authorize code.

## Mode 5 — Portfolio Admission Review

Use when several non-exclusive ideas may each deserve preservation on the roadmap. Set
`selection_mode: multiple` and `approved_effect: roadmap_candidate`. The reviewer may
approve any subset. For every approved option, create or reuse one linked roadmap item in
`LATER`; do not infer priority from approval and do not move anything to `NEXT` or `NOW`.
A later roadmap review ranks admitted candidates using evidence, outcome alignment,
dependencies, and capacity.

## Mode 6 — Validation Authorization Review

Use when a preserved candidate is worth testing but its linked Solution is not yet
validated. The packet contains the prototype or experiment method, target reviewer or
participant, riskiest assumption, learning question, success threshold, kill condition,
cost, and timebox. Approval dispatches only that validation work. Create or reuse the
candidate in `LATER` and leave it there; validation approval never means `NEXT`, `NOW`, or
delivery priority.

## Mode 7 — `NEXT` Admission Review

Use only after the linked Solution is `VALIDATED`. Re-read the complete ordered `NEXT`
queue and `portfolio_policy`. Compare the candidate against every queued item, state the
exact target rank, and show before/after counts. If `next_limit` is full, the recommended
action must name every item displaced to `LATER`; an additive approval is invalid. Missing
capacity, rank, or validation evidence produces `KEEP_LATER`, not a promotion. Approval
applies only the exact queue mutation and creates no delivery tasks. `NEXT → NOW` remains
a separate commitment gate.

## Completion Evidence

Report:

- resolved workflow providers;
- review and decision IDs;
- source IDs and version check;
- notification result;
- applied continuation or explicit no-op;
- resulting object/run IDs;
- any missing capability or retryable error.
