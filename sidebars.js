/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Commands',
      items: [
        'commands/overview',
        'commands/options',
      ],
    },
    {
      type: 'category',
      label: 'Output Formats',
      items: [
        'output-formats/json',
        'output-formats/csv',
        'output-formats/har',
        'output-formats/yaml',
      ],
    },
  ],
};

module.exports = sidebars;

