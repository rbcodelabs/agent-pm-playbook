# How to Use the Agents

> A practical guide to working with the virtual product team. No code required.

The playbook ships six specialized agents, each with a defined role and tools. All follow one rule: act, then report. They ask you first only before something irreversible: destroying work, reaching customers, shipping to production, or spending money or people's time ([[Autonomy Policy]]). This page covers who they are, when to use them, and what to say.

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

"Review our current OST for Acme Notes and fix any structural problems."

"Write user stories for the beneficiary invite flow."

"Design an experiment for the riskiest assumption in our onboarding solution."
```

**What it works out itself:** Whether an OST exists, the outcome you're working toward, and the discovery phase — from your config, tracker, and conversation. It states anything it inferred.

**What it does without asking:** Synthesis, OST updates including new or restructured branches, prioritization, experiment design and result interpretation, user stories. **Asks first:** archiving a branch with work behind it, anything customers see, recruiting research participants.

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
"Design the data model for document sharing in Acme Notes. Hard constraints: Postgres, no joins across schemas."

"Write an ADR for how we handle background job processing. We haven't decided yet — lay out the options."

"Review the current schema in prisma/schema.prisma and flag anything that will hurt us at scale."

"We're evaluating Resend vs. SES for transactional email. Evaluate both and recommend one."
```

**What it looks up first:** Hard constraints, what's been ruled out, and what the team has tried — from the repo and prior ADRs, stating any it had to assume.

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

**What it checks first:** Ambiguous requirements (it picks the most reasonable reading and says so), scope larger than expected, and embedded architectural decisions that belong with the architect.

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

**What it looks up first:** Existing test tooling and patterns, and the riskiest paths in the feature.

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
"Review PR #83 on acme-notes. Focus especially on auth boundaries and any N+1 query risks."

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
"Ship all open PRs on acme-notes. It's a Vercel app. Show me the merge plan before you do anything."

"Merge and release the desktop plugin. Patch bump."
```

**What it always asks about** (merging and shipping are irreversible):
- The merge plan (shows it to you before executing anything)
- Version bump size for plugin/distributable releases
- Any PR with failing CI or unresolved conflicts

---

## How Orchestration Works

Just say what you want and Claude routes it to the right agent; explicit delegation gives you more control.

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

"Have the PM agent review the OST and fix any structural issues."
```

### Parallel agents

Agents can run at the same time when their work is independent. This is worth doing deliberately:

```
"Have the reviewer check PR #83 while QA writes tests for the document upload flow."

"Have the PM synthesize this week's interviews while the architect drafts the ADR for notifications."
```

---

## The Team Workflow

Use [Approved Build](skills/build-authorization/SKILL.md) for one exact scope approval
through a tested PR. Reuse the approved design, claim one delivery Task, and retain
authority/branch/PR links. Direct and scheduled workers follow the same procedure;
capacity controls roadmap admission separately. Merge and production require separate authority.

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

The order isn't strict, but it explains why the engineer hands architectural decisions to the architect and the architect doesn't write implementation code.

---

## Tips for Good Results

**Brief the agent like a new team member walking in.** Include what you're trying to accomplish, relevant repo or files, constraints, and what you've ruled out. Agents infer what you leave out and tell you what they assumed, so a good brief mostly saves corrections.

**Include the file path or issue number.** Agents can search, but a starting point is faster.

**Name the constraint that matters most.** "We're on Postgres", "this ships Friday", or "we already decided X" changes the output significantly.

**Separate what you want from what you're worried about.** "Implement X, and I'm specifically worried about Y" gets you both the implementation and a focused eye on the risk.

**Let the architect go first for anything significant.** If the design is wrong, you pay twice: 10 minutes with the architect saves 2 hours with the engineer.

---

*See also: [[README]], [[Agentic PM Playbook]], [[Agentic PM — Agent Capability Framework]]*
