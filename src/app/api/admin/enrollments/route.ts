import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Admin enrollments error]', error);
      return NextResponse.json({ error: 'Erro ao buscar inscricoes.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('[GET /api/admin/enrollments]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro ao buscar inscricoes.' },
      { status: 500 }
    );
  }
}
