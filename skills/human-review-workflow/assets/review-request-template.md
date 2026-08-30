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

# Review: [decision needed]

## Why now

[What triggered this request and what remains paused without the decision.]

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

## Respond

Set `decision` in frontmatter to one allowed value. Add `decision_note` for `revise`,
`defer`, or `reject`.
