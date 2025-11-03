# Logget Documentation

This is the documentation site for [logget](https://github.com/enegalan/logget).

## Installation

```bash
npm install
```

### Configure Algolia (Optional)

Algolia credentials can now be configured using environment variables:

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env  # If the example file exists
   # Or create the file manually
   ```

2. Edit `.env` and configure the variables as needed:
   ```env
   # Algolia Application ID (for the search client)
   ALGOLIA_APP_ID=ABCDEFGHIJ

   # Algolia Search-Only API Key (public key for frontend and scripts)
   # It's safe to commit, but you can configure it here if you prefer
   ALGOLIA_SEARCH_API_KEY=abcdef1234567890abcdef123456789
   ```

   ⚠️ **Important**:
   - The `.env` file is in `.gitignore` and will not be committed to the repository
   - If you don't configure the variables, the hardcoded default values will be used
   - The `ALGOLIA_SEARCH_API_KEY` is public and safe to commit (used in the frontend)

## Local Development

```bash
npm start
```

## Build

```bash
npm run build
```
