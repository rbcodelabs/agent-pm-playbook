# Scheduled Product Operating System

> **Status:** Design plus first implementation slice
>
> **Purpose:** Turn the playbook into a closed-loop product workflow that can run
> continuously without either bypassing product judgment or leaving agent sessions
> blocked while they wait for a person to respond.

## Implementation Status — 2026-08-29

Implemented in the playbook repository:

- contract-v2 product/workflow routing shape and independently composable workflow profiles;
- validators for six workflow capabilities and profile overrides;
- `pm-setup` behavior for resolving and auditing both routing layers;
- provider-neutral `human-review-workflow` with durable create, apply, digest, stale-source,
  and idempotency rules;
- Obsidian/Markdown review-request adapter contract and packet template;
- Compass Decisions adapter for tracking-only requests and immutable human responses;
- capacity policy plus separate validation, `NEXT` admission, and `NOW` commitment gates;
- Compass feedback triage narrowed to evidence intake and review routing;
- Compass delivery resolver narrowed to approved `NOW` work;
- deterministic delivery-completion watcher for merged PR, production, smoke, lifecycle,
  receipt, and capacity-change reconciliation;
- automated regression tests and install dry-run coverage.

Still to implement against live systems:

- concrete Geode scheduling, dispatch, and notification adapter calls;
- a running decision-router watcher rather than skill-level procedure alone;
- action-capable adapters for teams that explicitly need transactional continuations;
- prototype generation/publishing adapters;
- analytics adapters and the adoption/outcome watcher;
- remaining scheduled flows in Sections 8 and 11.

## 1. The Target System

The playbook describes a complete learning-and-delivery loop:

```text
Strategy and metrics
  → desired outcome
  → signals
  → opportunities
  → focus decision
  → solution directions
  → assumptions
  → experiments
  → investment decision
  → roadmap commitment
  → design and delivery
  → release and adoption
  → outcome movement
  → new signals and changed beliefs
```

The scheduled system should perform all recurring collection, synthesis, preparation,
maintenance, verification, and safe execution in that loop. It should not convert every
step into an autonomous decision. The agent does the work needed to make a judgment easy;
the human supplies the few judgments that determine product direction or authorize an
irreversible commitment.

The operating pattern is:

```text
Agent observes → Agent prepares → Human decides → Agent resumes → System learns
```

## 2. The Asynchronous Review Rule

An unattended job must never stay alive waiting for feedback.

When a workflow reaches a human gate, it must:

1. Persist everything it has completed to the authoritative provider.
2. Create a durable review request with a stable ID.
3. Put a compact review packet in the configured `review_requests` provider.
   When that provider is `compass_decisions`, use the resolved decision provider for the
   request and immutable response. The result is tracking-only: it does not expand the
   workflow's pre-existing authority or automatically apply any action.
4. Notify the reviewer with a direct link to that packet.
5. For tracking-only providers, record `NO_ACTION`; for action-capable providers, record
   the exact continuation each response authorizes.
6. End the current run successfully with status `AWAITING_DECISION`.

A separate **decision router** detects the completed review through its provider adapter
and validates the exact request and revision. A tracking-only provider records and reports
the outcome but never starts the next workflow step. Only an action-capable adapter
may apply and dispatch a declared continuation under the workflow's existing authority.
The original run is never resumed from memory.

This separation prevents four common failures:

- a scheduled thread consumes time or tokens while waiting;
- the reviewer receives a vague request and has to reconstruct the context;
- the agent loses state between the question and the response;
- a late response applies to product state that has since changed.

## 3. `pm-config.md` as the Routing Spine

The system must not hardcode where reviews, decisions, prototypes, notifications, or
scheduled runs live. `pm-config.md` remains the routing manifest for the whole product
workflow.

The existing **integration routing** resolves authoritative product-state capabilities:
`vision`, `research_capture`, `insights`, `okrs`, `ost`, `experiments`, `roadmap`,
`delivery`, and `reporting_archive`. Those semantics do not change.

