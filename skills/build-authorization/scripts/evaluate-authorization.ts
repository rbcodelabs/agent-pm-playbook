import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

type Identity = { projectId: string; workspaceId: string; repository: string };
export type AuthorizationSnapshot = {
  policy: Identity & { enabled: boolean; version: string; activatedAt: string };
  package: Identity & {
    id: string; purpose: "build-authorization-v1"; digest: string; policyVersion: string;
    requestId: string; decisionRevision: string; preparedAt: string; expiresAt: string;
    ownerId: string; capacitySlot: string; displacedItemIds: string[]; maxHours: number; maxSpend: number;
    roadmapItemId: string; activeItemIdsBefore: string[]; capacityLimit: number;
  };
  decision: null | (Identity & {
    purpose: "build-authorization-v1"; requestId: string; revision: string;
    packageId: string; packageDigest: string; outcome: "pending" | "approved" | "rejected" | "changes_requested";
    humanVerified: boolean; decidedAt: string | null; revoked: boolean; superseded: boolean;
  });
  current: Identity & {
    now: string; packageDigest: string; ownerId: string; capacitySlot: string;
    displacedItemIds: string[]; activeCount: number; capacityLimit: number;
    roadmapItemId: string; activeItemIds: string[];
    evidenceReady: boolean; designReady: boolean; dependenciesReady: boolean;
    durableStorage: boolean; serializedWorker: boolean; hoursUsed: number; spendUsed: number; workerId: string;
  };
  receipt: null | (Identity & {
    executionId: string; packageId: string; packageDigest: string; requestId: string;
    decisionRevision: string; workerId: string; leaseExpiresAt: string; prUrl: string | null;
    appliedDisplacedItemIds: string[]; admissionApplied: boolean;
  });
};
export type AuthorizationResult = {
  state: "READY" | "AWAITING_DECISION" | "BLOCKED" | "RESUME" | "IN_REVIEW";
  reason: string;
  actions: string[];
};

