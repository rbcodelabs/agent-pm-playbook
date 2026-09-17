import assert from "node:assert/strict";
import test from "node:test";
import { evaluateAuthorization as evaluate } from "../skills/build-authorization/scripts/evaluate-authorization.ts";

function ready() {
  const identity = { projectId: "hiptrip", workspaceId: "workspace", repository: "rick/hiptrip" };
  return {
    policy: { ...identity, enabled: true, version: "1", activatedAt: "2026-09-01T00:00:00Z" },
    package: {
      ...identity, id: "build-1", purpose: "build-authorization-v1", policyVersion: "1",
      planDocId: "doc-1", planDocVersionId: "v1", roadmapItemId: "candidate",
      displacedItemId: null as string | null, preparedAt: "2026-09-02T00:00:00Z", expiresAt: "2026-09-10T00:00:00Z",
    },
    decision: {
      ...identity, purpose: "build-authorization-v1", packageId: "build-1", planDocVersionId: "v1",
      outcome: "approved", humanVerified: true, decidedAt: "2026-09-03T00:00:00Z", revoked: false, superseded: false,
    },
    current: {
      ...identity, now: "2026-09-05T00:00:00Z", planDocVersionId: "v1",
      evidenceReady: true, designReady: true, dependenciesReady: true,
      activeItemIds: [] as string[], capacityLimit: 1,
    },
  };
}

test("one valid build approval is ready and never authorizes merge or production", () => {
  const result = evaluate(ready());
  assert.equal(result.state, "READY");
  assert.ok(result.actions.includes("delivery:CLAIM_AND_BUILD_TO_PR"));
  assert.ok(result.actions.includes("roadmap:ADMIT_NOW"));
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
  ["plan changed before the package was prepared for", s => { s.current.planDocVersionId = "v2"; }],
  ["wrong decision package", s => { s.decision.packageId = "other"; }],
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
  ["approved plan version no longer matches", s => { s.decision.planDocVersionId = "v2"; }],
  ["no delivery capacity without a named displacement", s => { s.current.activeItemIds = ["other"]; }],
  ["named displacement not currently active", s => { s.package.displacedItemId = "old"; }],
  ["invalid capacity", s => { s.current.capacityLimit = NaN; }],
];
for (const [name, mutate] of invalidCases) {
  test(`${name} blocks without actions`, () => {
    const s = ready(); mutate(s);
    const result = evaluate(s);
    assert.equal(result.state, "BLOCKED");
    assert.deepEqual(result.actions, []);
  });
}

test("malformed and missing snapshots fail closed without throwing", () => {
  for (const s of [null, {}, [], { ...ready(), policy: null }, { ...ready(), current: {} }]) {
    assert.equal(evaluate(s).state, "BLOCKED");
  }
});

test("named displacement admits work into a full queue", () => {
  const s = ready();
  s.current.activeItemIds = ["old"];
  s.package.displacedItemId = "old";
  const result = evaluate(s);
  assert.equal(result.state, "READY");
  assert.ok(result.actions.includes("roadmap:ADMIT_NOW"));
});

test("already-active candidate does not require a displacement or another slot", () => {
  const s = ready();
  s.current.activeItemIds = ["candidate"];
  s.current.capacityLimit = 1;
  const result = evaluate(s);
  assert.equal(result.state, "READY");
  assert.ok(!result.actions.includes("roadmap:ADMIT_NOW"));
});

test("resuming an already-admitted package is READY again with no re-displacement", () => {
  // Claiming/resuming in-flight work is the caller's Step 2 job (title-prefix + PR
  // cross-check), identical for opted-in and legacy items — the evaluator only needs to
  // keep saying READY for the same approved, still-active scope; it never re-admits.
  const s = ready();
  s.current.activeItemIds = ["candidate"];
  const result = evaluate(s);
  assert.equal(result.state, "READY");
});
