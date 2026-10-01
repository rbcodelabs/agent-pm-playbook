# PM Tool Integration Guide

> A practical reference for mapping the full Loop workflow (Opportunity, Outcome, Key Result, Solution, Test, with Roadmap Items hanging off Solutions) into your PM tool stack. The structure itself is defined in the [Loop guide](guides/the-loop.md); this guide only maps it to tools. It replaces and expands Section 4 of the [[Agentic PM Playbook]].

**Last updated:** 2026-10-01
**See also:** [[Signal Ledger]], [[Agentic PM — Agent Capability Framework]], [[How to Use the Agents]], [The Loop](guides/the-loop.md)

> **Legacy terminology.** Earlier versions of this guide used the OKR-then-OST model (Objective, Desired Outcome, Experiment). In Loop, Objective and Desired Outcome are one **Outcome**, Experiment is a **Test**, and the Opportunity is the tree's root. Legacy terms appear below only in migration notes, skill ids, capability keys, and provider-native object names (for example a tool's own "Objective" type), and each is flagged where it appears.

---

## 1. The Tool-Agnostic Model

Regardless of which tools you use, the product system requires a home for each capability. `pm-config.md` selects a named profile and optional per-capability overrides using the canonical [integration-routing contract](skills/integration-routing/SKILL.md). If any capability lacks a clear, single home, state fragments and becomes unreliable.

The required capability keys are `vision`, `research_capture`, `insights`, `okrs`, `ost`, `experiments`, `roadmap`, `delivery`, and `reporting_archive`. The keys `okrs`, `ost`, and `experiments` are legacy contract names kept so existing configurations stay valid; read them as the Loop layers they now cover: `okrs` = Outcomes, Key Results, and cycles; `ost` = Opportunities and Solutions plus the parent chain linking all five levels; `experiments` = Tests. Named profiles are starting points, not stack mandates: `compass-full`, `compass-obsidian-linear`, `markdown-linear`, and `jpd-jira`.

| Loop Level | What it is | "Done" means |
|---|---|---|
| **Opportunity** | A bounded, evidence-backed customer need or market opening; the root of the tree | Expressed in customer voice, backed by 2+ independent evidence sources (or tagged `weak`), names a segment, is not a solution in disguise |
| **Outcome** | The customer-behavior change that capturing the Opportunity requires (one sentence, no numbers) | Behavior-framed, owned by one team, traces to exactly one Opportunity, has 2-3 KRs |
| **Key Result** | The measurable signal that the Outcome is happening | Baseline, target, and date recorded (or baseline `TBD` with a task); outcome-measuring, at most 3 per Outcome |
| **Solution** | A candidate way to move a KR | At least 3 per KR before any are eliminated; exactly one parent KR; riskiest assumption named |
| **Test** | A minimum experiment on one Solution assumption | Written success and kill conditions before the test starts; result logged against the KR it informs |
| **Roadmap Item / build items** | Committed delivery work, admitted only after the Solution clears its investment gate | Traceable to a cleared Solution and, through it, to the KR, Outcome, and Opportunity |

**Signals** (raw discovery inputs: quotes, tickets, survey responses, behavioral data) are not a tree level. They attach to Opportunities, or to the Solution or Test they bear on, and are logged with source, date, segment, and confidence. They are never attached to KRs.

