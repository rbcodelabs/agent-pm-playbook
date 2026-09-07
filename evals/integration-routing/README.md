# Integration Routing Evaluation Contract

This package is the governed evaluation input for the WikiSkill pilot. It does not participate in integration or workflow provider resolution.

## Layout

- `manifest.json` pins the canonical skill hash, evaluation budgets, fixture catalog, and acceptance policy.
- `fixtures/public/` may be supplied to candidate-authoring agents.
- `fixtures/holdout/` is evaluator-only input and must not be included in candidate-authoring prompts or traces.
- `results/` contains deterministic synthetic result sets that prove the acceptance gates; they are not claims about the current skill's measured quality.
- `scripts/validate-evaluation-contract.ts` validates provenance and grades results.

The holdout boundary is enforced by the WikiSkill evaluation runner, not by filesystem secrecy in this public repository. Review packets may name a holdout fixture and report pass/fail, but must not include its contents in candidate-generation context.

## Acceptance

A candidate is accepted for human review only when it beats the pinned baseline by at least the manifest's aggregate margin and does not regress a baseline-passing critical fixture. Acceptance never mutates or activates the canonical skill.

After changing `skills/integration-routing/SKILL.md`, update its SHA-256 in the manifest and provenance record deliberately; `npm run validate` rejects stale hashes.
