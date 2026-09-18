---
name: build-authorization
description: Prepare one bounded build request and execute its approved scope through a tested PR under an explicitly enabled standing policy. Use for build approval, delivery admission, and resuming authorized work; excludes merge and production release.
---

# Build Authorization

One human build decision covers investment, approach, capacity commitment, and execution
through a tested PR. Read this contract before preparing or executing a build package.
It replaces repeated approvals only for projects opting into `build_authorization_policy`.
Absent or disabled policy preserves existing workflows. It never retrospectively converts
old decisions or roadmap positions into approval.

This contract deliberately avoids extra machinery: no cryptographic package hash, no
separate receipt/lease store, no worker-identity bookkeeping. Provenance comes from the
decision provider's own immutable revisions and doc versioning; claiming and serialization
reuse the exact same PR-cross-check-and-status-write step every other delivery item already
goes through in `compass-resolver`. Fewer moving parts means fewer things that can silently
drift from what was actually approved.

## Authority and provider boundary

Resolve providers through `integration-routing` and read the project policy. The policy
must record the human instruction activating it, its version, activation time, and exact
project/workspace and repository. Agents cannot enable or widen it on their own. Approval
to change the playbook is not approval of a product build.

The policy grants an agent authority conditional on a current human-approved package.
Compass Decisions remain tracking-only: the decision endpoint neither mutates the linked
item nor dispatches work. The agent reads that evidence, checks this contract, and acts.
Generic `Approve`, Solution Plan status, and legacy system reviews do not satisfy this
contract. Never resurrect dormant native NOW-policy machinery.

The first adapter is `compass_decisions`. Both review and decision capabilities must
resolve to it, and the expanded config table must agree with profile plus overrides.
Other adapters require a verified equivalent immutable human decision contract before
activation; do not treat a mutable approval checkbox as equivalent.

## Prepare the package before asking

Inspect implementation context and existing work first. Prepare one package containing:

- Stable package ID, purpose `build-authorization-v1`, policy version, workspace ID,
  repository, roadmap/solution/opportunity/KR IDs, and a versioned plan reference.
- Outcome, evidence supporting investment, remaining uncertainty, scope and exclusions.
  Existing validation requirements still apply. Missing evidence is a named preparation
  blocker, never a reason to label an unvalidated solution `VALIDATED`.
- Chosen approach, meaningful alternatives and tradeoffs, acceptance criteria, test plan,
  approved environments and preview behavior, and any migration implications.
- Delivery owner, exact target rank, and at most one named displacement item ID if the
  target NOW slot is currently occupied. Otherwise capacity is checked at execution time.
- Expiry and rollback boundary. Note any expected time/cost as context for the human
  reviewing the request; the evaluator enforces expiry but does not meter spend.
- Allowed actions: exact roadmap admission/displacement, linked task creation, isolated
  implementation, tests, branch pushes, PR creation, preview verification and review fixes.
  Merge, production deployment, production data changes, sending messages to third parties,
  and extra paid resources require their own authority; identify merge-triggered deploys.

Write the plan itself as a versioned doc (`create_doc` / `create_doc_version`) and record
its `planDocId` and current `planDocVersionId` in the package. That version ID is the
package's only binding to an exact scope: because a doc version is immutable once created,
re-reading it later and comparing version IDs is sufficient to detect drift — no hashing,
canonicalization, or separate digest field is needed. Editing the plan after approval
creates a new version ID, which the evaluator treats as a changed package.

Persist a UUID idempotency key before `request_decision`, with the package ID and plan
doc/version in context and the exact solution or roadmap subject. Re-read the resulting
request ID. Show the human: "Approve this scope through a tested PR under policy
[version]." Use the provider's normal Approve / Request changes / Reject controls. Every
provider-side continuation remains `NO_ACTION`. Notify only through already-authorized
channels. Return `AWAITING_DECISION` with one stable link; subsequent runs reuse that
request.

## Verify and execute

1. Fetch the exact package, its plan doc's current version, and the linked decision's
   current immutable revision: authenticated human author, approval timestamp, outcome,
   and any superseding decision. Never trust a title match, list excerpt, self-asserted
   reviewer, cached approval or proposed reply. Approval and package preparation must
   postdate policy activation. Missing provenance blocks execution; no inference from an
   old Plan approval is permitted.
2. Re-read policy, current evidence/design/dependency readiness, and capacity (current NOW
   items and limit). Check expiry and revocation at every resume and before any push or
   admission.
