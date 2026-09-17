import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

type Identity = { projectId: string; workspaceId: string; repository: string };

/**
 * Deliberately minimal: no package digest, no receipt/lease store, no worker-identity
 * bookkeeping. Drift is detected by comparing immutable plan doc version IDs (a version
 * is never edited in place; editing the plan creates a new version ID). This evaluator only
 * answers "does a current, verified human approval authorize this exact scope, and is there
 * a delivery slot for it" — claiming and resuming work reuse the caller's existing Step 2
 * mechanism (title-prefix + Opportunity ACTIVE + GitHub PR cross-check), identically for
 * opted-in and legacy items, so there is no separate execution state to track here.
 */
export type AuthorizationSnapshot = {
  policy: Identity & { enabled: boolean; version: string; activatedAt: string };
  package: Identity & {
    id: string; purpose: "build-authorization-v1"; policyVersion: string;
    planDocId: string; planDocVersionId: string;
    roadmapItemId: string; displacedItemId: string | null;
    preparedAt: string; expiresAt: string;
  };
  decision: null | (Identity & {
    purpose: "build-authorization-v1"; packageId: string; planDocVersionId: string;
    outcome: "pending" | "approved" | "rejected" | "changes_requested";
    humanVerified: boolean; decidedAt: string | null; revoked: boolean; superseded: boolean;
  });
  current: Identity & {
    now: string; planDocVersionId: string;
    evidenceReady: boolean; designReady: boolean; dependenciesReady: boolean;
    activeItemIds: string[]; capacityLimit: number;
  };
};
export type AuthorizationResult = {
  state: "READY" | "AWAITING_DECISION" | "BLOCKED";
  reason: string;
  actions: string[];
};

const record = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const nonempty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(nonempty) && new Set(v).size === v.length;
const timestamp = (v: unknown): number => typeof v === "string" && /^\d{4}-\d\d-\d\dT.*(?:Z|[+-]\d\d:\d\d)$/.test(v) ? Date.parse(v) : NaN;
const blocked = (reason: string): AuthorizationResult => ({ state: "BLOCKED", reason, actions: [] });
const identityFields = ["projectId", "workspaceId", "repository"] as const;

/** Evaluate verified, freshly read provider snapshots; this function grants no authority itself. */
export function evaluateAuthorization(input: unknown): AuthorizationResult {
  if (!record(input) || !record(input.policy) || !record(input.package) || !record(input.current)) return blocked("missing policy, package, or current snapshot");
  const { policy: p, package: b, current: c } = input;
  if (p.enabled !== true || !nonempty(p.version)) return blocked("standing execution policy is not explicitly enabled");
  for (const field of identityFields) {
    if (!nonempty(b[field]) || p[field] !== b[field] || c[field] !== b[field]) return blocked(`${field} does not match the policy and current project`);
  }
  if (b.purpose !== "build-authorization-v1" || b.policyVersion !== p.version) return blocked("wrong build purpose or policy version");
  for (const field of ["id", "planDocId", "planDocVersionId", "roadmapItemId"]) {
    if (!nonempty(b[field])) return blocked(`package is missing ${field}`);
  }
  if (b.displacedItemId !== null && !nonempty(b.displacedItemId)) return blocked("displacedItemId must be a non-empty string or null");

  const now = timestamp(c.now), activated = timestamp(p.activatedAt), prepared = timestamp(b.preparedAt), expires = timestamp(b.expiresAt);
  if (![now, activated, prepared, expires].every(Number.isFinite) || activated > now || prepared < activated || prepared > now || expires <= now || expires <= prepared) return blocked("invalid, historical, future, or expired authorization timestamps");
  if (!nonempty(c.planDocVersionId) || c.planDocVersionId !== b.planDocVersionId) return blocked("plan has changed since the package was prepared");
  for (const field of ["evidenceReady", "designReady", "dependenciesReady"]) {
    if (c[field] !== true) return blocked(`${field} is not verified`);
  }
  if (!strings(c.activeItemIds) || typeof c.capacityLimit !== "number" || !Number.isInteger(c.capacityLimit) || c.capacityLimit < 1) return blocked("invalid capacity snapshot");

  const d = input.decision;
  if (d === null) return { state: "AWAITING_DECISION", reason: "build request has no decision", actions: [] };
  if (!record(d)) return blocked("missing decision snapshot; use explicit null for no decision");
  if (identityFields.some(field => d[field] !== b[field]) || d.purpose !== "build-authorization-v1" || d.packageId !== b.id) return blocked("decision does not match the exact build package");
  if (d.revoked !== false || d.superseded !== false) return blocked("authorization is revoked, superseded, or its status is unknown");
  if (d.outcome === "pending") return { state: "AWAITING_DECISION", reason: "build request is awaiting human approval", actions: [] };
  const decided = timestamp(d.decidedAt);
  if (d.outcome !== "approved" || d.humanVerified !== true || !Number.isFinite(decided) || decided < activated || decided < prepared || decided > now) return blocked("no current verified human approval after policy activation and package preparation");
  if (d.planDocVersionId !== b.planDocVersionId) return blocked("approved plan version no longer matches the current package");

  const candidate = b.roadmapItemId, active = c.activeItemIds, displaced = b.displacedItemId;
  const alreadyActive = active.includes(candidate);
  if (!alreadyActive) {
    if (displaced !== null) {
      if (!active.includes(displaced)) return blocked("named displacement item is not currently active");
    } else if (active.length >= c.capacityLimit) {
      return blocked("no delivery capacity available for the approved admission");
    }
  }
  return {
    state: "READY",
    reason: "current verified build approval satisfies the standing execution policy",
    actions: [...(alreadyActive ? [] : ["roadmap:ADMIT_NOW"]), "delivery:CLAIM_AND_BUILD_TO_PR"],
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const input = JSON.parse(readFileSync(process.argv[2] ?? 0, "utf8"));
    process.stdout.write(`${JSON.stringify(evaluateAuthorization(input), null, 2)}\n`);
  } catch (error) {
    process.stdout.write(`${JSON.stringify(blocked(`cannot read authorization snapshot: ${error instanceof Error ? error.message : String(error)}`), null, 2)}\n`);
    process.exitCode = 1;
  }
}
