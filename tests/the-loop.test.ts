import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const GUIDE = "guides/the-loop.md";
const read = (path: string) => readFileSync(path, "utf8");

test("the canonical Loop guide defines all five levels and ID schemes", () => {
  assert.ok(existsSync(GUIDE));
  const guide = read(GUIDE);
  for (const term of ["Opportunity", "Outcome", "Key Result", "Solution", "Test"]) assert.match(guide, new RegExp(term));
  for (const id of ["OPP-n", "OUT-n", "OUT-n-KR-n", "SOL-n", "TST-n"]) assert.ok(guide.includes(id), id);
});

test("generated templates carry every Loop level with parent links", () => {
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
    assert.match(contents, /Loop/);
    assert.match(contents, /guides\/the-loop\.md/);
    assert.doesNotMatch(contents, /\bEXP-\d|OBJ-\d|desired_outcome|ost-summary/);
  }
});

test("manifest and tests reference no stale experiment template", () => {
  assert.doesNotMatch(read("generated/skill-manifest.json"), /experiment-file-template/);
});

test("key skills and agents reference Loop", () => {
  for (const path of ["skills/loop-workflow/SKILL.md", "skills/experiment-workflow/SKILL.md", "skills/roadmap-workflow/SKILL.md", "agents/pm.md"]) {
    assert.match(read(path), /Loop/, path);
  }
  assert.match(read("agents/pm.md"), /guides\/the-loop\.md/);
});

test("integration routing documents the Loop rule and the single loop capability key", () => {
  const routing = read("skills/integration-routing/SKILL.md");
  assert.match(routing, /Loop/);
  assert.match(routing, /guides\/the-loop\.md/);
  assert.match(routing, /`loop` and `experiments` must resolve to the same provider family/);
  assert.doesNotMatch(routing, /`okrs`|`ost`/);
  assert.match(read("skills/integration-routing/assets/pm-config-template.md"), /Loop/);
  assert.match(read("skills/pm-setup/SKILL.md"), /Loop/);
});

test("the Loop guide closes the loop and keeps the previous OOKRST name searchable", () => {
  const guide = read(GUIDE);
  assert.match(guide, /## Closing the loop/);
  assert.match(guide, /Previously called the OOKRST structure/);
  for (const path of ["skills/loop-workflow/SKILL.md", "skills/experiment-workflow/SKILL.md", "Agentic PM Playbook.md"]) {
    assert.match(read(path), /Closing the loop|Close the loop/, path);
  }
  assert.ok(!existsSync("guides/ookrst-structure.md"));
});

test("one loop-workflow skill replaces the separate OST and OKR skills", () => {
  for (const root of ["skills", "packs/compass/skills"]) {
    assert.ok(existsSync(`${root}/loop-workflow/SKILL.md`), root);
    assert.ok(!existsSync(`${root}/ost-workflow`), `${root}/ost-workflow`);
    assert.ok(!existsSync(`${root}/okr-workflow`), `${root}/okr-workflow`);
  }
  const skill = read("skills/loop-workflow/SKILL.md");
  for (const heading of ["## Part 1: Build the Tree", "## Part 2: Tree Health Checks", "## Part 3: Outcome and KR Cycle", "## Part 4: Closing the Loop", "## Part 5: Convert Legacy OKR/OST Data"]) {
    assert.ok(skill.includes(heading), heading);
  }
  assert.match(skill, /experiment-workflow/);
  // Old terms remain only as routing aliases in the description and retrieval block.
  assert.match(skill, /OKR/);
  assert.match(skill, /opportunity solution tree/);
});
