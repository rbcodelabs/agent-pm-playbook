import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { evaluateAuthorization as evaluate } from "../skills/build-authorization/scripts/evaluate-authorization.ts";

function ready() {
  const identity = { projectId: "hiptrip", workspaceId: "workspace", repository: "rick/hiptrip" };
  const buildCapacity = { roadmapItemId: "candidate", activeItemIdsBefore: [] as string[], capacityLimit: 1 };
  const liveCapacity = { roadmapItemId: "candidate", activeItemIds: [] as string[] };
  return {
    policy: { ...identity, enabled: true, version: "1", activatedAt: "2026-09-01T00:00:00Z" },
    package: { ...identity, ...buildCapacity, id: "build-1", purpose: "build-authorization-v1", digest: "sha256:abc", policyVersion: "1", requestId: "review-1", decisionRevision: "2", preparedAt: "2026-09-02T00:00:00Z", expiresAt: "2026-09-10T00:00:00Z", ownerId: "engineer", capacitySlot: "slot-1", displacedItemIds: [] as string[], maxHours: 8, maxSpend: 20 },
    decision: { ...identity, purpose: "build-authorization-v1", requestId: "review-1", revision: "2", packageId: "build-1", packageDigest: "sha256:abc", outcome: "approved", humanVerified: true, decidedAt: "2026-09-03T00:00:00Z", revoked: false, superseded: false },
    current: { ...identity, ...liveCapacity, now: "2026-09-05T00:00:00Z", packageDigest: "sha256:abc", ownerId: "engineer", capacitySlot: "slot-1", displacedItemIds: [] as string[], activeCount: 0, capacityLimit: 1, evidenceReady: true, designReady: true, dependenciesReady: true, durableStorage: true, serializedWorker: true, hoursUsed: 0, spendUsed: 0, workerId: "worker-1" },
    receipt: null as null | Record<string, unknown>,
  };
}

function resumed() {
  const s = ready();
  s.current.activeCount = 1;
  s.current.activeItemIds = ["candidate"];
  s.receipt = { executionId: "execution-1", packageId: s.package.id, packageDigest: s.package.digest, requestId: s.package.requestId, decisionRevision: s.package.decisionRevision, projectId: s.package.projectId, workspaceId: s.package.workspaceId, repository: s.package.repository, workerId: "worker-1", leaseExpiresAt: "2026-09-06T00:00:00Z", prUrl: null, appliedDisplacedItemIds: [], admissionApplied: true };
  return s;
}

test("one valid build approval is ready and never authorizes merge or production", () => {
  const result = evaluate(ready());
  assert.equal(result.state, "READY");
  assert.ok(result.actions.includes("execution:CLAIM_AND_RECORD"));
  assert.ok(result.actions.every((a: string) => !/merge|production/i.test(a)));
});

test("missing and pending decisions await one decision", () => {
  const s = ready();
  assert.equal(evaluate({ ...s, decision: null }).state, "AWAITING_DECISION");
  s.decision.outcome = "pending";
  assert.equal(evaluate(s).state, "AWAITING_DECISION");
});

const invalidCases: Array<[string, (s: ReturnType<typeof ready>) => void]> = [
  ["disabled policy", s => { s.policy.enabled = false; }],
  ["foreign project", s => { s.current.projectId = "other"; }],
  ["foreign workspace", s => { s.decision.workspaceId = "other"; }],
  ["foreign repository", s => { s.policy.repository = "other"; }],
  ["stale policy", s => { s.policy.version = "2"; }],
  ["changed scope", s => { s.current.packageDigest = "sha256:changed"; }],
  ["wrong decision request", s => { s.decision.requestId = "other"; }],
  ["stale revision", s => { s.decision.revision = "1"; }],
  ["wrong package", s => { s.decision.packageId = "other"; }],
  ["wrong approved digest", s => { s.decision.packageDigest = "other"; }],
  ["generic approval", s => { s.decision.purpose = "investment"; }],
  ["unverified human", s => { s.decision.humanVerified = false; }],
  ["rejected decision", s => { s.decision.outcome = "rejected"; }],
  ["requested changes", s => { s.decision.outcome = "changes_requested"; }],
  ["revocation", s => { s.decision.revoked = true; }],
  ["supersession", s => { s.decision.superseded = true; }],
  ["expired at boundary", s => { s.package.expiresAt = s.current.now; }],
  ["approval predates policy", s => { s.decision.decidedAt = "2026-08-31T00:00:00Z"; }],
  ["approval predates package", s => { s.package.preparedAt = "2026-09-04T00:00:00Z"; }],
  ["package predates policy activation", s => { s.package.preparedAt = "2026-08-31T00:00:00Z"; }],
  ["future approval", s => { s.decision.decidedAt = "2026-09-06T00:00:00Z"; }],
  ["invalid timestamp", s => { s.current.now = "not-a-date"; }],
  ["missing evidence", s => { s.current.evidenceReady = false; }],
  ["missing design", s => { s.current.designReady = false; }],
  ["dependencies blocked", s => { s.current.dependenciesReady = false; }],
  ["wrong owner", s => { s.current.ownerId = "other"; }],
  ["wrong slot", s => { s.current.capacitySlot = "other"; }],
  ["unapproved displacement", s => { Object.assign(s.current, { displacedItemIds: ["other"] }); }],
  ["full capacity", s => { s.current.activeCount = 1; }],
  ["no durable storage", s => { s.current.durableStorage = false; }],
  ["no serialized worker", s => { s.current.serializedWorker = false; }],
  ["exhausted hours", s => { s.current.hoursUsed = 8; }],
  ["exceeded spend", s => { s.current.spendUsed = 21; }],
  ["invalid capacity", s => { s.current.capacityLimit = NaN; }],
];
for (const [name, mutate] of invalidCases) {
  test(`${name} blocks without actions`, () => {
    const s = ready(); mutate(s);
    assert.equal(evaluate(s).state, "BLOCKED");
    assert.deepEqual(evaluate(s).actions, []);
  });
}

