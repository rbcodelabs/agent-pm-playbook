#!/usr/bin/env node
/**
 * Validate a demo.config.json against the engine's contract.
 *
 *   node skills/product-demo-video/scripts/validate-demo-config.ts <demo.config.json>...
 *
 * With no arguments it validates the bundled template and every environment
 * profile merged into it, which is what `npm run validate` runs.
 */
import { readFileSync } from "node:fs";
import { validateScript } from "../engine/lib/script.mts";

const here = new URL("../assets/", import.meta.url);
const read = (file: string | URL) => JSON.parse(readFileSync(file, "utf8"));

function check(label: string, config: unknown): number {
  const errors = validateScript(config);
  if (errors.length === 0) {
    console.log(`ok    ${label}`);
    return 0;
  }
  console.log(`FAIL  ${label}\n      - ${errors.join("\n      - ")}`);
  return 1;
}

let failures = 0;
const files = process.argv.slice(2);
if (files.length > 0) {
  for (const file of files) failures += check(file, read(file));
} else {
  const template = read(new URL("demo.config.template.json", here));
  const profiles = read(new URL("demo-profiles.json", here));
  failures += check("demo.config.template.json", template);
  for (const [name, profile] of Object.entries<{ environment: unknown }>(profiles.recordRunners)) {
    failures += check(`template + profile ${name}`, { ...template, environment: profile.environment });
  }
}
process.exit(failures ? 1 : 0);
