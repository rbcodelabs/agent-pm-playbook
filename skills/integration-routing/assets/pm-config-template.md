# PM Config

> Routing manifest for PM agents. Product state lives in the resolved providers, not in this file. Follow the installed `integration-routing` skill.

## Product

- **Product:** [name]
- **Description:** [what it does and for whom]
- **Team:** [optional]

## Integration Routing

- **Contract version:** 1
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

## Active Context

- **OKR cycle:** [provider-native ID and label]
- **Active objective:** [provider-native ID and title]
- **Active KR:** [provider-native ID and metric]
- **Desired outcome:** [measurable customer behavior change]
- **Focus opportunity:** [provider-native ID or none]
- **Focus solution:** [provider-native ID or none]

## Provider-owned paths

<!-- Include only paths actually owned by filesystem/Obsidian/Markdown capabilities. Do not add placeholder paths for Compass/JPD-owned state. -->

- [capability]: [path]

## Agent Behavior Overrides

- [optional behavior override]
