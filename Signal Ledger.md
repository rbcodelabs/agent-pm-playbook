# Signal Ledger

> The persistent, dated log of discovery synthesis outputs. The memory layer that makes [[Longitudinal Pattern Tracking]] possible.

**Part of:** [[Agentic PM Playbook]]
**Last updated:** 2026-05-15

---

## What the Signal Ledger Is

The signal ledger is a running record of what you learned in each discovery session: what signals surfaced, where they came from, how severe they are, and how they map to your OST. Every synthesis session produces one entry. The ledger accumulates over weeks and months into a queryable record of your product discovery work.

Its job is narrow and specific: make longitudinal comparison possible. The reason you can't just rely on session notes or your own memory is that frequency trends, intensity escalations, and emerging opportunity clusters are only visible across time. A pain mentioned in two interviews in January, five in February, and nine in March is telling you something important. Without a ledger, you never see that trajectory.

The ledger is not a task list, a backlog, or a transcript archive. It does not replace your OST. It is a signal record, structured consistently enough that you can paste a section of it into a prompt and ask an agent to compare it to today's synthesis. Consistency of schema across entries is what makes it useful. An entry format you only follow sometimes is barely better than nothing.

---

## The Schema

Every ledger entry captures the following fields. The schema is tool-agnostic — the sections below show how to implement it in JPD, Linear + Obsidian, or plain markdown.

**Entry-level fields:**

| Field | Description |
|---|---|
| Date | ISO date of the synthesis session (YYYY-MM-DD) |
| Session type | One of: Interview, Support review, NPS analysis, App review sweep, Sales call |
| Sources | Count and description — e.g., "3 customer interviews, enterprise segment" |
| Customer segment | The segment represented in this session's sources |

**Per signal cluster:**

| Field | Description |
|---|---|
| Opportunity theme | A short label for the cluster — should match OST opportunity name if mapped |
| Verbatim quotes | 2-3 direct quotes that represent the cluster |
| Source identifiers | Which interviews, tickets, or reviews this cluster comes from |
| Severity | Low / Medium / High / Critical (see definitions below) |
| OST mapping | Opportunity name from the OST, or "Unmapped" |
| Confidence | Low / Medium / High |

**Severity definitions:**

| Level | What it means |
|---|---|
| Low | Minor friction, hedged language, no behavioral impact |
| Medium | Recurring frustration, affects workflow, no workaround yet |
| High | Blocker, workaround adopted, mentioned unprompted |
| Critical | Churn risk, management escalation, customers switching tools |

**Session-level notes (end of entry):**

- Corpus quality: anything notable about source quality or representativeness
- Bias risks: segments over- or under-represented this session
- What to watch next session: signals that appeared for the first time or seemed to be shifting

---

## The Template

Copy-paste this for each new entry. Use a horizontal rule (`---`) to separate entries in a flat markdown file.

```markdown
---
**Date:** YYYY-MM-DD
**Session type:** Interview | Support review | NPS analysis | App review sweep | Sales call
**Sources:** [count and description, e.g., "4 customer interviews, SMB segment"]
**Customer segment:** [segment name]

### Signal Clusters

#### [Opportunity theme]
- **Verbatims:**
  - "[quote 1]" (Source: [ID])
  - "[quote 2]" (Source: [ID])
  - "[quote 3]" (Source: [ID])
- **Severity:** Low | Medium | High | Critical
- **OST mapping:** [Opportunity name] | Unmapped
- **Confidence:** Low | Medium | High

#### [Opportunity theme]
- **Verbatims:**
  - "[quote 1]" (Source: [ID])
  - "[quote 2]" (Source: [ID])
- **Severity:** Low | Medium | High | Critical
- **OST mapping:** [Opportunity name] | Unmapped
- **Confidence:** Low | Medium | High

### Session Notes
- **Corpus quality:** [notes on source quality or gaps]
- **Bias risks:** [segments over/under-represented]
- **Watch next session:** [signals to track forward]
---
```

---

## Week-to-Week Workflow

### After each synthesis session

1. Complete synthesis (using the pm-signal-synthesis skill or your own prompt).
2. Log the entry using the template above. One entry per session. Do not batch multiple sessions into one entry — date granularity matters for longitudinal analysis.
3. Run a longitudinal check: compare this session's clusters against the prior four weeks of ledger entries. Use the longitudinal check prompt from [[Longitudinal Pattern Tracking]].
4. Update OST mappings: if a cluster reaches Medium+ confidence and is currently Unmapped, evaluate whether it warrants a new OST opportunity branch.
5. Note anything worth watching in the Session Notes field before closing.

### Monthly

1. Collect the past 90 days of ledger entries.
2. Run the monthly trends briefing prompt from [[Longitudinal Pattern Tracking]].
3. Review output with the OST: promote high-trajectory opportunities, archive stale ones, flag intensity escalations as potential retention risks.
4. Update OST confidence levels based on the trends briefing.

The longitudinal check prompt and the monthly trends briefing prompt both live in [[Longitudinal Pattern Tracking]] under "Sample Prompts."

---

