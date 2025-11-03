#!/usr/bin/env node

/**
 * Script to sync Algolia indices from local
 * 
 * This script uses the Algolia API to start the crawler.
 * The crawler must be previously configured in the Algolia dashboard.
 * 
 * Usage: node scripts/sync-algolia.js
 * 
 * Credentials can be configured in a .env file:
 * ALGOLIA_APP_ID=your_application_id_here
 * ALGOLIA_SEARCH_API_KEY=your_search_api_key_here
 */

// Load environment variables from .env
require('dotenv').config();

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function getCrawlerId(appId, apiKey) {
  console.log('🔍 Searching for configured crawlers...\n');
  
  const options = {
    hostname: 'crawler.algolia.com',
    path: '/api/1/crawlers',
    method: 'GET',
    headers: {
      'X-Algolia-Application-Id': appId,
      'X-Algolia-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await makeRequest(options);
    if (response.status === 200 && response.data.crawlers) {
      const crawlers = response.data.crawlers;
      if (crawlers.length === 0) {
        console.log('⚠️  No configured crawlers found.');
        console.log('📝 You must configure the crawler first in the Algolia dashboard:');
        console.log('   https://www.algolia.com/dashboard\n');
        return null;
      }
      
      // Find crawler that uses the 'logget' index
      const loggetCrawler = crawlers.find(c => 
        c.source?.index?.includes('logget') || 
        c.name?.toLowerCase().includes('logget')
      );
      
      if (loggetCrawler) {
        console.log(`✅ Found crawler: ${loggetCrawler.name} (ID: ${loggetCrawler.id})\n`);
        return loggetCrawler.id;
      }
      
      console.log(`ℹ️  Found ${crawlers.length} crawler(s).`);
      if (crawlers.length === 1) {
        console.log(`✅ Using: ${crawlers[0].name} (ID: ${crawlers[0].id})\n`);
        return crawlers[0].id;
      }
      
      console.log('\nAvailable crawlers:');
      crawlers.forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.name} (ID: ${c.id})`);
      });
      
      const choice = await question('\nSelect the crawler number to use (or Enter for the first one): ');
      const index = choice ? parseInt(choice) - 1 : 0;
      
      if (index >= 0 && index < crawlers.length) {
        return crawlers[index].id;
      }
      
      return crawlers[0].id;
    }
    
    console.error('❌ Error al obtener crawlers:', response.data);
    return null;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

async function startCrawler(appId, apiKey, crawlerId) {
  console.log(`🚀 Starting crawler (ID: ${crawlerId})...\n`);
  
  const options = {
    hostname: 'crawler.algolia.com',
    path: `/api/1/crawlers/${crawlerId}/reindex`,
    method: 'POST',
    headers: {
      'X-Algolia-Application-Id': appId,
      'X-Algolia-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await makeRequest(options);
    
    if (response.status === 200 || response.status === 201) {
      console.log('✅ Crawler started successfully!\n');
      console.log('⏳ The indexing process may take several minutes.');
      console.log('📊 You can monitor progress at:');
      console.log(`   https://www.algolia.com/dashboard/crawlers/${crawlerId}\n`);
      return true;
    } else {
      console.error('❌ Error starting crawler:', response.data);
      return false;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function syncAlgolia() {
  console.log('🔄 Syncing Algolia indices...\n');

  // Get credentials from .env or environment variables
  let appId = process.env.ALGOLIA_APP_ID;
  let apiKey = process.env.ALGOLIA_SEARCH_API_KEY;

  if (!apiKey) {
    console.log('📝 Enter your Algolia Search API Key:');
    console.log('   Find it at: https://www.algolia.com/dashboard > Settings > API Keys\n');
    apiKey = await question('API Key: ');
    console.log('');
  }

  if (!apiKey) {
    console.error('❌ Search API Key is required to continue.');
    process.exit(1);
  }

  try {
    // Get crawler ID
    const crawlerId = await getCrawlerId(appId, apiKey);
    
    if (!crawlerId) {
      console.log('\n📋 To configure the crawler:');
      console.log('1. Go to https://www.algolia.com/dashboard');
      console.log('2. Go to "Crawlers" in the sidebar');
      console.log('3. Create a new "Web Crawler"');
      console.log('4. Configure:');
      console.log('   - Index name: logget');
      console.log('   - Start URL: https://enegalan.github.io/logget-doc/');
      console.log('   - Application ID: <your application id>');
      console.log('   - Search API Key: <your search api key>');
      console.log('5. Import the configuration from .algolia/algolia-config.json\n');
      process.exit(1);
    }

    // Start crawler
    const success = await startCrawler(appId, apiKey, crawlerId);
    
    if (success) {
      console.log('✅ Sync started successfully!');
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error during sync:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

syncAlgolia();
