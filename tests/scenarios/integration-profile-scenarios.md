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
