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
 * 
 * Option 1: Use Crawler-specific credentials (RECOMMENDED)
 * CRAWLER_USER_ID=your_crawler_user_id
 * CRAWLER_API_KEY=your_crawler_api_key
 * 
 * Option 2: Use standard Algolia credentials
 * ALGOLIA_APP_ID=your_application_id_here
 * ALGOLIA_API_KEY=your_admin_api_key_here
 * 
 * Note: Crawler credentials can be found at:
 * https://crawler.algolia.com/admin/user/settings/
 */

// Load environment variables from .env
require('dotenv').config();

const https = require('https');
const readline = require('readline');

function createBasicAuth(userId, apiKey) {
  const credentials = Buffer.from(`${userId}:${apiKey}`).toString('base64');
  return `Basic ${credentials}`;
}

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

async function getCrawlerId(appId, apiKey, useBasicAuth = false, crawlerUserId = null) {
  console.log('🔍 Searching for configured crawlers...\n');
  const headers = {
    'Content-Type': 'application/json'
  };
  // Use Basic Auth if Crawler credentials are provided, otherwise use standard headers
  if (useBasicAuth && crawlerUserId) {
    headers['Authorization'] = createBasicAuth(crawlerUserId, apiKey);
  } else {
    headers['X-Algolia-Application-Id'] = appId;
    headers['X-Algolia-API-Key'] = apiKey;
  }
  const options = {
    hostname: 'crawler.algolia.com',
    path: '/api/1/crawlers',
    method: 'GET',
    headers: headers
  };

  try {
    const response = await makeRequest(options);
    let crawlers = null;
    if (response.status === 200) {
      if (response.data.items && Array.isArray(response.data.items)) {
        crawlers = response.data.items;
      } else if (response.data.crawlers && Array.isArray(response.data.crawlers)) {
        crawlers = response.data.crawlers;
      }
    }
    if (crawlers) {
      if (crawlers.length === 0) {
        console.log('⚠️  No configured crawlers found.');
        console.log('📝 You must configure the crawler first in the Algolia dashboard:');
        console.log('   https://www.algolia.com/dashboard\n');
        return null;
      }
      // Find crawler that uses the 'logget' index or has 'logget' in its name
      const loggetCrawler = crawlers.find(c =>
        c.source?.index?.includes('logget') ||
        c.name?.toLowerCase().includes('logget') ||
        c.index?.includes('logget')
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
      
      // In non-interactive mode (CI/CD), use the first crawler
      if (!process.stdin.isTTY) {
        console.log(`✅ Using first crawler: ${crawlers[0].name} (ID: ${crawlers[0].id})\n`);
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
    if (response.status === 401 || response.status === 403) {
      console.error('❌ Authentication failed: Unauthorized');
      console.error(`   Status: ${response.status}`);
      if (response.data && response.data.message) {
        console.error(`   Error message: ${response.data.message}`);
      }
      if (response.data && typeof response.data === 'object') {
        console.error(`   Error details: ${JSON.stringify(response.data, null, 2)}`);
      } else if (response.data) {
        console.error(`   Error response: ${response.data}`);
      }
      console.error('\n   Possible causes:');
      console.error('   1. The API key does not have permission to access crawlers');
      console.error('   2. The API key is not an Admin API Key or Crawler API Key');
      console.error('   3. The API key has ACL restrictions that block Crawler API access');
      console.error('   4. The Application ID does not match the API key');
      console.error('\n   Solutions:');
      console.error('   1. Get Crawler-specific credentials (RECOMMENDED):');
      console.error('      - Go to: https://crawler.algolia.com/admin/user/settings/');
      console.error('      - Copy your "User ID" and "API Key"');
      console.error('      - Set CRAWLER_USER_ID and CRAWLER_API_KEY in your .env file');
      console.error('');
      console.error('   2. OR use Admin API Key with crawler permissions:');
      console.error('      - Go to: https://www.algolia.com/dashboard > Settings > API Keys');
      console.error('      - Verify you are using an Admin API Key');
      console.error('      - Check the ACL (Access Control List) of your API key');
      console.error('      - Make sure the API key has crawler permissions enabled');
      console.error('      - Verify ALGOLIA_APP_ID matches your Application ID\n');
      return null;
    }
    
    console.error(`❌ Error fetching crawlers (Status: ${response.status}):`);
    if (response.data) {
      if (typeof response.data === 'string') console.error('   Response:', response.data);
      else console.error('   Response:', JSON.stringify(response.data, null, 2));
    }
    return null;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

async function startCrawler(appId, apiKey, crawlerId, useBasicAuth = false, crawlerUserId = null) {
  console.log(`🚀 Starting crawler (ID: ${crawlerId})...\n`);
  const headers = {
    'Content-Type': 'application/json'
  };
  if (useBasicAuth && crawlerUserId) {
    headers['Authorization'] = createBasicAuth(crawlerUserId, apiKey);
  } else {
    headers['X-Algolia-Application-Id'] = appId;
    headers['X-Algolia-API-Key'] = apiKey;
  }
  
  const options = {
    hostname: 'crawler.algolia.com',
    path: `/api/1/crawlers/${crawlerId}/reindex`,
    method: 'POST',
    headers: headers
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
  // Check for Crawler-specific credentials first (recommended)
  const crawlerUserId = process.env.CRAWLER_USER_ID;
  const crawlerApiKey = process.env.CRAWLER_API_KEY;
  const useCrawlerCredentials = !!(crawlerUserId && crawlerApiKey);
  
  // Debug: Log what credentials are available
  if (process.env.DEBUG) {
    console.log('🔍 Debug: Credentials check');
    console.log(`  CRAWLER_USER_ID: ${crawlerUserId ? 'set' : 'not set'}`);
    console.log(`  CRAWLER_API_KEY: ${crawlerApiKey ? 'set' : 'not set'}`);
    console.log(`  useCrawlerCredentials: ${useCrawlerCredentials}`);
    console.log('');
  }
  let appId = process.env.ALGOLIA_APP_ID;
  let apiKey = process.env.ALGOLIA_API_KEY || process.env.ALGOLIA_SEARCH_API_KEY;
  if (useCrawlerCredentials) {
    console.log('ℹ️  Using Crawler-specific credentials');
    console.log(`ℹ️  Crawler User ID: ${crawlerUserId}`);
    const keyPreview = crawlerApiKey.length > 8 ? `${crawlerApiKey.substring(0, 4)}...${crawlerApiKey.substring(crawlerApiKey.length - 4)}` : '***';
    console.log(`ℹ️  Crawler API Key: ${keyPreview} (length: ${crawlerApiKey.length})`);
  } else {
    if (appId) {
      console.log(`ℹ️  Application ID: ${appId}`);
    } else {
      console.log('⚠️  ALGOLIA_APP_ID not found in environment variables');
    }
    if (apiKey) {
      const keyPreview = apiKey.length > 8 ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : '***';
      console.log(`ℹ️  API Key: ${keyPreview} (length: ${apiKey.length})`);
    } else {
      console.log('⚠️  ALGOLIA_API_KEY or ALGOLIA_SEARCH_API_KEY not found in environment variables');
    }
  }
  console.log('');

  // Only prompt if running interactively (not in CI/CD)
  if (!useCrawlerCredentials && !apiKey && process.stdin.isTTY) {
    console.log('📝 Enter your Algolia credentials:');
    console.log('   Option 1 (RECOMMENDED): Crawler-specific credentials');
    console.log('      Get them from: https://crawler.algolia.com/admin/user/settings/');
    console.log('   Option 2: Admin API Key');
    console.log('      Get it from: https://www.algolia.com/dashboard > Settings > API Keys\n');
    const useCrawler = await question('Use Crawler credentials? (y/n): ');
    if (useCrawler.toLowerCase() === 'y' || useCrawler.toLowerCase() === 's') {
      const userId = await question('Crawler User ID: ');
      const key = await question('Crawler API Key: ');
      process.env.CRAWLER_USER_ID = userId;
      process.env.CRAWLER_API_KEY = key;
      return syncAlgolia();
    } else {
      appId = await question('Application ID: ');
      apiKey = await question('API Key: ');
      console.log('');
    }
  }

  if (useCrawlerCredentials) {
    apiKey = crawlerApiKey;
  } else if (!apiKey) {
    console.error('❌ API Key is required to continue.');
    console.error('\n   Option 1 (RECOMMENDED): Set Crawler-specific credentials in .env:');
    console.error('      CRAWLER_USER_ID=your_crawler_user_id');
    console.error('      CRAWLER_API_KEY=your_crawler_api_key');
    console.error('      Get them from: https://crawler.algolia.com/admin/user/settings/');
    console.error('\n   Option 2: Set standard Algolia credentials in .env:');
    console.error('      ALGOLIA_APP_ID=your_application_id');
    console.error('      ALGOLIA_API_KEY=your_admin_api_key');
    process.exit(1);
  }
  if (!useCrawlerCredentials && !appId) {
    console.error('❌ ALGOLIA_APP_ID is required when using standard credentials.');
    console.error('   Set ALGOLIA_APP_ID environment variable in your .env file.');
    console.error('   Or use Crawler-specific credentials (CRAWLER_USER_ID and CRAWLER_API_KEY)');
    process.exit(1);
  }
  try {
    const crawlerId = await getCrawlerId(appId, apiKey, useCrawlerCredentials, crawlerUserId);
    if (!crawlerId) {
      console.log('\n📋 To configure the crawler:');
      console.log('1. Go to https://www.algolia.com/dashboard');
      console.log('2. Go to "Crawlers" in the sidebar');
      console.log('3. Create a new "Web Crawler"');
      console.log('4. Configure:');
      console.log('   - Index name: logget');
      console.log('   - Start URL: https://enegalan.github.io/logget-doc/');
      console.log('5. Import the configuration from .algolia/algolia-config.json (if available)');
      console.log('\n⚠️  Note: After configuring the crawler, get your Crawler credentials:');
      console.log('   - Go to: https://crawler.algolia.com/admin/user/settings/');
      console.log('   - Copy your "User ID" and "API Key"');
      console.log('   - Set CRAWLER_USER_ID and CRAWLER_API_KEY in your .env file\n');
      process.exit(1);
    }
    // Start crawler
    const success = await startCrawler(appId, apiKey, crawlerId, useCrawlerCredentials, crawlerUserId);
    if (success) console.log('✅ Sync started successfully!');
    else process.exit(1);
  } catch (error) {
    console.error('\n❌ Error during sync:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

syncAlgolia();
