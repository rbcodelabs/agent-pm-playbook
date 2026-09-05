# Build authorization rollout

Date: 2026-09-05
Status: repository implementation; live activation pending verified installation/runtime

## Decision

Rick approved the change plan in the authorization-cleanup conversation: one bounded
build approval plus an opt-in project standing policy carries work to a tested PR.
The alternative of retaining separate investment, NEXT, NOW and design gates preserves
existing behavior but repeats judgment. Making generic Compass Approve executable would
change every decision's meaning. The chosen policy is purpose-bound, explicit per project,
and keeps Compass tracking-only. Its cost is maintaining a verified worker/receipt adapter.

The riskiest assumption is that the configured runtime can persist and serialize execution
well enough to recover a partially applied admission without duplicates. Revisit the design
if this requires unsupported provider operations rather than pretending a title prefix is
an atomic claim. No new Compass database model is assumed by the repository contract.

## HipTrip preflight snapshot

The authoritative product providers resolve from `compass-full`, with Obsidian reporting.
Read-only live roadmap inspection on 2026-09-05 confirmed these existing NOW items:

| Item | ID | Readiness gap |
|---|---|---|
| Uploads and Google Docs During Trip Generation | 889aa06f-dc5d-4230-9a9c-a0a3454edcbb | Opportunity is Conversion; no linked solution |
| Mobile UX Improvements | b69d5902-1058-4ed7-8b81-8dc8d9581471 | No linked opportunity or solution |
| Curated Content & AIO SEO Strategy | 8b5a231c-6acd-4129-8043-933fd6fffcbd | No linked opportunity or solution |

`now_limit` is 3. All slots are occupied; do not assume these commitments are abandoned.
Destination discovery is LATER with a linked solution. Live opportunity inspection
confirmed the solution is IDEA, its high-risk assumption is UNTESTED, and the concierge
experiment is RUNNING with no conclusion. Its existing plan explicitly conditions build
admission on that experiment's result. The next action is to collect/conclude that test,
owned by the product owner, before preparing build approval; a source audit alone is not
independent customer validation. No candidate has been approved by this migration.

HipTrip's config names `compass-native-review` with empty overrides but its expanded table
still names `compass_tasks` and `compass_solution_plan_status`. The installed profile now
resolves to `compass_decisions`. Migration must reconcile table, connections and schedules
together; retaining mixed versions would leave contradictory authorization instructions.

Live Compass help `/help/17-decision-reviews` confirms that ordinary NOW operations do
not require native policy activation and legacy native NOW reviews are read-only history.
Generic decisions preserve tracking-only behavior. Use the separate playbook standing
policy; do not call dormant native commitment/activation operations.

## Activation checklist

1. Verify the repository evaluator and normal test suite; install the new skill and every
   referring workflow together. Verify installed contents, not just a successful sync report.
2. Reconcile HipTrip routing to `compass_decisions`, updating the resolved table, connection
   descriptions and legacy resolver guard as one migration. Preserve historical decisions.
3. Verify immutable package context, current human revision and author using a real pending
   request. Verify durable execution receipts and one serialized executor. Failures leave
   policy disabled with a concrete blocker.
4. Select one eligible bounded scope; repair only evidenced links, gather missing evidence,
   and include any exact displacement in its build package. Do not fabricate a solution
   link or validation result to make an existing NOW item pass.
5. Record human policy activation, then create and review the new purpose-bound package.
   Approval of this infrastructure plan is not approval of that product scope.
6. Update the resolver gate to include approved packages awaiting admission and unfinished
   execution receipts; retire competing apply paths for that package. Verify configured
   paths are local/readable. Preserve unrelated schedule settings.
7. Observe one approval through admission, implementation, verification and PR. Record
   request/revision/package/Tasks/PR IDs and timing. Only then expand to another project.

## Repository publication

Rick replaced the bridge-only instruction with an isolated-worktree and normal Git/PR
workflow. The canonical changes are on `feat/build-authorization-workflow`; bridge
availability is no longer a publication dependency. Install and verify the published
skills before activating the live executor. Vault copies are optional reference mirrors.

## Verification — repository only

- `npm test`: 84 passing, 0 failures, 0 skipped; includes 49 build-authorization tests.
- `npm run validate`: 4 product profiles / 9 capabilities and 3 workflow profiles / 6
  capabilities validated.
- Relative links in the eight main routing/authorization skills: 18 verified. Four
  pre-existing broken roadmap reference links were replaced with maintained workflows.
- CLI behavior tested for valid stdin and malformed input; evaluator imports and executes
  under Node's native TypeScript support. No standalone TypeScript compiler is installed,
  so static type checking was not performed.
- No live approval-to-PR execution, installed-source update, HipTrip
  policy activation or schedule migration has been completed. The evaluator consumes
  verified normalized snapshots; provider authentication, locking and durable receipt
  persistence are runtime integration responsibilities, not implemented by this function.

## Rollback

Disable the project's build policy and stop its executor from claiming new work. Preserve
all branches, decisions and receipts. Existing human-directed work keeps only its own
authority; do not reinterpret old approvals or undo production changes automatically.
