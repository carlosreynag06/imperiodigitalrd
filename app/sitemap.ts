import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL of your website
  const baseUrl = 'https://www.imperiodigitalrd.com';

  // Static pages from your `app` directory
  const staticRoutes = [
    '/', // Homepage
    '/servicios',
    '/precios',
    '/recursos',
    '/sobre-nosotros',
    '/contacto',
    '/preguntas-frecuentes',
    '/politica-de-privacidad',
    '/terminos-de-servicio',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2025-08-24T00:00:00.000Z'), // Sets a recent date
    priority: route === '/' ? 1.0 : 0.8, // Homepage is highest priority
  }));

  // Combine all URLs into a single array
  return [...staticUrls];
}