const record = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const nonempty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(nonempty) && new Set(v).size === v.length;
const sameIds = (a: string[], b: string[]): boolean => a.length === b.length && a.every(id => b.includes(id));
const number = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;
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
  for (const field of ["id", "digest", "requestId", "decisionRevision", "ownerId", "capacitySlot"]) {
    if (!nonempty(b[field])) return blocked(`package is missing ${field}`);
  }
  if (c.packageDigest !== b.digest) return blocked("current scope does not match the approved package digest");
  const now = timestamp(c.now), activated = timestamp(p.activatedAt), prepared = timestamp(b.preparedAt), expires = timestamp(b.expiresAt);
  if (![now, activated, prepared, expires].every(Number.isFinite) || activated > now || prepared < activated || prepared > now || expires <= now || expires <= prepared) return blocked("invalid, historical, future, or expired authorization timestamps");
  if (c.ownerId !== b.ownerId || c.capacitySlot !== b.capacitySlot) return blocked("delivery owner or capacity slot changed");
  const expectedDisplacement = b.displacedItemIds, currentDisplacement = c.displacedItemIds;
  if (!strings(expectedDisplacement) || !strings(currentDisplacement) || expectedDisplacement.length !== currentDisplacement.length || !expectedDisplacement.every(id => currentDisplacement.includes(id))) return blocked("capacity displacement does not match the package");
  for (const field of ["evidenceReady", "designReady", "dependenciesReady", "durableStorage", "serializedWorker"]) {
    if (c[field] !== true) return blocked(`${field} is not verified`);
  }
  if (!nonempty(c.workerId) || !number(c.activeCount) || !Number.isInteger(c.activeCount) || !number(c.capacityLimit) || !Number.isInteger(c.capacityLimit) || c.capacityLimit < 1) return blocked("invalid worker or capacity snapshot");
  const before = b.activeItemIdsBefore, active = c.activeItemIds, candidate = b.roadmapItemId;
  if (!nonempty(candidate) || c.roadmapItemId !== candidate || !strings(before) || !strings(active) || active.length !== c.activeCount || b.capacityLimit !== c.capacityLimit) return blocked("invalid or changed capacity inventory");
  if (expectedDisplacement.includes(candidate) || !expectedDisplacement.every(id => before.includes(id))) return blocked("approved displacement must be other items in the approved inventory");
  const resulting = new Set([...before.filter(id => !expectedDisplacement.includes(id)), candidate]);
  if (!number(b.maxHours) || b.maxHours <= 0 || !number(b.maxSpend) || !number(c.hoursUsed) || !number(c.spendUsed) || c.hoursUsed >= b.maxHours || c.spendUsed > b.maxSpend) return blocked("invalid or exhausted build limits");
  const d = input.decision;
  if (d === null) return { state: "AWAITING_DECISION", reason: "build request has no decision", actions: [] };
  if (!record(d)) return blocked("missing decision snapshot; use explicit null for no decision");
  if (identityFields.some(field => d[field] !== b[field]) || d.purpose !== "build-authorization-v1" || d.requestId !== b.requestId || d.revision !== b.decisionRevision || d.packageId !== b.id || d.packageDigest !== b.digest) return blocked("decision does not match the exact build package and revision");
  if (d.revoked !== false || d.superseded !== false) return blocked("authorization is revoked, superseded, or its status is unknown");
  if (d.outcome === "pending") return { state: "AWAITING_DECISION", reason: "build request is awaiting human approval", actions: [] };
  const decided = timestamp(d.decidedAt);
  if (d.outcome !== "approved" || d.humanVerified !== true || !Number.isFinite(decided) || decided < activated || decided < prepared || decided > now) return blocked("no current verified human approval after policy activation and package preparation");

  // A matching execution owns its existing slot. Recheck authorization first,
  // then reconcile the receipt before checking admission of another build.
  const r = input.receipt;
  if (r !== null) {
    if (!record(r) || !nonempty(r.executionId) || !nonempty(r.workerId) || identityFields.some(field => r[field] !== b[field]) || r.packageId !== b.id || r.packageDigest !== b.digest || r.requestId !== b.requestId || r.decisionRevision !== b.decisionRevision) return blocked("execution receipt does not match this exact authorization");
    const lease = timestamp(r.leaseExpiresAt);
    if (!Number.isFinite(lease)) return blocked("invalid execution lease");
    if (r.prUrl !== null) {
      if (!nonempty(r.prUrl) || !/^https:\/\//.test(r.prUrl)) return blocked("invalid PR receipt");
      return { state: "IN_REVIEW", reason: "this authorization already has a PR", actions: [] };
    }
    if (r.workerId !== c.workerId && lease > now) return blocked("another worker holds the active execution lease");
    const applied = r.appliedDisplacedItemIds;
    if (!strings(applied) || !applied.every(id => expectedDisplacement.includes(id)) || typeof r.admissionApplied !== "boolean") return blocked("invalid recorded admission progress");
    const expectedActive = new Set(before.filter(id => !applied.includes(id)));
    if (r.admissionApplied) {
      if (!sameIds(applied, expectedDisplacement)) return blocked("admission was recorded before displacement completed");
      expectedActive.add(candidate);
    }
    if (!sameIds([...expectedActive], active) || resulting.size > c.capacityLimit) return blocked("current capacity no longer matches the recorded admission progress");
    return { state: "RESUME", reason: "resume the recorded execution under the current authorization", actions: ["execution:RECLAIM_OR_RENEW", ...(!r.admissionApplied ? ["roadmap:RECONCILE_ADMISSION"] : []), "delivery:RESUME_TO_PR"] };
  }
  if (!sameIds(before, active) || resulting.size > c.capacityLimit) return blocked("no delivery capacity available or approved inventory changed");
  return { state: "READY", reason: "current verified build approval satisfies the standing execution policy", actions: ["execution:CLAIM_AND_RECORD", "roadmap:ADMIT_NOW", "delivery:BUILD_TO_PR"] };
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
