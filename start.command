#!/bin/bash
# ╔═══════════════════════════════════════╗
# ║   🥒  Pickli — One-Click Launch      ║
# ╚═══════════════════════════════════════╝
# Double-click this file in Finder to start the app.

cd "$(dirname "$0")"

# Check for API key
if [ ! -f ".env" ] || grep -q "your_api_key_here" .env 2>/dev/null; then
  echo ""
  echo "⚠️  Gemini API key not configured!"
  echo ""
  echo "   1. Go to https://aistudio.google.com/apikey"
  echo "   2. Click 'Create API Key' (it's free!)"
  echo "   3. Open the .env file in this folder"
  echo "   4. Replace 'your_api_key_here' with your key"
  echo "   5. Run this script again"
  echo ""
  read -p "Press Enter to exit..."
  exit 1
fi

# Check node_modules exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (first run)..."
  npm install
  echo ""
fi

echo "🥒 Starting Pickli..."
echo ""

# Start Pickli (Vite handles both frontend + API)
npm run dev