Add a separate **workflow routing** section for the services that move work between those
authoritative product objects and the humans or agents operating on them:

| Workflow capability | Owns |
|---|---|
| `automation_runtime` | Schedules, event triggers, gated dispatch, retries, and run state |
| `review_requests` | Pending review packets and reviewer-facing interaction state |
| `decision_records` | Immutable decisions, reviewer identity, rationale, and source version |
| `notifications` | Direct requests, reminders, escalations, and decision digests |
| `prototype_artifacts` | Versioned storyboards, wireframes, interactive previews, and spikes |
| `product_analytics` | Metric definitions, exposure data, adoption, and outcome measurements |

These are separated from the nine product capabilities because a team's product stack and
workflow stack vary independently. Compass may own the OST while Obsidian presents review
requests, Geode runs schedules, Slack sends notifications, a repo hosts prototypes, and a
warehouse supplies metrics. Another team may do all of those things inside one platform.

### Profiles and overrides

Use two independently named profiles:

- `integration_profile` selects defaults for the nine authoritative product capabilities.
- `workflow_profile` selects defaults for workflow execution and human interaction.

Both support per-capability overrides. This avoids a combinatorial profile such as
`compass-obsidian-geode-slack-vercel` for every possible tool mixture.

Contract-v2 `pm-config.md` shape:

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
    root: Products/Compass/Review Inbox
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

Connections store stable IDs, paths, and secret-manager references—never credentials.
Resolved providers should be expanded into an auditable table, just like the current
product capability table.

`portfolio_policy` configures decision constraints, not product state. A missing limit or
capacity signal is not permission to grow a horizon: the steward may recommend validation,
but it must not promote work to `NEXT` or `NOW` until the configured admission evidence is
available.

### Resolution rules

Before a flow reads, writes, schedules, notifies, or publishes, it must:

1. Read `pm-config.md`.
2. Resolve its required product capabilities through `integration_profile` plus
   `provider_overrides`.
3. Resolve its required workflow capabilities through `workflow_profile` plus
   `workflow_overrides`.
4. Load the corresponding provider adapters.
5. Verify each state-owning capability resolves to exactly one provider.
6. Fail visibly if a required provider is unavailable; never silently create Markdown or
   switch notification channels unless the configured fallback explicitly permits it.

The `notifications` capability may declare ordered delivery channels because channels do
not own product state. `review_requests`, `decision_records`, and `prototype_artifacts`
each resolve to one canonical provider. Any secondary representation is labeled `inbox`,
`export`, `cache`, or `snapshot`.

Each skill or scheduled flow declares its dependencies so preflight is mechanical rather
than inferred from prompt wording:

```yaml
requires:
  product_capabilities: [ost, experiments]
  workflow_capabilities: [review_requests, decision_records, notifications]
optional:
  workflow_capabilities: [prototype_artifacts, product_analytics]
```

An optional capability may reduce fidelity—for example, falling back from a clickable
prototype to an inline storyboard—but it may not change the underlying methodology or
write product state somewhere else. A required capability that cannot resolve blocks only
that flow and produces a visible configuration error.

### Provider adapter contracts

Domain flows own methodology; adapters own persistence and tool mechanics. A flow asks for
capabilities, not brands.

| Adapter | Minimum operations |
|---|---|
| Review requests | All adapters: `create`, `get`, `list_pending`, `deep_link`; action-capable adapters may add `update_response`, `mark_applied` |
| Decision records | Tracking-only: `get_by_review`; action-capable adapters may add `record`, `verify_not_applied` |
| Notifications | `send_request`, `send_reminder`, `send_digest`, `send_escalation` |
| Prototype artifacts | `publish`, `version`, `deep_link`, `archive` |
| Automation runtime | `schedule`, `dispatch`, `gate`, `retry`, `get_run_status` |
| Product analytics | `resolve_metric`, `read_baseline`, `read_current`, `read_exposure` |

Examples of valid review-request adapters include Obsidian notes, Compass-native review
objects, Jira/JPD approval issues, Linear issues, or another configured task system. Every
adapter preserves stable identity and immutable human response history. Tracking-only
adapters use `NO_ACTION`; continuation semantics apply only to action-capable adapters.

