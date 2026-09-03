import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  WORKFLOW_CAPABILITIES,
  loadWorkflowProfiles,
  resolveWorkflowProviders,
  validateWorkflowProfiles,
} from "../skills/integration-routing/scripts/validate-workflow-profiles.ts";

const expectedWorkflowCapabilities = [
  "automation_runtime",
  "review_requests",
  "decision_records",
  "notifications",
  "prototype_artifacts",
  "product_analytics",
];

test("the workflow provider contract defines every required capability", () => {
  assert.deepEqual(WORKFLOW_CAPABILITIES, expectedWorkflowCapabilities);
});

test("all named workflow profiles are complete and valid", () => {
  const profiles = loadWorkflowProfiles("skills/integration-routing/assets/workflow-profiles.json");
  assert.deepEqual(validateWorkflowProfiles(profiles), []);
  assert.deepEqual(Object.keys(profiles.profiles).sort(), [
    "compass-native-review",
    "geode-obsidian-review",
    "local-markdown-review",
  ]);
  for (const profile of Object.values(profiles.profiles)) {
    assert.deepEqual(Object.keys(profile.providers).sort(), [...expectedWorkflowCapabilities].sort());
  }
});

test("workflow profile validation rejects missing profiles and capabilities", () => {
  const invalid = {
    version: 1,
    profiles: {
      "geode-obsidian-review": { description: "partial", providers: { automation_runtime: "geode" } },
    },
  };
  const errors = validateWorkflowProfiles(invalid as never);
  assert.ok(errors.some((error) => error.includes("missing required workflow profile local-markdown-review")));
  assert.ok(errors.some((error) => error.includes("missing provider for review_requests")));
});

test("workflow overrides replace defaults without mutating the profile", () => {
  const profiles = loadWorkflowProfiles("skills/integration-routing/assets/workflow-profiles.json");
  const original = profiles.profiles["geode-obsidian-review"].providers.notifications;
  const resolved = resolveWorkflowProviders(profiles, "geode-obsidian-review", { notifications: "slack" });
  assert.equal(resolved.notifications, "slack");
  assert.equal(resolved.review_requests, "obsidian");
  assert.equal(profiles.profiles["geode-obsidian-review"].providers.notifications, original);
  assert.throws(() => resolveWorkflowProviders(profiles, "missing", {}), /Unknown workflow profile/);
  assert.throws(
    () => resolveWorkflowProviders(profiles, "geode-obsidian-review", { unknown: "markdown" }),
    /Unknown workflow capability/,
  );
});

test("workflow validator can be imported without acting as the CLI", () => {
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", "import './skills/integration-routing/scripts/validate-workflow-profiles.ts'"],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
});

test("contract-v2 template exposes both independent routing layers", () => {
  const template = readFileSync("skills/integration-routing/assets/pm-config-template.md", "utf8");
  assert.match(template, /Contract version:\*\* 2/);
  assert.match(template, /Integration profile/);
  assert.match(template, /Workflow profile/);
  assert.match(template, /Workflow overrides/);
  for (const capability of expectedWorkflowCapabilities) {
    assert.match(template, new RegExp(`\\| ${capability} \\|`));
  }
  assert.match(template, /portfolio_policy:/);
  assert.match(template, /next_limit:/);
  assert.match(template, /concurrent_validation_limit:/);
  assert.match(template, /require_validated_solution_for_next: true/);
  assert.match(template, /require_displacement_when_full: true/);
  assert.match(template, /delivery_completion_policy:/);
  assert.match(template, /production_verification: required/);
  assert.match(template, /capacity_change_dispatch: roadmap_steward/);
});

test("Obsidian routing uses runtime-resolved vault-relative paths", () => {
  const routing = readFileSync("skills/integration-routing/SKILL.md", "utf8");
  const template = readFileSync("skills/integration-routing/assets/pm-config-template.md", "utf8");

  assert.match(routing, /runtime-provided vault root/i);
  assert.match(routing, /vault-relative/i);
  assert.match(routing, /scheduled prompts/i);
  assert.match(template, /current runtime-configured vault/i);
  assert.match(template, /vault-relative/i);
  assert.doesNotMatch(template, /\*\*Root:\*\*/);
  assert.doesNotMatch(template, /~\/Documents|\/Users\//);
});

test("human review skill is provider-neutral and ends unattended runs", () => {
  const skillPath = "skills/human-review-workflow/SKILL.md";
  const contents = readFileSync(skillPath, "utf8");
  assert.match(contents, /AWAITING_DECISION/);
  assert.match(contents, /Do not silently use Markdown,\s*Obsidian/is);
  assert.match(contents, /source_version/);
  assert.match(contents, /idempotency/i);
  assert.match(contents, /cannot authorize roadmap promotion or production implementation/i);
  for (const match of contents.matchAll(/\]\((references\/[^)]+)\)/g)) {
    assert.ok(existsSync(resolve(dirname(skillPath), match[1])), `missing review reference ${match[1]}`);
  }
  assert.ok(existsSync("skills/human-review-workflow/assets/review-request-template.md"));
  assert.ok(existsSync("skills/human-review-workflow/references/compass-native-pilot.md"));
});

