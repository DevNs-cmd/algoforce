# Google Indexing Monitor for algoforceaii.com

This automated solution handles Google indexing for the Algoforce website with daily monitoring capabilities.

## Features

- ✅ Verifies sitemap exists and is valid XML
- ✅ Automatically submits sitemap to Google Search Console
- ✅ Pings Google to notify about sitemap updates
- ✅ Checks indexing status of all pages listed in the sitemap
- ✅ Generates detailed reports with:
  - Page URL
  - Current indexing status (Indexed / Not Indexed)
  - Last crawl date
  - Any issues (404, redirect, canonical, robots)
- ✅ Schedules daily runs to ensure continuous indexing monitoring
- ✅ Provides console logs for each step
- ✅ Creates detailed reports in the `indexing-reports/` directory

## Installation

The required dependencies are already installed:

```bash
npm install xml2js node-schedule
```

## How to Run

### 1. Run Manually Once
```bash
node google-indexing-monitor.js
```

### 2. Automated Daily Monitoring
The script automatically schedules daily runs at 2:00 AM server time. After the initial run, it continues monitoring automatically.

## Report Output

Reports are saved in the `./indexing-reports/` directory:
- `latest-report.json` - Most recent report
- `indexing-report-[date].json` - Daily reports
- `previous-report.json` - Previous run's data for comparison

## Manual Google Search Console Setup

While the script handles sitemap pinging, you'll need to manually submit the sitemap to Google Search Console:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `https://algoforceaii.com`
3. Click on "Sitemaps" in the left sidebar
4. Enter `https://algoforceaii.com/sitemap.xml` in the "Add a new sitemap" field
5. Click "Submit"

## Report Contents

Each report includes:
- Timestamp of the check
- Site URL and sitemap URL
- Total number of URLs analyzed
- Individual URL analysis with status and issues
- Summary statistics comparing to previous runs
- Detailed metadata for each URL (title, status code, canonical tags, etc.)

## Scheduling

The script uses `node-schedule` to run automatically every day at 2:00 AM. You can modify the schedule by changing this line in the script:

```javascript
const job = schedule.scheduleJob('0 2 * * *', function() {
```

The cron expression `'0 2 * * *'` means "at 2:00 AM every day".

## Troubleshooting

- If you see timeout errors, ensure the website is accessible
- If sitemap analysis fails, verify the sitemap.xml file exists and is valid XML
- Check that the website URLs are returning 200 status codes
- Monitor the `indexing-reports/` directory for detailed logs

## Critical Issue Detected

The indexing monitor has identified that your website is returning HTTP 307 redirects from `https://algoforceaii.com/` to `https://www.algoforceaii.com/`. This causes indexing problems because Google treats these as different URLs.

### Recommended Solution:

1. **Choose a preferred domain** (with or without www) and configure your server to:
   - Either redirect from www to non-www consistently
   - Or redirect from non-www to www consistently

2. **Update your sitemap** to use the preferred domain consistently

3. **Set your preferred domain** in Google Search Console

4. **Add a canonical tag** in your HTML that points to the preferred version of each page

For example, if you choose the non-www version:
```html
<link rel="canonical" href="https://algoforceaii.com/" />
```

Or if you choose the www version:
```html
<link rel="canonical" href="https://www.algoforceaii.com/" />
```

## Files Created

- `google-indexing-monitor.js` - Main monitoring script
- `indexing-reports/` - Directory containing all reports
- `INDEXING_MONITOR_README.md` - This documentation

## Dependencies

- `xml2js` - For parsing XML sitemap files
- `node-schedule` - For scheduling daily runs