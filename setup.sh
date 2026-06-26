#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Pushing all changes to origin...${NC}"

# Ensure we are in a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo -e "${RED}❌ Not in a git repository. Aborting.${NC}"
  exit 1
fi

# Check if remote 'origin' exists
if ! git remote get-url origin >/dev/null 2>&1; then
  echo -e "${RED}❌ Remote 'origin' not found. Please set it with:${NC}"
  echo "   git remote add origin <your-repo-url>"
  exit 1
fi

# Check if there are changes to commit
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo -e "${YELLOW}⚠️ No changes to commit.${NC}"
  exit 0
fi

# Get current branch
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
COMMIT_MSG="🚀 KALKI 6.0 – Production‑Ready Full Stack

- Full Supabase integration (tables, RLS, realtime, functions)
- High‑end inference architecture (WebLLM + Groq + Zhipu + Cerebras)
- DeepSeek-R1-Distill-Qwen-1.5B (Q4_K_M) for WebLLM
- Real‑time node network with heartbeat and count
- Contact form saves leads to Supabase
- Token usage logging and quota enforcement
- Luxury UI with glassmorphism, animations, dark/light theme
- All pages: Home, Services, KI Bot, KI Cloud, Blog, Contact, About
- KALKI SUPPORT bot with Groq + knowledge base
- SEO/AEO/GEO optimised
- Fully responsive and mobile‑first"

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

# Push to origin
echo -e "${BLUE}⬆️ Pushing to origin/$BRANCH...${NC}"
git push -u origin "$BRANCH"

echo -e "${GREEN}✅ All changes pushed successfully!${NC}"
echo -e "${BLUE}🔗 Repository: $(git remote get-url origin)${NC}"