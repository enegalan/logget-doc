# Logget Documentation

This is the documentation site for [logget](https://github.com/enegalan/logget), built with Docusaurus.

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

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

This documentation site is configured to deploy to GitHub Pages. There are two deployment methods available:

### Automatic Deployment (Recommended)

The site is automatically deployed to GitHub Pages whenever you push changes to the `main` branch using GitHub Actions.

**Setup (one-time):**

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically run on every push to `main`

**How it works:**

- The workflow (`.github/workflows/deploy.yml`) automatically:
  - Builds the site when code is pushed to `main`
  - Deploys to GitHub Pages
  - The site will be available at `https://enegalan.github.io/logget-doc/`

### Manual Deployment

You can also deploy manually using the npm script:

**Prerequisites:**

- You need a GitHub Personal Access Token with `repo` permissions
- Set it as an environment variable: `export GITHUB_TOKEN=your_token_here`

**Deploy:**

```bash
npm run deploy
```

This command will:
- Build the site
- Create/update the `gh-pages` branch
- Push the built site to GitHub Pages

**Note:** For manual deployment, you'll need to configure GitHub Pages to use the `gh-pages` branch:
1. Go to **Settings** > **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select `gh-pages` branch and `/ (root)` folder

### Build for Other Platforms

To build the site for deployment to other platforms (Netlify, Vercel, etc.):

```bash
npm run build
```

The built files will be in the `build` directory, ready to be deployed to any static hosting service.

