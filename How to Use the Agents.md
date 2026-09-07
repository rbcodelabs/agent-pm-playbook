# How to Use the Agents

> A practical guide to working with the virtual product team. No code required.

The playbook ships six specialized agents. Each one has a defined role, a set of tools it can use, and explicit rules about what it decides on its own versus what it surfaces to you first. This page covers who they are, when to use them, and what to say.

---

## The Six Agents

### Product Manager (`pm`)

**What it does:** Product discovery, OST work, signal synthesis, user stories, experiment design. Has direct access to your Obsidian vault and writes artifacts there.

**When to spawn it:**
- You have interview transcripts, tickets, or feedback to synthesize
- You want to build or update an Opportunity Solution Tree
- You need user stories or acceptance criteria written
- You want to design an experiment brief

**Example invocations:**
```
"Synthesize the three interviews I did this week into opportunity statements for the OST."

"Review our current OST for GoldenWealth and flag any structural problems."

"Write user stories for the beneficiary invite flow."

"Design an experiment for the riskiest assumption in our onboarding solution."
```

**What it will ask before acting:** Whether an OST already exists, which outcome you're working toward, what discovery phase you're in.

**What it writes autonomously:** Synthesis reports, OST updates, first-draft experiment briefs, user story drafts. Surfaces prioritization calls and major OST branch decisions to you before acting.

---

### Software Architect (`architect`)

**What it does:** System design, Architecture Decision Records (ADRs), schema reviews, tech evaluation. Produces documents and diagrams. Does not write implementation code.

**When to spawn it:**
- You're adding a significant new capability and need the design thought through first
- You want a second opinion on a data model or schema
- You need an ADR written before the team commits to a direction
- You're evaluating two or more technical approaches and want tradeoffs laid out

**Example invocations:**
```
"Design the data model for document sharing in GoldenWealth. Hard constraints: Aurora DSQL, no joins across schemas."

"Write an ADR for how we handle background job processing. We haven't decided yet — lay out the options."

"Review the current schema in prisma/schema.prisma and flag anything that will hurt us at scale."

"We're evaluating Resend vs. SES for transactional email. Evaluate both and recommend one."
```

**What it will ask before acting:** What the hard constraints are, what's already been ruled out, what the team has tried.

**What it produces autonomously:** ADRs, design docs, Mermaid diagrams, schema review memos. Escalates any recommendation that requires a new tech the team hasn't used, or a breaking change to an existing interface.

---

### Senior Engineer (`engineer`)

**What it does:** Implements features, fixes bugs, refactors code, debugs production issues. Full access to read and edit source files.

**When to spawn it:**
- You have a clear spec (user story, Linear issue, ADR) and want it built
- You've found a bug and want it fixed with a regression test
- You want a module refactored without changing its behavior

**Example invocations:**
```
"Implement the user invitation flow per PROJ-47. Repo is at ~/projects/your-app. Read existing auth patterns before writing anything."

"Fix the bug where the account summary page crashes when there are no records. Write a test that covers the empty state."

"Refactor the document upload component — it's doing too many things. Don't change external behavior."
```

**What it will ask before acting:** Whether requirements are ambiguous, whether scope is larger than expected, whether there are architectural decisions baked in that should be escalated first.

**What it produces autonomously:** Implementation code, unit tests, integration tests. Escalates decisions about new dependencies, public interface changes, or anything that affects multiple services.

---

### QA Engineer (`qa`)

**What it does:** Test strategy, test writing (unit, integration, E2E), edge case analysis, bug verification. Can write and edit test files. Does not touch source code outside test directories.

**When to spawn it:**
- A feature just shipped and you want test coverage assessed or filled in
- You want an adversarial review of a feature before it goes to production
- You need E2E tests written for a critical user flow
- You want to verify a bug fix actually holds up

**Example invocations:**
```
"Write tests for the user invitation flow. Focus on: auth boundaries, what happens when the invite link expires, and duplicate submissions."

"Audit test coverage for src/auth/ and write tests for the highest-risk gaps — especially wrong-tenant access."

"Verify the fix for PROJ-83. Write a test that reproduces the original bug first, then confirm the fix makes it pass."
```

**What it will ask before acting:** What tooling is already in use, what the riskiest paths in the feature are, whether there are existing tests to use as a pattern.

**What it produces autonomously:** Unit tests, integration tests, E2E tests, a coverage gap report. Escalates new testing infrastructure setup or load testing (requires environment context).

