import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const CAPABILITIES = ["vision", "research_capture", "insights", "okrs", "ost", "experiments", "roadmap", "delivery", "reporting_archive"] as const;
export const REQUIRED_PROFILES = ["compass-full", "compass-obsidian-linear", "markdown-linear", "jpd-jira"] as const;
type Capability = (typeof CAPABILITIES)[number];
type Providers = Record<Capability, string>;
type ProfilesFile = { version: number; profiles: Record<string, { description: string; providers: Providers }> };

export function loadProfiles(path: string): ProfilesFile {
  return JSON.parse(readFileSync(resolve(path), "utf8")) as ProfilesFile;
}

export function validateProfiles(input: ProfilesFile): string[] {
  const errors: string[] = [];
  if (input.version !== 1) errors.push("version must be 1");
  if (!input.profiles || typeof input.profiles !== "object") return [...errors, "profiles must be an object"];
  for (const profile of REQUIRED_PROFILES) {
    if (!input.profiles[profile]) errors.push(`missing required profile ${profile}`);
  }
  for (const [name, profile] of Object.entries(input.profiles)) {
    if (!profile.description?.trim()) errors.push(`${name}: description is required`);
    for (const capability of CAPABILITIES) {
      if (!profile.providers?.[capability]?.trim()) errors.push(`${name}: missing provider for ${capability}`);
    }
    for (const capability of Object.keys(profile.providers ?? {})) {
      if (!CAPABILITIES.includes(capability as Capability)) errors.push(`${name}: unknown capability ${capability}`);
    }
  }
  return errors;
}

export function resolveProviders(input: ProfilesFile, profileName: string, overrides: Record<string, string>): Providers {
  const profile = input.profiles[profileName];
  if (!profile) throw new Error(`Unknown profile: ${profileName}`);
  for (const capability of Object.keys(overrides)) {
    if (!CAPABILITIES.includes(capability as Capability)) throw new Error(`Unknown capability: ${capability}`);
    if (!overrides[capability]?.trim()) throw new Error(`Provider override cannot be empty: ${capability}`);
  }
  return { ...profile.providers, ...overrides };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const profiles = loadProfiles(process.argv[2] ?? new URL("../assets/integration-profiles.json", import.meta.url).pathname);
  const errors = validateProfiles(profiles);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Validated ${Object.keys(profiles.profiles).length} profiles across ${CAPABILITIES.length} capabilities.`);
  }
}
