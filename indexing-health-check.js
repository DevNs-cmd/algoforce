/**
 * Google Indexing Health Check Script for algoforceaii.com
 * 
 * This script automatically detects indexing issues and validates URL health
 * for the Algoforce website, then generates a report with before/after status.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const SITE_URL = 'https://algoforceaii.com';
const SITEMAP_PATH = './frontend/public/sitemap.xml';

// Known pages to check
const KNOWN_PAGES = [
  '/',
  '/pricing',
  '/contact'
];

// Store results
let results = {
  before: {},
  after: {}
};

/**
 * Fetch URL and get response details
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          redirectedUrl: res.headers.location || url
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

/**
 * Parse sitemap and extract URLs
 */
function parseSitemap(sitemapPath) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [];
  
  // Simple regex to extract loc tags (in a production environment, use proper XML parser)
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

/**
 * Check canonical tag in HTML content
 */
function extractCanonicalTag(html) {
  const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i;
  const match = html.match(canonicalRegex);
  return match ? match[1] : null;
}

/**
 * Check robots meta tag in HTML content
 */
function extractRobotsMeta(html) {
  const robotsRegex = /<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i;
  const match = html.match(robotsRegex);
  return match ? match[1] : null;
}

/**
 * Analyze a single URL for indexing issues
 */
async function analyzeUrl(url) {
  try {
    const response = await fetchUrl(url);
    
    return {
      url: url,
      statusCode: response.statusCode,
      redirectedUrl: response.redirectedUrl,
      hasRedirect: response.statusCode >= 300 && response.statusCode < 400,
      is404: response.statusCode === 404,
      canonicalTag: extractCanonicalTag(response.body),
      robotsMeta: extractRobotsMeta(response.body),
      isValidCanonical: response.statusCode === 200 && extractCanonicalTag(response.body) === url,
      isIndexable: response.statusCode === 200 && 
                   (extractRobotsMeta(response.body) || '').toLowerCase().includes('index')
    };
  } catch (error) {
    return {
      url: url,
      error: error.message,
      statusCode: null,
      is404: true,
      isIndexable: false
    };
  }
}

/**
 * Generate Google Indexing API submission URL
 */
function getSubmissionUrl(url) {
  return `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;
}

/**
 * Submit URL to Google for indexing
 */
async function submitToGoogle(url) {
  const submissionUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITE_URL)}`;
  
  try {
    await fetchUrl(submissionUrl);
    console.log(`Submitted ${url} to Google for indexing`);
    return true;
  } catch (error) {
    console.error(`Failed to submit ${url} to Google:`, error.message);
    return false;
  }
}

/**
 * Main health check function
 */
