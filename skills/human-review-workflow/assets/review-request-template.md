---
artifact_role: inbox
review_id: ""
idempotency_key: ""
artifact_type: ""
product: ""
gate_type: ""
status: pending
created_at: ""
requested_by: ""
reviewer: ""
risk: medium
source_provider: ""
source_ids: {}
source_version: ""
decision_due: ""
decision_prompt: ""
recommended_option: ""
allowed_decisions: []
decision: ""
decision_note: ""
decided_at: ""
applied_at: ""
continuation: {}
result_ids: {}
notification:
  created_sent_at: ""
  reminder_sent_at: ""
  escalation_sent_at: ""
---

# [Concrete product action or choice]

[In a short paragraph: what changes for whom, the choice needed, your recommendation,
and the material consequence. Do not lead with internal IDs or policy terminology.]

## Why your input is needed

[The unresolved choice or required confirmation. If asked before: what changed, why the
existing approval cannot be reused, and whether scope, cost, risk or timing changed.
If existing authority covers the repair, do that work instead of creating this request.]

## Recommendation

[Recommended option and strongest reason.]

## Options

| Option | Experience / approach | Evidence | Riskiest assumption | Tradeoff | What this choice starts |
|---|---|---|---|---|---|
| A | | | | | |
| B | | | | | |
| C | | | | | |

## Decision aids

[Versioned prototype, storyboard, plan, or source links.]

## Uncertainty

[What is missing and what would change the recommendation.]

## Supporting evidence / automation details

[Preserve exact source IDs, version references and authorization details here or in
frontmatter. Follow references/human-facing-requests.md before sending.]

## Respond

Set `decision` in frontmatter to one allowed value. Add `decision_note` for `revise`,
`defer`, or `reject`.
