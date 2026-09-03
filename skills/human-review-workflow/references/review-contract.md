# Review Request Contract

Provider-native fields may differ. Every provider preserves stable identity, source
context, immutable response history, and human authorship. The full application contract
below applies only to action-capable adapters.

## Tracking-only providers

A tracking-only provider needs a stable request/idempotency key, linked source identity,
question and context, pending/decided state, allowed outcomes, reviewer/rationale, and
immutable revision identity. Every outcome maps to `NO_ACTION`; application status,
continuation dispatch, and `mark_applied` are intentionally absent. A later workflow may
use the recorded judgment as context, but must rely on its own pre-existing authority and
validation before any mutation.

## Required request fields

```yaml
review_id: REV-YYYYMMDD-NNN
idempotency_key: <product|gate|source IDs|source version>
artifact_type: concept-directions
product: Example Product
gate_type: concept-direction
selection_mode: single # single | multiple
approved_effect: experiment_design # experiment_design | roadmap_candidate | validation_design | roadmap_admission
status: pending # pending | decided | applied | superseded | expired
created_at: 2026-08-29T09:00:00-04:00
requested_by: solution-studio
reviewer: product-owner
risk: medium # low | medium | high
source_provider: compass
source_ids:
  opportunity_id: "..."
  solution_ids: ["...", "...", "..."]
source_version: "updatedAt value or content hash"
decision_due: 2026-09-02
decision_prompt: Which direction should we test?
recommended_option: B
allowed_decisions: [approve-A, approve-B, approve-C, revise, defer, reject]
decision: "" # scalar for single; list of approved option IDs for multiple
decision_note: ""
decided_at: ""
response_finalized_at: "" # required before applying a multi-action review
applied_at: ""
continuation:
  approve-A: design-experiment-for-solution-A
  approve-B: design-experiment-for-solution-B
  approve-C: design-experiment-for-solution-C
  revise: regenerate-concepts-with-feedback
  defer: close-with-no-state-change
  reject: archive-proposed-solutions
result_ids: {}
notification:
  created_sent_at: ""
  reminder_sent_at: ""
  escalation_sent_at: ""
```

## Packet body

Render these sections in the provider's native format:

1. Decision needed
2. Why now
3. Recommendation
4. Options and tradeoffs
5. Evidence and source links
6. Uncertainty and what would change the recommendation
7. What each response authorizes
8. Response control or exact response syntax

## Validation invariants

- `review_id` and `idempotency_key` are stable and unique.
- Every source object has a stable provider ID.
- `source_version` covers every source that could invalidate the decision, including the
  sorted child-option IDs, current Plan IDs and bodies, and human-comment high-water mark.
  Do not rely only on a parent object's `updatedAt`; providers may not touch it when a child
  is added. Approval-status changes are decision state and are excluded from this source
  fingerprint.
- `decision` is empty while pending and belongs to `allowed_decisions` when decided.
- `selection_mode` is explicit. `single` permits one approved option; `multiple` permits
  any non-empty subset of `allowed_decisions` without treating multiple approvals as a
  conflict.
- Multi-action reviews are never applied until `response_finalized_at` is explicit. While
  open, comments, new options, and revised Plans refresh the packet but do not mutate the
  roadmap or start downstream work.
- `approved_effect` states what approval authorizes. `roadmap_candidate` may create a
  deduplicated `LATER` item, but never implies `NEXT`, `NOW`, delivery, or release.
- `validation_design` creates or dispatches evidence-gathering work while leaving the
  candidate in `LATER`.
- `roadmap_admission` is valid only for a `VALIDATED` Solution and includes the complete
  ordered `NEXT` snapshot, configured limit, exact target rank, before/after counts, and
  every displacement required when full. It never authorizes `NOW` or delivery work.
- Every allowed decision has exactly one continuation, including explicit no-op outcomes.
- `revise` and `reject` require a rationale; `defer` should include a revisit condition or date.
- Applying the request twice produces no duplicate state transition.
- A stale source version supersedes the request rather than applying it.
- A concept-selection continuation ends in assumption mapping or experiment design, never delivery.
- A portfolio-admission continuation creates or reuses one roadmap candidate per approved
  option and records every resulting ID; applying it twice creates no duplicates.

## Decision record

Decision records are immutable. Corrections create a superseding record.

```yaml
decision_record_id: DEC-YYYYMMDD-NNN
review_id: REV-YYYYMMDD-NNN
idempotency_key: <review ID|decision|source version>
decision: approve-B
rationale: ""
reviewer: product-owner
decided_at: 2026-09-01T14:30:00-04:00
source_version: "..."
application_status: pending # pending | applied | failed
continuation: design-experiment-for-solution-B
continuation_run_id: ""
result_ids: {}
applied_at: ""
error: ""
```
