'use client';

import { useLocale } from 'next-intl';

interface StructuredDataProps {
  type: 'person' | 'website' | 'creativework';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const locale = useLocale();
  const isPT = locale === 'pt';

  const getPersonSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://pedroitan.com/#person",
    "name": "Itan",
    "alternateName": "Pedro Itan",
    "url": "https://pedroitan.com",
    "image": "https://pedroitan.com/og-image.jpg",
    "jobTitle": isPT ? "Diretor Criativo" : "Creative Director",
    "description": isPT 
      ? "Diretor Criativo com experiência em shows ao vivo, produção musical e engenharia audiovisual"
      : "Creative Director with experience in live shows, music production and audiovisual engineering",
    "knowsAbout": [
      "Creative Direction",
      "Music Production",
      "Audiovisual Engineering",
      "Live Shows",
      "Direção Criativa",
      "Produção Musical",
      "Engenharia Audiovisual",
      "Shows ao Vivo"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": isPT ? "Diretor Criativo" : "Creative Director",
      "occupationLocation": {
        "@type": "City",
        "name": "Salvador",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR"
        }
      }
    },
    "workLocation": {
      "@type": "Place",
      "name": "Salvador, Brasil"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isPT ? "Direção Criativa" : "Creative Direction",
          "description": isPT 
            ? "Direção criativa para shows ao vivo e projetos audiovisuais"
            : "Creative direction for live shows and audiovisual projects"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isPT ? "Produção Musical" : "Music Production",
          "description": isPT 
            ? "Produção musical e trilhas sonoras para projetos audiovisuais"
            : "Music production and soundtracks for audiovisual projects"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isPT ? "Engenharia Audiovisual" : "Audiovisual Engineering",
          "description": isPT 
            ? "Engenharia e tecnologia para produções audiovisuais"
            : "Engineering and technology for audiovisual productions"
        }
      }
    ],
    "performerIn": [
      {
        "@type": "Event",
        "name": "NBA Finals Halftime Show com Ludmilla",
        "startDate": "2023",
        "location": {
          "@type": "Place",
          "name": "NBA Finals"
        }
      }
    ],
    "sameAs": [
      "https://instagram.com/pedro.itan",
      "https://linkedin.com/in/pedroitan",
      "https://youtube.com/@pedroitan",
      "https://open.spotify.com/artist/pedroitan"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Latin Grammy Nominee"
    },
    ...data
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://pedroitan.com/#website",
    "url": "https://pedroitan.com",
    "name": "Itan - Creative Director Portfolio",
    "alternateName": "Itan - Diretor Criativo",
    "description": isPT 
      ? "Portfolio de Itan — Direção Criativa, Produção Musical, Engenharia Audiovisual"
      : "Portfolio of Itan — Creative Direction, Music Production, Audiovisual Engineering",
    "inLanguage": ["pt-BR", "en-US"],
    "author": {
      "@id": "https://pedroitan.com/#person"
    },
    "creator": {
      "@id": "https://pedroitan.com/#person"
    },
    "publisher": {
      "@id": "https://pedroitan.com/#person"
    },
    ...data
  });

  const getCreativeWorkSchema = () => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": isPT ? "Portfólio Itan" : "Itan Portfolio",
    "creator": {
      "@id": "https://pedroitan.com/#person"
    },
    "about": isPT 
      ? "Projetos de direção criativa, produção musical e engenharia audiovisual"
      : "Projects in creative direction, music production and audiovisual engineering",
    "genre": ["Creative Direction", "Music Production", "Audiovisual Engineering"],
    "keywords": isPT
      ? "direção criativa, produção musical, shows ao vivo, Ludmilla, NBA Finals"
      : "creative direction, music production, live shows, Ludmilla, NBA Finals",
    ...data
  });

  const schemas = {
    person: getPersonSchema(),
    website: getWebsiteSchema(),
    creativework: getCreativeWorkSchema(),
  };

  const schema = schemas[type];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
