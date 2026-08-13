---
name: status-report-workflow
description: >-
  Generate a weekly status report for a single product: roadmap and OKR
  movement, engineering activity, issue tracker snapshot, and traffic/usage
  metrics where available. Use when producing a recurring weekly status
  digest for a product (typically invoked by a scheduled cron with explicit
  product parameters), or when the user asks "what happened this week on
  [product]" / "give me a status update on [product]".
metadata:
  priority: 4
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - status report
    - weekly status
    - weekly update
    - status update
    - weekly digest
    - product status
  intents:
    - generate a weekly status report
    - what happened this week on this product
    - give me a status update
    - summarize this week's progress
    - weekly product digest
    - how is this product doing this week
  entities:
    - status report
    - roadmap movement
    - OKR movement
    - engineering activity
    - issue tracker snapshot
    - traffic metrics
    - weekly digest
chainTo:
  - pattern: "roadmap item|move.*horizon|promote to roadmap|add.*roadmap"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow to make a roadmap change found during the status report
  - pattern: "okr|key result|\\bKR\\b|check-?in"
    targetSkill: okr-workflow
    message: Switching to OKR workflow to log a check-in found during the status report
  - pattern: "opportunity|assumption|experiment|\\bOST\\b"
    targetSkill: compass-workflow
    message: Switching to Compass workflow for discovery-object changes found during the status report
---

# Status Report Workflow

Generate a single product's weekly status report: what moved on the roadmap and
OKRs, what shipped in engineering, what the issue tracker looks like, and what
traffic/usage data shows -- honestly reporting "not available" for anything
that isn't wired up rather than fabricating a number.

This skill is **read-only and reporting-only**. It never changes roadmap
status, OKR check-ins, or opportunity state -- if the report surfaces
something that should change (a roadmap item that's clearly shipped but still
marked "Now", a KR that needs a check-in), name it in the report's Follow-ups
section and let the user or a chained skill (`roadmap-workflow`,
`okr-workflow`, `compass-workflow`) make the actual update.

## Inputs

This skill expects the invoker (typically a scheduled cron) to supply these
parameters explicitly, since not every product has a `pm-config.md` yet:

