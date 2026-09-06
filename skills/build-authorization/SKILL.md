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

## Authority and provider boundary

Resolve providers through `integration-routing` and read the project policy. The policy
must record the human instruction activating it, its version, activation time, exact
project/workspace and repository, receipt location, and serialized executor. Agents cannot enable
or widen it on their own. Approval to change the playbook is not approval of a product build.

The policy grants a worker authority conditional on a current human-approved package.
Compass Decisions remain tracking-only: the decision endpoint neither mutates the linked
item nor dispatches work. The separately authorized executor reads that evidence, checks
this contract, and acts. Generic `Approve`, Solution Plan status, and legacy system reviews
do not satisfy this contract. Never resurrect dormant native NOW-policy machinery.

The first adapter is `compass_decisions`. Both review and decision capabilities must
resolve to it, and the expanded config table must agree with profile plus overrides.
Other adapters require a verified equivalent immutable human decision contract before
activation; do not treat a mutable approval checkbox as equivalent.

## Prepare the package before asking

Inspect implementation context and existing work first. Prepare one package containing:

- Stable package ID, purpose `build-authorization-v1`, policy version, workspace ID,
  repository, roadmap/solution/opportunity/KR IDs, and versioned plan reference.
- Outcome, evidence supporting investment, remaining uncertainty, scope and exclusions.
  Existing validation requirements still apply. Missing evidence is a named preparation
  blocker, never a reason to label an unvalidated solution `VALIDATED`.
- Chosen approach, meaningful alternatives and tradeoffs, acceptance criteria, test plan,
  approved environments and preview behavior, and any migration implications.
- Delivery owner, exact target rank, current ordered NOW inventory, capacity limit,
  intended before/after counts, named displacement IDs and dependency readiness.
- Time/spending limits, currency where applicable, expiry, and rollback boundary.
- Allowed actions: exact roadmap admission/displacement, linked task creation, isolated
  implementation, tests, branch pushes, PR creation, preview verification and review fixes.
  Merge, production deployment, production data changes, sending messages to third parties,
  and extra paid resources require their own authority; identify merge-triggered deploys.

Keep the request readable; identifiers and the machine snapshot can follow the summary.
Hash the canonical package body (SHA-256, UTF-8, fixed key ordering). Exclude request ID,
decision revision, execution receipts and approval timestamps to avoid circular hashing.
Include plan content/version, scope, limits, capacity commitment and policy version.
Runtime progress, branch commits, task status, and routine wording changes in unrelated
records are not scope changes. Store the exact canonical body alongside its digest.

Persist a UUID idempotency key before `request_decision`, with the package body and digest
in context and the exact solution or roadmap subject. Re-read the resulting request ID.
Show the human: "Approve this scope through a tested PR under policy [version]."
Use the provider's normal Approve / Request changes / Reject controls. Every provider-side
continuation remains `NO_ACTION`. Notify only through already-authorized channels.
Return `AWAITING_DECISION` with one stable link; subsequent runs reuse that request.

## Verify and execute

1. Fetch the exact request and current immutable revision, authenticated human author,
   approval timestamp, package body/digest and any superseding decision. Never trust a
   title match, list excerpt, self-asserted reviewer, cached approval or proposed reply.
   Approval and package preparation must postdate policy activation. Missing provenance
   blocks execution; no inference from an old Plan approval is permitted.
2. Re-read policy, current scope/plan, validation evidence, dependencies, owner, ordered
   queue, active runs and matching PRs. Check expiry and revocation at every resume and
   before any push or admission. Recompute the digest from authoritative package fields.
3. Normalize the verified snapshot and run the installed evaluator:

   ```bash
   node <build-authorization-skill-directory>/scripts/evaluate-authorization.ts < snapshot.json
   ```

   `READY` permits admission; `RESUME` continues the existing execution; `IN_REVIEW`
   returns the existing PR. `AWAITING_DECISION` or `BLOCKED` permits no build mutation.
   The evaluator checks the snapshot, not authenticity of external evidence: adapters
   must verify its inputs. Read the exported input types in the script when mapping a
   provider; do not manufacture readiness booleans from approval alone.

   Map config `project_id`, `workspace_id`, and `activated_at` to the evaluator's
   `projectId`, `workspaceId`, and `activatedAt` fields; package/decision/runtime fields
   use the exported camelCase interface. `activation_authority`, `receipt_store` and
   `serialized_executor` are verified by the adapter before its normalized booleans are
   supplied. These config fields are references, never substitute approval evidence.
