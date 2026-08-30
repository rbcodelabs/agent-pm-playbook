---
name: delivery-completion-watcher
description: >-
  Reconcile reviewed delivery work after pull-request, CI, deployment, or production
  state changes. Use for event-driven or scheduled completion checks that close linked
  tasks, update roadmap and solution lifecycle state, record release evidence, and wake
  portfolio stewardship. Never merge a pull request or infer production success.
---

# Delivery Completion Watcher

Turn a human merge plus verified production behavior into durable product-state updates.
This flow is separate from the delivery resolver: the resolver creates a PR and stops at
`IN_REVIEW`; this watcher observes what happened afterward.

## Capability preflight

Read `pm-config.md` and resolve `roadmap`, `ost`, `delivery`, `insights`,
`automation_runtime`, `decision_records`, and `notifications`. Read the configured
`delivery_completion_policy`. Missing production verification or launch policy blocks a
shipped claim; it never defaults to success.

Use `scripts/decide-completion.ts` after collecting the source snapshot. The script makes
the state decision deterministic; provider adapters perform the returned actions.

## Triggers and empty runs

Run on pull-request, required-check, preview, production-deployment, or merge events. Also
run a daily catch-up scan for delivery tasks left `IN_REVIEW`, so missed webhooks cannot
leave stale state indefinitely. End without a model turn when no linked task changed and
no task is older than `stale_in_review_after_hours`.

## Stable linkage

The delivery resolver must write the PR URL, repository, head branch, commit, roadmap ID,
Solution ID, and Task IDs back to every linked delivery Task when it opens the PR. The PR
body and branch also carry the roadmap item's stable ID. Resolve by those IDs; title-only
matching is diagnostic fallback and never authorizes mutation.

If no stable PR link exists, search by the stable roadmap or Task ID. When exactly one PR
is found, repair the reciprocal link before continuing. Zero or multiple matches moves the
Task to `BLOCKED` with the ambiguity; do not guess.

## Collect the completion snapshot

For one linked delivery unit, record:

- current Task status and existing completion receipt;
- PR URL/state, merge actor/time/commit, and required checks;
- preview and production deployment identities and status;
- feature-specific production smoke result;
- linked Roadmap Item, Solution, Opportunity, experiment, and release/launch policy;
- whether the provider can update every required lifecycle field;
- `NOW` counts before any capacity-releasing transition.

A preview is not production proof. A merged PR without a successful production deployment
and feature-specific smoke test remains `WAIT`.

## Decide and apply

Pass the normalized snapshot to:

```bash
node <skill-directory>/scripts/decide-completion.ts < snapshot.json
```

Apply only the returned actions:

- `WAIT`: preserve state and notify only when a configured deadline is crossed.
- `BLOCKED`: move the Task to `BLOCKED`, record the failed gate and evidence, and stop.
- `NOOP`: return the existing receipt; create no duplicate comments, feedback, or dispatch.
- `APPLY`: perform all supported mutations, then write one receipt containing the source
  fingerprint and resulting IDs.

The watcher never merges, re-runs destructive deployment actions, or treats a human review
comment as a merge event.

## Release-state effects

After a human merge, successful required checks, verified production deployment, and a
passing feature smoke test:

1. Move all delivery Tasks covered by the PR to `DONE`.
2. If configured launch work remains, move/reuse the Roadmap Item in `LAUNCHING` and let
   the launch workflow own the remaining checklist. Otherwise move it to `SHIPPED`.
3. Move the linked Solution to `SHIPPED` when the authoritative provider supports it.
4. Write the PR, merge commit, checks, deployment, smoke evidence, mutations, and receipt
   key to the Task and Solution discussion/decision record.
5. When an item leaves `NOW`, dispatch a capacity-change event to the roadmap steward. The
   event contains before/after counts; it never promotes another item.

An unsupported Solution-status operation is a visible synchronization warning in the
receipt, not a fabricated success. The rest of the verified transition may complete when
policy permits partial provider synchronization.

## Smoke-test classification

- **Blocking:** feature unavailable, error response, data/security regression, broken core
  behavior, or failed required threshold. Move the Task to `BLOCKED` and invoke the
  configured incident/rollback path.
- **Passing with follow-up:** the released behavior works, but a non-blocking quality issue
  is observed. Complete the release, create one deduplicated Feedback item in the resolved
  `insights` provider, and link it to the shipped work.
- **Passing:** required behavior and safety checks succeed; no follow-up is created.

## Receipt and retry

Use `delivery-completion:<task-id>:<pr-number>:<merge-commit>:v1`. Write the receipt only
after all required actions succeed. If a later action fails, record the partial results and
retry against the same key. A retry re-reads every destination and continues missing
actions; it never repeats a completed mutation or creates duplicate feedback.

Report the Task, PR, deployment, smoke result, lifecycle mutations, capacity event, receipt
key, unsupported provider operations, and any blocking or follow-up finding.