**Parent chain and stable IDs.** Every record has exactly one parent: Outcome to Opportunity, KR to Outcome, Solution to KR, Test to Solution. Every adapter must preserve that chain and the stable ID of each record. Markdown identifiers are `OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, and `TST-n`; other providers keep their native IDs and store the Loop ID in a field or label where practical. Where a provider cannot represent a level natively, the adapter states an interim mapping (a label, issue type, or custom field plus an explicit parent link) and never silently flattens the hierarchy.

**The single most important principle:** pick one authoritative home per level and do not let it drift. Teams routinely end up with opportunities in Linear, JPD, Notion, and a Miro board simultaneously. When that happens, no one trusts any of them. The tree structure especially must have exactly one source of truth.

**Migrating legacy data.** Convert deliberately, following the legacy mapping in the [Loop guide](guides/the-loop.md): each legacy Desired Outcome (or Objective) becomes an Outcome, each Opportunity beneath it becomes a candidate parent Opportunity, Solutions re-parent to the KR the Opportunity most directly moves, and Experiments become Tests. Record the old identifier in the new record before retiring the old one.

---

## 2. JPD + Jira

Jira Product Discovery (JPD) is the most native fit for the discovery levels; Jira handles delivery. The boundary is clear: JPD owns the Loop tree, Jira owns build work.

### Level Mapping

| Loop Level | JPD / Jira Construct | Notes |
|---|---|---|
| Opportunity | JPD Opportunity (issue type) | The tree root: no parent. Link all supporting Insights. Carries the `OPP-n` ID in a label or field. |
| Outcome | JPD Goal (or an `Outcome` issue type if Goals are unavailable) | Parent link to exactly one Opportunity. Archive Outcomes when the behavior change is reached or abandoned; do not delete. |
| Key Result | Interim: `Key Result` issue type (or custom fields: baseline, target, date, current) linked to its Outcome | JPD has no native KR level. Use the `OUT-n-KR-n` ID in a field and keep the Outcome link explicit; 2-3 per Outcome. |
| Solution | JPD Solution (issue type) with a parent link to a Key Result | Keep at least 3 per KR until assumption testing narrows the field. Because JPD hierarchy is shallow, store the parent KR in a link field and mirror its ID in a `Parent ID` field. |
| Test | JPD Test (issue type), child of a Solution | Use the Test field template below. Link results via the Learnings tab. |
| Roadmap Item / build items | JPD delivery ideas and Jira stories and tasks | Admit only after the Solution clears its investment gate; link to the Solution before moving to a sprint. |
| Signals | JPD Insights | The signal ledger lives here. See [[Signal Ledger]] for tagging convention. |

If your JPD is configured with a single generic Ideas type, use the labels `opportunity`, `outcome`, `key-result`, `solution`, and `test` plus the `Parent ID` field to carry the level and parent chain.

### A Note on Insights vs. Learnings

JPD has two distinct signal-related concepts that are easy to conflate:

**Insights** are standalone entries for raw customer signals: quotes, tickets, interview moments. They exist independently, can be linked to multiple Opportunities, Solutions, or Tests, and are queryable in aggregate. This is the signal ledger layer. Insights are inputs to discovery.

**The Learnings tab** appears on individual Opportunities, Solutions, and Tests. It surfaces Insights linked to that item, plus notes and conclusions from test results. Learnings are outputs from discovery: what the team concluded after running a Test or reviewing evidence.

The rule: use Insights for signals, use Learnings for conclusions. Never log raw customer quotes directly onto the Learnings tab; they belong as Insights that get linked to the relevant item.

### JPD Insight Tagging Convention

Every Insight logged in JPD should carry these fields. This is your signal ledger in JPD form.

| Field | Values / Format |
|---|---|
| Source type | `interview`, `support-ticket`, `review`, `survey`, `sales-call`, `nps` |
| Segment | Customer segment name (match your standard segmentation) |
| Severity | `high`, `medium`, `low` |
| Tree mapping | Linked Opportunity (or, when specific, the Solution or Test it bears on) |
| Confidence | `high`, `medium`, `low`, `hypothesis`; use the [[Signal Ledger]] confidence criteria |

Never log an Insight without a source type and segment. An unattributed signal is not evidence.

### JPD Status Workflows

**Opportunities:**

```
Exploring → Validating → Prioritized → Active → Archived
```

- **Exploring:** Signal exists but fewer than 2 independent sources. Don't add Outcomes or Solutions yet.
- **Validating:** Actively gathering evidence. May run discovery interviews against this Opportunity.
- **Prioritized:** Meets the evidence bar (2+ sources, customer-voice framing, named segment). Ready to be given an Outcome with 2-3 KRs.
- **Active:** At least one Outcome is being pursued: its KRs have Solutions and Tests in flight. Outcome health (pursuing, sustained, retired) rolls up to this status.
- **Archived:** Opportunity invalidated or deprioritized. Keep it; a killed branch is a learning.

**Solutions:**

```
Exploring → Testing → Validated → Building → Shipped | Killed
```

- **Exploring:** Hypothesis named, assumptions not yet mapped.
- **Testing:** A Test is running or designed and ready to run.
- **Validated:** Riskiest assumption passed its Test and the investment gate is cleared. Cleared for build investment.
- **Building:** Active delivery work in Jira. Solution linked to sprint stories.
- **Shipped:** In production. Link to the Jira release.
- **Killed:** Assumption failed its Test. Archive with reason; don't delete.

### Jira Test Issue Template

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
[Fill in after the Test runs. Note the KR it informs.]

Next action:
[Proceed / Kill / Iterate, with rationale.]
```

