# Scheduled Product Operating System

> **Status:** Design plus first implementation slice
>
> **Purpose:** Turn the playbook into a closed-loop product workflow that runs
> continuously, does the reversible product work itself, and asks a human only for
> irreversible actions, without ever blocking while it waits for a reply.
>
> **Governing rule:** [Autonomy Policy](Autonomy%20Policy.md): act, then report. A human
> is needed first only to destroy something, reach outside the team, ship to production,
> or spend money or someone's time.

## Implementation Status — 2026-08-29

### Unified operations run

[Scheduled Product Operations](skills/scheduled-product-operations/SKILL.md) is the
installation and run procedure for recurring playbook automation. Install one job per
configured product. Every run inspects all operating areas, builds one checklist, and does
the reversible work it finds through existing skills. Source changes, unresolved work, and
deadlines determine actions; unchanged artifacts are reused.

This is an agent instruction workflow using the adopting runtime's tools, not a bundled
scheduler. Installing the skill does not install a live job. Missing runtime or domain
adapters are visible blockers on the affected operations only.

### Approved Builds

The opt-in [Approved Build workflow](skills/build-authorization/SKILL.md) uses one exact
human approval, one linked Task and one worker through a tested PR. Direct instructions
and scheduled discovery share the same worker path. Product Operations dispatches at most
one dedicated delivery worker early, then continues every checklist row.

The Decision and immutable plan hold authorization and scope; the Task records execution
and recovery. Collision checks are best-effort, not atomic, and cannot guarantee exactly
once. Ambiguous ownership blocks only that item. Roadmap capacity governs admission, not
permission to create a tested PR; unreadable limits leave the horizon unchanged. Merge and
production remain separate. Legacy policy projects keep their pinned skill revision until
an authorized migration.

Implemented in the playbook repository:

- contract-v2 product/workflow routing and composable workflow profiles, with validators;
- `pm-setup` behavior for resolving and auditing both routing layers;
- provider-neutral `human-review-workflow` for irreversible actions, with durable create,
  apply, digest, stale-source, and idempotency rules;
- Obsidian/Markdown and Compass Decisions review adapters;
- capacity policy with separate validation and `NEXT` admission rules;
- Compass feedback triage that acts fully on intake and reports what changed;
- Compass delivery resolver using exact approvals, with a separate legacy NOW path;
- delivery-completion watcher for merged PR, production, smoke, lifecycle, receipt, and
  capacity-change reconciliation;
- automated regression tests and install dry-run coverage.

Still to implement against live systems: verified runtime installation, dispatch, and
notification integrations; a running decision-router watcher; action-capable adapters;
prototype publishing and analytics adapters; the adoption/outcome watcher; remaining flows
in Sections 8 and 11.

## 1. The Target System

```text
Strategy and metrics → desired outcome → signals → opportunities → focus
  → solution directions → assumptions → experiments → investment decision
  → roadmap placement → design and delivery → release and adoption
  → outcome movement → new signals and changed beliefs
```

The scheduled system performs the collection, synthesis, preparation, maintenance,
prioritization, and verification in that loop, and makes the reversible calls itself:
focus, direction, horizon placement, statuses, scores. The human reads the trail and
corrects it, and supplies approval only where an action cannot be undone.

```text
Agent observes → Agent acts → Agent reports → Human corrects → System learns
```

## 2. The Asynchronous Review Rule

An unattended job never stays alive waiting for feedback, and one pending decision never
blocks unrelated work.

When a workflow reaches an irreversible step (or a decision the human explicitly asked to
own), it:

1. Persists everything it has completed to the authoritative provider.
2. Creates or reuses a durable review request with a stable ID and a recommended default.
   When `review_requests` is `compass_decisions`, the resolved decision provider holds the
   request and immutable response. The result is tracking-only: it does not expand the
   workflow's pre-existing authority or automatically apply any action.
3. Notifies the reviewer with a direct link.
4. Records `NO_ACTION` (tracking-only) or the exact continuation per response
   (action-capable).
5. Marks that item `AWAITING_DECISION` and continues the rest of the run.

A separate **decision router** detects the completed review and validates the exact
request and revision. A tracking-only provider records and reports
the outcome but never starts the next workflow step. Only an action-capable adapter may
apply and dispatch a declared continuation under the workflow's existing authority. The
original run is never resumed from memory.

## 3. `pm-config.md` as the Routing Spine

The system never hardcodes where reviews, decisions, prototypes, notifications, or runs
live. `pm-config.md` is the routing manifest.

