---
name: integration-routing
description: >-
  Resolve Agentic PM product-state and workflow capabilities using named profiles
  and per-capability overrides. Use before PM state reads or writes and before
  scheduling, human review, notification, prototype publishing, or analytics reads.
---

# Capability Provider Contract

`pm-config.md` is a routing manifest. It identifies one authoritative provider for each PM product-state capability and, in contract-v2 configs, resolves the workflow services used to run automations and human review. It does not duplicate provider state.

## Resolution algorithm

1. Read `pm-config.md` before any read or write.
2. Load the named `integration_profile` from this skill's `assets/integration-profiles.json`.
3. Apply `provider_overrides` by product capability.
4. Verify all nine product capabilities resolve to exactly one non-empty provider.
5. When the requested flow needs scheduling, review, decisions, notifications, prototypes, or analytics, load `workflow_profile` from `assets/workflow-profiles.json`, apply `workflow_overrides`, and verify all six workflow capabilities.
6. When the flow changes roadmap horizons or dispatches validation, read
   `portfolio_policy`. Unknown limits or required capacity data block `NEXT`/`NOW`
   admission; they do not mean unlimited capacity.
7. When the flow reconciles a merged or deployed change, read
   `delivery_completion_policy`. Production verification defaults to required; preview
   success never implies shipped state.
8. Read from and write to the resolved provider. Load its provider workflow or adapter when one exists.
9. Never silently fall back to Markdown or another channel. If a provider is unavailable, report the blocked operation and use a configured fallback or an explicitly labeled `inbox`, `export`, `cache`, or `snapshot` only when the manifest permits it.
10. Treat paths owned by an Obsidian provider as vault-relative. Resolve them against the
    runtime-provided vault root; never persist or require a machine-specific vault path in
    `pm-config.md`, scheduled prompts, or decision records.

## Capabilities

### Product-state capabilities

| Key | Owns |
|---|---|
| `vision` | Product vision and durable product narrative |
| `research_capture` | Raw interviews, notes, transcripts, and observations |
| `insights` | Synthesized signals and evidence links |
| `okrs` | Objectives, key results, cycles, and check-ins |
| `ost` | Desired outcomes, opportunities, solutions, and assumptions |
| `experiments` | Test designs, results, and conclusions |
| `roadmap` | Investment horizons and commitments |
| `delivery` | Engineering tasks and execution status |
| `reporting_archive` | Durable status reports and snapshots |

### Workflow capabilities

| Key | Owns |
|---|---|
| `automation_runtime` | Schedules, triggers, gated dispatch, retries, and run state |
| `review_requests` | Pending review packets and reviewer-facing response state |
| `decision_records` | Immutable decisions, rationale, reviewer, and source version |
| `notifications` | Review requests, reminders, escalations, and digests |
| `prototype_artifacts` | Versioned concept and prototype artifacts |
| `product_analytics` | Metric definitions, exposure, adoption, and outcome measurements |

## Invariants

- Exactly one authoritative provider is resolved per state-owning capability.
- Domain skills own PM methodology; provider workflows own persistence mechanics.
- Cross-provider links carry stable IDs in both directions where supported.
- A secondary representation must declare its role as `inbox`, `export`, `cache`, or `snapshot`; it is never called a source of truth.
- Overrides replace a profile default for one capability without changing the named profile.
- Notification fallbacks must be explicit because notification channels do not own product state.
- Product and workflow profiles resolve independently; do not invent combined profiles for every tool combination.
- Obsidian paths are portable provider identifiers, not host filesystem locations. Repository
  working directories and executable paths are separate connection concerns.
- Validation authorization leaves roadmap candidates in `LATER`. `NEXT` is a validated,
  ranked, capacity-limited queue and `NOW` is a separately approved commitment.

## Backward compatibility

Legacy configs without `integration_profile` use an explicit compatibility preflight: infer a proposed mapping from `Notes System`, `Discovery Tool`, and `Issue Tracker`; show it to the user; then ask permission to persist it. Contract-v1 routed configs remain valid for product-only flows. When a v1 config invokes a workflow capability, show the proposed workflow profile and require confirmation before writing workflow state. Running `pm-setup` migrates routing but does not move or duplicate live data.

## Self-contained validation

This installed skill contains its own assets and validator. Resolve the skill's installed directory, then run:

```bash
node <integration-routing-skill-directory>/scripts/validate-integration-profiles.ts <integration-routing-skill-directory>/assets/integration-profiles.json
node <integration-routing-skill-directory>/scripts/validate-workflow-profiles.ts <integration-routing-skill-directory>/assets/workflow-profiles.json
```

Do not assume the playbook repository, `npm`, or a particular working directory is available.