4. Use a serialized executor for this workspace through admission and claiming. A title
   prefix or read-then-write is not a lock. If the runtime cannot prove single execution,
   block automatic dispatch until a durable lease/conditional claim is available.
5. Persist an execution receipt keyed by package ID + request ID + approved revision +
   digest before mutations. It contains policy identity, worker/lease identity, lifecycle,
   capacity snapshot and each completed operation's resulting IDs. Store it in the
   configured automation runtime, separate from the immutable decision. No fallback to
   an unconfigured Markdown product-state store.

   The normalized package binds `roadmapItemId`, `activeItemIdsBefore` and `capacityLimit`.
   Current inventory is `activeItemIds` (with matching `activeCount`). A receipt records
   `appliedDisplacedItemIds` and `admissionApplied` after verified writes. These let the
   evaluator distinguish partial displacement, admission and unrelated queue changes.
   It projects the final inventory by removing approved displacement IDs and adding the
   candidate once; it does not require a spare slot before an approved replacement.
6. Recheck capacity under serialization. For a new admission, apply only the named
   displacement and target rank, then move to NOW and record before/after counts. Direct
   LATER-to-NOW admission is allowed by this package; NEXT is optional queue organization.
   Existing NOW work is counted once. Never displace active work without that exact
   displacement and its pause implications in the approved package.
7. Persist step receipts after each mutation. On uncertain response, read back by stable
   ID/idempotency key before retrying. Resume a partially admitted package; do not repeat
   displacement or create another task/branch. If the provider cannot recover an operation
   unambiguously, stop with that operation as the blocker.
8. Follow the approved plan through delegated engineering and normal quality checks.
   Link the receipt, package, decision revision, Tasks, branch, commit and PR reciprocally.
   Use the receipt to recognize the same execution even when the opportunity is ACTIVE,
   solution IN_DELIVERY or roadmap title has a claim marker. Those states block competing
   executions, not the current owner's resume.
9. At tested PR, set delivery work IN_REVIEW and present the release decision. The existing
   completion watcher reconciles only after separately authorized release and verified
   production behavior. A PR is not shipped work.

## Changes, limits and recovery

Routine implementation choices, regression fixes, rebases, review fixes and retries remain
covered while scope/approach and limits hold. Check elapsed time and spending against the
package at each checkpoint. Material scope/approach changes, increased cost/risk, changed
capacity commitments, expired limits, or changed policy version require a revised package
with a concise delta. Preserve the prior decision and branch; never edit an approved body.

Revocation or supersession stops the next safe operation. Disabling policy stops automated
execution across the project. It does not erase receipts or reverse external changes.
Never automatically roll back product state or production as a consequence of revocation.

Every blocker records requirement, evidence, whether an authorized agent can repair it,
owner, next action and decision link if applicable. Reuse unchanged blockers; escalate at
the configured deadline once, then only on material change. Unknown capacity is a blocker,
not an invitation to repeatedly ask for the same approval.

## Installation and pilot

Install this skill, its evaluator and all referring workflows together. Verify actual
installed file contents and scheduled prompt paths before enabling execution. An empty-NOW
gate alone is insufficient: it must also allow a newly approved build package awaiting
admission. Use one serialized scheduled executor with durable receipts; a separate generic
decision router must not also apply the same package.

Migrate one project first. Repair only verified links; draft one complete eligible package.
Do not change validation status to satisfy the pilot. If no candidate is ready, record the
specific missing evidence and next action. Test approval-to-PR in the live pilot before
enabling other projects. Track approval-to-start, approval-to-PR and repeat-approval count.
The local evaluator tests are necessary evidence, not proof that live dispatch works.
