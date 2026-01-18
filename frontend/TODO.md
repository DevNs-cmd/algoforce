# SEO Fixes TODO

## 1. Fix index.html SEO
- [x] Remove favicon.png reference (file doesn't exist)
- [x] Remove og:image reference (og-image.png doesn't exist)
- [x] Remove logo from structured data (logo.png doesn't exist)
- [x] Ensure ONE <title> tag
- [x] Add correct meta description
- [x] Add robots meta (index, follow)
- [x] Add canonical link to https://algoforceaii.com/
- [x] Add Open Graph tags (og:title, og:description, og:url, og:type)
- [x] Add Twitter Card meta tags

## 2. Fix React pages Helmet
- [x] Home.jsx: Fix canonical to https://algoforceaii.com/
- [x] Home.jsx: Add missing OG and Twitter tags
- [x] Contact.jsx: Add missing OG and Twitter tags
- [x] Pricing.jsx: Add missing OG and Twitter tags

## 3. Update sitemap.xml
- [x] Add /pricing URL to sitemap
- [x] Remove /about and /features if pages don't exist

## 4. Verify robots.txt
- [x] Ensure allows all crawlers and references sitemap

## 5. Canonical enforcement
- [x] Ensure only ONE canonical per page
- [x] Homepage: https://algoforceaii.com/
- [x] Contact: https://algoforceaii.com/contact
- [x] Pricing: https://algoforceaii.com/pricing

## 6. SEO safety
- [x] Remove duplicate meta tags
- [x] Remove unused meta
- [x] Ensure valid HTML head structure
