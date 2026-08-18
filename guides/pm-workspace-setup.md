# PM Workspace Setup

This guide installs the optional Obsidian + Claude Threads workspace used by profiles that route capabilities to Obsidian. It is not required for `compass-full` or `jpd-jira`; start with `pm-setup` and follow only sections for your resolved providers.

**Time:** ~30 minutes for the full stack.
**What you're installing:**

| Tool | What it does for you |
|---|---|
| **Obsidian** | Your PM notes home — OST, Signal Ledger, daily synthesis, everything searchable |
| **Claude Threads plugin** | Claude running inside Obsidian — threaded conversations that see your notes |
| **Vault Bridges plugin** | A live link from your product repo (or docs folder) into your vault |
| **Issue tracker connection** | Your Linear or JIRA work items surfaced alongside your OST |
| **Agent PM skills** | The 6 agents + PM skills (ost-workflow, pm-signal-synthesis, etc.) installed in Claude Code |

---

## Step 1 — Install Obsidian + the pre-configured vault

The fastest path is the one-command installer. It downloads a pre-configured vault template with Claude Threads, Linear integration, and the right workspace layout already set up:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/rbcodelabs/ObsidianSetup/main/install.sh)"
```

The installer will:
1. Check Obsidian is installed (download from [obsidian.md](https://obsidian.md) if not)
2. Download the pre-configured vault (~1.6MB)
3. Ask where to put it on your machine
4. Register it so it appears in Obsidian's vault picker on relaunch

**Restart Obsidian.** Your new vault will appear in the picker — open it.

> **Prefer manual install?** If you'd rather configure Obsidian yourself: create a new vault, enable community plugins (Settings → Community plugins → Turn on), then install Claude Threads and Vault Bridges via BRAT (see Appendix at the end of this doc).

---

## Step 2 — Add your Anthropic API key

Claude Threads needs an Anthropic API key to run conversations. Your key is stored in the macOS keychain — not in any file.

**Get your key:**
1. Go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
2. Name it "Obsidian PM Workspace" and copy it — you won't see it again

**Add it to Claude Threads:**
1. In Obsidian: **Settings** (⌘,) → **Claude Threads** → **Secret environment variables**
2. In the "Add secret key" field, type `ANTHROPIC_API_KEY` → press Enter
3. A prompt appears for the value — paste your key → confirm
4. The key is saved to your macOS keychain under the name `ct-secret-ANTHROPIC_API_KEY`

**Verify:** Open the Claude Threads panel (left sidebar or Cmd+P → "Open Claude Threads"). Start a new thread and type anything. You should get a response; if you get an auth error, the key wasn't saved — repeat Step 2.

---

## Step 3 — Connect your issue tracker

Pick your tracker below. Both follow the same pattern: get a key, add it as a secret, confirm the connection.

---

### Linear

**Get your API key:**
1. Go to [linear.app](https://linear.app) → **Settings** (bottom-left) → **API** → **Personal API Keys**
2. Click **New API key** → label it "Obsidian PM Workspace" → Create
3. Copy the key

**Add it as a secret in Claude Threads:**
1. Settings → Claude Threads → Secret environment variables
2. Add key name: `LINEAR_API_KEY` → paste the value → confirm

**Add your workspace identifier:**
- Add a second secret: `LINEAR_WORKSPACE_SLUG` → your workspace's slug (the part in your Linear URL after `linear.app/`, e.g., `acme` from `linear.app/acme/`)

**Verify:** In a Claude Thread, ask: *"List my 5 most recent Linear issues."* If it returns issues, you're connected. If it can't find the key, re-check the secret names exactly.

---

### JIRA (Atlassian)

**Get your API token:**
1. Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token** → label it "Obsidian PM Workspace" → Create
3. Copy the token — you won't see it again

**Add the three secrets:**

| Secret name | Value |
|---|---|
| `JIRA_API_TOKEN` | Your token from above |
| `JIRA_EMAIL` | The email address on your Atlassian account |
| `JIRA_BASE_URL` | Your Jira instance URL, e.g. `https://yourcompany.atlassian.net` |

Add each: Settings → Claude Threads → Secret environment variables → key name → paste value → confirm.

**Verify:** In a Claude Thread, ask: *"List my 5 most recent JIRA issues assigned to me."* A working connection returns a list; an auth error means one of the three secrets is wrong — check `JIRA_EMAIL` and `JIRA_BASE_URL` first.

---

## Step 4 — Set up Vault Bridges

Vault Bridges creates a **bidirectional link** between a local folder (a product repo, a Notion export, a docs folder) and your vault. Pull to bring the repo's content into your vault; edit in Obsidian; push to send your changes back to the repo. You don't need a code repo — any folder of files works.

