---
name: release-manager
description: >-
  Triage, prioritize, and safely merge all open PRs on a repo, then ship the
  result. For Vercel web apps: waits for the deploy and smoke-tests live URLs.
  For Obsidian plugins and other distributable apps: runs the build, bumps the
  version, and publishes a GitHub release with built artifacts. Use when you have
  a backlog of open PRs that need to be merged and shipped as a batch.
metadata:
  priority: 2
retrieval:
  aliases:
    - merge prs
    - ship prs
    - integration manager
    - release manager
    - babysit prs
    - process open prs
    - merge and ship
    - release pipeline
  intents:
    - merge all my open pull requests
    - ship the open PRs
    - process and merge my PRs
    - triage and merge open PRs
    - build and release my plugin
    - bump version and release
---

# Release Manager

Triage all open PRs, build a merge plan, execute it safely, then ship — either
monitoring a Vercel deploy or publishing a GitHub release with built artifacts.

## Table of Contents

- [Step 1 — Establish Context](#step-1--establish-context)
- [Step 2 — Create the Release Checklist](#step-2--create-the-release-checklist)
- [Step 3 — Triage Open PRs](#step-3--triage-open-prs)
- [Step 4 — Build the Merge Plan](#step-4--build-the-merge-plan)
- [Step 5 — Execute Merges](#step-5--execute-merges)
- [Step 6 — Run the Full Test Suite](#step-6--run-the-full-test-suite)
- [Step 7 — Audit the README](#step-7--audit-the-readme)
- [Step 8 — Docs & Screenshots](#step-8--docs--screenshots-if-applicable)
- [Step 9A — Web App: Deploy + Smoke Test](#step-9a--web-app-vercel-deploy--smoke-test)
- [Step 9B — Plugin / Desktop App: Build + Release](#step-9b--plugin--desktop-app-build--release)
- [Step 10 — Final Report](#step-10--final-report)

---

## Step 1 — Establish Context

**Ask if not clear from context:**
1. Which repo? (resolve from `~/Documents/Personal/Claude/repo-map.md`)
2. Are there any PRs to skip or hard-prioritize?

**Detect repo type** (do this yourself, don't ask):

```bash
# Vercel web app?
ls <repo-path>/vercel.json <repo-path>/.vercel 2>/dev/null

# Obsidian plugin?
python3 -m json.tool <repo-path>/manifest.json 2>/dev/null | grep -q '"minAppVersion"' && echo "obsidian-plugin"

# Generic build/release (check for build script)
cat <repo-path>/package.json | python3 -m json.tool | grep '"build"'
```

---

## Step 2 — Create the Release Checklist

**Do this before any other work.** Use `TodoWrite` to create a task list tracking
every phase of this release. Mark each item `in_progress` when you start it and
`completed` only after verifying it is actually done — not when you think it
should be done. The final item is always "End-to-end verification of every
requirement".

Checklist template (adapt to the actual PR set and repo type):

- Triage open PRs and build merge table
- Review and confirm merge plan with user (required pause)
- Execute merges (one per PR, validate each before moving on)
- Run full test suite: unit, integration, E2E — all that exist in the repo
- Audit README: every feature, config option, and install step is documented and current
- Update screenshot fixtures and regenerate docs screenshots (if applicable)
- Commit docs and screenshots separately from the version bump
- Confirm version bump type with user (required pause)
- Type-check and build artifacts
- Commit version bump and publish GitHub release / confirm Vercel deploy
- Smoke test / BRAT validation
- End-to-end verification of every requirement

---

## Step 3 — Triage Open PRs

```bash
cd <repo-path>
gh pr list --state open \
  --json number,title,author,createdAt,isDraft,reviewDecision,statusCheckRollup,mergeable,additions,deletions \
  --limit 50
```

For each PR with uncertain CI, get specifics:
```bash
gh pr checks <number>
```

Build a triage table. Include every open PR. Columns:

| # | Title | CI | Reviews | Mergeable | Size (lines) | Action |
|---|---|---|---|---|---|---|
| 42 | fix: auth redirect | ✅ pass | approved | ✅ | 34 | Merge |
| 39 | feat: dashboard v2 | ✅ pass | none | ✅ | 412 | Merge |
| 40 | wip: new onboarding | ✅ pass | none | ✅ | 891 | Skip (draft) |
| 43 | fix: token expiry | ❌ lint | none | ✅ | 67 | Skip (CI failing) |

**Auto-skip rules (no need to ask):**
- `isDraft: true` → skip
- Any failing CI check → skip (surface as blocker to fix separately)
- `mergeable: CONFLICTING` → skip (surface as blocker)

---

## Step 4 — Build the Merge Plan

Order the queue: smallest + most isolated first, largest + most risky last.
Infrastructure changes (auth, DB schema, shared utilities) always go last.

Write out the plan explicitly:

```
Proposed merge order:
1. #42 — fix: auth redirect (CI ✓, approved, 34 lines) — lowest risk
2. #38 — fix: loading state (CI ✓, 1 approval, 87 lines)
3. #39 — feat: dashboard v2 (CI ✓, no reviews, 412 lines) — larger, goes last

Skipping:
- #40 — DRAFT
- #43 — CI failing on lint (fix the lint error and re-open for next run)
- #41 — CONFLICTING with #39 (resolve conflict and re-open for next run)
```

**REQUIRED PAUSE: Show the plan and wait for approval before any merges.**

---

## Step 5 — Execute Merges

One PR at a time. After each merge, confirm the branch is gone and pull main:

```bash
gh pr merge <number> --squash --delete-branch

# Pull latest main to keep local state fresh
git -C <repo-path> pull origin main
```

**If any merge fails or causes a conflict mid-way:** stop the queue, surface it,
do not proceed until resolved.

**If CI on main breaks after a merge:** treat it as a blocker — stop the queue
and surface the issue with the PR number that likely caused it.

---

## Step 6 — Run the Full Test Suite

**This step is mandatory.** Screenshots are not a substitute for tests. Run every
test harness that exists in the repo before touching docs or preparing the release.
Shipping a merged set that breaks the test suite is worse than shipping nothing.

```bash
cd <repo-path>

# Discover what test scripts exist
cat package.json | python3 -m json.tool | grep -E '"test|"e2e|"spec|"check'

# Run unit and integration tests
npm test        # or: pnpm test / yarn test

# Run E2E tests if they exist (Playwright, Cypress, etc.)
npm run test:e2e     # or: pnpm test:e2e

# Run lint / type-check if no separate CI enforces it
npm run lint
./node_modules/.bin/tsc --noEmit
```

**If any tests fail:** stop. Do not proceed to docs, screenshots, build, or release
until the failure is understood and fixed. Surface exactly which tests failed and why.

---

## Step 7 — Audit the README

Before touching screenshots or generating release notes, audit the README against
the full set of merged PRs. The question is: if a new user installed this version
today, does the README accurately describe what it does?

Work through each merged PR and check:

1. **Features.** Is the feature listed in the README? Does the description match
   what was actually shipped (not a stale draft description from before the PR)?

2. **Configuration.** Are any new settings, options, or env vars documented with
   their accepted values and defaults?

3. **Installation / setup.** If the PR changed prerequisites or setup steps, is
   the Getting Started section still accurate?

4. **Version badge.** If the README has a version badge (e.g.,
   `![Version](https://img.shields.io/badge/version-X.Y.Z-blue)`), update it to
   the new version.

```bash
# Cross-check: grep for keywords from each merged PR title
grep -i "<feature keyword>" <repo-path>/README.md

# View full README to spot structural gaps
cat <repo-path>/README.md
```

Add missing features and update stale descriptions before generating screenshots —
so the README is accurate at the moment the screenshots are captured.

---

## Step 8 — Docs & Screenshots (if applicable)

After tests pass and the README is current, check whether the repo auto-generates
documentation screenshots:

```bash
cat <repo-path>/package.json | python3 -m json.tool | grep -i "screenshot\|docs"
```

If a screenshot-update script exists (e.g., `test:screenshots:update`):

### 1. Check fixture coverage

Screenshots are generated from a test harness, not a live app. Before regenerating,
look at the harness fixtures (usually `test/harness/fixtures.ts` or similar) and ask:
do the fixtures actually demonstrate the new UI states being shipped?

Common gaps:
- A feature only visible when data is present (edited-files card, attachment chips,
  empty states) won't appear unless the fixture seeds that data
- A UI state only reachable via user action (hover, click, modal) needs a corresponding
  Playwright interaction in the screenshot spec
- New views (dashboards, sidebars) may have no screenshot test at all

**If fixtures don't cover new features:** update them before regenerating. Also check the
screenshot spec file (`test/screenshots/ui.spec.ts` or similar) — new visual states
typically need new test cases with the right setup (hover, page.evaluate to seed state, etc.).

### 2. Regenerate screenshots

```bash
cd <repo-path>
npm run test:screenshots:update   # or equivalent script name
```

Verify output:

```bash
ls -la <repo-path>/docs/*.png
git -C <repo-path> diff --stat   # confirm docs/ files changed
```

### 3. Commit docs separately from the version bump

```bash
git -C <repo-path> add docs/ README.md test/harness/fixtures.ts test/screenshots/
git -C <repo-path> commit -m "docs: regenerate screenshots and update README for vX.Y.Z features"
git -C <repo-path> push
```

Keeping this commit separate from the version bump makes the history easy to follow
and ensures the GitHub release page always reflects the actual current state of the plugin.

---

## Step 9A — Web App (Vercel): Deploy + Smoke Test

After all merges are done, watch for the Vercel deployment to go live. Use the
`vercel-tools` skill for the wait step.

```bash
# Wait for deploy (polls until ready, writes URL to /tmp/vercel_prod_url.txt)
vercel-wait-deploy --cwd <repo-path> --target production
DEPLOY_URL=$(cat /tmp/vercel_prod_url.txt)
echo "Deploy live at: $DEPLOY_URL"
```

### Smoke test

Adapt the URLs to the specific app. At minimum, test:

```bash
for path in "/" "/api/health" "/login"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_URL$path")
  echo "$path → $STATUS"
done
```

Also check the homepage body for error strings:
```bash
curl -s "$DEPLOY_URL/" | grep -i "application error\|internal server error\|something went wrong\|unhandled" \
  && echo "ERROR TEXT FOUND IN BODY" \
  || echo "Body clean"
```

**Pass criteria:** all routes return 2xx or expected 3xx/4xx. No 5xx. No error
text in the homepage body.

If smoke test fails: surface the result, don't declare success.

---

## Step 9B — Plugin / Desktop App: Build + Release

### Check current version

```bash
node -p "require('<repo-path>/manifest.json').version"
# or for package.json only:
node -p "require('<repo-path>/package.json').version"
```

**REQUIRED PAUSE: Confirm the version bump with the user before continuing.**

Ask: "Current version is X.Y.Z. This merge set includes [N bug fixes / N features].
Should I bump to X.Y.Z+1 (patch) or X.Y+1.0 (minor)?"

### Apply version bump

Edit both `manifest.json` and `package.json` to the new version. For Obsidian
plugins, also check for `versions.json` and add the new entry:

```json
"X.Y.Z": "1.0.0"
```

### Confirm you are on the right branch

**Before building, always verify the working tree is on the expected branch:**

```bash
git -C <repo-path> branch --show-current
git -C <repo-path> log --oneline -3
```

If the branch is wrong (e.g. a feature branch instead of `main`), stop and
switch before continuing. A build from the wrong branch will ship code that
doesn't match the release tag — this is a silent, hard-to-diagnose bug.

### Type-check before building

For TypeScript projects, run the type checker before `build`. The build tool
(esbuild, tsc, etc.) may strip types without checking them, meaning broken
method calls can compile silently and only fail at runtime.

```bash
cd <repo-path>
# Use the local tsc, not a global one
./node_modules/.bin/tsc --noEmit 2>&1
```

If there are type errors: stop, fix them, do not build or release.

### Build

```bash
cd <repo-path>
npm run build   # or: pnpm build / yarn build
```

Verify the output exists and is non-trivial:

```bash
# Obsidian plugin artifacts — build may output to dist/
ls -la dist/main.js dist/manifest.json dist/styles.css 2>/dev/null || \
ls -la main.js manifest.json styles.css 2>/dev/null
wc -c dist/main.js 2>/dev/null || wc -c main.js
# should be > 1000 bytes; < 1000 usually means build failed
```

If the build fails: stop, report the error, do not tag or release.

### Commit version bump

```bash
git -C <repo-path> add manifest.json package.json versions.json 2>/dev/null || true
git -C <repo-path> add manifest.json package.json
git -C <repo-path> commit -m "chore: bump version to v<X.Y.Z>"
git -C <repo-path> push
```

### Write comprehensive release notes

Do **not** use bare `git log --oneline` as release notes. Users reading the GitHub
release page need to understand what changed and why, not just commit hashes.

Build the notes from the merged PR set:

```bash
# Fetch title + body for each merged PR
for PR_NUM in <pr-numbers-space-separated>; do
  gh pr view "$PR_NUM" --json number,title,body \
    --jq '"### #\(.number) — \(.title)\n\(.body // "(no description)")\n"'
done
```

Then write release notes with this structure (edit manually into the notes file):

```markdown
## What's New in vX.Y.Z

### Features
- **Feature name** — one-sentence description of what it does and why it's useful.
  (closes #N)

### Bug Fixes
- **What was broken** — what the fix does. (closes #N)

### Improvements
- Short description of any polish, performance, or UX improvements.

### Notes
- Any migration steps, breaking changes, or known limitations the user should be
  aware of before updating.
```

**Rules for good release notes:**
- Every merged PR gets at least one line. No silent inclusions.
- Feature entries describe the user-facing benefit, not the implementation.
- Bug fix entries describe the symptom that was fixed, not just "fix bug".
- If a PR body already has a good user-facing summary, use it verbatim (credit it).
- Do not include internal refactors or chore commits unless they affect the user.

Save the notes to a temp file:
```bash
cat > /tmp/release-notes.md << 'EOF'
[paste your composed notes here]
EOF
```

### Tag + publish GitHub release

```bash
NEW_VERSION="<X.Y.Z>"

# Tag
git -C <repo-path> tag "v$NEW_VERSION"
git -C <repo-path> push origin "v$NEW_VERSION"

# Obsidian plugin release with comprehensive notes
gh release create "v$NEW_VERSION" \
  --repo <github-org>/<repo-name> \
  --title "v$NEW_VERSION" \
  --notes-file /tmp/release-notes.md \
  <repo-path>/main.js \
  <repo-path>/manifest.json \
  <repo-path>/styles.css 2>/dev/null || \
gh release create "v$NEW_VERSION" \
  --repo <github-org>/<repo-name> \
  --title "v$NEW_VERSION" \
  --notes-file /tmp/release-notes.md \
  <repo-path>/main.js \
  <repo-path>/manifest.json
```

Confirm it published and review the notes as they'll appear on GitHub:
```bash
gh release view "v$NEW_VERSION" --repo <github-org>/<repo-name>
```

### Validate via BRAT (Obsidian plugins)

**Do NOT copy build artifacts to the local vault.** The user validates via BRAT
(Beta Reviewers Auto-update Tester), which pulls directly from the GitHub release.

After the release is published, tell the user:

> "v{X.Y.Z} is live at https://github.com/{org}/{repo}/releases/tag/v{X.Y.Z}
> Please update via BRAT (Settings → BRAT → Update all beta plugins) and smoke test.
> Let me know if anything needs a follow-up patch."

---

## Step 10 — Final Report

```markdown
## Release Complete — [repo-name] [vX.Y.Z or deploy URL]

### Merged PRs ([N] total)
- #N — [title] (squash merged)
- ...

### Skipped ([N] total)
- #N — [title] — [reason: draft / CI failing / conflict]
- ...

### Quality Gates
- Unit/integration tests: ✅ X passed / ⚠️ failures found
- E2E tests: ✅ X passed / ⚠️ N/A (no E2E harness)
- Type check: ✅ clean / ⚠️ errors fixed before build
- README audit: ✅ all features documented / list any gaps fixed

### Deployment
[Web app]
- URL: https://...
- Smoke test: X/Y routes passed ✅ / issues found ⚠️

[Plugin / distributable]
- Version: vX.Y.Z
- Release: https://github.com/.../releases/tag/vX.Y.Z
- Artifacts: main.js, manifest.json[, styles.css]
- Release notes: comprehensive (N features, N fixes documented)

### Follow-up Needed
- [List any PRs that need CI fixes, conflict resolution, or review before next batch]
- [Any test gaps or README sections that need more work]
```

---

## When to Use the `loop` Skill Instead

If you want to **continuously monitor** PRs as they open and merge them on an
ongoing basis (like a bot), pair this skill with the `loop` skill to run it on
an interval (e.g. every 4 hours). This skill handles a single batch run; `loop`
handles the recurring cadence.
