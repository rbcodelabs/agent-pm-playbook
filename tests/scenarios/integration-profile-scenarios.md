# Integration Profile Scenarios

Each scenario verifies setup plus the same insight → OST → experiment → roadmap → delivery trace. Methodology remains identical; only provider persistence changes.

## compass-full

Setup resolves every product capability to Compass, with delivery routed to Compass Tasks. It does not create `product/` Markdown scaffolding. An insight is captured as Compass research/feedback, linked to a Compass opportunity and solution, tested with a Compass experiment, promoted to the Compass roadmap, and decomposed into Compass Tasks.

## compass-obsidian-linear

Setup scaffolds only the Obsidian-owned vision, research capture, and reporting archive paths. A raw note in Obsidian yields a structured Compass insight, which links through the Compass OST, experiment, and roadmap; delivery becomes a linked Linear issue. Neither system receives a duplicate authoritative record.

## markdown-linear

Setup scaffolds Markdown paths for vision, research, insights, OKRs, OST, experiments, roadmap, and reporting. The insight → OST → experiment → roadmap chain is persisted in those files; delivery becomes a Linear issue carrying the roadmap and solution IDs.

## jpd-jira

Setup records JPD and Jira connection metadata without creating authoritative Markdown discovery files. A JPD Insight links to the JPD OST, Test, and roadmap view; delivery becomes a linked Jira issue.

## Override scenario

Starting from `compass-full`, set `reporting_archive: obsidian`. Setup creates only the reporting archive path; all other records remain in Compass. The override does not modify the reusable profile.

# Workflow Profile Scenarios

Workflow profiles compose with every integration profile above. They do not change where
product state lives.

## compass-native-review

Compass Decisions is the tracking-only review inbox and immutable decision history. The
flow calls `request_decision`, ends `AWAITING_DECISION`, and later reads the exact request
and current revision with `get_decision`. Approval records human judgment but does not
automatically mutate product state or expand the agent's authority.

The older Task/Solution Plan flow remains an explicitly legacy compatibility adapter for
existing installations. New `compass-native-review` configurations do not route to it.

## geode-obsidian-review

Geode runs and notifies. A scheduled discovery flow writes a labeled review request to the
configured Obsidian inbox, ends `AWAITING_DECISION`, and records no product approval. After
the reviewer chooses an allowed response, the decision router verifies the source version,
records an immutable decision receipt, applies exactly the mapped continuation through the
authoritative product provider, and dispatches the next flow. A stale response is
superseded, not applied.

## local-markdown-review

A local scheduled-agent runtime writes the same review contract to the configured Markdown
root and surfaces it through a local digest. The decision and continuation semantics are
identical to the Geode/Obsidian flow. Selecting an early concept starts assumption mapping
or experiment design; it never starts delivery.

## Workflow override scenario

Starting from `geode-obsidian-review`, set `notifications: slack`. Review and decision
records remain in Obsidian and Geode remains the runtime. Only notification delivery moves
to the configured Slack adapter; silence is still not approval and no implicit fallback is
allowed.
