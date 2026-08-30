# Compass-Native Review Pilot Adapter

Use this adapter only when `review_requests` resolves to `compass_tasks` and
`decision_records` resolves to `compass_solution_plan_status`.

This is a no-schema pilot for **concept-direction selection, portfolio admission,
validation authorization, or exact `NEXT` admission**. It tests whether the
Compass Tasks `IN_REVIEW` experience is the right human inbox before Compass gains native
ReviewRequest, ReviewOption, and DecisionRecord models. It does not satisfy the immutable
generic decision-record contract and must not be used for `NOW`, release, security,
billing, or destructive gates.

## Candidate preflight: execution collision

Do not create a review merely because an Opportunity has multiple Solutions. First prove
that the direction is still undecided. Search the configured systems for work that may
already embody or execute the choice:

- Compass Tasks in `IN_PROGRESS`, `IN_REVIEW`, or `BLOCKED` linked to the Opportunity,
  candidate Solutions, or related Roadmap Items;
- Roadmap Items in `NOW` or `NEXT`, especially duplicate or overlapping titles;
- active or recently completed runs in the resolved `automation_runtime`, including agent
  jobs whose brief, branch, or output overlaps the candidate directions;
- open branches, pull requests, previews, and implementation plans in the configured
  delivery provider;
- recent approvals, decisions, comments, and experiments that commit or materially narrow
  the direction.

If an execution collision exists, do not open a new direction review. Link or report the
active work, refresh Compass state from it when appropriate, and end `SUPERSEDED` or
`ALREADY_IN_PROGRESS`. When the evidence is ambiguous, create a small reconciliation
request about ownership or scope rather than asking the human to repeat the product choice.
Record which sources were checked and when. A Compass-only scan is insufficient when
`pm-config.md` declares additional execution systems.

## Representation

- One Compass Task is the review envelope.
- The Task starts in `IN_REVIEW`, uses iteration `Product Review`, and is assigned to the
  configured reviewer when possible. For this no-schema pilot, Task status is the review
  submission control: `IN_REVIEW` means open for edits and `DONE` means finalized.
- The Task links to one Opportunity and two or three candidate Solutions. Link a supporting
  Compass Doc when a longer comparison or artifact is needed.
- Each candidate Solution has one current PLAN entry in `PENDING` status.
- The Task declares `selection_mode: single` or `selection_mode: multiple` and the exact
  `approved_effect`.
- Plan approvals made while the Task is `IN_REVIEW` are saved responses, not permission for
  the router to apply them yet. The reviewer moves the Task to `DONE` to finalize the batch.
- In `single` mode, one approved PLAN selects a direction for assumption mapping or
  experiment design.
- In `multiple` mode, every approved PLAN admits that Solution as a deduplicated `LATER`
  roadmap candidate. Approval does not set delivery priority.
- A validation-authorization Task may be Task-only: `DONE` dispatches the exact prototype
  or experiment-design continuation in its packet while the linked item remains `LATER`.
- A `NEXT`-admission Task is Task-only and single-candidate. Its packet must prove the
  Solution is `VALIDATED`, include the full ordered `NEXT` queue and configured limit, name
  the target rank, and name every displacement if the queue is full. `DONE` authorizes only
  that exact queue mutation.

## Create the review

1. Complete the execution-collision preflight and record its sources and timestamp.
2. Re-read the Opportunity and candidate Solutions. Capture their IDs and `updatedAt`
   values in the Task description as `source_version`.
3. Ensure every direction is a distinct Solution. Do not create cosmetic variants.
4. Call `add_solution_plan` once per Solution. Each plan includes:
   - customer before/after;
   - approach and scope;
   - evidence and outcome connection;
   - riskiest assumption and cheapest test;
   - relative delivery shape and tradeoff;
   - a Compass Doc or repository-preview link when a separate artifact helps.
5. Create a Task:
   - title: `[Review] <one-sentence decision>`;
   - status: `IN_REVIEW`;
   - priority based on review risk/urgency;
   - iteration: `Product Review`;
   - owner/assignee: configured reviewer;
   - due date: configured or gate-appropriate date;
   - description: compact packet plus `review_id`, source version, recommendation, each
     option's Solution/PLAN ID, `selection_mode`, `approved_effect`, and exact continuation.
6. Link the Task to the Opportunity, every candidate Solution, and supporting Doc.
7. Re-read the Task and every plan before sending its direct link through notifications.
8. End `AWAITING_DECISION`.

## Reconcile an open review

A scheduled review steward must re-read the whole parent Opportunity, not only the Task's
existing links. While `review_state: open`:

