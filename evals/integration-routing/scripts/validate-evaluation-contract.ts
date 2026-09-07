import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { pathToFileURL } from "node:url";

type JsonObject = Record<string, unknown>;
type FixtureManifest = {
  id: string;
  path: string;
  visibility: "public" | "holdout";
  critical: boolean;
  weight: number;
};
type Manifest = {
  $schema?: string;
  version: number;
  skillId: string;
  source: { path: string; hash: string; revision: string; purposePath: string };
  budgets: { maxCandidateTokens: number; maxEvaluationSeconds: number };
  thresholds: { minimumAggregateImprovement: number; requireNoCriticalRegression: boolean };
  fixtures: FixtureManifest[];
  resultSets: Record<string, string>;
};
type Fixture = { id: string; description: string; grader: string; expected: unknown };
type ResultSet = Record<string, unknown>;
export type EvaluationContract = {
  root: string;
  manifest: Manifest;
  fixtures: Record<string, Fixture>;
  resultSets: Record<string, ResultSet>;
};

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as JsonObject)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function loadEvaluationContract(rootPath: string): EvaluationContract {
  const root = resolve(rootPath);
  const manifest = readJson<Manifest>(resolve(root, "manifest.json"));
  const fixtures = Object.fromEntries(
    manifest.fixtures.map((entry) => [entry.id, readJson<Fixture>(resolve(root, entry.path))]),
  );
  const resultSets = Object.fromEntries(
    Object.entries(manifest.resultSets).map(([name, path]) => [name, readJson<ResultSet>(resolve(root, path))]),
  );
  return { root, manifest, fixtures, resultSets };
}

function isCompleteMap(actual: unknown, expectedKeys: unknown): boolean {
  if (!actual || typeof actual !== "object" || !Array.isArray(expectedKeys)) return false;
  const map = actual as JsonObject;
  return (
    isDeepStrictEqual(Object.keys(map).sort(), [...expectedKeys].sort()) &&
    Object.values(map).every((provider) => typeof provider === "string" && provider.trim().length > 0)
  );
}

function grade(fixture: Fixture, actual: unknown): boolean {
  if (fixture.grader === "deep-equal" || fixture.grader === "exact-provider-map") {
    return isDeepStrictEqual(actual, fixture.expected);
  }
  if (fixture.grader === "complete-capability-maps") {
    if (!actual || typeof actual !== "object" || !fixture.expected || typeof fixture.expected !== "object") return false;
    const maps = actual as JsonObject;
    const expected = fixture.expected as JsonObject;
    return isCompleteMap(maps.product, expected.product) && isCompleteMap(maps.workflow, expected.workflow);
  }
  return false;
}

function gradeResultSet(contract: EvaluationContract, resultSet: ResultSet) {
  const fixtures: Record<string, { passed: boolean; critical: boolean; weight: number }> = {};
  let earned = 0;
  let available = 0;
  for (const entry of contract.manifest.fixtures) {
    const passed = grade(contract.fixtures[entry.id], resultSet[entry.id]);
    fixtures[entry.id] = { passed, critical: entry.critical, weight: entry.weight };
    available += entry.weight;
    if (passed) earned += entry.weight;
  }
  return { fixtures, score: available === 0 ? 0 : earned / available };
}

