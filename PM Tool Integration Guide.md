# PM Tool Integration Guide

> A practical reference for mapping the full OST workflow into your PM tool stack. This guide replaces and expands Section 4 of the [[Agentic PM Playbook]].

**Last updated:** 2026-06-04
**See also:** [[Signal Ledger]], [[Agentic PM — Agent Capability Framework]], [[How to Use the Agents]]

---

## 1. The Tool-Agnostic Model

Regardless of which tools you use, the product system requires a home for each capability. `pm-config.md` selects a named profile and optional per-capability overrides using the canonical [integration-routing contract](skills/integration-routing/SKILL.md). If any capability lacks a clear, single home, state fragments and becomes unreliable.

The required capability keys are `vision`, `research_capture`, `insights`, `okrs`, `ost`, `experiments`, `roadmap`, `delivery`, and `reporting_archive`. Named profiles are starting points, not stack mandates: `compass-full`, `compass-obsidian-linear`, `markdown-linear`, and `jpd-jira`.

| OST Layer | What it is | "Done" means |
|---|---|---|
| **Desired Outcome** | The single product metric the team owns for this cycle | Specific, measurable, owned by one team, agreed by stakeholders |
| **Signals** | Raw discovery inputs: quotes, tickets, survey responses, behavioral data | Logged with source, date, segment, and confidence; linked to the active outcome |
| **Opportunities** | Validated customer needs, pains, or desires that could move the outcome | Expressed in customer voice, backed by 2+ independent evidence sources, linked to the active desired outcome |
| **Solutions** | Hypotheses for addressing an opportunity | At least 3 per opportunity before any are eliminated; riskiest assumption named |
| **Experiments** | Tests of the riskiest assumption in a specific solution | Has a written kill condition and success metric before the test starts |
| **Build items** | Committed delivery work against a validated solution | Traceable to a validated solution; solution linked to an opportunity |

**The single most important principle:** pick one authoritative home per layer and do not let it drift. Teams routinely end up with opportunities in Linear, JPD, Notion, and a Miro board simultaneously. When that happens, no one trusts any of them. The OST tree structure especially must have exactly one source of truth.

---

## 2. JPD + Jira

Jira Product Discovery (JPD) is the most native fit for this workflow. JPD was purpose-built for the discovery layers; Jira handles delivery. The boundary is clear: JPD owns the OST artifact, Jira owns build work.

### Layer Mapping

| OST Layer | JPD / Jira Construct | Notes |
|---|---|---|
| Desired Outcome | JPD Goal | One active Goal per initiative. Archive previous Goals when the outcome changes — don't delete them. |
| Signals | JPD Insights | The signal ledger lives here. See [[Signal Ledger]] for tagging convention. |
| Opportunities | JPD Opportunity (issue type) | Link to parent Goal. Link all supporting Insights. |
| Solutions | JPD Solution (issue type), child of an Opportunity | Keep multiple per opportunity until assumption testing narrows the field. |
| Experiments | JPD Test (issue type), child of a Solution | Use the experiment field template below. Link results via the Learnings tab. |
| Build items | Jira stories and tasks in a delivery sprint | Link to the validated Solution before moving to sprint. |

### A Note on Insights vs. Learnings

JPD has two distinct signal-related concepts that are easy to conflate:

**Insights** are standalone entries for raw customer signals — quotes, tickets, interview moments. They exist independently, can be linked to multiple Opportunities or Solutions, and are queryable in aggregate. This is the signal ledger layer. Insights are inputs to discovery.

**The Learnings tab** appears on individual Opportunities, Solutions, and Tests. It surfaces Insights linked to that item, plus notes and conclusions from test results. Learnings are outputs from discovery — what the team concluded after running an experiment or reviewing evidence.

The rule: use Insights for signals, use Learnings for conclusions. Never log raw customer quotes directly onto the Learnings tab — they belong as Insights that get linked to the relevant item.

### JPD Insight Tagging Convention

Every Insight logged in JPD should carry these fields. This is your signal ledger in JPD form.

