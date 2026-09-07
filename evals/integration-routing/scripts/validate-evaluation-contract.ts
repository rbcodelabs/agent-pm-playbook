import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { pathToFileURL } from "node:url";

type JsonObject = Record<string, unknown>;
type Schema = JsonObject;
type FixtureManifest = { id: string; path: string; hash: string; visibility: "public" | "holdout"; critical: boolean; weight: number };
type ResultSetManifest = { path: string; hash: string; artifactPath: string; artifactHash: string };
type Manifest = {
  $schema: string;
  version: number;
  skillId: string;
  source: { path: string; hash: string; revision: string; purposePath: string; purposeHash: string };
  budgets: { maxCandidateTokens: number; maxEvaluationSeconds: number };
  thresholds: { minimumAggregateImprovement: number; requireNoCriticalRegression: boolean };
  fixtures: FixtureManifest[];
  resultSets: Record<string, ResultSetManifest>;
};
type Fixture = {
  version: number;
  id: string;
  description: string;
  prompt: { system: string; user: string };
  execution: { mode: string; maxTurns: number; maxTokens: number; timeoutSeconds: number; tools: string[]; skills: string[]; filesystem: string };
  outputContract: Schema;
  grader: string;
  expected: unknown;
};
type ResultSet = Record<string, unknown>;
export type EvaluationContract = {
  root: string;
  manifest: Manifest;
  fixtures: Record<string, Fixture>;
  resultSets: Record<string, ResultSet>;
  candidateArtifacts: Record<string, string>;
  purposeText: string;
  integrity: { fixtures: Record<string, string>; resultSets: Record<string, string>; artifacts: Record<string, string>; purpose: string };
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
    return `{${Object.entries(value as JsonObject).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function containedPath(base: string, path: string): boolean {
  const rel = relative(resolve(base), resolve(path));
  return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !rel.startsWith(sep));
}

function resolveSchemaRef(root: Schema, reference: string): Schema | undefined {
  if (!reference.startsWith("#/")) return undefined;
  let current: unknown = root;
  for (const part of reference.slice(2).split("/")) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as JsonObject)[part.replaceAll("~1", "/").replaceAll("~0", "~")];
  }
  return current && typeof current === "object" ? current as Schema : undefined;
}

export function validateJsonSchema(schema: Schema, value: unknown): string[] {
  const errors: string[] = [];
  function visit(rule: Schema, item: unknown, path: string): void {
    if (typeof rule.$ref === "string") {
      const target = resolveSchemaRef(schema, rule.$ref);
      if (!target) errors.push(`${path}: unresolved schema reference ${rule.$ref}`);
      else visit(target, item, path);
      return;
    }
    if ("const" in rule && !isDeepStrictEqual(item, rule.const)) errors.push(`${path}: must equal ${JSON.stringify(rule.const)}`);
    if (Array.isArray(rule.enum) && !rule.enum.some((entry) => isDeepStrictEqual(entry, item))) errors.push(`${path}: must match an allowed value`);
    const type = rule.type;
    const typeMatches = type === undefined ||
      (type === "object" && item !== null && typeof item === "object" && !Array.isArray(item)) ||
      (type === "array" && Array.isArray(item)) ||
      (type === "string" && typeof item === "string") ||
      (type === "number" && typeof item === "number" && Number.isFinite(item)) ||
      (type === "integer" && typeof item === "number" && Number.isInteger(item)) ||
      (type === "boolean" && typeof item === "boolean") ||
      (type === "null" && item === null);
    if (!typeMatches) { errors.push(`${path}: must be ${String(type)}`); return; }
    if (typeof item === "string") {
      if (typeof rule.minLength === "number" && item.length < rule.minLength) errors.push(`${path}: is too short`);
      if (typeof rule.pattern === "string" && !new RegExp(rule.pattern).test(item)) errors.push(`${path}: does not match pattern`);
    }
    if (typeof item === "number") {
      if (typeof rule.minimum === "number" && item < rule.minimum) errors.push(`${path}: is below minimum`);
      if (typeof rule.exclusiveMinimum === "number" && item <= rule.exclusiveMinimum) errors.push(`${path}: is below exclusive minimum`);
      if (typeof rule.maximum === "number" && item > rule.maximum) errors.push(`${path}: exceeds maximum`);
    }
    if (Array.isArray(item)) {
      if (typeof rule.minItems === "number" && item.length < rule.minItems) errors.push(`${path}: has too few items`);
      if (rule.uniqueItems === true && new Set(item.map(stableJson)).size !== item.length) errors.push(`${path}: items must be unique`);
      if (rule.items && typeof rule.items === "object") item.forEach((entry, index) => visit(rule.items as Schema, entry, `${path}[${index}]`));
    }
    if (item && typeof item === "object" && !Array.isArray(item)) {
      const object = item as JsonObject;
      const properties = rule.properties && typeof rule.properties === "object" ? rule.properties as Record<string, Schema> : {};
      if (Array.isArray(rule.required)) for (const key of rule.required) if (typeof key === "string" && !(key in object)) errors.push(`${path}.${key}: is required`);
      if (rule.additionalProperties === false) for (const key of Object.keys(object)) if (!(key in properties)) errors.push(`${path}.${key}: is not allowed`);
      for (const [key, child] of Object.entries(properties)) if (key in object) visit(child, object[key], `${path}.${key}`);
    }
  }
  visit(schema, value, "$");
  return errors;
}

export function loadEvaluationContract(rootPath: string): EvaluationContract {
  const root = resolve(rootPath);
  const manifest = readJson<Manifest>(resolve(root, "manifest.json"));
  const fixtures: Record<string, Fixture> = {};
  for (const entry of manifest.fixtures) {
    const path = resolve(root, entry.path);
    if (!containedPath(root, path)) throw new Error(`${entry.id}: path escapes evaluation root`);
    fixtures[entry.id] = readJson<Fixture>(path);
  }
  const resultSets: Record<string, ResultSet> = {};
  const candidateArtifacts: Record<string, string> = {};
  for (const [name, entry] of Object.entries(manifest.resultSets)) {
    const resultPath = resolve(root, entry.path);
    const artifactPath = resolve(root, entry.artifactPath);
    if (!containedPath(root, resultPath) || !containedPath(root, artifactPath)) throw new Error(`${name}: path escapes evaluation root`);
    resultSets[name] = readJson<ResultSet>(resultPath);
    candidateArtifacts[name] = readFileSync(artifactPath, "utf8");
  }
  const repositoryRoot = resolve(root, "../..");
  const purposePath = resolve(root, manifest.source.purposePath);
  if (!containedPath(repositoryRoot, purposePath)) throw new Error("purpose path escapes repository root");
  const purposeText = readFileSync(purposePath, "utf8");
  return {
    root, manifest, fixtures, resultSets, candidateArtifacts, purposeText,
    integrity: {
      fixtures: Object.fromEntries(Object.entries(fixtures).map(([id, fixture]) => [id, sha256(stableJson(fixture))])),
      resultSets: Object.fromEntries(Object.entries(resultSets).map(([name, result]) => [name, sha256(stableJson(result))])),
      artifacts: Object.fromEntries(Object.entries(candidateArtifacts).map(([name, artifact]) => [name, sha256(artifact)])),
      purpose: sha256(purposeText),
    },
  };
}

export function getAuthoringFixtures(contract: EvaluationContract): Fixture[] {
  return contract.manifest.fixtures.filter((entry) => entry.visibility === "public").map((entry) => structuredClone(contract.fixtures[entry.id]));
}

function isCompleteMap(actual: unknown, expectedKeys: unknown): boolean {
  if (!actual || typeof actual !== "object" || !Array.isArray(expectedKeys)) return false;
  const map = actual as JsonObject;
  return isDeepStrictEqual(Object.keys(map).sort(), [...expectedKeys].sort()) && Object.values(map).every((provider) => typeof provider === "string" && provider.trim().length > 0);
}

function grade(fixture: Fixture, actual: unknown): boolean {
  if (validateJsonSchema(fixture.outputContract, actual).length) return false;
  if (fixture.grader === "deep-equal" || fixture.grader === "exact-provider-map") return isDeepStrictEqual(actual, fixture.expected);
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
  const root = resolve(rootPath);
  const schema = readJson<Schema>(resolve(root, "manifest.schema.json"));
  errors.push(...validateJsonSchema(schema, contract.manifest));
  const repositoryRoot = resolve(root, "../..");
  const { manifest } = contract;
  const sourcePath = resolve(root, manifest.source.path);
  const purposePath = resolve(root, manifest.source.purposePath);
  if (!containedPath(repositoryRoot, sourcePath)) errors.push("source path escapes repository root");
  if (!containedPath(repositoryRoot, purposePath)) errors.push("purpose path escapes repository root");
  if (!existsSync(sourcePath)) errors.push(`source skill does not exist: ${manifest.source.path}`);
  else if (sha256(readFileSync(sourcePath, "utf8")) !== manifest.source.hash) errors.push("source skill hash is stale");
  if (!existsSync(purposePath)) errors.push(`purpose contract does not exist: ${manifest.source.purposePath}`);
  else {
    if (sha256(readFileSync(purposePath, "utf8")) !== manifest.source.purposeHash) errors.push("purpose contract hash is stale");
    if (!contract.purposeText.includes(`Initial source revision: \`${manifest.source.revision}\``)) errors.push("PURPOSE revision disagrees with manifest source revision");
    if (sha256(contract.purposeText) !== contract.integrity.purpose) errors.push("loaded PURPOSE content was mutated");
  }

  const ids = new Set<string>();
  for (const entry of manifest.fixtures) {
    if (ids.has(entry.id)) errors.push(`duplicate fixture id: ${entry.id}`);
    ids.add(entry.id);
    const fixturePath = resolve(root, entry.path);
    if (!containedPath(root, fixturePath)) errors.push(`${entry.id}: path escapes evaluation root`);
    const fixture = contract.fixtures[entry.id];
    if (!fixture) { errors.push(`${entry.id}: fixture is missing`); continue; }
    if (sha256(stableJson(fixture)) !== contract.integrity.fixtures[entry.id]) errors.push(`${entry.id}: loaded fixture was mutated`);
    if (fixture.id !== entry.id) errors.push(`${entry.id}: fixture id does not match manifest`);
    if (fixture.version !== 1) errors.push(`${entry.id}: fixture version must be 1`);
    if (!fixture.prompt?.system?.trim() || !fixture.prompt?.user?.trim()) errors.push(`${entry.id}: executable prompt is required`);
    if (fixture.execution?.mode !== "constrained-run-v1") errors.push(`${entry.id}: constrained execution config is required`);
    if (!Number.isInteger(fixture.execution?.maxTurns) || fixture.execution.maxTurns < 1) errors.push(`${entry.id}: maxTurns must be a positive integer`);
    if (!Number.isInteger(fixture.execution?.maxTokens) || fixture.execution.maxTokens < 1 || fixture.execution.maxTokens > manifest.budgets.maxCandidateTokens) errors.push(`${entry.id}: maxTokens exceeds contract budget`);
    if (!Number.isInteger(fixture.execution?.timeoutSeconds) || fixture.execution.timeoutSeconds < 1 || fixture.execution.timeoutSeconds > manifest.budgets.maxEvaluationSeconds) errors.push(`${entry.id}: timeout exceeds contract budget`);
    if (!Array.isArray(fixture.execution?.tools) || fixture.execution.tools.length || !Array.isArray(fixture.execution?.skills) || fixture.execution.skills.length || fixture.execution?.filesystem !== "none") errors.push(`${entry.id}: evaluation must deny tools, skills, and filesystem`);
    if (!fixture.outputContract || fixture.outputContract.additionalProperties !== false) errors.push(`${entry.id}: closed output contract is required`);
    if (!isDeepStrictEqual(entry.visibility === "public", entry.path.includes("/public/"))) errors.push(`${entry.id}: visibility and path disagree`);
    if (!containedPath(root, fixturePath) || !existsSync(fixturePath) || sha256(readFileSync(fixturePath, "utf8")) !== entry.hash) errors.push(`${entry.id}: fixture hash is stale`);
    if (!["deep-equal", "exact-provider-map", "complete-capability-maps"].includes(fixture.grader)) errors.push(`${entry.id}: unknown grader ${fixture.grader}`);
  }
  for (const required of ["baseline", "beneficial", "harmful", "no-op"]) if (!contract.resultSets[required]) errors.push(`missing result set: ${required}`);
  for (const [name, entry] of Object.entries(manifest.resultSets)) {
    const resultPath = resolve(root, entry.path);
    const artifactPath = resolve(root, entry.artifactPath);
    if (!containedPath(root, resultPath) || !containedPath(root, artifactPath)) errors.push(`${name}: path escapes evaluation root`);
    if (!existsSync(resultPath) || sha256(readFileSync(resultPath, "utf8")) !== entry.hash) errors.push(`${name}: result hash is stale`);
    if (!existsSync(artifactPath) || sha256(readFileSync(artifactPath, "utf8")) !== entry.artifactHash) errors.push(`${name}: candidate artifact hash is stale`);
    if (contract.resultSets[name] && sha256(stableJson(contract.resultSets[name])) !== contract.integrity.resultSets[name]) errors.push(`${name}: loaded result was mutated`);
    if (contract.candidateArtifacts[name] && sha256(contract.candidateArtifacts[name]) !== contract.integrity.artifacts[name]) errors.push(`${name}: loaded candidate artifact was mutated`);
    for (const id of ids) if (!(id in (contract.resultSets[name] ?? {}))) errors.push(`${name}: missing result for ${id}`);
  }
  return errors;
}

