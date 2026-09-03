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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Oficina Producao Musical com IA | Pedro Itan",
  description:
    "Aprenda a criar musicas, trilhas e locucoes utilizando IA como ferramenta. Com Pedro Itan, Ableton Certified Trainer.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/oficina",
    siteName: "Pedro Itan",
    title: "Oficina Producao Musical com IA",
    description:
      "Aprenda a criar musicas, trilhas e locucoes utilizando IA como ferramenta.",
  },
};

export default function OficinaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${satoshi.variable} ${poppins.variable}`}>
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