| Field | Values / Format |
|---|---|
| Source type | `interview`, `support-ticket`, `review`, `survey`, `sales-call`, `nps` |
| Segment | Customer segment name (match your standard segmentation) |
| Severity | `high`, `medium`, `low` |
| OST mapping | Linked Idea (opportunity or solution) |
| Confidence | `high`, `medium`, `low`, `hypothesis` — use the [[Signal Ledger]] confidence criteria |

Never log an Insight without a source type and segment. An unattributed signal is not evidence.

### JPD Status Workflows

**Opportunities:**

```
Exploring → Validating → Prioritized → Active → Archived
```

- **Exploring:** Signal exists but fewer than 2 independent sources. Don't add solutions yet.
- **Validating:** Actively gathering evidence. May run discovery interviews against this opportunity.
- **Prioritized:** Meets the evidence bar (2+ sources, customer-voice framing, connected to active outcome). Ready for solution ideation.
- **Active:** Team is exploring solutions or running experiments against this opportunity.
- **Archived:** Opportunity invalidated or deprioritized. Keep it — a killed branch is a learning.

**Solutions:**

```
Exploring → Testing → Validated → Building → Shipped | Killed
```

- **Exploring:** Hypothesis named, assumptions not yet mapped.
- **Testing:** Experiment running or designed and ready to run.
- **Validated:** Riskiest assumption passed the test. Cleared for build investment.
- **Building:** Active delivery work in Jira. Solution Idea linked to sprint stories.
- **Shipped:** In production. Link to the Jira release.
- **Killed:** Assumption failed the test. Archive with reason — don't delete.

### Jira Experiment Issue Template

Create a Jira issue type or description template with these fields:

```
Assumption being tested:
[State the assumption clearly. One sentence.]

Test design:
[What exactly will we do? Who are we testing with? What's the timeline?]

Success condition:
[Specific and measurable. What result would make us proceed?]

Kill condition:
[Specific and measurable. What result would make us stop?]

Result:
[Fill in after the experiment runs.]

Next action:
[Proceed / Kill / Iterate — with rationale.]
```

The kill condition must be filled in before the experiment starts. If it isn't, the experiment isn't ready to run.

### JPD Automation Rules

Set these up once and run them as a background health check:

- **Orphaned solutions:** Flag any Idea labeled `solution` with no linked `opportunity` Idea. A solution without a parent is a feature request in disguise.
- **Unmapped signals:** Flag Insights with no linked Idea after 14 days. A signal that hasn't been mapped to an opportunity within two weeks is probably getting lost.
- **Stale exploration:** Weekly digest of Ideas in `Exploring` status with no linked experiment after 21 days. If an opportunity has been "exploring" for three weeks with no test running, it needs a decision: commit to validating or archive it.

### Note on Issue Type Configuration

If your JPD is configured with separate Opportunity, Solution, and Test issue types (the recommended setup), no label workaround is needed — the issue type IS the distinction. The automation rules above still apply: orphaned Solutions (no parent Opportunity), unmapped Insights, and stale Exploring status are all worth flagging regardless of whether you use issue types or labels.

If your JPD uses a single generic Ideas type, use the `opportunity` / `solution` / `test` label convention to make the distinction, and enforce it with the orphaned-solution automation above.

---

## 3. Compass

Compass can be the complete product operating system. In the `compass-full` profile it owns vision and product documents, research capture, synthesized insights, OKRs, OST objects, experiments, roadmap, and delivery through Compass Tasks. Hybrid profiles may assign only some of those capabilities to Compass.

With the `compass-native-review` workflow profile, both `review_requests` and
`decision_records` resolve to `compass_decisions`. Agents use `request_decision`,
`list_decisions`, and `get_decision`; only human admins decide in Compass. These decisions
are tracking-only and never automatically mutate linked product or delivery state.

**Production URL:** https://compass.rbcodelabs.com
**Delivery work:** Compass Tasks in `compass-full`; Linear or Jira only when the `delivery` capability resolves there.

### Layer Mapping

