import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export type CompletionSnapshot = {
  taskStatus: "IN_REVIEW" | "DONE" | "BLOCKED" | "CANCELLED" | "OTHER";
  prState: "OPEN" | "MERGED" | "CLOSED" | "MISSING";
  checks: "PENDING" | "PASS" | "FAIL" | "UNKNOWN";
  production: "PENDING" | "PASS" | "FAIL" | "UNKNOWN";
  smoke: "NOT_RUN" | "PASS" | "PASS_WITH_FOLLOWUP" | "FAIL_BLOCKING";
  receiptApplied: boolean;
  launchRequired: boolean;
  linkedRoadmap: boolean;
  linkedSolution: boolean;
  solutionStatusWritable: boolean;
};

export type CompletionDecision = {
  state: "WAIT" | "BLOCKED" | "APPLY" | "NOOP";
  reason: string;
  actions: string[];
};

export function decideCompletion(snapshot: CompletionSnapshot): CompletionDecision {
  if (snapshot.receiptApplied) {
    return { state: "NOOP", reason: "completion receipt already applied", actions: [] };
  }

  if (snapshot.taskStatus !== "IN_REVIEW") {
    return {
      state: "WAIT",
      reason: `task is ${snapshot.taskStatus}, not IN_REVIEW`,
      actions: [],
    };
  }

  if (snapshot.prState === "MISSING") {
    return { state: "BLOCKED", reason: "no stable PR link found", actions: ["task:BLOCKED"] };
  }
  if (snapshot.prState === "CLOSED") {
    return { state: "BLOCKED", reason: "PR closed without merge", actions: ["task:BLOCKED"] };
  }
  if (snapshot.prState === "OPEN") {
    return { state: "WAIT", reason: "PR is still open", actions: [] };
  }

  if (snapshot.checks === "FAIL") {
    return { state: "BLOCKED", reason: "required checks failed", actions: ["task:BLOCKED"] };
  }
  if (snapshot.checks !== "PASS") {
    return { state: "WAIT", reason: "required checks are incomplete or unknown", actions: [] };
  }

  if (snapshot.production === "FAIL") {
    return { state: "BLOCKED", reason: "production deployment failed", actions: ["task:BLOCKED"] };
  }
  if (snapshot.production !== "PASS") {
    return { state: "WAIT", reason: "production deployment is not verified", actions: [] };
  }

  if (snapshot.smoke === "FAIL_BLOCKING") {
    return { state: "BLOCKED", reason: "blocking production smoke test failed", actions: ["task:BLOCKED"] };
  }
  if (snapshot.smoke === "NOT_RUN") {
    return { state: "WAIT", reason: "production smoke test has not run", actions: [] };
  }

  const actions = ["task:DONE"];
  if (snapshot.linkedRoadmap) {
    if (snapshot.launchRequired) {
      actions.push("roadmap:LAUNCHING");
    } else {
      actions.push("roadmap:SHIPPED", "roadmap-steward:DISPATCH_CAPACITY_CHANGE");
    }
  }
  if (snapshot.linkedSolution) {
    actions.push(snapshot.solutionStatusWritable ? "solution:SHIPPED" : "warning:SOLUTION_STATUS_UNSUPPORTED");
  }
  if (snapshot.smoke === "PASS_WITH_FOLLOWUP") {
    actions.push("feedback:CREATE_FOLLOWUP");
  }
  actions.push("receipt:WRITE");

  return {
    state: "APPLY",
    reason: snapshot.launchRequired
      ? "delivery verified; continue through configured launch gate"
      : "delivery verified in production",
    actions,
  };
}

function runCli(): void {
  const raw = readFileSync(0, "utf8");
  const snapshot = JSON.parse(raw) as CompletionSnapshot;
  process.stdout.write(`${JSON.stringify(decideCompletion(snapshot), null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
