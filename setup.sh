#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Pushing all changes to Git...${NC}"

# Check if we are inside a Git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠️ Not in a Git repository. Initializing...${NC}"
  git init
  git remote add origin https://github.com/CodeWander-666/kalkicore.git
fi

# Check if there are changes to commit
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo -e "${YELLOW}⚠️ No changes to commit.${NC}"
  exit 0
fi

# Ensure we are on the correct branch (e.g., main or new-branch)
BRANCH=$(git branch --show-current)
if [ -z "$BRANCH" ]; then
  echo -e "${YELLOW}⚠️ No branch checked out. Creating 'main'...${NC}"
  git checkout -b main
  BRANCH="main"
fi

echo -e "${BLUE}📌 Current branch: $BRANCH${NC}"

# Add all changes
echo -e "${BLUE}📦 Adding all files...${NC}"
git add .

# Show what's being committed
echo -e "${BLUE}📄 Files to commit:${NC}"
git status --short

# Commit with a meaningful message
COMMIT_MSG="🚀 KALKI 6.0 – Complete high‑end rebuild
- Full services page with 212+ cards and filtering
- Luxury KI Bot with DeepSeek‑style UI, RGB glow, streaming
- KI Cloud with premium marketplace & social cards
- Blog, Contact, About pages with glassmorphism
- KALKI SUPPORT widget with Groq AI
- All components, hooks, and AI orchestration
- SEO optimised, mobile‑first, production‑ready"

echo -e "${BLUE}📝 Commit message:${NC}"
echo "$COMMIT_MSG"

# Ask for confirmation before pushing
read -p "Proceed with commit and push? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

git commit -m "$COMMIT_MSG"

# Push to remote
echo -e "${BLUE}⬆️ Pushing to origin/$BRANCH...${NC}"
git push -u origin "$BRANCH"

echo -e "${GREEN}✅ All changes pushed successfully!${NC}"
echo -e "${BLUE}🔗 Repository URL: $(git config --get remote.origin.url)${NC}"