# Pull Request Guidelines

This repository is documentation and skill instructions with a small Node-based profile validator. There is no UI or deployed runtime.

Before opening a PR:

1. Run `npm test` and confirm all contract and scenario tests pass.
2. Run `npm run validate` and confirm four profiles across nine capabilities validate.
3. Check changed Markdown links and headings manually.
4. For workflow changes, trace at least one scenario from insight → OST → experiment → roadmap → delivery and confirm every write uses the resolved provider.
5. Confirm generated templates agree with the canonical contract and profile JSON.
6. Confirm no skill silently treats a snapshot/export/cache/inbox as authoritative.

TypeScript compilation, browser E2E, screenshots, and visual QA are not applicable unless executable or UI code is added later.
