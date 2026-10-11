import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { validateScript } from "../skills/product-demo-video/engine/lib/script.mts";
import { cueTimeMs, parseAlignment } from "../skills/product-demo-video/engine/lib/cues.mts";
import { planScene, stretchedPauseMs, estimateNarrationMs } from "../skills/product-demo-video/engine/lib/timing.mts";
import { computeLayout, dockAppsFor } from "../skills/product-demo-video/engine/lib/layout.mts";
import { fill } from "../skills/product-demo-video/engine/lib/target.mts";
import { backdropHtml } from "../skills/product-demo-video/engine/lib/backdrop.mts";

const readJson = (path: string) => JSON.parse(readFileSync(path, "utf8"));
const template = () => readJson("skills/product-demo-video/assets/demo.config.template.json");
const profiles = readJson("skills/product-demo-video/assets/demo-profiles.json");

test("the bundled template and every environment profile validate", () => {
  assert.deepEqual(validateScript(template()), []);
  for (const [name, profile] of Object.entries<{ environment: unknown }>(profiles.recordRunners)) {
    assert.deepEqual(validateScript({ ...template(), environment: profile.environment }), [], name);
  }
});

test("validation rejects a cue that is not in the scene's narration", () => {
  const config = template();
  config.scenes[0].actions[1].cue = "words nobody says";
  assert.match(validateScript(config).join("\n"), /cue "words nobody says" does not appear/);
});

test("validation reports bad target, runner and voice settings together", () => {
  const config = template();
  config.target = { type: "mainframe" };
  config.environment = { record: { runner: "ssh" } };
  config.voice = { provider: "kazoo" };
  const text = validateScript(config).join("\n");
  assert.match(text, /target\.type/);
  assert.match(text, /target\.readySelector/);
  assert.match(text, /environment\.record\.host/);
  assert.match(text, /environment\.record\.remoteDir/);
  assert.match(text, /voice\.provider/);
});

test("the silent voice provider needs no model settings; elevenlabs does", () => {
  const silent = template();
  silent.voice = { provider: "none" };
  assert.deepEqual(validateScript(silent), []);
  const narrated = template();
  narrated.voice = { provider: "elevenlabs" };
  assert.match(validateScript(narrated).join("\n"), /voice\.modelId/);
});

test("cues resolve to the time the phrase starts, case-insensitively", () => {
  const text = "Press Command N to start";
  const alignment = parseAlignment({
    characters: [...text],
    character_start_times_seconds: [...text].map((_, i) => i * 0.1),
    character_end_times_seconds: [...text].map((_, i) => i * 0.1 + 0.1),
  });
  assert.equal(cueTimeMs(alignment, "command n"), 600);
  assert.throws(() => cueTimeMs(alignment, "missing phrase"), /not found/);
  assert.throws(() => parseAlignment({}), /no character alignment/);
});

test("scene planning slows, holds, or leaves the clip alone to match the narration", () => {
  const cfg = { leadMs: 400, tailMs: 700, maxSlowdown: 1.3 };
  assert.equal(planScene(20_000, 10_000, cfg).videoSpeed, 1);
  const slow = planScene(10_000, 11_000, cfg);
  assert.ok(slow.videoSpeed < 1 && slow.videoHoldMs === 0);
  const hold = planScene(5_000, 12_000, cfg);
  assert.equal(hold.videoSpeed, 1 / 1.3);
  assert.ok(hold.videoHoldMs > 0);
});

test("pauses stretch to fill the remaining budget but never past the cap", () => {
  const pause = { type: "pause", ms: 1000 } as const;
  assert.equal(stretchedPauseMs(1000, [pause]), 1000);
  assert.ok(stretchedPauseMs(5000, [pause]) > 1000);
  assert.ok(stretchedPauseMs(1_000_000, [pause]) <= 9000);
  assert.ok(estimateNarrationMs("one two three") > 0);
});

test("layout counts the dock tiles from the configured apps and drops chrome in plain style", () => {
  const base = template();
  const withDock = computeLayout(base);
  assert.ok(withDock.dock);
  const fewer = computeLayout({ ...base, look: { ...base.look, dockApps: ["Finder"] } });
  assert.ok(fewer.dock!.w < withDock.dock!.w);
  assert.equal(dockAppsFor({ ...base, look: { ...base.look, dockApps: ["Finder"] } }).length, 1);
  const plain = computeLayout({ ...base, look: { ...base.look, style: "plain" } });
  assert.equal(plain.dock, null);
  assert.ok(Math.abs(plain.windowY + plain.windowH / 2 - 540) <= 12, "plain style centres the window on the whole canvas");
});

test("the backdrop is self-contained HTML for the configured product", () => {
  const config = template();
  const html = backdropHtml(config, computeLayout(config), null, {});
  assert.match(html, /Acme Notes/);
  assert.doesNotMatch(html, /https?:\/\//);
  const plain = { ...config, look: { ...config.look, style: "plain" } };
  assert.doesNotMatch(backdropHtml(plain, computeLayout(plain), null, {}), /class="menubar"/);
});

test("fixture placeholders expand in strings, arrays and nested values", () => {
  const ctx = { fixtureDir: "/tmp/fx", userDataDir: "/tmp/ud" };
  assert.deepEqual(fill({ a: ["{{fixture}}/x"], b: { c: "{{userData}}" }, n: 3 }, ctx), { a: ["/tmp/fx/x"], b: { c: "/tmp/ud" }, n: 3 });
});

test("the skill is wired into the framework docs and ships its engine", () => {
  for (const file of ["engine/run.mts", "engine/record.mts", "engine/compose.mts", "engine/voiceover.mts", "engine/sync-report.mts", "engine/package.json", "scripts/vendor-engine.ts"]) {
    assert.ok(existsSync(`skills/product-demo-video/${file}`), file);
  }
  assert.match(readFileSync("README.md", "utf8"), /`product-demo-video`/);
  assert.match(readFileSync("skills/integration-routing/SKILL.md", "utf8"), /product_demo/);
  assert.match(readFileSync("skills/pm-setup/SKILL.md", "utf8"), /product_demo/);
});

test("nothing in the skill is tied to one team's machines, accounts or products", () => {
  const files = ["SKILL.md", "assets/demo.config.template.json", "assets/demo-profiles.json"];
  const forbidden = /dev-builder|rbcodelabs|geode|\/Users\/|Proxmox|192\.168\./i;
  for (const file of files) assert.doesNotMatch(readFileSync(`skills/product-demo-video/${file}`, "utf8"), forbidden, file);
});
