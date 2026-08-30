# PM Config

> Routing manifest for PM agents. Product state lives in the resolved providers, not in this file. Follow the installed `integration-routing` skill.

## Product

- **Product:** [name]
- **Description:** [what it does and for whom]
- **Team:** [optional]

## Integration Routing

- **Contract version:** 2
- **Integration profile:** [compass-full | compass-obsidian-linear | markdown-linear | jpd-jira]

### Provider overrides

<!-- Omit capabilities that use profile defaults. One provider value per override. -->

```yaml
provider_overrides: {}
```

### Resolved providers

<!-- pm-setup expands the profile plus overrides here so humans and agents can audit routing without guessing. -->

| Capability | Authoritative provider |
|---|---|
| vision | [provider] |
| research_capture | [provider] |
| insights | [provider] |
| okrs | [provider] |
| ost | [provider] |
| experiments | [provider] |
| roadmap | [provider] |
| delivery | [provider] |
| reporting_archive | [provider] |

## Workflow Routing

- **Workflow profile:** [compass-native-review | geode-obsidian-review | local-markdown-review]

### Workflow overrides

<!-- Omit workflow capabilities that use profile defaults. One provider value per override. -->

```yaml
workflow_overrides: {}
```

### Resolved workflow providers

| Workflow capability | Provider |
|---|---|
| automation_runtime | [provider] |
| review_requests | [provider] |
| decision_records | [provider] |
| notifications | [provider] |
| prototype_artifacts | [provider] |
| product_analytics | [provider] |

## Provider Connections

### Compass

- **Org slug:** [if used]
- **Workspace slug:** [if used]
- **Workspace ID:** [if known]
- **Credential location:** [environment variable or secret-manager reference; never the secret]

### Obsidian / Markdown

- **Root:** [if used]
- **Product folder:** [if used]
- **Role:** [authoritative capabilities or explicitly labeled inbox/export/cache/snapshot]

### Linear / Jira / JPD

- **Workspace / project / team:** [if used]
- **Workflow states:** [if delivery provider]
- **Credential location:** [if used]

### Workflow connections

<!-- Include only providers resolved by the workflow profile. Paths are examples, not defaults. -->

- **Automation runtime:** [provider, workspace, and credential location if required]
- **Review requests:** [provider and project/path; role must be inbox when secondary to product state]
- **Decision records:** [provider and project/path]
- **Notifications:** [primary target and explicitly configured fallback, if any]
- **Prototype artifacts:** [provider and publish target]
- **Product analytics:** [provider, project ID, and credential location if required]

## Active Context

- **OKR cycle:** [provider-native ID and label]
- **Active objective:** [provider-native ID and title]
- **Active KR:** [provider-native ID and metric]
- **Desired outcome:** [measurable customer behavior change]
- **Focus opportunity:** [provider-native ID or none]
- **Focus solution:** [provider-native ID or none]

## Portfolio Policy

<!-- These are workflow constraints, not a duplicate of roadmap state. Tune them to the team's real capacity. -->

```yaml
portfolio_policy:
  now_limit: [positive integer]
  next_limit: [positive integer]
  concurrent_validation_limit: [positive integer]
  require_validated_solution_for_next: true
  require_displacement_when_full: true
  require_owner_for_now: true
  require_capacity_data_for_now: true
```

If a required limit or capacity signal is unknown, scheduled stewards may prepare
validation work in `LATER` but must not infer permission to add work to `NEXT` or `NOW`.

## Delivery Completion Policy

```yaml
delivery_completion_policy:
  production_verification: required
  stale_in_review_after_hours: 24
  launch_required_for: [major, minor]
  silent_release_can_ship_directly: true
  unsupported_solution_status: warn_and_receipt
  smoke_followup_provider: [resolved insights provider]
  capacity_change_dispatch: roadmap_steward
```

This policy controls lifecycle reconciliation after a human merge. It never grants merge
authority and never permits preview success to substitute for production verification.

## Provider-owned paths

<!-- Include only paths actually owned by filesystem/Obsidian/Markdown capabilities. Do not add placeholder paths for Compass/JPD-owned state. -->

- [capability]: [path]

## Agent Behavior Overrides

- [optional behavior override]
