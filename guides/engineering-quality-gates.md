# Engineering Quality Gates

This guide covers the structural enforcement layer that makes quality checks impossible to skip. The agents in this playbook tell you *what* to do — gates make it impossible *not* to do it.

**Time to set up:** ~15 minutes per project.

---

## The core problem

Discipline is voluntary. When an agent is mid-task and momentum is high, it will rationalize skipping the checklist. "Tests should still pass." "This is a small change." "I'll verify after."

Gates are structural. They fire regardless of momentum. The agent cannot report done without evidence because the gate literally intercepts the command and blocks it.

---

## Adoption: making discipline structural

Gates enforce *checkpoints*. They don't enforce what happens during implementation — between the first line of code and the first `git push`. That gap is where test-first discipline most commonly breaks down.

Two levers close it:

### Layer 1 — CLAUDE.md with hard implementation instructions

CLAUDE.md is read at the start of every session. Instructions written there shape every decision Claude makes in that session — not as suggestions, but as operating constraints. The key is specificity: vague instructions ("write tests") are rationalized away; hard trigger-based instructions ("before writing any function, invoke test-first — this is not optional") are not.

**Recommended CLAUDE.md section for any project:**

```markdown
## Implementation Discipline

**Tests come before code. No exceptions.**

For every feature, bug fix, or non-trivial function:

1. Invoke `test-first` before writing any production code — this is not optional
2. Write the failing test first. Confirm it fails for the right reason.
3. Write the minimum code to make it pass.
4. Invoke `verify-done` before reporting completion to the user.

Do not say "tests should still pass" or "I'll add tests after." These phrases indicate
the discipline was skipped. If you find yourself writing them, stop and write the test.

When spawning subagents for implementation work, always use `subagent_type: "engineer"`.
The engineer agent has test-first baked into its workflow; the default agent does not.

When to spawn the `qa` agent (subagent_type: "qa"):
- The feature has complex auth boundaries or security-sensitive paths
- The feature touches payment flows, data integrity, or concurrency
- You are auditing test coverage on an existing code path
```

Add to the skills trigger table:

| Trigger | Action |
|---|---|
| Starting any new feature, bug fix, or non-trivial function | Invoke `test-first` skill |
| Complex auth/security/payment feature needs test strategy | Spawn `qa` agent |

### Layer 2 — Engineer agent routing

The `engineer` agent (`agents/engineer.md`) has test-first as a non-negotiable step in its implementation workflow — not as advice, but as a sequential gate before writing production code. The default general-purpose agent does not have this constraint.

The rule: **when spawning subagents for implementation work, always set `subagent_type: "engineer"`**. When working in the main session (not a subagent), the CLAUDE.md instruction in Layer 1 plays the same role.

