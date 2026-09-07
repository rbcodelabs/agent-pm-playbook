import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateCandidate,
  loadEvaluationContract,
  validateEvaluationContract,
} from "../evals/integration-routing/scripts/validate-evaluation-contract.ts";

const root = "evals/integration-routing";

test("WikiSkill evaluation metadata stays separate from the generated skill manifest", () => {
  const generated = readFileSync("generated/skill-manifest.json", "utf8");
  assert.doesNotMatch(generated, /wikiskill|evaluation|holdout/i);
  assert.doesNotThrow(() => readFileSync("skills/integration-routing/PURPOSE.md", "utf8"));
});

test("the evaluation contract and every declared fixture are valid", () => {
  const contract = loadEvaluationContract(root);
  assert.deepEqual(validateEvaluationContract(contract, root), []);
  assert.deepEqual(
    contract.manifest.fixtures.map((fixture) => fixture.id),
    [
      "exact-one-provider",
      "complete-mappings",
      "no-silent-fallback",
      "source-of-truth-preservation",
      "malformed-config",
    ],
  );
});

test("baseline and candidate grading is deterministic and hash-addressed", () => {
  const contract = loadEvaluationContract(root);
  const first = evaluateCandidate(contract, "beneficial");
  const second = evaluateCandidate(contract, "beneficial");
  assert.deepEqual(first, second);
  assert.match(first.contractHash, /^[a-f0-9]{64}$/);
  assert.match(first.sourceSkillHash, /^[a-f0-9]{64}$/);
});

test("a beneficial candidate passes the improvement and invariant gates", () => {
  const result = evaluateCandidate(loadEvaluationContract(root), "beneficial");
  assert.equal(result.decision, "accept");
  assert.ok(result.candidateScore > result.baselineScore);
  assert.deepEqual(result.regressedCriticalFixtures, []);
});

test("an equal no-op candidate is rejected", () => {
  const result = evaluateCandidate(loadEvaluationContract(root), "no-op");
  assert.equal(result.decision, "reject");
  assert.ok(result.reasons.includes("candidate does not beat baseline by the minimum aggregate margin"));
});

test("a harmful candidate is rejected when a critical invariant regresses", () => {
  const result = evaluateCandidate(loadEvaluationContract(root), "harmful");
  assert.equal(result.decision, "reject");
  assert.ok(result.regressedCriticalFixtures.includes("no-silent-fallback"));
  assert.ok(result.reasons.includes("candidate regresses a critical fixture"));
});

test("the validator reports stale source-skill hashes", () => {
  const contract = loadEvaluationContract(root);
  contract.manifest.source.hash = "0".repeat(64);
  assert.ok(validateEvaluationContract(contract, root).some((error) => error.includes("source skill hash is stale")));
});

test("the validator rejects unknown deterministic graders", () => {
  const contract = loadEvaluationContract(root);
  contract.fixtures["exact-one-provider"].grader = "model-judgment";
  assert.ok(validateEvaluationContract(contract, root).some((error) => error.includes("unknown grader")));
});

test("fixture graders enforce the routing contract", () => {
  const contract = loadEvaluationContract(root);
  const result = evaluateCandidate(contract, "beneficial");
  for (const id of [
    "exact-one-provider",
    "complete-mappings",
    "no-silent-fallback",
    "source-of-truth-preservation",
    "malformed-config",
  ]) {
    assert.equal(result.fixtures[id]?.passed, true, id);
  }
});