| Parameter | Example | Required |
|---|---|---|
| Product name | `Golden Wealth` | Yes |
| Product slug | `golden-wealth` (lowercase, hyphenated -- used in filenames) | Yes |
| Vault product folder | `Products/Golden Wealth` | Yes |
| Repo path | `~/projects/golden-wealth-app` | Yes (omit only if there's no code repo) |
| Roadmap/OKR source | `compass` \| `markdown` \| `none` | Yes |
| Compass org/workspace slug + workspace ID | `rbcodelabs/golden-wealth`, `3d984be7-...` | If source is `compass` |
| Issue tracker | `linear:<Team key>` \| `compass` \| `none` | Yes |
| Deployment platform | `vercel` \| `amplify` \| `electron-local-build` \| `none` | Yes |
| Traffic/usage source | e.g. `Products/Trust & Will Guide/gsc-weekly.md` or `none` | Yes |

If a required parameter is missing and can't be inferred from a
`pm-config.md` in the product's vault folder, ask before proceeding rather
than guessing.

## Step 1 -- Determine the report window

Run `date +%Y-%m-%d` for today's date. The window is the 7 days ending today
(`date -v-7d +%Y-%m-%d` on macOS for the start date). State the window
explicitly in the report header -- don't leave it implicit.

## Step 2 -- Roadmap + OKR movement

### If source is `compass`

Use the Compass MCP tools (see the `compass-workflow` skill for auth and call
conventions -- `COMPASS_MCP_API_KEY`, endpoint
`https://compass.rbcodelabs.com/api/mcp`). For this workspace ID:

1. `get_workspace_summary` -- headline counts (opportunities, roadmap items,
   active experiments, active OKR cycle).
2. `list_roadmap_items` -- group by horizon (Now/Next/Later/Shipped/Killed).
   Call out any item whose status changed this week if you have a prior
   week's report to diff against (Step 5 explains how); otherwise just show
   current state and note "first report -- no prior snapshot to diff."
3. `list_opportunities` -- note any created or status-changed in the window
   (compare `updatedAt`/`createdAt` against the window start).
4. If an active OKR cycle exists: `get_okr_cycle` for the active cycle ID from
   the workspace summary -- report each KR's current value vs. target and the
   date of its last check-in. Flag any KR with no check-in in 14+ days as
   **stale**.

### If source is `markdown`

Read `roadmap.md`, `ost.md`, and any `okrs/*.md` file in the vault product
folder. Summarize current Now/Next/Later state and any Objectives/KRs found.
If a prior week's status report exists in `Products/<Product>/Runs/`, diff
this week's roadmap.md/okrs content against what that report captured to
surface movement. If no prior report exists, say so and just summarize
current state.

### If source is `none`

Skip this section with a one-line note: "No roadmap/OKR source configured for
this product."

## Step 3 -- Engineering activity

Skip entirely if no repo path was given.

```bash
cd <repo path>
git fetch origin --prune
git log --since="7 days ago" --oneline origin/main   # or the repo's default branch
gh pr list --state merged --limit 50 --json number,title,mergedAt | \
  jq '[.[] | select(.mergedAt >= "<window-start>T00:00:00Z")]'
gh pr list --state open --json number,title,isDraft,updatedAt --limit 50
```

Report: commit count, list of merged PRs (number + title) in the window, open
PR count (flag any open PR untouched for 7+ days as **stale**).

**Deploy status**, based on the deployment platform parameter:
- `vercel` -- follow the `vercel-tools` skill to check latest production
  deployment status (`vercel ls --prod` or equivalent). Report READY/ERROR
  and the deploy timestamp.
- `amplify` -- note that this is an AWS Amplify site; check deploy status via
  `aws amplify list-jobs` if AWS CLI access is configured, otherwise report
  "Amplify deploy status not automated -- check the Amplify console."
- `electron-local-build` -- no hosted deploy; report latest tagged release
  (`gh release list --limit 1`) instead of a live deploy status.
- `none` -- skip.

## Step 4 -- Issue tracker snapshot

Based on the issue tracker parameter:

### `linear:<Team key>`

The Linear Integration Obsidian plugin syncs issues as notes under
`Linear Issues/<Team name>/` with `linear_status` in frontmatter. Read that
folder's frontmatter (`linear_status`, `linear_updated`) rather than calling
a Linear API directly. Report counts by status, and list issues whose
`linear_updated` falls inside the window.

### `compass`

Use `list_roadmap_items` and `list_opportunities` counts by status (already
fetched in Step 2 if the roadmap/OKR source is also Compass -- don't
re-fetch). Also call `list_feedback` for the workspace with `status: "OPEN"`
to report the open feedback queue size.

### `none`

Skip with a one-line note.

## Step 5 -- Traffic / usage metrics

If a traffic/usage source path was given, read that file and pull the
headline stats (e.g. `Products/Trust & Will Guide/gsc-weekly.md` --> total
clicks, impressions, CTR, queries in top 20 -- this file is refreshed
separately by the "GSC Weekly Report" cron each Monday morning, so read it
rather than regenerating it).

If no source is configured, report **NOT AVAILABLE** -- do not estimate or
fabricate a number. This is the section most likely to be genuinely empty for
pre-launch or internal-tool products; that's an honest and expected result,
not a failure.

## Step 6 -- Write the report

Save to `<vault product folder>/Runs/<product-slug>-<YYYY-MM-DD>-status.md`
(create the `Runs/` folder if it doesn't exist yet). Use this template:

```markdown
---
type: status-report
product: [Product name]
window: [start] to [end]
generated: [today's date]
---

# [Product name] — Weekly Status Report
*[start] → [end]*

## Roadmap & OKR Movement
[Step 2 output. If nothing moved, say so plainly: "No roadmap or OKR changes this week."]

## Engineering Activity
- Commits: [N]
- Merged PRs: [list, or "none"]
- Open PRs: [N] ([M] stale)
- Deploy status: [status]

## Issue Tracker Snapshot
[Step 4 output]

## Traffic / Usage Metrics
[Step 5 output, or "NOT AVAILABLE"]

## Follow-ups
[Anything the report surfaced that needs a human decision or a chained-skill action -- stale KRs, stale PRs, roadmap items that look done but aren't marked shipped, empty feedback queues worth noting, etc. "None" if genuinely nothing.]
```

## Step 7 -- Link from the daily note

Per the vault's daily note rule, add a wikilink to the new report in today's
Daily note (`Daily/YYYY-MM-DD.md`) under `## Claude Sessions` (create the
section if missing; create the daily note from the weekday template if it
doesn't exist yet).

**Also add a todo checkbox** near the top of the same daily note (after any
existing `- [ ]` items, before the first `##` section if possible) so the
report surfaces in the morning review:

```
- [ ] 📊 [Product name] weekly status ready → [[Products/<Product>/Runs/<product-slug>-<YYYY-MM-DD>-status.md]]
```

## Step 8 -- Sync if the product folder is vault-bridged

If the vault product folder is backed by a vault bridge (check
`obsidian_list_vault_bridges`), the `Runs/` note itself doesn't need pushing
back to a repo -- vault bridges in this setup sync repo `product/` content
*into* the vault, not vault-only run logs back out. No action needed here
unless the bridge source repo also expects a copy (it doesn't, for any
product configured as of this skill's writing).

## Unattended / scheduled runs

This skill is designed to be invoked by a weekly cron with no human present.
If a data source is unreachable (Compass API down, `gh` not authenticated,
etc.), don't fail silently and don't fabricate the section -- write the
report with that section marked **DATA UNAVAILABLE (reason)** and continue
with the rest. A partial honest report beats a skipped run or a fabricated
one.
