import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('id, created_at, name, email, phone, cpf, payment_status, confirmed, email_sent, amount')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Admin enrollments error]', error);
      return NextResponse.json({ error: 'Erro ao buscar inscricoes.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('[GET /api/admin/enrollments]', err);
    return NextResponse.json({ error: 'Erro ao buscar inscricoes.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Requisicao invalida.' }, { status: 400 });
  }

  try {
    if (body.all === true) {
      const { error } = await supabase.from('enrollments').delete().not('id', 'is', null);
      if (error) {
        console.error('[Admin delete all error]', error);
        return NextResponse.json({ error: 'Erro ao limpar inscricoes.' }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    const id = typeof body.id === 'string' ? body.id.trim() : '';
    if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
      return NextResponse.json({ error: 'ID invalido.' }, { status: 400 });
    }

    const { error } = await supabase.from('enrollments').delete().eq('id', id);
    if (error) {
      console.error('[Admin delete error]', error);
      return NextResponse.json({ error: 'Erro ao remover inscricao.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('[DELETE /api/admin/enrollments]', err);
    return NextResponse.json({ error: 'Erro ao remover inscricao.' }, { status: 500 });
  }
}
