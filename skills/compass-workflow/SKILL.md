---
name: compass-workflow
description: >-
  Manage Compass during a discovery or PM session. Handles MCP API calls to
  update opportunity/solution/assumption status, log experiment results, promote
  validated work to the roadmap, and keep the OST tree current. Use whenever
  Claude is doing discovery or delivery work against a Compass-backed product --
  update Compass inline as work progresses, never batch at the end.
metadata:
  priority: 5
  docs:
    - https://compass.rbcodelabs.com
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - compass
    - compass workflow
    - update compass
    - log experiment
    - promote to roadmap
    - opportunity status
    - compass discovery
  intents:
    - update compass
    - log an experiment result
    - move opportunity to validating
    - promote this solution to the roadmap
    - what's our OST look like in Compass
    - sync compass with what we built
    - get a product snapshot from compass
    - add an opportunity to compass
    - mark assumption validated
    - create an experiment in compass
  entities:
    - Compass
    - opportunity
    - solution
    - assumption
    - experiment
    - roadmap
    - OKR
    - workspace
chainTo:
  - pattern: "ost|opportunity solution tree|tree health|prioritiz"
    targetSkill: ost-workflow
    message: Switching to OST workflow for tree-level discovery work
  - pattern: "signal|interview|transcript|feedback|synthesis"
    targetSkill: pm-signal-synthesis
    message: Switching to signal synthesis to process research inputs
---

# Compass Workflow

Rules for how Claude manages Compass during a discovery or delivery session.
Compass is a native OST platform: it owns opportunities, solutions, assumptions,
experiments, OKRs, roadmap, feedback, and docs in one tool with an MCP API for
agentic access.

Compass may also own vision, raw research, synthesized insights, and engineering
delivery through Compass Docs, research/feedback records, and Compass Tasks. It owns only the
capabilities resolved to a Compass provider in `pm-config.md`; never assume that
every Compass-connected product uses the full stack.

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Creating and linking
records, adding solutions, logging and concluding experiments, status changes, and
check-ins are reversible: make them inline and report what changed. A human is needed
first only to archive or kill something with work behind it, to publish anything
customers see, or to ship to production. Missing context: infer, state it in one line,
continue.

## Provider Preflight

Read `pm-config.md`, resolve the requested capability using the named profile and
overrides, and verify it resolves to a Compass provider before writing. Exactly
one authoritative provider must own the capability. A secondary Obsidian or
Markdown artifact must be labeled `inbox`, `export`, `cache`, or `snapshot`.
With no config, use the Compass workspace in context, state that assumption, and
offer `pm-setup` at the end.

## Core Rule

**Update Compass inline as work progresses -- never batch at the end of a session.**

Update an opportunity's status as soon as the evidence moves it. Batching produces
stale state and breaks the product snapshot.

---

## MCP API Access

**Endpoint:** `POST https://compass.rbcodelabs.com/api/mcp`
**Auth:** `Authorization: Bearer <MCP_API_KEY>`

The API key is stored in the project's secrets manager. Common locations:

- **Environment variable:** `echo $COMPASS_MCP_API_KEY`
- **1Password:** `op item get "Compass MCP API Key" --fields credential`
- **pm-config.md:** check the `## Compass` section if the user has run pm-setup

Check all three before asking. If none has it, ask once where it is stored.

### First call every session

Always start with workspace discovery:

```bash
# Discover workspaceId
curl -s -X POST "https://compass.rbcodelabs.com/api/mcp" \
  -H "Authorization: Bearer $COMPASS_MCP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"method":"tools/call","params":{"name":"list_workspaces","arguments":{"orgSlug":"<orgSlug>"}}}'
```

Use the returned `workspaceId` for all subsequent calls in the session. Store it
in a variable rather than re-fetching it on every call.

### Calling any tool

```bash
curl -s -X POST "https://compass.rbcodelabs.com/api/mcp" \
  -H "Authorization: Bearer $COMPASS_MCP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "tools/call",
    "params": {
      "name": "<tool_name>",
      "arguments": { <args> }
    }
  }'
```

---

## Status Progressions

### Opportunities
```
EXPLORING → VALIDATING → PRIORITIZED → ACTIVE → ARCHIVED
```

| Status | When to apply |
|---|---|
| **EXPLORING** | Signal exists; fewer than 2 independent sources. Do not add solutions yet. |
| **VALIDATING** | Actively gathering evidence. At least 1 strong signal logged. |
| **PRIORITIZED** | Evidence bar met: 2+ independent sources, customer-voice framing, connected to active KR. |
| **ACTIVE** | Team is exploring solutions or running experiments against this opportunity. |
| **ARCHIVED** | Invalidated or deprioritized. Archive, never delete; confirm with a human first if work sits behind it. |

### Solutions
```
IDEA → VALIDATED → IN_DELIVERY → SHIPPED | KILLED
```

