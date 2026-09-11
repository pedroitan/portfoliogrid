import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://pedroitan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Hash routes (#portfolio, #bio, #contact) are not indexable - exclude from sitemap
  const pages = ['', 'about'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  routing.locales.forEach((locale) => {
    pages.forEach((page) => {
      const path = page ? `/${page}` : '';
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            pt: `${BASE_URL}/pt${path}`,
            en: `${BASE_URL}/en${path}`,
          },
        },
      });
    });
  });
  
  sitemapEntries.push({
    url: `${BASE_URL}/oficina`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  return sitemapEntries;
}
