# Contributing to Logget Documentation

Thank you for your interest in contributing to the Logget documentation! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Documentation Guidelines](#documentation-guidelines)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Pull Request Process](#pull-request-process)
- [Building and Testing](#building-and-testing)
- [Questions and Help](#questions-and-help)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/enegalan/logget-doc/blob/main/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/logget-doc.git
   cd logget-doc
   ```
3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/enegalan/logget-doc.git
   ```

## Development Setup

### Prerequisites

- **Node.js**: Version 20.0 or higher

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Configure Algolia for search:
   - Create a `.env` file in the project root
   - Add your Algolia credentials:
     ```env
     ALGOLIA_APP_ID=your_app_id
     ALGOLIA_SEARCH_API_KEY=your_search_api_key
     ```

### Running Locally

Start the development server:

```bash
npm start
```

This will start a local development server (usually at `http://localhost:3000`) with hot-reloading enabled.

## Project Structure

```
logget-doc/
├── docs/                    # Documentation source files (Markdown)
│   ├── commands/           # Command reference documentation
│   ├── getting-started/    # Getting started guides
│   └── output-formats/     # Output format documentation
├── src/                    # Source files
│   ├── css/               # Custom CSS styles
│   ├── pages/             # Custom pages
│   └── theme/             # Theme customizations
├── static/                 # Static assets (images, etc.)
├── scripts/                # Utility scripts
├── build/                  # Build output (generated)
├── docusaurus.config.js   # Docusaurus configuration
├── sidebars.js            # Sidebar navigation configuration
└── package.json           # Project dependencies and scripts
```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **Documentation Improvements**
   - Fix typos and grammatical errors
   - Clarify unclear explanations
   - Add missing information
   - Improve examples and code snippets

2. **New Documentation**
   - Add new guides or tutorials
   - Document new features
   - Create use case examples

3. **Code Improvements**
   - Fix bugs in scripts
   - Improve build configuration
   - Enhance theme customizations

### Finding What to Work On

- Check existing [issues](https://github.com/enegalan/logget-doc/issues) for tasks
- Look for documentation gaps or unclear sections
- Review pull requests that need feedback

## Documentation Guidelines

### Markdown Format

- Use standard Markdown syntax
- Follow the existing documentation style
- Keep lines under 100 characters when possible (except for code blocks)

### Code Blocks

- Always specify the language for code blocks:
  ```bash
  logget --logs --network https://example.com
  ```

- Use appropriate language tags: `bash`, `json`, `yaml`, `javascript`, etc.

### Writing Style

- Use clear, concise language
- Write in active voice when possible
- Use consistent terminology throughout
- Include practical examples
- Add code comments where helpful

### File Organization

- Place new documentation files in the appropriate directory under `docs/`
- Update `sidebars.js` to include new documentation pages
- Use descriptive, lowercase filenames with hyphens (e.g., `my-new-guide.md`)

## Code Style

### JavaScript/Node.js

- Follow the existing code style in the project
- Use 2 spaces for indentation (no tabs)
- Use English for all code and comments
- Follow ESLint rules if configured

## Submitting Changes

### Workflow

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. **Make your changes**:
   - Edit documentation files
   - Update code as needed
   - Test your changes locally

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

   **Commit Message Guidelines**:
   - Use clear, descriptive commit messages
   - Start with a verb in imperative mood (e.g., "Add", "Fix", "Update")
   - Keep the first line under 72 characters
   - Add more details in the body if needed

   Examples:
   - `Add documentation for new output format`
   - `Fix typo in installation guide`
   - `Update command examples in quick start`

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## Pull Request Process

### Before Submitting

- [ ] Test your changes locally (`npm start` and `npm run build`)
- [ ] Check for broken links
- [ ] Verify markdown formatting
- [ ] Update `sidebars.js` if adding new pages
- [ ] Ensure all files follow the project's code style

### Pull Request Description

Include:
- **What** you changed and why
- **Screenshots** (if applicable)
- **Related issues** (if any)

### Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Be patient and responsive to comments
- All PRs require at least one approval before merging

## Building and Testing

### Build the Site

Test that the site builds correctly:

```bash
npm run build
```

This generates the static site in the `build/` directory.

### Serve the Build

Test the production build:

```bash
npm run serve
```

### Check for Issues

- **Broken links**: Docusaurus will warn about broken links during build
- **Markdown errors**: Check the console output for warnings
- **Build errors**: Fix any errors before submitting

### Algolia Sync (Optional)

If you have Algolia configured, you can sync the search index:

```bash
npm run algolia:sync
```

## Questions and Help

- **GitHub Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the existing documentation first

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Git Documentation](https://git-scm.com/doc)

## Thank You!

Your contributions help make Logget documentation better for everyone. We appreciate your time and effort!
