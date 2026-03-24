import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import "../globals.css";

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
    pt: "Itan | Creative Director Portfolio",
    en: "Itan | Creative Director Portfolio",
  };
  const descriptions: Record<string, string> = {
    pt: "Portfolio de Itan — Direção Criativa, Produção Musical, Engenharia Audiovisual.",
    en: "Portfolio of Itan — Creative Direction, Music Production, Audiovisual Engineering.",
  };

  return {
    title: titles[locale] ?? titles.pt,
    description: descriptions[locale] ?? descriptions.pt,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        pt: `${BASE_URL}/pt`,
        en: `${BASE_URL}/en`,
      },
    },
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
    <html lang={locale} className={satoshi.variable}>
      <body className="antialiased bg-black text-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