| Status | When to apply |
|---|---|
| **IDEA** | Hypothesis named; assumptions not yet mapped. |
| **VALIDATED** | Riskiest assumption passed its experiment. Cleared for build. |
| **IN_DELIVERY** | Active engineering work in the resolved delivery provider (Compass Tasks, Linear, Jira, etc.). |
| **SHIPPED** | In production. |
| **KILLED** | Assumption failed the test. Record the reason; a human confirms the kill when work sits behind it. |

### Assumptions
```
UNTESTED → TESTING → VALIDATED | INVALIDATED
```

Use `conclude_experiment` rather than editing assumption status; Compass updates the
linked assumption automatically.

### Experiments
```
DESIGNING → RUNNING → COMPLETE | KILLED | NOT_PURSUED
```

| Status | When to apply |
|---|---|
| **DESIGNING** | Hypothesis and method defined; kill condition not yet written. |
| **RUNNING** | Kill condition written; test is live. Never start RUNNING without one. |
| **COMPLETE** | Experiment finished; result logged; conclusion (PROCEED/KILL/ITERATE) recorded. |
| **KILLED** | Abandoned mid-run. Log reason before killing. |
| **NOT_PURSUED** | A deliberate decision not to run it — opportunity cost, timing, or reprioritization, not a failed test. Own terminal status, distinct from KILLED. Leaves the linked Assumption `UNTESTED`; a `reason` is required. |

### Roadmap Horizons
```
NOW → NEXT → LATER
```

- **NOW:** Committed delivery within configured capacity; work is active or starting this cycle.
- **NEXT:** Validated, explicitly ranked, and admitted within `portfolio_policy.next_limit`;
  starting within 1-2 cycles.
- **LATER:** Preserved candidate; not scheduled. Validation may run while it remains here.

Approving validation never changes a roadmap horizon. Before `LATER → NEXT`, re-read the
complete ordered queue and `portfolio_policy`; require a `VALIDATED` Solution, an exact
rank, and named displacement when the queue is full. Missing capacity or ordering data
means keep `LATER`. `NEXT → NOW` requires a separate commitment decision.

An exact [Approved Build](../build-authorization/SKILL.md) can produce a tested PR while
the roadmap horizon stays unchanged. Capacity limits govern admission, not that build
authorization. Opportunity/Solution lifecycle status is reporting, never worker ownership.

---

## Session Workflow

### Starting a session

1. Retrieve the MCP API key from the secrets manager
2. Call `list_workspaces` to get the workspaceId
3. Call `get_workspace_summary` to get current counts and active OKR cycle
4. Call `list_experiments(workspaceId, "RUNNING")` -- know what's live before adding more
5. Review `list_opportunities(workspaceId, "ACTIVE")` -- know the current focus

### During a session

**When processing signals:**
- If a signal confirms an existing opportunity → call `update_opportunity_status` if evidence bar now met
- If signals point to a new opportunity → call `create_opportunity`, link to the active KR

**When an experiment concludes:**
- Call `log_experiment_result` with the observation note and any metric/value
- Call `conclude_experiment` with PROCEED, KILL, ITERATE, or NOT_PURSUED + rationale
  (`reason` is required for NOT_PURSUED)
  - Compass sets the linked assumption VALIDATED or INVALIDATED; NOT_PURSUED leaves it
    UNTESTED, because never tested is not disproven. Don't use KILL to close a shelved experiment.

**When a solution is validated:**
- Keep or create its deduplicated `LATER` candidate. A separate capacity-ranked roadmap
  admission review is required before `NEXT`; a separate commitment review is required
  before `NOW`.
- Update the solution status to IN_DELIVERY when engineering starts

**When adding new discovery items:**
- `create_opportunity` with a KR link whenever a new opportunity reaches EXPLORING
- `add_solution` before evaluating which solution to pursue (always add 3+ before narrowing)
- `add_assumption` for the riskiest assumption in each solution before designing experiments
- `create_experiment` in DESIGNING status; only move to RUNNING once kill condition is written

### Ending a session

- Verify every touched item has an accurate status
- Link any EXPLORING opportunity with no KR to the most plausible KR and report the link
- **Check zero-solution coverage workspace-wide**, not just touched items: every ACTIVE or
  PRIORITIZED opportunity needs at least one non-KILLED solution. Scheduled checks (weekly
  audit, OKR health review) run this too, since per-session checks miss what nobody opened.
  0/N of a fixed KR cohort is urgent.
- Close any gap by adding candidate solutions with `add_solution`. Authoring candidates is
  discovery; roadmap admission rules govern selection, not authorship.
- Don't leave an experiment in DESIGNING past one session: write its kill condition, or, if it
  was deliberately shelved, close it with `conclude_experiment(experimentId, "NOT_PURSUED", reason)`.

---

## Common Operations Quick Reference

