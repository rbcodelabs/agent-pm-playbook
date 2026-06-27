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

## Core Rule

**Update Compass inline as work progresses -- never batch at the end of a session.**

The right moment to update an opportunity's status is when you've just synthesized
enough signals to move it forward -- not after you've done an hour of other work.
Batching produces stale state and breaks the product snapshot.

---

## MCP API Access

**Endpoint:** `POST https://compass.rbcodelabs.com/api/mcp`
**Auth:** `Authorization: Bearer <MCP_API_KEY>`

The API key is stored in the project's secrets manager. Common locations:

- **Environment variable:** `echo $COMPASS_MCP_API_KEY`
- **1Password:** `op item get "Compass MCP API Key" --fields credential`
- **pm-config.md:** check the `## Compass` section if the user has run pm-setup

If not found, ask the user: "Where is your Compass MCP API key stored?"

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
| **ARCHIVED** | Invalidated or deprioritized. Always archive -- never delete. |

### Solutions
```
IDEA → VALIDATED → IN_DELIVERY → SHIPPED | KILLED
```

| Status | When to apply |
|---|---|
| **IDEA** | Hypothesis named; assumptions not yet mapped. |
| **VALIDATED** | Riskiest assumption passed its experiment. Cleared for build. |
| **IN_DELIVERY** | Active engineering work in the delivery tracker (Linear, Jira). |
| **SHIPPED** | In production. |
| **KILLED** | Assumption failed the test. Archive with reason. |

### Assumptions
```
UNTESTED → TESTING → VALIDATED | INVALIDATED
```

Claude should NOT manually update assumption status -- use `conclude_experiment`
instead. When an experiment concludes, Compass auto-updates the linked assumption.

### Experiments
```
DESIGNING → RUNNING → COMPLETE | KILLED
```

| Status | When to apply |
|---|---|
| **DESIGNING** | Hypothesis and method defined; kill condition not yet written or approved. |
| **RUNNING** | Kill condition is written and approved; test is live. Never start RUNNING without a kill condition. |
| **COMPLETE** | Experiment finished; result logged; conclusion (PROCEED/KILL/ITERATE) recorded. |
| **KILLED** | Abandoned mid-run. Log reason before killing. |

### Roadmap Horizons
```
NOW → NEXT → LATER
```

- **NOW:** Committed delivery; work is active or starting this cycle.
- **NEXT:** Validated and queued; starting within 1-2 cycles.
- **LATER:** Directionally correct; not scheduled.

---

## Session Workflow

### Starting a session

1. Retrieve MCP API key from secrets manager
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
- Call `conclude_experiment` with PROCEED, KILL, or ITERATE + rationale
  - Compass auto-updates the linked assumption to VALIDATED or INVALIDATED

**When a solution is validated:**
- Call `add_to_roadmap` or `promote_to_roadmap` to move it to NOW/NEXT/LATER
- Update the solution status to IN_DELIVERY when engineering starts

**When adding new discovery items:**
- `create_opportunity` with a KR link whenever a new opportunity reaches EXPLORING
- `add_solution` before evaluating which solution to pursue (always add 3+ before narrowing)
- `add_assumption` for the riskiest assumption in each solution before designing experiments
- `create_experiment` in DESIGNING status; only move to RUNNING once kill condition is written

### Ending a session

- Verify every touched item has an accurate status
- If any opportunity is EXPLORING with no KR link, ask the user which KR it connects to
- Check for orphaned solutions: `list_opportunities` and confirm all ACTIVE opportunities
  have at least one non-KILLED solution
- Leave no experiment in DESIGNING for more than one session -- it means the kill condition
  was never written. Flag it explicitly.

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
| Adding only one solution per opportunity | Commit to breadth before depth. Three minimum before eliminating any. |
| Creating an opportunity with no KR link | Unlinked opportunities are feature requests in disguise. Always connect to a KR. |
| Manually updating assumption status | Use `conclude_experiment` -- the API auto-updates the linked assumption. Manual edits break traceability. |
| Batching Compass updates at session end | Status drifts during the session; the product snapshot becomes unreliable. |
| Deleting killed experiments or archived opportunities | Killed work is institutional memory. Archive with reason; never delete. |
| Logging all signals as a single feedback item | One item per friction point. Compass's feedback board works best with granular items. |

---

## Project-Specific Configuration

Each project's `pm-config.md` should include a Compass section:

```markdown
## Compass

- **Org slug:** <orgSlug>
- **Workspace slug:** <workspaceSlug>
- **API key location:** <how to retrieve -- env var, 1Password record name, etc.>
- **URL:** https://compass.rbcodelabs.com/<orgSlug>/<workspaceSlug>/discovery
```

If `pm-config.md` has no Compass section, ask the user for:
1. The org slug and workspace slug (visible in the Compass URL)
2. Where their MCP API key is stored

---

## See Also

- [Compass URL and Data Model](https://compass.rbcodelabs.com)
- [[PM Tool Integration Guide]] — full Compass OST mapping, signal layer guidance, and MCP notes
- [[Agentic PM Playbook]] — the discovery workflow this skill supports
- [[ost-workflow/SKILL|OST Workflow skill]] — opportunity tree operations
- [[okr-workflow/SKILL|OKR Workflow skill]] — OKR cycle management
