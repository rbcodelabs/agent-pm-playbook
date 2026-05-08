# Evidence Attribution

> The discipline of requiring every OST node to trace back to specific, named customer signals — and the agent's practice of enforcing that standard and flagging nodes that can't meet it.

**Layer:** 2 — OST Integrity & Maintenance
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Evidence attribution is the practice of treating every opportunity in the Opportunity Solution Tree as a claim that must be backed by a citation. Not "multiple customers have mentioned this" — that is not a citation. A citation is a specific interview session date, a verbatim quote, a support ticket ID, a survey response with a known respondent segment, or an analytics event with a specific cohort definition and date range. The agent's job is to require this specificity at entry, maintain it over time, and surface opportunities that have lost their source trail.

The distinction between vague attribution and genuine attribution is not merely academic. Vague attribution ("multiple customers have mentioned this") cannot be evaluated, challenged, or updated. You don't know if "multiple" means two or twelve. You don't know if those customers were enterprise users or free-tier users, power users or churned users, users from a specific time period when a bug was present that has since been fixed. You can't go back and re-read the original signals to see if they actually support the opportunity as written, or if they were reinterpreted through the lens of what the team wanted to find. Specific attribution can be checked. It can be weighed. It can be extended or challenged by new evidence.

The agent enforces evidence attribution through two mechanisms. The first is the entry gate: when a new opportunity is submitted, the agent should request specific sources before accepting the entry. The format matters — not "what's the evidence?" but "please provide: the interview date or session ID, the verbatim quote or ticket ID number, and the user or segment." This structured request reduces the chance that the PM provides a paraphrase or a generalization and mistakes it for a citation. The second mechanism is the ongoing audit: the agent periodically checks whether existing opportunities still have accessible source trails. Source trails erode over time — a spreadsheet gets deleted, a researcher leaves the team, a tagged ticket category gets reorganized. An opportunity can arrive with good attribution and lose it without anyone noticing.

Evidence attribution is also about understanding what kinds of evidence are stronger than others. A verbatim quote from a discovery interview conducted using the continuous interview methodology — where the PM is directly asking about current problems, not about potential features — is stronger than a quote from a usability test where the user was reacting to a prototype. A cluster of 47 support tickets tagged with the same problem category is stronger than two tickets from the same power user. Behavioral data showing a measurable user action is stronger than a stated preference from a survey. The agent should be able to communicate these gradations, not just confirm that some evidence exists.

## Why It Matters

The failure to enforce evidence attribution is how the Opportunity Solution Tree becomes what you feared when you decided to do continuous discovery: a rationalization engine. Without required sourcing, anyone can assert an opportunity. The PM can assert it from a hunch. A stakeholder can assert it from a sales call. An engineer can assert it from a Slack conversation. And none of these assertions are explicitly wrong — they may even be directionally correct — but they are not discovery. They are the opinions of people who were already inside the building, dressed in the language of customer insight.