The kill condition must be filled in before the Test starts. If it isn't, the Test isn't ready to run.

### JPD Automation Rules

Set these up once and run them as a background health check:

- **Orphaned solutions:** Flag any Solution with no linked parent KR. A Solution without a parent is a feature request in disguise.
- **Uncovered KRs:** Flag any KR with no Solution, and any Outcome with fewer than 2 or more than 3 KRs.
- **Rootless Outcomes:** Flag any Outcome with no linked Opportunity.
- **Unmapped signals:** Flag Insights with no linked Opportunity after 14 days. A signal that hasn't been mapped within two weeks is probably getting lost.
- **Stale exploration:** Weekly digest of Opportunities and Solutions in `Exploring` status with no linked Test after 21 days. If something has been "exploring" for three weeks with no Test running, it needs a decision: commit to validating or archive it.

### Note on Issue Type Configuration

If your JPD is configured with separate Opportunity, Outcome, Solution, and Test issue types (the recommended setup, with Key Result as an issue type or field set), no label workaround is needed: the issue type IS the distinction. The automation rules above still apply regardless of whether you use issue types or labels.

---

## 3. Compass

Compass can be the complete product operating system. In the `compass-full` profile it owns vision and product documents, research capture, synthesized insights, Outcomes and Key Results, the Opportunity-to-Test tree, roadmap, and delivery through Compass Tasks. Hybrid profiles may assign only some of those capabilities to Compass.

With the `compass-native-review` workflow profile, both `review_requests` and
`decision_records` resolve to `compass_decisions`. Agents use `request_decision`,
`list_decisions`, and `get_decision`; only human admins decide in Compass. These decisions
are tracking-only and never automatically mutate linked product or delivery state.
`prototype_artifacts` resolves separately to `compass_artifacts`, where agents publish
versioned prototypes and link them to Solutions and Decisions.

**Production URL:** https://compass.rbcodelabs.com
**Delivery work:** Compass Tasks in `compass-full`; Linear or Jira only when the `delivery` capability resolves there.

### Level Mapping

Compass object and tool names predate Loop and some are provider-native names (Objective, Experiment, `create_experiment`, and so on). The mapping below is the adapter contract: the left column is the playbook level, the right column is the Compass object that carries it.

| Loop Level | Compass Construct | Notes |
|---|---|---|
| Opportunity | Opportunity | The tree root. Customer-voice framing, evidence linked. |
| Outcome | Compass **Objective** (provider-native name) in an active cycle | One Objective record carries one Outcome: the single merged object that replaces the old Objective-plus-Desired-Outcome pair. Link it to its parent Opportunity (`link_opportunity_to_objective`). |
| Key Result | Key Result under the Outcome's Objective | 2-3 per Outcome. Link the Opportunity to the KR as well (`link_opportunity_to_kr`) so the ancestry is queryable from either side. |
| Solution | Solution linked to its parent KR (`link_solution_to_key_result`) | Add 3+ per KR before narrowing. Compass may still show the Solution beneath an Opportunity; treat the KR link as the single Loop parent and the Opportunity as ancestry. Do not link one Solution to two KRs as parents. |
| Assumption | Assumption (child of Solution) | Tag with risk level: HIGH / MEDIUM / LOW. |
| Test | Compass **Experiment** (provider-native name), linked to an Assumption | Must have a written kill condition before moving to RUNNING. |
| Prototypes | Artifact (linked to Solutions and Decisions) | Publish self-contained HTML as a versioned Artifact; use Docs for narrative context, not as a pointer to a machine-local prototype. |
| Roadmap Item / build items | Roadmap Item, Compass Tasks, or configured external tracker | Resolve `delivery` separately and link tasks to the Roadmap Item and the cleared Solution. |
| Signals | Research + FeedbackItem + linked Opportunities | Compass can own both raw research and structured insight; a hybrid profile may route raw capture elsewhere. |

