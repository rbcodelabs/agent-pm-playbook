# PM Tool Integration Guide

> A practical reference for mapping the full OST workflow into your PM tool stack. This guide replaces and expands Section 4 of the [[Agentic PM Playbook]].

**Last updated:** 2026-05-15
**See also:** [[Signal Ledger]], [[Agentic PM — Agent Capability Framework]], [[How to Use the Agents]]

---

## 1. The Tool-Agnostic Model

Regardless of which tools you use, the OST requires a home for six distinct layers. If any layer lacks a clear, single home, it will fragment across Slack messages, personal notes, and outdated docs — and the tree becomes unreliable within weeks.

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

## 3. Linear + Obsidian

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
Linear: GW-42

#### Solution: [Hypothesis name] [Exploring | Testing | Validated | Killed]
Linear: GW-55

##### Experiment: [What we're testing] [Running | Complete]
Assumption: [State it]
Kill condition: [State it]
Result: [Fill in after]
Linear: GW-61
```

### Handling the Signal Layer

Linear has no native signal capture. Use this handoff protocol:

1. Log all raw signals in `Discovery/Signal Ledger.md` in Obsidian, using the standard synthesis format from the [[Signal Ledger]] doc.
2. When a signal cluster reaches medium confidence (2+ independent sources, consistent underlying need, connected to the active outcome), create the Linear opportunity issue.
3. In the Linear issue description, back-reference the ledger entry by session date.
4. In the Obsidian ledger entry, forward-reference the Linear issue ID.

Never create a Linear opportunity issue before you have at least one verbatim quote logged in the ledger. The quote is the gate.

---

## 4. Markdown Only

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

## 5. Cross-Tool Principles

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