### Obsidian adapter example

When `review_requests` resolves to Obsidian, it is a labeled human-facing inbox—not a
second source of product truth. Each note contains stable links or IDs back to the
authoritative product objects.

```text
<configured review root>/
  Pending/
  Decided/
  Expired/
```

After a response is applied, the authoritative product state and configured immutable
decision record hold the result; the Obsidian note becomes a readable receipt.

## 4. Review Request Contract

Every human gate produces a structured review request.

```yaml
review_id: REV-YYYYMMDD-NNN
artifact_type: concept-directions
product: Example Product
status: pending # pending | decided | superseded | expired
created_at: 2026-08-29T09:00:00-04:00
requested_by: solution-studio
reviewer: product-owner
source_provider: compass
source_ids:
  opportunity_id: "..."
  solution_ids: ["...", "...", "..."]
source_version: "updatedAt value or content hash"
decision_due: 2026-09-02
risk: medium
recommended_option: B
decision: "" # approve-A | approve-B | approve-C | revise | defer | reject
decision_note: ""
decided_at: ""
continuation:
  approve-A: design-experiment-for-solution-A
  approve-B: design-experiment-for-solution-B
  approve-C: design-experiment-for-solution-C
  revise: regenerate-concepts-with-feedback
  defer: close-with-no-state-change
  reject: archive-proposed-solutions
```

For action-capable adapters, the decision router must reject or reissue a decision when
`source_version` no longer matches and applying the same review twice must produce no
duplicate objects or transitions. A tracking-only router reads the exact current revision,
reports the outcome, and stops without applying anything.

## 5. Review Packet Design

The reviewer should be able to make the ordinary decision in under five minutes. A
review request is not a status report and should not be a wall of generated prose.

Every packet begins with:

1. **Decision needed:** one sentence phrased as a choice.
2. **Why now:** what triggered the request and what stalls without it.
3. **Recommendation:** the agent's recommendation and its strongest reason.
4. **Options:** two or three genuinely different choices shown side by side.
5. **Evidence:** the smallest set of quotes, metrics, and links needed to inspect the
   recommendation.
6. **Consequences:** what the system will do after each choice.
7. **Response controls:** approve an option, request a revision, defer, or reject.

The packet must expose uncertainty rather than hide it. It should say what evidence is
missing, which assumption is most dangerous, and what would change the recommendation.

### Notification behavior

- Use the configured `notifications` adapter; the review flow must not assume Geode,
  Obsidian, email, Slack, or any other delivery channel.
- Send one notification when the request is created, containing the decision, due date,
  recommendation, and a direct link.
- Send one reminder near the due date if it remains pending.
- Roll overdue low- and medium-risk requests into a weekly decision digest rather than
  repeatedly interrupting the reviewer.
- Escalate an overdue high-risk request once through the configured channel.
- Never interpret silence as approval.
- Use a safe default on expiry: leave product state unchanged and mark the request
  `expired` or `deferred`.

## 6. Early-Idea Concept and Prototype Loop

Early ideas should not arrive as bare titles asking, "Should we build this?" Before asking
for direction, the system should turn a promising opportunity into reviewable alternatives.

### Trigger

Run the concept loop when:

- an opportunity meets the evidence bar and becomes `PRIORITIZED`;
- a reviewer explicitly asks for solution exploration; or
- new evidence materially changes an active solution set.

Do not run it for a single weak signal. Weak ideas remain opportunities to validate, not
features to visualize.

### Agent preparation

The **solution studio** produces three concept directions. They must be meaningfully
different, not cosmetic variations of one design:

- **Minimum intervention:** the smallest change that could improve the outcome.
- **Recommended direction:** the best balance of value, evidence, risk, and effort.
- **Assumption challenger:** a direction based on a different belief about the problem.

For each direction, prepare:

| Element | Required content |
|---|---|
| Customer experience | A short before/after scenario or storyboard |
| Prototype | The cheapest artifact that makes the experience inspectable |
| Scope | What is included and explicitly excluded |
| Outcome connection | How this direction could move the active KR |
| Evidence | Signals supporting the direction, with source links |
| Riskiest assumption | The belief most likely to invalidate the direction |
| Cheapest test | How to test that assumption before full build |
| Delivery shape | Rough systems affected and relative effort, not a false estimate |
| Tradeoff | What this direction gains and gives up |

### Prototype fidelity ladder

Use the lowest fidelity that makes the decision real:

1. **Narrative scenario** — for workflow or policy choices.
2. **Storyboard or annotated wireframe** — for interaction and information choices.
3. **Clickable prototype** — when navigation, sequence, or usability is the uncertainty.
4. **Concierge simulation** — when value, trust, or operational behavior is uncertain.
5. **Technical spike** — only when feasibility is the principal risk.

A prototype is a decision aid or experiment artifact, not evidence that the solution has
been validated. Visual polish must never substitute for customer evidence.

### Concept review packet

The concept packet asks:

> Which direction should we test—not build—against this opportunity?

It shows the three directions side by side, embeds or links each prototype, states the
recommended direction, and offers these responses:

- **Choose A/B/C:** authorize experiment design for that direction.
- **Combine:** name the elements to combine; return to the studio for one revised concept.
- **Revise:** give a constraint or concern; regenerate without changing product state.
- **Need evidence:** send the opportunity back to validation with the named evidence gap.
- **Defer:** retain the opportunity and close the current request.
- **Reject all:** archive the proposed solutions with the review rationale; preserve the
  underlying opportunity unless it was also invalidated.

Choosing a direction creates or selects an `IDEA` solution and starts assumption mapping.
It does not validate the solution, add it to `NOW`, or authorize production code.

## 7. Human Gates

Human review is required where the decision changes direction, commits meaningful
resources, or makes a consequential interpretation.

Before opening any gate, run an **execution-collision preflight** across every system
declared in `pm-config.md`: product records, active automation/agent runs, delivery tasks,
branches and pull requests, previews, and recent decisions. A candidate is not undecided
if an agent or team is already implementing a direction, even when Compass still labels
its Opportunity or Solutions as exploratory. In that case, reconcile and link the active
work instead of manufacturing a duplicate decision request. Record the checked sources
and timestamp so scheduled runs can distinguish a real decision from stale product state.

The final column below is a proposed continuation, not an effect of every decision. A
tracking-only provider records `NO_ACTION` and stops; only an action-capable adapter may
perform the listed continuation under independently established authority.

| Gate | Agent prepares | Human decides | Continuation |
|---|---|---|---|
| Outcome selection | 3–5 outcome candidates, metric quality check, prior-cycle evidence | Which outcome to pursue or reconfirm | Create/update desired outcome and KR links |
| New opportunity admission | Evidence packet, customer-voice framing, dedup analysis | Admit, merge, keep validating, or reject | Update OST |
| Focus opportunity | Comparative scorecard and strongest counterargument | Which opportunity receives solution work | Start solution studio |
| Concept direction | Three prototypes/plans and tradeoffs | Which direction to test | Map assumptions |
| Portfolio admission | Several non-exclusive ideas with evidence and tradeoffs | Which ideas deserve preservation | Add each approved idea to `LATER`; prioritize later |
| Validation authorization | Prototype or experiment plan, riskiest assumption, success and kill thresholds | Whether to spend discovery effort gathering evidence | Dispatch validation while the candidate remains in `LATER` |
| Riskiest assumption | Ranked assumption map | Confirm the assumption whose failure kills the direction | Design cheapest experiment |
| Experiment launch | Method, participants, success/kill/iterate thresholds | Approve the test and thresholds | Move experiment to `RUNNING` |
| Experiment conclusion | Raw data, threshold comparison, interpretation, dissenting explanation | Proceed, kill, or iterate when judgment is material | Update assumption and solution |
| Building investment | Complete gate assessment and delivery outline | Authorize `VALIDATED` and roadmap eligibility | Create roadmap recommendation |
| `NEXT` admission | Validated candidate compared with the complete ordered `NEXT` queue, capacity limit, and explicit displacement when full | Admit at an exact rank, defer, or replace named work | Apply the exact queue change; create no delivery work |
| `NOW` commitment | Capacity, KR coverage, dependencies, design readiness | Commit delivery resources | Add/promote to `NOW` |
| Design direction | 2–3 implementation approaches, ADR/spec, prototype when useful | Approve technical/product approach | Start implementation |
| Release | Verification evidence, rollout and rollback plan | Merge/release for material-risk work | Deploy or stage rollout |
| Scale/stop | Adoption, reliability, and outcome movement | Expand, iterate, rollback, or stop | Update roadmap and learning record |

