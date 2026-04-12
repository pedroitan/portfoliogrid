import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const satoshi = localFont({
  src: "../../../public/fonts/Satoshi/Fonts/WEB/fonts/Satoshi-Bold.woff2",
  variable: "--font-satoshi",
  weight: "400 700",
  display: "swap",
});

const BASE_URL = "https://pedroitan.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    pt: "Itan | Direção Criativa, Produção Musical, Engenharia Audiovisual",
    en: "Itan | Creative Direction, Music Production, Audiovisual Engineering",
  };
  const descriptions: Record<string, string> = {
    pt: "Portfolio de Itan — Diretor Criativo com experiência em shows ao vivo, produção musical e engenharia audiovisual. Projetos com Ludmilla (NBA Finals), Dilsinho, Paula Fernandes e mais.",
    en: "Portfolio of Itan — Creative Director with experience in live shows, music production and audiovisual engineering. Projects with Ludmilla (NBA Finals), Dilsinho, Paula Fernandes and more.",
  };
  const keywords: Record<string, string> = {
    pt: "direção criativa, produção musical, engenharia audiovisual, shows ao vivo, Ludmilla, NBA Finals, Dilsinho, Paula Fernandes, Grammy Latino, diretor criativo Brasil",
    en: "creative direction, music production, audiovisual engineering, live shows, Ludmilla, NBA Finals, Dilsinho, Paula Fernandes, Latin Grammy, creative director Brazil",
  };

  const ogImages = [
    {
      url: `/images/profile.jpg`,
      width: 1200,
      height: 630,
      alt: locale === 'pt' ? 'Itan - Direção Criativa' : 'Itan - Creative Direction',
    },
  ];

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: titles[locale] ?? titles.pt,
      template: "%s | Itan",
    },
    description: descriptions[locale] ?? descriptions.pt,
    keywords: keywords[locale] ?? keywords.pt,
    authors: [{ name: "Itan", url: BASE_URL }],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180" },
      ],
    },
    creator: "Itan",
    publisher: "Itan",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `/${locale}`,
      siteName: "Itan",
      title: titles[locale] ?? titles.pt,
      description: descriptions[locale] ?? descriptions.pt,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.pt,
      description: descriptions[locale] ?? descriptions.pt,
      images: ogImages,
      creator: "@itan",
    },
    verification: {
      google: "your-google-verification-code", // Add when available
    },
    category: locale === 'pt' ? 'Portfólio Criativo' : 'Creative Portfolio',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${satoshi.variable} ${poppins.variable}`}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="w6gaqVNkxEpApTQ550BdcWEMMO6dSlM0hGR3ew2KfTU" />
      </head>
      <body className="antialiased bg-black text-white">
        <NextIntlClientProvider messages={messages}>
          <StructuredData type="person" />
          <StructuredData type="website" />
          <Header />
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