3. Normalize the verified snapshot and run the installed evaluator:

   ```bash
   node <build-authorization-skill-directory>/scripts/evaluate-authorization.ts < snapshot.json
   ```

   `READY` permits admission and claiming. `AWAITING_DECISION` or `BLOCKED` permits no
   build mutation. The evaluator only answers whether a current, verified human approval
   covers this exact scope and whether a delivery slot exists for it — it has no opinion on
   whether the work is already claimed or mid-flight; that reuses the caller's existing
   claim step (below), identically for opted-in and legacy items. The evaluator checks the
   snapshot, not authenticity of external evidence: adapters must verify its inputs. Read
   the exported input types in the script when mapping a provider; do not manufacture
   readiness booleans from approval alone.

   Map config `project_id`, `workspace_id`, and `activated_at` to the evaluator's
   `projectId`, `workspaceId`, and `activatedAt` fields; package/decision/current fields
   use the exported camelCase interface. `activation_authority` is verified by the adapter
   before the normalized booleans are supplied; it is a reference, never a substitute for
   approval evidence.
4. On `READY`, admit to NOW if the candidate isn't already active: if the package names a
   displacement, verify that item is still active and remove it; otherwise verify a free
   capacity slot exists. Direct LATER-to-NOW admission is allowed by this package; NEXT is
   optional queue organization. The roadmap item itself is the durable record of admission
   — no separate receipt store.
5. Claim work exactly the way `compass-resolver`'s legacy (non-opted-in) path already does:
   cross-check GitHub for an existing PR referencing the item's short UUID first (catches a
   prior run's in-flight or completed work), then set the linked Opportunity `ACTIVE` and
   move the delivery Task to `IN_PROGRESS` (creating and linking one if the item has none).
   All of these must succeed before writing a line of code. Never encode the claim in the
   roadmap item's title. This is the *same* claim step used for every other item — opted-in
   packages get no separate lease, worker ID, or receipt object.
6. Follow the approved plan through delegated engineering and normal quality checks. Link
   the package, decision, branch, commit and PR reciprocally (e.g. in the Compass Task and
   PR body) so a later run recognizes this exact execution even if the opportunity is
   ACTIVE or the solution is IN_DELIVERY — those lifecycle states communicate product
   status, not which run owns the work; the reciprocal linkage plus a matching PR is what
   establishes ownership.
7. On an uncertain provider response mid-step, read back the roadmap item/Task by its
   stable ID before retrying. If admission already applied but claiming hasn't happened
   yet (or vice versa), resume from the current state — do not repeat displacement or
   create a duplicate PR. If the provider cannot recover an operation unambiguously, stop
   with that operation named as the blocker.
8. At tested PR, set delivery work `IN_REVIEW` and present the release decision. The
   existing completion watcher reconciles only after separately authorized release and
   verified production behavior. A PR is not shipped work.

## Changes, limits and recovery

Routine implementation choices, regression fixes, rebases, review fixes and retries remain
covered while scope/approach and limits hold. Check elapsed time against the package's
expiry at each checkpoint. Material scope/approach changes, increased cost/risk, changed
capacity commitments, expired limits, or changed policy version require a revised package
with a concise delta — editing the plan doc creates a new version ID and invalidates the
old approval automatically. Preserve the prior decision and branch; never edit an approved
plan version in place.

Revocation or supersession stops the next safe operation. Disabling policy stops automated
execution across the project. It does not undo an already-opened PR or reverse external
changes. Never automatically roll back product state or production as a consequence of
revocation.

Every blocker records requirement, evidence, whether an authorized agent can repair it,
owner, next action and decision link if applicable. Reuse unchanged blockers; escalate at
the configured deadline once, then only on material change. Unknown capacity is a blocker,
not an invitation to repeatedly ask for the same approval.

## Installation and pilot

Install this skill, its evaluator and all referring workflows together. Verify actual
installed file contents and scheduled prompt paths before enabling execution. The
[product-operations run](../scheduled-product-operations/SKILL.md) checks newly approved
packages awaiting admission even when NOW is empty — an empty-NOW gate alone is
insufficient. No separate executor cron, receipt store, or lease service needs installing;
this path reuses the same roadmap-item claim and Task primitives every other delivery path
already uses. A generic decision router must not also apply the same package, and a
delivery queue gate must never suppress inspection of other product areas.

Migrate one project first. Repair only verified links; draft one complete eligible package.
Do not change validation status to satisfy the pilot. If no candidate is ready, record the
specific missing evidence and next action. Test approval-to-PR in the live pilot before
enabling other projects. Track approval-to-start, approval-to-PR and repeat-approval count.
The local evaluator tests are necessary evidence, not proof that live dispatch works.
