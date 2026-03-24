'use client';

import { useTranslations } from 'next-intl';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-12 bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-lg font-bold font-satoshi lowercase tracking-tight">itan</p>
          <p className="text-xs text-white/40 tracking-[0.2em] uppercase mt-1">{t('tagline')}</p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:contato@pedroitan.com"
            className="text-sm text-white/50 hover:text-white transition"
          >
            {t('email')}
          </a>
          <a
            href="https://instagram.com/pedroitan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 hover:text-white transition"
          >
            <Instagram size={18} />
          </a>
        </div>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Itan. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
