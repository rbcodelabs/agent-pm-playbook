# Compass Cloud Capability Pack

`packs/compass/` is the cloud-safe edition of the Agentic PM Playbook for Compass's in-app agent. It contains declarative Markdown skills and a versioned `compass-pack.json` manifest.

## Installation

In the workspace's Agent capability packs settings, an administrator supplies:

1. The public GitHub repository URL: `https://github.com/rbcodelabs/agent-pm-playbook`
2. A full 40-character commit SHA, never a branch or tag
3. The pack path: `packs/compass`

Compass validates the files, creates its own local-plugin wrapper, and stores a normalized artifact identified by its SHA-256 digest. Updates are explicit: install a different commit, then select that validated version. Rollback selects a previously validated version.

## Security boundary

The pack adds instructions, not authority. Compass owns the active workspace context, MCP connection, credentials, tools, and user authorization. The cloud skills cannot add shell or filesystem access, network destinations, hooks, commands, executable code, external MCP servers, or subagents.

The cloud skills use only the host-provided Compass MCP tools. They do not discover providers or workspaces, load local project configuration, request credentials, or fall back to local Markdown storage. Missing host capabilities are reported explicitly.

## Included workflows

The pack includes PM coaching and orchestration, Compass context routing, OST maintenance, signal synthesis, experiments, investment gates, roadmap management, OKRs, and weekly status reporting. Delivery automation, release operations, engineering workflows, local setup, scheduled jobs, and third-party integrations remain in the local Playbook edition and are not included.

Status reporting is read-only. The complete assistant response and Compass conversation history are its only v1 archive; it creates no separate report object.

## Versioning and compatibility

The manifest's semantic version describes the cloud pack contract. Every published change must update that version and be installed from an immutable commit. `sdkCompatibility` states the supported Claude Agent SDK range; Compass rejects incompatible versions.

Before publishing a version, run:

```sh
npm test
npm run validate
```

The repository's structural tests enforce the manifest layout, exact skill set and defaults, declared-file closure, size limits, reporting behavior, and selected known-incompatible instruction patterns. They are defense in depth, not a complete security scanner. Compass's own validator remains the authoritative installation check and must also pass before release.