1. Compare the sorted current child-Solution IDs with the packet. A new Solution changes
   the source fingerprint even if the Opportunity's `updatedAt` did not change.
2. Read every Solution's complete Plan & Discussion thread. Treat human comments after the
   current Plan as revision input.
3. Respond to material comments by adding a revised current Plan that directly addresses
   the feedback; do not erase the prior Plan or human comment.
4. Classify each new Solution as a distinct option, enabling dependency, assumption, or
   duplicate. Give legitimate options/dependencies a reviewable Plan and link them to the
   Task. Explain other classifications without silently discarding the input.
5. Refresh the Task packet, option set, source fingerprint, recommendation, and response
   summary. Preserve valid approval statuses.
6. Apply nothing downstream and keep the Task in `IN_REVIEW`. The scheduled resolver must
   not move it to `DONE`; only the reviewer finalizes the response batch.

The reconciliation loop is idempotent: an unchanged comment or Solution must not create a
second revised Plan, link, or response.

## Human response

The reviewer opens the Task and linked Solution cards, then approves Plans according to
the declared mode. `single` accepts exactly one current Plan. `multiple` accepts any
non-empty subset; more than one approval is expected and is not a conflict.

The no-schema pilot does not safely encode `revise`, `defer`, or freeform rejection. If the
reviewer wants one of those outcomes, leave every plan unapproved and move the Task to
`BLOCKED`; the router reports that human follow-up is required and applies nothing.

## Apply the response

1. `get_task` and inspect status.
   - `IN_REVIEW`: run the reconciliation loop and apply nothing.
   - `DONE` without an application receipt: treat the Task's `updatedAt` as
     `response_finalized_at` and continue.
   - `DONE` with an application receipt: return a clean no-op.
   - Any other status: apply nothing and report the review is cancelled, blocked, or not in
     a valid review state.
2. Resolve linked Opportunity, Solution, Roadmap Item, and Key Result IDs from Task links.
3. For concept-direction and portfolio-admission reviews, read every Solution's current
   Plan and count `APPROVED` values.
   - Zero: no-op; still awaiting a decision.
   - `single` with more than one: move the Task to `BLOCKED`, report conflicting approvals,
     and apply nothing.
   - `single` with exactly one, or `multiple` with one or more: continue.
   For Task-only validation authorization or `NEXT` admission, `DONE` is the approval;
   require an exact `approved_effect` and continuation in the packet instead of Plan status.
4. Compare the aggregate Opportunity/Solution/Plan/comment/roadmap-queue fingerprint to `source_version`
   in the Task. If stale,
   move the Task to `BLOCKED`, comment on the selected Solution that refreshed review is
   required, and apply nothing.
5. Add an agent comment to every selected Solution recording the review ID, approved Plan
   ID, reviewer-visible Task ID, source version, selection mode, and continuation run ID.
   This is the pilot receipt; do not call it an immutable DecisionRecord.
6. Apply only the declared effect:
   - `experiment_design`: start assumption mapping and experiment design for the selected
     Solution. Do not update it to `VALIDATED`, promote it to the roadmap, create delivery
     tasks, or write code.
   - `roadmap_candidate`: create or reuse exactly one Roadmap Item for every approved
     Solution, link it to that Solution and Opportunity, and set its horizon to `LATER`.
     Do not move it to `NEXT` or `NOW`, create delivery tasks, or write code.
   - `validation_design`: create or reuse the exact validation-design work in the packet.
     Leave the linked Roadmap Item in `LATER`; do not update Solution validation status,
     start outreach, run the experiment, create delivery work, or write code.
   - `roadmap_admission`: re-verify that the Solution is `VALIDATED`, the queue fingerprint
     is current, and the proposed after-count does not exceed `next_limit`. Apply the exact
     target rank and named displacements atomically when the provider supports it. If rank,
     capacity, or displacement cannot be applied as declared, move the Task to `BLOCKED`
     and make no additive promotion. Never create delivery work or move anything to `NOW`.
7. After all continuation objects are created and linked successfully, add the application
   receipt and leave the reviewer-finalized Task in `DONE`. If application fails, move it
   to `BLOCKED` with the retryable error recorded on the selected Solution threads.

## Pilot success criteria

- The review is easy to find in Tasks `IN_REVIEW`.
- The Task provides enough context without opening every source object.
- Comparing the linked Solution Plans takes under five minutes.
- The declared selection mode makes one or many approvals unambiguous.
- The router creates only the declared experiment-design, `LATER`-admission,
  validation-design, or exact `NEXT`-queue result.
- The user does not need Obsidian to understand or answer the review.
