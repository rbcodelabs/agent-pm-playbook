import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const WORKFLOW_CAPABILITIES = [
  "automation_runtime",
  "review_requests",
  "decision_records",
  "notifications",
  "prototype_artifacts",
  "product_analytics",
] as const;

export const REQUIRED_WORKFLOW_PROFILES = [
  "compass-native-review",
  "geode-obsidian-review",
  "local-markdown-review",
] as const;

type WorkflowCapability = (typeof WORKFLOW_CAPABILITIES)[number];
type WorkflowProviders = Record<WorkflowCapability, string>;
type WorkflowProfilesFile = {
  version: number;
  profiles: Record<string, { description: string; providers: WorkflowProviders }>;
};

export function loadWorkflowProfiles(path: string): WorkflowProfilesFile {
  return JSON.parse(readFileSync(resolve(path), "utf8")) as WorkflowProfilesFile;
}

export function validateWorkflowProfiles(input: WorkflowProfilesFile): string[] {
  const errors: string[] = [];
  if (input.version !== 1) errors.push("version must be 1");
  if (!input.profiles || typeof input.profiles !== "object") return [...errors, "profiles must be an object"];
  for (const profile of REQUIRED_WORKFLOW_PROFILES) {
    if (!input.profiles[profile]) errors.push(`missing required workflow profile ${profile}`);
  }
  for (const [name, profile] of Object.entries(input.profiles)) {
    if (!profile.description?.trim()) errors.push(`${name}: description is required`);
    for (const capability of WORKFLOW_CAPABILITIES) {
      if (!profile.providers?.[capability]?.trim()) errors.push(`${name}: missing provider for ${capability}`);
    }
    for (const capability of Object.keys(profile.providers ?? {})) {
      if (!WORKFLOW_CAPABILITIES.includes(capability as WorkflowCapability)) {
        errors.push(`${name}: unknown workflow capability ${capability}`);
      }
    }
  }
  return errors;
}

export function resolveWorkflowProviders(
  input: WorkflowProfilesFile,
  profileName: string,
  overrides: Record<string, string>,
): WorkflowProviders {
  const profile = input.profiles[profileName];
  if (!profile) throw new Error(`Unknown workflow profile: ${profileName}`);
  for (const capability of Object.keys(overrides)) {
    if (!WORKFLOW_CAPABILITIES.includes(capability as WorkflowCapability)) {
      throw new Error(`Unknown workflow capability: ${capability}`);
    }
    if (!overrides[capability]?.trim()) throw new Error(`Workflow provider override cannot be empty: ${capability}`);
  }
  return { ...profile.providers, ...overrides };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const profiles = loadWorkflowProfiles(
    process.argv[2] ?? new URL("../assets/workflow-profiles.json", import.meta.url).pathname,
  );
  const errors = validateWorkflowProfiles(profiles);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Validated ${Object.keys(profiles.profiles).length} workflow profiles across ${WORKFLOW_CAPABILITIES.length} capabilities.`,
    );
  }
}
