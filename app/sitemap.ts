import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL of your website
  const baseUrl = 'https://www.imperiodigitalrd.com';

  // Static pages from your `app` directory
  const staticRoutes = [
    '/', // Homepage
    '/servicios',
    '/precios',
    '/casos-de-exito',
    '/recursos',
    '/sobre-nosotros',
    '/contacto',
    '/faq', // Note: Your file is named fag/page.tsx, but /faq is the standard URL
    '/politica-de-privacidad',
    '/terminos-de-servicio',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2025-08-24T00:00:00.000Z'), // Sets a recent date
    priority: route === '/' ? 1.0 : 0.8, // Homepage is highest priority
  }));

  // Dynamic pages for your case studies
  // NOTE: If you add new case studies, add their 'slug' here.
  const caseStudySlugs = [
    'boutique-glamour',
    'law-firm',
    'dental-practice',
  ];

  const caseStudyUrls = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/casos-de-exito/${slug}`,
    lastModified: new Date('2025-08-24T00:00:00.000Z'),
    priority: 0.9,
  }));

  // Combine all URLs into a single array
  return [...staticUrls, ...caseStudyUrls];
}
