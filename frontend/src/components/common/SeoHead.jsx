import { Helmet } from "react-helmet-async";
import seoConfig, { buildSchema, siteName } from "../../seoConfig";

const normalizePath = (path) => {
  if (path !== "/" && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
};

const getMetaForPath = (path) => {
  const normalized = normalizePath(path);
  if (seoConfig[normalized]) return { ...seoConfig[normalized], path: normalized };
  if (normalized.startsWith("/blog/")) return { ...seoConfig["/blog/:id"], path: normalized };
  return { ...seoConfig.default, path: normalized };
};

const SeoHead = ({ path }) => {
  const meta = getMetaForPath(path);
  const url = `https://www.algoforceaii.com${meta.path === "/" ? "/" : meta.path}`;
  const title = meta.title || seoConfig.default.title;
  const description = meta.description || seoConfig.default.description;
  const image = meta.image || seoConfig.default.image;
  const type = meta.type || "website";
  const robots = meta.robots || "index, follow";
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
      <meta name="author" content="AlgoForce AI" />
      <meta name="publisher" content="AlgoForce AI" />
      <meta name="application-name" content={siteName} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${siteName} logo and AI growth systems brand`} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${siteName} logo and AI growth systems brand`} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SeoHead;
