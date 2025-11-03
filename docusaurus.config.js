// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// Cargar variables de entorno desde .env
require('dotenv').config();

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Logget Documentation',
  tagline: 'A command-line tool for tracking, filtering and analyzing web application logs and network requests',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://enegalan.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/logget-doc/',

  // GitHub pages deployment config.
  organizationName: 'enegalan',
  projectName: 'logget-doc',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to set "zh-Hans" as the lang.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '2AE55C8A737F3B8C',
      },
    },
  ],

  // Only include search-local plugin if Algolia is not configured
  plugins: [
    ...(process.env.ALGOLIA_APP_ID && (process.env.ALGOLIA_API_KEY || process.env.ALGOLIA_SEARCH_API_KEY)
      ? []
      : [
          [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
              // Options for search-local plugin
              hashed: true,
              language: ['en'],
            },
          ],
        ]),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/enegalan/logget-doc/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Logget',
        hideOnScroll: true,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/enegalan/logget',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Command Reference',
                to: '/docs/commands/overview',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/enegalan/logget',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Logget.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json'],
      },
      ...(process.env.ALGOLIA_APP_ID && (process.env.ALGOLIA_API_KEY || process.env.ALGOLIA_SEARCH_API_KEY)
        ? {
            algolia: {
              // Application ID provided by Algolia
              appId: process.env.ALGOLIA_APP_ID,

              // Public API key: it is safe to commit it
              apiKey: process.env.ALGOLIA_API_KEY || process.env.ALGOLIA_SEARCH_API_KEY,

              indexName: 'logget',

              // Optional: Contextual search (enabled by default)
              contextualSearch: true,

              // Optional: Algolia search parameters
              searchParameters: {},

              // Optional: path for search page that enabled by default (`false` to disable it)
              searchPagePath: 'search',

              // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
              insights: false,
            },
          }
        : {}),
    }),
};

module.exports = config;

