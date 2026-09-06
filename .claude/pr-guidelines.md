# Pull Request Guidelines

This repository is documentation and skill instructions with a small Node-based profile validator. There is no UI or deployed runtime.

Before opening a PR:

1. Run `npm test` and confirm all contract and scenario tests pass.
2. Run `npm run validate` and confirm both product and workflow profiles validate.
3. Check changed Markdown links and headings manually.
4. For workflow changes, trace at least one scenario from insight → OST → experiment → roadmap → delivery and confirm every write uses the resolved provider.
5. Confirm generated templates agree with the canonical contract and profile JSON.
6. Confirm no skill silently treats a snapshot/export/cache/inbox as authoritative.
7. Complete the framework portability and privacy review below before publishing or
   updating a PR, including draft PRs. Tests alone do not satisfy this review.

## Framework portability and privacy review

Read the complete diff against the target branch, every changed file in context, and the
proposed PR title and description. Include documentation, examples, fixtures, generated
files, and attachments. Search can help locate candidates but does not replace reading.

- Remove personal conversation transcripts, approval anecdotes, internal rollout logs,
  live customer or project records, and private issue or workspace identifiers.
- Use clearly fictional examples and synthetic test data. Resolve operational repository
  paths, organization/workspace identities, endpoints, and review owners from configuration;
  do not assume a particular person's filesystem, projects, account, or tool setup.
- Trace whether another software team can follow the changed instructions using its own
  configuration. Provider-specific adapters must declare their scope and avoid making one
  provider mandatory for the shared framework.
- Review identifiers in context: legitimate public project URLs, citations, attribution,
  and maintainer contact information may remain when relevant. Record the rationale for
  any such references introduced by the change. Git author metadata is not example data.
- Treat leaked private context and hard-coded adopter assumptions introduced or relied
  upon by the change as blocking findings. Fix them before publication. Record unrelated
  pre-existing findings separately without claiming the entire repository is clean.
- Review the commits being pushed for private data, too. Deleting a leaked file in a later
  commit does not remove it from published history. If it was already published, report
  the remaining exposure and obtain authority before rewriting shared history.

## Review record

Use `.github/pull_request_template.md`. Record the reviewed commit, comparison base,
reviewer (human, agent, or explicit author self-review), scope, findings and resolutions,
relevant public-reference rationale, and verification results. Keep the record free of
the private details being removed. Do not claim independent review for a self-review.

Recheck later changes and the final PR description, and update the record to the new
commit before reporting the PR ready. Unresolved blocking findings prevent publication.
These are contributor/agent requirements; the template is not an enforced GitHub check.

TypeScript compilation, browser E2E, screenshots, and visual QA are not applicable unless executable or UI code is added later.
