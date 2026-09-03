'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Copy, Check, Loader2, Music, Calendar, MapPin, Clock } from 'lucide-react';

type Step = 'form' | 'pix' | 'success';

export default function OficinaPage() {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrollment, setEnrollment] = useState<{
    id: string;
    qr_code: string;
    qr_code_base64: string;
    ticket_url: string;
    payment_id: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          cpf: form.cpf.replace(/\D/g, ''),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar inscrição.');
      }

      setEnrollment(data);
      setStep('pix');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao processar inscricao.');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = useCallback(async () => {
    if (!enrollment?.payment_id) return;

    try {
      const res = await fetch(`/api/enrollments/check?payment_id=${enrollment.payment_id}`);
      const data = await res.json();

      if (data.status === 'approved') {
        setStep('success');
      }
    } catch {
      // ignore polling errors
    }
  }, [enrollment?.payment_id]);

  useEffect(() => {
    if (step !== 'pix' || !enrollment?.payment_id) return;

    const interval = setInterval(() => {
      checkStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [step, enrollment, checkStatus]);

  const copyToClipboard = () => {
    if (!enrollment?.qr_code) return;
    navigator.clipboard.writeText(enrollment.qr_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4 font-poppins">
            Oficina presencial · Salvador
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-satoshi lowercase tracking-tight mb-6">
            Producao Musical com IA
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 font-poppins">
            Aprenda a criar musicas, trilhas e locucoes utilizando IA como ferramenta
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 font-poppins">
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Calendar size={16} /> 19/09/2026
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Clock size={16} /> 14h as 17h
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <MapPin size={16} /> Docas · Studio do Forte
            </span>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold font-satoshi mb-4">Sobre a oficina</h2>
            <p className="text-white/70 leading-relaxed font-poppins mb-4">
              Uma imersao pratica de 3 horas para voce produzir musicas, trilhas e locucoes com
              ferramentas de IA. Do conceito ao arquivo final, passando por arranjo, som e voz.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Ableton Live 12', 'Suno', 'Splice', 'LANDR', 'ElevenLabs', 'ChatGPT', 'Claude'].map(
                (tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 font-poppins"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold font-satoshi mb-4">Facilitador</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white/10">
                <Image
                  src="/images/profile.jpg"
                  alt="Pedro Itan"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xl font-bold font-poppins">Pedro Itan</p>
                <p className="text-sm text-white/60 font-poppins">Ableton Certified Trainer</p>
                <p className="text-sm text-white/60 font-poppins">Indicado ao Grammy Latino</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inscricao */}
      <section className="py-16 px-4 border-t border-white/10" id="inscricao">
        <div className="max-w-xl mx-auto">
          {step === 'form' && (
            <div className="bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold font-satoshi mb-2">Garanta sua vaga</h2>
              <p className="text-white/60 font-poppins mb-6">Investimento: R$ 1,00 · 20 vagas (valor de teste)</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1 font-poppins">Nome completo</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1 font-poppins">E-mail</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1 font-poppins">WhatsApp</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition"
                    placeholder="(71) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1 font-poppins">CPF</label>
                  <input
                    required
                    type="text"
                    value={form.cpf}
                    onChange={(e) => setForm({ ...form, cpf: formatCPF(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition"
                    placeholder="000.000.000-00"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-poppins">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-400 text-black font-bold font-poppins py-4 rounded-full hover:bg-cyan-300 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Music size={20} />
                  )}
                  {loading ? 'Processando...' : 'Quero pagar com PIX'}
                </button>

                <a
                  href="https://wa.me/5521988419463?text=Oi!%20Vi%20a%20oficina%20de%20Producao%20Musical%20com%20IA%20e%20gostaria%20de%20mais%20informacoes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-poppins py-3 rounded-full hover:bg-white/10 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.04 2C6.516 2 2 6.518 2 12.04a10.04 10.04 0 0 0 1.513 5.286L2.04 22l4.753-.473A10.04 10.04 0 0 0 12.04 22c5.523 0 10.04-4.517 10.04-10.04S17.563 2 12.04 2zm5.835 14.24c-.254.715-1.44 1.485-2.005 1.586-.534.096-1.038.27-3.53-.74-2.984-1.175-4.915-4.14-5.065-4.338-.15-.198-1.21-1.614-1.21-3.078 0-1.465.76-2.182 1.044-2.49.283-.308.624-.393.834-.393.21 0 .42.002.603.003.193.002.452-.073.707.542.258.623.88 2.155.96 2.31.078.153.13.332.026.536-.105.204-.315.33-.525.548-.21.22-.443.494-.633.664-.2.18-.407.375-.293.74.113.363.535 1.77 2.58 2.864 1.76.94 2.295 1.017 2.854.857.56-.16.798-.66.908-1.055.112-.393.05-.65-.075-.855-.123-.205-.473-.58-.99-.93-.516-.352-.99-.485-1.155-.63-.166-.146-.08-.34-.04-.463.04-.123.292-.73.52-1.03.228-.3.495-.35.69-.39.195-.04.54-.04.87.07.33.11 1.87.98 2.19 2.12.32 1.14.143 1.77-.11 2.486z" />
                  </svg>
                  Prefiro falar no WhatsApp
                </a>

                <p className="text-xs text-white/40 text-center font-poppins">
                  Ao se inscrever, voce concorda em receber comunicacao sobre a oficina.
                </p>
              </form>
            </div>
          )}

          {step === 'pix' && enrollment && (
            <div className="bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center">
              <h2 className="text-2xl font-bold font-satoshi mb-2">Pague com PIX</h2>
              <p className="text-white/60 font-poppins mb-6">
                Escaneie o QR code ou copie o codigo para fazer o pagamento.
              </p>

              {enrollment.qr_code_base64 ? (
                <Image
                  src={`data:image/png;base64,${enrollment.qr_code_base64}`}
                  alt="QR Code PIX"
                  width={240}
                  height={240}
                  className="mx-auto mb-6 rounded-lg"
                />
              ) : (
                <div className="w-60 h-60 bg-white/10 rounded-lg mx-auto mb-6 flex items-center justify-center text-white/40">
                  QR Code indisponivel
                </div>
              )}

              <button
                onClick={copyToClipboard}
                className="w-full bg-white/5 border border-white/10 text-white font-poppins py-3 rounded-lg hover:bg-white/10 transition flex items-center justify-center gap-2 mb-4"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Codigo copiado!' : 'Copiar codigo PIX'}
              </button>

              <p className="text-sm text-white/50 font-poppins">
                Aguardando pagamento... Nao feche esta pagina.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center">
              <div className="w-16 h-16 bg-cyan-400/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold font-satoshi mb-2">Inscricao confirmada!</h2>
              <p className="text-white/70 font-poppins mb-4">
                Oba, sua vaga esta garantida. Enviamos um e-mail com os detalhes.
              </p>
              <p className="text-white/50 font-poppins text-sm">
                Nos vemos dia 19/09 no Studio do Forte.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6 font-poppins">Parceiros</p>
          <div className="flex flex-wrap justify-center gap-6 text-white/70 font-poppins">
            {['HITLAB', 'arteQ transforma', 'DoCa', 'California Studios'].map((p) => (
              <span key={p} className="text-sm uppercase tracking-wider">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
