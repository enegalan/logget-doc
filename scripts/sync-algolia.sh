#!/bin/bash

# Script to sync Algolia indices from local
# Usage: ./scripts/sync-algolia.sh
# 
# Credentials can be configured in a .env file:
# ALGOLIA_APP_ID=your_application_id_here
# ALGOLIA_SEARCH_API_KEY=your_search_api_key_here

set -e

echo "🔄 Syncing Algolia indices..."

# Load environment variables from .env if it exists
if [ -f .env ]; then
    echo "📄 Loading environment variables from .env..."
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if Algolia CLI is installed
if ! command -v algolia &> /dev/null; then
    echo "❌ Algolia CLI is not installed."
    echo "📦 Installing Algolia CLI..."
    npm install -g @algolia/cli
fi

# Check if configuration file exists
if [ ! -f ".algolia/algolia-config.json" ]; then
    echo "❌ Configuration file not found: .algolia/algolia-config.json"
    exit 1
fi

# Check environment variables or request credentials
if [ -z "$ALGOLIA_APP_ID" ]; then
    echo "📝 Enter your Algolia Application ID (or configure ALGOLIA_APP_ID):"
    read -r ALGOLIA_APP_ID
fi

if [ -z "$ALGOLIA_SEARCH_API_KEY" ]; then
    echo "📝 Enter your Algolia Search API Key (or configure ALGOLIA_SEARCH_API_KEY):"
    read -rs ALGOLIA_SEARCH_API_KEY
    echo ""
fi

# Authenticate
echo "🔐 Authenticating with Algolia..."
algolia login --application-id "$ALGOLIA_APP_ID" --api-key "$ALGOLIA_SEARCH_API_KEY" --yes

# Run the crawler
echo "🚀 Starting Algolia crawler..."
algolia crawler start .algolia/algolia-config.json

echo "✅ Sync completed!"