Compass stores its own record IDs; where a custom field is available, set the Loop ID (`OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`) through `set_custom_field_value` so the parent chain reads the same across providers.

### Status Workflows

**Opportunities:**
```
EXPLORING → VALIDATING → PRIORITIZED → ACTIVE → ARCHIVED
```

- **EXPLORING:** Signal exists but fewer than 2 independent sources. Do not add Outcomes or Solutions yet.
- **VALIDATING:** Actively gathering evidence. At least 1 strong signal logged.
- **PRIORITIZED:** Evidence bar met: 2+ independent sources, customer-voice framing, named segment. Ready to be given an Outcome.
- **ACTIVE:** At least one Outcome is being pursued; its Solutions and Tests are in flight.
- **ARCHIVED:** Invalidated or deprioritized. Keep it; a killed branch is a learning.

**Solutions:**
```
IDEA → VALIDATED → IN_DELIVERY → SHIPPED | KILLED
```

**Tests (Compass Experiments):**
```
DESIGNING → RUNNING → COMPLETE | KILLED
```

The kill condition must be written before moving to RUNNING. `conclude_experiment` (PROCEED / KILL / ITERATE) auto-updates the linked Assumption status; do not manually set assumption status.

### Outcome and KR Setup

Create one cycle per planning period. Each Outcome (an Objective record) is created under the cycle, linked to its parent Opportunity, and given 2-3 Key Results. Solutions then attach to the KRs.

```
create_okr_cycle(workspaceId, name, startDate, endDate)   → cycleId
create_objective(workspaceId, cycleId, title)              → outcomeId (Compass Objective)
link_opportunity_to_objective(opportunityId, outcomeId)    -- parent Opportunity
add_key_result(outcomeId, title, target, unit)             → keyResultId
link_solution_to_key_result(solutionId, keyResultId)       -- Solution's single parent
log_checkin(keyResultId, value, note)                      -- update progress
```

(The tool names `create_okr_cycle`, `create_objective`, and `create_experiment` are Compass-native; they create the cycle, Outcome, and Test records respectively.)

### Roadmap

The Compass roadmap is a NOW / NEXT / LATER kanban. Items hang off a Solution and are created by promoting a Solution that has cleared its investment gate (`promote_to_roadmap`) or creating them directly (`add_to_roadmap`). Each item links to its Solution and, through it, to the KR, Outcome, and Opportunity; it can also link to a Test or Squad.

Delivery lives in the provider resolved for `delivery`. With Compass Tasks, keep execution and strategy linked natively. With Linear or Jira, reference the Compass Roadmap Item and Solution IDs in the external epic or issue.

### Signal Layer

Compass has two paths for signals:

**Raw research capture:**
With `compass-full`, capture interview notes, support reviews, and quotes in Compass research/docs. A hybrid profile can instead route `research_capture` to Obsidian; that is a configuration choice, not a universal recommendation.

**Direct FeedbackItem logging:**
For public-facing signals (portal submissions, NPS), Compass captures them natively at `/portal/{org}/{ws}/feedback`. Use `list_feedback` to review and link to Opportunities.

The rule: write to the resolved authoritative provider and link synthesized insights to Opportunities (or the Solution or Test they bear on). Any secondary copy must be labeled as an inbox, export, cache, or snapshot.

### MCP API for Agents

Compass exposes a Streamable HTTP MCP endpoint at `https://compass.rbcodelabs.com/api/mcp`. Agents use it to read the full product snapshot and update state inline during sessions. See the `compass-workflow` skill for the complete tool catalog and session protocol.

### Automation Notes

Unlike JPD, Compass has no native automation engine. Use Claude (via MCP) as the automation layer:

- **Weekly snapshot:** call `get_workspace_summary` + `list_opportunities` + `list_experiments("RUNNING")` (the Tests in flight) at the start of each week to generate a tree health check across all five levels.
- **Coverage gaps:** after any session, verify every active KR has at least one non-KILLED Solution (aim for 3+ before narrowing), every Outcome has 2-3 KRs, and every Outcome has a parent Opportunity.
- **Orphaned solutions:** flag any Solution with no parent KR.
- **Stale DESIGNING Tests:** flag any Test in DESIGNING status for more than one session; the kill condition was never written.
- **KR check-ins:** call `log_checkin` for each active KR at the cadence the team agrees on (weekly is the default). Check-ins move up the tree: Test results update Solution confidence, and KR movement updates Outcome health and Opportunity status.