---

### Code Reviewer (`reviewer`)

**What it does:** Reviews changed files for correctness, security vulnerabilities, performance issues, and maintainability. Read-only. Returns a structured report with blocking issues separated from advisory feedback.

**When to spawn it:**
- A PR is ready and you want a thorough review before merging
- You want an independent audit of a security-sensitive code path
- You want the "what will break at scale" eye on a new feature

**Example invocations:**
```
"Review PR #83 on the golden-wealth-app. Focus especially on auth boundaries and any N+1 query risks."

"Audit the changes in src/api/documents — I want to know if there are any security holes before this ships."

"Give the checkout flow a full review. I'm most worried about data integrity under concurrent submissions."
```

**What it produces:** A structured report: Summary, Blocking issues (must fix), Advisory (should consider), and what's done well. Always labels severity clearly. Never makes changes.

---

### Release Manager (`release-manager`)

**What it does:** Triages all open PRs on a repo, builds a safe merge order, executes merges one at a time, and ships the result. For Vercel web apps: waits for the deploy and smoke-tests the live URL. For plugins and distributable apps: runs the build, bumps the version, and publishes a GitHub release.

**When to spawn it:**
- You want to clear the PR backlog and ship everything that's ready
- You want to ship the Obsidian plugin (or any other distributable)

**Example invocations:**
```
"Ship all open PRs on golden-wealth-app. It's a Vercel app. Show me the merge plan before you do anything."

"Merge and release the Linear plugin. Patch bump."
```

**What it will always pause and ask about:**
- The merge plan (shows it to you before executing anything)
- Version bump size for plugin/distributable releases
- Any PR with failing CI or unresolved conflicts

---

## How Orchestration Works

You don't need to invoke agents explicitly — you can just tell Claude what you want and it will route to the right agent. But explicit delegation gives you more control.

### Natural language routing (automatic)

```
"Review this PR"                        → reviewer
"Design the caching layer"              → architect
"Write tests for the new flow"          → qa
"Implement PROJ-47"                     → engineer
"Merge and ship open PRs"              → release-manager
"Synthesize my interviews"              → pm
```

### Explicit delegation

```
"Have the architect design the data model for X before we build anything."

"Have the reviewer audit src/auth while the QA agent writes tests for the invite flow."

"Have the PM agent review the OST and flag any structural issues."
```

### Parallel agents

Agents can run at the same time when their work is independent. This is worth doing deliberately:

```
"Have the reviewer check PR #83 while QA writes tests for the document upload flow."

"Have the PM synthesize this week's interviews while the architect drafts the ADR for notifications."
```

---

## The Team Workflow

For an opted-in project, prepare one [build package](skills/build-authorization/SKILL.md)
before asking for build approval. It includes the scope, approach, evidence, tests and
capacity commitment. The engineer reuses that approved plan, and QA/reviewer fixes within
scope remain authorized through a tested PR. Repeated investment, NEXT, NOW or design
requests for the same package are unnecessary. Release approval remains separate.

The agents are designed to hand off cleanly from one to the next:

```
PM (discovery + opportunity framing)
        ↓
Architect (system design + ADR)
        ↓
Engineer (implementation)
        ↓
QA (tests)             ←── run in parallel with
Reviewer (code review) ←── each other, not sequentially
        ↓
Release Manager (merge + ship)
```

You don't have to follow this order strictly. But knowing it helps you understand why the engineer has an explicit rule to escalate architectural decisions up instead of making them, and why the architect explicitly does not write implementation code.

---

## Tips for Good Results

**Brief the agent like a new team member walking in.** Include: what you're trying to accomplish, what repo or files are relevant, what constraints apply, and what you've already tried or ruled out. Terse prompts produce shallow work.

**Include the file path or Linear issue number.** Agents can read the codebase, but they'll do better work faster if you point them at the right starting point.

**Name the constraint that matters most.** "We're on Aurora DSQL" or "this needs to ship by Friday" or "the PM already decided X" changes the output significantly.

**Separate what you want from what you're worried about.** "Implement X, and I'm specifically worried about Y" gets you both the implementation and a focused eye on the risk.

**Let the architect go first for anything significant.** The engineer is fast, but if the design is wrong, you pay twice. Spend 10 minutes with the architect before you spend 2 hours with the engineer.

---

*See also: [[README]], [[Agentic PM Playbook]], [[Agentic PM — Agent Capability Framework]]*