| OST Layer | Compass Construct | Notes |
|---|---|---|
| Desired Outcome | Key Result (connected to an Objective in an active OKR Cycle) | One KR = one desired outcome. Link every opportunity to a KR. |
| Signals | Research + FeedbackItem + linked Opportunities | Compass can own both raw research and structured insight; a hybrid profile may route raw capture elsewhere. |
| Opportunities | Opportunity | Customer-voice framing; link to a KR on creation. |
| Solutions | Solution (child of Opportunity) | Add 3+ per opportunity before narrowing. |
| Assumptions | Assumption (child of Solution) | Tag with risk level: HIGH / MEDIUM / LOW. |
| Experiments | Experiment (linked to an Assumption) | Must have a written kill condition before moving to RUNNING. |
| Build items | Compass Tasks or configured external tracker | Resolve `delivery` separately and link tasks to the RoadmapItem and validated Solution. |

### Status Workflows

**Opportunities:**
```
EXPLORING → VALIDATING → PRIORITIZED → ACTIVE → ARCHIVED
```

- **EXPLORING:** Signal exists but fewer than 2 independent sources. Do not add solutions yet.
- **VALIDATING:** Actively gathering evidence. At least 1 strong signal logged.
- **PRIORITIZED:** Evidence bar met: 2+ independent sources, customer-voice framing, linked to active KR.
- **ACTIVE:** Team is exploring solutions or running experiments.
- **ARCHIVED:** Invalidated or deprioritized. Keep it -- a killed branch is a learning.

**Solutions:**
```
IDEA → VALIDATED → IN_DELIVERY → SHIPPED | KILLED
```

**Experiments:**
```
DESIGNING → RUNNING → COMPLETE | KILLED
```

The kill condition must be written before moving to RUNNING. `conclude_experiment` (PROCEED / KILL / ITERATE) auto-updates the linked Assumption status -- do not manually set assumption status.

### OKR Setup

Create one OKR Cycle per planning period. Each Objective can have multiple Key Results. Key Results serve as the desired outcome anchors for opportunities.

```
create_okr_cycle(workspaceId, name, startDate, endDate)  → cycleId
create_objective(workspaceId, cycleId, title)             → objectiveId
add_key_result(objectiveId, title, target, unit)          → keyResultId
log_checkin(keyResultId, value, note)                     -- update progress
```

### Roadmap

The Compass roadmap is a NOW / NEXT / LATER kanban. Items are created by promoting a validated Solution (`promote_to_roadmap`) or creating them directly (`add_to_roadmap`). Each item can link to a Solution, Opportunity, Key Result, Experiment, or Squad.

Delivery lives in the provider resolved for `delivery`. With Compass Tasks, keep execution and strategy linked natively. With Linear or Jira, reference the Compass RoadmapItem and Solution IDs in the external epic or issue.

### Signal Layer

Compass has two paths for signals:

**Raw research capture:**
With `compass-full`, capture interview notes, support reviews, and quotes in Compass research/docs. A hybrid profile can instead route `research_capture` to Obsidian; that is a configuration choice, not a universal recommendation.

**Direct FeedbackItem logging:**
For public-facing signals (portal submissions, NPS), Compass captures them natively at `/portal/{org}/{ws}/feedback`. Use `list_feedback` to review and link to Opportunities.

The rule: write to the resolved authoritative provider and link synthesized insights to Opportunities. Any secondary copy must be labeled as an inbox, export, cache, or snapshot.

### MCP API for Agents

Compass exposes a Streamable HTTP MCP endpoint at `https://compass.rbcodelabs.com/api/mcp`. Agents use it to read the full product snapshot and update state inline during sessions. See the `compass-workflow` skill for the complete tool catalog and session protocol.

### Automation Notes

Unlike JPD, Compass has no native automation engine. Use Claude (via MCP) as the automation layer:

- **Weekly snapshot:** call `get_workspace_summary` + `list_opportunities` + `list_experiments("RUNNING")` at the start of each week to generate a health check.
- **Orphaned solutions:** after any session, verify all ACTIVE opportunities have at least one non-KILLED solution.
- **Stale DESIGNING experiments:** flag any experiment in DESIGNING status for more than one session -- the kill condition was never written.
- **OKR check-ins:** call `log_checkin` for each active KR at the cadence the team agrees on (weekly is the default).

---

## 4. Linear + Obsidian

Linear handles all work tracking. Obsidian holds the discovery artifacts because Linear has no native discovery layer. The boundary is equally clear: Linear owns issues and statuses, Obsidian owns the OST tree structure and signal ledger.

### Layer Mapping

| OST Layer | Construct | Location |
|---|---|---|
| Desired Outcome | Project description + pinned cycle goal | Linear project |
| Signals | Signal ledger entries | Obsidian: `Discovery/Signal Ledger.md` |
| Opportunities | Linear issue, label: `opportunity` | Linear, ID referenced in OST doc |
| Solutions | Linear issue, label: `solution`, parent: opportunity issue | Linear |
| Experiments | Linear issue, label: `experiment`, parent: solution issue | Linear |
| Build items | Linear stories and tasks, linked to validated solution | Linear |
| OST tree structure | OST document — **source of truth** | Obsidian: `Discovery/OST-[initiative].md` |

The Obsidian OST doc is the single source of truth for the tree structure. Linear issue IDs appear in the OST doc as references, but the tree hierarchy lives in Obsidian. Linear statuses reflect current work state; Obsidian reflects current thinking.

### Linear Issue Convention for Opportunities

- **Label:** `opportunity`
- **Title format:** `[Opportunity] Users struggle to X when Y`
- **Description:**
  - Customer voice statement (the opportunity, not a solution)
  - Evidence summary: source count, source types, date range
  - Confidence level: High / Medium / Low / Hypothesis
  - Link to Obsidian ledger entries (use the session date as anchor)

### Linear Status Workflow

All discovery issues (opportunities, solutions, experiments) share this workflow:

```
Exploring → Testing → Validated → Building → Shipped | Archived
```

Map these to Linear's default statuses or create a custom workflow per the Linear docs. The status labels must match between Linear and the Obsidian OST doc — when they drift, the OST becomes unreliable.

### Obsidian OST Document

Update the OST doc weekly. The format mirrors the tree structure directly:

```markdown
# OST: [Initiative Name]

## Desired Outcome
[Metric, target, cycle, owner]

### Opportunity: [Customer voice statement] [Exploring | Validating | Active | Archived]
Evidence: [N sources — types and dates]
Confidence: Medium
Linear: PROJ-42

#### Solution: [Hypothesis name] [Exploring | Testing | Validated | Killed]
Linear: PROJ-55

##### Experiment: [What we're testing] [Running | Complete]
Assumption: [State it]
Kill condition: [State it]
Result: [Fill in after]
Linear: PROJ-61
```

### Handling the Signal Layer

Linear has no native signal capture. Use this handoff protocol:

1. Log all raw signals in `Discovery/Signal Ledger.md` in Obsidian, using the standard synthesis format from the [[Signal Ledger]] doc.
2. When a signal cluster reaches medium confidence (2+ independent sources, consistent underlying need, connected to the active outcome), create the Linear opportunity issue.
3. In the Linear issue description, back-reference the ledger entry by session date.
4. In the Obsidian ledger entry, forward-reference the Linear issue ID.

Never create a Linear opportunity issue before you have at least one verbatim quote logged in the ledger. The quote is the gate.

---

## 5. Linear + Obsidian + Repo Bridges (Solo → Team)

An extension of the Linear + Obsidian stack that solves its core limitation: Obsidian is a single-user system. A co-founder, early engineer, or future PM can't open your vault. This pattern uses a git repository as the shared, team-accessible canonical store for structured product docs, while keeping Obsidian as the primary editing interface via bidirectional vault bridges.

**When to use this:** You're a solo founder who expects to bring on a co-founder or first team member within 6–18 months and want product docs accessible via standard git tooling from day one. Or you already have a small team (2–4 people) who are comfortable with git.