### Get full product snapshot
```
list_workspaces(orgSlug)
get_workspace_summary(workspaceId)
list_okr_cycles(workspaceId)
get_okr_cycle(cycleId)           -- objectives + KR progress
list_opportunities(workspaceId)  -- full pipeline
list_experiments(workspaceId, "RUNNING")
list_roadmap_items(workspaceId)  -- NOW/NEXT/LATER
list_feedback(workspaceId, "OPEN")
```

### Discovery: full path from signal to roadmap
```
create_opportunity(workspaceId, title, description, keyResultId)  → opportunityId
update_opportunity_status(opportunityId, "VALIDATING")
update_opportunity_status(opportunityId, "PRIORITIZED")           -- after evidence bar met
add_solution(opportunityId, title, description)                   → solutionId  [repeat 3x]
add_assumption(solutionId, title, riskLevel: "HIGH")              → assumptionId
create_experiment(workspaceId, title, hypothesis, method,
  killCondition, assumptionId)                                    → experimentId
log_experiment_result(experimentId, note, metric, value)
conclude_experiment(experimentId, "PROCEED")
  → assumption auto-set to VALIDATED
promote_to_roadmap(solutionId, workspaceId, "NOW")
```

### Docs, research, insights, and delivery

When routing resolves to `compass_docs`, store vision and durable narratives in
Compass Docs. When it resolves to `compass_research`, store raw research notes or
references in Compass's research surface. `compass_feedback` owns granular,
linkable insights. `compass_tasks` owns engineering delivery tasks and their
status; link each task back to its roadmap item and validated solution.

Use the tools the connected Compass MCP server actually exposes; discover the catalog
rather than inventing method names. If a required operation is missing, report that one
capability as blocked, continue the rest, and don't silently redirect the write to
Markdown or an external tracker.

### Prototype artifacts

When `prototype_artifacts` resolves to `compass_artifacts`, publish the prototype as a
first-class Compass Artifact. Use `create_artifact` for the initial version,
`update_artifact` for later revisions, `get_artifact` or `list_artifacts` to read it,
and `archive_artifact` when it is no longer active. Link the stable artifact to its
source product objects with `link_artifact_to_solution` and, when it is a decision aid,
`link_artifact_to_decision`.

For an HTML upload, provide one self-contained file so its styles, scripts, and assets
survive outside the originating machine. Re-read the stored artifact after publishing
and verify its revision metadata and intended links. Do not substitute a Compass Doc
that describes the prototype or points to a machine-local path. Compass Docs remain the
home for vision and durable narratives when the `vision` capability resolves to
`compass_docs`.

### OKR check-in
```
list_okr_cycles(workspaceId)
get_okr_cycle(cycleId)           -- see current/target for all KRs
log_checkin(keyResultId, value, note)
```

### Turn feedback into an opportunity
```
list_feedback(workspaceId)        -- find high-vote items
create_opportunity(workspaceId, title, description)
link_opportunity_to_kr(opportunityId, keyResultId)
update_opportunity_status(opportunityId, "VALIDATING")
```

---

## Anti-Patterns

| Anti-pattern | Why it's wrong |
|---|---|
| Moving experiment to RUNNING without a kill condition | The kill condition is the gate. An experiment without one has no definition of done. |
| Adding only one solution per opportunity | Breadth before depth: three minimum before eliminating any. |
| Leaving an opportunity at zero solutions | Nothing to select between, so it and its KR can't move. Generate candidates now. |
| Creating an opportunity with no KR link | Unlinked opportunities are feature requests in disguise. Link the most plausible KR. |
| Manually updating assumption status | Use `conclude_experiment` -- the API auto-updates the linked assumption. Manual edits break traceability. |
| Batching Compass updates at session end | Status drifts during the session; the product snapshot becomes unreliable. |
| Deleting killed experiments or archived opportunities | Killed work is institutional memory. Archive with a reason. |
| Logging all signals as a single feedback item | One item per friction point. Compass's feedback board works best with granular items. |

---

## Project-Specific Configuration

Each project that resolves at least one capability to Compass should include a
Compass connection section plus the integration routing table:

```markdown
## Compass

- **Org slug:** <orgSlug>
- **Workspace slug:** <workspaceSlug>
- **API key location:** <how to retrieve -- env var, 1Password record name, etc.>
- **URL:** https://compass.rbcodelabs.com/<orgSlug>/<workspaceSlug>/discovery
```

If `pm-config.md` has no Compass section, discover the workspace with `list_workspaces`,
pick the one matching the product in context, and state the choice. Never store the key
value in `pm-config.md`.

---

## See Also

- [Compass URL and Data Model](https://compass.rbcodelabs.com)
- [PM Tool Integration Guide -- Compass section](../../PM Tool Integration Guide.md)
- [OST Workflow skill](../ost-workflow/SKILL.md)
- [OKR Workflow skill](../okr-workflow/SKILL.md)