The `qa` agent complements the engineer: it designs test strategy for complex features and audits coverage, but does not write source code. Spawn it when the engineer surfaces "complex user flows or security-sensitive paths" (per the engineer's escalation rules).

### The honest limit

CLAUDE.md instructions and agent routing are instructional, not structural. An agent under high momentum can still skip them. The gates handle the checkpoints where skipping has consequences. The two-layer approach reduces skipping during implementation; the gates catch anything that slips through.

The realistic outcome: discipline is followed most of the time during implementation (because the instructions are explicit and present at session start), and always caught at checkpoints (because the gates are structural and can't be rationalized away).

---

## The gate stack

Three gates cover the three riskiest moments in a development cycle:

| Moment | Gate type | What it enforces |
|---|---|---|
| After `git push` | PostToolUse reminder | Forces `tsc + test` before declaring done |
| Before `gh pr create` | PreToolUse block | Requires `pr-checklist` skill to have run |
| Before `vercel --prod` | PreToolUse block | Requires `production-readiness` skill to have run |

Each gate in the stack is additive — together they form a quality corridor that code must travel through before it reaches users.

---

## Gate 1 — Post-push reminder

**Trigger:** any `git push` command  
**Type:** PostToolUse  
**Effect:** injects a blocking reminder into the agent's context after the push

```json
{
  "PostToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "if": "Bash(git push*)",
          "statusMessage": "Injecting post-push quality gate reminder...",
          "timeout": 5,
          "command": "jq -r 'if (.tool_input.command | test(\"git push\")) then {\"hookSpecificOutput\":{\"hookEventName\":\"PostToolUse\",\"additionalContext\":\"QUALITY GATE: You just pushed to git. Before declaring this work done you MUST: (1) run pnpm tsc --noEmit, (2) run pnpm test, (3) confirm all tests pass, (4) confirm new user-facing flows have E2E tests, (5) confirm docs updated if behavior changed. Do not tell the user the work is done until this checklist is complete.\"}} | tojson else empty end'"
        }
      ]
    }
  ]
}
```

The agent cannot proceed to "here's what I did" without addressing the injected checklist. The push happened — this gate ensures verification happens before the report.

---

## Gate 2 — PR creation block

**Trigger:** `gh pr create`  
**Type:** PreToolUse  
**Effect:** hard blocks PR creation; requires `--checklist-verified` flag which is only valid after running the `pr-checklist` skill

```json
{
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "if": "Bash(gh pr create *)",
          "statusMessage": "Checking PR checklist gate...",
          "timeout": 10,
          "command": "input=$(cat); cmd=$(echo \"$input\" | jq -r '.tool_input.command // \"\"'); if echo \"$cmd\" | grep -q 'gh pr create'; then if echo \"$cmd\" | grep -q -- '--checklist-verified'; then cleaned=$(echo \"$cmd\" | sed 's/ --checklist-verified//g'); jq -n --arg cmd \"$cleaned\" '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\",\"updatedInput\":{\"command\":$cmd}}}'; else echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"PR GATE: You must invoke the pr-checklist skill before opening a PR. Run Skill(pr-checklist), address any failures, then add --checklist-verified to your gh pr create command to proceed.\"}}'; fi; fi"
        }
      ]
    }
  ]
}
```

**Correct workflow:**
```
Skill(pr-checklist)   → run first, fix any failures
gh pr create --title "..." --body "..." --checklist-verified
```

> **Note:** If `--checklist-verified` flag stripping via `updatedInput` doesn't work in your Claude Code version, use `gh api repos/{owner}/{repo}/pulls` to create the PR after verifying the checklist. The gate's denial behavior still works.

---

## Gate 3 — Production deploy block

**Trigger:** `vercel --prod`  
**Type:** PreToolUse  
**Effect:** hard blocks production deploys; requires `production-readiness` skill to have run first

```json
{
  "type": "command",
  "if": "Bash(vercel *)",
  "statusMessage": "Checking production deploy gate...",
  "timeout": 10,
  "command": "input=$(cat); cmd=$(echo \"$input\" | jq -r '.tool_input.command // \"\"'); if echo \"$cmd\" | grep -q 'vercel' && echo \"$cmd\" | grep -q -- ' --prod'; then if echo \"$cmd\" | grep -q -- '--prod-verified'; then cleaned=$(echo \"$cmd\" | sed 's/ --prod-verified//g'); jq -n --arg cmd \"$cleaned\" '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\",\"updatedInput\":{\"command\":$cmd}}}'; else echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"PRODUCTION DEPLOY GATE: Run Skill(production-readiness) and address any failures first. Then add --prod-verified to your vercel command to proceed.\"}}'; fi; fi"
```

**Correct workflow:**
```
Skill(production-readiness)   → run first, fix any failures
vercel --cwd /path/to/repo --prod --prod-verified
```

---

## Setting up gates on a new project

1. Create `.claude/settings.json` at the project root with the full gate config (combine all three gates above into one file — see the canonical template below)
2. Commit it — gates apply to all agents working on the project, not just the current session

**Canonical `.claude/settings.json` template:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(git push*)",
            "statusMessage": "Injecting post-push quality gate reminder...",
            "timeout": 5,
            "command": "jq -r 'if (.tool_input.command | test(\"git push\")) then {\"hookSpecificOutput\":{\"hookEventName\":\"PostToolUse\",\"additionalContext\":\"QUALITY GATE: You just pushed to git. Before declaring this work done you MUST: (1) run pnpm tsc --noEmit, (2) run pnpm test, (3) confirm all tests pass, (4) confirm new user-facing flows have E2E tests, (5) confirm docs updated if behavior changed. Do not tell the user the work is done until this checklist is complete.\"}} | tojson else empty end'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(gh pr create *)",
            "statusMessage": "Checking PR checklist gate...",
            "timeout": 10,
            "command": "input=$(cat); cmd=$(echo \"$input\" | jq -r '.tool_input.command // \"\"'); if echo \"$cmd\" | grep -q 'gh pr create'; then if echo \"$cmd\" | grep -q -- '--checklist-verified'; then cleaned=$(echo \"$cmd\" | sed 's/ --checklist-verified//g'); jq -n --arg cmd \"$cleaned\" '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\",\"updatedInput\":{\"command\":$cmd}}}'; else echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"PR GATE: You must invoke the pr-checklist skill before opening a PR. Run Skill(pr-checklist), address any failures, then add --checklist-verified to your gh pr create command to proceed.\"}}'; fi; fi"
          },
          {
            "type": "command",
            "if": "Bash(vercel *)",
            "statusMessage": "Checking production deploy gate...",
            "timeout": 10,
            "command": "input=$(cat); cmd=$(echo \"$input\" | jq -r '.tool_input.command // \"\"'); if echo \"$cmd\" | grep -q 'vercel' && echo \"$cmd\" | grep -q -- ' --prod'; then if echo \"$cmd\" | grep -q -- '--prod-verified'; then cleaned=$(echo \"$cmd\" | sed 's/ --prod-verified//g'); jq -n --arg cmd \"$cleaned\" '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\",\"updatedInput\":{\"command\":$cmd}}}'; else echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"PRODUCTION DEPLOY GATE: Run Skill(production-readiness) and address any failures first. Then add --prod-verified to your vercel command to proceed.\"}}'; fi; fi"
          }
        ]
      }
    ]
  }
}
```

---

## The full skill chain

Gates enforce *when* to check. Skills define *what* to check. The two work together:

```
┌─────────────────────────────────────────────────────────────────────┐
│  IMPLEMENT                                                           │
│  Skill: test-first                                                   │
│  → Write failing test → write minimum code → refactor               │
│  → Invoke verify-done before reporting completion                    │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ git push
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  GATE 1 — Post-push reminder fires                                   │
│  → pnpm tsc --noEmit (must be clean)                                │
│  → pnpm test (all passing)                                           │
│  → E2E confirmed for any new user-facing flow                        │
│  → Docs updated if behavior changed                                  │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ gh pr create
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  GATE 2 — PR creation blocked                                        │
│  Skill: pr-checklist (must be invoked first)                        │
│  → TypeScript clean                                                  │
│  → Unit tests passing + new tests written                            │
│  → E2E passing + new/updated tests written                           │
│  → Docs reviewed and updated                                         │
│  → Screenshots regenerated (if project has docs:screenshots)         │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ merge to main → vercel --prod
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  GATE 3 — Production deploy blocked                                  │
│  Skill: production-readiness (must be invoked first)                 │
│  → Preview deploy confirmed green                                    │
│  → All checks passed on the preview                                  │
│  → No known regressions                                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## The test layer model

