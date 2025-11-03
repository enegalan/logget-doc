#!/usr/bin/env node

/**
 * Simplified script to sync Algolia indices
 * 
 * This script provides instructions and opens the Algolia dashboard
 * where you can run the crawler manually.
 * 
 * Usage: node scripts/sync-algolia-simple.js
 */

const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function openURL(url) {
  const platform = process.platform;
  let command;

  if (platform === 'darwin') {
    command = `open "${url}"`;
  } else if (platform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }

  exec(command, (error) => {
    if (error) {
      console.log(`\n📋 Open manually: ${url}\n`);
    }
  });
}

async function main() {
  console.log('🔄 Algolia Sync\n');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('📝 Instructions to sync Algolia indices:\n');
  
  console.log('1️⃣  Option A: Use Algolia Dashboard (Recommended)');
  console.log('   - The crawler must be previously configured');
  console.log('   - Go to the dashboard and run the crawler manually\n');
  
  const openDashboard = await question('Open Algolia dashboard now? (y/n): ');
  
  if (openDashboard.toLowerCase() === 's' || openDashboard.toLowerCase() === 'y') {
    console.log('\n🌐 Opening Algolia dashboard...\n');
    openURL('https://www.algolia.com/dashboard');
  }
  
  console.log('\n2️⃣  Option B: Configure the crawler for the first time');
  console.log('   If you don\'t have the crawler configured yet:\n');
  console.log('   a) Go to: https://www.algolia.com/dashboard');
  console.log('   b) Go to "Crawlers" in the sidebar');
  console.log('   c) Click on "Create a new Crawler"');
  console.log('   d) Select "Web Crawler"');
  console.log('   e) Configure:');
  console.log('      - Index name: logget');
  console.log('      - Start URL: https://enegalan.github.io/logget-doc/');
  console.log('      - Application ID: <your application id>');
  console.log('      - Search API Key: <your search api key>');
  console.log('   f) Import the configuration from: .algolia/algolia-config.json\n');
  
  console.log('3️⃣  Option C: Use the API directly');
  console.log('   Run: npm run algolia:sync\n');
  
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('💡 Tip: Once configured, you can run the crawler');
  console.log('   from the dashboard every time you update the documentation.\n');
  
  rl.close();
}

main();

