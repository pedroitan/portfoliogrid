import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://pedroitan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '#portfolio', '#bio', '#contact'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // Generate entries for each locale and route combination
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            pt: `${BASE_URL}/pt${route}`,
            en: `${BASE_URL}/en${route}`,
          },
        },
      });
    });
  });
  
  return sitemapEntries;
}
