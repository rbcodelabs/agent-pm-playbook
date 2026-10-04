import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const readJson = (path: string) => JSON.parse(readFileSync(path, "utf8"));
const plugin = readJson(".claude-plugin/plugin.json");
const marketplace = readJson(".claude-plugin/marketplace.json");

function frontmatter(path: string): Record<string, string> {
  const match = readFileSync(path, "utf8").match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path}: missing frontmatter`);
  const fields: Record<string, string> = {};
  let key: string | undefined;
  for (const line of match[1].split("\n")) {
    const top = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (top) {
      key = top[1];
      fields[key] = /^[>|][-+]?$/.test(top[2]) ? "" : top[2].trim();
    } else if (key && /^\s+\S/.test(line) && !line.match(/^\s+[\w-]+:\s/)) {
      fields[key] = `${fields[key]} ${line.trim()}`.trim();
    }
  }
  return fields;
}

test("plugin.json lists exactly the agents in agents/*.md", () => {
  const onDisk = readdirSync("agents").filter((f) => f.endsWith(".md")).map((f) => `./agents/${f}`).sort();
  assert.deepEqual([...plugin.agents].sort(), onDisk);
  for (const path of plugin.agents) assert.ok(existsSync(path), path);
});

test("plugin.json uses directory discovery for skills and no hand-maintained skill list", () => {
  assert.equal(plugin.skills, "./skills/");
  assert.equal(plugin.skillsList, undefined, "skillsList is unsupported and drifts; skills are discovered from skills/");
});

test("every skill and agent has frontmatter name and description", () => {
  const skills = readdirSync("skills", { withFileTypes: true }).filter((d) => d.isDirectory());
  assert.ok(skills.length > 0);
  for (const dir of skills) {
    const path = `skills/${dir.name}/SKILL.md`;
    assert.ok(existsSync(path), `${path} missing`);
    const fm = frontmatter(path);
    assert.equal(fm.name, dir.name, `${path}: name must match directory`);
    assert.ok(fm.description, `${path}: description required`);
  }
  for (const file of readdirSync("agents").filter((f) => f.endsWith(".md"))) {
    const fm = frontmatter(`agents/${file}`);
    assert.equal(fm.name, file.replace(/\.md$/, ""), `agents/${file}: name must match filename`);
    assert.ok(fm.description, `agents/${file}: description required`);
  }
});

test("plugin and marketplace manifests agree on identity, owner, repository, and version", () => {
  assert.equal(marketplace.plugins.length, 1);
  const entry = marketplace.plugins[0];
  assert.equal(entry.name, plugin.name);
  assert.equal(entry.version, plugin.version);
  assert.equal(entry.repository, plugin.repository);
  assert.equal(entry.license, plugin.license);
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
  assert.equal(entry.source, "./");
  const owner = new URL(plugin.repository).pathname.split("/")[1];
  assert.equal(plugin.repository, `https://github.com/${owner}/agent-pm-playbook`);
  assert.equal(plugin.author.url, `https://github.com/${owner}`);
  assert.equal(marketplace.owner.url, `https://github.com/${owner}`);
  assert.equal(marketplace.name, owner);
});

test("the legacy .plugin manifest and setup.sh installer are gone", () => {
  assert.equal(existsSync(".plugin"), false);
  assert.equal(existsSync("setup.sh"), false);
});
