# Integration Routing Purpose Contract

## Intent

Resolve one authoritative provider for every requested product-state or workflow capability before any read or write. Keep PM methodology independent from persistence mechanics while making unavailable providers and secondary representations explicit.

## Invariants

1. Every required capability resolves to exactly one non-empty provider.
2. Product-state and workflow profiles resolve independently.
3. Profile overrides replace only the named capability and never mutate the reusable profile.
4. An unavailable provider blocks the operation unless the manifest explicitly configures a fallback.
5. Secondary representations are labeled `inbox`, `export`, `cache`, or `snapshot`; none becomes authoritative.
6. Unknown profiles, capabilities, empty overrides, and incomplete mappings are configuration errors.
7. Routing never widens execution, review, roadmap, or delivery authority.

## Supported contexts

- Named product-state profiles with per-capability overrides.
- Named workflow profiles with independent workflow overrides.
- Explicit backward-compatibility preflight for legacy configuration.
- Self-contained validation from an installed skill directory.

## Known failure modes

- A profile or expanded provider table becomes stale after the canonical profile changes.
- A consumer silently falls back to Markdown or another available provider.
- A cache, export, inbox, or snapshot is mistaken for the source of truth.
- Product and workflow mappings are combined, leaving a capability missing or multiply owned.
- A malformed override is accepted and erases the profile default.

## Provenance

- Contract version: 1
- Canonical skill: `skills/integration-routing/SKILL.md`
- Evaluation contract: `evals/integration-routing/manifest.json`
- Initial source revision: `3a49c3fba7fe9b6dbde5cac7b1ef9d7c5133e6b9`
- Initial source SHA-256: `ec31fa1a38c67422778bec3a77f06cb7a2eec95bc1b6106baffef8b106cd33d0`
- Maintainer: Agentic PM Playbook

The evaluation manifest is the machine-readable source for fixture hashes, graders, budgets, thresholds, and current source provenance. This document explains intent; it does not add a capability provider or change routing resolution.
