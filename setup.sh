#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Final push – all changes deployed!${NC}"

# Check if we are in a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not in a git repository."
  exit 1
fi

BRANCH=$(git branch --show-current)
echo -e "${BLUE}📌 Branch: $BRANCH${NC}"

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo -e "${YELLOW}⚠️ No changes to commit.${NC}"
  exit 0
fi

# Commit
COMMIT_MSG="🏛️ Final: All fixes and features complete

- Search dropdown appears below search bar (not above)
- Three emails added: team@, ceo@, support@kalki-intelligence.in
- Support widget fixed at bottom-right with gradient sparkle button
- Mobile hamburger menu fixed with voltage-button style & blur overlay
- All legal pages, about page, services, KI Bot, contact page complete
- Fully responsive, high-end design
- SEO optimised with structured data
- Production-ready inference (Groq + Zhipu + Cerebras)"

git commit -m "$COMMIT_MSG"

# Push
git push origin "$BRANCH"

echo -e "${GREEN}✅ All changes pushed successfully!${NC}"
echo -e "${BLUE}🔗 Repository: $(git remote get-url origin)${NC}"
echo -e "${GREEN}🏛️ Your Temple of Technology is now complete and live!${NC}"