test("malformed and missing snapshots fail closed without throwing", () => {
  for (const s of [null, {}, [], { ...ready(), policy: null }, { ...ready(), current: {} }]) {
    assert.equal(evaluate(s).state, "BLOCKED");
  }
});

test("exact approved displacement admits work into a full queue", () => {
  const s = ready();
  s.package.activeItemIdsBefore = s.current.activeItemIds = ["old"];
  s.package.displacedItemIds = s.current.displacedItemIds = ["old"];
  s.current.activeCount = 1;
  assert.equal(evaluate(s).state, "READY");
});

test("already NOW candidate is not charged another slot without a receipt", () => {
  const s = ready();
  s.package.activeItemIdsBefore = s.current.activeItemIds = ["candidate"];
  s.current.activeCount = 1;
  assert.equal(evaluate(s).state, "READY");
});

test("occupied capacity requires approved displacement even with a matching execution claim", () => {
  const s = resumed();
  s.package.activeItemIdsBefore = s.current.activeItemIds = ["old"];
  s.receipt!.admissionApplied = false;
  assert.equal(evaluate(s).state, "BLOCKED");
  s.package.displacedItemIds = s.current.displacedItemIds = ["old"];
  const result = evaluate(s);
  assert.equal(result.state, "RESUME");
  assert.ok(result.actions.includes("roadmap:RECONCILE_ADMISSION"));
});

test("claimed execution can recover before admission without occupying a slot", () => {
  const s = resumed();
  s.receipt!.admissionApplied = false;
  s.current.activeItemIds = []; s.current.activeCount = 0;
  assert.equal(evaluate(s).state, "RESUME");
});

test("capacity rejects changed occupants, self-displacement, missing displaced items and changed limit", () => {
  const changed = ready(); changed.current.activeItemIds = ["other"]; changed.current.activeCount = 1;
  assert.equal(evaluate(changed).state, "BLOCKED");
  const self = ready(); self.package.activeItemIdsBefore = self.current.activeItemIds = ["candidate"]; self.current.activeCount = 1;
  self.package.displacedItemIds = self.current.displacedItemIds = ["candidate"];
  assert.equal(evaluate(self).state, "BLOCKED");
  const missing = ready(); missing.package.displacedItemIds = missing.current.displacedItemIds = ["absent"];
  assert.equal(evaluate(missing).state, "BLOCKED");
  const limit = ready(); limit.current.capacityLimit = 2;
  assert.equal(evaluate(limit).state, "BLOCKED");
});

test("receipt resumes partial displacement only with the exact recorded inventory", () => {
  const s = resumed();
  s.package.activeItemIdsBefore = ["old"];
  s.package.displacedItemIds = s.current.displacedItemIds = ["old"];
  s.receipt!.admissionApplied = false;
  s.receipt!.appliedDisplacedItemIds = ["old"];
  s.current.activeItemIds = []; s.current.activeCount = 0;
  assert.equal(evaluate(s).state, "RESUME");
  s.current.activeItemIds = ["unrelated"]; s.current.activeCount = 1;
  assert.equal(evaluate(s).state, "BLOCKED");
});

test("matching execution resumes without charging its occupied slot again", () => {
  assert.equal(evaluate(resumed()).state, "RESUME");
});

test("existing PR returns in-review without new actions", () => {
  const s = resumed(); s.receipt!.prUrl = "https://github.com/rick/hiptrip/pull/1";
  assert.equal(evaluate(s).state, "IN_REVIEW");
  assert.deepEqual(evaluate(s).actions, []);
});

test("another active owner blocks but an expired lease can be reclaimed", () => {
  const s = resumed(); s.receipt!.workerId = "other";
  assert.equal(evaluate(s).state, "BLOCKED");
  s.receipt!.leaseExpiresAt = "2026-09-04T00:00:00Z";
  assert.equal(evaluate(s).state, "RESUME");
});

test("existing work never bypasses current approval or receipt identity", () => {
  const revoked = resumed(); revoked.decision.revoked = true;
  assert.equal(evaluate(revoked).state, "BLOCKED");
  for (const field of ["packageId", "packageDigest", "requestId", "decisionRevision", "projectId", "workspaceId", "repository"]) {
    const s = resumed(); s.receipt![field] = "other";
    assert.equal(evaluate(s).state, "BLOCKED", field);
  }
});

test("CLI reads stdin and returns a blocked result for malformed JSON", () => {
  const cli = new URL("../skills/build-authorization/scripts/evaluate-authorization.ts", import.meta.url);
  const valid = spawnSync(process.execPath, [cli.pathname], { input: JSON.stringify(ready()), encoding: "utf8" });
  assert.equal(valid.status, 0, valid.stderr);
  assert.equal(JSON.parse(valid.stdout).state, "READY");
  const malformed = spawnSync(process.execPath, [cli.pathname], { input: "{", encoding: "utf8" });
  assert.equal(malformed.status, 1);
  assert.equal(JSON.parse(malformed.stdout).state, "BLOCKED");
});

test("approval snapshots require explicit receipt absence and strict boolean verification", () => {
  const s = ready();
  assert.equal(evaluate({ ...s, receipt: undefined }).state, "BLOCKED");
  assert.equal(evaluate({ ...s, decision: { ...s.decision, humanVerified: "true" } }).state, "BLOCKED");
  assert.equal(evaluate({ ...s, current: { ...s.current, serializedWorker: "true" } }).state, "BLOCKED");
});