**When to skip it:** Your team includes non-technical members who won't work in GitHub. Evaluate Notion or Confluence instead once the team exceeds ~5 people.

---

### Architecture

```
Obsidian vault (Rick's editing interface)
    ↕ bidirectional vault bridge
Git repo: product/ folder (team-accessible canonical store)
    ↔ GitHub PRs (team edits, reviews, change history)
```

The vault bridge syncs changes in both directions. Edits made in Obsidian propagate to the repo (and can open a PR). Edits made in the repo (by a teammate in VS Code or GitHub) sync into the vault on the next bridge pull.

---

### Layer Mapping

| OST Layer | Construct | Location |
|---|---|---|
| Desired Outcome | `product/vision.md` — north star metric section | Git repo (bridged) |
| Signals (structured) | `product/signals/Signal Ledger.md` | Git repo (bridged) |
| Signals (raw capture) | Session notes in Obsidian `Discovery/` | Vault only — not bridged |
| Opportunities | Linear issue, label: `opportunity` + `product/ost.md` | Linear + repo (bridged) |
| Solutions | Linear issue, label: `solution`, parent: opportunity | Linear |
| Experiments | Linear issue, label: `experiment`, parent: solution | Linear |
| Build items | Linear stories and tasks, linked to validated solution | Linear |
| OST tree structure | `product/ost.md` — **source of truth** | Git repo (bridged) |
| ICP | `product/icp.md` | Git repo (bridged) |
| Roadmap | `product/roadmap.md` | Git repo (bridged) |

---

### Repo Folder Structure

One `product/` folder per repo, committed to the main branch:

```
product/
  vision.md          # North star, metric, team, strategic bets
  icp.md             # Ideal customer profile, segments, anti-ICP
  ost.md             # OST tree structure — source of truth
  roadmap.md         # Shipped, active, and planned work
  signals/
    Signal Ledger.md # Structured synthesis entries (see below)
```

Keep one `product/` folder per product repo. If multiple products share a monorepo, create `product/[product-name]/` subfolders.

---

### Vault Bridge Setup

Create one bridge per product using the vault-bridges Obsidian plugin:

| Bridge name | Repo path | Vault path |
|---|---|---|
| Golden Wealth | `~/projects/golden-wealth-app/product/` | `Products/Golden Wealth/` |
| HipTrip | `~/projects/hip-trip-marketing-site/product/` | `Products/HipTrip/` |
| Helio | `~/projects/helio/product/` | `Products/Helio/` |

Set `autoSync: true` so the vault pulls from the repo on Obsidian open. Changes made in Obsidian can be pushed back to the repo and opened as a PR directly from the plugin.

---

### How the Team Interacts With Product Docs

**Rick (vault-first):** Opens and edits `Products/[Product]/ost.md` in Obsidian. The bridge syncs changes back to the repo. Rick can open a PR from the plugin or push directly to main for low-stakes updates.

**Teammate (repo-first):** Clones the repo and edits `product/ost.md` in VS Code or GitHub. Opens a PR for review. On the next bridge pull, the change appears in Rick's vault.

**Both:** Linear for opportunities, solutions, experiments, and delivery work. The OST in `product/ost.md` references Linear IDs; Linear issues link back to the OST doc.

No Notion license. No Confluence. No "let me find that doc." Product strategy lives where the code does.

---

### The Signal Layer Split

Raw signal capture is high-frequency and messy — you want zero friction when logging an interview note or a user quote. Committing every raw capture to git is unnecessary friction. The split:

**Vault-only (no git friction):**
- Interview notes and transcripts
- Support ticket reviews
- Individual user quotes before synthesis
- Exploratory research scratchpad

**Repo (bridged, team-visible):**
- Structured Signal Ledger entries (one per synthesis session, post-synthesis)
- These follow the [[Signal Ledger]] schema and are safe to commit once complete

The workflow: capture raw signals in `Discovery/` in Obsidian. After synthesis, write the structured ledger entry into `product/signals/Signal Ledger.md` (which is bridged to the repo). The structured entry is what the team sees; the raw notes stay in your vault.

