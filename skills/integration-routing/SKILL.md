---
name: integration-routing
description: >-
  Resolve Agentic PM capabilities to authoritative providers using named
  integration profiles and per-capability overrides. Use before PM state reads,
  writes, setup, migration, or provider validation.
---

# Capability Provider Contract

`pm-config.md` is a routing manifest. It identifies one authoritative provider for each PM capability; it does not duplicate the state held by those providers.

## Resolution algorithm

1. Read `pm-config.md` before any read or write.
2. Load the named `integration_profile` from this skill's `assets/integration-profiles.json`.
3. Apply `provider_overrides` by capability.
4. Verify all nine capabilities resolve to exactly one non-empty provider.
5. Read from and write to that provider. Load its provider workflow when one exists (`compass-workflow`, `jira-workflow`, and so on).
6. Never silently fall back to Markdown. If the provider is unavailable, report the blocked operation and preserve an explicitly labeled `inbox`, `export`, `cache`, or `snapshot` only when the config permits it.

## Capabilities

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

## Invariants

- Exactly one authoritative provider is resolved per capability.
- Domain skills own PM methodology; provider workflows own persistence mechanics.
- Cross-provider links carry stable IDs in both directions where supported.
- A secondary representation must declare its role as `inbox`, `export`, `cache`, or `snapshot`; it is never called a source of truth.
- Overrides replace a profile default for one capability without changing the named profile.

## Backward compatibility

Legacy configs without `integration_profile` use an explicit compatibility preflight: infer a proposed mapping from `Notes System`, `Discovery Tool`, and `Issue Tracker`; show it to the user; then ask permission to persist it. Reads may proceed against the clearly configured legacy system. Do not create new records until ambiguous capabilities are resolved. Running `pm-setup` migrates the manifest but does not move or duplicate live product data.

## Self-contained validation

This installed skill contains its own assets and validator. Resolve the skill's installed directory, then run:

```bash
node <integration-routing-skill-directory>/scripts/validate-integration-profiles.ts <integration-routing-skill-directory>/assets/integration-profiles.json
```

Do not assume the playbook repository, `npm`, or a particular working directory is available.