---

## 4. Linear + Obsidian

Linear handles all work tracking. Obsidian holds the discovery artifacts because Linear has no native discovery layer. The boundary is equally clear: Linear owns issues and statuses, Obsidian owns the Loop tree structure and signal ledger.

### Level Mapping

Linear lacks native Opportunity, Outcome, KR, and Test levels, so this stack uses labels and a project, with the parent chain recorded explicitly in the tree document and in each issue's description.

| Loop Level | Construct | Location |
|---|---|---|
| Opportunity | Linear issue, label: `opportunity` (root: no parent issue) | Linear, ID referenced in the tree doc |
| Outcome | Linear project (one per Outcome); description holds the Outcome statement, owner, cycle, and parent `OPP-n` | Linear project |
| Key Result | Linear issue, label: `key-result`, in the Outcome's project (interim: Linear has no KR object); carries baseline, target, date | Linear |
| Solution | Linear issue, label: `solution`, parent: the KR issue | Linear |
| Test | Linear issue, label: `test`, parent: the Solution issue | Linear |
| Roadmap Item / build items | Linear stories and tasks, linked to the cleared Solution | Linear |
| Signals | Signal ledger entries | Obsidian: `Discovery/Signal Ledger.md` |
| Tree structure | Loop tree document: **source of truth** | Obsidian: `Discovery/Loop-[initiative].md` |

The Obsidian tree doc is the single source of truth for the structure. Linear issue IDs appear in it as references, but the hierarchy (Opportunity, Outcome, KR, Solution, Test) lives in Obsidian. Linear statuses reflect current work state; Obsidian reflects current thinking. Every Linear issue description names its parent's Loop ID so the chain survives if the issue is moved.

### Linear Issue Convention for Opportunities

- **Label:** `opportunity`
- **Title format:** `[Opportunity] Users struggle to X when Y`
- **Description:**
  - Customer voice statement (the need, not a solution)
  - Evidence summary: source count, source types, date range, segment
  - Confidence level: High / Medium / Low / Hypothesis
  - Link to Obsidian ledger entries (use the session date as anchor)

### Linear Status Workflow

All discovery issues (opportunities, KR coverage, solutions, tests) share this workflow:

```
Exploring → Testing → Validated → Building → Shipped | Archived
```

Map these to Linear's default statuses or create a custom workflow per the Linear docs. The status labels must match between Linear and the Obsidian tree doc; when they drift, the tree becomes unreliable.

### Obsidian Loop Tree Document

Update the tree doc weekly. The format mirrors the hierarchy directly:

```markdown
# Loop: [Initiative Name]

## Opportunity OPP-1: [Customer voice statement] [Exploring | Validating | Active | Archived]
Evidence: [N sources, types and dates]
Segment: [Name]
Confidence: Medium
Linear: PROJ-42

### Outcome OUT-1: [Behavior change, one sentence] [Cycle, owner]
Linear project: [name]

#### Key Result OUT-1-KR-1: [Measurable signal] [Baseline → target by date]
Linear: PROJ-48

##### Solution SOL-1: [Hypothesis name] [Exploring | Testing | Validated | Killed]
Linear: PROJ-55

###### Test TST-1: [What we're testing] [Running | Complete]
Assumption: [State it]
Kill condition: [State it]
Result: [Fill in after]
Linear: PROJ-61
```

### Handling the Signal Layer

Linear has no native signal capture. Use this handoff protocol:

1. Log all raw signals in `Discovery/Signal Ledger.md` in Obsidian, using the standard synthesis format from the [[Signal Ledger]] doc.
2. When a signal cluster reaches medium confidence (2+ independent sources, consistent underlying need, named segment), create the Linear Opportunity issue.
3. In the Linear issue description, back-reference the ledger entry by session date.
4. In the Obsidian ledger entry, forward-reference the Linear issue ID.