**Integration routing** resolves authoritative product capabilities: `vision`,
`research_capture`, `insights`, `okrs`, `ost`, `experiments`, `roadmap`, `delivery`, and
`reporting_archive`. **Workflow routing** resolves the services that move work between
those objects and the people or agents operating on them:

| Workflow capability | Owns |
|---|---|
| `automation_runtime` | Schedules, event triggers, gated dispatch, retries, and run state |
| `review_requests` | Pending review packets and reviewer-facing interaction state |
| `decision_records` | Immutable decisions, reviewer identity, rationale, and source version |
| `notifications` | Direct requests, reminders, escalations, and decision digests |
| `prototype_artifacts` | Versioned storyboards, wireframes, interactive previews, and spikes |
| `product_analytics` | Metric definitions, exposure data, adoption, and outcome measurements |

Product and workflow stacks vary independently: Compass may own the OST while Obsidian
presents review requests, a runtime schedules jobs, a chat tool notifies, a repository
hosts prototypes, and a warehouse supplies metrics.

### Profiles and overrides

`integration_profile` selects product-capability defaults; `workflow_profile` selects
workflow defaults. Both support per-capability overrides, avoiding one profile per tool
combination. Contract-v2 shape:

```yaml
contract_version: 2
integration_profile: compass-full
provider_overrides: {}

workflow_profile: geode-obsidian-review
workflow_overrides:
  prototype_artifacts: repo_preview
  product_analytics: posthog

workflow_connections:
  automation_runtime:
    provider: geode
    workspace: personal
  review_requests:
    provider: obsidian
    root: Products/Example/Review Inbox
    role: inbox
  decision_records:
    provider: compass_docs
    workspace_id: "<stable provider ID>"
  notifications:
    provider: geode
    target: product-review
    fallback: obsidian_daily_note
  prototype_artifacts:
    provider: repo_preview
    repo: /path/from-project-config
    publish_target: preview
  product_analytics:
    provider: posthog
    project_id: "<stable provider ID>"

portfolio_policy:
  now_limit: 3
  next_limit: 10
  concurrent_validation_limit: 3
  require_validated_solution_for_next: true
  require_displacement_when_full: true
  require_owner_for_now: true
  require_capacity_data_for_now: true

delivery_completion_policy:
  production_verification: required
  stale_in_review_after_hours: 24
  launch_required_for: [major, minor]
  silent_release_can_ship_directly: true
  unsupported_solution_status: warn_and_receipt
  smoke_followup_provider: compass_feedback
  capacity_change_dispatch: roadmap_steward
```

Connections store stable IDs, paths, and secret-manager references, never credentials.
`portfolio_policy` holds checks the steward applies when it moves items, not approval
gates. When capacity or ordering data is missing, the item stays where it is and the steward
creates a task to get the data. It never waits on a human for a horizon move.

### Resolution rules

Before a flow reads, writes, schedules, notifies, or publishes, it reads `pm-config.md`,
resolves product and workflow capabilities through profiles plus overrides, loads the
adapters, and verifies each state-owning capability resolves to exactly one provider. A
required provider that is unavailable fails visibly for that flow only; never silently
create Markdown or switch notification channels unless a configured fallback permits it.
`notifications` may declare ordered channels because channels own no product state; any
secondary representation of other capabilities is labeled `inbox`, `export`, `cache`, or
`snapshot`.

Each flow declares its dependencies so preflight is mechanical:

```yaml
requires:
  product_capabilities: [ost, experiments]
  workflow_capabilities: [review_requests, decision_records, notifications]
optional:
  workflow_capabilities: [prototype_artifacts, product_analytics]
```

An optional capability may reduce fidelity (an inline storyboard instead of a clickable
prototype) but may not change methodology or write product state elsewhere.

### Provider adapter contracts

Domain flows own methodology; adapters own persistence and tool mechanics.

| Adapter | Minimum operations |
|---|---|
| Review requests | All adapters: `create`, `get`, `list_pending`, `deep_link`; action-capable adapters may add `update_response`, `mark_applied` |
| Decision records | Tracking-only: `get_by_review`; action-capable adapters may add `record`, `verify_not_applied` |
| Notifications | `send_request`, `send_reminder`, `send_digest`, `send_escalation` |
| Prototype artifacts | `publish`, `version`, `deep_link`, `archive` |
| Automation runtime | `schedule`, `dispatch`, `gate`, `retry`, `get_run_status` |
| Product analytics | `resolve_metric`, `read_baseline`, `read_current`, `read_exposure` |