export function evaluateCandidate(contract: EvaluationContract, candidateName: string) {
  const errors = validateEvaluationContract(contract);
  if (errors.length) throw new Error(`Invalid evaluation contract:\n${errors.join("\n")}`);
  const candidateResults = contract.resultSets[candidateName];
  const candidateManifest = contract.manifest.resultSets[candidateName];
  if (!candidateResults || !candidateManifest) throw new Error(`Unknown candidate result set: ${candidateName}`);
  return evaluateRun(contract, contract.resultSets.baseline, candidateResults, contract.candidateArtifacts[candidateName], false);
}

export function evaluateRun(contract: EvaluationContract, baselineResults: ResultSet, candidateResults: ResultSet, candidateArtifact: string, validate = true) {
  if (validate) {
    const errors = validateEvaluationContract(contract);
    if (errors.length) throw new Error(`Invalid evaluation contract:\n${errors.join("\n")}`);
  }
  const graded = gradeCandidateResults(contract, baselineResults, candidateResults, false);
  const { baselineScore, candidateScore, failedCriticalFixtures, regressedCriticalFixtures, fixtures, reasons, decision } = graded;
  const fixtureHashes = Object.fromEntries(contract.manifest.fixtures.map((entry) => [entry.id, entry.hash]));
  const evidenceBase = {
    candidateResultHash: sha256(stableJson(candidateResults)),
    candidateArtifactHash: sha256(candidateArtifact),
    fixtureHashes,
    purposeHash: contract.manifest.source.purposeHash,
    sourceSkillHash: contract.manifest.source.hash,
    sourceRevision: contract.manifest.source.revision,
  };
  const contractHash = sha256(stableJson({ manifest: contract.manifest, fixtures: contract.fixtures, baseline: baselineResults, purpose: contract.purposeText }));
  return {
    decision, reasons, baselineScore, candidateScore, failedCriticalFixtures, regressedCriticalFixtures, fixtures,
    sourceSkillHash: contract.manifest.source.hash,
    contractHash,
    evidence: { ...evidenceBase, contractHash },
  };
}