**Install Vault Bridges** (if it's not already in your vault):
- Settings → Community plugins → Browse → search "Vault Bridges" → Install → Enable
- *Or via BRAT:* see Appendix

**Add a bridge:**
1. Settings → Vault Bridges → **Add Bridge**
2. Fill in:
   - **Name:** something descriptive, e.g., "Product Docs"
   - **Repo path:** the absolute path to the local folder you want to bridge, e.g., `/Users/you/projects/my-product/docs`
   - **Vault path:** where in your vault it should appear, e.g., `Product/Docs`
   - **Branch:** `main` (or whichever branch you want to sync from)
3. Click **Sync now** to pull the initial copy into your vault

**Verify:** Navigate to the vault path you specified — you should see the files from your folder.

> **No code repo?** Bridge any folder: a Notion export, a shared Google Drive folder synced locally, a folder of spec PDFs. The bridge copies files as Markdown-readable content into your vault.

---

## Step 5 — Install the Claude Code agent skills

The agents and skills (ost-workflow, pm-signal-synthesis, investment-gate, etc.) run in Claude Code, not in Obsidian. If you haven't done this yet:

```bash
git clone https://github.com/rbcodelabs/agent-pm-playbook
cd agent-pm-playbook
./setup.sh --dry-run   # preview what it will install
./setup.sh             # do it
```

Restart Claude Code afterward (`exit` then `claude` again). Confirm by opening a session and typing `use the pm-coach skill` — it should respond as a thinking partner.

> If you haven't installed Claude Code yet, see [Module 1: Environment Setup](../training/module-1-environment-setup.md) for the Step 0 install instructions.

---

## Step 6 — Configure pm-setup (one-time)

With Claude Code running inside your product workspace folder:

```
Run the pm-setup skill to select an integration profile, configure capability providers, and set my current desired outcome.
```

Answer its questions — especially `desired outcome` (a measurable behavior change, not a feature). This writes the routing manifest and scaffolds only Markdown/Obsidian-owned capabilities.

---

## Your first 10 minutes on Monday

Here's what "using the stack" actually looks like day-to-day:

**1. Open Obsidian → open today's daily note** (Cmd+Shift+D or the calendar in the sidebar).

**2. 10-minute passive triage.** Scan your inbox: new JIRA/Linear comments, app store reviews, any support tickets that came in over the weekend. Don't synthesize yet — just note that there's material.

**3. Open a Claude Thread.** In the left panel, start a new thread in your product project.

**4. Run a quick synthesis.** Paste or describe the signals:
```
Synthesize this batch of customer signals into OST-ready opportunity clusters:
[paste tickets / quotes / review excerpts]
```
The pm-signal-synthesis skill will cluster them, tag confidence, flag contradictions, and suggest OST mappings.

**5. Update the OST in its provider.** The synthesis skill resolves `ost` from `pm-config.md` and updates Compass, JPD, or Markdown/Obsidian as configured.

**6. Done.** One Signal Ledger entry, one OST update, 10 minutes of judgment work. That's the weekly heartbeat.

---

## Appendix — Manual plugin install via BRAT

If you're setting up plugins without the ObsidianSetup installer, or if a plugin needs updating:

**Install BRAT first:**
Settings → Community plugins → Browse → search "BRAT" (by TfTHacker) → Install → Enable

**Install Claude Threads:**
1. Settings → BRAT → **Add Beta Plugin**
2. Enter repo: `rbcodelabs/obsidian-claude-threads`
3. Click Add Plugin → enable it in Community plugins

**Install Vault Bridges:**
1. Settings → BRAT → **Add Beta Plugin**
2. Enter repo: `rbcodelabs/obsidian-vault-bridges`
3. Click Add Plugin → enable it

**Verify each:** both should appear under Settings → Community plugins with a toggle you can flip on.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Claude Thread returns auth error | API key not saved or mistyped | Settings → Claude Threads → Secret environment variables → remove and re-add `ANTHROPIC_API_KEY` |
| "Can't find Linear/JIRA issues" | Secret name has a typo or workspace slug wrong | Re-check the exact secret names in Step 3; they're case-sensitive |
| Vault Bridges sync shows nothing | Wrong repo path, or folder doesn't exist | Confirm the path in Settings → Vault Bridges → your bridge; run Sync now |
| `pm-coach` answers generically | `pm-config.md` missing or empty | Re-run `pm-setup` from inside your project folder |
| BRAT plugin shows no plugins after install | Forgot to enable the plugin | Settings → Community plugins → scroll to find the plugin → flip the toggle on |
| Vault doesn't appear in Obsidian after ObsidianSetup | Obsidian wasn't restarted | Quit and reopen Obsidian completely |

---

← [Back to training](../training/00-start-here.md) · [Module 1: Environment Setup](../training/module-1-environment-setup.md)
