---
name: product-demo-video
description: >-
  Produce a narrated product demo video from a script: drive the real app, cue each
  on-screen action to the exact words of the voice-over, and composite it onto a
  realistic desktop. Config-driven, with options for where recording runs (this
  machine or a remote Linux host), what is recorded (Electron or web app), voice
  (narrated or silent), and the desktop look.
retrieval:
  aliases: [product demo, demo video, record a demo, walkthrough video, launch video, feature demo]
  intents: [make a product demo video, record a walkthrough of the app, create a launch video, update the demo after a release, narrate a demo]
chainTo: [verify-done]
---

# Product demo video

A demo is evidence of a Solution working, not decoration. Make one when a Solution
reaches review or launch, when a release changes a flow people already watched, or
when a Test needs participants to see the thing before they answer. The pipeline is
deterministic: the same config produces the same video, so updating a demo after a
release means editing the script and re-running, not re-recording by hand.

This skill ships an engine (`engine/`, TypeScript on Node 22+, run directly) that you
vendor into the product repo, and a config contract. Nothing here assumes a product,
a machine, or a cloud account: every environment-specific choice comes from the
team's `demo.config.json`.

## When this runs

- **Direct request** ("make a demo of the new import flow"): run the loop below.
- **Release or launch gate** (see `release-manager`, `delivery-completion-watcher`):
  refresh the demo if the flow it shows changed. Report the video path; do not
  publish it anywhere unless asked.
- **Test design** (`experiment-workflow`): a demo can be the stimulus for a concept
  test. Keep it silent (`voice.provider: "none"`) if participants will talk over it.

## One-time setup in a product repo

1. Vendor the engine and create a starter config:
   `node <skill>/scripts/vendor-engine.ts <repo>/demo`
2. `npm install --prefix <repo>/demo/engine` (add `--ignore-scripts` on a machine that
   will only record; the Electron download is needed only where you compose).
3. Edit `<repo>/demo/demo.config.json` (see **Config** below). Choose an environment
   profile from `assets/demo-profiles.json`.
4. `node <repo>/demo/engine/run.mts doctor`. Fix every FAIL before spending a take.
5. Add `demo/out/` to `.gitignore`; commit `demo/engine/`, the config, and `demo/cache/`
   only if the team wants narration audio reproducible without API calls.

If `pm-config.md` has a `product_demo` entry (see `integration-routing`), use its
`config` path instead of asking where the config lives.

## The loop

1. **Script first.** Write each scene's narration (2 to 4 sentences, spoken aloud
   in 10 to 20 seconds) and the actions that illustrate it. Describe what the viewer
   should notice, not what the code does. Run `node demo/engine/record.mts --dry-run`
   for the estimated length.
2. **Cue every action.** Give each action `"cue": "phrase from the narration"`. It fires
   when the voice reaches that phrase. A viewer should never watch the screen sit
   still while the voice describes something that has not happened yet, or the
   reverse. The cue must appear in the scene's narration (validation enforces it).
3. **Voiceover.** `node demo/engine/run.mts voiceover`. Cached by text and voice, so
   only edited scenes spend credit. It also stores per-character timings that drive
   the cues. A silent provider produces the same timings for free, so draft with
   `voice.provider: "none"` and switch to a voice when the script is settled.
4. **Record** on the configured runner: `node demo/engine/run.mts record`.
5. **Compose**: `node demo/engine/run.mts compose`. Prefer a Mac for the most
   convincing desktop.
6. **Verify sync, then look.** `node demo/engine/run.mts sync-report` writes a
   filmstrip per cue to `demo/out/sync/`. Open them: the event must be absent in the
   first frame and visible by the third (the cue moment), within about 0.3 seconds.
   Then watch the video once. The compose table proves total lengths match, not that
   actions land with the words. Do not report a demo as done from the table.
7. **Report** the video path, its length, which cues you checked, and anything not
   verified (for example, audio quality you did not listen to).

`node demo/engine/run.mts all` runs voiceover, record, compose and sync-report.

## Config

`demo.config.json` is the single source of truth. Required: `title`, `target`,
`capture`, `output`, `look`, `timing`, `scenes`. The bundled
`assets/demo.config.template.json` is a working starting point (a fictional product).

### `environment`: where heavy steps run

| `environment.record.runner` | Use when | Needs |
|---|---|---|
| `local` | This machine is Linux (workstation, VM, CI runner) | Xvfb, ffmpeg with x11grab and libx264, product dependencies |
| `ssh` | Local machine is not Linux, or should stay free | Passwordless SSH to a Linux host, rsync both ends, Node, Xvfb, ffmpeg there |

For `ssh`: `host` (alias from your SSH config), `remoteDir` (scratch folder, removed
after the run), optional `shellInit` (for example, select the Node version), `setup`
(commands run in the synced copy: install, build), and `syncExclude`. The runner
syncs the project, records remotely, fetches only the raw recording and timeline, and
deletes the remote copy. It refuses to continue if the host is unreachable and says
so. It never silently falls back to recording on a machine that cannot do it. If the
team's `pm-config.md` defines `compute_offload`, reuse that host for `host`.

Voiceover and compose always run on the local machine. Compose renders the desktop
with Electron and composites with ffmpeg; on macOS it uses the real system font and
the real app icons from `/System/Applications`.

### `target`: what is recorded

- `electron`: `app` (folder with the app's entry, default `.`), `args`, `env`,
  `readySelector`, optional `fixture` (sample data copied fresh for every take) and
  `userDataFiles` (files written into the throwaway profile, for example to open the
  fixture). `{{fixture}}` and `{{userData}}` work in strings.
- `web`: `url`, optional `startCommand` (served from the project root, stopped
  afterwards), `readySelector`.

The recorder uses a throwaway profile and a fresh fixture copy every take, so a demo
never depends on leftover state.

### `look`, `voice`, `timing`

- `look.style`: `macos` (wallpaper, menu bar, dock) or `plain` (wallpaper and window).
  `look.dockApps` selects dock apps by name; `look.appIcon` adds the product's icon.
- `voice.provider`: `elevenlabs` (needs `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`)
  or `none`.
- `timing.leadMs` and `tailMs` pad narration inside each scene; `maxSlowdown` bounds
  any retiming.

### Actions

`pause`, `click`, `hover`, `type`, `press`, `waitFor`. Selectors for `click`, `hover`
and `waitFor` are CSS. Mark non-essential steps `"optional": true` so a missing
element is skipped instead of failing the take. Any action may carry `cue`.

## Rules that keep a demo trustworthy

- **Show the real product** running real code on sample data. Never mock a screen to
  make a flow look finished. If the flow is not ready, the demo is not ready.
- **Sample data only.** The fixture must contain no customer or personal data.
- **Verified means observed.** Report only cues you saw land. List everything else as
  NOT VERIFIED.
- **No publishing without authority.** Producing a file is reversible; uploading,
  embedding on a site, or sending it to customers is not. Ask first.
- **Respect artwork licensing.** The macOS desktop uses the host's system icons for
  the recording of your own product; check usage rights before publishing a demo
  outside the team, or use `look.style: "plain"`.
- **Clean up.** Remove remote scratch copies and stop any server the recorder
  started (the runner does both; confirm after a failed run).

## Failure patterns this engine already handles

- The capture clock lags the wall clock; the recorder calibrates with a visible
  marker instead of trusting timestamps.
- Narration audio is resolved by cache key, never by an absolute path from another
  machine.
- Scenes are held until the narration finishes, so a short action sequence does not
  cut the voice off.

If a take fails, read the message, change one thing, and re-run the failing step only
(`record` or `compose`). After two identical failures, stop and report what you tried.