Valid review-request adapters include Obsidian notes, Compass-native objects, tracker
approval issues, or another configured task system. Every adapter preserves stable identity
and immutable response history. Tracking-only adapters use `NO_ACTION`; continuation
semantics apply only to action-capable adapters.

When `review_requests` resolves to Obsidian, it is a labeled inbox (`Pending/`,
`Decided/`, `Expired/` under the configured root), not a second source of truth; the
authoritative state and decision record hold the result.

## 4. Review Request Contract

Every irreversible step produces a structured request:

```yaml
review_id: REV-YYYYMMDD-NNN
artifact_type: branch-cleanup
product: Example Product
status: pending # pending | decided | superseded | expired
created_at: 2026-08-29T09:00:00-04:00
requested_by: roadmap-steward
reviewer: product-owner
source_provider: compass
source_ids:
  solution_ids: ["...", "..."]
source_version: "updatedAt value or content hash"
decision_due: 2026-09-02
risk: medium
recommended_option: archive
decision: "" # archive | keep | defer
decision_note: ""
decided_at: ""
continuation:
  archive: archive-listed-solutions
  keep: close-with-no-state-change
  defer: close-with-no-state-change
```

For action-capable adapters the router rejects or reissues a decision whose
`source_version` no longer matches, and applying a review twice produces no duplicate
objects or transitions. A tracking-only router reads the current revision, reports the
outcome, and stops.

## 5. Review Packet Design

A reviewer should decide in under a minute or two. Every packet begins with the decision
as one sentence, why now, the recommended default and its strongest reason, the options
(only when there is a real comparison), the minimum evidence, and what happens after each
response. Expose uncertainty: what is missing and what would change the recommendation.

Notifications go through the configured adapter: one on creation, one reminder near the
due date, a digest for overdue low- and medium-risk requests, and one escalation for an
overdue high-risk request. Silence never approves the irreversible step; on expiry, leave
state unchanged and mark the request `expired` or `deferred`. Reversible work around it
continues regardless.

## 6. Early-Idea Concept and Prototype Loop

Early ideas should not stall as bare titles. When an opportunity becomes `PRIORITIZED`,
new evidence materially changes an active solution set, or a health check finds an
opportunity or KR with **zero** solutions, the **solution studio** produces three
meaningfully different directions:

- **Minimum intervention:** the smallest change that could improve the outcome.
- **Recommended direction:** the best balance of value, evidence, risk, and effort.
- **Assumption challenger:** a direction based on a different belief about the problem.

For each: customer before/after, the cheapest prototype that makes it inspectable, scope,
outcome connection, evidence, riskiest assumption, cheapest test, delivery shape, and
tradeoff. A weak single signal gets a tagged-weak opportunity and cheap validation, not a
full concept set.

Prototype fidelity, lowest that makes the choice real: narrative scenario → storyboard or
wireframe → clickable prototype → concierge simulation → technical spike (only when
feasibility is the main risk). A prototype is a decision aid, never evidence of validation.

The agent then **picks the direction to test**, creates or selects the `IDEA` solution,
starts assumption mapping, and reports the choice with its reasoning. The human can
redirect with an edit. A direction choice becomes a review only when the human has asked to
own it or the test itself is irreversible (it contacts customers, recruits participants, or
spends money). Choosing a direction does not validate the solution or authorize production
code.

## 7. Where a Human Is Needed

Everything in the loop is reversible except the categories below. Before any of them, run
an **execution-collision preflight** across systems declared in `pm-config.md` (product
records, active runs, tasks, branches, PRs, previews, recent decisions) so the request is
real rather than a duplicate of work already under way.

| Irreversible category | Typical PM step | Agent does first | Human decides |
|---|---|---|---|
| Destroying something | Archive/delete opportunities, solutions, feedback, or roadmap items; kill a branch with work; overwrite data | Evidence and a list of exactly what goes | Archive/delete, keep, or defer |
| Reaching outside the team | Customer replies, surveys, announcements, published release notes, stakeholder updates, experiments that users see | Complete draft and audience | Send, revise, or hold |
| Shipping to production | Merge and release | Verification evidence, rollout and rollback plan | Merge/release under its own authority |
| Spending money or human time | Paid tools, research participants, assigning delivery work to people | Cost, timebox, and expected learning | Approve, trim, or decline |

