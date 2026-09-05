import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const packRoot = "packs/compass";
const manifestPath = join(packRoot, "compass-pack.json");

type Manifest = {
  schemaVersion: number;
  id: string;
  version: string;
  sdkCompatibility: string;
  requiredHostCapabilities: string[];
  skills: Array<{ id: string; path: string; enabledByDefault?: boolean }>;
};

function manifest(): Manifest {
  return JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
}

function filesBelow(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? filesBelow(child) : [child];
  });
}

test("Compass cloud pack follows the v1 manifest and file contract", () => {
  const value = manifest();
  const expectedSkills = [
    "agentic-pm",
    "compass-workflow",
    "experiment-workflow",
    "integration-routing",
    "investment-gate",
    "okr-workflow",
    "ost-workflow",
    "pm-coach",
    "pm-signal-synthesis",
    "roadmap-workflow",
    "status-report-workflow",
  ];
  assert.equal(value.schemaVersion, 1);
  assert.equal(value.id, "agentic-pm-compass");
  assert.match(value.version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
  assert.ok(value.sdkCompatibility.length > 0);
  assert.deepEqual(value.requiredHostCapabilities, ["compass.product_state"]);
  assert.ok(value.skills.length > 0 && value.skills.length <= 20);
  assert.deepEqual(value.skills.map((skill) => skill.id).sort(), expectedSkills);
  assert.equal(new Set(value.skills.map((skill) => skill.id)).size, expectedSkills.length);
  assert.ok(value.skills.every((skill) => skill.enabledByDefault === true));

  const declared = new Set([manifestPath]);
  for (const skill of value.skills) {
    assert.match(skill.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(skill.path, `skills/${skill.id}/SKILL.md`);
    declared.add(join(packRoot, skill.path));
    const contents = readFileSync(join(packRoot, skill.path), "utf8");
    assert.match(contents, new RegExp(`^---[\\s\\S]*?\\nname:\\s*${skill.id}\\s*(?:\\n|$)`, "m"));
  }

  assert.deepEqual(filesBelow(packRoot).sort(), [...declared].sort());
  assert.ok(filesBelow(packRoot).reduce((total, path) => total + statSync(path).size, 0) <= 1024 * 1024);
  for (const path of filesBelow(packRoot)) assert.ok(statSync(path).size <= 256 * 1024, path);
});

test("interpretation and health checks do not imply mutation authority", () => {
  const experiment = readFileSync(join(packRoot, "skills/experiment-workflow/SKILL.md"), "utf8");
  assert.match(experiment, /separate explicit user request to (?:persist|log|conclude)/i);
  assert.match(experiment, /interpreting.*read-only/i);

  const ost = readFileSync(join(packRoot, "skills/ost-workflow/SKILL.md"), "utf8");
  assert.match(ost, /explicit user request before (?:archiving|changing).*status/i);
  assert.match(ost, /health check.*read-only/i);
});

test("cloud skills rely only on host-owned Compass context and tools", () => {
  const contents = manifest().skills
    .map((skill) => readFileSync(join(packRoot, skill.path), "utf8"))
    .join("\n");

  for (const forbidden of [
    /pm-config\.md/i,
    /\bcurl\b/i,
    /\bBash\b/i,
    /API[_ ]?key/i,
    /environment variable/i,
    /spawn.*agent/i,
    /sub-?agent/i,
    /Obsidian/i,
    /\bJira\b/i,
    /\bVercel\b/i,
    /https?:\/\//i,
    /write (?:a |the )?(?:file|Markdown)/i,
  ]) {
    assert.doesNotMatch(contents, forbidden);
  }

  assert.match(contents, /host-injected active workspace/i);
  assert.match(contents, /host-provided Compass MCP tools/i);
});

test("status reporting is read-only and archives only in conversation history", () => {
  const contents = readFileSync(join(packRoot, "skills/status-report-workflow/SKILL.md"), "utf8");
  assert.match(contents, /read-only/i);
  assert.match(contents, /assistant response/i);
  assert.match(contents, /conversation history/i);
  assert.match(contents, /only archive/i);
  assert.match(contents, /DATA UNAVAILABLE/);
});
