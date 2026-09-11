import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
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

const title = "Oficina Producao Musical com IA | Pedro Itan";
const description =
  "Workshop presencial em Salvador: aprenda a criar musicas, trilhas e locucoes com IA, Ableton Live 12, Suno, Splice, LANDR, ElevenLabs, ChatGPT e Claude. Com Pedro Itan, Ableton Certified Trainer.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title,
  description,
  keywords: [
    "oficina de producao musical",
    "producao musical com IA",
    "Ableton Live 12 Salvador",
    "workshop IA musica",
    "Pedro Itan",
    "Suno",
    "Splice",
    "ElevenLabs",
    "LANDR",
    "ChatGPT",
    "Claude",
    "curso de musica Salvador",
    "oficina AI musica",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/oficina",
    siteName: "Pedro Itan",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/oficina",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Oficina Producao Musical com IA",
  description:
    "Workshop presencial de 3h para criadores de todos os niveis. Aprenda a criar musicas, trilhas e locucoes com IA, Ableton Live 12, Suno, Splice, LANDR, ElevenLabs, ChatGPT e Claude.",
  courseCode: "oficina-ia-producao-musical-2026",
  educationalLevel: "Iniciante",
  teaches: [
    "Ableton Live 12",
    "Suno",
    "Splice",
    "LANDR",
    "ElevenLabs",
    "ChatGPT",
    "Claude",
    "Producao musical com IA",
  ],
  provider: {
    "@type": "Person",
    name: "Pedro Itan",
    url: BASE_URL,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    courseWorkload: "PT3H",
    startDate: "2026-09-19T14:00:00-03:00",
    endDate: "2026-09-19T17:00:00-03:00",
    location: {
      "@type": "Place",
      name: "Docas · Studio do Forte",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. da Franca, S/N",
        addressLocality: "Salvador",
        addressRegion: "BA",
        addressCountry: "BR",
      },
    },
    instructor: {
      "@type": "Person",
      name: "Pedro Itan",
      url: BASE_URL,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "100.00",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/oficina`,
      validFrom: "2026-09-11T00:00:00-03:00",
    },
  },
};

export default function OficinaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${satoshi.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseJsonLd),
          }}
        />
      </head>
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
