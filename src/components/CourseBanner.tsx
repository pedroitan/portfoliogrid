'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, Calendar, ArrowRight, Sparkles, X } from 'lucide-react';

export default function CourseBanner() {
  const [visible, setVisible] = useState(true);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section className="relative z-10 pt-6 pb-4 px-4">
      <div className="max-w-5xl mx-auto relative">
        <button
          onClick={dismiss}
          aria-label="Fechar aviso da oficina"
          className="absolute -top-2 -right-2 z-20 w-7 h-7 rounded-full bg-black/70 border border-white/20 text-white/60 flex items-center justify-center hover:text-white hover:bg-black/90 transition"
        >
          <X size={14} />
        </button>
        <Link
          href="/oficina"
          className="block group relative overflow-hidden rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md p-5 md:p-6 hover:border-cyan-400/70 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl group-hover:bg-cyan-400/30 transition" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <Sparkles size={28} />
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-cyan-300 font-poppins font-bold mb-1 flex items-center gap-2">
                  <Music size={12} /> Nova oficina
                </p>
                <h2 className="text-2xl md:text-3xl font-black font-satoshi lowercase leading-tight mb-1">
                  Producao Musical{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
                    Com IA
                  </span>
                </h2>
                <p className="text-white/70 text-sm md:text-base font-poppins flex items-center gap-2">
                  <Calendar size={15} className="text-cyan-300" />
                  19/09/2026 · SABADO · 14h as 17h · Salvador
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-cyan-400 text-black font-poppins font-bold text-sm px-5 py-3 rounded-full group-hover:bg-cyan-300 transition shrink-0">
              Garantir minha vaga <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
