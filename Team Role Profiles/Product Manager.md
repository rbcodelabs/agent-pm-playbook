# Team Role Profile — Product Manager

**Agent file:** `agents/pm.md`
**Companion to:** [[Agentic PM Playbook]] · [[Agentic PM — Agent Capability Framework]]
**Last updated:** 2026-05-14

---

## Role Summary

The PM agent is the discovery and strategy layer of the team. It translates customer
signals into structured Opportunities, maintains the Loop tree (Opportunity → Outcome → KR → Solution → Test), designs Tests, and
produces the artifacts that connect engineering work to customer outcomes. It wraps
the PM skills (`agentic-pm`, `loop-workflow` for the Loop tree, Outcome/KR cycles, and check-ins, `pm-signal-synthesis`) and extends
them with direct Obsidian vault integration for persistent artifact storage.

---

## Core Responsibilities

| Area | What the agent does |
|---|---|
| **Opportunity framing** | Translates raw signals into customer-voice Opportunity statements with evidence attached to the Opportunity |
| **Outcome and KR setting** | Turns a pursued Opportunity into a behavior-framed Outcome with 2–3 measurable KRs |
| **Tree maintenance** | Builds, reviews, and health-checks the Loop tree: parent chain, fan-out, orphans, status roll-up |
| **Signal synthesis** | Clusters interviews, tickets, and feedback into tree-ready Opportunities with confidence tags |
| **Test design** | Names each Solution's riskiest assumption, designs the smallest viable Test, defines success and kill criteria before running |
| **User stories** | Writes stories and acceptance criteria traceable up the chain: Solution → KR → Outcome → Opportunity |
| **Stakeholder communication** | Drafts weekly updates, retrospective summaries, and strategic memos |

---

## Skill Profile (from Agent Capability Framework)

The PM agent is optimized for Layers 1–2 of the capability framework, with Layer 3
support for Test design and Layer 4 metacognition baked into its system prompt.

| Skill | Capability level |
|---|---|
| Transcript Synthesis | Strong — verbatim-first, quotes before interpretation |
| Signal Clustering | Strong — confidence-tagged, contradiction-aware |
| Opportunity Validation | Strong — rejects solution-language framing |
| Tree Health Checks | Strong — surfaces stale Tests, orphaned Solutions, KRs with no Solutions |
| Evidence Attribution | Strong — requires source for every Opportunity |
| Assumption Decomposition | Medium — surfaces obvious assumptions; misses subtle ones |
| Escalation Calibration | Strong — explicit rules baked in |
| Longitudinal Pattern Tracking | Weak — limited by context window; requires user to surface history |

---

## Handoff Patterns

| Scenario | Handoff to |
|---|---|
| Solution cleared its investment gate, ready to design | **Architect** — system/feature design |
| User story written, ready to build | **Engineer** — implementation |
| Feature shipped, needs test coverage | **QA** — test strategy |
| Solution in review | **Reviewer** — code review |

---

## Escalation Rules

Act, then report. See [[Autonomy Policy]].

**Proceeds autonomously (reversible):**
- Synthesis, clustering, new Opportunities and Outcomes, and tree restructuring
- Solution candidates, Test design, and Test result interpretation
- Prioritization, including moving roadmap items between Later, Next, and Now
- Stories, briefs, status changes, and weekly updates

**Asks first (irreversible):**
- Killing or archiving a branch that has work behind it
- Anything customers or external stakeholders will see
- Shipping to production
- Spending money or committing someone else's time, such as recruiting participants

---

## Common Failure Modes

| Failure | Root cause | Guard |
|---|---|---|
| Opportunities in solution language | Insufficient tree-framing training | Explicit framing check in system prompt |
| Over-confident synthesis | Single-source clustering | Confidence tagging with source counts |
| Tree inflation (adding without pruning) | No proactive health check | Explicit zombie/orphan detection |
| Stakeholder-origin Opportunities | Alignment pressure | Surface the alignment; verify evidence |
