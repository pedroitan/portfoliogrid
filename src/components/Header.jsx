'use client';

import { useState, useEffect } from 'react';
import MenuOverlay from './MenuOverlay';
import Bio from './Bio';
import Contact from './Contact';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(null); // 'bio' | 'contact' | null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Overlay close handler
  const closeOverlay = () => setActiveOverlay(null);

  return (
    <>
      <header className={`fixed w-full z-20 transition-all duration-300 ${scrolled ? 'bg-transparent' : 'bg-transparent'} mt-3 md:mt-0 md:pl-[120px] md:pr-[120px]`}> 
        <div className="w-full flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-white text-xl font-bold font-satoshi tracking-tight lowercase"
            style={{ marginLeft: 0, marginRight: 'auto', paddingLeft: 0, paddingRight: 0 }}
          >
            itan
          </Link>
          <button
            className="text-white p-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition shadow-lg"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
            style={{ marginLeft: 'auto', marginRight: 0 }}
          >
            <Menu size={32} />
          </button>
        </div>
      </header>
      <MenuOverlay 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)}
        onSelect={section => {
          setMenuOpen(false);
          setTimeout(() => setActiveOverlay(section), 250); // Wait for menu close animation
        }}
      />
      {activeOverlay === 'bio' && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <button className="absolute top-6 right-8 text-white text-3xl font-bold opacity-80 hover:opacity-100 transition z-[100000]" onClick={closeOverlay} aria-label="Fechar bio">×</button>
          <div className="max-w-3xl w-full mx-auto px-4 py-8 bg-black/70 rounded-xl overflow-y-auto max-h-[90vh]">
            <Bio overlay />
          </div>
        </div>
      )}
      {activeOverlay === 'contact' && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <button className="absolute top-6 right-8 text-white text-3xl font-bold opacity-80 hover:opacity-100 transition z-[100000]" onClick={closeOverlay} aria-label="Fechar contato">×</button>
          <div className="max-w-3xl w-full mx-auto px-4 py-8 bg-black/70 rounded-xl overflow-y-auto max-h-[90vh]">
            <Contact overlay />
          </div>
        </div>
      )}
    </>
  );
}