## Where Does the Ledger Live?

The right implementation depends on your tooling setup:

- **Jira Product Discovery + Jira:** The ledger IS the JPD Insights backlog. See the JPD implementation section below.
- **Linear + Obsidian:** The ledger lives in Obsidian as a flat markdown file. See the Linear + Obsidian section below.
- **Markdown only:** The ledger lives in `Discovery/Signal Ledger.md`. See the markdown-only section below.

All three implementations use the same schema and the same workflow. The only differences are where the file lives and how OST mappings are linked.

---

## JPD + Jira Implementation

JPD Insights are the native signal capture layer for this setup. The signal ledger IS the Insights backlog, provided tags are applied consistently. Each signal cluster becomes one Insight — not one Insight per raw quote, and not one Insight per synthesis session.

### Required fields on every JPD Insight

| Signal Ledger field | JPD field |
|---|---|
| Date | Insight creation date (auto-set) |
| Session type | Label: `interview` / `support` / `nps` / `app-review` / `sales-call` |
| Customer segment | Custom field: Segment (or label if custom fields unavailable) |
| Opportunity theme | Insight title |
| Verbatims | Insight description — paste 2-3 quotes, each with source ID |
| Severity | Custom field: Severity (Low / Medium / High / Critical) |
| OST mapping | Linked JPD Idea (opportunity), or label `unmapped` |
| Confidence | Custom field: Confidence (Low / Medium / High) |

### Workflow

1. After synthesis, create one Insight per signal cluster. Do not create Insights for individual quotes.
2. Add verbatims and source identifiers to the Insight description.
3. Apply all required labels and custom field values before saving.
4. Link each Insight to an existing opportunity Idea if one exists. If no match, label `unmapped` and revisit at the next OST review.
5. For longitudinal checks: use a saved JPD filter scoped to the past 30 days (or 60/90 for monthly). Filter by OST opportunity label. Paste the filtered Insight list into the longitudinal check prompt.
6. Monthly: export the past 90 days of Insights and paste into the trends briefing prompt.

### Limitation

JPD has no native longitudinal summary view. There is no built-in way to visualize frequency trends over time. The workaround is: saved filter by date range and opportunity label, then a prompt-based analysis. This is manual but functional. If you run monthly trends briefings consistently, the absence of a native view matters less.

---

## Linear + Obsidian Implementation

Signals live in Obsidian. Opportunities, solutions, experiments, and build delivery live in Linear. The OST tree structure also lives in Obsidian as the source of truth for the narrative.

### File location

`Discovery/Signal Ledger.md` in your Obsidian vault (relative to vault root).

Create the `Discovery/` folder if it does not exist. The OST for your active initiative lives at `Discovery/OST-[initiative-name].md`.

### Workflow

1. After synthesis, open `Discovery/Signal Ledger.md` and add a new entry at the top of the file using the template. Most-recent-first keeps the file usable without scrolling.
2. For each signal cluster, check whether it maps to an existing OST opportunity. If yes, record the opportunity name. If no, mark Unmapped.
3. When a cluster reaches Medium+ confidence and has appeared in at least two independent sessions, create a Linear issue labeled `[opportunity]`. Add the Linear issue ID to the ledger entry's OST mapping field (e.g., `Unmapped → GW-142`).
4. For longitudinal checks: paste the relevant date range from the ledger directly into the longitudinal check prompt. No export needed.
5. Monthly: copy the past 90 days of entries and paste into the trends briefing prompt.

### Note on OST source of truth

The OST markdown file in Obsidian is the canonical structure. Linear tracks the work items that flow from validated opportunities. Keep them in sync: when you create a Linear opportunity issue, update the OST file with the Linear ID so you can navigate between them.

---

## Markdown-Only Implementation

For teams or individuals with no dedicated PM tool. Everything lives in plain files.

### File locations

| Artifact | File path |
|---|---|
| Signal ledger | `Discovery/Signal Ledger.md` |
| OST | `Discovery/OST-[initiative-name].md` |
| Experiments | Table in the OST doc, or `Discovery/Experiments.md` if the list grows |

### Workflow

Same as Linear + Obsidian, except there are no Linear issue IDs to link. OST mappings reference opportunity names from the OST markdown file directly. When a cluster reaches Medium+ confidence, add a new opportunity node to the OST file manually and record the opportunity name in the ledger.

For longitudinal analysis: paste the relevant ledger section into the longitudinal check prompt. The analysis works exactly the same as any other implementation. The only difference is there is no external tool to link back to.

Keep entries most-recent-first. Add a horizontal rule between entries. Apply the same schema discipline as any other implementation — the value of the ledger is entirely in the consistency of its structure across sessions.

---

## See Also

[[Longitudinal Pattern Tracking]] — the skill doc that explains why this artifact exists, what good longitudinal analysis looks like, and the full set of prompts for longitudinal checks and monthly trends briefings.

[[PM Tool Integration Guide]] — tool-by-tool setup guidance for the full agentic PM stack.

[[Agentic PM Playbook]] (Section 3.2) — the continuous discovery workflow this ledger supports.
