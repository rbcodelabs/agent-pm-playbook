#!/usr/bin/env bash
# setup.sh — Install Agentic Product Team agents and skills
#
# Agents are symlinked (updates to the repo propagate automatically).
# Skills are symlinked unless already managed by the Claude plugin system.
#
# Usage:
#   ./setup.sh           — install everything
#   ./setup.sh --dry-run — preview what would be installed
#   ./setup.sh --force   — overwrite existing symlinks

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
AGENTS_DIR="$HOME/.claude/agents"
SKILLS_DIR="$HOME/.claude/skills"

DRY_RUN=false
FORCE=false

for arg in "$@"; do
  case $arg in
    --dry-run) DRY_RUN=true ;;
    --force)   FORCE=true ;;
  esac
done

green()  { echo -e "\033[0;32m$*\033[0m"; }
yellow() { echo -e "\033[0;33m$*\033[0m"; }
red()    { echo -e "\033[0;31m$*\033[0m"; }
dim()    { echo -e "\033[2m$*\033[0m"; }

install_symlink() {
  local src="$1"
  local dest="$2"
  local label="$3"

  if [ "$DRY_RUN" = true ]; then
    dim "  [dry-run] would symlink: $dest → $src"
    return
  fi

  if [ -L "$dest" ] && [ "$FORCE" = true ]; then
    rm "$dest"
  fi

  if [ -e "$dest" ] || [ -L "$dest" ]; then
    yellow "  ⚠  $label already exists — skipping (use --force to overwrite)"
  else
    ln -s "$src" "$dest"
    green "  ✓  $label"
  fi
}

echo ""
echo "🤖 Agentic Product Team — Setup"
echo "   Repo: $REPO_DIR"
[ "$DRY_RUN" = true ] && yellow "   Mode: dry-run (no changes will be made)"
[ "$FORCE" = true ]   && yellow "   Mode: force (existing symlinks will be overwritten)"
echo ""

# ── Agents ──────────────────────────────────────────────────────────────────
echo "Installing agents → $AGENTS_DIR"
mkdir -p "$AGENTS_DIR"

for agent_file in "$REPO_DIR/agents"/*.md; do
  [ -f "$agent_file" ] || continue
  name=$(basename "$agent_file")
  install_symlink "$agent_file" "$AGENTS_DIR/$name" "$name"
done

echo ""

# ── Skills ──────────────────────────────────────────────────────────────────
echo "Installing skills → $SKILLS_DIR"
mkdir -p "$SKILLS_DIR"

for skill_dir in "$REPO_DIR/skills"/*/; do
  [ -d "$skill_dir" ] || continue
  name=$(basename "$skill_dir")
  install_symlink "$skill_dir" "$SKILLS_DIR/$name" "skill: $name"
done

echo ""

# ── Summary ─────────────────────────────────────────────────────────────────
if [ "$DRY_RUN" = false ]; then
  echo "✅ Done."
  echo ""
  echo "Agents installed:"
  for f in "$AGENTS_DIR"/*.md; do
    [ -L "$f" ] && dim "   • $(basename "$f" .md)"
  done
  echo ""
  echo "Skills installed:"
  for d in "$SKILLS_DIR"/*/; do
    [ -L "$d" ] && dim "   • $(basename "$d")"
  done
  echo ""
  echo "Restart Claude Code to pick up the new agents."
fi
