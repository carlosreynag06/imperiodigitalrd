import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = 'https://www.imperiodigitalrd.com/sitemap.xml';

  return {
    rules: {
      userAgent: '*', // This rule applies to all search engine bots
      allow: '/',      // Allow bots to crawl everything by default
      // disallow: '/private/', // Example: Uncomment to hide a specific folder
    },
    sitemap: sitemapUrl,
  };
}