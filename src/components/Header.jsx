'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'} mt-3 md:mt-0`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">ITAN</Link>
          <div className="space-x-3 md:space-x-6">
            <Link href="#portfolio" className="text-white hover:text-gray-300 transition text-xs md:text-base">Portfolio</Link>
            <Link href="#bio" className="text-white hover:text-gray-300 transition text-xs md:text-base">Bio</Link>
            <Link href="#contact" className="text-white hover:text-gray-300 transition text-xs md:text-base">Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