export function gradeCandidateResults(contract: EvaluationContract, baselineResults: ResultSet, candidateResults: ResultSet, validate = true) {
  if (validate) {
    const errors = validateEvaluationContract(contract);
    if (errors.length) throw new Error(`Invalid evaluation contract:\n${errors.join("\n")}`);
  }
  const baseline = gradeResultSet(contract, baselineResults);
  const candidate = gradeResultSet(contract, candidateResults);
  const failedCriticalFixtures = contract.manifest.fixtures.filter((entry) => entry.critical && !candidate.fixtures[entry.id].passed).map((entry) => entry.id);
  const regressedCriticalFixtures = contract.manifest.fixtures.filter((entry) => entry.critical && baseline.fixtures[entry.id].passed && !candidate.fixtures[entry.id].passed).map((entry) => entry.id);
  const reasons: string[] = [];
  if (candidate.score - baseline.score < contract.manifest.thresholds.minimumAggregateImprovement) reasons.push("candidate does not beat baseline by the minimum aggregate margin");
  if (contract.manifest.thresholds.requireNoCriticalRegression && failedCriticalFixtures.length) reasons.push("candidate fails a critical fixture");
  if (regressedCriticalFixtures.length) reasons.push("candidate regresses a critical fixture");
  return {
    decision: reasons.length ? "reject" : "accept", reasons, baselineScore: baseline.score, candidateScore: candidate.score,
    failedCriticalFixtures, regressedCriticalFixtures, fixtures: candidate.fixtures,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = process.argv[2] ?? dirname(new URL("../manifest.json", import.meta.url).pathname);
  try {
    const contract = loadEvaluationContract(root);
    const errors = validateEvaluationContract(contract, root);
    if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
    else console.log(`Validated ${contract.manifest.fixtures.length} executable WikiSkill fixtures for ${contract.manifest.skillId}.`);
  } catch (error) { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; }
}
