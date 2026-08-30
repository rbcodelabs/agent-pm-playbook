import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { CAPABILITIES, loadProfiles, resolveProviders, validateProfiles } from "../skills/integration-routing/scripts/validate-integration-profiles.ts";

const expectedCapabilities = ["vision", "research_capture", "insights", "okrs", "ost", "experiments", "roadmap", "delivery", "reporting_archive"];

test("the provider contract defines every required capability", () => {
  assert.deepEqual(CAPABILITIES, expectedCapabilities);
});

test("all named profiles are complete and valid", () => {
  const profiles = loadProfiles("skills/integration-routing/assets/integration-profiles.json");
  assert.deepEqual(validateProfiles(profiles), []);
  assert.deepEqual(Object.keys(profiles.profiles).sort(), ["compass-full", "compass-obsidian-linear", "jpd-jira", "markdown-linear"]);
  for (const profile of Object.values(profiles.profiles)) {
    assert.deepEqual(Object.keys(profile.providers).sort(), [...expectedCapabilities].sort());
  }
});

test("validation rejects missing named profiles and incomplete capability maps", () => {
  const invalid = { version: 1, profiles: { "compass-full": { description: "partial", providers: { vision: "compass_docs" } } } };
  const errors = validateProfiles(invalid as never);
  assert.ok(errors.some((error) => error.includes("missing required profile markdown-linear")));
  assert.ok(errors.some((error) => error.includes("compass-full: missing provider for delivery")));
});

test("validator can be imported from an eval process without acting as the CLI", () => {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", "import './skills/integration-routing/scripts/validate-integration-profiles.ts'"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
});

test("compass-full includes docs, research, insights, and Compass Tasks", () => {
  const profiles = loadProfiles("skills/integration-routing/assets/integration-profiles.json");
  const providers = profiles.profiles["compass-full"].providers;
  assert.equal(providers.vision, "compass_docs");
  assert.equal(providers.research_capture, "compass_research");
  assert.equal(providers.insights, "compass_feedback");
  assert.equal(providers.delivery, "compass_tasks");
});

test("per-capability overrides replace defaults without mutating the profile", () => {
  const profiles = loadProfiles("skills/integration-routing/assets/integration-profiles.json");
  const original = profiles.profiles["compass-full"].providers.delivery;
  const resolved = resolveProviders(profiles, "compass-full", { delivery: "linear" });
  assert.equal(resolved.delivery, "linear");
  assert.equal(resolved.okrs, "compass_okrs");
  assert.equal(profiles.profiles["compass-full"].providers.delivery, original);
  assert.throws(() => resolveProviders(profiles, "missing", {}), /Unknown profile/);
  assert.throws(() => resolveProviders(profiles, "compass-full", { unknown: "markdown" }), /Unknown capability/);
});

test("every affected domain skill contains the shared provider preflight", () => {
  const paths = ["skills/okr-workflow/SKILL.md", "skills/ost-workflow/SKILL.md", "skills/pm-signal-synthesis/SKILL.md", "skills/experiment-workflow/SKILL.md", "skills/roadmap-workflow/SKILL.md", "skills/status-report-workflow/SKILL.md"];
  for (const path of paths) {
    const contents = readFileSync(path, "utf8");
    assert.match(contents, /## Provider Preflight/, path);
    assert.match(contents, /exactly one authoritative provider/i, path);
  }
});

test("setup scenarios document profile-specific scaffolding and the full delivery flow", () => {
  const scenarios = readFileSync("tests/scenarios/integration-profile-scenarios.md", "utf8");
  for (const profile of ["compass-full", "compass-obsidian-linear", "markdown-linear", "jpd-jira"]) {
    assert.match(scenarios, new RegExp(`## ${profile}`));
  }
  assert.match(scenarios, /insight.*OST.*experiment.*roadmap.*delivery/is);
  assert.match(scenarios, /compass-full[\s\S]*does not create `product\/`/);
});

test("setup and generated config implement provider-aware scaffolding", () => {
  const setup = readFileSync("skills/pm-setup/SKILL.md", "utf8");
  const template = readFileSync("skills/integration-routing/assets/pm-config-template.md", "utf8");
  assert.match(setup, /`compass-full` creates no `product\/` tree/);
  assert.match(setup, /Migration updates routing only; it never moves, copies, or deletes live records/);
  assert.match(template, /Integration profile/);
  assert.match(template, /Provider overrides/);
  for (const capability of expectedCapabilities) assert.match(template, new RegExp(`\\| ${capability} \\|`));
});

test("Compass guidance covers full-stack and hybrid ownership", () => {
  const compass = readFileSync("skills/compass-workflow/SKILL.md", "utf8");
  const guide = readFileSync("PM Tool Integration Guide.md", "utf8");
  for (const term of ["Compass Docs", "Compass Tasks", "compass_research", "compass_feedback"]) {
    assert.match(compass, new RegExp(term));
  }
  assert.match(guide, /Compass can be the complete product operating system/);
  assert.match(guide, /Compass Tasks in `compass-full`/);
});

test("installed skills have self-contained routing resources", () => {
  const setup = readFileSync("setup.sh", "utf8");
  assert.match(setup, /for skill_dir in "\$REPO_DIR\/skills"\/\*\//);
  for (const path of ["skills/integration-routing/SKILL.md", "skills/integration-routing/assets/integration-profiles.json", "skills/integration-routing/assets/integration-profiles.schema.json", "skills/integration-routing/assets/workflow-profiles.json", "skills/integration-routing/assets/workflow-profiles.schema.json", "skills/integration-routing/assets/pm-config-template.md", "skills/integration-routing/scripts/validate-integration-profiles.ts", "skills/integration-routing/scripts/validate-workflow-profiles.ts"]) assert.doesNotThrow(() => readFileSync(path));
  for (const path of ["skills/pm-setup/SKILL.md", "skills/okr-workflow/SKILL.md", "skills/ost-workflow/SKILL.md", "skills/pm-signal-synthesis/SKILL.md", "skills/experiment-workflow/SKILL.md", "skills/roadmap-workflow/SKILL.md", "skills/status-report-workflow/SKILL.md"]) {
    const contents = readFileSync(path, "utf8");
    assert.doesNotMatch(contents, /(?:\.\.\/\.\.\/)?(?:generated|docs|config)\//, path);
    for (const match of contents.matchAll(/\]\((\.\.\/integration-routing\/[^)]+)\)/g)) {
      assert.ok(existsSync(resolve(dirname(path), match[1])), `${path}: missing installed resource ${match[1]}`);
    }
  }
});

test("status reports resolve capabilities instead of requiring stack parameters", () => {
  const report = readFileSync("skills/status-report-workflow/SKILL.md", "utf8");
  assert.doesNotMatch(report, /\| Roadmap\/OKR source \|/);
  assert.doesNotMatch(report, /\| Issue tracker \|/);
  assert.match(report, /resolve `roadmap`, `okrs`, `ost`, `insights`, `delivery`, and `reporting_archive` independently/);
  assert.match(report, /`compass_tasks`/);
  assert.match(report, /Legacy compatibility inputs/);
});

test("pm-setup uses installed routing validation without locating the repository", () => {
  const setup = readFileSync("skills/pm-setup/SKILL.md", "utf8");
  assert.doesNotMatch(setup, /npm run validate/);
  assert.match(setup, /integration-routing/);
  assert.match(setup, /validate-integration-profiles\.ts/);
  assert.match(setup, /validate-workflow-profiles\.ts/);
});