Never create a Linear Opportunity issue before you have at least one verbatim quote logged in the ledger. The quote is the gate.

---

## 5. Linear + Obsidian + Repo Bridges (Solo → Team)

An extension of the Linear + Obsidian stack that solves its core limitation: Obsidian is a single-user system. A co-founder, early engineer, or future PM can't open your vault. This pattern uses a git repository as the shared, team-accessible canonical store for structured product docs, while keeping Obsidian as the primary editing interface via bidirectional vault bridges.

**When to use this:** You're a solo founder who expects to bring on a co-founder or first team member within 6–18 months and want product docs accessible via standard git tooling from day one. Or you already have a small team (2–4 people) who are comfortable with git.

**When to skip it:** Your team includes non-technical members who won't work in GitHub. Evaluate Notion or Confluence instead once the team exceeds ~5 people.

---

### Architecture

```
Obsidian vault (the PM's editing interface)
    ↕ bidirectional vault bridge
Git repo: product/ folder (team-accessible canonical store)
    ↔ GitHub PRs (team edits, reviews, change history)
```

The vault bridge syncs changes in both directions. Edits made in Obsidian propagate to the repo (and can open a PR). Edits made in the repo (by a teammate in VS Code or GitHub) sync into the vault on the next bridge pull.

---

### Level Mapping

| Loop Level | Construct | Location |
|---|---|---|
| Opportunity | Linear issue, label: `opportunity` + `product/loop.md` | Linear + repo (bridged) |
| Outcome | `product/loop.md` Outcome node + Linear project; the north-star framing lives in `product/vision.md` | Git repo (bridged) + Linear |
| Key Result | `product/loop.md` KR node + Linear issue, label: `key-result` (interim) | Git repo (bridged) + Linear |
| Solution | Linear issue, label: `solution`, parent: KR issue | Linear |
| Test | Linear issue, label: `test`, parent: solution | Linear |
| Roadmap Item / build items | Linear stories and tasks, linked to the cleared Solution; `product/roadmap.md` | Linear + repo (bridged) |
| Signals (structured) | `product/signals/Signal Ledger.md` | Git repo (bridged) |
| Signals (raw capture) | Session notes in Obsidian `Discovery/` | Vault only, not bridged |
| Tree structure | `product/loop.md`: **source of truth** | Git repo (bridged) |
| ICP | `product/icp.md` | Git repo (bridged) |

---

### Repo Folder Structure

One `product/` folder per repo, committed to the main branch:

```
product/
  vision.md          # North star, team, strategic bets
  icp.md             # Ideal customer profile, segments, anti-ICP
  loop.md          # Loop tree structure — source of truth
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
| Example Product A | `<repo-a>/product/` | `Products/Example Product A/` |
| Example Product B | `<repo-b>/product/` | `Products/Example Product B/` |

Set `autoSync: true` so the vault pulls from the repo on Obsidian open. Changes made in Obsidian can be pushed back to the repo and opened as a PR directly from the plugin.

---

### How the Team Interacts With Product Docs

**PM (vault-first):** Opens and edits `Products/[Product]/loop.md` in Obsidian. The bridge syncs changes back to the repo. The PM can open a PR from the plugin or push directly to main for low-stakes updates.

**Teammate (repo-first):** Clones the repo and edits `product/loop.md` in VS Code or GitHub. Opens a PR for review. On the next bridge pull, the change appears in the PM's vault.

**Both:** Linear for opportunities, key-result issues, solutions, tests, and delivery work. The tree in `product/loop.md` references Linear IDs; Linear issues link back to the tree doc.

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

Same as the base Linear + Obsidian stack (section 4), with one change: the tree source of truth lives in the repo's `product/loop.md`, not in an Obsidian-only file. This means team members can read and propose changes to the Loop tree structure via PR, not just the PM.

Follow the same signal-to-opportunity handoff protocol:

1. Log raw signals vault-only.
2. After synthesis, commit the structured entry to `product/signals/Signal Ledger.md`.
3. When a cluster reaches medium confidence (2+ independent sources), create the Linear Opportunity issue.
4. Update `product/loop.md` with the new Opportunity node (`OPP-n`) and the Linear ID.
5. In the Linear issue description, link back to the tree doc and the signal ledger entry date.

---

## 6. Markdown Only

For teams with no dedicated PM tool, or individuals bootstrapping a discovery practice. Everything lives in markdown files. The tradeoff: no automation, no status workflows, no linking infrastructure. The compensation: a weekly 10-minute manual review. Markdown is the only provider where every level has a native identifier: `OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`.

### File Structure

```
Discovery/
  Signal Ledger.md             # All synthesis sessions, chronological
  Loop-[initiative-name].md  # The tree: opportunity → outcome → key results → solutions → tests
  Tests.md                     # Optional: consolidated Test tracking table
