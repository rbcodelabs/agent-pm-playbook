import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const CAPABILITIES = ["vision", "research_capture", "insights", "okrs", "ost", "experiments", "roadmap", "delivery", "reporting_archive"] as const;
// OOKRST (Opportunity -> Outcome -> KR -> Solution -> Test, see guides/ookrst-structure.md) is one tree.
// The capability keys `okrs` (Outcomes + KRs), `ost` (Opportunities + Solutions + assumptions) and
// `experiments` (Tests) jointly resolve it, so they must share one provider family; otherwise the
// parent chain would be split across systems. A family is the provider id up to its first underscore
// (compass_okrs and compass_discovery are both "compass"; jpd_goals and jpd are both "jpd").
export const OOKRST_CAPABILITIES = ["okrs", "ost", "experiments"] as const;
export const REQUIRED_PROFILES = ["compass-full", "compass-obsidian-linear", "markdown-linear", "jpd-jira"] as const;
type Capability = (typeof CAPABILITIES)[number];
type Providers = Record<Capability, string>;
type ProfilesFile = { version: number; profiles: Record<string, { description: string; providers: Providers }> };

export function providerFamily(provider: string): string {
  return provider.trim().split("_")[0];
}

export function splitOokrstProviders(providers: Partial<Record<string, string>>): string[] {
  const families = new Set<string>();
  for (const capability of OOKRST_CAPABILITIES) {
    const provider = providers[capability];
    if (provider?.trim()) families.add(providerFamily(provider));
  }
  return families.size > 1 ? [...OOKRST_CAPABILITIES].map((capability) => `${capability}=${providers[capability]}`) : [];
}

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
    const split = splitOokrstProviders(profile.providers ?? {});
    if (split.length) errors.push(`${name}: okrs, ost, and experiments must share one provider so the OOKRST parent chain is not split (${split.join(", ")})`);
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
  const resolved = { ...profile.providers, ...overrides } as Providers;
  if (splitOokrstProviders(resolved).length) {
    throw new Error("okrs, ost, and experiments must resolve to one provider so the OOKRST parent chain is not split; override all three together");
  }
  return resolved;
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