The agent decides and reports everything else, including outcome candidates, opportunity
admission and focus, concept direction, riskiest assumption, experiment design and
interpretation, investment-stage changes, `LATER`/`NEXT`/`NOW` placement, design approach,
and scale/iterate/stop recommendations. The human corrects by editing.

Tracking-only reviews record and report `NO_ACTION`, then stop. They carry no application
fields. Only action-capable reviews declare
`selection_mode: single | multiple`: single-select chooses one exclusive continuation;
multi-select accepts a subset and applies each approved continuation idempotently under
existing authority. For owner-requested roadmap reviews, a `LATER` candidate never silently
means `NEXT`, `NOW`, or permission to build. Approval to validate likewise leaves the candidate in `LATER`.
`NEXT` means validated and capacity-ranked, not merely interesting.

Action-capable reviews separate **responding** from **finalizing**: while open, the steward
re-reads the full parent and child objects (a parent `updatedAt` misses child changes) and
revises the packet; mutation begins only after an explicit finalization event and a
current authority check. In the legacy no-schema Compass pilot, the human move to `DONE`
is that event; applied Tasks carry a receipt, retries are no-ops, and failures go
`BLOCKED`.

## 8. Scheduled and Event-Driven Flows

All flows resolve capabilities from `pm-config.md` and share one
[product-operations checklist](skills/scheduled-product-operations/SKILL.md); every area is
checked every run. Event subscriptions can react faster; reconcile their receipts first.

### Event-driven flows

| Flow | Trigger | Output or action |
|---|---|---|
| Signal capture | New transcript, feedback, support export, review, or sales note | Attributed raw signal in the resolved provider |
| Interview synthesis | Transcript arrival | Needs, quotes, intensity, contradictions, OST mappings |
| Decision router | Review request changes to `decided` | Tracking-only: validated outcome report and stop; action-capable: validated transition and dispatch under existing authority |
| Experiment result collector | Result source updates or end date arrives | Raw results, threshold comparison, recorded interpretation |
| Delivery completion watcher | PR, CI, preview, deployment, or merge changes state | Reconcile Tasks, launch/shipped state, Solution state, receipts, smoke findings, capacity event |
| Adoption watcher | Exposure or metric event available | Early adoption and safety assessment |

### Checks on every run

| Flow | Purpose |
|---|---|
| Feedback triage | Empty the open-feedback queue: link, create and score opportunities, adjust priority, close noise |
| Signal synthesis | Cluster passive feedback; update the signal ledger and evidence counts |
| OST caretaker | Fix weak, duplicate, stale, contradictory, and unmapped branches; **generate candidates immediately for any opportunity or cohort item with zero solutions** |
| Experiment watchdog | Add missing kill conditions, chase overdue results, close stalled experiments |
| Roadmap steward | Rebalance `NOW/NEXT/LATER` against validation, capacity, and KR coverage, **including stale or wrong-objective KR links and solutions that shipped without a status update** |
| Delivery orchestrator | Work only on approved or policy-authorized items under the delivery workflow's rules |
| Delivery completion catch-up | Reconcile Tasks left `IN_REVIEW` after a missed webhook |
| Outcome learner | Connect releases to adoption and outcome movement |
| Stakeholder update | Keep the evidence-linked draft current; sending it is a review request |
| Review notifier and digest | Deliver new requests, the single reminder, and the digest |
| Automation health | Detect failed sources, credentials, stale locks, duplicate claims, partial writes |

Strategic health (pruning and reranking, outcomes and OKRs, discovery-health metrics,
calibration, retrospectives) is also inspected every run; cycle boundaries and reporting
deadlines shape the action, never the inspection. Human rituals may keep their cadence.

### Delivery completion watcher

Implemented by `skills/delivery-completion-watcher`. The resolver writes reciprocal
PR/Roadmap/Solution/Task linkage. The watcher observes the human merge (it never merges);
required checks, production deployment, and a feature smoke test must pass before
completion. Remaining launch work means `LAUNCHING`; otherwise verified work becomes
`SHIPPED` with Tasks `DONE`. Unsupported mutations are warnings in the receipt. Blocking
smoke failures move the Task to `BLOCKED`; non-blocking findings create one deduplicated
Feedback item. A capacity-releasing transition dispatches before/after counts to the
roadmap steward. The idempotent receipt makes retries no-ops.

### Roadmap steward admission algorithm

The steward applies these outcomes itself and reports each with before/after counts:

1. **Validation.** For an interesting but unvalidated candidate, keep or create the
   deduplicated `LATER` item and start the cheapest evidence-gathering work. Validation
   does not change the horizon.