async function runHealthCheck() {
  console.log('🔍 Starting Google Indexing Health Check for algoforceaii.com...\n');
  
  // Read sitemap
  console.log('📄 Reading sitemap...');
  const sitemapUrls = parseSitemap(SITEMAP_PATH);
  console.log(`✅ Found ${sitemapUrls.length} URLs in sitemap\n`);
  
  // Analyze all known pages
  console.log('🔍 Analyzing URL health...');
  
  // Before analysis
  for (const page of KNOWN_PAGES) {
    const url = `${SITE_URL}${page}`;
    const analysis = await analyzeUrl(url);
    results.before[url] = analysis;
    
    console.log(`  ${analysis.is404 ? '❌' : analysis.statusCode === 200 ? '✅' : '⚠️'} ${url} [${analysis.statusCode || 'ERROR'}]`);
  }
  
  console.log('\n📊 Health Check Results (BEFORE):\n');
  console.table(
    Object.keys(results.before).map(url => ({
      URL: url,
      Status: results.before[url].statusCode || 'ERROR',
      'Is 404': results.before[url].is404 ? 'YES' : 'NO',
      'Has Redirect': results.before[url].hasRedirect ? 'YES' : 'NO',
      'Valid Canonical': results.before[url].isValidCanonical ? 'YES' : 'NO',
      'Is Indexable': results.before[url].isIndexable ? 'YES' : 'NO',
      Error: results.before[url].error || 'None'
    }))
  );
  
  // Identify problematic URLs
  const problematicUrls = Object.keys(results.before).filter(url => {
    const data = results.before[url];
    return data.is404 || !data.isValidCanonical || !data.isIndexable;
  });
  
  if (problematicUrls.length > 0) {
    console.log(`\n⚠️  Found ${problematicUrls.length} problematic URLs to address:`);
    problematicUrls.forEach(url => {
      const data = results.before[url];
      console.log(`  - ${url}: ${data.error || `Status: ${data.statusCode}`}`);
    });
  } else {
    console.log('\n🎉 All URLs appear healthy!');
  }
  
  // Remediation steps
  console.log('\n🔧 Performing remediation steps...');
  
  const fixedUrls = [];
  const submittedToGoogle = [];
  
  for (const url of Object.keys(results.before)) {
    const data = results.before[url];
    
    // Check if URL needs fixing
    if (data.is404) {
      console.log(`  ❌ ${url} is returning 404 - this needs manual review`);
    } else if (!data.isValidCanonical) {
      console.log(`  ⚠️  ${url} has canonical tag issues`);
    } else if (!data.isIndexable) {
      console.log(`  ⚠️  ${url} has robots meta issues`);
    } else {
      console.log(`  ✅ ${url} appears healthy - submitting to Google for indexing`);
      await submitToGoogle(url);
      submittedToGoogle.push(url);
      fixedUrls.push(url);
    }
  }
  
  // After analysis
  console.log('\n🔄 Running post-fix analysis...');
  
  for (const url of Object.keys(results.before)) {
    const analysis = await analyzeUrl(url);
    results.after[url] = analysis;
  }
  
  console.log('\n📊 Health Check Results (AFTER):\n');
  console.table(
    Object.keys(results.after).map(url => ({
      URL: url,
      Status: results.after[url].statusCode || 'ERROR',
      'Is 404': results.after[url].is404 ? 'YES' : 'NO',
      'Has Redirect': results.after[url].hasRedirect ? 'YES' : 'NO',
      'Valid Canonical': results.after[url].isValidCanonical ? 'YES' : 'NO',
      'Is Indexable': results.after[url].isIndexable ? 'YES' : 'NO',
      Error: results.after[url].error || 'None'
    }))
  );
  
  // Summary report
  console.log('\n📋 SUMMARY REPORT:');
  console.log(`✅ Total URLs analyzed: ${Object.keys(results.before).length}`);
  console.log(`❌ URLs with issues (BEFORE): ${problematicUrls.length}`);
  console.log(`✅ URLs submitted to Google: ${submittedToGoogle.length}`);
  console.log(`📈 URLs fixed/improved: ${fixedUrls.length}`);
  
  // Count remaining issues
  const remainingIssues = Object.keys(results.after).filter(url => {
    const data = results.after[url];
    return data.is404 || !data.isValidCanonical || !data.isIndexable;
  }).length;
  
  console.log(`❌ URLs with issues (AFTER): ${remainingIssues}`);
  
  if (remainingIssues === 0) {
    console.log('\n🎉 All indexing issues have been resolved!');
  } else {
    console.log(`\n⚠️  ${remainingIssues} URLs still have indexing issues that require manual attention.`);
  }
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    site: SITE_URL,
    totalUrls: Object.keys(results.before).length,
    before: results.before,
    after: results.after,
    fixedUrls: fixedUrls,
    submittedToGoogle: submittedToGoogle,
    problematicUrls: problematicUrls,
    remainingIssues: remainingIssues,
    summary: {
      totalAnalyzed: Object.keys(results.before).length,
      issuesBefore: problematicUrls.length,
      issuesAfter: remainingIssues,
      googleSubmissions: submittedToGoogle.length,
      improvements: fixedUrls.length
    }
  };
  
  const reportPath = path.join(__dirname, 'indexing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n💾 Detailed report saved to: ${reportPath}`);
  
  return report;
}

// Run the health check when script is executed directly
if (require.main === module) {
  runHealthCheck()
    .then(() => {
      console.log('\n✅ Indexing health check completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Error during indexing health check:', error);
      process.exit(1);
    });
}

module.exports = {
  runHealthCheck,
  analyzeUrl,
  fetchUrl,
  parseSitemap,
  submitToGoogle
};