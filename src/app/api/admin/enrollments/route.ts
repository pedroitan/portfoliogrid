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
