'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';

type Enrollment = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  payment_status: string;
  confirmed: boolean;
  email_sent: boolean;
};

export default function AdminOficina() {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEnrollments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enrollments', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Erro ao carregar inscricoes.');
      }

      const data = await res.json();
      setEnrollments(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar inscricoes.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!authenticated) return;
    loadEnrollments();
  }, [authenticated, loadEnrollments]);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h1 className="text-2xl font-bold font-satoshi mb-4">Admin · Oficina</h1>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token de acesso"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 mb-4 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => setAuthenticated(true)}
            className="w-full bg-cyan-400 text-black font-bold py-3 rounded-lg hover:bg-cyan-300 transition"
          >
            Entrar
          </button>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </main>
    );
  }

  const confirmedCount = enrollments.filter((e) => e.confirmed).length;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold font-satoshi mb-2">Inscricoes · Oficina</h1>
        <p className="text-white/60 font-poppins mb-6">
          Confirmadas: {confirmedCount} / 20
        </p>

        <button
          onClick={loadEnrollments}
          className="mb-6 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
        >
          Atualizar
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-cyan-400" size={32} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-white/10 rounded-2xl overflow-hidden">
              <thead className="bg-white/5 text-white/60 text-sm font-poppins">
                <tr>
                  <th className="p-4">Data</th>
                  <th className="p-4">Nome</th>
                  <th className="p-4">E-mail</th>
                  <th className="p-4">WhatsApp</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {enrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-white/5">
                    <td className="p-4 text-white/70 text-sm">
                      {new Date(e.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="p-4 font-poppins">{e.name}</td>
                    <td className="p-4 text-white/70 text-sm">{e.email}</td>
                    <td className="p-4 text-white/70 text-sm">{e.phone}</td>
                    <td className="p-4">
                      {e.payment_status === 'approved' || e.confirmed ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <CheckCircle size={16} /> Confirmado
                        </span>
                      ) : e.payment_status === 'pending' ? (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <Clock size={16} /> Pendente
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-sm">
                          <XCircle size={16} /> {e.payment_status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
