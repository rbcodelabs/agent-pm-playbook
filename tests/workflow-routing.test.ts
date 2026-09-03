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

test("Compass-native review resolves both decision capabilities to tracking-only Compass decisions", () => {
  const profiles = loadWorkflowProfiles("skills/integration-routing/assets/workflow-profiles.json");
  const providers = profiles.profiles["compass-native-review"].providers;
  assert.equal(providers.review_requests, "compass_decisions");
  assert.equal(providers.decision_records, "compass_decisions");
  const adapter = readFileSync("skills/human-review-workflow/references/compass-decisions-adapter.md", "utf8");
  for (const tool of ["request_decision", "list_decisions", "get_decision"]) assert.match(adapter, new RegExp(`\\b${tool}\\b`));
  assert.match(adapter, /Approve.*Request changes.*Reject/is);
  assert.match(adapter, /NO_ACTION/);
  assert.match(adapter, /AWAITING_DECISION/);
  assert.match(adapter, /only.*human.*admin.*decide/is);
  assert.match(adapter, /does not expand.*authority/is);
  assert.match(adapter, /current revision/is);
  assert.match(adapter, /preserve.*history/is);
  assert.doesNotMatch(adapter, /NOW|signed[ -]policy|capacity/i);
});

test("tracking-only decisions stop for a human and never auto-apply approval", () => {
  const review = readFileSync("skills/human-review-workflow/SKILL.md", "utf8");
  assert.match(review, /tracking-only/i);
  assert.match(review, /create or reuse.*request/is);
  assert.match(review, /return `AWAITING_DECISION`.*end/is);
  assert.match(review, /approval.*does not.*auto/i);
  assert.match(review, /pre-existing authority/i);
  assert.match(review, /action-capable/i);
  for (const mode of ["Concept Direction", "Portfolio Admission", "Validation Authorization", "`NEXT` Admission"]) {
    const section = review.split(`— ${mode} Review`)[1]?.split(/\n## /)[0] ?? "";
    assert.match(section, /tracking-only/i, mode);
    assert.match(section, /stop/i, mode);
    assert.match(section, /action-capable/i, mode);
  }
});

test("affected scheduled workflows route judgment without widening execution authority", () => {
  for (const path of [
    "skills/roadmap-workflow/SKILL.md",
    "skills/compass-feedback-triage/SKILL.md",
    "skills/compass-resolver/SKILL.md",
    "skills/delivery-completion-watcher/SKILL.md",
    "Scheduled Product Operating System.md",
  ]) {
    const contents = readFileSync(path, "utf8");
    assert.match(contents, /configured (?:human-)?decision provider|resolved decision provider/i, path);
    assert.match(contents, /does not (?:expand|grant).*authority|existing authority boundary|pre-existing authority/i, path);
  }
  const roadmap = readFileSync("skills/roadmap-workflow/SKILL.md", "utf8");
  assert.match(roadmap, /tracking-only.*never dispatches/is);
  assert.match(roadmap, /only an action-capable adapter.*apply/is);
  const operatingSystem = readFileSync("Scheduled Product Operating System.md", "utf8");
  assert.match(operatingSystem, /tracking-only.*records and reports.*never starts/is);
  assert.match(operatingSystem, /tracking-only reviews.*NO_ACTION.*stop/is);
  assert.match(operatingSystem, /only action-capable reviews.*selection_mode/is);
  assert.doesNotMatch(operatingSystem, /same continuation semantics/i);
});

test("roadmap promotion never treats a tracking-only approval as mutation authority", () => {
  const roadmap = readFileSync("skills/roadmap-workflow/SKILL.md", "utf8");
  const promotion = roadmap.split("### Promoting an item")[1]?.split("## Procedure 3")[0] ?? "";
  assert.match(promotion, /tracking-only.*context only/is);
  assert.match(promotion, /cannot trigger.*queue mutation/is);
  assert.match(promotion, /action-capable adapter|separately established authority/i);
  assert.match(promotion, /re-read.*validation/is);
});

test("Compass request recovery uses the persisted idempotency key, never list discovery", () => {
  const adapter = readFileSync("skills/human-review-workflow/references/compass-decisions-adapter.md", "utf8");
  assert.match(adapter, /persist.*request ID/is);
  assert.match(adapter, /uncertain create response.*retry `request_decision`.*same.*idempotency/is);
  assert.match(adapter, /`list_decisions`.*never.*exact.*recover/is);
  assert.doesNotMatch(adapter, /use `list_decisions`.*reuse/is);
});

test("review contract keeps application fields out of tracking-only packets", () => {
  const contract = readFileSync("skills/human-review-workflow/references/review-contract.md", "utf8");
  assert.match(contract, /Minimal tracking-only packet/);
  assert.match(contract, /must not include.*application_status.*continuation_run_id.*applied_at/is);
  assert.match(contract, /Action-capable request fields/);
  assert.match(contract, /Action-capable decision record/);
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
  assert.match(resolver, /generic tracked decision is context, not an executable authorization/is);
  assert.doesNotMatch(resolver, /NEXT-promotion tier/);
  assert.doesNotMatch(resolver, /Feedback fallback tier/);
});
