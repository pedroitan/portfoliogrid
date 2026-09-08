import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getCoursePriceCentavos, setCoursePriceCentavos } from '@/lib/course';

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 });
  }
  const centavos = await getCoursePriceCentavos();
  return NextResponse.json({ price_centavos: centavos });
}

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const reais = Number(body?.price_reais);
  if (!body || !Number.isFinite(reais) || reais <= 0 || reais > 10000) {
    return NextResponse.json({ error: 'Valor invalido.' }, { status: 400 });
  }

  const ok = await setCoursePriceCentavos(Math.round(reais * 100));
  if (!ok) {
    return NextResponse.json({ error: 'Erro ao salvar preco.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
