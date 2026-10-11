#!/usr/bin/env node
/**
 * Copy the demo engine into a product repo and create a starter config.
 *
 *   node skills/product-demo-video/scripts/vendor-engine.ts <product-repo>/demo
 *
 * Creates <dir>/engine/ (the pipeline) and <dir>/demo.config.json (from the template)
 * unless they exist. Re-running refreshes engine/ and never touches your config.
 * Then: npm install --prefix <dir>/engine, edit the config, run `node <dir>/engine/run.mts doctor`.
 */
import { cpSync, existsSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const target = process.argv[2];
if (!target) {
  console.error("usage: vendor-engine.ts <product-repo>/demo");
  process.exit(2);
}
const skillDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dest = resolve(target);
mkdirSync(dest, { recursive: true });

const engineDest = join(dest, "engine");
// Refresh the engine but keep the installed dependencies so a re-vendor does not force a reinstall.
if (existsSync(engineDest)) {
  for (const entry of ["lib"]) rmSync(join(engineDest, entry), { recursive: true, force: true });
}
cpSync(join(skillDir, "engine"), engineDest, { recursive: true, filter: (src) => !src.includes("node_modules") });
console.log(`engine  -> ${engineDest}`);

const config = join(dest, "demo.config.json");
if (existsSync(config)) console.log(`config  exists, left untouched: ${config}`);
else {
  copyFileSync(join(skillDir, "assets", "demo.config.template.json"), config);
  console.log(`config  -> ${config} (edit it: target, scenes, voice)`);
}
