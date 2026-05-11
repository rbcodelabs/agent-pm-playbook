---
name: jira-workflow
description: >-
  Manage Jira ticket status during a build session. Handles credential retrieval
  from a secrets manager, ticket transitions, and enforces the correct status
  progression (Idea → To Do → In Progress → Testing → Done). Use whenever Claude
  is actively building against a Jira backlog — move tickets inline as work
  completes, never batch at the end.
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

Jira credentials (email + API token) should never be hardcoded. Retrieve them
from the project's secrets manager before making any Jira API calls.

**Step 1:** Check if already set in the environment:
```bash
echo $JIRA_EMAIL && echo $JIRA_TOKEN
```

**Step 2:** If not set, check the project's `CLAUDE.md` for the secrets manager
and record location to use. Common patterns:

- **1Password:** `op item get "Jira API Token" --fields username,credential`
- **Keeper CLI:** `keeper get <record-uid> --format json`
- **AWS Secrets Manager:** `aws secretsmanager get-secret-value --secret-id jira-api-token`
- **Environment file:** `source .env.local`

**Step 3:** If no `CLAUDE.md` exists with this information, ask the user:
> "Where are your Jira credentials stored? (e.g. 1Password, Keeper, env file)"

Generate a Jira API token at: https://id.atlassian.com/manage-profile/security/api-tokens

## Jira API Reference

**Use the new search endpoint** — the old `GET /rest/api/3/search?jql=` was
removed. Use `POST /rest/api/3/search/jql` instead:

```bash
# Build auth header
AUTH=$(echo -n "$JIRA_EMAIL:$JIRA_TOKEN" | base64)

# Search issues
curl -s -X POST "https://<org>.atlassian.net/rest/api/3/search/jql" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"jql":"project=MYPROJECT ORDER BY key ASC","maxResults":80,"fields":["summary","status","issuetype"]}'

# Get available transitions for an issue
curl -s "https://<org>.atlassian.net/rest/api/3/issue/PROJ-123/transitions" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json"

# Apply a transition
curl -s -X POST "https://<org>.atlassian.net/rest/api/3/issue/PROJ-123/transitions" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"transition":{"id":"<transition_id>"}}'

# Add a comment
curl -s -X POST "https://<org>.atlassian.net/rest/api/3/issue/PROJ-123/comment" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"body":{"type":"doc","version":1,"content":[{"type":"paragraph","content":[{"type":"text","text":"<comment>"}]}]}}'
```

**Important:** Transition IDs vary by project and workflow configuration. Always
fetch them dynamically with the transitions endpoint — never hardcode them.

## Session Workflow

### Starting a session

1. Retrieve Jira credentials from the project's secrets manager
2. Identify which tickets are being worked in this session
3. **Fetch the full description of each ticket** — read the Acceptance Criteria and
   Definition of Done before writing a single line of code:
   ```bash
   curl -s "https://<org>.atlassian.net/rest/api/3/issue/PROJ-123" \
     -H "Authorization: Basic $AUTH" | python3 -c "
   import json,sys,re
   d=json.load(sys.stdin)
   desc = d['fields'].get('description') or {}
   # Extract plain text from Atlassian Document Format
   def extract(node):
       if isinstance(node, dict):
           if node.get('type') == 'text': return node.get('text','')
           return ''.join(extract(c) for c in node.get('content',[]))
       return ''
   print(extract(desc))
   "
   ```
4. Move each ticket to **To Do** if currently in Idea, or **In Progress** if starting immediately

### During a session

- Move a ticket to **In Progress** the moment you start coding it
- **Before moving to Testing**, run the AC checklist:
  - Read every `- [ ]` item in the Acceptance Criteria
  - Mark each as met ✅, partially met ⚠️, or not met ❌
  - If any AC item is ❌: either implement it, or explicitly flag it as deferred
    with a reason (e.g. "depends on Auth0 config not yet available")
  - Post the AC checklist as a Jira comment when transitioning to Testing
- Move to **Testing** only when:
  - All AC items are either ✅ or explicitly deferred with justification
  - Code compiles and the feature runs without errors
- Add a brief comment on each transition summarizing what was built and any deferred AC

### Ending a session

- Verify every touched ticket has an accurate status
- Leave a comment on any **In Progress** ticket noting current state and next steps
- Never leave tickets in a state that doesn't reflect reality

## Anti-Patterns

| Anti-pattern | Why it's wrong |
|---|---|
| Marking Done because code is written | Code complete ≠ verified. Use Testing. |
| Moving to Testing without checking AC | The AC is the contract — unmet items mean the work isn't done |
| Batching all updates at session end | Status is stale during the session; board is unreliable |
| Starting work without reading the story | You'll miss AC items and build the wrong thing |
| Skipping In Progress (Idea → Testing) | Loses the signal of when work actually started |
| Not commenting on transitions | Team loses context on what changed and why |
| Silently deferring AC items | Always flag deferred items explicitly with a reason in a Jira comment |
| Hardcoding transition IDs | IDs differ per project; always fetch dynamically |
| Hardcoding credentials | Always retrieve from secrets manager |

## Project-Specific Configuration

Each project should have a `CLAUDE.md` at its root with:

```markdown
## Jira

- **Base URL:** https://<org>.atlassian.net
- **Project key:** MYPROJECT
- **Credentials:** <how to retrieve — secrets manager, record name/UID, etc.>
```

If no `CLAUDE.md` exists, ask the user for these three things before starting
any Jira work.
