import Link from 'next/link';
import { Music, Calendar, ArrowRight } from 'lucide-react';

export default function CourseBanner() {
  return (
    <section className="relative z-10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/oficina"
          className="block group bg-black/20 border border-cyan-400/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-cyan-400/60 transition"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Music size={24} />
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 font-poppins mb-1">
                  Nova oficina
                </p>
                <h2 className="text-xl md:text-2xl font-bold font-satoshi lowercase mb-1">
                  Producao Musical com IA
                </h2>
                <p className="text-white/60 text-sm font-poppins flex items-center gap-2">
                  <Calendar size={14} /> 19/09/2026 · 14h as 17h · Salvador
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-poppins text-sm font-semibold group-hover:gap-3 transition">
              Garantir minha vaga <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