Low-risk, reversible maintenance can be pre-authorized by policy. The policy must name the
allowed action, scope, risk ceiling, and rollback path; the agent may not infer standing
approval merely because similar work was previously approved.

Every review declares `selection_mode: single | multiple`. Single-select gates choose one
mutually exclusive continuation. Multi-select gates accept any subset and apply each
approved continuation idempotently. Approval to preserve an idea creates or reuses a
`LATER` roadmap candidate; it never silently means `NEXT`, `NOW`, or permission to build.
Approval to validate likewise leaves the candidate in `LATER`. `NEXT` means validated and
capacity-ranked, not merely interesting or inexpensive to test.

Reviews also separate **responding** from **finalizing**. While a review is open, the review
steward re-reads the complete parent object and all child options, discussions, and Plans;
it incorporates comments, links newly added options, revises packets, and preserves
approvals without applying them. A parent `updatedAt` is not a sufficient version check
because child creation may not update it. Downstream mutation begins only after an explicit
finalization event.

For the legacy no-schema Compass pilot, no new control is required: `IN_REVIEW` means the reviewer
is still editing, and the human transition to `DONE` is the explicit finalization event.
The resolver applies a `DONE` Product Review Task only when it has no application receipt;
successful retries are no-ops, and failures move the Task to `BLOCKED`.

## 8. Scheduled and Event-Driven Flows

All flows below first resolve their required product and workflow capabilities from
`pm-config.md`. The table names responsibilities, not storage products.

### Event-driven flows

| Flow | Trigger | Output or action |
|---|---|---|
| Signal capture | New transcript, feedback item, support export, review, or sales note | Attributed raw signal in the resolved provider |
| Interview synthesis | Transcript arrival | Needs, quotes, intensity, contradictions, OST mappings |
| Decision router | Review request changes to `decided` | Tracking-only: validated outcome report and stop; action-capable: validated transition and dispatch under existing authority |
| Experiment result collector | Result source updates or experiment end date arrives | Raw results and threshold comparison |
| Delivery completion watcher | PR, CI, preview, production deployment, or merge changes state | Reconcile linked Tasks, launch/shipped state, Solution state, receipts, smoke findings, and capacity event |
| Adoption watcher | Feature exposure or metric event becomes available | Early adoption and safety assessment |

### Daily flows

| Flow | Purpose |
|---|---|
| Feedback triage | Empty the open-feedback queue through linking, candidate creation, or closure |
| Experiment watchdog | Flag missing kill conditions, overdue results, and stalled experiments |
| Delivery orchestrator | Work only on human-approved or policy-authorized `NOW` items |
| Delivery completion catch-up | Reconcile stale linked Tasks left `IN_REVIEW` when a webhook or prior run was missed |
| Review notifier | Deliver new requests and the single due-date reminder |
| Automation health | Detect failed sources, credentials, stale locks, duplicate claims, and partial writes |

### Delivery completion watcher

This flow is implemented by `skills/delivery-completion-watcher`. It is triggered by
delivery-provider events and backed by a daily stale-`IN_REVIEW` scan.

1. The delivery resolver writes reciprocal linkage when it opens a PR: PR URL, repository,
   branch, commit, Roadmap Item ID, Solution ID, and Task IDs in both Compass and the PR.