```

Keep one tree file per initiative. If you merge multiple initiatives into one file, the tree structure collapses and priorities blur.

### Tree Document Structure

Use heading levels to represent the hierarchy directly. Each heading carries its stable ID so parents can be referenced from anywhere:

```markdown
## Opportunity OPP-1: [Customer voice] [Exploring] [Low confidence]
Evidence: [Source, date]
Segment: [Name]
Verbatim: "[Quote]"

### Outcome OUT-1: [Behavior change, one sentence] [Cycle, owner]

#### Key Result OUT-1-KR-1: [Measurable signal] [Baseline → target by date]

##### Solution SOL-1: [Hypothesis] [Exploring]
Parent: OUT-1-KR-1
Riskiest assumption: [State it]

###### Test TST-1: [Test name] [Not started | Running | Complete]
Parent: SOL-1
Kill condition: [State it before starting]
Result: [Fill in after; note the KR it informs]
```

**Inline status tags:** Use bracketed labels in the heading: `[Exploring]`, `[Testing]`, `[Validated]`, `[Killed]`. They're searchable and visible without opening a tool.

**Inline confidence tags:** Add after the status tag: `[Low confidence]`, `[Medium confidence]`, `[High confidence]`, `[Hypothesis]`.

### The Weekly 10-Minute Review

Without automation, this is your only health-check mechanism. Do it on a fixed day:

1. Open the tree doc. Scan every node with a status.
2. Update any status that changed since last week.
3. Flag any Opportunity that's been `[Exploring]` for more than 3 weeks with no evidence added.
4. Flag any KR with no Solution, any Outcome without 2-3 KRs, and any Solution in `[Testing]` with no Test record.
5. Check the signal ledger: any signals from the last two weeks that haven't been mapped to an Opportunity?

The whole review should take under 15 minutes. If it takes longer, the tree is too wide.

---

## 7. Cross-Tool Principles

These apply regardless of tool stack.

**One source of truth per level.** Don't let Opportunities exist as separate records in both Obsidian and JPD. Pick the home before you start and enforce it.

**One parent each, preserved everywhere.** Outcome to Opportunity, KR to Outcome, Solution to KR, Test to Solution. Whatever the provider's native hierarchy looks like, the Loop parent chain and stable IDs survive; an interim label or field mapping is documented, never a silent flattening.

**Signals predate opportunities.** Never create an Opportunity record before you have at least one verbatim quote. The quote is the evidence; the Opportunity is the interpretation of the evidence.

**The signal-to-opportunity handoff requires medium confidence.** That means: 2 or more independent sources, a consistent underlying need across sources, and a named segment. A single strong interview quote is not enough (it may be recorded as a `weak` Opportunity with cheap validation).

**Solutions hang off KRs, and roadmap items hang off cleared Solutions.** A Solution is parented by exactly one KR; a Roadmap Item exists only after its Solution clears its investment gate.

**Tests must have a kill condition before they start.** The kill condition lives in the Test record, not in someone's head or a Slack message. If the Test record has no kill condition, the Test is not ready to start.

**Dead branches get archived, not deleted.** A killed Solution or archived Opportunity is a learning. Delete it and you lose the institutional memory of what you tried and why it didn't work. Archive with a one-sentence reason.

**Tree health checks are tool-agnostic.** Run the tree health check from the [[Agentic PM — Agent Capability Framework]] monthly across all five levels, regardless of which tool you use. The questions are the same; the interface to answer them is the only thing that differs.

---

## See Also

- [[Signal Ledger]]
- [[Agentic PM Playbook]]
- [[Agentic PM — Agent Capability Framework]]
- [[How to Use the Agents]]