The compounding problem is that evidence-free opportunities look the same as evidence-backed ones in the tree. There is no visual difference between "Users struggle to track version history" (based on 12 interviews, 3 cohorts, 60 support tickets) and "Users struggle to track version history" (based on a VP's impression of three enterprise deals). Both exist in the tree. Both generate solutions. Both run experiments. One of them is grounded in customer reality; the other is not. Without attribution metadata, the PM cannot tell them apart — not months later, not even weeks later when memory has faded.

There is also a culture effect. When evidence attribution is required and enforced consistently, it changes how opportunities enter the tree in the first place. PMs stop submitting hunches because they know they'll be asked for sources they don't have. Stakeholders learn that "I heard from a customer" is not sufficient and start asking for the research. Over time, the discipline of attribution creates an environment where the bar for entering the tree is genuinely high — and the opportunities that make it in are worth the investment of solution exploration.

## What Good Looks Like

**Well-attributed opportunity (good):**
> **Opportunity:** Users lose track of where they were after a multi-day gap in usage.
>
> **Evidence:**
> - Quote: "I come back after the weekend and I honestly have no idea where I was. I just start scrolling." — Interview session 2026-04-12, User: P-014 (mid-market, active 6 months)
> - Quote: "The worst is when I had momentum on something and then I get pulled away for a week and I can't reconstruct where I was." — Interview session 2026-04-19, User: P-022 (enterprise, power user)
> - Support tickets: 47 tickets tagged "session continuity" in Q1 2026 (tag report: support-q1-2026.csv)
> - NPS verbatim: 3 detractor comments referencing "losing progress" in March 2026 NPS batch
>
> **Evidence strength:** Strong — 2 independent interviews, 1 support cluster, 1 survey corroboration. Four independent sources across three data channels.

**Poorly-attributed opportunity (bad):**
> **Opportunity:** Users want better session tracking.
>
> **Evidence:** Multiple customers have mentioned this. It came up in a few recent interviews.

The second example cannot be evaluated, cross-referenced, or challenged. The phrasing "want better session tracking" is also solution-adjacent — but the attribution failure is the more immediate problem.

**How the agent should respond to weak attribution:**

PM submits: "Users want better session tracking — came up a few times recently."

Agent response: "I can't add this to the OST yet — the evidence needs to be specific enough to be checkable. Can you provide: (1) the interview dates or session IDs where this came up; (2) what the user actually said, in their words; (3) any corroborating sources beyond those interviews? Once we have that, I can also help reframe the opportunity in customer voice — 'want better session tracking' reads more like a solution request than a customer experience."

## Failure Modes

**Accepting paraphrase as citation.** The PM says "Sarah mentioned during her interview that she has trouble with sessions." The agent records this as a source. But "Sarah mentioned" is not a citation — there's no interview date, no quote, no session ID, no way to go back to the original. The agent has accepted a description of evidence as if it were evidence.

**Counting the PM's memory as a source.** "I know this came up in multiple interviews" is not a source. The agent must require specificity even when the PM is confident. PM confidence and evidence quality are independent variables.

**Losing attribution on tree restructuring.** The OST gets reorganized — opportunities renamed, merged, split — and in the process, the evidence links that were attached to the old node names get orphaned. The agent doesn't notice because the opportunities still exist; it doesn't check whether the evidence still maps to them accurately.

**Treating all evidence as equivalent.** A single quote from a usability test (where the user was reacting to a prototype) gets recorded with the same weight as a quote from a discovery interview (where the user was describing an unprompted current behavior). Both are technically cited; one is much stronger evidence for a genuine customer opportunity. The agent that can't grade evidence quality is only doing half of attribution.

**Front-loading attribution and abandoning it.** The agent enforces strict attribution when opportunities are entered, but never checks back. An opportunity entered with good attribution six months ago may have lost its source trail (files deleted, researcher left, ticket system reorganized). The ongoing audit is as important as the entry gate.

**Retroactive evidence mining.** When attribution is challenged, the agent scours the evidence base for anything that could support the opportunity rather than evaluating whether the evidence that existed at the time of entry was sufficient. This is citation theater — the result looks like good attribution but the process is reverse-engineered.

## How to Evaluate It

**Test 1 — Entry gate enforcement.** Submit an opportunity with vague attribution ("a few customers mentioned this recently"). The agent should not add it to the OST. It should ask for specific sources using a structured format. If the agent accepts the submission, it has failed the entry gate test.

**Test 2 — Attribution format assessment.** Provide three "evidence" entries: (a) a verbatim quote with date and user ID, (b) a PM paraphrase with no session reference, (c) a stakeholder secondhand ("I heard from the sales team that..."). Ask the agent to evaluate each. It should accept (a), reject (b) as paraphrase without citation, and reject (c) as not a customer source.

**Test 3 — Evidence grading.** Give the agent two opportunities with the same number of cited sources: one with 2 discovery interview quotes, one with 2 usability test reactions to a prototype. Ask which has stronger evidence for a genuine customer opportunity. The agent should explain why discovery interviews provide stronger signal for identifying real behavioral problems.

**Test 4 — Source trail audit.** Provide an OST where some opportunities have detailed attribution (quotes, dates, ticket IDs) and others have been entered with attribution that references files no longer accessible ("see Q3 research deck" — no link provided). Ask the agent to flag which opportunities have degraded or inaccessible source trails.

**Test 5 — Resistance to social proof.** Submit a new opportunity and, when challenged for attribution, respond "Everyone on the team agrees this is a real problem — we've all heard it." The agent should not accept team consensus as customer evidence. It should maintain the standard and ask for the actual customer sources.

## How to Develop It

**Build the structured evidence request into the system prompt.** When an opportunity is submitted, the agent should automatically ask for: (1) source type (interview, support ticket, analytics, survey), (2) date or time period, (3) verbatim language or ticket ID, (4) user or segment. Don't make the PM volunteer this structure — require it.

**Create an evidence taxonomy.** Give the agent a framework for categorizing and grading evidence types:
- Tier 1: Verbatim quote from discovery interview (user describing unprompted current behavior)
- Tier 2: Verbatim quote from usability test; support ticket text; analytics event
- Tier 3: Survey stated preference; secondhand sales/CS report; PM observation
- Tier 4: Internal hypothesis; stakeholder request; team consensus

The agent should apply this taxonomy in its output so PMs can see the evidence quality for each source, not just whether sources exist.

**Build a bi-weekly attribution audit into the health check.** The [[Tree Health Checks]] cadence should include a scan for opportunities with degraded or inaccessible source trails. A link to a deleted Google Sheet is not attribution. An opportunity last updated six months ago should be flagged for source verification.

**Train on deliberate ambiguity.** Create test cases where the attribution is technically present but practically useless (e.g., "Interview, Q1 2026" with no further detail). Train the agent to reject these as insufficient and ask for the specifics that would make the attribution checkable.

**Tie the attribution standard to confidence tagging.** The [[Confidence Tagging]] output for any opportunity should include an explicit evidence quality assessment. This connects attribution to the downstream outputs the PM uses to make prioritization decisions — making evidence quality visible, not just recorded.

## Sample Prompts

**Evidence request prompt (add to opportunity entry workflow):**
> "Before I add this opportunity to the OST, I need specific evidence. Please provide for each source: (1) source type — interview session, support ticket, survey, analytics, or other; (2) date or date range; (3) either the verbatim quote or the ticket/event ID; (4) the user or segment (anonymized is fine). Once you have two independent sources, I can add this to the tree and tag its evidence strength."

**Attribution audit prompt:**
> "Review the evidence records for each opportunity in this OST. For each one, assess: (1) Are the sources specific enough to be checkable — do they have dates, IDs, or quotes? (2) Are the sources still accessible, or do they reference files or systems that may no longer be available? (3) How many independent sources does this opportunity have? Flag any opportunity where the answer to (1) or (2) is 'no,' or where the independent source count is below 2."

**Evidence grading prompt:**
> "I'm providing the evidence base for this opportunity: [EVIDENCE LIST]. For each piece of evidence, classify it as Tier 1 (discovery interview verbatim), Tier 2 (usability test, support ticket, or analytics), Tier 3 (survey, sales report, or PM observation), or Tier 4 (internal hypothesis or consensus). Then give me an overall evidence strength rating for the opportunity: strong (2+ Tier 1-2 from independent sources), medium (1 Tier 1-2 + corroboration, or 3+ Tier 2-3), or weak (single source or Tier 3-4 only)."

## Connected Skills

[[Opportunity Validation]] — Evidence attribution is the enforcement mechanism for one of the three validation criteria: the two-source rule. Validation sets the standard; attribution maintains the records that determine whether the standard is met.

[[Transcript Synthesis]] — Synthesis is where verbatim quotes and behavioral observations are extracted from raw customer conversations. Strong synthesis produces the raw material for evidence attribution.

[[Signal Clustering]] — Clustering multiple signals is how evidence from multiple sources gets mapped to a single opportunity. Attribution then requires that the cluster's sources be specific and traceable.

[[Confidence Tagging]] — Evidence quality is the primary input to confidence tagging for opportunities. An opportunity backed by two Tier 1 sources from different segments should carry higher confidence than one backed by a single support ticket cluster.

[[Tree Health Checks]] — Health checks include an attribution audit as a standard component. Evidence attribution defines what the audit is checking for.

[[Bias Detection]] — When auditing attribution, the agent may notice that all sources come from the same user segment, the same research method, or the same time period. That's a bias signal — and it requires the [[Bias Detection]] skill to evaluate whether it represents a systematic gap.

[[Epistemic Self-Awareness]] — The underlying disposition that makes attribution enforcement possible: the agent must know that "I believe this is true" and "I have evidence this is true" are different claims, and must be willing to require the latter even when the PM is confident.
