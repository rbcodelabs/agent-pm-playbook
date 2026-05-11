---
name: jira-workflow
description: >-
  Manage Jira ticket status during a build session. Handles credential retrieval
  from Keeper, ticket transitions, and enforces the correct status progression
  (Idea → To Do → In Progress → Testing → Done). Use whenever Claude is actively
  building against a Jira backlog — move tickets inline as work completes, never
  batch at the end.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - jira
    - ticket status
    - update tickets
    - jira workflow
    - ticket workflow
    - mark done
    - move to testing
    - in progress
  intents:
    - update jira tickets
    - mark this ticket done
    - move ticket to in progress
    - update ticket status
    - sync jira with what we built
    - are tickets up to date
    - move to testing
    - transition ticket
  entities:
    - Jira
    - ticket
    - story
    - epic
    - sprint
    - status
    - transition
---

# Jira Workflow

Rules for how Claude manages Jira ticket status during a build or product session.
These apply whenever Claude is actively building against a Jira backlog.

## Core Rule

**Update tickets inline as work completes — never batch at the end of a session.**

The right time to update a ticket is the moment the work reaches a gate, not after
the whole session is done. Batching at the end produces inaccurate statuses and
breaks the team's ability to trust the board.

## Status Progression

```
Idea → To Do → In Progress → Testing → Done
```

| Status | When to apply |
|---|---|
| **To Do** | Ticket is queued / planned for this session |
| **In Progress** | Claude is actively writing code or content for this ticket |
| **Testing** | Code is complete, compiles, and the app runs — needs QA and review |
| **Done** | QA verified, tests written/passing, PR merged, CI green |

### The Critical Distinction: Testing ≠ Done

**Testing** = "I built it and it runs"
**Done** = "A human verified it, tests passed, and it's merged"

Claude should never move a ticket to Done based on code being written. Code complete
means Testing. Done requires human verification and CI passage.

## Credential Retrieval

Jira credentials are stored in Keeper vault. Before making any Jira API calls:

1. Check if `JIRA_EMAIL` and `JIRA_TOKEN` are already set in the environment
2. If not, use the Keeper CLI to retrieve them:

```bash
# Keeper requires an active SSO session — user must run this first:
keeper login <email>
# (complete browser SSO flow, paste token back)

# Then retrieve credentials:
keeper get <RECORD_UID> --format json
```

The Keeper record title to search for is typically **"Atlassian - Claude Code API Key"**
or similar. Search with: `keeper search jira` or `keeper search atlassian`

## Jira API Reference

**All projects use the new search endpoint** (the old `/rest/api/3/search?jql=` was
removed — use POST to `/rest/api/3/search/jql`):

```bash
# Build auth header
AUTH=$(echo -n "$JIRA_EMAIL:$JIRA_TOKEN" | base64)

# Search issues
curl -s -X POST "https://<org>.atlassian.net/rest/api/3/search/jql" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"jql":"project=KEY ORDER BY key ASC","maxResults":80,"fields":["summary","status","issuetype"]}'

# Get available transitions for an issue
curl -s "https://<org>.atlassian.net/rest/api/3/issue/KEY-123/transitions" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json"

# Apply a transition
curl -s -X POST "https://<org>.atlassian.net/rest/api/3/issue/KEY-123/transitions" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"transition":{"id":"<transition_id>"}}'

# Add a comment
curl -s -X POST "https://<org>.atlassian.net/rest/api/3/issue/KEY-123/comment" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"body":{"type":"doc","version":1,"content":[{"type":"paragraph","content":[{"type":"text","text":"<comment>"}]}]}}'
```

**Note:** Transition IDs vary by project. Always fetch them dynamically with the
transitions endpoint rather than hardcoding — the IDs above are illustrative only.

## Session Workflow

### Starting a session

1. Retrieve Jira credentials from Keeper if not already in env
2. Identify which tickets are being worked in this session
3. Move each to **To Do** if they're currently in Idea, or **In Progress** if
   work is starting immediately

### During a session

- Move a ticket to **In Progress** the moment you start coding it
- Move to **Testing** the moment:
  - Code is written and compiles
  - The route/feature returns a correct response
  - The app runs without errors related to this ticket
- Add a brief comment on transition summarizing what was built

### Ending a session

- Verify every ticket that was touched has an accurate status
- Leave a comment on any **In Progress** ticket with current state and next steps
- Never leave tickets in a state that doesn't reflect reality

## Anti-Patterns

| Anti-pattern | Why it's wrong |
|---|---|
| Marking Done because code is written | Code complete ≠ verified. Use Testing. |
| Batching all updates at session end | Status is stale during the session; board is unreliable |
| Skipping In Progress (Idea → Testing) | Loses the signal of when work actually started |
| Not commenting on transitions | Team loses context on what changed and why |
| Hardcoding transition IDs | IDs differ per project; always fetch dynamically |

## Project-Specific Notes

These are populated per-project in the project's `CLAUDE.md`. If you're working
on a project without a `CLAUDE.md`, ask the user for:
- Jira base URL (e.g. `https://redventures.atlassian.net`)
- Project key (e.g. `ARC`)
- Keeper record UID or search term for Jira credentials
