import { Helmet } from "react-helmet-async";
import seoConfig from "../../seoConfig";

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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SeoHead;
