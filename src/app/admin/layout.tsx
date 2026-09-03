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

export const metadata: Metadata = {
  title: "Admin | Pedro Itan",
};

export default function AdminLayout({
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
