---
name: pm-setup
description: >-
  Configure the Agentic PM Playbook integration profile, provider routing,
  connections, active context, and only the folders required by resolved providers.
retrieval:
  aliases: [pm setup, configure pm, setup playbook, pm config]
  intents: [set up the pm playbook, configure my pm environment, create pm config, update my pm configuration]
chainTo: [okr-workflow]
---

# PM Setup

Configure `pm-config.md` as a routing manifest. It is not a duplicate product-state store. Load the installed [integration-routing skill](../integration-routing/SKILL.md) and its canonical `assets/integration-profiles.json`.

## Existing configuration and migration

If `pm-config.md` exists, read it first. For a routed config, show the profile, overrides, and resolved table and ask what should change. For a legacy config, infer a proposed profile/capability mapping from Notes System, Discovery Tool, Issue Tracker, and paths. Show ambiguities and ask for confirmation before writing. Migration updates routing only; it never moves, copies, or deletes live records.

## Interview

Ask one section at a time:

1. **Product:** name, description, and team.
2. **Profile:** offer `compass-full`, `compass-obsidian-linear`, `markdown-linear`, and `jpd-jira`, showing the short descriptions from the JSON file. Do not assume a preferred stack.
3. **Overrides:** ask whether any of the nine capabilities needs a different provider. Overrides are per capability and replace, rather than supplement, the default.
4. **Connections:** collect identifiers and credential *locations* only for providers actually resolved. Never place a secret in `pm-config.md`.
5. **Context:** active cycle, objective, KR, desired outcome, focus opportunity, and focus solution. Store provider-native IDs when available.
6. **Secondary copies:** if requested, require the user to choose `inbox`, `export`, `cache`, or `snapshot`; never call the copy authoritative.

Resolve and display all nine capabilities. Stop if any capability has zero or multiple authoritative providers.

## Provider-aware scaffolding

Scaffold only capabilities resolved to `markdown` or `obsidian`:

| Capability | Default path |
|---|---|
| vision | `product/vision.md` |
| research_capture | `product/research/` |
| insights | `product/discovery/Signal Ledger.md` |
| okrs | `product/okrs/` |
| ost | `product/discovery/` |
| experiments | `product/discovery/experiments/` |
| roadmap | `product/roadmap/` |
| reporting_archive | `product/reports/` |

Do not create a path merely because an older template had one. In particular, `compass-full` creates no `product/` tree. The hybrid profile creates only Obsidian-owned vision, research, and reporting paths. JPD/Jira creates no authoritative Markdown discovery tree. An override may add or remove one scaffolded capability.

When Markdown owns OKRs, OST, experiments, or roadmap, initialize the corresponding existing generated templates. When Compass owns those capabilities, create provider-native records only if the user explicitly asked setup to initialize product state; otherwise record connection metadata and active IDs.

## Write and validate

Write `pm-config.md` from the installed `integration-routing/assets/pm-config-template.md`:

- set contract version `1`, named profile, overrides, and the fully expanded resolved-provider table;
- include connection sections only for resolved providers;
- include paths only for filesystem-owned capabilities;
- preserve the exact measurable desired outcome;
- label secondary copies by role.

Resolve the installed `integration-routing` skill directory and run its self-contained validator: `node <skill-directory>/scripts/validate-integration-profiles.ts <skill-directory>/assets/integration-profiles.json`. This works from the user's product workspace without locating the playbook repository or requiring `npm`. Then audit the generated config: nine resolved capabilities, exactly one provider each, no credentials, no contradictory paths, and no unlabeled secondary copy.

Report the config location, profile, overrides, resolved routing, created paths, and provider-native objects created. Suggest the next domain skill based on the user's goal.
