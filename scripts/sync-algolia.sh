#!/bin/bash

# Script to sync Algolia indices from local
# Usage: ./scripts/sync-algolia.sh
#
# Credentials can be configured in a .env file:
# ALGOLIA_APP_ID=your_application_id_here
# ALGOLIA_API_KEY=your_api_key_here (or ALGOLIA_SEARCH_API_KEY)

set -e

echo "🔄 Syncing Algolia indices..."

# Load environment variables from .env if it exists
if [ -f .env ]; then
    echo "📄 Loading environment variables from .env..."
    export $(cat .env | grep -v '^#' | xargs)
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "   Please install Node.js to run this script."
    exit 1
fi

if [ ! -f "scripts/sync-algolia.js" ]; then
    echo "❌ Sync script not found: scripts/sync-algolia.js"
    exit 1
fi

node scripts/sync-algolia.js

echo "✅ Sync completed!"

