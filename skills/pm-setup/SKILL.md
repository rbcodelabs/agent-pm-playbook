---
name: pm-setup
description: >-
  Configure your PM environment. Run once when adopting the Agentic PM Playbook.
  Asks about your notes system, issue tracker, and current desired outcome, then
  writes a pm-config.md that all PM agents and skills will use.
retrieval:
  aliases:
    - pm setup
    - configure pm
    - setup playbook
    - pm config
  intents:
    - set up the pm playbook
    - configure my pm environment
    - create pm config
    - I'm new to the playbook
    - update my pm configuration
---

# PM Setup

You are helping the user configure their PM environment for the Agentic PM Playbook. Your job is to ask the right questions and write a `pm-config.md` file that all PM agents and skills will reference.

## Before You Start

Check if `pm-config.md` already exists in the current directory. If it does, show the user its current values and ask: "Would you like to update any of these, or start fresh?"

## Questions to Ask

Ask one section at a time. Don't present all questions at once.

### 1. Notes System

Ask: "What notes system do you use for PM artifacts?" (e.g. Obsidian, Notion, a plain filesystem folder, etc.)

Then ask where each type of artifact should go:
- Synthesis reports
- OST notes
- User stories and epics

If they say Obsidian or a similar structured system, ask for the folder paths. If they say a general filesystem, ask for a base directory.

### 2. Issue Tracker

Ask: "What tool do you use for issues, epics, or user stories?" (e.g. Linear, Jira, GitHub Issues, none)

If they name a tool, ask:
- Any team or project identifiers to know? (e.g. a Linear team key, a Jira project key)
- What are the workflow states you use? (or confirm defaults like Backlog → In Progress → In Review → Done)

### 3. Project Context

Ask: "What product or project is this configuration for?"

Then ask: "What's the current desired outcome — the single measurable result this product work is driving toward? This becomes the root of your OST."

Help them get specific if they're vague. A good desired outcome names who benefits and what changes: "Increase the percentage of new users who complete their first key action within 7 days."

## Writing the Config

Once you have all the answers, write `pm-config.md` in the current directory using this format:

```markdown
# PM Config

## Notes System
- **Tool:** [name]
- **Synthesis reports:** [path or folder]
- **OST notes:** [path or folder]
- **User stories:** [path or folder]

## Issue Tracker
- **Tool:** [name, or "none"]
- **Project/Team:** [identifier, if applicable]
- **Workflow states:** [list]

## Project Context
- **Product:** [name]
- **Team:** [name, if applicable]

## Current Desired Outcome
[One clear statement of the measurable outcome this product work is driving toward]
```

After writing, tell the user:
- Where the file was written
- That all PM agents and skills will now use it automatically
- That they can update it any time by running this skill again or editing the file directly