export function validateEvaluationContract(contract: EvaluationContract, rootPath = contract.root): string[] {
  const errors: string[] = [];
  const { manifest } = contract;
  if (manifest.version !== 1) errors.push("version must be 1");
  if (manifest.skillId !== "integration-routing") errors.push("skillId must be integration-routing");
  if (manifest.$schema !== "./manifest.schema.json") errors.push("$schema must reference ./manifest.schema.json");
  if (!manifest.fixtures.length) errors.push("at least one fixture is required");
  if (!(manifest.thresholds.minimumAggregateImprovement > 0)) errors.push("minimum aggregate improvement must be positive");
  if (!(manifest.budgets.maxCandidateTokens > 0) || !(manifest.budgets.maxEvaluationSeconds > 0)) {
    errors.push("evaluation budgets must be positive");
  }

  const root = resolve(rootPath);
  const sourcePath = resolve(root, manifest.source.path);
  const purposePath = resolve(root, manifest.source.purposePath);
  if (!existsSync(sourcePath)) errors.push(`source skill does not exist: ${manifest.source.path}`);
  else if (sha256(readFileSync(sourcePath, "utf8")) !== manifest.source.hash) errors.push("source skill hash is stale");
  if (!existsSync(purposePath)) errors.push(`purpose contract does not exist: ${manifest.source.purposePath}`);

  const ids = new Set<string>();
  for (const entry of manifest.fixtures) {
    if (ids.has(entry.id)) errors.push(`duplicate fixture id: ${entry.id}`);
    ids.add(entry.id);
    if (entry.weight <= 0) errors.push(`${entry.id}: weight must be positive`);
    if (entry.visibility !== "public" && entry.visibility !== "holdout") {
      errors.push(`${entry.id}: visibility must be public or holdout`);
    }
    const fixture = contract.fixtures[entry.id];
    if (!fixture) errors.push(`${entry.id}: fixture is missing`);
    else {
      if (fixture.id !== entry.id) errors.push(`${entry.id}: fixture id does not match manifest`);
      if (!["deep-equal", "exact-provider-map", "complete-capability-maps"].includes(fixture.grader)) {
        errors.push(`${entry.id}: unknown grader ${fixture.grader}`);
      }
    }
  }
  for (const required of ["baseline", "beneficial", "harmful", "no-op"]) {
    if (!contract.resultSets[required]) errors.push(`missing result set: ${required}`);
  }
  for (const [name, resultSet] of Object.entries(contract.resultSets)) {
    for (const id of ids) if (!(id in resultSet)) errors.push(`${name}: missing result for ${id}`);
  }
  return errors;
}

export function evaluateCandidate(contract: EvaluationContract, candidateName: string) {
  const errors = validateEvaluationContract(contract);
  if (errors.length) throw new Error(`Invalid evaluation contract:\n${errors.join("\n")}`);
  const candidateResults = contract.resultSets[candidateName];
  if (!candidateResults) throw new Error(`Unknown candidate result set: ${candidateName}`);

  const baseline = gradeResultSet(contract, contract.resultSets.baseline);
  const candidate = gradeResultSet(contract, candidateResults);
  const regressedCriticalFixtures = contract.manifest.fixtures
    .filter((entry) => entry.critical && baseline.fixtures[entry.id].passed && !candidate.fixtures[entry.id].passed)
    .map((entry) => entry.id);
  const reasons: string[] = [];
  if (candidate.score - baseline.score < contract.manifest.thresholds.minimumAggregateImprovement) {
    reasons.push("candidate does not beat baseline by the minimum aggregate margin");
  }
  if (contract.manifest.thresholds.requireNoCriticalRegression && regressedCriticalFixtures.length) {
    reasons.push("candidate regresses a critical fixture");
  }

  return {
    decision: reasons.length ? "reject" : "accept",
    reasons,
    baselineScore: baseline.score,
    candidateScore: candidate.score,
    regressedCriticalFixtures,
    fixtures: candidate.fixtures,
    sourceSkillHash: contract.manifest.source.hash,
    contractHash: sha256(stableJson({ manifest: contract.manifest, fixtures: contract.fixtures, baseline: contract.resultSets.baseline })),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = process.argv[2] ?? dirname(new URL("../manifest.json", import.meta.url).pathname);
  try {
    const contract = loadEvaluationContract(root);
    const errors = validateEvaluationContract(contract, root);
    if (errors.length) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log(`Validated ${contract.manifest.fixtures.length} WikiSkill fixtures for ${contract.manifest.skillId}.`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
