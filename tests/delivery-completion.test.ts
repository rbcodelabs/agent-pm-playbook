import assert from "node:assert/strict";
import test from "node:test";

import {
  decideCompletion,
  type CompletionSnapshot,
} from "../skills/delivery-completion-watcher/scripts/decide-completion.ts";

const ready: CompletionSnapshot = {
  taskStatus: "IN_REVIEW",
  prState: "MERGED",
  checks: "PASS",
  production: "PASS",
  smoke: "PASS",
  receiptApplied: false,
  launchRequired: false,
  linkedRoadmap: true,
  linkedSolution: true,
  solutionStatusWritable: true,
};

test("an open PR cannot complete delivery", () => {
  const decision = decideCompletion({ ...ready, prState: "OPEN", production: "PENDING", smoke: "NOT_RUN" });
  assert.deepEqual(decision, { state: "WAIT", reason: "PR is still open", actions: [] });
});

test("a merged PR still waits for production and smoke evidence", () => {
  const productionPending = decideCompletion({ ...ready, production: "PENDING", smoke: "NOT_RUN" });
  assert.equal(productionPending.state, "WAIT");
  assert.equal(productionPending.reason, "production deployment is not verified");

  const smokePending = decideCompletion({ ...ready, smoke: "NOT_RUN" });
  assert.equal(smokePending.state, "WAIT");
  assert.equal(smokePending.reason, "production smoke test has not run");
});

test("verified delivery closes linked state and dispatches capacity without promoting work", () => {
  const decision = decideCompletion(ready);
  assert.equal(decision.state, "APPLY");
  assert.deepEqual(decision.actions, [
    "task:DONE",
    "roadmap:SHIPPED",
    "roadmap-steward:DISPATCH_CAPACITY_CHANGE",
    "solution:SHIPPED",
    "receipt:WRITE",
  ]);
  assert.ok(decision.actions.every((action) => !action.includes("PROMOTE") && action !== "roadmap:NEXT"));
});

test("configured launch work prevents a direct shipped transition and capacity dispatch", () => {
  const decision = decideCompletion({ ...ready, launchRequired: true });
  assert.equal(decision.state, "APPLY");
  assert.ok(decision.actions.includes("roadmap:LAUNCHING"));
  assert.ok(!decision.actions.includes("roadmap:SHIPPED"));
  assert.ok(!decision.actions.includes("roadmap-steward:DISPATCH_CAPACITY_CHANGE"));
});

test("blocking smoke failures stop completion while non-blocking findings become feedback", () => {
  const failed = decideCompletion({ ...ready, smoke: "FAIL_BLOCKING" });
  assert.deepEqual(failed, {
    state: "BLOCKED",
    reason: "blocking production smoke test failed",
    actions: ["task:BLOCKED"],
  });

  const followup = decideCompletion({ ...ready, smoke: "PASS_WITH_FOLLOWUP" });
  assert.equal(followup.state, "APPLY");
  assert.ok(followup.actions.includes("feedback:CREATE_FOLLOWUP"));
  assert.ok(followup.actions.includes("roadmap:SHIPPED"));
});

test("unsupported Solution mutation is explicit and an applied receipt makes retries no-ops", () => {
  const unsupported = decideCompletion({ ...ready, solutionStatusWritable: false });
  assert.ok(unsupported.actions.includes("warning:SOLUTION_STATUS_UNSUPPORTED"));
  assert.ok(!unsupported.actions.includes("solution:SHIPPED"));

  const retry = decideCompletion({ ...ready, receiptApplied: true });
  assert.deepEqual(retry, {
    state: "NOOP",
    reason: "completion receipt already applied",
    actions: [],
  });
});
