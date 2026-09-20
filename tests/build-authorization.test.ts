import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");
const contract = () => read("skills/build-authorization/SKILL.md");

// These are instruction-contract tests, not proof that a live worker reaches a PR.
test("one exact approval reaches the common worker without another Plan approval", () => {
  const text = contract();
  assert.match(text, /current synchronous user instruction/);
  assert.match(text, /approved immutable Decision revision/);
  assert.match(text, /Do not enter Plan mode or ask for the same approval again/);
  assert.match(text, /approved_build_policy/);
  assert.match(text, /Existing exact human approvals carry forward/);
  assert.doesNotMatch(text, /run the installed evaluator/i);
  assert.equal(existsSync("skills/build-authorization/scripts/evaluate-authorization.ts"), false);
});

test("unreadable roadmap capacity does not stop an explicitly approved build", () => {
  assert.match(contract(), /Unknown capacity blocks roadmap admission only/);
  assert.match(contract(), /leave the horizon unchanged and continue the approved build/);
  assert.match(contract(), /same-workspace/);
  assert.match(contract(), /revocation/);
  assert.match(contract(), /expiry/);
});

test("two workers and an uncertain create response cannot be presented as exactly once", () => {
  const text = contract();
  assert.match(text, /best-effort collision detection, not an atomic lock/);
  assert.match(text, /cannot guarantee exactly-once execution/);
  assert.match(text, /before code and before push or PR creation/);
  assert.match(text, /Never take over a running owner/);
  assert.match(text, /uncertain create response/);
  assert.match(text, /stop only the ambiguous item/);
});

test("scheduled work dispatches early but does not acquire exclusive authority", () => {
  const ops = read("skills/scheduled-product-operations/SKILL.md");
  assert.match(ops, /at most one dedicated delivery worker/);
  assert.match(ops, /before the remaining health inventory/);
  assert.match(ops.replaceAll("\n", " "), /continue every remaining checklist row/);
  assert.match(ops, /not an exclusive executor/);
});

test("legacy policy is explicit and review boundary is separate from release", () => {
  const text = contract();
  assert.match(text, /never silently opt in/);
  assert.match(text, /build_authorization_policy/);
  assert.match(text, /pinned legacy skill revision/);
  assert.match(text, /IN_REVIEW/);
  assert.match(text, /Merge and production require separate authority/);
  const template = read("skills/integration-routing/assets/pm-config-template.md");
  assert.match(template, /approved_build_policy:\s+enabled: false/);
  assert.match(template, /completion_boundary: tested_pr/);
});

test("simplifying authority preserves implementation, verification and publication gates", () => {
  const resolver = read("skills/compass-resolver/SKILL.md");
  for (const heading of ["Step 4", "Step 5", "Step 6", "Step 7", "Step 8"]) {
    assert.ok(resolver.includes("## " + heading), heading);
  }
  assert.match(resolver, /write a failing regression test/);
  assert.match(resolver, /Failed checks keep the work in progress/);
  assert.match(resolver, /before push/);
  assert.match(resolver, /Never mark it `DONE` merely because the PR opened/);
});