test("Compass-native pilot uses Tasks for review without pretending Plan status is a generic decision record", () => {
  const profiles = loadWorkflowProfiles("skills/integration-routing/assets/workflow-profiles.json");
  const providers = profiles.profiles["compass-native-review"].providers;
  assert.equal(providers.review_requests, "compass_tasks");
  assert.equal(providers.decision_records, "compass_solution_plan_status");
  const adapter = readFileSync("skills/human-review-workflow/references/compass-native-pilot.md", "utf8");
  assert.match(adapter, /concept-direction selection, portfolio admission,\s*validation authorization, or exact `NEXT` admission/is);
  assert.match(adapter, /does not satisfy the immutable\s+generic decision-record contract/is);
  assert.match(adapter, /Do not update\s+it to `VALIDATED`, promote it to the roadmap, create delivery\s+tasks, or write code/is);
  assert.match(adapter, /execution collision/i);
  assert.match(adapter, /automation_runtime/);
  assert.match(adapter, /ALREADY_IN_PROGRESS/);
  assert.match(adapter, /selection_mode: single/);
  assert.match(adapter, /selection_mode: multiple/);
  assert.match(adapter, /horizon to `LATER`/);
  assert.match(adapter, /validation_design/);
  assert.match(adapter, /Leave the linked Roadmap Item in `LATER`/);
  assert.match(adapter, /the proposed after-count does not exceed `next_limit`/);
  assert.match(adapter, /make no additive promotion/);
  assert.match(adapter, /Reconcile an open review/);
  assert.match(adapter, /whole parent Opportunity/);
  assert.match(adapter, /apply nothing/i);
  assert.match(adapter, /`IN_REVIEW` means open for edits and `DONE` means finalized/);
  assert.match(adapter, /`DONE` without an application receipt/);
});

test("review contract requires stale-decision and duplicate-application protection", () => {
  const contract = readFileSync("skills/human-review-workflow/references/review-contract.md", "utf8");
  assert.match(contract, /source_version/);
  assert.match(contract, /Applying the request twice produces no duplicate state transition/);
  assert.match(contract, /stale source version supersedes/i);
  assert.match(contract, /never delivery/i);
  assert.match(contract, /selection_mode/);
  assert.match(contract, /roadmap_candidate/);
  assert.match(contract, /validation_design/);
  assert.match(contract, /roadmap_admission/);
  assert.match(contract, /every displacement required when full/);
  assert.match(contract, /response_finalized_at/);
  assert.match(contract, /Do not rely only on a parent object's `updatedAt`/);
});

test("roadmap stewardship separates validation from capacity-ranked delivery admission", () => {
  const roadmap = readFileSync("skills/roadmap-workflow/SKILL.md", "utf8");
  const operatingSystem = readFileSync("Scheduled Product Operating System.md", "utf8");
  const compass = readFileSync("skills/compass-workflow/SKILL.md", "utf8");

  for (const contents of [roadmap, operatingSystem, compass]) {
    assert.match(contents, /`VALIDATED`/);
    assert.match(contents, /next_limit/);
    assert.match(contents, /displac/i);
  }

  assert.match(roadmap, /Validation approval by itself never runs this procedure; the item remains in `LATER`/);
  assert.match(operatingSystem, /Approval to validate likewise leaves the candidate in `LATER`/);
  assert.match(compass, /Approving validation never changes a roadmap horizon/);
  assert.match(roadmap, /Scheduled Roadmap Steward/);
  assert.match(roadmap, /VALIDATE_IN_LATER/);
  assert.match(roadmap, /compare it with every `NEXT` item/);
  assert.match(operatingSystem, /ADMIT_TO_NEXT_AT_RANK/);
  assert.match(operatingSystem, /Missing capacity or ordering data means keep `LATER`/);
  assert.match(compass, /Missing capacity or ordering data\s+means keep `LATER`/is);
});

test("Compass intake and delivery no longer bypass human investment gates", () => {
  const triage = readFileSync("skills/compass-feedback-triage/SKILL.md", "utf8");
  const resolver = readFileSync("skills/compass-resolver/SKILL.md", "utf8");
  assert.match(triage, /Intake does not add a solution, solution plan, assumption, or\s+roadmap item/is);
  assert.match(triage, /human-review-workflow/);
  assert.match(resolver, /It never promotes NEXT items or raw\s+feedback/is);
  assert.match(resolver, /applied Building-investment and\s+`NOW`-commitment decision/is);
  assert.doesNotMatch(resolver, /NEXT-promotion tier/);
  assert.doesNotMatch(resolver, /Feedback fallback tier/);
});
