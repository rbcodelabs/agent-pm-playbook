# Team Role Profile — Product Manager

**Agent file:** `agents/pm.md`
**Companion to:** [[Agentic PM Playbook]] · [[Agentic PM — Agent Capability Framework]]
**Last updated:** 2026-05-14

---

## Role Summary

The PM agent is the discovery and strategy layer of the team. It translates customer
signals into structured opportunities, maintains the OST, designs experiments, and
produces the artifacts that connect engineering work to customer outcomes. It wraps
the three PM skills (`agentic-pm`, `ost-workflow`, `pm-signal-synthesis`) and extends
them with direct Obsidian vault integration for persistent artifact storage.

---

## Core Responsibilities

| Area | What the agent does |
|---|---|
| **Opportunity framing** | Translates raw signals into customer-voice opportunity statements with evidence attribution |
| **OST maintenance** | Builds, reviews, and health-checks the Opportunity Solution Tree |
| **Signal synthesis** | Clusters interviews, tickets, and feedback into OST-ready opportunities with confidence tags |
| **Experiment design** | Names riskiest assumptions, designs smallest-viable tests, defines kill conditions |
| **User stories** | Writes stories and acceptance criteria traceable to a specific opportunity and outcome |
| **Stakeholder communication** | Drafts weekly updates, retrospective summaries, and strategic memos |

---

## Skill Profile (from Agent Capability Framework)

The PM agent is optimized for Layers 1–2 of the capability framework, with Layer 3
support for experiment design and Layer 4 metacognition baked into its system prompt.

| Skill | Capability level |
|---|---|
| Transcript Synthesis | Strong — verbatim-first, quotes before interpretation |
| Signal Clustering | Strong — confidence-tagged, contradiction-aware |
| Opportunity Validation | Strong — rejects solution-language framing |
| Tree Health Checks | Strong — surfaces zombie experiments, orphaned solutions |
| Evidence Attribution | Strong — requires source for every opportunity |
| Assumption Decomposition | Medium — surfaces obvious assumptions; misses subtle ones |
| Escalation Calibration | Strong — explicit rules baked in |
| Longitudinal Pattern Tracking | Weak — limited by context window; requires user to surface history |

---

## Handoff Patterns

| Scenario | Handoff to |
|---|---|
| Validated opportunity, ready to design | **Architect** — system/feature design |
| User story written, ready to build | **Engineer** — implementation |
| Feature shipped, needs test coverage | **QA** — test strategy |
| Solution in review | **Reviewer** — code review |

---

## Escalation Rules

**Proceeds autonomously:**
- Transcript synthesis, signal clustering, first-draft experiment briefs
- OST structure suggestions, user story drafts, weekly update drafts

**Always surfaces and asks:**
- Proposing a new OST opportunity branch (adds to strategy)
- Recommending killing an existing branch (strategic write-off)
- Prioritization decisions (which opportunity to pursue)
- Interpreting ambiguous experiment results with strategic implications

---

## Common Failure Modes

| Failure | Root cause | Guard |
|---|---|---|
| Opportunities in solution language | Insufficient OST training | Explicit framing check in system prompt |
| Over-confident synthesis | Single-source clustering | Confidence tagging with source counts |
| Tree inflation (adding without pruning) | No proactive health check | Explicit zombie/orphan detection |
| Stakeholder-origin opportunities | Alignment pressure | Surface the alignment; verify evidence |
