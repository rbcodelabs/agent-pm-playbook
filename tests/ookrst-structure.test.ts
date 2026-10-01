import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const GUIDE = "guides/ookrst-structure.md";
const read = (path: string) => readFileSync(path, "utf8");

test("the canonical OOKRST guide defines all five levels and ID schemes", () => {
  assert.ok(existsSync(GUIDE));
  const guide = read(GUIDE);
  for (const term of ["Opportunity", "Outcome", "Key Result", "Solution", "Test"]) assert.match(guide, new RegExp(term));
  for (const id of ["OPP-n", "OUT-n", "OUT-n-KR-n", "SOL-n", "TST-n"]) assert.ok(guide.includes(id), id);
});

test("generated templates carry every OOKRST level with parent links", () => {
  const dir = "generated/templates";
  assert.ok(!existsSync(`${dir}/experiment-file-template.md`), "experiment template was renamed to test-file-template.md");
  const opp = read(`${dir}/opportunity-file-template.md`);
  const cycle = read(`${dir}/okr-cycle-template.md`);
  const sol = read(`${dir}/solution-file-template.md`);
  const tst = read(`${dir}/test-file-template.md`);
  const rm = read(`${dir}/roadmap-item-template.md`);

  // Opportunity is the root: it has child Outcomes and no parent.
  assert.match(opp, /^id: OPP-/m);
  assert.match(opp, /^child_outcomes:/m);
  assert.doesNotMatch(opp, /^parent_/m);
  // The cycle file holds Outcomes and KRs, each with a parent link.
  assert.match(cycle, /### OUT-1:/);
  assert.match(cycle, /Parent Opportunity/);
  assert.match(cycle, /OUT-1-KR-1/);
  assert.match(cycle, /Parent Outcome/);
  // Solution is parented by a KR; Test by a Solution.
  assert.match(sol, /^parent_kr: OUT-\d+-KR-\d+/m);
  assert.match(tst, /^id: TST-/m);
  assert.match(tst, /^type: test$/m);
  assert.match(tst, /^parent_solution: SOL-/m);
  // Roadmap items link the Solution and KR.
  assert.match(rm, /^parent_solution: SOL-/m);
  assert.match(rm, /^parent_kr: OUT-\d+-KR-\d+/m);
  for (const contents of [opp, cycle, sol, tst, rm]) {
    assert.match(contents, /OOKRST/);
    assert.match(contents, /guides\/ookrst-structure\.md/);
    assert.doesNotMatch(contents, /\bEXP-\d|OBJ-\d|desired_outcome|ost-summary/);
  }
});

test("manifest and tests reference no stale experiment template", () => {
  assert.doesNotMatch(read("generated/skill-manifest.json"), /experiment-file-template/);
});

test("key skills and agents reference OOKRST", () => {
  for (const path of ["skills/okr-workflow/SKILL.md", "skills/ost-workflow/SKILL.md", "skills/experiment-workflow/SKILL.md", "skills/roadmap-workflow/SKILL.md", "agents/pm.md"]) {
    assert.match(read(path), /OOKRST/, path);
  }
  assert.match(read("agents/pm.md"), /guides\/ookrst-structure\.md/);
});

test("integration routing documents the OOKRST rule and keeps legacy capability keys", () => {
  const routing = read("skills/integration-routing/SKILL.md");
  assert.match(routing, /OOKRST/);
  assert.match(routing, /guides\/ookrst-structure\.md/);
  assert.match(routing, /`okrs`, `ost`, and `experiments`/);
  assert.match(read("skills/integration-routing/assets/pm-config-template.md"), /OOKRST/);
  assert.match(read("skills/pm-setup/SKILL.md"), /OOKRST/);
});