The QA agent (`agents/qa.md`) works in three layers. Understand which layer catches what:

| Layer | Speed | Catches | When to write |
|---|---|---|---|
| **Unit** | ~10ms per test | Logic bugs in a single function or component | Always — for every non-trivial function |
| **Integration** | ~100ms per test | Contract bugs between two components or services | When two units interact in a non-obvious way |
| **E2E** | ~5s per test | Flow bugs visible to the user | For every user-facing flow that's catastrophic if broken |

**The economic rule:** write the cheapest test that catches the bug. Do not write an E2E test for something a unit test catches in 10ms.

### Coverage map — what to test in every feature

| Category | What to verify |
|---|---|
| Happy path | Standard flow, expected inputs, normal conditions |
| Edge cases | Empty inputs, max/min values, boundary conditions |
| Error states | Invalid input, missing data, malformed requests |
| Failure modes | Network errors, timeouts, external service down |
| Auth boundaries | Unauthenticated access, wrong tenant, wrong permissions |
| Data integrity | Partial writes, rollback, cascading effects |

---

## Common failure modes the gates catch

| What goes wrong without gates | Which gate catches it |
|---|---|
| Agent pushes and declares done without running tests | Gate 1 (post-push reminder) |
| Agent opens PR before tests pass | Gate 2 (pr-checklist block) |
| Agent deploys to production before preview is verified | Gate 3 (production-readiness block) |
| TypeScript errors merged to main | Gate 1 + Gate 2 |
| New user flow ships without an E2E test | Gate 1 (reminder) + Gate 2 (pr-checklist requires E2E) |
| Docs not updated after behavior change | Gate 1 (reminder) + Gate 2 (step 4 of pr-checklist) |

---

## Adding a new gate

Gates are entries in `.claude/settings.json`. The pattern:

1. Choose the hook type: `PreToolUse` (block before) or `PostToolUse` (remind/log after)
2. Write the `if` condition matching the command pattern: `Bash(command *)`
3. For a PreToolUse block: require a verification flag (`--<name>-verified`), strip it in the allow branch
4. For a PostToolUse reminder: inject `additionalContext` into the agent's next decision

Document any new gate in the CLAUDE.md for the project so it's visible to humans.

**Planned gates (not yet implemented):**

| Trigger | Prerequisite | Flag |
|---|---|---|
| `gh pr merge` targeting main | `security-review` skill | `--security-verified` |
| Raw `psql` / direct DB access | *(always blocked — use migration scripts)* | *(none — always deny)* |
