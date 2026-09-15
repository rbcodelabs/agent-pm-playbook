---
name: integration-routing
description: Resolve cloud PM work to the active Compass workspace and its host-provided capabilities.
---

# Compass Integration Routing

The host-injected active workspace is authoritative. Use its supplied workspace ID and context for every read or mutation. Do not discover, select, or ask the user to identify another workspace.

The host-provided Compass MCP tools are the only product-state interface. Inspect the available tool catalog and map the requested work to its native Compass objects. If a needed capability is absent, say `DATA UNAVAILABLE (capability not provided by host)` and continue with what is supported. Never invent a secondary provider or persistence fallback.

Capability packs provide methodology, not authority. A requested action remains subject to the host's tool surface, signed-in user's permissions, and normal human-decision gates.
