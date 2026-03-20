#!/bin/bash
# fix-git-and-deploy.sh
# Run this in Git Bash from anywhere — it fixes the git root and pushes your site to GitHub

set -e  # Stop on any error

echo ""
echo "======================================"
echo "  Thrive4 Git Fix + Deploy Script"
echo "======================================"
echo ""

# Find the script's own directory (your site folder)
SITE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Site folder: $SITE_DIR"
echo ""

# Step 1: Walk up the directory tree and remove any .git folders
# that are NOT inside SITE_DIR (i.e., the misplaced ones)
CURRENT="$SITE_DIR"
PARENT=$(dirname "$CURRENT")

echo "Step 1: Looking for misplaced .git folders above your site..."
while [ "$PARENT" != "$CURRENT" ]; do
  if [ -d "$PARENT/.git" ]; then
    echo "  Found misplaced .git at: $PARENT"
    echo "  Removing it..."
    rm -rf "$PARENT/.git"
    echo "  Removed."
  fi
  CURRENT="$PARENT"
  PARENT=$(dirname "$CURRENT")
done
echo "  Done checking for misplaced .git folders."
echo ""

# Step 2: Initialize fresh git in the site folder
echo "Step 2: Initializing git in your site folder..."
cd "$SITE_DIR"

if [ -d ".git" ]; then
  echo "  .git already exists here — removing and reinitializing..."
  rm -rf .git
fi

git init
git branch -M master
echo "  Git initialized."
echo ""

# Step 3: Set the remote to your GitHub repo
echo "Step 3: Connecting to GitHub repo..."
git remote add origin https://github.com/kennywright10-rgb/thrive4.git
echo "  Remote set."
echo ""

# Step 4: Stage all site files
echo "Step 4: Staging site files..."
git add index.html about.html gallery.html header.html footer.html
git add book-appointment.html contact.html faq.html blog.html
git add medical-disclaimer.html privacy-policy.html terms-of-service.html
git add our-medical-team.html googleeb83eb123dce6c95.html
git add vercel.json
git add css/ js/ images/ services/ 2>/dev/null || true
# Add any other .html files at root
git add *.html 2>/dev/null || true
git add *.json 2>/dev/null || true
echo "  Files staged."
echo ""

# Step 5: Commit
echo "Step 5: Committing..."
git commit -m "Fix: reinitialize git from correct site root"
echo "  Committed."
echo ""

# Step 6: Push to GitHub (force, to overwrite the old bad state)
echo "Step 6: Pushing to GitHub (this may ask for your password)..."
git push origin master:main --force
echo ""
echo "======================================"
echo "  SUCCESS! Site pushed to GitHub."
echo "  Vercel will auto-deploy in ~30 seconds."
echo "  Check: https://thrive4peakperformance.com/gallery.html"
echo "======================================"
echo ""