2. **`NEXT` admission.** Admit only after the linked Solution is `VALIDATED` and evidence,
   KR connection, dependencies, and owner are current. Rank it against every existing
   `NEXT` item, not an abstract threshold.
3. **Capacity.** Read `portfolio_policy`. If `NEXT` is at `next_limit`, displace the
   lowest-ranked items to `LATER` and name them in the report. Missing capacity or ordering data means keep `LATER`.
4. **`NOW`.** Move `NEXT → NOW` when a slot, owner, dependencies, and a current collision
   preflight exist. Assigning human delivery capacity is a review request; delivery itself
   starts only under the delivery workflow's own authority.

Outcomes: `VALIDATE_IN_LATER`, `KEEP_LATER`, `ADMIT_TO_NEXT_AT_RANK`, `REPLACE_NEXT_ITEM`,
`COMMIT_TO_NOW`, `DEFER`, and `ARCHIVE` (archive is destructive, so it becomes a review
request). Every queue change records counts, rank, displaced IDs, reasoning, and an
idempotent receipt.

## 9. Workflow State Machine

```text
READY → RUNNING → COMPLETE
RUNNING → AWAITING_DECISION → DECIDED → READY_FOR_CONTINUATION → RUNNING   (irreversible steps only)
Any state → BLOCKED_DATA | SUPERSEDED | EXPIRED | FAILED_RETRYABLE | FAILED_FINAL
```

Each transition records trigger and run ID, source IDs and versions, artifacts read and
created, changes made, reasoning and confidence, any decision and reviewer, next
transition, and errors and retry count. Idempotency keys combine product, workflow, source
object, source version, and transition; a retry never manufactures a second opportunity,
experiment, roadmap item, or review request.

## 10. Changes to the Existing Compass Jobs

**Compass Feedback Triage** acts fully: capture, classify, deduplicate, link evidence,
create opportunities (single-source ones tagged weak), score, move opportunity status, and
adjust existing roadmap priority when evidence warrants, then report. Closing noise is a
status change; deletion is a review request. Intake alone does not create solutions,
solution plans, or new roadmap items from a single fresh signal; that belongs to solution
and roadmap work. Bugs follow the configured severity policy.

**Compass Delivery Resolver** (formerly Auto-Resolver) builds only approved or
policy-authorized items under its own rules. It does not turn raw feedback into `NOW` work
or treat implementation clarity as validation. When nothing is authorized it ends cleanly;
the roadmap steward keeps the queue moving.

## 11. Minimum Viable Implementation

1. **Never wait.** Review schema and first adapters for irreversible steps;
   `AWAITING_DECISION` as a per-item result; decision router with version checks and
   idempotency; direct-link notifications and digest.
2. **Make early ideas concrete.** Solution studio, three-direction concepts, the fidelity
   ladder, and agent-selected directions routed to assumption mapping.
3. **Keep the roadmap honest.** Separate stewardship from delivery; validation in `LATER`
   apart from capacity-ranked `NEXT`; `VALIDATED` plus exact rank and named displacement;
   experiment and outcome monitoring.
4. **Close the learning loop.** Connect exposure and metrics to shipped solutions and KRs,
   scale/iterate/stop recommendations, calibration, and an audit of whether agent choices
   and human corrections produced the expected outcomes.

## 12. Success Measures

- No unattended run stays open waiting for a reply, and no reversible work waits on a human.
- Every run reports what changed, why, and what was assumed.
- Every pending request is irreversible, carries a recommendation, and is answerable in a
  minute or two.
- No production build begins without the required evidence and approval trail.
- Every shipped solution traces back to an experiment, assumption, opportunity, and outcome,
  and is later assessed for adoption and outcome movement.
- The system gets quieter when there is no work.
- No opportunity, KR, or cohort item sits at zero solutions for more than a week.
- No roadmap item rolls up to a stale or wrong-objective KR, and no shipped solution still
  occupies `NOW` because its status was never reconciled.

## 13. Open Design Questions

1. Which workflow profiles and adapters ship in the first supported set?
2. Is reviewer routing a property of `review_requests`, a separate capability, or a
   decision-type policy in `pm-config.md`?
3. How should the human flag decisions they want to own, per product or per decision type?
4. Which prototype generators and hosting surfaces should initial adapters support?
5. How many pending requests may the digest show before it must consolidate them?
6. Which workflow routing fields belong in contract v2 versus product-local configuration?