---

### Linear Integration

Same as the base Linear + Obsidian stack (section 4), with one change: the OST source of truth lives in the repo's `product/ost.md`, not in an Obsidian-only file. This means team members can read and propose changes to the OST tree structure via PR, not just Rick.

Follow the same signal-to-opportunity handoff protocol:

1. Log raw signals vault-only.
2. After synthesis, commit the structured entry to `product/signals/Signal Ledger.md`.
3. When a cluster reaches medium confidence (2+ independent sources), create the Linear opportunity issue.
4. Update `product/ost.md` with the new opportunity node and the Linear ID.
5. In the Linear issue description, link back to the OST doc and the signal ledger entry date.

---

## 6. Markdown Only

For teams with no dedicated PM tool, or individuals bootstrapping a discovery practice. Everything lives in markdown files. The tradeoff: no automation, no status workflows, no linking infrastructure. The compensation: a weekly 10-minute manual review.

### File Structure

```
Discovery/
  Signal Ledger.md           # All synthesis sessions, chronological
  OST-[initiative-name].md   # The tree: outcome → opportunities → solutions → experiments
  Experiments.md             # Optional: consolidated experiment tracking table
```

Keep one OST file per initiative. If you merge multiple initiatives into one file, the tree structure collapses and priorities blur.

### OST Document Structure

Use heading levels to represent the tree hierarchy directly:

```markdown
## Desired Outcome
[Metric, target, and cycle]

### Opportunity: [Customer voice] [Exploring] [Low confidence]
Evidence: [Source, date]
Verbatim: "[Quote]"

#### Solution: [Hypothesis] [Exploring]
Riskiest assumption: [State it]

##### Experiment: [Test name] [Not started | Running | Complete]
Kill condition: [State it before starting]
Result: [Fill in after]
```

**Inline status tags:** Use bracketed labels in the heading: `[Exploring]`, `[Testing]`, `[Validated]`, `[Killed]`. They're searchable and visible without opening a tool.

**Inline confidence tags:** Add after the status tag: `[Low confidence]`, `[Medium confidence]`, `[High confidence]`, `[Hypothesis]`.

### The Weekly 10-Minute Review

Without automation, this is your only health-check mechanism. Do it on a fixed day:

1. Open the OST doc. Scan every node with a status.
2. Update any status that changed since last week.
3. Flag any opportunity that's been `[Exploring]` for more than 3 weeks with no evidence added.
4. Flag any solution in `[Testing]` with no experiment record.
5. Check the signal ledger: any signals from the last two weeks that haven't been mapped to the OST?

The whole review should take under 15 minutes. If it takes longer, the tree is too wide.

---

## 7. Cross-Tool Principles

These apply regardless of tool stack.

**One source of truth per layer.** Don't let opportunities exist as separate records in both Obsidian and JPD. Pick the home before you start and enforce it.

**Signals predate opportunities.** Never create an opportunity record before you have at least one verbatim quote. The quote is the evidence; the opportunity is the interpretation of the evidence.

**The signal-to-opportunity handoff requires medium confidence.** That means: 2 or more independent sources, a consistent underlying need across sources, and a clear connection to the active desired outcome. A single strong interview quote is not enough.

**Experiments must have a kill condition before they start.** The kill condition lives in the experiment record — not in someone's head, not in a Slack message. If the experiment record has no kill condition, the experiment is not ready to start.

**Dead branches get archived, not deleted.** A killed solution or archived opportunity is a learning. Delete it and you lose the institutional memory of what you tried and why it didn't work. Archive with a one-sentence reason.

**OST health checks are tool-agnostic.** Run the tree health check from the [[Agentic PM — Agent Capability Framework]] monthly, regardless of which tool you use. The questions are the same; the interface to answer them is the only thing that differs.

---

## See Also

- [[Signal Ledger]]
- [[Agentic PM Playbook]]
- [[Agentic PM — Agent Capability Framework]]
- [[How to Use the Agents]]
