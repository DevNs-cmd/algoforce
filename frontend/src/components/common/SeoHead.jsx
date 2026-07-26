import { Helmet } from "react-helmet-async";
import seoConfig, { buildSchema, siteName } from "../../seoConfig";

const normalizePath = (path) => {
  if (!path) return "/";
  if (path !== "/" && path.endsWith("/")) return path.slice(0, -1);
  return path;
};

const getMetaForPath = (path) => {
  const normalized = normalizePath(path);
  if (seoConfig[normalized]) return { ...seoConfig[normalized], path: normalized };
  if (normalized.startsWith("/blog/")) return { ...seoConfig["/blog"] || seoConfig.default, path: normalized };
  if (normalized.startsWith("/products/")) return { ...seoConfig["/products"] || seoConfig.default, path: normalized };
  return { ...seoConfig.default, path: normalized };
};

const SeoHead = ({ path }) => {
  const meta = getMetaForPath(path);
  const url = `https://www.algoforceaii.com${meta.path === "/" ? "/" : meta.path}`;
  const title = meta.title || seoConfig.default.title;
  const description = meta.description || seoConfig.default.description;
  const image = meta.image || seoConfig.default.image;
  const type = meta.type || "website";
  const robots = meta.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const canonical = meta.canonical || url;
  const keywords = meta.keywords || seoConfig.default.keywords;
  const schema = buildSchema(meta.path, { title, description, schemaType: meta.schemaType });

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="AlgoForce AI Private Limited" />
      <meta name="publisher" content="AlgoForce AI" />
      <meta name="application-name" content={siteName} />
      <link rel="canonical" href={canonical} />

      {/* Local & Regional Geo Metadata (New Delhi, India) */}
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="New Delhi" />
      <meta name="geo.position" content="28.5383;77.2520" />
      <meta name="ICBM" content="28.5383, 77.2520" />

      {/* AEO / GEO Machine Readability Hints */}
      <meta name="ai-entity-type" content="Enterprise AI Software Company" />
      <meta name="ai-search-target" content="ChatGPT, Claude, Gemini, Perplexity, Copilot" />
      <meta name="deployment-options" content="Private Cloud, On-Premises Server, SaaS Subscription" />
      <meta name="msme-registration" content="UDYAM-DL-08-0122150" />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp, Slack) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} — Enterprise AI Software Company`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@algoforceAF" />
      <meta name="twitter:creator" content="@algoforceAF" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${siteName} — Enterprise AI Software Company`} />

      {/* Rich JSON-LD @graph */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SeoHead;
