import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        pt: "/pt/about",
        en: "/en/about",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `/${locale}/about`,
      type: "profile",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="min-h-screen bg-black text-white">
      <StructuredData type="person" />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4 font-satoshi">
                {t("subtitle")}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold font-satoshi tracking-tight lowercase mb-6">
                {t("title")}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed font-satoshi">
                {t("intro")}
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5">
              <Image
                src="/images/profile.jpg"
                alt="Itan - Creative Director"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-satoshi mb-8">
            {t("philosophy.title")}
          </h2>
          <div className="space-y-6 text-white/70 text-lg leading-relaxed font-satoshi">
            <p>{t("philosophy.p1")}</p>
            <p>{t("philosophy.p2")}</p>
            <p>{t("philosophy.p3")}</p>
          </div>
        </div>
      </section>

      {/* Notable Projects */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-satoshi mb-12">
            {t("projects.title")}
          </h2>
          
          <div className="space-y-12">
            {/* NBA Project */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">🏀</span>
                <div>
                  <h3 className="text-xl font-bold font-satoshi mb-2">
                    {t("projects.nba.title")}
                  </h3>
                  <p className="text-white/40 text-sm font-satoshi mb-4">
                    {t("projects.nba.role")}
                  </p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed font-satoshi mb-4">
                {t("projects.nba.description")}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Live Show", "Broadcast", "Creative Direction", "NBA Finals"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 font-satoshi">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Latin Grammy Project */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">🏆</span>
                <div>
                  <h3 className="text-xl font-bold font-satoshi mb-2">
                    {t("projects.grammy.title")}
                  </h3>
                  <p className="text-white/40 text-sm font-satoshi mb-4">
                    {t("projects.grammy.role")}
                  </p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed font-satoshi mb-4">
                {t("projects.grammy.description")}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Music Production", "Latin Grammy", "Dilsinho", "Paula Fernandes"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 font-satoshi">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-satoshi mb-12">
            {t("services.title")}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { key: "creative", icon: "🎨" },
              { key: "music", icon: "🎵" },
              { key: "technical", icon: "⚡" },
            ].map(({ key, icon }) => (
              <div key={key} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="text-lg font-bold font-satoshi mb-3">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-satoshi">
                  {t(`services.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-satoshi mb-8">
            {t("methodology.title")}
          </h2>
          <div className="space-y-8">
            {["discovery", "creation", "execution"].map((step, index) => (
              <div key={step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold font-satoshi">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-satoshi mb-2">
                    {t(`methodology.${step}.title`)}
                  </h3>
                  <p className="text-white/60 leading-relaxed font-satoshi">
                    {t(`methodology.${step}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-satoshi mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed font-satoshi mb-8">
            {t("cta.description")}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-satoshi font-medium hover:bg-white/90 transition-colors"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