2. The watcher observes the human merge; it never merges. Required checks, production
   deployment, and a feature-specific production smoke test must all pass before completion.
3. When launch work remains, the item enters `LAUNCHING`; otherwise verified work becomes
   `SHIPPED`, linked Tasks become `DONE`, and the Solution becomes `SHIPPED` when supported.
4. Unsupported provider mutations are explicit warnings in the receipt, not fabricated
   success. Blocking smoke failures move the Task to `BLOCKED`; non-blocking findings create
   one deduplicated linked Feedback item while allowing the verified release to complete.
5. A capacity-releasing transition dispatches the before/after counts to the roadmap
   steward. It never promotes a replacement item.
6. The idempotent completion receipt makes retries no-ops or resumptions of missing actions,
   never duplicate comments, feedback, or state transitions.

### Weekly flows

| Flow | Purpose |
|---|---|
| Signal synthesis | Cluster passive feedback and update the signal ledger and evidence counts |
| OST caretaker | Find weak, duplicate, stale, contradictory, and unmapped branches |
| Opportunity recommender | Prepare comparative focus decisions when evidence changed materially |
| Roadmap steward | Check `NOW/NEXT/LATER`, validation gates, capacity, and KR coverage |
| Outcome learner | Connect releases to adoption and outcome movement |
| Decision digest | Present all pending decisions in priority order with direct links |
| Stakeholder update | Draft the evidence-linked weekly narrative for review |

### Biweekly, monthly, and quarterly flows

| Cadence | Flows |
|---|---|
| Biweekly | OST pruning recommendations, opportunity reranking, solution/assumption audit |
| Monthly | Outcome and OKR health, discovery-health metrics, roadmap alignment, calibration review |
| Quarterly | Outcome reset/reconfirmation, full OST retrospective, capacity-aware roadmap review, automation-policy audit |

### Roadmap steward admission algorithm

The roadmap steward makes two separate recommendations and never collapses them:

1. **Validation recommendation.** For an interesting but unvalidated candidate, keep or
   create the deduplicated `LATER` item and propose the cheapest evidence-gathering work.
   With a tracking-only provider, approval is reported and never dispatches a prototype or
   experiment. Only an action-capable adapter may dispatch validation under existing authority,
   and it does not change the horizon.
2. **Delivery-queue admission.** Consider a candidate for `NEXT` only after the linked
   Solution is `VALIDATED` and the evidence, active-KR connection, dependencies, and owner
   are current. Compare it with every existing `NEXT` item, not with an abstract quality
   threshold.
3. **Capacity enforcement.** Read `portfolio_policy` from `pm-config.md`. If `NEXT` is at
   its limit, the review must name the item or items displaced to `LATER` and the proposed
   rank of the candidate. Missing capacity or ordering data means keep `LATER`.
4. **Commitment enforcement.** A `NEXT → NOW` recommendation requires a configured slot,
   delivery owner, dependencies, current collision preflight, and the separate `NOW`
   commitment gate. It may never be an automatic consequence of validation.

The allowed roadmap-steward outcomes are therefore `VALIDATE_IN_LATER`, `KEEP_LATER`,
`ADMIT_TO_NEXT_AT_RANK`, `REPLACE_NEXT_ITEM`, `COMMIT_TO_NOW`, `DEFER`, and `ARCHIVE`.
Every applied queue change records the before/after counts, rank, displaced IDs, decision
ID, and an idempotent receipt.

## 9. Workflow State Machine

The coordinator should move durable work through explicit states:

```text
READY
  → RUNNING
  → AWAITING_DECISION
  → DECIDED
  → READY_FOR_CONTINUATION
  → RUNNING
  → COMPLETE

Any state may also move to:
  BLOCKED_DATA | SUPERSEDED | EXPIRED | FAILED_RETRYABLE | FAILED_FINAL
```

Each transition records:

- trigger and run ID;
- source object IDs and versions;
- artifacts read and created;
- changes made;
- recommendation and confidence;
- decision and reviewer, when applicable;
- next eligible transition;
- missing data, errors, and retry count.

