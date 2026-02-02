/**
 * Sitemap Submission Script for Google Search Console
 * 
 * This script submits the sitemap to Google Search Console for indexing.
 */

const { exec } = require('child_process');
const fs = require('fs');

const SITEMAP_URL = 'https://algoforceaii.com/sitemap.xml';
const SITEMAP_FILE_PATH = './frontend/public/sitemap.xml';

console.log('🚀 Preparing to submit sitemap to Google Search Console...\n');

// Verify sitemap exists and is valid 
try {
  const sitemapContent = fs.readFileSync(SITEMAP_FILE_PATH, 'utf8');
  
  if (sitemapContent.includes('<?xml') && sitemapContent.includes('<urlset')) {
    console.log('✅ Sitemap file verified and is valid XML');
  } else {
    console.error('❌ Sitemap file is not valid XML');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Could not read sitemap file:', error.message);
  process.exit(1);
}

// Provide instructions for Google Search Console API submission
console.log(`📋 Manual Steps to Submit to Google Search Console:`);
console.log(`1. Go to https://search.google.com/search-console`);
console.log(`2. Select your property (algoforceaii.com)`);
console.log(`3. Click on "Sitemaps" in the left sidebar`);
console.log(`4. Enter "${SITEMAP_URL}" in the "Add a new sitemap" field`);
console.log(`5. Click "Submit"`);
console.log('');

// Also provide the URL ping method as an alternative
console.log(`🔄 Alternatively, you can ping Google to notify about sitemap update:`);
console.log(`GET Request to: https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
console.log('');

// Create a script to automate the ping notification
console.log(`💡 Automating ping notification to Google...`);

const https = require('https');
const { URL } = require('url');

function pingGoogle(sitemapUrl) {
  return new Promise((resolve, reject) => {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const urlObj = new URL(pingUrl);
    
    const req = https.get(pingUrl, (res) => {
      console.log(`🌐 Pinged Google with status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log(`✅ Google acknowledged the sitemap notification`);
      } else {
        console.warn(`⚠️  Unexpected response from Google: ${res.statusCode}`);
      }
      resolve(res.statusCode);
    });
    
    req.on('error', (err) => {
      console.error(`❌ Error pinging Google:`, err.message);
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Ping timeout'));
    });
  });
}

// Execute the ping
pingGoogle(SITEMAP_URL)
  .then(() => {
    console.log('\n✅ Sitemap submission process completed!');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Check Google Search Console for indexing status updates over the next few days');
    console.log('2. Monitor for any crawl errors or issues');
    console.log('3. Verify that all pages are being indexed properly');
    console.log('4. Check that canonical tags are being respected');
    console.log('');
  })
  .catch((error) => {
    console.error('\n❌ Error during sitemap submission:', error.message);
    console.log('\n💡 Fallback: Manually submit the sitemap through Google Search Console UI');
  });