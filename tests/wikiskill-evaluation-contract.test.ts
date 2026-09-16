import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  evaluateCandidate,
  evaluateRun,
  getAuthoringFixtures,
  gradeCandidateResults,
  loadEvaluationContract,
  validateJsonSchema,
  validateEvaluationContract,
  verifyPinnedSourceRevision,
} from "../evals/integration-routing/scripts/validate-evaluation-contract.ts";

const root = "evals/integration-routing";

test("WikiSkill evaluation metadata stays separate from the generated skill manifest", () => {
  const generated = readFileSync("generated/skill-manifest.json", "utf8");
  assert.doesNotMatch(generated, /wikiskill|evaluation|holdout/i);
  assert.doesNotThrow(() => readFileSync("skills/integration-routing/PURPOSE.md", "utf8"));
});

test("the evaluation contract and every declared fixture are valid", () => {
  const contract = loadEvaluationContract(root);
  assert.equal(contract.sourceRevisionVerification, "verified");
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

test("loader validates raw manifest before traversing missing or malformed fields", () => {
  const directory = mkdtempSync(join(tmpdir(), "wikiskill-manifest-"));
  try {
    cpSync(`${root}/manifest.schema.json`, join(directory, "manifest.schema.json"));
    for (const invalid of [
      { $schema: "./manifest.schema.json", version: 1 },
      { ...JSON.parse(readFileSync(`${root}/manifest.json`, "utf8")), fixtures: "not-an-array" },
    ]) {
      writeFileSync(join(directory, "manifest.json"), JSON.stringify(invalid));
      assert.throws(
        () => loadEvaluationContract(directory),
        (error: unknown) => error instanceof Error && error.message.startsWith("Invalid evaluation manifest:\n$") && !/map is not a function|undefined/.test(error.message),
      );
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("source revision verification is explicitly unavailable outside Git", () => {
  const directory = mkdtempSync(join(tmpdir(), "wikiskill-no-git-"));
  try {
    const contract = loadEvaluationContract(root);
    assert.equal(verifyPinnedSourceRevision(directory, contract.manifest).status, "unavailable");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
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

test("every critical fixture must pass even when the baseline also failed it", () => {
  const contract = loadEvaluationContract(root);
  const candidate = structuredClone(contract.resultSets.beneficial);
  candidate["malformed-config"] = contract.resultSets.baseline["malformed-config"];
  const result = gradeCandidateResults(contract, contract.resultSets.baseline, candidate);
  assert.equal(result.decision, "reject");
  assert.ok(result.failedCriticalFixtures.includes("malformed-config"));
  assert.ok(result.reasons.includes("candidate fails a critical fixture"));
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

test("fixtures expose versioned executable prompt, constraints, and output contracts", () => {
  const contract = loadEvaluationContract(root);
  for (const fixture of Object.values(contract.fixtures)) {
    assert.equal(fixture.version, 1);
    assert.equal(fixture.execution.mode, "constrained-run-v1");
    assert.ok(fixture.prompt.system.length > 0);
    assert.ok(fixture.prompt.user.length > 0);
    assert.equal(fixture.outputContract.type, "object");
    assert.equal(fixture.outputContract.additionalProperties, false);
  }
});

test("authoring projection includes public fixtures and denies holdouts", () => {
  const fixtures = getAuthoringFixtures(loadEvaluationContract(root));
  assert.deepEqual(fixtures.map((fixture) => fixture.id), ["exact-one-provider", "complete-mappings", "malformed-config"]);
  assert.equal(JSON.stringify(fixtures).includes("no-silent-fallback"), false);
  assert.equal(JSON.stringify(fixtures).includes("source-of-truth-preservation"), false);
});

test("runtime schema rejects malformed types, extra fields, missing fields, invalid thresholds, weights, and duplicate IDs", () => {
  const schema = JSON.parse(readFileSync(`${root}/manifest.schema.json`, "utf8"));
  const base = JSON.parse(readFileSync(`${root}/manifest.json`, "utf8"));
  const cases = [
    { ...base, version: "1" },
    { ...base, unexpected: true },
    Object.fromEntries(Object.entries(base).filter(([key]) => key !== "source")),
    { ...base, thresholds: { ...base.thresholds, minimumAggregateImprovement: 0 } },
    { ...base, fixtures: base.fixtures.map((fixture: Record<string, unknown>, index: number) => index ? fixture : { ...fixture, weight: 0 }) },
    { ...base, fixtures: [base.fixtures[0], { ...base.fixtures[0] }] },
  ];
  for (const value of cases) assert.ok(validateJsonSchema(schema, value).length > 0);
});

test("evidence binds candidate results, candidate artifact, fixtures, purpose, revision, and contract", () => {
  const original = loadEvaluationContract(root);
  const evidence = evaluateCandidate(original, "beneficial").evidence;
  assert.match(evidence.candidateResultHash, /^[a-f0-9]{64}$/);
  assert.match(evidence.candidateArtifactHash, /^[a-f0-9]{64}$/);
  assert.match(evidence.purposeHash, /^[a-f0-9]{64}$/);
  assert.equal(Object.keys(evidence.fixtureHashes).length, original.manifest.fixtures.length);

  const mutations: Array<(contract: typeof original) => void> = [
    (contract) => { contract.resultSets.beneficial["malformed-config"] = { status: "changed" }; },
    (contract) => { contract.candidateArtifacts.beneficial += "\nchanged"; },
    (contract) => { contract.fixtures["exact-one-provider"].description += " changed"; },
    (contract) => { contract.purposeText += "\nchanged"; },
    (contract) => { contract.manifest.source.revision = "changed"; },
  ];
  for (const mutate of mutations) {
    const contract = loadEvaluationContract(root);
    mutate(contract);
    assert.throws(() => evaluateCandidate(contract, "beneficial"), /Invalid evaluation contract/);
  }
});

test("runner evidence changes with actual candidate output or artifact", () => {
  const contract = loadEvaluationContract(root);
  const baseline = contract.resultSets.baseline;
  const candidate = contract.resultSets.beneficial;
  const artifact = contract.candidateArtifacts.beneficial;
  const original = evaluateRun(contract, baseline, candidate, artifact).evidence;
  const changedResult = structuredClone(candidate);
  changedResult["malformed-config"] = { status: "changed" };
  assert.notEqual(evaluateRun(contract, baseline, changedResult, artifact).evidence.candidateResultHash, original.candidateResultHash);
  assert.notEqual(evaluateRun(contract, baseline, candidate, `${artifact}\nchanged`).evidence.candidateArtifactHash, original.candidateArtifactHash);
});

test("paths cannot escape the evaluation package and provenance agrees with PURPOSE", () => {
  const contract = loadEvaluationContract(root);
  contract.manifest.fixtures[0].path = "../../../package.json";
  assert.ok(validateEvaluationContract(contract, root).some((error) => error.includes("escapes evaluation root")));

  const revisionMismatch = loadEvaluationContract(root);
  revisionMismatch.manifest.source.revision = "deadbeef";
  assert.ok(validateEvaluationContract(revisionMismatch, root).some((error) => error.includes("PURPOSE revision")));
});
