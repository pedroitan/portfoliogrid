'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MenuOverlay from './MenuOverlay';
import { Menu } from 'lucide-react';
import { Link, useRouter, usePathname } from '@/i18n/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-20 transition-all duration-500 ${scrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'} mt-3 md:mt-0 md:pl-[120px] md:pr-[120px]`}>
        <div className="w-full flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-white text-xl font-bold font-satoshi tracking-tight lowercase"
            style={{ marginLeft: 0, marginRight: 'auto', paddingLeft: 0, paddingRight: 0 }}
          >
            itan
          </Link>
          <div className="flex items-center gap-3" style={{ marginLeft: 'auto', marginRight: 0 }}>
            <button
              onClick={switchLocale}
              className="text-white/70 hover:text-white text-xs font-semibold tracking-widest uppercase transition border border-white/20 rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10"
              aria-label={`Switch to ${t('switchLang')}`}
            >
              {t('switchLang')}
            </button>
            <button
              className="text-white p-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition shadow-lg"
              aria-label={t('openMenu')}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
