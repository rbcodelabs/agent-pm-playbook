---
name: pm-setup
description: >-
  Configure Agentic PM product-state and workflow profiles, provider routing,
  connections, active context, and only the folders required by resolved providers.
retrieval:
  aliases: [pm setup, configure pm, setup playbook, pm config]
  intents: [set up the pm playbook, configure my pm environment, create pm config, update my pm configuration]
chainTo: [okr-workflow]
---

# PM Setup

Configure `pm-config.md` as a routing manifest. It is not a duplicate product-state store. Load the installed [integration-routing skill](../integration-routing/SKILL.md), `assets/integration-profiles.json`, and `assets/workflow-profiles.json`.

## Existing configuration and migration

If `pm-config.md` exists, read it first. For a contract-v2 config, show both profiles, both override maps, and both resolved tables before asking what should change. Contract-v1 routed configs remain valid for product-only flows; offer workflow routing when the user wants scheduling, review, notification, prototypes, or analytics. For a legacy config, infer a proposed product profile/capability mapping from Notes System, Discovery Tool, Issue Tracker, and paths. Show ambiguities and ask for confirmation before writing. Migration updates routing only; it never moves, copies, or deletes live records.

## Interview

Ask one section at a time:

1. **Product:** name, description, and team.
2. **Product profile:** offer `compass-full`, `compass-obsidian-linear`, `markdown-linear`, and `jpd-jira`, showing the short descriptions from the JSON file. Do not assume a preferred stack.
3. **Overrides:** ask whether any of the nine capabilities needs a different provider. Overrides are per capability and replace, rather than supplement, the default.
4. **Workflow profile:** when workflow automation is in scope, offer the profiles from `workflow-profiles.json`; explain that product and workflow profiles compose independently.
5. **Workflow overrides:** ask whether automation runtime, review requests, decision records, notifications, prototype artifacts, or analytics needs a different provider.
6. **Connections:** collect identifiers and credential *locations* only for providers actually resolved. Never place a secret in `pm-config.md`.
7. **Context:** active cycle, objective, KR, desired outcome, focus opportunity, and focus solution. Store provider-native IDs when available.
8. **Portfolio policy:** collect positive `now_limit`, `next_limit`, and
   `concurrent_validation_limit` values plus whether full horizons require explicit
   displacement. Default the evidence, owner, and capacity guards to `true`; never infer
   unlimited capacity from a missing answer.
9. **Delivery completion policy:** collect the production-verification requirement,
   stale-`IN_REVIEW` threshold, release classes that require a launch gate, provider for
   non-blocking smoke-test feedback, unsupported Solution-status behavior, and the
   capacity-change dispatch target. This policy observes human merges; it never grants
   merge authority.
10. **Secondary copies:** if requested, require the user to choose `inbox`, `export`, `cache`, or `snapshot`; never call the copy authoritative.

Resolve and display all nine product capabilities and, for contract v2, all six workflow capabilities. Stop if any state-owning capability has zero or multiple authoritative providers. Notification fallbacks may be ordered only when explicitly configured.

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

- set contract version `2`, both named profiles, both override maps, and both fully expanded resolved-provider tables;
- include connection sections only for resolved providers;
- include a complete `portfolio_policy`; unknown limits must be recorded as unresolved and
  block automated `NEXT`/`NOW` admission rather than becoming implicit infinity;
- include a complete `delivery_completion_policy`; production verification defaults to
  required and preview success never counts as production evidence;
- include paths only for filesystem-owned capabilities;
- preserve the exact measurable desired outcome;
- label secondary copies by role.

Resolve the installed `integration-routing` skill directory and run both self-contained validators:

```bash
node <skill-directory>/scripts/validate-integration-profiles.ts <skill-directory>/assets/integration-profiles.json
node <skill-directory>/scripts/validate-workflow-profiles.ts <skill-directory>/assets/workflow-profiles.json
```

This works from the user's product workspace without locating the playbook repository or requiring `npm`. Then audit the generated config: nine product capabilities, six workflow capabilities, exactly one provider for every state-owning capability, no credentials, no contradictory paths, no implicit notification fallback, and no unlabeled secondary copy.

Report the config location, profile, overrides, resolved routing, created paths, and provider-native objects created. Suggest the next domain skill based on the user's goal.