Jobs use idempotency keys based on product, workflow, source object, source version, and
transition. A retry must continue or safely repeat the same transition, never manufacture
a second opportunity, experiment, roadmap item, or review request.

## 10. Changes Required to the Existing Compass Jobs

### Compass Feedback Triage

Keep autonomous capture, classification, deduplication, evidence linking, and obvious-noise
closure. Change the roadmap behavior:

- new actionable feedback may create an `EXPLORING` opportunity;
- do not create solution plans for an opportunity that has not met the opportunity evidence
  bar;
- do not promote a solution to `NEXT` from intake alone;
- when evidence becomes sufficient, create an opportunity-admission or focus review request;
- bugs may follow a separate severity policy, but feature ideas follow the discovery gates.

### Compass Auto-Resolver

Rename or narrow it to **Compass Delivery Resolver**. It may select only:

- a `NOW` item with recorded human approval; or
- a low-risk maintenance item covered by an explicit standing policy.

Remove these autonomous fallbacks:

- promoting a clear-looking `NEXT` item to `NOW`;
- turning raw or planned feedback directly into `NOW` work;
- treating implementation clarity as evidence of product validation.

When `NOW` is empty, the resolver should end cleanly. The roadmap steward—not the delivery
resolver—should prepare the next investment or commitment decision.

## 11. Minimum Viable Implementation

Build the system in this order:

### Phase 1 — Stop waiting

1. Define the review-request schema plus the first configured `review_requests` and
   `decision_records` adapters.
2. Add `AWAITING_DECISION` as a normal terminal result for scheduled runs.
3. Add the decision router with version checking and idempotency.
4. Add direct-link notifications and a weekly decision digest.

### Phase 2 — Make early ideas reviewable

1. Add the solution-studio workflow.
2. Generate three-direction concept packets.
3. Support narrative, wireframe, clickable, concierge, and spike artifacts.
4. Route the selected direction to assumption mapping and experiment design—not delivery.

### Phase 3 — Protect investment gates

1. Separate roadmap stewardship from delivery resolution.
2. Separate validation authorization in `LATER` from capacity-ranked `NEXT` admission.
3. Require a `VALIDATED` Solution, exact rank, and named displacement when `NEXT` is full.
4. Require evidence of Building-gate approval and an available configured slot before `NOW`.
5. Remove raw-feedback and `NEXT` auto-promotion from the delivery resolver.
6. Add experiment and outcome monitoring.

### Phase 4 — Close the learning loop

1. Connect release exposure and product metrics to shipped solutions and KRs.
2. Produce scale/iterate/stop review packets.
3. Add monthly calibration and quarterly outcome-reset flows.
4. Audit whether agent recommendations and human decisions produced the expected outcomes.

## 12. Success Measures

The system is working when:

- no unattended run remains open waiting for a reply;
- every pending decision is visible through the configured review provider;
- a reviewer can understand and answer a normal request in under five minutes;
- every decision shows exactly what will happen next;
- early ideas arrive with inspectable alternatives, not just feature titles;
- no production build begins without the required evidence and approval trail;
- expired or ignored requests leave product state safe and unchanged;
- every shipped solution traces backward to an experiment, assumption, opportunity, and
  desired outcome;
- every shipped solution is later assessed for adoption and outcome movement;
- the system gets quieter when there is no work instead of generating empty status turns.

## 13. Open Design Questions

1. Which workflow profiles and provider adapters should ship in the first supported set?
2. Should reviewer routing be a property of `review_requests`, a separate workflow
   capability, or a decision-type policy within `pm-config.md`?
3. Which exact actions qualify for standing approval, and what risk ceiling applies?
4. Which prototype generators and hosting surfaces should each initial adapter support?
5. Should one person own every product gate, or should review routing vary by decision type?
6. What is the maximum number of options and pending requests the weekly digest may show
   before the system must consolidate them?
7. Which workflow routing fields belong in contract version 2 versus product-local adapter
   configuration?
